/**
 * Índice de todas las páginas con su clasificación, para enlazar entre
 * sí las que van de lo mismo: la misma localidad en las otras líneas
 * (Valencia → casas de madera en Valencia, hormigón en Valencia...) y el
 * mismo tema en las otras líneas (precios → precios de madera, de
 * hormigón, de casetas...). Es enlazado interno en silo: cada página
 * reparte autoridad a sus hermanas y Google entiende la relación.
 */
import { clasificar } from './faq.js';

const modulos = import.meta.glob('../content/pages/*.json', { eager: true });

const NOMBRE_LINEA = {
  generica: 'Casas prefabricadas',
  madera: 'Casas de madera',
  hormigon: 'Casas de hormigón',
  steel: 'Steel Framing',
  casetas: 'Casetas',
};
const ORDEN_LINEA = ['generica', 'madera', 'hormigon', 'steel', 'casetas'];

const normal = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/^el /, '')
    .trim();

const paginas = Object.values(modulos)
  .map((m) => m.default ?? m)
  .filter((p) => p.palabraClave)
  .map((p) => {
    const c = clasificar(p);
    return { ruta: p.ruta, palabraClave: p.palabraClave, ...c, lugarClave: normal(c.lugar) };
  });

const capitalizar = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

/** Páginas hermanas de una página: [{ url, texto }], ordenadas por línea. */
export function hermanasDe(pagina) {
  if (!pagina.palabraClave) return { titulo: '', enlaces: [] };
  const yo = clasificar(pagina);
  let candidatas = [];
  let titulo = '';

  if (yo.lugar) {
    const clave = normal(yo.lugar);
    candidatas = paginas
      .filter((p) => p.ruta !== pagina.ruta && p.lugar && p.lugarClave === clave)
      .map((p) => ({ linea: p.linea, url: p.ruta, texto: `${NOMBRE_LINEA[p.linea]} en ${p.lugar}` }));
    titulo = `Más opciones en ${yo.lugar}`;
  } else if (yo.tema) {
    candidatas = paginas
      .filter((p) => p.ruta !== pagina.ruta && p.tema === yo.tema)
      .map((p) => ({ linea: p.linea, url: p.ruta, texto: capitalizar(p.palabraClave) }));
    titulo = 'Lo mismo en otros tipos de casa';
  } else {
    candidatas = ORDEN_LINEA.filter((l) => l !== yo.linea).map((l) => {
      const raiz = paginas.find((p) => p.linea === l && !p.tema && !p.lugar);
      return raiz ? { linea: l, url: raiz.ruta, texto: NOMBRE_LINEA[l] } : null;
    }).filter(Boolean);
    titulo = 'Otros tipos de casas prefabricadas';
  }

  // una por línea, en el orden fijo, sin repetir destino
  const vistas = new Set();
  const enlaces = [];
  for (const l of ORDEN_LINEA) {
    for (const c of candidatas) {
      if (c.linea !== l || vistas.has(c.url)) continue;
      vistas.add(c.url);
      enlaces.push({ url: c.url, texto: c.texto });
    }
  }
  return { titulo, enlaces };
}

function escapar(t) {
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ------------------------------------------------------------ directorio */
/* Todas las localidades de la línea de la página, ordenadas, menos ella
   misma. Es la nube "por localización" del original, pero completa: la de
   WordPress se quedó con 76 de las 129 localidades genéricas, y dos
   páginas (/arganda-del-rey/, /santa-fe/) no tenían ni un enlace. */
export function directorioDe(pagina) {
  if (!pagina.palabraClave) return { titulo: '', items: [] };
  const yo = clasificar(pagina);
  const items = paginas
    .filter((p) => p.linea === yo.linea && p.lugar && p.ruta !== pagina.ruta)
    .map((p) => ({ url: p.ruta, texto: `${NOMBRE_LINEA[p.linea]} en ${p.lugar}`, orden: p.lugarClave }))
    .sort((a, b) => a.orden.localeCompare(b.orden, 'es'));
  return { titulo: `${NOMBRE_LINEA[yo.linea]} por localidad`, items };
}

const DIRECTORIO = /<details class="zonas-caja"[^>]*>[\s\S]*?<\/details>/i;

function listaDirectorio(items) {
  return (
    `<details class="zonas-caja" open><summary>Ver las ${items.length} localidades</summary>` +
    `<ul class="zonas">${items.map((i) => `<li><a href="${escapar(i.url)}">${escapar(i.texto)}</a></li>`).join('')}</ul></details>`
  );
}

/** Sustituye el directorio que traiga la página por el completo, o lo
    añade al final si no lo traía. Los enlaces del antiguo que no sean
    páginas de localidad de la línea (hay alguno a otra línea) se conservan
    detrás. */
export function completarDirectorio(html, { titulo, items }) {
  if (!items.length) return html;
  const m = html.match(DIRECTORIO);
  if (m) {
    const conocidos = new Set(items.map((i) => i.url));
    const extra = [...m[0].matchAll(/<li>(<a\b[^>]*href="([^"]*)"[^>]*>[\s\S]*?<\/a>)<\/li>/g)]
      .filter((x) => !conocidos.has(x[2].replace(/\/?$/, '/')))
      .map((x) => x[1]);
    const lista = listaDirectorio(items).replace('</ul>', extra.map((e) => `<li>${e}</li>`).join('') + '</ul>');
    return html.replace(DIRECTORIO, lista.replace(/Ver las \d+ localidades/, `Ver las ${items.length + extra.length} localidades`));
  }
  return html + `<h2>${escapar(titulo)}</h2>` + listaDirectorio(items);
}

export function renderHermanas({ titulo, enlaces }) {
  if (!enlaces?.length) return '';
  const items = enlaces.map((e) => `<li><a href="${escapar(e.url)}">${escapar(e.texto)}</a></li>`).join('');
  return `<nav class="hermanas" aria-label="${escapar(titulo)}"><p class="hermanas__titulo">${escapar(titulo)}</p><ul>${items}</ul></nav>`;
}
