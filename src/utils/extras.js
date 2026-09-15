/**
 * Dos secciones nuevas (h2 + dos párrafos) al final del contenido de cada
 * página, ANTES de las preguntas frecuentes. No tocan nada de lo que ya
 * había: se añaden. Los textos están en src/data/secciones-extra.js y la
 * clasificación (línea, tema, lugar) es la misma que usan las preguntas
 * frecuentes.
 *
 * En las páginas de localidad hay tres variantes por sección y la elige
 * el nombre del lugar, para que dos provincias no repitan el mismo texto.
 */
import { LUGAR, RAIZ, TEMA } from '../data/secciones-extra.js';
import { LINEAS, clasificar, rellenar } from './faq.js';

/* número estable a partir de un texto (para elegir variante) */
function semilla(texto) {
  let h = 0;
  for (const c of texto) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function generarExtras(pagina) {
  if (!pagina.palabraClave) return []; // legales
  const { linea, tema, lugar } = clasificar(pagina);
  const datos = { ...LINEAS[linea], L: lugar || '' };

  let secciones;
  // las paginas nuevas ya son guias largas: sin secciones anadidas
  if (tema && ['segundamano', 'menos100k', 'tamano', 'tiny', 'opiniones', 'rustico'].includes(tema)) return [];
  if (tema) {
    secciones = TEMA[`${linea}:${tema}`] || TEMA[tema] || RAIZ[linea];
  } else if (lugar) {
    const bloque = LUGAR[linea];
    const s = semilla(lugar);
    secciones = [bloque.a[s % bloque.a.length], bloque.b[Math.floor(s / 7) % bloque.b.length]];
  } else {
    secciones = RAIZ[linea];
  }

  return secciones.map((sec) => ({
    h2: rellenar(sec.h2, datos),
    parrafos: sec.p.map((p) => rellenar(p, datos)),
  }));
}

function escapar(texto) {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ------------------------------------------------------ tabla de precios */
/* En las páginas de precios, una tabla arriba del todo con los mismos
   rangos que ya da el texto: es lo que muestra Google como fragmento
   destacado y lo que tiene la competencia que rankea. */
const TABLAS = {
  generica: {
    titulo: 'Precios de casas prefabricadas en 2026 (orientativos)',
    cabecera: ['Sistema', 'Precio por m² terminada', 'Casa de 100 m²', 'Plazo desde la licencia'],
    filas: [
      ['Casa de madera', '600–900 €', '47.000–60.000 €', '3–6 meses'],
      ['Steel Framing', '450–700 € (360 € en obra gris)', '45.000–70.000 €', '3–5 meses'],
      ['Hormigón prefabricado', '900–1.500 €', '90.000–120.000 €', '4–9 meses'],
      ['Modular (módulos completos)', '1.000–1.500 €', '100.000–150.000 €', '4–6 meses'],
      ['Contenedores marítimos', '500–900 €', '50.000–90.000 €', '3–5 meses'],
      ['Casa móvil (sin cimentación)', '—', '20.000–80.000 € (30–100 m²)', '1–2 meses'],
    ],
  },
  madera: {
    titulo: 'Precios de casas de madera en 2026 (orientativos)',
    cabecera: ['Sistema o tamaño', 'Precio', 'Qué incluye'],
    filas: [
      ['Entramado ligero', '600–800 €/m²', 'Estructura, aislamiento en cámara, acabados de serie'],
      ['Paneles SIP', '750–950 €/m²', 'Máximo aislamiento, montaje muy rápido'],
      ['Madera maciza o troncos', '800–1.200 €/m²', 'Aspecto rústico, muros de 70 mm o más'],
      ['Gama alta (maderas nobles, grandes ventanales)', '1.200–1.500 €/m²', 'Diseño a medida'],
      ['Casa de 36 m²', 'desde 8.000 € en kit · 20.000–25.000 € montada', 'Vivienda mínima o estudio'],
      ['Casa de 68 m², 2 dormitorios', '34.000–38.000 €', 'Llave en mano'],
      ['Casa de 100 m², 3 dormitorios', '47.000–60.000 €', 'Llave en mano'],
      ['Casa de 150 m², 2 plantas', '90.000–135.000 €', 'Llave en mano'],
    ],
  },
  hormigon: {
    titulo: 'Precios de casas prefabricadas de hormigón en 2026 (orientativos)',
    cabecera: ['Sistema o tamaño', 'Precio', 'Qué incluye'],
    filas: [
      ['Paneles de hormigón', '900–1.200 €/m²', 'Muros y forjados prefabricados, aislamiento integrado'],
      ['Módulos completos (3D)', '1.100–1.500 €/m²', 'Módulos con instalaciones y acabados de fábrica'],
      ['Gama alta', '1.500–2.200 €/m²', 'Diseño de autor, grandes voladizos, domótica'],
      ['Casa de 80 m²', '72.000–96.000 €', 'Llave en mano'],
      ['Casa de 100 m²', '90.000–120.000 €', 'Llave en mano'],
      ['Casa de 150 m², 2 plantas', '135.000–190.000 €', 'Llave en mano'],
    ],
  },
  steel: {
    titulo: 'Precios de Steel Framing en 2026 (orientativos)',
    cabecera: ['Fase o tamaño', 'Precio', 'Qué incluye'],
    filas: [
      ['Obra gris', 'desde 360 €/m²', 'Estructura de acero galvanizado y cerramientos'],
      ['Casa terminada', '450–700 €/m²', 'Aislamiento, instalaciones, carpinterías y acabados'],
      ['Casa de 100 m²', '45.000–70.000 €', 'Llave en mano'],
      ['Casa de 150 m², 2 plantas', '68.000–105.000 €', 'Llave en mano'],
    ],
  },
  casetas: {
    titulo: 'Precios de casetas prefabricadas en 2026 (orientativos)',
    cabecera: ['Tipo de caseta', 'Precio', 'Para qué'],
    filas: [
      ['Resina o plástico (1–10 m²)', '200–2.500 €', 'Almacenaje en el jardín, sin mantenimiento'],
      ['Madera 16–19 mm (3–6 m²)', '600–1.200 €', 'Herramientas, bicicletas'],
      ['Madera 28–44 mm (6–25 m²)', '1.500–8.000 €', 'Taller, despacho, uso habitable'],
      ['Metálica (2–15 m²)', '250–3.000 €', 'Almacén, garaje, taller'],
      ['Hormigón prefabricado (4–30 m²)', '1.500–15.000 €', 'Aperos, fincas, uso profesional'],
      ['Caseta de obra (módulo 6 m)', '3.000–12.000 € · alquiler 80–200 €/mes', 'Oficina, vestuario, almacén'],
    ],
  },
};

/** Tabla de precios de la línea, para insertar tras el primer párrafo de
    las páginas de precios. */
export function tablaPrecios(pagina) {
  const { linea, tema } = clasificar(pagina);
  if (tema !== 'precios') return '';
  const t = TABLAS[linea];
  if (!t) return '';
  const filas = t.filas.map((f) => `<tr>${f.map((c, i) => (i === 0 ? `<th scope="row">${escapar(c)}</th>` : `<td>${escapar(c)}</td>`)).join('')}</tr>`).join('');
  return (
    `<div class="tarifas-caja"><table class="tarifas"><caption>${escapar(t.titulo)}</caption>` +
    `<thead><tr>${t.cabecera.map((c) => `<th scope="col">${escapar(c)}</th>`).join('')}</tr></thead>` +
    `<tbody>${filas}</tbody></table>` +
    `<p class="tarifas__nota">Precios sin terreno, cimentación, acometidas ni licencias (un 20–30 % más). Actualizado en septiembre de 2026. ` +
    `<a href="/casas-prefabricadas-100-m2-precio/">Ver el precio por tamaño</a> o <a href="/presupuesto/">pedir presupuesto gratis</a>.</p></div>`
  );
}

/** Mete el bloque tras el primer párrafo del contenido. */
export function trasPrimerParrafo(html, bloque) {
  if (!bloque) return html;
  const i = html.indexOf('</p>');
  return i < 0 ? bloque + html : html.slice(0, i + 4) + bloque + html.slice(i + 4);
}

/** HTML plano: un h2 y sus párrafos por sección, sin caja ni clase
    especial; se ve como el resto del texto de la página. */
export function renderExtras(secciones) {
  if (!secciones?.length) return '';
  return secciones
    .map((s) => `<h2>${escapar(s.h2)}</h2>` + s.parrafos.map((p) => `<p>${escapar(p)}</p>`).join(''))
    .join('');
}
