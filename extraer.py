#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
extraer.py — Convierte el export WXR de WordPress a JSON en src/content/pages/.

Uso:  python3 extraer.py ruta/al/export.xml [--ensayo]

NO se ejecuta salvo que se reexporte el XML: sobrescribe src/content/pages/.
Reglas: las rutas /wp-content/uploads/ NO se renombran nunca.
"""
import re, os, sys, json, html, unicodedata
from collections import Counter

BASE = "https://prefabricadascasas.es"
RAIZ = os.path.dirname(os.path.abspath(__file__))
SALIDA = os.path.join(RAIZ, "src", "content", "pages")

# ---------------------------------------------------------------- utilidades

def cdata(bloque, etiqueta, ns="wp"):
    m = re.search(r"<%s:%s><!\[CDATA\[(.*?)\]\]></%s:%s>" % (ns, etiqueta, ns, etiqueta),
                  bloque, re.S)
    return m.group(1) if m else ""

def meta(bloque, clave):
    m = re.search(
        r"<wp:meta_key><!\[CDATA\[%s\]\]></wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(.*?)\]\]></wp:meta_value>"
        % re.escape(clave), bloque, re.S)
    return m.group(1) if m else ""

def texto_plano(h):
    h = re.sub(r"<[^>]+>", " ", h)
    h = html.unescape(h).replace("\xa0", " ")
    return re.sub(r"\s+", " ", h).strip()

# ---------------------------------------------------------- limpieza del HTML

RE_FORM = re.compile(r"<form\b.*?</form>", re.S | re.I)
RE_CF7_WRAP = re.compile(r'<div class="wpcf7[^"]*".*?</div>\s*(?=<|$)', re.S | re.I)
RE_SCRIPT = re.compile(r"<(script|style|noscript)\b.*?</\1>", re.S | re.I)
RE_COMENT = re.compile(r"<!--.*?-->", re.S)
RE_VACIO = re.compile(r"<p>(?:\s|&nbsp;|<br\s*/?>)*</p>", re.I)

def limpiar(cuerpo):
    """Deja HTML semántico limpio y devuelve (html, avisos)."""
    avisos = Counter()

    # 1. fuera scripts, estilos y comentarios
    cuerpo = RE_SCRIPT.sub("", cuerpo)
    cuerpo = RE_COMENT.sub("", cuerpo)

    # 2. fuera los formularios de Contact Form 7 (se reponen con un componente)
    n_form = len(RE_FORM.findall(cuerpo))
    if n_form:
        avisos["formularios_eliminados"] += n_form
        cuerpo = RE_FORM.sub('<aside data-formulario="1"></aside>', cuerpo)
    cuerpo = re.sub(r'<div[^>]*class="[^"]*wpcf7[^"]*"[^>]*>', "", cuerpo, flags=re.I)

    # 3. atributos de Elementor y de WordPress que no aportan nada
    cuerpo = re.sub(r'\s(?:data-elementor[a-z-]*|data-id|data-settings|data-widget_type|'
                    r'data-element_type|aria-invalid|aria-required|novalidate|data-status)="[^"]*"',
                    "", cuerpo, flags=re.I)
    cuerpo = re.sub(r'\sclass="(?:[^"]*\b(?:elementor|wpcf7|wp-block)[^"]*)"', "", cuerpo, flags=re.I)

    # 4. URLs absolutas del propio dominio -> relativas (las de uploads NO se renombran)
    cuerpo = cuerpo.replace(BASE + "/", "/").replace(BASE, "/")
    cuerpo = re.sub(r'(https?:)?//prefabricadascasas\.es/', "/", cuerpo)

    # 5. imágenes: lazy + dimensiones intactas, rutas intactas
    def arregla_img(m):
        tag = m.group(0)
        if "loading=" not in tag:
            tag = tag[:-1].rstrip(" /") + ' loading="lazy" decoding="async">'
        return tag
    cuerpo = re.sub(r"<img\b[^>]*>", arregla_img, cuerpo, flags=re.I)

    # 6. iframes (mapas) perezosos
    cuerpo = re.sub(r"<iframe\b(?![^>]*loading=)", '<iframe loading="lazy"', cuerpo, flags=re.I)

    # 7. restos del acordeón de Elementor: atributos de pestaña y enlaces vacíos
    cuerpo = re.sub(r'\s(?:id="elementor-tab[^"]*"|data-tab="[^"]*"|role="[^"]*"|'
                    r'aria-controls="[^"]*"|aria-expanded="[^"]*"|aria-live="[^"]*"|'
                    r'aria-atomic="[^"]*"|tabindex="[^"]*"|aria-label="[^"]*")',
                    "", cuerpo, flags=re.I)
    # <a href=""> o <a> sin destino: se desenvuelve conservando el texto.
    # OJO: \b tras la "a" o si no tambien casa <aside> y se lo come.
    cuerpo = re.sub(r'<a(?=[\s>])(?![^>]*\shref="[^"]+")[^>]*>(.*?)</a\s*>',
                    r"\1", cuerpo, flags=re.S | re.I)

    # 8. enlaces vacíos: se marcan para el paso de enlazado interno
    avisos["href_vacios"] += len(re.findall(r'href="#"', cuerpo))

    # 9. cascarones vacíos que deja Contact Form 7
    for _ in range(3):
        cuerpo = re.sub(r"<(ul|ol|div|span|p)\b[^>]*>\s*</\1>", "", cuerpo, flags=re.I)
    cuerpo = RE_VACIO.sub("", cuerpo)

    # 10. envolver en <p> el texto que Elementor dejó suelto
    cuerpo = envolver_texto(cuerpo)

    cuerpo = re.sub(r"[ \t]+", " ", cuerpo)
    cuerpo = re.sub(r"\n{3,}", "\n\n", cuerpo)
    return cuerpo.strip(), avisos


BLOQUE = {"p", "div", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6",
          "table", "thead", "tbody", "tr", "td", "th", "figure", "figcaption",
          "section", "article", "blockquote", "form", "iframe", "img", "hr",
          "dl", "dt", "dd", "picture", "video", "aside"}

def envolver_texto(cuerpo):
    """Envuelve en <p> el texto suelto, respetando el arbol HTML.

    Elementor deja nodos de texto colgando de la raiz y a veces parte una
    etiqueta de bloque de su contenido. Un parser de verdad lo resuelve; el
    troceado por lineas rompia los <h3> del acordeon.
    """
    from bs4 import BeautifulSoup, NavigableString, Comment

    sopa = BeautifulSoup(cuerpo, "html.parser")

    acumulado = []
    def volcar():
        """Agrupa el texto suelto en <p>, uno por linea del original.

        Se corta SOLO en los saltos de linea que hay dentro de los nodos de
        texto; las etiquetas se copian enteras. Trocear la cadena por "\\n"
        despedazaba los <img> y los <iframe> escritos en varias lineas.
        """
        if not acumulado:
            return
        grupos, actual = [], []
        for nodo in acumulado:
            if isinstance(nodo, NavigableString):
                partes = str(nodo).split("\n")
                for i, parte in enumerate(partes):
                    if i:
                        grupos.append(actual)
                        actual = []
                    if parte.strip():
                        actual.append(parte)
            else:
                actual.append(str(nodo))
        grupos.append(actual)

        ancla = acumulado[0]
        for grupo in grupos:
            trozo = "".join(grupo).strip()
            if not trozo or not (texto_plano(trozo) or re.search(r"<(img|iframe)\b", trozo, re.I)):
                continue
            ancla.insert_before(BeautifulSoup("<p>%s</p>" % trozo, "html.parser"))
        for n in acumulado:
            n.extract()
        acumulado.clear()

    for nodo in list(sopa.children):
        if isinstance(nodo, Comment):
            volcar()
            continue
        if isinstance(nodo, NavigableString):
            if nodo.strip():
                acumulado.append(nodo)
            continue
        if nodo.name in BLOQUE:
            volcar()
        else:                      # <strong>, <a>, <b>, <em>… sueltos
            acumulado.append(nodo)
    volcar()

    # segunda pasada: lxml reordena y cierra correctamente lo que quede mal anidado
    salida = str(BeautifulSoup(str(sopa), "lxml"))
    salida = re.sub(r"</?(?:html|body)>", "", salida)
    salida = re.sub(r"<p>\s*</p>", "", salida)
    salida = re.sub(r"\s*\n\s*", "\n", salida)
    salida = re.sub(r"\n{2,}", "\n", salida)
    return salida.strip()

def separar_h1(cuerpo):
    """El layout pone el <h1>. El cuerpo no lo lleva (regla 2).

    En este sitio Elementor renderiza el PRIMER encabezado del contenido como
    el <h1> de la pagina (verificado contra el sitio vivo en /precios/ y en
    /hormigon-chiclana/). Aunque en el HTML guardado venga como <h2>, ese es
    el H1 real y hay que conservarlo palabra por palabra.
    """
    m = re.search(r"<h([12])\b[^>]*>(.*?)</h\1>", cuerpo, re.S | re.I)
    if not m:
        return cuerpo, ""
    h1 = texto_plano(m.group(2))
    if not h1:
        return cuerpo, ""
    cuerpo = cuerpo[:m.start()] + cuerpo[m.end():]
    # si quedan más h1 (no debería), se degradan a h2
    cuerpo = re.sub(r"<(/?)h1\b", r"<\1h2", cuerpo, flags=re.I)
    return cuerpo.strip(), h1

def extraer_hero(cuerpo):
    """Saca la primera imagen del cuerpo: pasa a ser el hero del layout."""
    m = re.search(r'<img\b[^>]*\ssrc="([^"]+)"[^>]*>', cuerpo, re.I)
    if not m:
        return cuerpo, {}
    tag = m.group(0)
    alt = re.search(r'\salt="([^"]*)"', tag, re.I)
    w = re.search(r'\swidth="(\d+)"', tag, re.I)
    h = re.search(r'\sheight="(\d+)"', tag, re.I)
    srcset = re.search(r'\ssrcset="([^"]*)"', tag, re.I)
    hero = {"src": m.group(1), "alt": alt.group(1) if alt else ""}
    if w: hero["ancho"] = int(w.group(1))
    if h: hero["alto"] = int(h.group(1))
    if srcset: hero["srcset"] = srcset.group(1)
    cuerpo = (cuerpo[:m.start()] + cuerpo[m.end():]).strip()
    return cuerpo, hero


def extraer_faq(bloque_item):
    """Saca el acordeón de Elementor como FAQ (alimenta el JSON-LD FAQPage)."""
    m = re.search(r"<wp:meta_key><!\[CDATA\[_elementor_data\]\]></wp:meta_key>\s*"
                  r"<wp:meta_value><!\[CDATA\[(.*?)\]\]></wp:meta_value>", bloque_item, re.S)
    if not m:
        return []
    try:
        datos = json.loads(html.unescape(m.group(1)))
    except Exception:
        return []
    widgets = []
    def recorrer(els):
        for e in els:
            if isinstance(e, dict):
                if e.get("elType") == "widget":
                    widgets.append(e)
                recorrer(e.get("elements", []) or [])
    recorrer(datos)
    faq = []
    for w in widgets:
        if w.get("widgetType") not in ("accordion", "toggle"):
            continue
        for t in (w.get("settings", {}) or {}).get("tabs", []) or []:
            preg = texto_plano(str(t.get("tab_title", "")))
            resp = texto_plano(str(t.get("tab_content", "")))
            if preg and resp and len(resp) > 25:
                faq.append({"pregunta": preg, "respuesta": resp})
    return faq

# ------------------------------------------------------------------- extraer

def main():
    if len(sys.argv) < 2:
        sys.exit("uso: extraer.py export.xml [--ensayo]")
    ruta = sys.argv[1]
    ensayo = "--ensayo" in sys.argv

    xml = open(ruta, encoding="utf-8").read()
    items = re.findall(r"<item>(.*?)</item>", xml, re.S)

    paginas, resumen = [], Counter()
    for it in items:
        if cdata(it, "post_type") != "page":
            continue
        if cdata(it, "status") != "publish":
            resumen["no_publicadas"] += 1
            continue

        slug = cdata(it, "post_name")
        enlace = (re.search(r"<link>(.*?)</link>", it, re.S) or [None, ""])[1] if False else \
                 (re.search(r"<link>(.*?)</link>", it, re.S).group(1).strip()
                  if re.search(r"<link>(.*?)</link>", it, re.S) else "")
        bruto = re.search(r"<content:encoded><!\[CDATA\[(.*?)\]\]></content:encoded>", it, re.S)
        bruto = bruto.group(1) if bruto else ""

        titulo_wp = html.unescape(
            (re.search(r"<title>(.*?)</title>", it, re.S).group(1) if re.search(r"<title>(.*?)</title>", it, re.S) else "")
            .replace("<![CDATA[", "").replace("]]>", "").strip())

        titulo_seo = html.unescape(meta(it, "_yoast_wpseo_title")) or ""
        titulo_seo = (titulo_seo.replace("%%title%%", titulo_wp)
                                .replace("%%page%%", "")
                                .replace("%%sep%%", "-")
                                .replace("%%sitename%%", "Casas Prefabricadas")).strip(" -")
        descripcion = html.unescape(meta(it, "_yoast_wpseo_metadesc")).strip()
        foco = html.unescape(meta(it, "_yoast_wpseo_focuskw")).strip()
        noindex = meta(it, "_yoast_wpseo_meta-robots-noindex") == "1"

        cuerpo, avisos = limpiar(bruto)
        cuerpo, h1 = separar_h1(cuerpo)
        cuerpo, hero = extraer_hero(cuerpo)
        faq = extraer_faq(it)
        resumen.update(avisos)
        if faq:
            resumen["paginas_con_faq"] += 1
            resumen["preguntas_faq"] += len(faq)
        if hero:
            resumen["con_hero"] += 1

        ruta_url = "/" if slug in ("", "inicio", "home") else "/%s/" % slug
        if enlace:
            p = enlace.replace(BASE, "").strip()
            if p in ("", "/"):
                ruta_url = "/"
            elif p.startswith("/"):
                ruta_url = p if p.endswith("/") else p + "/"

        pagina = {
            "slug": slug,
            "ruta": ruta_url,
            "titulo": titulo_wp,
            "h1": h1 or titulo_wp,
            "tituloSeo": titulo_seo or titulo_wp,
            "descripcion": descripcion,
            "palabraClave": foco,
            "noindex": noindex,
            "hero": hero,
            "faq": faq,
            "cuerpo": cuerpo,
            "palabras": len(texto_plano(cuerpo).split()),
        }
        paginas.append(pagina)
        resumen["paginas"] += 1
        if not descripcion:
            resumen["sin_metadesc"] += 1
        if not h1:
            resumen["sin_h1"] += 1

    # informe
    print("ENSAYO" if ensayo else "APLICANDO")
    for k, v in sorted(resumen.items()):
        print("  %-24s %s" % (k, v))
    vacias = [p["slug"] for p in paginas if p["palabras"] < 40]
    print("  paginas con <40 palabras: %d  %s" % (len(vacias), vacias[:8]))

    if ensayo:
        return

    os.makedirs(SALIDA, exist_ok=True)
    for p in paginas:
        nombre = (p["slug"] or "inicio") + ".json"
        with open(os.path.join(SALIDA, nombre), "w", encoding="utf-8") as f:
            json.dump(p, f, ensure_ascii=False, indent=1)
    print("escritos %d JSON en %s" % (len(paginas), SALIDA))

if __name__ == "__main__":
    main()
