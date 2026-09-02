# prefabricadascasas.es — migración a Astro

Migración de WordPress + Elementor a Astro estático. **493 páginas**, URL por URL,
sin perder ninguna dirección indexada.

## Qué hay aquí

```
src/content/pages/*.json    493 páginas: una por fichero, extraídas del WXR
src/data/site.json          menús, pie, formulario, analítica, verificaciones
src/data/heroes.json        imagen de cabecera de cada página
src/layouts/Base.astro      head, JSON-LD, hero, Analytics, favicon
src/pages/[...slug].astro   la ruta dinámica que pinta las 493
src/components/             Header, Footer, Migas, Formulario
src/styles/global.css       sistema de diseño
src/utils/imagenes.js       marcador SVG cuando falta una imagen
extraer.py                  WXR -> JSON (NO ejecutar salvo reexportar el XML)
scripts/                    descargar imágenes, arreglar enlaces, validar, auditar
```

## Puesta en marcha

```bash
npm install
node scripts/descargar-imagenes.mjs   # 1. las 2.282 imágenes (obligatorio)
npm run build                          # 2. compila a dist/
node scripts/auditar.mjs               # 3. comprueba que todo está bien
```

## El diseño

Mantiene la identidad del sitio original y la ordena. Los tokens salieron del
propio Elementor, contando su uso en el XML:

| | original | aquí |
|---|---|---|
| Color de marca | `#FFCA27` (4.241 usos) | `--amarillo` |
| Secundario | `#159E00` | `--verde` `#12902B` (contraste AA sobre blanco) |
| Texto | `#4A4A4A` / `#3A3A3A` | `--tinta` / `--carbon` |
| Titulares | Roboto Condensed (24.993 usos) | igual |
| Cuerpo | Roboto | igual |
| Hero | foto + capa `rgba(0,0,0,.5)` | igual, con degradado |

Lo que se ha mejorado sobre el original: una sola columna de lectura de 780 px
centrada (el original desparramaba el texto a todo lo ancho), jerarquía de
titulares con una escala fija, barra superior con el contacto, CTA fijo en la
cabecera, franja de cierre antes del pie, FAQ en acordeón nativo (`<details>`,
sin JavaScript) que además alimenta el JSON-LD, formulario único en lugar de los
487 de Contact Form 7, y foco visible en todo lo navegable por teclado.

Todo el sistema está en `src/styles/global.css`, en variables CSS. Cambiar la
marca es cambiar `--amarillo`.

## Las reglas que no se rompen

1. Las rutas `/wp-content/uploads/` **no se renombran nunca**: están indexadas en
   Google Imágenes.
2. **Un solo `<h1>` por página.** Lo pone `Base.astro`; los cuerpos de los JSON no
   llevan ninguno. En este sitio el H1 real era el primer encabezado del contenido
   de Elementor, aunque estuviera marcado como `<h2>`.
3. Los `<script>` de Google Analytics en `Base.astro` llevan `is:inline`. No se lo
   quites o Astro los procesará y dejarán de funcionar.
4. Tras cada cambio: `npm run validar` (valida los JSON), luego `npm run build` y
   `node scripts/auditar.mjs`.
5. **No ejecutes `extraer.py`** salvo que reexportes el XML de WordPress:
   sobrescribe `src/content/pages/` entero y perderías los arreglos de enlazado.

## Estado

| | |
|---|---|
| Páginas generadas | 495 (493 del WXR + 404 + gracias) |
| URLs en el sitemap | 491 |
| Un solo H1 por página | ✅ |
| `href="#"` | 0 (316 resueltos por contexto) |
| Enlaces internos rotos | 0 (836 corregidos) |
| Restos de Elementor / CF7 | 0 |
| Imágenes descargadas | ⛔ pendiente, ver abajo |
| FAQ en JSON-LD | 1.264 preguntas en 313 páginas |

## Lo que falta

1. **Imágenes.** `node scripts/descargar-imagenes.mjs`. Son 2.282 archivos
   (~200 MB) que se bajan del sitio vivo a `public/wp-content/uploads/`
   conservando año/mes. Es idempotente: puedes cortarlo y relanzarlo.
   Hasta que no estén, cada imagen se pinta como un marcador gris.
2. **`src/data/site.json`**: rellenar `analytics.ga4`, `formulario.accessKey`
   (web3forms) y `formulario.destino`.
3. **Páginas legales.** `aviso-legal`, `politica-de-privacidad` y
   `politica-de-cookies` vinieron vacías del WordPress. Hay que escribirlas con
   los datos fiscales reales.
4. **Favicon.** Falta generar `favicon.ico`, `favicon-32.png`, `favicon-96.png` y
   `apple-touch-icon.png` en `public/` a partir del logo.
5. **Netlify.** Conectar el repositorio; `netlify.toml` ya manda la configuración,
   no toques el panel. `public/_headers` bloquea la indexación del subdominio
   `*.netlify.app`: eso se queda hasta que el dominio propio esté apuntando.

## Aviso SEO

Unas 290 páginas (`hormigon-*`, `steel-framing-*`, `casas-de-madera-*`) son casi
idénticas entre sí: contenido escalado. Sirven para cobertura y enlazado interno,
pero Google puede tratarlas como páginas-puerta y ya están en posición media 70+.
Cuando la migración esté estable, hay que diferenciar las que más tráfico traen
con contenido real: proyectos, fotos propias, precios locales y testimonios.
