/**
 * Reconstruye la maquetación que se perdió al migrar desde Elementor.
 *
 * El export de WordPress deja el cuerpo como un documento plano: título,
 * imagen, título, imagen... En el original esos pares eran una rejilla de
 * tarjetas de 3 columnas. Aquí se detectan y se vuelven a agrupar.
 *
 * Patrón que se busca (se repite en 452 de las 493 páginas):
 *   <h3><a href="/madera/">Casas prefabricadas de Madera</a></h3>
 *   <p><a href="/madera/"><img ...></a></p>
 *
 * Y una variante sin el <p> (46 páginas más, 420 pares), donde la imagen
 * cuelga directa del título en vez de venir envuelta en un párrafo:
 *   <h3>Catalogo casas prefabricadas Modernas</h3>
 *   <img ...>
 */

import textos from '../data/modelos.json' with { type: 'json' };
import { resolverSeccion } from '../data/secciones-destacadas.js';
import { enlaceDeModelo } from '../data/enlaces-modelos.js';

/**
 * Quita el logo de la empresa cuando aparece metido en el cuerpo del
 * artículo como si fuera una foto más. Es ruido heredado de Elementor
 * (probablemente un widget "volver al inicio"): mismo título exacto,
 * mismo destino y la misma imagen del logo en las 223 páginas donde
 * aparece. El logo real ya está en la cabecera; aquí solo confunde.
 *
 * Se quitan el título y la imagen por separado, sin tocar nunca el <p>
 * que a veces los envuelve: en un puñado de páginas ese mismo <p> trae
 * además un enlace útil justo detrás de la imagen ("Todos los modelos
 * Viviendas de madera"). Tocar el <p> ahí reproduce el mismo bug de los
 * </p> huérfanos que ya salió con la variante de tarjetas sin <p>; no
 * tocarlo en absoluto lo evita de raíz y de paso conserva ese enlace.
 */
