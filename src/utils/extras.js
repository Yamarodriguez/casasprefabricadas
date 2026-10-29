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
import { CASETAS_OBRA_LUGAR, LUGAR, RAIZ, TEMA } from '../data/secciones-extra.js';
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
    /* en casetas, delante, las casetas de obra: es lo que se busca con
       el nombre de la ciudad */
    if (linea === 'casetas') secciones.unshift(CASETAS_OBRA_LUGAR[Math.floor(s / 49) % CASETAS_OBRA_LUGAR.length]);
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
      ['Casa de madera', '800–1.550 €', '90.000–150.000 €', '2–4 meses'],
      ['Steel Framing', '900–1.300 € (280–420 € solo la estructura)', '90.000–130.000 €', '4–6 meses'],
      ['Hormigón prefabricado', '1.200–1.900 €', '120.000–180.000 €', '3–6 meses'],
      ['Modular (módulos completos)', '1.000–1.500 €', '100.000–150.000 €', '4–6 meses'],
      ['Contenedores marítimos', '500–900 €', '50.000–90.000 €', '3–5 meses'],
      ['Casa móvil (sin cimentación)', '—', '20.000–80.000 € (30–100 m²)', '1–2 meses'],
    ],
    nota:
      'Madera, Steel Framing y hormigón: precios de mercado publicados en 2026 por Cronoshare, idealista, habitissimo, Caasa y Construcciones Laragab, llave en mano y sin terreno ni licencias; ' +
      'las fuentes, con su fecha, están en los precios de <a href="/precios-casas-de-madera-prefabricadas/">casas de madera</a>, ' +
      '<a href="/steel-framing-precios/">Steel Framing</a> y <a href="/hormigon-precios/">hormigón</a>. ' +
      '<a href="/que-incluye-una-casa-prefabricada/">Qué incluye el precio y qué se paga aparte</a> o <a href="/presupuesto/">pedir presupuesto gratis</a>.',
  },
  /* precios de mercado, no del sitio: rangos que publican portales de
     presupuestos (fuentes en la nota); los tamaños son los de Cronoshare */
  madera: {
    titulo: 'Precio de las casas de madera por m² en España (2026)',
    cabecera: ['Nivel o tamaño', 'Precio', 'Qué incluye'],
    filas: [
      ['Casa de catálogo, precio de fábrica', '180–660 €/m² (media de 420 €/m²)', 'La casa; montaje, transporte, base e IVA suelen ir aparte'],
      ['Estructura básica', '400–800 €/m²', 'Estructura de madera sin acabados completos'],
      ['Llave en mano', '800–1.550 €/m²', 'Casa terminada para entrar a vivir'],
      ['Llave en mano, calidades medias-altas', '1.200–1.900 €/m²', 'Entramado ligero o madera contralaminada (CLT)'],
      ['Casa de 50 m²', '45.000–75.000 €', 'Llave en mano'],
      ['Casa de 80 m²', '70.000–120.000 €', 'Llave en mano'],
      ['Casa de 100 m²', '90.000–150.000 €', 'Llave en mano'],
      ['Casa de 120 m²', '110.000–185.000 €', 'Llave en mano'],
      ['Casa de 150 m²', '140.000–230.000 €', 'Llave en mano'],
    ],
    nota:
      'Precios de mercado publicados por portales de presupuestos, consultados el 27 de octubre de 2026: ' +
      '<a href="https://www.cronoshare.com/cuanto-cuesta/casa-prefabricada" rel="nofollow noopener">Cronoshare</a> (3 de enero de 2026: estructura, llave en mano y tamaños), ' +
      '<a href="https://www.idealista.com/news/inmobiliario/vivienda/2025/12/02/874777-casas-prefabricadas-llave-en-mano-opciones-listas-para-entrar-a-vivir" rel="nofollow noopener">idealista</a> (2 de diciembre de 2025: calidades medias-altas) y ' +
      '<a href="https://www.habitissimo.es/presupuestos/construir-casa-prefabricada-madera" rel="nofollow noopener">habitissimo</a> (16 de septiembre de 2026: precio de fábrica, con datos de sus presupuestos). ' +
      'Sin terreno ni licencias; pregunta si el presupuesto incluye cimentación, transporte, montaje e IVA. ' +
      '<a href="/que-incluye-una-casa-prefabricada/">Qué incluye el precio y qué se paga aparte</a> o <a href="/presupuesto/">pedir presupuesto gratis</a>.',
  },
  hormigon: {
    titulo: 'Precio de las casas prefabricadas de hormigón por m² en España (2026)',
    cabecera: ['Nivel o tamaño', 'Precio', 'Qué incluye'],
    filas: [
      ['Proyecto y construcción', '700–1.800 €/m² (media de 1.230 €/m²)', 'Licencias, acometidas y certificados aparte'],
      ['Llave en mano', '1.200–1.900 €/m²', 'Casa terminada para entrar a vivir'],
      ['Llave en mano, calidades medias-altas', '1.300–2.000 €/m²', 'Paneles o módulos de hormigón'],
      ['Casa de 50 m²', '60.000–90.000 €', 'Llave en mano'],
      ['Casa de 80 m²', '96.000–144.000 €', 'Llave en mano'],
      ['Casa de 100 m²', '120.000–180.000 €', 'Llave en mano'],
      ['Casa de 120 m²', '144.000–216.000 €', 'Llave en mano'],
      ['Casa de 150 m²', '180.000–270.000 €', 'Llave en mano'],
      ['Casa de 150 m², alta gama', '230.000–300.000 €', 'Presupuesto completo'],
    ],
    nota:
      'Precios de mercado publicados por portales de presupuestos, consultados el 27 de octubre de 2026: ' +
      '<a href="https://www.cronoshare.com/cuanto-cuesta/casa-prefabricada" rel="nofollow noopener">Cronoshare</a> (3 de enero de 2026: llave en mano, tamaños y alta gama), ' +
      '<a href="https://www.idealista.com/news/inmobiliario/vivienda/2025/12/02/874777-casas-prefabricadas-llave-en-mano-opciones-listas-para-entrar-a-vivir" rel="nofollow noopener">idealista</a> (2 de diciembre de 2025: calidades medias-altas, plazo de 3 a 6 meses) y ' +
      '<a href="https://www.habitissimo.es/presupuestos/construir-casa-prefabricada-de-hormigon" rel="nofollow noopener">habitissimo</a> (10 de junio de 2026: proyecto y construcción, con datos de sus presupuestos; de 4 a 6 meses de la firma a las llaves). ' +
      'Sin terreno ni licencias; pregunta si el presupuesto incluye cimentación, transporte e IVA. ' +
      '<a href="/que-incluye-una-casa-prefabricada/">Qué incluye el precio y qué se paga aparte</a> o <a href="/presupuesto/">pedir presupuesto gratis</a>.',
  },
  steel: {
    titulo: 'Precio del Steel Framing por m² en España (2026)',
    cabecera: ['Fase o tamaño', 'Precio', 'Qué incluye'],
    /* precios de mercado, no del sitio: rangos que publican fabricantes y
       portales (fuentes en la nota). Los tamaños son m² × 900–1.300 €. */
    filas: [
      ['Solo estructura (kit)', '280–420 €/m²', 'Perfiles de acero galvanizado, paneles estructurales y cubierta'],
      ['Obra gris', '360–700 €/m²', 'Estructura y cerramientos; según el fabricante, también ventanas e instalaciones básicas'],
      ['Llave en mano, calidades estándar', '900–1.300 €/m²', 'Casa terminada: acabados, cocina y baños'],
      ['Gama alta', 'más de 1.500 €/m²', 'Domótica, aerotermia, suelo radiante o diseños complejos'],
      ['Casa de 60 m²', '54.000–78.000 €', 'Llave en mano, calidades estándar'],
      ['Casa de 80 m²', '72.000–104.000 €', 'Llave en mano, calidades estándar'],
      ['Casa de 100 m²', '90.000–130.000 €', 'Llave en mano, calidades estándar'],
      ['Casa de 150 m², 2 plantas', '135.000–195.000 €', 'Llave en mano, calidades estándar'],
    ],
    nota:
      'Precios de mercado publicados por fabricantes y portales, consultados el 27 de octubre de 2026: ' +
      '<a href="https://caasa.es/casas-prefabricadas-con-steel-framing/" rel="nofollow noopener">Caasa</a> (actualizado el 30 de septiembre de 2026: kit, obra gris y llave en mano), ' +
      '<a href="https://construccioneslaragab.com/precio-casas-steel-framing/" rel="nofollow noopener">Construcciones Laragab</a> (mayo de 2026: 950–1.300 €/m² llave en mano), ' +
      '<a href="https://www.cronoshare.com/servicios/construccion-steel-framing" rel="nofollow noopener">Cronoshare</a> (media de 950 €/m², de 360 a 1.300 €/m²) y ' +
      '<a href="https://www.albertanorweg.com/blog/cuanto-cuesta-una-casa-con-steel-framing/" rel="nofollow noopener">Alberta Norweg</a> (1.500–1.800 €/m² en gama alta). ' +
      'Sin terreno ni licencias; pregunta si el presupuesto incluye cimentación, proyecto e IVA, porque cada fabricante lo cuenta distinto. ' +
      '<a href="/que-incluye-una-casa-prefabricada/">Qué incluye el precio y qué se paga aparte</a> o <a href="/presupuesto/">pedir presupuesto gratis</a>.',
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
      ['Caseta de obra (módulo de 6 × 2,40 m)', '3.500–5.500 € nueva · alquiler 120–220 €/mes', 'Oficina, vestuario, almacén (precios de Mmodos, 2026)'],
    ],
  },
};

