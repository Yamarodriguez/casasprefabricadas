// Crea las páginas de localidad que faltan en una línea de producto a
// partir de una página plantilla de esa misma línea (misma estructura y
// mismo texto de línea, con la localidad cambiada), como hacía WordPress.
// La foto principal es la genérica de la línea (no hay foto de la localidad).
// Las preguntas, secciones extra, descripción, título y enlaces se generan
// solos al compilar.
//   node scripts/localidades-faltantes.mjs
import fs from 'node:fs';

const NUEVAS = [
  // [línea, plantilla, slug nuevo, nombre de la localidad]
  ['madera', 'casas-de-madera-aranjuez', 'casas-de-madera-arganda-del-rey', 'Arganda del Rey'],
  ['madera', 'casas-de-madera-aranjuez', 'casas-de-madera-santa-fe', 'Santa Fe'],
  ['hormigon', 'hormigon-aranjuez', 'hormigon-arganda-del-rey', 'Arganda del Rey'],
  ['hormigon', 'hormigon-aranjuez', 'hormigon-santa-fe', 'Santa Fe'],
  // Alcorcón en Steel Framing ya existe como /steel-framing-alarcon/ (errata del original)
  ['steel', 'steel-framing-aranjuez', 'steel-framing-arganda-del-rey', 'Arganda del Rey'],
  ['steel', 'steel-framing-aranjuez', 'steel-framing-santa-fe', 'Santa Fe'],
];

const HERO = {
  madera: 'madera',
  hormigon: 'hormigon',
  steel: 'steel-framing',
};

const leer = (slug) => JSON.parse(fs.readFileSync(`src/content/pages/${slug}.json`, 'utf8'));

for (const [linea, plantilla, slug, lugar] of NUEVAS) {
  const destino = `src/content/pages/${slug}.json`;
  if (fs.existsSync(destino)) { console.log('ya existe', slug); continue; }
  const base = leer(plantilla);
  const origen = 'Aranjuez';
  const cambiar = (t) => t.replaceAll(origen, lugar).replaceAll(origen.toLowerCase(), lugar.toLowerCase()).replaceAll(encodeURIComponent(origen), encodeURIComponent(lugar));
  const nueva = {
    ...base,
    slug,
    ruta: `/${slug}/`,
    titulo: cambiar(base.titulo),
    h1: cambiar(base.h1),
    tituloSeo: cambiar(base.tituloSeo),
    descripcion: cambiar(base.descripcion || ''),
    palabraClave: cambiar(base.palabraClave),
    hero: { ...leer(HERO[linea]).hero },
    faq: [],
    cuerpo: cambiar(base.cuerpo),
  };
  nueva.palabras = nueva.cuerpo.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (nueva.cuerpo.includes(origen)) throw new Error(`queda "${origen}" en ${slug}`);
  fs.writeFileSync(destino, JSON.stringify(nueva, null, 1) + '\n');
  console.log('creada', slug, '|', nueva.palabraClave, '|', nueva.palabras, 'palabras');
}
