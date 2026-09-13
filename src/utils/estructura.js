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

/* Un par = encabezado con (o sin) enlace + imagen, con o sin el <p> que a
   veces la envuelve. Las dos variantes van en ramas separadas (no como
   apertura/cierre opcionales de forma independiente): si el <p> está,
   hace falta su </p> justo detrás. Si no, esa rama no encaja y no se
   toca nada —así una imagen con contenido extra detrás (un enlace más
   dentro del mismo <p>) se deja intacta en vez de partir el HTML y dejar
   un </p> huérfano. */
const PAR = new RegExp(
  // el título puede venir en <h2> o <h3> según la página (\\k referencia el
  // mismo nivel capturado en la apertura, para no cerrar un <h2> con </h3>)
  '<(?<etiqueta>h[23])\\b[^>]*>\\s*' +
    '(?:<a\\b[^>]*href="(?<urlTitulo>[^"]*)"[^>]*>)?' +
    // texto del título: no puede cruzar otro encabezado, o se traga los
    // <h2>/<h3> intermedios y pierde contenido.
    '\\s*(?<titulo>(?:(?!<\\/\\k<etiqueta>>)(?!<h[1-6]\\b)[\\s\\S])*?)\\s*' +
    '(?:<\\/a>)?\\s*<\\/\\k<etiqueta>>\\s*' +
    '(?:' +
      '<p\\b[^>]*>\\s*(?:<a\\b[^>]*href="(?<urlImgP>[^"]*)"[^>]*>)?\\s*(?<imgP><img\\b[^>]*>)\\s*(?:<\\/a>)?\\s*<\\/p>' +
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
  return texto ? `<span class="modelo__texto">${escapar(texto)}</span>` : '';
}

function tarjeta({ url, titulo, img }) {
  const foto = `<span class="modelo__foto">${afinarImagen(img)}</span>`;
  const cuerpo = `<span class="modelo__cuerpo"><span class="modelo__titulo">${titulo}</span>${descripcion(url)}</span>`;
  return url
    ? `<article class="modelo"><a class="modelo__enlace" href="${escapar(url)}">${foto}${cuerpo}</a></article>`
    : `<article class="modelo"><div class="modelo__enlace">${foto}${cuerpo}</div></article>`;
}

/**
 * Agrupa en rejillas los pares consecutivos. Solo se agrupan las series de
 * `minimo` o más: un par suelto se deja tal cual estaba.
 */
export function agruparModelos(html, minimo = 3) {
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
      url: g.urlTitulo || g.urlImgP || g.urlImgSuelta || '',
      titulo,
      img: g.imgP || g.imgSuelta,
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
    const rejilla = `<div class="modelos">${s.map(tarjeta).join('')}</div>`;
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
const CTA = /<p\b[^>]*>\s*<a\b([^>]*href="[^"]*"[^>]*)>\s*([^<]{1,30}?)\s*<\/a>\s*<\/p>/gi;

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
const VENTAJA = /<h2\b[^>]*>([^<]*)<\/h2>\s*<p\b[^>]*>((?:(?!<\/p>)[\s\S])*?)<\/p>/gi;

export function agruparVentajas(html) {
  if (!html) return html;

  const encontrados = [];
  for (const m of html.matchAll(VENTAJA)) {
    const titulo = m[1].trim();
    if (TITULOS_VENTAJAS.includes(titulo)) {
      encontrados.push({ inicio: m.index, fin: m.index + m[0].length, titulo, texto: m[2] });
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
      .map((v) => `<div class="tarjeta"><h3>${v.titulo}</h3><p>${v.texto}</p></div>`)
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
const H3_PLANO = /<h3\b[^>]*>((?:(?!<\/h3>)(?!<a\b)[\s\S])*?)<\/h3>/gi;

export function agruparEtiquetas(html, minimo = 3) {
  if (!html) return html;

  const encontrados = [];
  for (const m of html.matchAll(H3_PLANO)) {
    const texto = m[1].replace(/<[^>]+>/g, '').trim();
    if (texto) encontrados.push({ inicio: m.index, fin: m.index + m[0].length, texto });
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
    const chips = `<div class="etiquetas">${s.map((x) => `<span>${escapar(x.texto)}</span>`).join('')}</div>`;
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
function tarjetaDestacado({ titulo, resto, boton }) {
  return (
    `<h3>${titulo}</h3>` +
    resto +
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
    const siguienteH2 = html.indexOf('<h2', finTitulo);
    const limite = siguienteH2 < 0 ? Math.min(html.length, finTitulo + 2000) : siguienteH2;
    let cuerpo = html.slice(finTitulo, limite);

    /* Si debajo del título hay una rejilla o un directorio, ese <h2> no
       es una caja de llamada a la acción: es el encabezado de la rejilla
       ("Modelos de Casas Prefabricadas baratas", "Otros tipos de casas
       llave en mano"...). Envolverlo metía las tarjetas de modelos
       dentro de una tarjeta con foto. Son 11 casos en 11 páginas. */
    if (/class="(?:modelos|rejilla|zonas|destacados)"/.test(cuerpo)) continue;

    // si la sección trae su propia foto, se usa esa en vez de la recuperada
    const imgPropia = cuerpo.match(/<img\b[^>]*>/i);
    const fotoTag = imgPropia
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
      `<span class="destacado__foto">${s.fotoTag}</span>` +
      `<span class="destacado__caja">${tarjetaDestacado(s)}</span>` +
      `</${etiqueta}>`
    );
  }

  function marcadoDeBloque(b) {
    if (b.tipo === 'banda') return unaPieza(b.items[0], 'banda', 'section');

    const variante = b.tipo === 'horizontal' ? 'horizontal' : 'tarjeta';
    const piezas = b.items.map((s) => unaPieza(s, variante)).join('');
    if (b.items.length < 2) return piezas;
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

/** Aplica las reconstrucciones en el orden correcto. */
export function reconstruir(html) {
  const limpio = quitarLogoDuplicado(html);
  const modelos = agruparModelos(limpio);
  const botones = convertirEnBotones(modelos); // deja class="cta" para destacarSecciones
  const destacados = destacarSecciones(botones);
  const ventajas = agruparVentajas(destacados);
  const directorios = agruparDirectorios(ventajas);
  return agruparEtiquetas(directorios);
}