/* Casetas de obra: compra y alquiler por tipo, en las páginas de casetas
   por localidad, en /casetas-de-obra/ y en /alquiler-casetas/. Precios
   de mercado con fuente (nota). */
const OBRA = {
  cabecera: ['Módulo de 6 × 2,40 m', 'Comprar nuevo', 'Alquilar al mes'],
  filas: [
    ['Almacén', '3.500–4.500 €', '120–160 €'],
    ['Oficina', '4.200–5.500 €', '140–200 €'],
    ['Vestuario', '3.800–5.000 €', '130–190 €'],
    ['Módulo sanitario (aseo)', '4.500–6.000 €', '160–220 €'],
    ['Comedor (7 × 3 m)', '5.500–7.000 €', '180–250 €'],
    ['De segunda mano', 'entre un 30 % y un 50 % menos que nueva', '—'],
  ],
  nota:
    'Precios publicados por el fabricante <a href="https://mmodos.com/caseta-de-obra-tipos-medidas-precios/" rel="nofollow noopener">Mmodos</a> (8 de junio de 2026), con datos de constructoras de Murcia, Alicante y Madrid. ' +
    'El alquiler se contrata por meses completos, con un mínimo de uno a tres meses, una fianza de 200–600 € y el transporte aparte (100–250 € por trayecto, sin IVA), según las tarifas de 2026 de ' +
    '<a href="https://tecnourban.es/precios/" rel="nofollow noopener">Tecnourban</a>; la base de precios de ' +
    '<a href="https://generadordeprecios.info/obra_nueva/Seguridad_y_salud/YP_Instalaciones_provisionales_de/YPC_Casetas_(alquiler_construccion/YPC040_Alquiler_de_caseta_prefabricada_par.html" rel="nofollow noopener">CYPE</a> da 116,87 € al mes por una caseta de almacén de 5,4 m². ' +
    'Comprar compensa frente a alquilar a partir de 22–30 meses. <a href="/presupuesto/">Pedir presupuesto gratis</a>.',
};

