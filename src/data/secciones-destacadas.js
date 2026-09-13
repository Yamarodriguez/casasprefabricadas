/**
 * Las cajas de Precios/Ofertas/Planos/Venta/Fabricantes/Financiación/
 * Imágenes/Construcción/Presupuesto llevaban foto de fondo puesta por CSS
 * de Elementor (no por <img>), y esas imágenes nunca se guardaron en la
 * extracción de WordPress. Se recuperaron por nombre de archivo desde una
 * exportación nueva de la biblioteca de medios y se confirmaron contra
 * capturas reales del sitio.
 *
 * Las mismas secciones existen por LÍNEA DE PRODUCTO, con título distinto
 * ("Planos de casas prefabricadas", "Planos casas de madera", "Steel
 * Framing Planos", "Planos de Casetas"...), así que no se listan los
 * títulos uno a uno: se reconoce el TIPO de sección y la LÍNEA por
 * separado, y la foto sale de la matriz `fotos[tipo][linea]`, con la
 * genérica como respaldo. Así queda cubierto cualquier título nuevo sin
 * tocar el código.
 *
 * `vista` fija cómo se dibuja (comprobado con capturas reales):
 *   banda      va sola, a todo el ancho, texto grande superpuesto.
 *   tarjeta    va emparejada con otra de su mismo `grupo`, rejilla de 2.
 *   horizontal va emparejada también, pero la foto (con título+botón
 *              superpuestos) a un lado y el texto normal aparte.
 */

/* La línea de producto se detecta en el título. Se comprueban en este
   orden: "casas de madera" gana a un "prefabricadas" genérico. */
export const lineas = [
  { clave: 'steel', ancla: /steel\s*framing/i },
  { clave: 'casetas', ancla: /caseta/i },
  { clave: 'madera', ancla: /madera/i },
  { clave: 'hormigon', ancla: /hormig[oó]n/i },
];

/* El tipo de sección, por orden de prioridad: los más específicos
   primero, para que "Construcción ... Tiempos" no lo capture otro. */
export const tipos = [
  {
    clave: 'construccion',
    ancla: /construcci[oó]n[^<]*tiempos/i,
    vista: 'horizontal',
    grupo: 'imagenes-construccion',
  },
  { clave: 'imagenes', ancla: /im[aá]genes/i, vista: 'horizontal', grupo: 'imagenes-construccion' },
  { clave: 'presupuesto', ancla: /presupuesto/i, vista: 'banda' },
  { clave: 'precios', ancla: /\bprecios?\b/i, vista: 'banda' },
  { clave: 'ofertas', ancla: /\boferta|barata/i, vista: 'tarjeta', grupo: 'ofertas-llave' },
  { clave: 'llave', ancla: /llave en mano/i, vista: 'tarjeta', grupo: 'ofertas-llave' },
  { clave: 'planos', ancla: /\bplanos?\b/i, vista: 'tarjeta', grupo: 'planos-venta' },
  { clave: 'venta', ancla: /\bventa\b/i, vista: 'tarjeta', grupo: 'planos-venta' },
  { clave: 'fabricantes', ancla: /fabricantes/i, vista: 'tarjeta', grupo: 'fabricantes-financiacion' },
  {
    clave: 'financiacion',
    ancla: /financiaci[oó]n/i,
    vista: 'tarjeta',
    grupo: 'fabricantes-financiacion',
  },
];

/* Matriz tipo × línea. Todas estas rutas existen ya en
   public/wp-content/uploads (comprobado archivo por archivo); donde no
   había variante propia se deja solo la genérica. */
