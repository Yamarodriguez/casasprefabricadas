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

/** HTML plano: un h2 y sus párrafos por sección, sin caja ni clase
    especial; se ve como el resto del texto de la página. */
export function renderExtras(secciones) {
  if (!secciones?.length) return '';
  return secciones
    .map((s) => `<h2>${escapar(s.h2)}</h2>` + s.parrafos.map((p) => `<p>${escapar(p)}</p>`).join(''))
    .join('');
}
