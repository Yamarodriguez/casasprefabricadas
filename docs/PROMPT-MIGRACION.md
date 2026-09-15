# Prompt: migrar una web de WordPress/Elementor a Astro + Netlify

Copia todo lo que hay debajo de la línea y pégalo como primer mensaje en el nuevo proyecto. Rellena los corchetes.

---

Quiero migrar la web **[DOMINIO]** (WordPress + Elementor, hoy en vivo en https://[DOMINIO]) a un sitio estático en Astro desplegado en Netlify, conservando todas las URL y el posicionamiento, y mejorándola en SEO, velocidad y estructura. Ya hice esta misma migración con prefabricadascasas.es (repo `Yamarodriguez/casasprefabricadas`): **usa ese repo como plantilla de código y de método**. Lo que importa de él es la estructura y el proceso, no el diseño: el diseño de esta web se decide aparte.

Soy el propietario, no soy técnico: explícame las cosas en castellano llano, hazlo tú y súbelo a Git cuando esté verificado.

## Punto de partida

- Export de WordPress (XML): `[RUTA DEL XML]`.
- Sector y palabra clave principal: [SECTOR / KEYWORD].
- Tipos de página que tiene la web: [portada, páginas por provincia/ciudad, páginas por tema (precios, catálogo, modelos...), líneas de producto, legales].
- Cuentas conectadas: AdSense `[ca-pub-…]` (anuncios automáticos), Google Analytics `[G-… o "no lo sé"]`, Search Console (código de verificación `[…]`), WhatsApp `[número]`, correo de contacto `[…]`.
- Datos del titular para las páginas legales: [nombre o razón social, NIF, dirección].

## Arquitectura (la misma que en el repo plantilla)

1. **Contenido como datos.** Un JSON por página en `src/content/pages/` con: `slug, ruta, titulo, h1, tituloSeo, descripcion, palabraClave, noindex, hero{src,alt,ancho,alto,srcset}, faq[], cuerpo (HTML plano extraído del XML), palabras`. Las rutas se conservan tal cual estaban en WordPress. Las imágenes van a `public/wp-content/uploads/` con su misma ruta (están indexadas en Google Imágenes: nunca renombrar).
2. **Una sola plantilla de página** (`src/pages/[...slug].astro`) + layout base con cabecera, héroe (foto principal + H1 + entradilla), migas, contenido, cierre, pie, botón flotante de WhatsApp.
3. **Un motor de reconstrucción** (`src/utils/estructura.js`) que convierte el HTML plano del export en la maquetación que Elementor tenía y perdió: rejilla de tarjetas (pares título+foto), botones (enlaces cortos sueltos), banners (texto+botón+foto), cajas destacadas por tipo de sección (precios, planos, venta...), rejilla de ventajas, directorio de localidades, listas de viñetas escritas a mano, galerías. Todo con expresiones regulares acotadas (nunca `[\s\S]*?` que cruce bloques; siempre `(?:(?!<\/p>)[\s\S])*?`), recogiendo coincidencias primero y sustituyendo de atrás hacia delante. **Conservar el nivel de encabezado que traía el original** (h2/h3/h4) en todo lo que se reconstruya: la jerarquía h1 > h2 > h3 debe quedar igual que en la web en vivo.
4. **Clasificación de cada página** (`src/utils/faq.js → clasificar()`): línea de producto (por la ruta), tema (por la ruta, con lista ordenada de anclas) y localidad (por la palabra clave, quitando el prefijo del producto, con tabla de nombres corregidos). Todo lo generado (preguntas, secciones extra, descripciones, títulos, enlaces hermanos, directorios) sale de esa clasificación.
5. **Generadores por página**, sin tocar el contenido original:
   - Preguntas frecuentes propias (6 por página: tema o localidad + línea), en acordeón `<details>` con `<h2>Preguntas frecuentes de …</h2>` y un `<h3>` por pregunta, colocadas donde iban en el original (antes del mapa o del directorio); con marcado `FAQPage`.
   - Dos secciones H2 + dos párrafos al final, por línea/tema/localidad, con tres variantes rotadas por localidad para que provincias vecinas no repitan texto.
   - Meta descripción y entradilla del héroe: frase natural con palabra clave, un dato y llamada a la acción (120–160 caracteres). Nada de "palabra clave ✅ palabra clave".
   - Título: se conserva el de WordPress si cabe en 60 caracteres; si no, patrón corto con la palabra clave.
   - Alt de la foto principal descriptivo ("Casas de madera en Madrid"), no el nombre del archivo.
   - Bloque "Más opciones en [localidad]" / "Lo mismo en otros tipos": enlaces a la misma localidad o al mismo tema en las otras líneas (silo).
   - Directorio de localidades **completo** de la línea en todas sus páginas (plegado en móvil).
   - Tabla de precios generada en las páginas de precios.
6. **Datos de sitio** en `src/data/site.json` (nombre, dominio, email, titular, WhatsApp, AdSense, GA4, verificaciones, formulario, menús, pie) y textos SEO de modelos en `src/data/modelos.json` (descripción por URL de cada tarjeta).
7. **Imágenes:** copia `.webp` de todo `public/wp-content/uploads` (script `scripts/webp.mjs`, calidad 80, se descarta si no ahorra un 15 %) y `sanearImagenes()` sirve la `.webp` cuando existe; foto principal con `srcset`, `sizes` y `preload`; marcador SVG para archivos que falten y tabla de equivalentes para los que se recuperan con otro nombre.
8. **Fuentes** alojadas en `public/fonts` (subconjunto latin, variables), sin Google Fonts. Máximo dos familias.
9. **Anuncios:** script de AdSense con `data-overlays="bottom"`; CSS con `!important` para que un anuncio insertado dentro de una rejilla o caja ocupe la fila entera, y hueco a cero en cabecera, héroe, formulario, cierre y pie (nunca `display:none` sobre anuncios visibles en contenido). Botón de WhatsApp que sube cuando el ancla de abajo está desplegado.
10. **Netlify:** `netlify.toml` con cabeceras de seguridad y caché; `public/_redirects` con 301 para las URL de WordPress que desaparecen (`sitemap_index.xml`, feeds, categorías, etiquetas, autor, `wp-admin`) y para el subdominio `.netlify.app` → dominio. Bloqueo `noindex` en cabeceras solo mientras el dominio no apunte a Netlify; se quita al hacer el cambio. Sitemap con `lastmod` y sin legales; `robots.txt`.
11. **Legales:** aviso legal, privacidad y cookies escritos (WordPress suele exportarlos vacíos si usaba un plugin), con los datos del titular en `site.json`; `noindex` en ellas. Favicons generados desde el logo (`scripts/favicons.mjs`).
12. **JSON-LD:** WebSite, Organization (logo, teléfono, contactPoint), WebPage, BreadcrumbList, FAQPage.

## Método de trabajo (en este orden)

1. Extraer el XML a JSON, descargar imágenes, levantar el sitio con la plantilla. Comparar **encabezado a encabezado** cada página nueva con la web en vivo (descargar las páginas en vivo y extraer h1–h3): la estructura debe coincidir, salvo el logo repetido en el cuerpo (se quita) y lo que se añade.
2. Reconstruir la maquetación con el motor y **validar las 100 % de las páginas con un script**: equilibrio de `<p>`, `<a>`, `<div>`, `<section>`, `<h2>`, `<h3>`; ningún bloque generado anidado dentro de otro; texto visible idéntico al original salvo lo añadido; ningún `href` perdido; ninguna imagen marcador. No se sube nada que no pase esa validación.
3. Revisión visual con capturas de Playwright (escritorio 1400 px y móvil 390 px) de una página de cada tipo, por trozos de 1.800 px, con las imágenes lazy ya cargadas (recorrer la página antes de capturar). No fiarse del panel de vista previa para capturas.
4. Búsqueda automática de patrones feos en todo el sitio: fotos sueltas a nivel raíz, encabezados seguidos sin contenido, tarjetas sin enlace o con enlace equivocado, párrafos con "●", galerías apiladas, estilos en línea del editor (`font-size` en `<strong>`), avisos de obras olvidados ("Estamos realizando modificaciones…").
5. Generadores SEO (preguntas, secciones, descripciones, títulos, hermanos, directorios, tablas) y auditoría SEO completa: técnica, on-page, similitud de vocabulario entre páginas de provincia, palabras clave sin página, competencia. Publicar el informe.
6. Páginas nuevas para las búsquedas que no tenían página (guías de 600–1.000 palabras con H2/H3, listas, enlaces internos y sus propias preguntas), enlazadas desde menú y pie.
7. Migración: dominio en Netlify, DNS en el registrador (A `75.2.60.5` en el apex, CNAME `www` al `.netlify.app`), quitar `noindex`, sitemap en Search Console, aviso de cookies certificado de AdSense (Privacidad y mensajes), GA4. No cancelar el hosting antiguo hasta pasado un mes.

## Reglas que aprendimos a golpes

- **El contenido original no se modifica**: se añade alrededor o se reconstruye su maquetación. Las correcciones puntuales (enlaces muertos, foto de otra localidad, avisos de obras) se hacen en el motor con una regla documentada, no editando JSON a mano.
- **Estructura fiel al original**: mismos H2/H3 y mismo orden; los títulos que se inventan (formulario, banners montados a partir de texto, pie, cierre) van en `<p>` con clase, no en encabezados.
- Ningún texto SEO inventa datos: precios, plazos y normativa salen de lo que ya dice la web o son rangos verificados y consistentes entre preguntas, secciones, tablas y descripciones.
- Cada corrección de diseño se aplica por **tipo de bloque**, para que valga en las 500 páginas, y se comprueba con la validación y una captura.
- En Windows, el shell colapsa las barras invertidas: cualquier código con `\n`, `\s`, `\b` se escribe con las herramientas de edición de archivos, nunca con heredocs ni `node -e`.
- No hacer `git push` si la compilación falla; validar, compilar, y entonces subir. Mensajes de commit que digan qué cambia y por qué.
- Móvil: letra de 16 px, barra superior en una línea, directorio de localidades plegado, botones que no se salgan de su caja, imágenes cuadradas enteras (no recortadas).

## Entregables

- Repo en GitHub conectado a Netlify, compilando en verde.
- 100 % de las páginas validadas; capturas de escritorio y móvil de cada tipo de página.
- Informe de auditoría SEO y plan de acción priorizado.
- Lista clara de lo que solo puedo hacer yo (IDs, DNS, cuentas), con instrucciones paso a paso.

Empieza por leer el repo plantilla, dime qué necesitas de mí y arranca por el punto 1.
