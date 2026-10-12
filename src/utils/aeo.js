/**
 * Lo que necesitan los buscadores de IA (ChatGPT, Perplexity, Claude,
 * Copilot, AI Overviews) para citar una página: la respuesta en las
 * primeras líneas, datos comparables en tabla, una jerarquía clara en las
 * migas y la oferta descrita en datos estructurados.
 *
 * Todo se AÑADE alrededor del contenido original, con la misma
 * clasificación (línea, tema, lugar) que las preguntas frecuentes, y con
 * las mismas cifras que ya da el sitio (faq.js, extras.js, seo.js): ni un
 * dato nuevo que pueda contradecir a otra página.
 */
import { LINEAS, clasificar } from './faq.js';

const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const escapar = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ------------------------------------------------------ respuesta rápida */
/* Una frase con el dato (precio, plazo, licencia) justo debajo del H1.
   Los originales abren con ambiente ("Imagínate tomarte el café...") y lo
   que un motor de respuesta extrae son las primeras frases. {en} es
   " en Madrid" en las páginas de localidad y vacío en el resto. */
const RESUMEN_LINEA = {
  generica:
    '{N}{en} cuestan entre 600 y 900 €/m² en madera, desde 450 €/m² en Steel Framing y entre 900 y 1.500 €/m² en hormigón, sin terreno, cimentación ni licencias. Se entregan llave en mano en 6–9 meses, frente a los 12–18 de una obra tradicional, y como cualquier vivienda fija necesitan proyecto y licencia de obra del ayuntamiento.',
  madera:
    '{N}{en} cuestan entre 600 y 900 €/m² terminadas: una de 100 m² sale por 47.000–60.000 € llave en mano, sin terreno, cimentación ni licencias. Se montan en 3–6 meses desde la licencia de obra, que es obligatoria como en cualquier vivienda, y duran entre 50 y 100 años con un lasur cada 3–5 años.',
  hormigon:
    '{N}{en} cuestan entre 900 y 1.500 €/m² terminadas: una de 100 m² llave en mano parte de unos 90.000 €, sin terreno, cimentación ni licencias. Se entregan en 4–9 meses desde la licencia de obra, casi no necesitan mantenimiento y se hipotecan y escrituran como cualquier vivienda.',
  steel:
    '{N}{en} cuestan desde 360 €/m² en obra gris y desde 450 €/m² terminadas: una de 100 m² sale por 45.000–70.000 €, sin terreno, cimentación ni licencias. Se construyen en seco en 3–5 meses desde la licencia de obra y la estructura de acero galvanizado supera los 100 años de vida útil.',
  casetas:
    '{N}{en} cuestan desde 200 € en resina, 600–8.000 € en madera y 1.500–15.000 € en hormigón prefabricado, según tamaño y grosor de pared. Se entregan en una a cuatro semanas y se instalan en un día; las pequeñas sin cimentación suelen bastar con declaración responsable u obra menor, según el ayuntamiento.',
};

/* temas con respuesta propia; el resto de temas de casas usa la de su
   línea y los de producto distinto (pérgolas, casetas para perros...) no
   llevan, porque ya responden en su primer párrafo */
const RESUMEN_TEMA = {
  llave:
    'Una {n} llave en mano incluye estructura, cubierta, carpinterías, instalaciones, baños y cocina montados, suelos y pintura, con precio y plazo cerrados en contrato. Quedan fuera el terreno, la cimentación, las acometidas, la licencia y los impuestos, que suman un 20–30 % más. El plazo es {T} desde la licencia.',
  construccion:
    'Una {n} se construye en cinco fases: proyecto y licencia (2–4 meses), cimentación y acometidas (2–4 semanas), fabricación en taller en paralelo (6–10 semanas), transporte y montaje (de dos días a tres semanas) e instalaciones y acabados (4–8 semanas). En total, {T} desde la licencia.',
  financiacion:
    'Una {n} fija, con proyecto, licencia y escritura, se financia con hipoteca como cualquier vivienda, normalmente hasta el 80 % del valor de tasación de terreno y casa. Las casas móviles o sin anclar no se hipotecan: se pagan con préstamo personal o con la financiación del propio fabricante.',
};
const TEMAS_CON_LINEA = new Set([
  'precios', 'baratas', 'venta', 'fabricantes', 'catalogo', 'modelos', 'amedida',
  'empresas', 'presupuesto', 'planos', 'imagenes', 'modernas', 'minimalistas',
  'mediterraneas', 'pasivas',
]);

export function resumen(pagina) {
  if (!pagina.palabraClave) return '';
  const { linea, tema, lugar } = clasificar(pagina);
  const datos = LINEAS[linea];
  let plantilla;
  if (tema && RESUMEN_TEMA[tema]) plantilla = RESUMEN_TEMA[tema];
  else if (!tema || TEMAS_CON_LINEA.has(tema)) plantilla = RESUMEN_LINEA[linea];
  if (!plantilla) return '';
  return cap(
    plantilla
      .replace('{en}', lugar ? ` en ${lugar}` : '')
      .replace(/\{N\}/g, datos.N)
      .replace(/\{n\}/g, datos.n)
      .replace(/\{T\}/g, datos.T),
  );
}

export function renderResumen(texto) {
  if (!texto) return '';
  return `<div class="resumen"><p class="resumen__titulo">En resumen</p><p>${escapar(texto)}</p></div>`;
}

