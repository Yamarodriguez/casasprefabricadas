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
 */

import textos from '../data/modelos.json';

/* Un par = encabezado con (o sin) enlace + párrafo que solo lleva una imagen. */
const PAR = new RegExp(
  '<h3\\b[^>]*>\\s*' +
    '(?:<a\\b[^>]*href="([^"]*)"[^>]*>)?' + // 1: url del título
    // 2: texto del título. No puede cruzar otro encabezado: si se deja un
    // comodín suelto, se traga los <h2>/<h3> intermedios y pierde contenido.
    '\\s*((?:(?!<\\/h3>)(?!<h[1-6]\\b)[\\s\\S])*?)\\s*' +
    '(?:<\\/a>)?\\s*<\\/h3>' +
    '\\s*' +
    '<p\\b[^>]*>\\s*' +
    '(?:<a\\b[^>]*href="([^"]*)"[^>]*>)?' + // 3: url de la imagen
    '\\s*(<img\\b[^>]*>)\\s*' + // 4: la imagen
    '(?:<\\/a>)?\\s*<\\/p>',
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
    const titulo = m[2].replace(/<[^>]+>/g, '').trim();
    if (!titulo) continue;
    encontrados.push({
      inicio: m.index,
      fin: m.index + m[0].length,
      url: m[1] || m[3] || '',
      titulo,
      img: m[4],
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
