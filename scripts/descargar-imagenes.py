#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Descarga a public/ todas las imagenes /wp-content/uploads/ referenciadas en
los JSON de src/content/pages/, conservando la estructura ano/mes y SIN
renombrar nada (estan indexadas en Google Imagenes).

Uso: python3 scripts/descargar-imagenes.py [--ensayo] [--hilos N]
"""
import os, re, sys, json, glob, time
from concurrent.futures import ThreadPoolExecutor
import urllib.request, urllib.error

BASE = "https://prefabricadascasas.es"
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLICO = os.path.join(RAIZ, "public")

FIRMAS = {
    b"\xff\xd8\xff": "jpg",
    b"\x89PNG": "png",
    b"RIFF": "webp",
    b"GIF8": "gif",
}

def rutas_referenciadas():
    rutas = set()
    for f in glob.glob(os.path.join(RAIZ, "src", "content", "pages", "*.json")):
        d = json.load(open(f, encoding="utf-8"))
        texto = d.get("cuerpo", "") + json.dumps(d.get("hero", {}), ensure_ascii=False)
        rutas |= set(re.findall(
            r"/wp-content/uploads/\d{4}/\d{2}/[^\s\"'<>)]+?\.(?:jpg|jpeg|png|webp|gif|svg|mp4)",
            texto, re.I))
    return sorted(rutas)

def descargar(ruta):
    destino = os.path.join(PUBLICO, ruta.lstrip("/"))
    if os.path.exists(destino) and os.path.getsize(destino) > 0:
        return ("ya", ruta, os.path.getsize(destino))
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    url = BASE + urllib.parse.quote(ruta, safe="/-_.~")
    for intento in range(3):
        try:
            pet = urllib.request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (migracion prefabricadascasas.es a Astro)"})
            with urllib.request.urlopen(pet, timeout=30) as r:
                datos = r.read()
            if not datos:
                return ("vacio", ruta, 0)
            # verificacion de firma (svg y mp4 no la tienen)
            ext = ruta.rsplit(".", 1)[-1].lower()
            if ext in ("jpg", "jpeg", "png", "webp", "gif"):
                if not any(datos.startswith(f) for f in FIRMAS):
                    return ("firma", ruta, len(datos))
            with open(destino, "wb") as f:
                f.write(datos)
            return ("ok", ruta, len(datos))
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return ("404", ruta, 0)
            time.sleep(1 + intento)
        except Exception:
            time.sleep(1 + intento)
    return ("error", ruta, 0)

def main():
    import urllib.parse  # noqa
    ensayo = "--ensayo" in sys.argv
    hilos = 12
    if "--hilos" in sys.argv:
        hilos = int(sys.argv[sys.argv.index("--hilos") + 1])

    rutas = rutas_referenciadas()
    print("rutas referenciadas: %d" % len(rutas))
    faltan = [r for r in rutas if not os.path.exists(os.path.join(PUBLICO, r.lstrip("/")))]
    print("ya en public/: %d | por descargar: %d" % (len(rutas) - len(faltan), len(faltan)))
    if ensayo:
        for r in faltan[:10]:
            print("   ", r)
        return

    resultados = []
    hecho = 0
    with ThreadPoolExecutor(max_workers=hilos) as ex:
        for res in ex.map(descargar, faltan):
            resultados.append(res)
            hecho += 1
            if hecho % 200 == 0:
                print("   %d/%d" % (hecho, len(faltan)), flush=True)

    from collections import Counter
    cuenta = Counter(r[0] for r in resultados)
    bytes_ok = sum(r[2] for r in resultados if r[0] == "ok")
    print("\nRESULTADO:", dict(cuenta))
    print("descargado: %.1f MB" % (bytes_ok / 1e6))
    fallos = [r for r in resultados if r[0] not in ("ok", "ya")]
    if fallos:
        with open(os.path.join(RAIZ, "imagenes-fallidas.txt"), "w") as f:
            f.write("\n".join("%s\t%s" % (a, b) for a, b, _ in fallos))
        print("fallos anotados en imagenes-fallidas.txt (%d)" % len(fallos))
        for a, b, _ in fallos[:15]:
            print("   %-6s %s" % (a, b))

if __name__ == "__main__":
    import urllib.parse
    main()