/* ---------------------------------------------------- tabla comparativa */
/* Madera, Steel Framing y hormigón frente a frente: es la pregunta que
   más se hace a un asistente ("¿qué es mejor...?") y una tabla es lo que
   mejor extraen. Mismas cifras que las tablas de precios y las FAQ. */
const COMPARATIVA = {
  cabecera: ['Sistema', 'Precio por m² terminada', 'Casa de 100 m²', 'Plazo desde la licencia', 'Vida útil', 'Mantenimiento'],
  filas: [
    ['Madera', '600–900 €', '47.000–60.000 €', '3–6 meses', '50–100 años', 'Lasur exterior cada 3–5 años'],
    ['Steel Framing', 'desde 450 € (360 € en obra gris)', '45.000–70.000 €', '3–5 meses', 'Más de 100 años', 'Bajo: el acero galvanizado no se pudre'],
    ['Hormigón prefabricado', '900–1.500 €', '90.000–120.000 €', '4–9 meses', 'Más de 50 años', 'Mínimo: revestimiento cada 8–10 años'],
  ],
};
const RAICES_CASA = new Set(['/', '/madera/', '/hormigon/', '/steel-framing/', '/casas-steel-framing/']);

export function tablaComparativa(pagina) {
  if (!pagina.palabraClave) return '';
  const { linea, tema, lugar } = clasificar(pagina);
  /* portada y raíces de cada tipo de casa, y las provincias genéricas
     (/madrid/), que es donde se elige sistema; no en casetas */
  const toca = RAICES_CASA.has(pagina.ruta) || (linea === 'generica' && lugar && !tema);
  if (!toca) return '';
  const titulo = `Madera, Steel Framing u hormigón: comparativa${lugar ? ` para tu casa en ${lugar}` : ''}`;
  const filas = COMPARATIVA.filas
    .map((f) => `<tr>${f.map((c, i) => (i === 0 ? `<th scope="row">${escapar(c)}</th>` : `<td>${escapar(c)}</td>`)).join('')}</tr>`)
    .join('');
  return (
    `<div class="tarifas-caja"><table class="tarifas"><caption>${escapar(titulo)}</caption>` +
    `<thead><tr>${COMPARATIVA.cabecera.map((c) => `<th scope="col">${escapar(c)}</th>`).join('')}</tr></thead>` +
    `<tbody>${filas}</tbody></table>` +
    `<p class="tarifas__nota">Precios orientativos de 2026, sin terreno, cimentación, acometidas ni licencias (un 20–30 % más). ` +
    `Las tres necesitan proyecto y licencia de obra y se hipotecan como cualquier vivienda. ` +
    `<a href="/precios/">Ver todos los precios</a> o <a href="/presupuesto/">pedir presupuesto gratis</a>.</p></div>`
  );
}

/* ----------------------------------------------------------------- migas */
/* Inicio > Casas de madera > Madrid. Todas las URL son de un solo nivel
   (/casas-de-madera-madrid/), así que la jerarquía no sale de la ruta:
   sale de la línea. Las páginas genéricas y las raíces quedan en dos. */
const RAIZ_LINEA = {
  madera: { texto: 'Casas de madera', url: '/madera/' },
  hormigon: { texto: 'Casas de hormigón', url: '/hormigon/' },
  steel: { texto: 'Steel Framing', url: '/steel-framing/' },
  casetas: { texto: 'Casetas', url: '/casetas/' },
};

export function migasDe(pagina, titulo) {
  const migas = [{ texto: 'Inicio', url: '/' }];
  if (pagina.ruta === '/') return migas;
  const raiz = pagina.palabraClave && RAIZ_LINEA[clasificar(pagina).linea];
  if (raiz && raiz.url !== pagina.ruta && !RAICES_CASA.has(pagina.ruta)) migas.push(raiz);
  migas.push({ texto: titulo, url: pagina.ruta });
  return migas;
}

/* ---------------------------------------------------- Service (JSON-LD) */
/* Qué se ofrece, dónde y a qué precio por m²: con WebPage y FAQPage solo,
   el buscador sabe de qué habla la página pero no qué vende. */
const PRECIO_M2 = {
  generica: [450, 1500],
  madera: [600, 900],
  hormigon: [900, 1500],
  steel: [450, 700],
};

export function servicioDe(pagina, { dominio, canonica }) {
  if (!pagina.palabraClave) return null;
  const { linea, tema, lugar } = clasificar(pagina);
  const precio = PRECIO_M2[linea];
  /* solo casas: en casetas y temas de producto distinto el €/m² no aplica */
  if (!precio || (tema && !TEMAS_CON_LINEA.has(tema) && !RESUMEN_TEMA[tema])) return null;
  const nombre = cap(LINEAS[linea].titulo) + (lugar ? ` en ${lugar}` : '');
  return {
    '@type': 'Service',
    '@id': `${canonica}#servicio`,
    name: nombre,
    serviceType: cap(LINEAS[linea].titulo),
    provider: { '@id': `${dominio}/#organizacion` },
    areaServed: lugar
      ? { '@type': 'AdministrativeArea', name: lugar, containedInPlace: { '@type': 'Country', name: 'España' } }
      : { '@type': 'Country', name: 'España' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'EUR',
        minPrice: precio[0],
        maxPrice: precio[1],
        unitCode: 'MTK',
        unitText: 'm²',
      },
      description: 'Precio orientativo por m² de casa terminada, sin terreno, cimentación ni licencias.',
    },
    url: canonica,
  };
}
