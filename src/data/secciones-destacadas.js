/**
 * Las cajas de Precios/Ofertas/Planos/Venta/Fabricantes/Financiación/
 * Imágenes/Construcción/Presupuesto llevaban foto de fondo puesta por CSS
 * de Elementor (no por <img>), y esas imágenes nunca se guardaron en la
 * extracción de WordPress. Se recuperaron por nombre de archivo desde una
 * exportación nueva de la biblioteca de medios (2026-09-03) y se
 * confirmaron a ojo contra capturas reales del sitio.
 *
 * El título de cada caja varía por página ("Presupuesto de casas
 * prefabricadas Albacete", "Ofertas Casa Prefabricadas Baratas! a
 * medida"..., 215 variantes solo para Presupuesto), así que se
 * reconocen por un fragmento estable (`ancla`), no por el título
 * completo. El título real de cada página se conserva tal cual.
 *
 * `tipo` fija cómo se dibuja (comprobado con las capturas reales):
 *   banda      va sola, a todo el ancho, con texto grande superpuesto.
 *   tarjeta    va emparejada con otra de su mismo `grupo`, en una
 *              rejilla de 2, texto superpuesto más pequeño.
 *   horizontal va emparejada también, pero la foto (con título+botón
 *              superpuestos) queda a un lado y el texto normal aparte,
 *              sin superponer —así se ve en el sitio real.
 */
export const secciones = [
  {
    clave: 'precios',
    ancla: /Casas Prefabricadas Precios/i,
    tipo: 'banda',
    src: '/wp-content/uploads/2021/09/casa-prefabricadas-precios.jpg',
    alt: 'Casas prefabricadas precios',
  },
  {
    clave: 'ofertas',
    ancla: /Ofertas Casa Prefabricadas Baratas/i,
    tipo: 'tarjeta',
    grupo: 'ofertas-llave',
    src: '/wp-content/uploads/2021/09/casas-prefabricadas-baratas.jpg',
    alt: 'Ofertas casas prefabricadas baratas',
  },
  {
    clave: 'llave-en-mano',
    ancla: /casas prefabricadas llave en mano/i,
    tipo: 'tarjeta',
    grupo: 'ofertas-llave',
    src: '/wp-content/uploads/2021/09/casas-prefabricadas-llave-en-mano.jpg',
    alt: 'Casas prefabricadas llave en mano',
  },
  {
    clave: 'planos',
    ancla: /Planos de casas/i,
    tipo: 'tarjeta',
    grupo: 'planos-venta',
    src: '/wp-content/uploads/2021/09/planos-de-casas-prefabricadas.jpg',
    alt: 'Planos de casas prefabricadas',
  },
  {
    clave: 'venta',
    ancla: /Venta de Casa Prefabricadas/i,
    tipo: 'tarjeta',
    grupo: 'planos-venta',
    src: '/wp-content/uploads/2021/09/venta-de-casas-prefabricadas.jpg',
    alt: 'Venta de casas prefabricadas',
  },
  {
    clave: 'fabricantes',
    ancla: /Fabricantes de casas prefabricadas/i,
    tipo: 'tarjeta',
    grupo: 'fabricantes-financiacion',
    src: '/wp-content/uploads/2022/08/Fabricantes-de-casas-prefabricadas.jpg',
    alt: 'Fabricantes de casas prefabricadas',
  },
  {
    clave: 'financiacion',
    ancla: /Financiaci[oó]n de casas prefabricadas/i,
    tipo: 'tarjeta',
    grupo: 'fabricantes-financiacion',
    src: '/wp-content/uploads/2022/08/Financiacion-casas-prefabricadas-1.jpg',
    alt: 'Financiación de casas prefabricadas',
  },
  {
    clave: 'imagenes',
    ancla: /Im[aá]genes de casas/i,
    tipo: 'horizontal',
    grupo: 'imagenes-construccion',
    src: '/wp-content/uploads/2021/09/Imagenes-casas-prefabricadas.jpg',
    alt: 'Imágenes de casas prefabricadas',
  },
  {
    clave: 'construccion',
    ancla: /Construcci[oó]n casas prefabricadas,? ?Tiempos/i,
    tipo: 'horizontal',
    grupo: 'imagenes-construccion',
    src: '/wp-content/uploads/2021/09/Construccion-casa-prefabricadas.jpg',
    alt: 'Construcción de casas prefabricadas',
  },
  {
    clave: 'presupuesto',
    ancla: /Presupuesto de.*casas prefabricadas/i,
    tipo: 'banda',
    src: '/wp-content/uploads/2021/09/Presupuesto-casas-prefabricadas.jpg',
    alt: 'Presupuesto de casas prefabricadas',
  },
];