export const fotos = {
  precios: {
    generico: '/wp-content/uploads/2021/09/casas-prefabricadas-precios.jpg',
    madera: '/wp-content/uploads/2021/10/precios-casas-prefabricadas-madera.jpg',
    hormigon: '/wp-content/uploads/2022/02/casas-prefabricadas-hormigon-precios.jpg',
    steel: '/wp-content/uploads/2022/03/Steel-framing-Precios.jpg',
    casetas: '/wp-content/uploads/2022/06/casetas-precios.jpg',
  },
  ofertas: {
    generico: '/wp-content/uploads/2021/09/casas-prefabricadas-baratas.jpg',
    madera: '/wp-content/uploads/2021/12/Casas-de-madera-baratas.png',
    hormigon: '/wp-content/uploads/2022/02/casas-prefabricadas-hormigon-baratas.jpg',
    steel: '/wp-content/uploads/2022/03/Steel-framing-ofertas.jpg',
    casetas: '/wp-content/uploads/2022/06/casetas-baratas.jpg',
  },
  llave: {
    generico: '/wp-content/uploads/2021/09/casas-prefabricadas-llave-en-mano.jpg',
    madera: '/wp-content/uploads/2021/12/casas-de-madera-llave-en-mano.jpg',
    hormigon: '/wp-content/uploads/2022/02/casas-prefabricadas-hormigon-llave-en-mano.jpg',
    steel: '/wp-content/uploads/2022/03/steel-framing-llave-en-mano.jpg',
    casetas: '/wp-content/uploads/2022/06/Casetas-llave-en-mano.jpg',
  },
  planos: {
    generico: '/wp-content/uploads/2021/09/planos-de-casas-prefabricadas.jpg',
    madera: '/wp-content/uploads/2021/12/Planos-casas-de-madera.jpg',
    hormigon: '/wp-content/uploads/2022/02/planos-casas-hormigon.jpg',
    steel: '/wp-content/uploads/2022/03/steel-framing-planos.jpg',
    casetas: '/wp-content/uploads/2022/06/Planos-de-casetas.jpg',
  },
  venta: {
    generico: '/wp-content/uploads/2021/09/venta-de-casas-prefabricadas.jpg',
    madera: '/wp-content/uploads/2021/12/Venta-casas-de-madera.jpg',
    hormigon: '/wp-content/uploads/2022/02/Venta-casas-prefabricadas-de-hormigon.jpg',
    steel: '/wp-content/uploads/2022/03/steel-framing-venta.jpg',
    casetas: '/wp-content/uploads/2022/06/casetas-en-venta.jpg',
  },
  imagenes: {
    /* no hay variante de hormigón en la biblioteca: cae en la genérica */
    generico: '/wp-content/uploads/2021/09/Imagenes-casas-prefabricadas.jpg',
    madera: '/wp-content/uploads/2021/12/Imagenes-casas-de-madera.png',
    steel: '/wp-content/uploads/2022/03/Steel-framing-imagenes.jpg',
    casetas: '/wp-content/uploads/2022/06/imagenes-de-casetas.jpg',
  },
  construccion: {
    generico: '/wp-content/uploads/2021/09/Construccion-casa-prefabricadas.jpg',
    madera: '/wp-content/uploads/2021/12/Construccion-casas-de-madera.png',
    hormigon: '/wp-content/uploads/2022/02/Construccion-casas-hormigon.jpg',
    steel: '/wp-content/uploads/2022/03/Construcciones-steel-framing.jpg',
    casetas: '/wp-content/uploads/2022/06/Construccion-de-casetas.jpg',
  },
  presupuesto: {
    generico: '/wp-content/uploads/2021/09/Presupuesto-casas-prefabricadas.jpg',
  },
  fabricantes: {
    generico: '/wp-content/uploads/2022/08/Fabricantes-de-casas-prefabricadas.jpg',
  },
  financiacion: {
    generico: '/wp-content/uploads/2022/08/Financiacion-casas-prefabricadas-1.jpg',
  },
};

/* Títulos que hay que dejar en paz aunque encajen con alguna ancla. El
   encabezado que abre la franja de ventajas ("¿Quieres comprar casas
   prefabricadas barata? Te contamos las ventajas...") contiene "barata",
   "venta", "llave en mano" o "financiación" según la página, y sin esto
   se convertía en tarjeta y partía esa sección por la mitad. */
const NO_TOCAR = /te contamos|ventajas/i;

/** Resuelve el tipo y la foto de un título de sección, o null. */
export function resolverSeccion(titulo) {
  if (NO_TOCAR.test(titulo)) return null;
  const tipo = tipos.find((t) => t.ancla.test(titulo));
  if (!tipo) return null;
  const linea = lineas.find((l) => l.ancla.test(titulo));
  const tabla = fotos[tipo.clave] || {};
  const src = (linea && tabla[linea.clave]) || tabla.generico;
  if (!src) return null;
  return { clave: tipo.clave, vista: tipo.vista, grupo: tipo.grupo, src, alt: titulo };
}
