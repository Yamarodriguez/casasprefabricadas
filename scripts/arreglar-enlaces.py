#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Arregla el enlazado interno de src/content/pages/*.json:

  1. URLs internas rotas (mayusculas, erratas, barra final, restos de /ar/).
  2. Los href="#", resueltos por el texto del ancla y por la seccion de la
     pagina (madera / hormigon / steel framing / casetas / general).

Uso: python3 scripts/arreglar-enlaces.py [--ensayo]
"""
import os, re, sys, json, glob
from collections import Counter
from bs4 import BeautifulSoup

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGINAS = os.path.join(RAIZ, "src", "content", "pages")

# --------------------------------------------------- 1. URLs internas rotas
REEMPLAZOS = {
    "/Steel-framing": "/steel-framing/",
    "/steel-framing": "/steel-framing/",
    "/stee-framing-imagenes/": "/steel-framing-imagenes/",
    "/albacete": "/albacete/",
    "/sevilla": "/sevilla/",
    # el subsitio /ar/ (Argentina) no existe aqui: se apunta al equivalente
    "/ar/casas-prefabricadas-madera/": "/madera/",
    "/ar/casas-prefabricadas-hormigon/": "/hormigon/",
    "/ar/casas-prefabricadas-cube/": "/cube/",
    "/ar/casetas-prefabricadas/": "/casetas/",
    "/ar/minimalistas/": "/minimalistas/",
    "/ar/pasivas/": "/pasivas/",
    "/ar/catalogo-casas-prefabricadas/": "/catalogo/",
    "/ar/casas-prefabricadas-modelos/": "/modelos/",
    "/ar/baratas/": "/baratas/",
    "/ar/casas-prefabricadas-llave-en-mano/": "/llave-en-mano/",
    "/ar/venta-de-casas-prefabricadas/": "/venta/",
    "/ar/imagenes-de-casas-prefabricadas/": "/imagenes/",
    "/ar/construccion-casas-prefabricadas/": "/construccion/",
    "/ar/presupuesto-casas-prefabricadas/": "/presupuesto/",
    "/ar/planos-de-casas-prefabricadas/": "/planos/",
    "/ar/casas-prefabricadas-moviles/": "/moviles/",
}

# ---------------------------------------- 2. destinos por seccion de la web
SECCIONES = {
    "madera":   {"catalogo": "/catalogo-casas-de-madera/", "imagenes": "/imagenes-casas-de-madera/",
                 "modelos": "/modelos-de-casas-madera/",   "precios": "/precios-casas-de-madera-prefabricadas/",
                 "planos": "/planos-casas-de-madera/",     "venta": "/venta-casas-de-madera/",
                 "construccion": "/construccion-casas-de-madera/", "hub": "/madera/",
                 "presupuesto": "/presupuesto/", "llave": "/casas-de-madera-llave-en-mano/", "ofertas": "/casas-de-madera-baratas/"},
    "hormigon": {"catalogo": "/hormigon-catalogo/",        "imagenes": "/hormigon-fotos/",
                 "modelos": "/hormigon/",                  "precios": "/hormigon-precios/",
                 "planos": "/hormigon-planos/",            "venta": "/venta-casas-prefabricadas-de-hormigon/",
                 "construccion": "/construccion-casas-hormigon/", "hub": "/hormigon/",
                 "presupuesto": "/presupuesto/", "llave": "/hormigon-llave-en-mano/", "ofertas": "/hormigon-baratas/"},
    "steel":    {"catalogo": "/steel-framing-catalogo/",   "imagenes": "/steel-framing-imagenes/",
                 "modelos": "/modelos-casas-steel-framing/", "precios": "/steel-framing-precios/",
                 "planos": "/steel-framing-planos/",       "venta": "/steel-framing-venta/",
                 "construccion": "/construcciones-steel-framing/", "hub": "/steel-framing/",
                 "presupuesto": "/presupuesto/", "llave": "/steel-framing-llave-en-mano/", "ofertas": "/baratas/"},
    "casetas":  {"catalogo": "/catalogo-casetas/",         "imagenes": "/imagenes-de-casetas/",
                 "modelos": "/modelos-de-casetas/",        "precios": "/precios-de-casetas/",
                 "planos": "/planos-de-casetas/",          "venta": "/casetas/",
                 "construccion": "/construccion-de-casetas/", "hub": "/casetas/",
                 "presupuesto": "/presupuesto/", "llave": "/llave-en-mano/", "ofertas": "/baratas/"},
    "general":  {"catalogo": "/catalogo/",                 "imagenes": "/imagenes/",
                 "modelos": "/modelos/",                   "precios": "/precios/",
                 "planos": "/planos/",                     "venta": "/venta/",
                 "construccion": "/construccion/",         "hub": "/",
                 "presupuesto": "/presupuesto/", "llave": "/llave-en-mano/", "ofertas": "/baratas/"},
}

def seccion_de(ruta):
    if re.match(r"^/(madera/|casas-de-madera-|de-madera-|cabanas-de-madera|cocheras-de-madera|"
                r"cobertizos-de-madera|pergolas-de-madera|casetas-de-madera|modelos-de-casas-madera|"
                r"planos-casas-de-madera|catalogo-casas-de-madera|venta-casas-de-madera|"
                r"imagenes-casas-de-madera|construccion-casas-de-madera|precios-casas-de-madera)", ruta):
        return "madera"
    if ruta.startswith("/hormigon"):
        return "hormigon"
    if "steel-framing" in ruta:
        return "steel"
    if ruta.startswith("/casetas") or ruta.startswith("/alquiler-casetas") or \
       re.match(r"^/(catalogo|imagenes-de|modelos-de|planos-de|precios-de|construccion-de)-?casetas", ruta):
        return "casetas"
    return "general"

# ---------------------------------------------- 3. resolver los href vacios
# el texto del ancla manda; si no basta, el h2 que la precede
POR_TEXTO = [
    (r"descarga|catalogo|pdf",           "catalogo"),
    (r"imagen|foto",                     "imagenes"),
    (r"modelo",                          "modelos"),
    (r"precio",                          "precios"),
    (r"plano",                           "planos"),
    (r"venta|comprar",                   "venta"),
    (r"construcci|tiempo",               "construccion"),
]
POR_CONTEXTO = POR_TEXTO + [
    (r"llave en mano",  "llave"),
    (r"presupuesto",    "presupuesto"),
    (r"oferta|barat",   "ofertas"),
]

def destino(texto, contexto, seccion):
    mapa = SECCIONES[seccion]
    for patron, clave in POR_TEXTO:
        if re.search(patron, texto, re.I):
            return mapa.get(clave) or SECCIONES["general"][clave]
    for patron, clave in POR_CONTEXTO:
        if re.search(patron, contexto, re.I):
            return mapa.get(clave) or SECCIONES["general"][clave]
    return "/presupuesto/"

def main():
    ensayo = "--ensayo" in sys.argv
    rutas_validas = set()
    for f in glob.glob(os.path.join(PAGINAS, "*.json")):
        rutas_validas.add(json.load(open(f, encoding="utf-8"))["ruta"])

    stats = Counter()
    mapeo = Counter()
    sin_destino = Counter()

    for f in sorted(glob.glob(os.path.join(PAGINAS, "*.json"))):
        d = json.load(open(f, encoding="utf-8"))
        cuerpo = d["cuerpo"]
        if not cuerpo:
            continue
        antes = cuerpo
        seccion = seccion_de(d["ruta"])

        # 1. URLs rotas, de la mas larga a la mas corta para no solapar
        for malo in sorted(REEMPLAZOS, key=len, reverse=True):
            if 'href="%s"' % malo in cuerpo:
                n = cuerpo.count('href="%s"' % malo)
                cuerpo = cuerpo.replace('href="%s"' % malo, 'href="%s"' % REEMPLAZOS[malo])
                stats["urls_corregidas"] += n

        # 2. href="#" por contexto
        if 'href="#"' in cuerpo:
            sopa = BeautifulSoup(cuerpo, "html.parser")
            for a in sopa.find_all("a", href="#"):
                texto = a.get_text(" ", strip=True)
                if not texto:
                    img = a.find("img")
                    texto = (img.get("alt", "") if img else "")
                # h2/h3 anterior como contexto
                contexto = ""
                for prev in a.find_all_previous(["h2", "h3"], limit=1):
                    contexto = prev.get_text(" ", strip=True)
                url = destino(texto, contexto, seccion)
                if url not in rutas_validas:
                    sin_destino[url] += 1
                    url = SECCIONES["general"].get("hub", "/")
                a["href"] = url
                mapeo["%s -> %s" % ((texto or "(imagen)")[:38], url)] += 1
                stats["anclas_resueltas"] += 1
            cuerpo = str(sopa)

        if cuerpo != antes:
            stats["paginas_tocadas"] += 1
            d["cuerpo"] = cuerpo
            if not ensayo:
                json.dump(d, open(f, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    print("ENSAYO" if ensayo else "APLICADO")
    for k, v in sorted(stats.items()):
        print("  %-20s %s" % (k, v))
    if sin_destino:
        print("\n  destinos que NO existen (se han mandado a la portada):")
        for k, v in sin_destino.most_common():
            print("     %4d  %s" % (v, k))
    print("\n  resolucion de los href=\"#\" (top 20):")
    for k, v in mapeo.most_common(20):
        print("     %4d  %s" % (v, k))

if __name__ == "__main__":
    main()
