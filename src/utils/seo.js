/**
 * Meta descripción de cada página (y entradilla del héroe, que es el
 * mismo texto). Las de WordPress eran "palabra clave ✅ palabra clave ✅
 * palabra clave": Google las reescribe y en el héroe se veían raras. Aquí
 * se genera una frase natural, con la palabra clave, un dato y una
 * llamada a la acción, de 120-160 caracteres.
 *
 * Misma clasificación que las preguntas frecuentes (línea, tema, lugar).
 */
import { LINEAS, clasificar, rellenar } from './faq.js';

const LUGAR = {
  generica:
    'Casas prefabricadas en {L}: modelos de madera, hormigón y Steel Framing con precios, planos y fabricantes que entregan en tu zona. Presupuesto gratis.',
  madera:
    'Casas de madera en {L}: modelos, precios desde 600 €/m², planos y fabricantes que montan en tu parcela en 3-6 meses. Presupuesto gratis y sin compromiso.',
  hormigon:
    'Casas prefabricadas de hormigón en {L}: modelos, precios por m², plazos de 4 a 9 meses y fabricantes que entregan en tu zona. Presupuesto gratis.',
  steel:
    'Casas de Steel Framing en {L}: precios desde 450 €/m², modelos, plazos de 3 a 5 meses y fabricantes que entregan en tu zona. Presupuesto gratis.',
  casetas:
    'Casetas prefabricadas en {L}: de jardín, aperos, obra, madera, resina y hormigón, con precios y fabricantes que entregan en tu zona. Presupuesto gratis.',
};

const RAIZ = {
  generica:
    'Casas prefabricadas en España: modelos de madera, hormigón y Steel Framing con precios, planos, catálogo y fabricantes. Pide presupuesto gratis y sin compromiso.',
  madera:
    'Casas de madera prefabricadas: modelos, precios desde 600 €/m², planos, catálogo y fabricantes de toda España. Montaje en 3-6 meses. Presupuesto gratis.',
  hormigon:
    'Casas prefabricadas de hormigón: modelos, precios por m², planos, catálogo y fabricantes de toda España. Entrega llave en mano en 4-9 meses. Presupuesto gratis.',
  steel:
    'Casas de Steel Framing: qué es, precios desde 450 €/m², modelos, planos y fabricantes en toda España. Construcción en seco en 3-5 meses. Presupuesto gratis.',
  casetas:
    'Casetas prefabricadas: de jardín, aperos, obra, madera, resina, metálicas y de hormigón. Modelos, medidas, precios y fabricantes de toda España.',
};

