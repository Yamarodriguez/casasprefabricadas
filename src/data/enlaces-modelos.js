/**
 * Enlaces de las tarjetas de modelos que en el export de WordPress
 * llegaron sin enlace (la imagen lo llevaba en Elementor y se perdió) o
 * con uno equivocado (tres casetas apuntaban a /modernas/). Se buscan por
 * el título de la tarjeta, sin tildes ni mayúsculas.
 *
 * Todas las rutas existen en src/content/pages.
 */
export const ENLACES_POR_TITULO = {
  'caseta de resina': '/casetas-de-resina/',
  'caseta para negocio': '/casetas-para-negocio/',
  'caseta para bicicletas': '/casetas-para-bicicletas/',
  'caseta para perros': '/casetas-para-perros/',
  'caseta para gatos': '/casetas-para-gatos/',
  'caseta de plastico': '/casetas-de-plastico/',
  'caseta de feria': '/casetas-de-ferias/',
  'caseta de aperos': '/casetas-de-aperos/',
  'caseta metalicas': '/casetas-metalicas/',
  'caseta de obra': '/casetas-de-obra/',
  'casetas de madera': '/casetas-de-madera/',
  'caseta de madera': '/casetas-de-madera/',
  'caseta prefabricada': '/casetas-prefabricadas/',
  'caseta de jardin': '/casetas-de-jardin/',
  'caseta hormigon': '/casetas-hormigon-prefabricadas/',
  'caseta de vigilancia': '/casetas-de-vigilancia/',
  'caseta de campo': '/casetas-de-campo/',
  'casas de madera para gatos': '/casas-de-madera-para-gatos/',
  'casas de madera para perros': '/casas-de-madera-para-perros/',
  'casas de madera a medida': '/casas-de-madera-a-medida/',
  'casas de madera pequenas': '/casas-de-madera-pequenas/',
  'casas de madera grandes': '/casas-de-madera-grandes/',
  'casas de madera jardin': '/casas-de-madera-jardin/',
  'casas de madera modernas': '/casas-de-madera-modernas/',
  'casa de madera moderna': '/casas-de-madera-modernas/',
  'cabanas de madera': '/cabanas-de-madera/',
  'pergolas de madera': '/pergolas-de-madera/',
  'cocheras de madera': '/cocheras-de-madera/',
  'cobertizos de madera': '/cobertizos-de-madera/',
  /* las tarjetas por estilo de /catalogo/ y /precios/ llevan al estilo */
  'catalogo casas prefabricadas modernas': '/modernas/',
  'catalogo casas prefabricadas modulares': '/modulares/',
  'catalogo casas prefabricadas cube': '/cube/',
  'catalogo casas prefabricadas mediterranea': '/mediterraneas/',
  'catalogo casas prefabricadas con contenedores': '/contenedores/',
  'catalogo casas prefabricadas minimalistas': '/minimalistas/',
  'catalogo casas prefabricadas de lujo': '/de-lujo/',
  'catalogo casas prefabricadas moviles': '/moviles/',
  'catalogo casas prefabricadas pasivas': '/pasivas/',
  'precios casas prefabricadas modernas': '/modernas/',
  'precios casas prefabricadas modulares': '/modulares/',
  'precios casas prefabricadas cube': '/cube/',
  'precios casas prefabricadas mediterranea': '/mediterraneas/',
  'precios casas prefabricadas con contenedores': '/contenedores/',
  'precios casas prefabricadas minimalistas': '/minimalistas/',
  'precios casas prefabricadas de lujo': '/de-lujo/',
  'precios casas prefabricadas moviles': '/moviles/',
  'precios casas prefabricadas pasivas': '/pasivas/',
};

/* Los tres enlaces equivocados del original: solo se corrigen si el
   destino era ese, para no tocar enlaces que ya estaban bien. */
const EQUIVOCADO = '/modernas/';

export function normalizarTitulo(titulo) {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Devuelve el enlace bueno para una tarjeta, o el que traía. */
export function enlaceDeModelo(titulo, url) {
  const propuesto = ENLACES_POR_TITULO[normalizarTitulo(titulo)];
  if (!propuesto) return url;
  if (!url || url === EQUIVOCADO) return propuesto;
  return url;
}