const LOGO_TITULO = /<h3\b[^>]*>\s*<a\b[^>]*href="\/"[^>]*>\s*Casas Prefabricadas\s*<\/a>\s*<\/h3>/gi;
const LOGO_IMAGEN =
  /<a\b[^>]*href="\/"[^>]*>\s*<img\b[^>]*src="[^"]*casas-prefabricadas--[^"]*"[^>]*>\s*<\/a>/gi;
const PARRAFO_VACIO = /<p\b[^>]*>\s*<\/p>/gi;

export function quitarLogoDuplicado(html) {
  if (!html) return html;
  return html.replace(LOGO_TITULO, '').replace(LOGO_IMAGEN, '').replace(PARRAFO_VACIO, '');
}

/**
 * Envuelve en <p> el texto que viene suelto, sin párrafo alrededor. En
 * algunas páginas el contenido detrás de un <h2> llega como texto pelado
 * con <strong> intercalados, sin un solo <p>. De ahí salían tres
 * síntomas que parecían independientes y eran el mismo problema:
 *
 *   - el texto se partía línea a línea (al ser hijo directo de un
 *     contenedor flex, cada <strong> se volvía un elemento flex);
 *   - el enlace de llamada a la acción no se convertía en botón;
 *   - la foto se quedaba suelta en medio, sin montarse como banner.
 *
 * Las tres reglas de más abajo necesitan el <p> para reconocer el
 * patrón, así que se arregla aquí, en el origen, y no una por una.
 *
 * Las imágenes y los iframes se dejan como bloque aparte (no se meten
 * dentro del párrafo): el resto del archivo los busca así. Y un <a> que
 * solo envuelve una imagen se trata como una pieza, para no partirlo por
 * la mitad y dejar el <a> abierto en un párrafo y cerrado en otro.
 */
const BLOQUE_O_PIEZA = new RegExp(
  '<(p|h[1-6]|ul|ol|table|figure|blockquote|iframe|aside)\\b[^>]*>[\\s\\S]*?<\\/\\1>' +
    '|<a\\b[^>]*>\\s*<img\\b[^>]*>\\s*<\\/a>' +
    '|<(?:img|br|hr)\\b[^>]*?\\/?>',
  'gi'
);

function textoVisible(s) {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/&(?:nbsp|#160|#xa0);/gi, ' ')
    .replace(/ /g, ' ')
    .trim();
}

/* El texto suelto trae un salto de línea entre cada bloque lógico
   (título / subtítulo / descripción eran widgets distintos en Elementor).
   Cada línea pasa a su propio <p>: así el título del banner se detecta
   solo y no se pega todo en un único párrafo. Medido antes de hacerlo:
   de 31 tiradas con saltos, solo 1 partía una frase por la mitad —esa
   línea empieza en minúscula, y por eso se vuelve a unir a la anterior. */
/* Parte solo en los saltos que quedan FUERA de cualquier etiqueta abierta.
   Los enlaces llegan con el salto dentro (<a href="/render/">⏎DISEÑO 3D⏎</a>),
   y partir ahí dejaba la apertura y el cierre en líneas vacías que se
   descartaban: el texto se quedaba, pero el enlace desaparecía. Se
   recorre el texto contando etiquetas abiertas y solo cuenta el salto
   cuando no hay ninguna. */
function partirEnLineas(trozo) {
  const lineas = [];
  let actual = '';
  let profundidad = 0;
  const re = /<\/?([a-z][a-z0-9]*)\b[^>]*>|\n+|[^<\n]+/gi;
  for (const m of trozo.matchAll(re)) {
    const t = m[0];
    if (t[0] === '<') {
      if (t[1] === '/') profundidad = Math.max(0, profundidad - 1);
      else if (!/\/>$/.test(t) && !/^<(?:br|hr|img|input|meta|link)\b/i.test(t)) profundidad++;
      actual += t;
    } else if (t[0] === '\n') {
      if (profundidad === 0) { lineas.push(actual); actual = ''; }
      else actual += ' ';
    } else {
      actual += t;
    }
  }
  lineas.push(actual);
  return lineas;
}

function envolverTrozo(trozo) {
  if (!trozo) return trozo;
  if (!textoVisible(trozo)) return trozo; // solo espacios: se deja igual, hay reglas que miran eso

  const lineas = [];
  for (const cruda of partirEnLineas(trozo)) {
    const l = cruda.trim();
    if (!textoVisible(l)) continue;
    const empiezaEnMinuscula = /^[a-záéíóúñü]/.test(textoVisible(l));
    if (empiezaEnMinuscula && lineas.length) lineas[lineas.length - 1] += ' ' + l;
    else lineas.push(l);
  }
  return lineas.map((l) => `<p>${l}</p>`).join('');
}

/* En 3 páginas (la portada entre ellas) el marcador del formulario viene
   METIDO en el mismo <p> que el texto del catálogo y su portada. La
   página parte el cuerpo por ese marcador, así que el <p> se abría en un
   trozo y se cerraba en el otro: el texto quedaba suelto, el enlace no
   pasaba a botón y la portada se quedaba flotando. Se saca el marcador
   fuera del párrafo antes de nada. */
const ASIDE_DENTRO_DE_P = /<p\b[^>]*>\s*(<aside\b[^>]*data-formulario="1"[^>]*>\s*<\/aside>)\s*/gi;

export function envolverTextoSuelto(html) {
  if (!html) return html;
  html = html.replace(ASIDE_DENTRO_DE_P, '$1<p>');
  let salida = '';
  let ultimo = 0;
  for (const m of html.matchAll(BLOQUE_O_PIEZA)) {
    salida += envolverTrozo(html.slice(ultimo, m.index)) + m[0];
    ultimo = m.index + m[0].length;
  }
  return salida + envolverTrozo(html.slice(ultimo));
}

/* Un par = encabezado con (o sin) enlace + imagen, con o sin el <p> que a
   veces la envuelve. Las dos variantes van en ramas separadas (no como
   apertura/cierre opcionales de forma independiente): si el <p> está,
   hace falta su </p> justo detrás. Si no, esa rama no encaja y no se
   toca nada —así una imagen con contenido extra detrás (un enlace más
   dentro del mismo <p>) se deja intacta en vez de partir el HTML y dejar
   un </p> huérfano. */
const PAR = new RegExp(
  // el título puede venir en <h2>, <h3> o <h4> según la página: en 11
  // páginas de casetas las tarjetas van en h4 (62 pares) y sin esto se
  // quedaban como una torre de fotos sueltas (\\k referencia el mismo
  // nivel capturado en la apertura, para no cerrar un <h2> con </h3>)
  '<(?<etiqueta>h[234])\\b[^>]*>\\s*' +
    '(?:<a\\b[^>]*href="(?<urlTitulo>[^"]*)"[^>]*>)?' +
    // texto del título: no puede cruzar otro encabezado, o se traga los
    // <h2>/<h3> intermedios y pierde contenido.
    '\\s*(?<titulo>(?:(?!<\\/\\k<etiqueta>>)(?!<h[1-6]\\b)[\\s\\S])*?)\\s*' +
    '(?:<\\/a>)?\\s*<\\/\\k<etiqueta>>\\s*' +
    '(?:' +
      // en 224 páginas el <p> de la última tarjeta lleva detrás de la foto
      // el enlace "Todos los modelos Viviendas prefabricadas": se admite
      // (cola) y se saca fuera de la rejilla como botón
      '<p\\b[^>]*>\\s*(?:<a\\b[^>]*href="(?<urlImgP>[^"]*)"[^>]*>)?\\s*(?<imgP><img\\b[^>]*>)\\s*(?:<\\/a>)?\\s*' +
        '(?<cola><a\\b[^>]*href="[^"]*"[^>]*>\\s*[^<]{1,45}?\\s*<\\/a>)?\\s*<\\/p>' +
      '|' +
      '(?:<a\\b[^>]*href="(?<urlImgSuelta>[^"]*)"[^>]*>)?\\s*(?<imgSuelta><img\\b[^>]*>)\\s*(?:<\\/a>)?' +
    ')',
  'gi'
);

/** Ajusta `sizes` al ancho real de la tarjeta: evita descargar la imagen grande. */
function afinarImagen(img) {
  const limpio = img.replace(/\ssizes="[^"]*"/i, '');
  if (!/\ssrcset=/i.test(limpio)) return limpio;
  return limpio.replace(/<img\b/i, '<img sizes="(max-width: 760px) 100vw, 360px"');
}

function escapar(s) {
  return String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
}

/** Texto SEO del modelo, si lo hay en src/data/modelos.json. */
function descripcion(url) {
  if (!url) return '';
  const texto = textos[url] || textos[url.replace(/\/?$/, '/')];
  return texto ? `<p class="modelo__texto">${escapar(texto)}</p>` : '';
}

/* El título conserva el nivel que traía (h3 en la portada: "Casa
   prefabricada de Madera", "Casa prefabricada Hormigón"...): es la
   estructura h1 > h2 > h3 que ya tenía el original y que Google conoce.
   Todo el marcado es de bloque (div/h3/p), porque un encabezado dentro
   de un <span> no es HTML válido. */
function tarjeta({ url, titulo, img, etiqueta }) {
  const foto = `<div class="modelo__foto">${afinarImagen(img)}</div>`;
  const cuerpo =
    `<div class="modelo__cuerpo"><${etiqueta} class="modelo__titulo">${titulo}</${etiqueta}>` +
    `${descripcion(url)}</div>`;
  return url
    ? `<article class="modelo"><a class="modelo__enlace" href="${escapar(url)}">${foto}${cuerpo}</a></article>`
    : `<article class="modelo"><div class="modelo__enlace">${foto}${cuerpo}</div></article>`;
}

/**
 * Agrupa en rejillas los pares consecutivos. Solo se agrupan las series de
 * `minimo` o más: un par suelto se deja tal cual estaba.
 */
/* mínimo 2: la única serie de dos en todo el sitio es "Casas Steel
   Framing" + "Perfiles Steel Framing" (108 páginas), que se quedaba
   como dos fotos enormes apiladas */
export function agruparModelos(html, minimo = 2) {
  if (!html) return html;

  // 1. localizar todos los pares con su posición
  const encontrados = [];
  for (const m of html.matchAll(PAR)) {
    const g = m.groups;
    const titulo = g.titulo.replace(/<[^>]+>/g, '').trim();
    if (!titulo) continue;
    encontrados.push({
      inicio: m.index,
      fin: m.index + m[0].length,
      // las tarjetas que llegaron sin enlace, o con el equivocado del
      // original (tres casetas apuntaban a /modernas/), se corrigen por título
      url: enlaceDeModelo(titulo, g.urlTitulo || g.urlImgP || g.urlImgSuelta || ''),
      titulo,
      img: g.imgP || g.imgSuelta,
      etiqueta: g.etiqueta.toLowerCase(),
      cola: g.cola || '',
    });
  }
  if (encontrados.length < minimo) return html;

  // 2. agrupar los que van seguidos (entre uno y otro solo puede haber espacios)
  const series = [];
  let serie = [encontrados[0]];
  for (let i = 1; i < encontrados.length; i++) {
    const previo = encontrados[i - 1];
    const actual = encontrados[i];
    const enmedio = html.slice(previo.fin, actual.inicio);
    if (enmedio.trim() === '') {
      serie.push(actual);
    } else {
      series.push(serie);
      serie = [actual];
    }
  }
  series.push(serie);

  // 3. reescribir de atrás hacia delante para no invalidar las posiciones
  let salida = html;
  for (const s of series.reverse()) {
    if (s.length < minimo) continue;
    // el enlace que venía pegado a la última foto sale detrás de la
    // rejilla en su propio <p>: convertirEnBotones lo hace botón después
    const colas = s.filter((x) => x.cola).map((x) => `<p>${x.cola}</p>`).join('');
    const clase = s.length === 2 ? 'modelos modelos--pareja' : 'modelos';
    const rejilla = `<div class="${clase}">${s.map(tarjeta).join('')}</div>${colas}`;
    salida = salida.slice(0, s[0].inicio) + rejilla + salida.slice(s[s.length - 1].fin);
  }
  return salida;
}

/**
 * Convierte en botón los párrafos que solo contienen un enlace corto de
 * llamada a la acción ("Precios!", "Ofertas!", "Haz clic aquí"...). En el
 * original eran botones de Elementor; al migrar quedaron como texto plano
 * dentro de un párrafo. Se repite en 487 de las 493 páginas (4168 casos,
 * solo 21 textos distintos: sin falsos positivos).
 *
 * Van en verde: en capturas reales del sitio original estos botones de
 * contenido ("Precios!", "Ofertas!", "Planos!"...) son siempre verdes.
 * El amarillo queda reservado para las llamadas a la acción principales
 * (las del héroe: "Pedir presupuesto").
 */
/* hasta 45 letras: "Todos los modelos Viviendas prefabricadas" (320
   enlaces sueltos bajo la rejilla de modelos) tiene 41 y se quedaba como
   un enlace perdido a la izquierda */
const CTA = /<p\b[^>]*>\s*<a\b([^>]*href="[^"]*"[^>]*)>\s*([^<]{1,45}?)\s*<\/a>\s*<\/p>/gi;

/* Y la otra mitad del mismo caso: el enlace va PEGADO al final del
   párrafo, con texto delante, en vez de en un párrafo propio
   (4551 casos en 487 páginas, los mismos 20 textos de siempre:
   "Haz clic aquí", "Ofertas!", "Llave en mano"...). Ahí el botón se
   saca a su propio párrafo detrás del texto, para que la pareja de
   tarjetas no quede descuadrada —una con botón y la otra con un
   enlace subrayado perdido al final de la frase. */
/* El texto de delante NO puede cruzar el límite del párrafo: con un
   comodín suelto, una sola coincidencia se tragaba varios párrafos
   hasta el siguiente enlace corto, y al bloquearla la guarda de abajo
   los CTA legítimos que quedaban dentro de ese tramo ya no se
   convertían (solo 408 de 4551 se promovían). */
const CTA_PEGADO =
  /<p\b([^>]*)>((?![\s]*<a)(?:(?!<\/p>)(?!<p\b)[\s\S])*?)<a\b([^>]*href="[^"]*"[^>]*)>\s*([^<]{1,30}?)\s*<\/a>\s*<\/p>/gi;

export function convertirEnBotones(html) {
  if (!html) return html;
  return html
    .replace(CTA, (todo, atributos, texto) => {
      if (!texto.trim()) return todo; // enlace vacío: nada que mostrar
      return `<p class="cta"><a class="boton boton--verde boton--pequeno"${atributos}>${texto}</a></p>`;
    })
    .replace(CTA_PEGADO, (todo, attrsP, antes, atributos, texto) => {
      if (!texto.trim()) return todo;
      // ya convertido por la regla anterior: no volver a envolverlo, o el
      // <a> acaba con el atributo class duplicado
      if (/\bcta\b/.test(attrsP) || /\bboton\b/.test(atributos)) return todo;
      // "sin texto delante" hay que medirlo quitando tambien las entidades:
      // el contenido viene lleno de &nbsp;, que .trim() no considera espacio
      // porque es la cadena literal, y colaba parrafos vacios.
      const soloTexto = antes
        .replace(/<[^>]+>/g, '')
        .replace(/&(?:nbsp|#160|#xa0);/gi, ' ')
        .replace(/ /g, ' ')
        .trim();
      if (!soloTexto) return todo; // lo cubre la regla CTA de arriba
      return (
        `<p${attrsP}>${antes.trimEnd()}</p>` +
        `<p class="cta"><a class="boton boton--verde boton--pequeno"${atributos}>${texto}</a></p>`
      );
    });
}

/**
 * Agrupa en tarjetas la lista fija de ventajas (Ecológicas, Tiempo de
 * construcción, Economicas, Versatilidad, Movilidad): en el original era
 * una franja verde con las 5 en rejilla; aquí quedan como <h2> sueltos
 * apilados. Se identifican por título exacto —no por "3 h2+p seguidos en
 * general", que en la práctica también engancha secciones sin relación
 * que casualmente caen justo al lado (comprobado antes de escribir esto:
 * agrupar por umbral metía la intro y la sección siguiente dentro de la
 * misma rejilla). Aparecen siempre las 5 juntas, en las mismas 20 páginas.
 */
const TITULOS_VENTAJAS = ['Ecológicas', 'Tiempo de construcción', 'Economicas', 'Económicas', 'Versatilidad', 'Movilidad'];
/* En la portada y en las páginas de provincia las ventajas van en <h3>,
   no en <h2>; se aceptan los dos niveles (mismo cierre que apertura). */
const VENTAJA = /<(h[23])\b[^>]*>([^<]*)<\/\1>\s*<p\b[^>]*>((?:(?!<\/p>)[\s\S])*?)<\/p>/gi;

export function agruparVentajas(html) {
  if (!html) return html;

  const encontrados = [];
  for (const m of html.matchAll(VENTAJA)) {
    const titulo = m[2].trim();
    if (TITULOS_VENTAJAS.includes(titulo)) {
      // m[1] es el nivel del encabezado (h2/h3): se conserva en la tarjeta
      encontrados.push({ inicio: m.index, fin: m.index + m[0].length, titulo, texto: m[3], etiqueta: m[1].toLowerCase() });
    }
  }
  if (encontrados.length < 3) return html;

  const series = [];
  let serie = [encontrados[0]];
  for (let i = 1; i < encontrados.length; i++) {
    const enmedio = html.slice(encontrados[i - 1].fin, encontrados[i].inicio);
    if (enmedio.trim() === '') serie.push(encontrados[i]);
    else { series.push(serie); serie = [encontrados[i]]; }
  }
  series.push(serie);

  let salida = html;
  for (const s of series.reverse()) {
    if (s.length < 3) continue;
    const tarjetas = s
      .map((v) => `<div class="tarjeta"><${v.etiqueta} class="tarjeta__titulo">${v.titulo}</${v.etiqueta}><p>${v.texto}</p></div>`)
      .join('');
    salida = salida.slice(0, s[0].inicio) + `<div class="rejilla">${tarjetas}</div>` + salida.slice(s[s.length - 1].fin);
  }
  return salida;
}

/**
 * Junta en una nube de etiquetas los directorios de enlaces (localidades,
 * secciones relacionadas...). En el original eran listas en columnas; aquí
 * llegan como <ul> planos y consecutivos —a veces partidos en 2 o 3 listas
 * seguidas— que se renderizan como un muro de viñetas. Se repite en 71
 * páginas (284 listas, 5394 enlaces).
 */
function comoListaDeEnlaces(interiorUl) {
  const items = [...interiorUl.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)];
  if (items.length < 3) return null;
  const soloEnlaces = items.every((m) => /^<a\b[^>]*>[\s\S]*<\/a>$/.test(m[1].trim()));
  return soloEnlaces ? items.map((m) => m[1].trim()) : null;
}

export function agruparDirectorios(html) {
  if (!html) return html;

  const encontrados = [];
  for (const m of html.matchAll(/<ul\b[^>]*>([\s\S]*?)<\/ul>/gi)) {
    const items = comoListaDeEnlaces(m[1]);
    if (items) encontrados.push({ inicio: m.index, fin: m.index + m[0].length, items });
  }
  if (!encontrados.length) return html;

  const series = [];
  let serie = [encontrados[0]];
  for (let i = 1; i < encontrados.length; i++) {
    const enmedio = html.slice(encontrados[i - 1].fin, encontrados[i].inicio);
    if (enmedio.trim() === '') serie.push(encontrados[i]);
    else { series.push(serie); serie = [encontrados[i]]; }
  }
  series.push(serie);

  let salida = html;
  for (const s of series.reverse()) {
    const items = s.flatMap((x) => x.items);
    const lista = `<ul class="zonas">${items.map((it) => `<li>${it}</li>`).join('')}</ul>`;
    salida = salida.slice(0, s[0].inicio) + lista + salida.slice(s[s.length - 1].fin);
  }
  return salida;
}

/**
 * Junta en chips los subtítulos sueltos que no llevan ni enlace ni foto
 * ("Casas prefabricadas 20 m2", "...30 m2"...): en el original eran un
 * filtro rápido por tamaño/plantas/habitaciones; sin el enlace que
 * llevaban en Elementor, quedan como una torre de encabezados vacíos
 * apilados. Se repite en 17 páginas (25 series, poco frecuente pero muy
 * visible donde aparece: hasta 8 seguidos).
 */
const H3_PLANO = /<(h[34])\b[^>]*>((?:(?!<\/h[34]>)(?!<a\b)[\s\S])*?)<\/\1>/gi;

export function agruparEtiquetas(html, minimo = 3) {
  if (!html) return html;

  const encontrados = [];
  for (const m of html.matchAll(H3_PLANO)) {
    const texto = m[2].replace(/<[^>]+>/g, '').trim();
    // se conserva la etiqueta (h3/h4): en el original eran encabezados y
    // la estructura de la página sigue siendo la suya; el CSS los pinta
    // como chips
    if (texto) encontrados.push({ inicio: m.index, fin: m.index + m[0].length, texto, etiqueta: m[1].toLowerCase() });
  }
  if (encontrados.length < minimo) return html;

  const series = [];
  let serie = [encontrados[0]];
  for (let i = 1; i < encontrados.length; i++) {
    const enmedio = html.slice(encontrados[i - 1].fin, encontrados[i].inicio);
    if (enmedio.trim() === '') serie.push(encontrados[i]);
    else { series.push(serie); serie = [encontrados[i]]; }
  }
  series.push(serie);

  let salida = html;
  for (const s of series.reverse()) {
    if (s.length < minimo) continue;
    const chips =
      `<div class="etiquetas">` +
      s.map((x) => `<${x.etiqueta} class="etiqueta">${escapar(x.texto)}</${x.etiqueta}>`).join('') +
      `</div>`;
    salida = salida.slice(0, s[0].inicio) + chips + salida.slice(s[s.length - 1].fin);
  }
  return salida;
}

/**
 * Reconstruye las cajas de Precios/Ofertas/Planos/Venta/Fabricantes/
 * Financiación/Imágenes/Construcción/Presupuesto: en el original son foto
 * de fondo + capa oscura + título y botón encima (igual que el héroe de
 * la página), a veces solas a todo el ancho ("banda"), a veces en pareja
 * de 2 ("tarjeta"), a veces en pareja con la foto a un lado y el texto
 * aparte, sin superponer ("horizontal") —comprobado contra capturas
 * reales del sitio, cada tipo es literal, no una aproximación.
 *
 * La foto de fondo se recuperó por nombre de archivo desde una
 * exportación nueva de la biblioteca de medios (2026-09-03): el
 * Elementor original la ponía por CSS, no por <img>, así que nunca se
 * guardó en la extracción de WordPress y no había forma de recuperarla
 * desde el contenido. Se usa solo si esa sección no trae ya su propia
 * imagen (algunas páginas sí la conservaron; ver src/data/secciones-destacadas.js).
 *
 * El título varía por página ("Presupuesto de casas prefabricadas
 * Albacete", 215 variantes solo para esa sección), así que se reconoce
 * por un fragmento estable, no por el título completo —y se conserva el
 * título real de cada página en la tarjeta.
 */
/* El cuerpo va envuelto en su propio bloque, no suelto dentro de la
   caja: la caja es un contenedor flex y en las páginas donde el texto
   llega sin <p> alrededor (25 casos en 3 páginas) cada <strong> y cada
   trozo de texto se convertía en un elemento flex y caía en su propia
   línea, partiendo la frase. Dentro de este bloque el texto fluye
   normal, venga envuelto o no. */
/* Las bandas (a todo el ancho) llevan el texto sobre la MISMA foto
   oscurecida y desenfocada, como en el original (foto de fondo + capa
   oscura + título en blanco). La ruta va en una variable CSS y solo la
   usa la banda; las tarjetas la ignoran. */
function fondoDe(fotoHtml) {
  const src = (String(fotoHtml || '').match(/\ssrc="([^"]*)"/i) || [])[1];
  return src ? ` style="--fondo:url('${src.replace(/'/g, '%27')}')"` : '';
}

/* En el original la banda tiene un rótulo pequeño en ámbar (el título de
   la sección) y una FRASE GRANDE en blanco ("¿Te gustaría ver tu casa en
   3D antes de construirla?"). Esa frase es el primer párrafo del cuerpo
   cuando es corto y sin negritas: se marca para que el CSS lo agrande. */
const PRIMER_P = /(<div class="destacado__cuerpo">\s*)<p>([^<]{8,110})<\/p>/i;

function marcarLema(cajaHtml) {
  return cajaHtml.replace(PRIMER_P, '$1<p class="destacado__lema">$2</p>');
}

/* El título sigue siendo <h2>: en el original "Casas Prefabricadas
   Precios", "Planos de casas prefabricadas"... eran secciones h2 de la
   página, y meterlas en una caja no cambia lo que son. La clase es la
   que fija el tamaño, no la etiqueta. */
/* El destino del botón de la caja ("Precios!", "Haz clic aquí"...), para
   que el título y la foto lleven al mismo sitio y no solo el botón. */
function destinoDe(botonHtml) {
  return (String(botonHtml || '').match(/\shref="([^"]*)"/i) || [])[1] || '';
}

function enlazarFoto(fotoTag, href) {
  if (!href || /^<a\b/i.test(fotoTag.trim())) return fotoTag; // ya enlazada
  return `<a href="${href}">${fotoTag}</a>`;
}

function tarjetaDestacado({ titulo, resto, boton }) {
  const href = destinoDe(boton);
  const titular = href ? `<a href="${href}">${titulo}</a>` : titulo;
  return (
    `<h2 class="destacado__titulo">${titular}</h2>` +
    `<div class="destacado__cuerpo">${resto}</div>` +
    (boton || '')
  );
}

export function destacarSecciones(html) {
  if (!html) return html;

  // 1. localizar cada sección conocida, sin tocar el HTML todavía
  const encontradas = [];
  for (const m of html.matchAll(/<h2\b[^>]*>([^<]*)<\/h2>/gi)) {
    const titulo = m[1].trim();
    const seccion = resolverSeccion(titulo);
    if (!seccion) continue;

    const inicio = m.index;
    const finTitulo = m.index + m[0].length;
    /* el cuerpo llega hasta el siguiente h2, o hasta la marca de las
       preguntas frecuentes (src/utils/faq.js) si viene antes: en la
       portada iba justo detrás de "Presupuesto" y se colaba dentro de
       esa caja */
    const siguienteH2 = html.indexOf('<h2', finTitulo);
    const marcaFaq = html.indexOf('<aside data-faq', finTitulo);
    const cortes = [siguienteH2, marcaFaq].filter((x) => x >= 0);
    const limite = cortes.length ? Math.min(...cortes) : Math.min(html.length, finTitulo + 2000);
    let cuerpo = html.slice(finTitulo, limite);

    /* Si debajo del título hay una rejilla o un directorio, ese <h2> no
       es una caja de llamada a la acción: es el encabezado de la rejilla
       ("Modelos de Casas Prefabricadas baratas", "Otros tipos de casas
       llave en mano"...). Envolverlo metía las tarjetas de modelos
       dentro de una tarjeta con foto. Son 11 casos en 11 páginas. */
    if (/class="(?:modelos|rejilla|zonas|destacados)"/.test(cuerpo)) continue;

    // si la sección trae su propia foto, se usa esa en vez de la recuperada;
    // si la propia es el marcador "imagen no disponible" (el archivo no
    // existe), se quita y se usa la recuperada
    const imgPropia = cuerpo.match(/<img\b[^>]*>/i);
    const propiaValida = imgPropia && !/src="data:/i.test(imgPropia[0]);
    const fotoTag = propiaValida
      ? imgPropia[0]
      : `<img src="${seccion.src}" alt="${escapar(seccion.alt)}" loading="lazy" width="820" height="460" />`;
    if (imgPropia) cuerpo = cuerpo.replace(imgPropia[0], '');

    // el botón ya viene marcado con class="cta" por convertirEnBotones,
    // que corre antes que esta función; se separa del resto del texto
    const boton = cuerpo.match(/<p class="cta">[\s\S]*?<\/p>/i);
    const resto = boton ? cuerpo.replace(boton[0], '') : cuerpo;

    encontradas.push({
      inicio,
      fin: limite,
      tipo: seccion.vista,
      grupo: seccion.grupo,
      titulo,
      fotoTag,
      resto: resto.trim(),
      boton: boton ? boton[0] : '',
    });
  }
  if (!encontradas.length) return html;

  // 2. emparejar las de tipo tarjeta/horizontal cuando van seguidas y
  //    comparten grupo; el resto (o las que se quedan sin pareja en esta
  //    página) van solas.
  const bloques = [];
  let i = 0;
  while (i < encontradas.length) {
    const actual = encontradas[i];
    const siguiente = encontradas[i + 1];
    const vanSeguidas = siguiente && html.slice(actual.fin, siguiente.inicio).trim() === '';
    const sonPareja =
      actual.tipo !== 'banda' && siguiente && actual.grupo && actual.grupo === siguiente.grupo && vanSeguidas;

    if (sonPareja) {
      bloques.push({ inicio: actual.inicio, fin: siguiente.fin, tipo: actual.tipo, items: [actual, siguiente] });
      i += 2;
    } else {
      bloques.push({ inicio: actual.inicio, fin: actual.fin, tipo: actual.tipo, items: [actual] });
      i += 1;
    }
  }

  /* 3. construir el marcado. Las tres variantes comparten la MISMA
     estructura (foto + caja); lo único que cambia es la clase, y de la
     distribución se encarga el CSS. Antes la horizontal tenía su propio
     marcado con el título superpuesto sobre la foto: ya no, porque el
     texto va sobre fondo limpio. */
  function unaPieza(s, variante, etiqueta = 'article') {
    return (
      `<${etiqueta} class="destacado destacado--${variante}">` +
      `<div class="destacado__foto">${enlazarFoto(s.fotoTag, destinoDe(s.boton))}</div>` +
      `<div class="destacado__caja"${fondoDe(s.fotoTag)}>${marcarLema(tarjetaDestacado(s))}</div>` +
      `</${etiqueta}>`
    );
  }

  function marcadoDeBloque(b) {
    if (b.tipo === 'banda') return unaPieza(b.items[0], 'banda', 'section');

    const variante = b.tipo === 'horizontal' ? 'horizontal' : 'tarjeta';
    /* una tarjeta sin pareja va sola a todo el ancho: como banda (foto
       al lado del texto), no como tarjeta suelta con la foto encima a
       1293px de ancho, que salía gigante (Financiación en /modelos/) */
    if (b.items.length < 2) {
      return unaPieza(b.items[0], variante === 'horizontal' ? 'horizontal' : 'banda', 'section');
    }
    const piezas = b.items.map((s) => unaPieza(s, variante)).join('');
    const clase = variante === 'horizontal' ? 'destacados destacados--horizontal' : 'destacados';
    return `<div class="${clase}">${piezas}</div>`;
  }

  // 4. reescribir de atrás hacia delante
  let salida = html;
  for (const b of bloques.slice().reverse()) {
    salida = salida.slice(0, b.inicio) + marcadoDeBloque(b) + salida.slice(b.fin);
  }
  return salida;
}

/**
 * Bloques que se quedaban sueltos: el del catálogo ("Descarga GRATIS en
 * PDF" junto a la portada), el de Diseño 3D y el de Empresas. No los ve
 * destacarSecciones porque no son un <h2> con su foto debajo: son
 * párrafos de texto, el botón, y una foto grande detrás o metida en el
 * mismo párrafo que el enlace. Quedaban como una imagen enorme flotando
 * centrada. Aquí se montan como banner, con la misma pieza que las
 * bandas: foto a un lado, texto y botón al otro.
 */

/* A: un solo <p> con el enlace de texto y el enlace de la imagen, con o
   sin texto delante (en la portada el párrafo lleva delante toda la
   descripción del catálogo). El texto de delante no puede cruzar el
   </p>; la cola es tan concreta —enlace corto + enlace con imagen + </p>—
   que no hay riesgo de coger otra cosa. */
const BANNER_A =
  /<p\b[^>]*>((?:(?!<\/p>)[\s\S])*?)<a\b([^>]*href="[^"]*"[^>]*)>\s*([^<]{1,40}?)\s*<\/a>\s*<a\b[^>]*href="[^"]*"[^>]*>\s*(<img\b[^>]*>)\s*<\/a>\s*<\/p>/gi;

/* B: el botón ya montado y, justo detrás, una foto suelta. El contenido
   del <p> no puede cruzar su propio </p>: con un comodín suelto, el
   botón de una sección se emparejaba con la foto de la tarjeta
   siguiente (salían 99 falsos de "Precios!" antes de acotarlo). */
/* La foto puede venir envuelta en un <a> (en la portada, el gráfico de
   Diseño 3D enlaza a /render/). Se conserva el enlace alrededor. */
const BANNER_B =
  /<p class="cta">((?:(?!<\/p>)[\s\S])*?)<\/p>\s*(?:(<a\b[^>]*>)\s*)?(<img\b[^>]*>)(?:\s*<\/a>)?/gi;

/* C: la foto enlazada y, en el mismo <p>, el enlace detrás. Es el
   catálogo en 210 páginas (título en el <p> de delante, la descripción
   en el de detrás) y "Modelos de casetas" en 5. Como el texto va DETRÁS
   de la foto, este tipo también mira hacia delante. */
const BANNER_C =
  /<p\b[^>]*>\s*(<a\b[^>]*>)\s*(<img\b[^>]*>)\s*<\/a>\s*<a\b([^>]*href="[^"]*"[^>]*)>\s*([^<]{1,45}?)\s*<\/a>\s*<\/p>/gi;

/* Bloques de texto de primer nivel, para recoger lo que va delante. */
const BLOQUE_TEXTO = /<(p|h2|h3)\b[^>]*>(?:(?!<\/\1>)[\s\S])*?<\/\1>/gi;

function soloTexto(s) {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|#160|#xa0);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* Un bloque hace de título del banner si es un encabezado o un párrafo
   corto de una sola frase, sin negritas ni enlaces. */
function esTitulo(b) {
  if (b.etiqueta !== 'p') return true;
  const t = soloTexto(b.html);
  return t.length <= 90 && !/<(?:strong|b|a)\b/i.test(b.html);
}

export function armarBanners(html) {
  if (!html) return html;

  const hallados = [];
  for (const m of html.matchAll(BANNER_A)) {
    const delante = soloTexto(m[1]) ? `<p>${m[1].trim()}</p>` : '';
    hallados.push({
      inicio: m.index,
      fin: m.index + m[0].length,
      foto: m[4],
      textoPropio: delante, // lo que iba dentro del mismo <p>, delante del enlace
      boton: `<p class="cta"><a class="boton boton--verde boton--pequeno"${m[2]}>${m[3]}</a></p>`,
    });
  }
  for (const m of html.matchAll(BANNER_B)) {
    hallados.push({
      inicio: m.index,
      fin: m.index + m[0].length,
      foto: m[2] ? `${m[2]}${m[3]}</a>` : m[3], // si venía enlazada, sigue enlazada
      boton: `<p class="cta">${m[1]}</p>`,
    });
  }
  for (const m of html.matchAll(BANNER_C)) {
    hallados.push({
      inicio: m.index,
      fin: m.index + m[0].length,
      foto: `${m[1]}${m[2]}</a>`,
      boton: `<p class="cta"><a class="boton boton--verde boton--pequeno"${m[3]}>${m[4].trim()}</a></p>`,
      haciaDelante: true,
    });
  }
  if (!hallados.length) return html;
  hallados.sort((a, b) => a.inicio - b.inicio);

  const bloques = [...html.matchAll(BLOQUE_TEXTO)].map((m) => ({
    ini: m.index,
    fin: m.index + m[0].length,
    html: m[0],
    etiqueta: m[1].toLowerCase(),
  }));

  const usados = new Set();
  const reemplazos = [];

  for (const h of hallados) {
    /* hacia atrás: los bloques de texto pegados al banner (máximo 3).
       Se para en cuanto aparece otra cosa —una foto, un botón o
       marcado de tarjeta— para no morder una sección vecina. */
    const previos = [];
    let limite = h.inicio;
    // el tipo C solo toma de delante el título; su texto va detrás
    while (previos.length < (h.haciaDelante ? 1 : 3)) {
      const b = bloques.find(
        (x) => !usados.has(x.ini) && x.fin <= limite && html.slice(x.fin, limite).trim() === ''
      );
      if (!b) break;
      if (/class="cta"|<img|class="(?:modelo|destacado|rejilla|zonas)/.test(b.html)) break;
      if (!soloTexto(b.html)) break;
      /* si lo recogido ya empieza por un título (encabezado o frase
         corta) y lo que viene antes es un párrafo largo, ese párrafo es
         de otra cosa: no se sigue. Sin esto el título del catálogo
         quedaba perdido en medio del texto en 8 páginas. Una pila de
         frases cortas seguidas sí se recoge entera (Diseño 3D). */
      if (previos.length && esTitulo(previos[0]) && !esTitulo(b)) break;
      previos.unshift(b);
      usados.add(b.ini);
      limite = b.ini;
    }

    /* el primer bloque hace de título si es un encabezado, o un párrafo
       corto de una sola frase */
    let titulo = '';
    let cuerpo = previos;
    /* la etiqueta del título se conserva: si era un h2/h3 en el original
       sigue siéndolo; si el título sale de un párrafo o de una frase
       suelta, va como <p> para no inventar encabezados que el original
       no tenía (la estructura h1 > h2 > h3 de cada página es la suya) */
    let etiquetaTitulo = 'p';
    if (previos.length && esTitulo(previos[0])) {
      titulo = soloTexto(previos[0].html);
      etiquetaTitulo = previos[0].etiqueta;
      cuerpo = previos.slice(1);
    }
    /* hacia delante (tipo C): hasta 2 párrafos de texto pegados detrás
       de la foto, que son la descripción del catálogo. Se para en un
       encabezado, una foto, un botón o una tarjeta. */
    let finBanner = h.fin;
    if (h.haciaDelante) {
      const siguientes = [];
      let desde = h.fin;
      while (siguientes.length < 2) {
        const b = bloques.find((x) => !usados.has(x.ini) && x.ini >= desde && html.slice(desde, x.ini).trim() === '');
        if (!b || b.etiqueta !== 'p') break;
        if (/class="cta"|<img|class="(?:modelo|destacado|rejilla|zonas)/.test(b.html)) break;
        if (!soloTexto(b.html)) break;
        siguientes.push(b);
        usados.add(b.ini);
        desde = b.fin;
      }
      if (siguientes.length) {
        cuerpo = cuerpo.concat(siguientes);
        finBanner = siguientes[siguientes.length - 1].fin;
      }
    }

    /* sin título y con el texto metido en el propio <p> del enlace (la
       portada): si arranca con una frase corta acabada en "!" o ".", esa
       frase pasa a título y el resto se queda de cuerpo. */
    if (!titulo && h.textoPropio) {
      const m = h.textoPropio.match(/^<p>\s*([^<]{8,90}?[!.])\s*([\s\S]*)<\/p>$/);
      if (m && soloTexto(m[2])) {
        titulo = m[1].trim();
        h.textoPropio = `<p>${m[2].trim()}</p>`;
      }
    }

    /* el cuerpo va en su bloque para que el texto fluya aunque llegue
       sin <p> (si fuera hijo directo del flex, cada <strong> iría a su
       propia línea) */
    const caja =
      `<div class="destacado__caja"${fondoDe(h.foto)}>` +
      (titulo
        ? `<${etiquetaTitulo} class="destacado__titulo">` +
          (destinoDe(h.boton) ? `<a href="${destinoDe(h.boton)}">${escapar(titulo)}</a>` : escapar(titulo)) +
          `</${etiquetaTitulo}>`
        : '') +
      marcarLema(
        `<div class="destacado__cuerpo">` +
          cuerpo.map((b) => b.html).join('') +
          (h.textoPropio || '') +
          `</div>`,
      ) +
      h.boton +
      `</div>`;

    reemplazos.push({
      inicio: previos.length ? previos[0].ini : h.inicio,
      fin: finBanner,
      html:
        `<section class="destacado destacado--banda">` +
        `<div class="destacado__foto">${enlazarFoto(h.foto, destinoDe(h.boton))}</div>` +
        caja +
        `</section>`,
    });
  }

  /* de atrás hacia delante, saltando lo que se solape */
  let salida = html;
  let tope = Infinity;
  for (const r of reemplazos.slice().reverse()) {
    if (r.fin > tope) continue;
    salida = salida.slice(0, r.inicio) + r.html + salida.slice(r.fin);
    tope = r.inicio;
  }
  return salida;
}

/** Aplica las reconstrucciones en el orden correcto. */
/* Estilos en línea que dejó el editor de WordPress (224 <strong
   style="font-size: 21px">, en 87 páginas): palabras sueltas en tamaño
   grande en mitad de un párrafo. El tamaño lo pone la hoja de estilos. */
const ESTILO_EN_LINEA = /(<(?:strong|b|em|i|span|a|li|p)\b[^>]*?)\s+style="[^"]*"/gi;

export function quitarEstilosEnLinea(html) {
  return html ? html.replace(ESTILO_EN_LINEA, '$1') : html;
}

/* Viñetas escritas a mano: en 30 páginas (192 casos) las listas llegan
   como párrafos que empiezan por "●". Se convierten en <ul> de verdad. */
const VINETA = /<p\b[^>]*>\s*(?:<strong>\s*)?[●•▪■◦]\s*([\s\S]*?)<\/p>/gi;
const TIRADA_VINETAS = /(?:<p\b[^>]*>\s*(?:<strong>\s*)?[●•▪■◦]\s*[\s\S]*?<\/p>\s*){2,}/gi;

export function agruparVinetas(html) {
  if (!html) return html;
  return html.replace(TIRADA_VINETAS, (tirada) => {
    const items = [...tirada.matchAll(VINETA)].map((m) => `<li>${m[1].trim()}</li>`);
    return `<ul>${items.join('')}</ul>`;
  });
}

/* Galería de WordPress (/render/, 30 fotos): las <figure class="gallery-item">
   llegan una detrás de otra; se envuelven en una rejilla. */
const GALERIA = /(?:<figure class="gallery-item">[\s\S]*?<\/figure>\s*){2,}/gi;

export function agruparGalerias(html) {
  if (!html) return html;
  return html.replace(GALERIA, (g) => `<div class="galeria">${g}</div>`);
}

export function reconstruir(html) {
  const envuelto = agruparGalerias(agruparVinetas(envolverTextoSuelto(quitarEstilosEnLinea(html)))); // primero: el resto necesita los <p>
  const limpio = quitarLogoDuplicado(envuelto);
  const modelos = agruparModelos(limpio);
  const botones = convertirEnBotones(modelos); // deja class="cta" para destacarSecciones
  const destacados = destacarSecciones(botones);
  const banners = armarBanners(destacados); // los sueltos que quedan tras lo anterior
  const ventajas = agruparVentajas(banners);
  const directorios = agruparDirectorios(ventajas);
  return agruparEtiquetas(directorios);
}