function tablaObra(lugar) {
  const titulo = `Casetas de obra${lugar ? ` en ${lugar}` : ''}: precio de compra y alquiler (2026)`;
  const filas = OBRA.filas.map((f) => `<tr>${f.map((c, i) => (i === 0 ? `<th scope="row">${escapar(c)}</th>` : `<td>${escapar(c)}</td>`)).join('')}</tr>`).join('');
  return (
    `<div class="tarifas-caja"><table class="tarifas"><caption>${escapar(titulo)}</caption>` +
    `<thead><tr>${OBRA.cabecera.map((c) => `<th scope="col">${escapar(c)}</th>`).join('')}</tr></thead>` +
    `<tbody>${filas}</tbody></table><p class="tarifas__nota">${OBRA.nota}</p></div>`
  );
}

/** Tabla de precios de la línea, para insertar tras el primer párrafo de
    las páginas de precios. */
export function tablaPrecios(pagina) {
  const { linea, tema, lugar } = clasificar(pagina);
  if (linea === 'casetas' && ((lugar && !tema) || tema === 'obra' || tema === 'alquiler')) return tablaObra(lugar);
  if (tema !== 'precios') return '';
  const t = TABLAS[linea];
  if (!t) return '';
  const filas = t.filas.map((f) => `<tr>${f.map((c, i) => (i === 0 ? `<th scope="row">${escapar(c)}</th>` : `<td>${escapar(c)}</td>`)).join('')}</tr>`).join('');
  return (
    `<div class="tarifas-caja"><table class="tarifas"><caption>${escapar(t.titulo)}</caption>` +
    `<thead><tr>${t.cabecera.map((c) => `<th scope="col">${escapar(c)}</th>`).join('')}</tr></thead>` +
    `<tbody>${filas}</tbody></table>` +
    (t.nota ? `<p class="tarifas__nota">${t.nota}</p></div>` :
    `<p class="tarifas__nota">Precios sin terreno, cimentación, acometidas ni licencias. Actualizado en septiembre de 2026. <a href="/que-incluye-una-casa-prefabricada/">Qué incluye el precio y qué se paga aparte</a>. ` +
    `<a href="/casas-prefabricadas-100-m2-precio/">Ver el precio por tamaño</a> o <a href="/presupuesto/">pedir presupuesto gratis</a>.</p></div>`)
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