const TEMA = {
  precios: 'Precios de {N} en 2026: cuánto cuestan por m², qué incluye el precio y qué hay que sumar. Compara modelos y pide presupuesto gratis.',
  planos: 'Planos de {N}: distribuciones de 1 y 2 plantas, de 1 a 4 dormitorios, con medidas y superficies. Descarga gratis y pide presupuesto.',
  baratas: '{N} baratas: ofertas, modelos económicos y dónde ahorrar sin perder calidad. Precios orientativos y presupuesto gratis sin compromiso.',
  llave: '{N} llave en mano: qué incluye el precio, plazos de entrega y garantías. Fabricantes de toda España. Presupuesto gratis y sin compromiso.',
  venta: 'Venta de {N}: modelos nuevos y de segunda mano, precios orientativos y fabricantes de toda España. Compara y pide presupuesto gratis.',
  fabricantes: 'Fabricantes de {N} en toda España: cómo elegir uno bueno, qué garantías exigir y comparación de presupuestos. Pide propuestas gratis.',
  financiacion: 'Financiación de {N}: hipoteca, préstamo personal o financiación del fabricante. Requisitos, entrada necesaria y pasos. Asesoramiento gratis.',
  catalogo: 'Catálogo de {N} en PDF gratis: modelos con fotos, planos, superficies y precios orientativos. Descárgalo y pide presupuesto sin compromiso.',
  imagenes: 'Fotos e imágenes de {N}: fachadas, interiores, porches y modelos reales de fabricantes. Elige la que te guste y pide su precio.',
  construccion: 'Construcción de {N}: fases, plazos de 3 a 9 meses, cimentación y montaje. Cómo se construye y qué esperar. Presupuesto gratis.',
  presupuesto: 'Presupuesto de {N} gratis y sin compromiso: dinos metros, dormitorios y parcela y te respondemos en 24-48 horas con precio orientativo.',
  modelos: 'Modelos de {N}: de 1 y 2 plantas, de 40 a 250 m², con fotos, planos y precios orientativos. Todos se adaptan a tu parcela. Presupuesto gratis.',
  amedida: '{N} a medida: diseño personalizado adaptado a tu parcela y presupuesto, con proyecto de arquitecto y precio cerrado. Presupuesto gratis.',
  empresas: 'Empresas de {N} en toda España: directorio por provincias, qué comparar antes de contratar y cómo pedir presupuestos comparables.',
  render: 'Diseño 3D y renders de casas prefabricadas: ve tu casa antes de construirla, exteriores e interiores. Precios y cómo encargarlo.',
  modernas: 'Casas prefabricadas modernas: diseño de líneas rectas, grandes ventanales y alta eficiencia. Modelos, precios y fabricantes. Presupuesto gratis.',
  minimalistas: 'Casas prefabricadas minimalistas: menos es más. Modelos, materiales, precios y fabricantes de toda España. Presupuesto gratis.',
  mediterraneas: 'Casas prefabricadas mediterráneas: pensadas para el sol, con porches, patios y muros blancos. Modelos, precios y fabricantes. Presupuesto gratis.',
  pasivas: 'Casas prefabricadas pasivas (Passivhaus): consumo casi nulo, confort todo el año. Qué son, cuánto cuestan y fabricantes certificados.',
  modulares: 'Casas prefabricadas modulares: módulos completos fabricados en planta y montados en días. Modelos, precios, ampliaciones y fabricantes.',
  moviles: 'Casas prefabricadas móviles: sin cimentación ni obra, desde 20.000 €. Modelos, licencias, financiación y fabricantes. Presupuesto gratis.',
  contenedores: 'Casas prefabricadas con contenedores marítimos: cómo se hacen, precios desde 15.000 €, aislamiento y licencia. Modelos y fabricantes.',
  cube: 'Casas prefabricadas Cube: vivienda modular compacta de 25 a 60 m², lista en un día. Usos, precios y fabricantes. Presupuesto gratis.',
  lujo: 'Casas prefabricadas de lujo: arquitectura de autor, materiales nobles y domótica desde 1.800 €/m². Modelos y fabricantes de alta gama.',
  grandes: 'Casas de madera grandes de 200 a 500 m²: estructura, precios por m², plazos y modelos familiares. Fabricantes de toda España. Presupuesto gratis.',
  pequenas: 'Casas de madera pequeñas de 30 a 60 m²: precios desde 8.000 €, licencia, distribución y modelos. Ideales como vivienda mínima o estudio.',
  jardin: 'Casas de madera para jardín: trastero, taller, despacho o casa de invitados de 5 a 40 m². Modelos, grosores, precios y licencia.',
  cabanas: 'Cabañas de madera: modelos rústicos de 20 a 80 m², precios desde 8.000 €, licencia y uso todo el año. Fabricantes de toda España.',
  cobertizos: 'Cobertizos de madera: cerrados, abiertos y leñeros para herramientas, bicis y jardín. Modelos, precios desde 300 € e instalación.',
  cocheras: 'Cocheras y garajes de madera: carports abiertos y garajes cerrados para 1 o 2 coches. Modelos, precios y licencia. Presupuesto gratis.',
  pergolas: 'Pérgolas de madera: adosadas, exentas y con cubierta. Modelos, precios desde 400 €, anclaje e instalación. Presupuesto gratis.',
  perfiles: 'Perfiles de Steel Framing: tipos C y U, espesores, galvanizado y dónde comprarlos cortados a medida. Guía técnica y proveedores.',
  alquiler: 'Alquiler de casetas de obra, módulos, garitas y stands: precios por mes o por evento, qué incluye y cuándo compensa comprar.',
  aperos: 'Casetas de aperos de madera, chapa y hormigón: modelos, precios desde 500 €, licencia en suelo rústico e instalación.',
  campo: 'Casetas de campo para fincas: de madera y hormigón, de 10 a 60 m², con precios, licencia y fabricantes. Presupuesto gratis.',
  ferias: 'Casetas de ferias y stands para mercados y eventos: comprar o alquilar, modelos, precios y normativa de seguridad.',
  obra: 'Casetas de obra nuevas, de segunda mano y en alquiler: oficina, vestuario, almacén y aseo. Precios y fabricantes.',
  plastico: 'Casetas de plástico para jardín: sin mantenimiento, precios desde 200 €, modelos, medidas y consejos de instalación.',
  resina: 'Casetas de resina para jardín: la gama alta del plástico, sin mantenimiento y con garantía. Modelos, medidas y precios.',
  vigilancia: 'Casetas de vigilancia y garitas de seguridad: de hormigón, acero y panel sándwich. Modelos, precios y personalización.',
  bicicletas: 'Casetas para bicicletas: modelos de madera, resina y metal para 2 a 6 bicis, con cerradura. Precios y consejos de seguridad.',
  gatos: 'Casas de madera para gatos de exterior: aisladas, elevadas y con dos entradas. Modelos, precios y dónde colocarlas.',
  perros: 'Casas de madera para perros: tamaño según la raza, aislamiento para invierno y modelos con porche. Precios y fabricantes.',
  negocio: 'Casetas para negocio: quioscos, puestos y módulos comerciales con mostrador e instalaciones. Precios, licencias y fabricantes.',
  metalicas: 'Casetas metálicas de acero galvanizado: económicas y resistentes para almacén, garaje o taller. Modelos, precios e instalación.',
  casetasmadera: 'Casetas de madera para jardín: grosores de 16 a 70 mm, modelos, precios desde 600 € y cómo protegerlas. Fabricantes de toda España.',
  casetashormigon: 'Casetas de hormigón prefabricado: las más resistentes para aperos, obra y fincas. Modelos, precios, solera e instalación con grúa.',
  segundamano: 'Casas prefabricadas de segunda mano: dónde comprarlas, precios reales, qué revisar antes de pagar y cómo trasladarlas. Guía práctica 2026.',
  menos100k: 'Casas prefabricadas por menos de 100.000 €: qué se compra en cada tramo de presupuesto, en madera, Steel Framing y hormigón, y cómo financiarlas.',
  tamano: 'Cuánto cuesta una casa prefabricada de 100 m² en 2026: precio por sistema (madera, Steel Framing, hormigón) y por tamaño, de 50 a 150 m².',
  tiny: 'Tiny houses y mini casas prefabricadas en España: tipos, precios desde 25.000 €, aislamiento y qué dice la normativa para vivir en una.',
  opiniones: 'Opiniones sobre casas prefabricadas: lo que valoran los compradores, los problemas más frecuentes, mitos y cómo elegir bien al fabricante.',
  rustico: 'Casa prefabricada en terreno rústico: qué se puede instalar, qué está prohibido, diferencias por comunidad y cómo tramitar la licencia paso a paso.',
};

/* ------------------------------------------------------------- títulos */
/* Los títulos de WordPress eran "A - B" con la palabra clave repetida
   ("Casas Prefabricadas Álava - Casa prefabricada Álava"): 110 pasaban de
   60 caracteres y Google los recorta. Los que caben se dejan tal cual
   (son los que Google tiene indexados); los largos se reescriben con un
   patrón corto que conserva la palabra clave. */
const MAX_TITULO = 60;
const SUFIJO_TEMA = {
  precios: ' 2026: tabla por m²',
  catalogo: ' en PDF gratis',
  imagenes: ': fotos reales',
  planos: ': distribuciones y medidas',
  fabricantes: ' en España',
  empresas: ' en España',
};
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

export function tituloSeo(pagina) {
  const base = pagina.tituloSeo || pagina.titulo || '';
  if (base.length <= MAX_TITULO || !pagina.palabraClave) return base;
  const { linea, tema, lugar } = clasificar(pagina);
  const N = cap(LINEAS[linea].titulo);
  if (lugar) {
    for (const t of [`${N} en ${lugar}: precios y fabricantes`, `${N} en ${lugar}: precios`, `${N} en ${lugar}`, `${cap(LINEAS[linea].N)} en ${lugar}`]) {
      if (t.length <= MAX_TITULO) return t;
    }
    return `${cap(LINEAS[linea].N)} ${lugar}`;
  }
  const primero = base.split(/\s[-|–]\s/)[0].trim();
  const sufijo = SUFIJO_TEMA[tema] ?? ': precios y modelos';
  const conSufijo = primero + sufijo;
  return conSufijo.length <= MAX_TITULO ? conSufijo : primero.slice(0, MAX_TITULO);
}

/** Descripción de la página (o la que ya tenía, si no hay plantilla). */
export function descripcionSeo(pagina) {
  if (!pagina.palabraClave) return pagina.descripcion || '';
  const { linea, tema, lugar } = clasificar(pagina);
  const datos = { ...LINEAS[linea], L: lugar || '' };
  let plantilla;
  if (tema) plantilla = TEMA[tema] || RAIZ[linea];
  else if (lugar) plantilla = LUGAR[linea];
  else plantilla = RAIZ[linea];
  return rellenar(plantilla, datos);
}
