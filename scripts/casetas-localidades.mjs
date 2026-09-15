// Crea las páginas de casetas por localidad que faltan (las mismas 99
// localidades que tienen las cuatro líneas de casas), a partir de la
// plantilla de Madrid, y una foto principal por localidad con el nombre
// de la localidad en el archivo (copiada de las cuatro fotos de casetas
// existentes, rotando). También pone foto con nombre de localidad a las 6
// páginas de casas creadas antes con la foto genérica de su línea.
//   node scripts/casetas-localidades.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { clasificar } from '../src/utils/faq.js';

const PAGINAS = 'src/content/pages';
const CARPETA = 'public/wp-content/uploads/2026/09';
fs.mkdirSync(CARPETA, { recursive: true });

const leer = (slug) => JSON.parse(fs.readFileSync(`${PAGINAS}/${slug}.json`, 'utf8'));
const slugDe = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/^el /, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* foto con el nombre de la localidad: copia (jpg + webp) de una foto origen */
async function fotoLocal(origen, nombreBase, ancho, alto) {
  const jpg = path.join(CARPETA, `${nombreBase}.jpg`);
  const webp = path.join(CARPETA, `${nombreBase}.webp`);
  if (!fs.existsSync(jpg)) await sharp(origen).jpeg({ quality: 82 }).toFile(jpg);
  if (!fs.existsSync(webp)) await sharp(origen).webp({ quality: 80 }).toFile(webp);
  const src = `/wp-content/uploads/2026/09/${nombreBase}.jpg`;
  return { src, ancho, alto, srcset: `${src} ${ancho}w` };
}

/* ---- 1. las 99 localidades, por las páginas de la línea genérica ---- */
const todas = fs.readdirSync(PAGINAS).map((f) => leer(f.replace(/\.json$/, '')));
const localidades = [];
for (const p of todas) {
  const c = clasificar(p);
  if (c.linea === 'generica' && c.lugar) localidades.push({ lugar: c.lugar, slug: p.slug });
}
const casetasHechas = new Map(todas.filter((p) => clasificar(p).linea === 'casetas' && clasificar(p).lugar).map((p) => [slugDe(clasificar(p).lugar), p.slug]));

/* ---- 2. casetas por localidad ---- */
const plantilla = leer('casetas-madrid');
const ORIGEN = 'Madrid';
const FOTOS = ['casetas-madrid.jpg', 'casetas-valencia.jpg', 'casetas-Malaga.jpg', 'casetas-valladolid.jpg'].map((f) => `public/wp-content/uploads/2022/06/${f}`);
let creadas = 0, i = 0;
for (const { lugar, slug } of localidades) {
  if (casetasHechas.has(slugDe(lugar))) continue;
  const nuevoSlug = `casetas-${slug}`;
  const destino = `${PAGINAS}/${nuevoSlug}.json`;
  if (fs.existsSync(destino)) continue;
  const nombre = lugar.replace(/^el /, '');
  const cambiar = (t) => t.replaceAll(ORIGEN, nombre).replaceAll(ORIGEN.toLowerCase(), nombre.toLowerCase()).replaceAll(`q=${ORIGEN}`, `q=${encodeURIComponent(nombre)}`);
  const foto = await fotoLocal(FOTOS[i++ % FOTOS.length], `casetas-${slug}`, 820, 312);
  const nueva = {
    ...plantilla,
    slug: nuevoSlug,
    ruta: `/${nuevoSlug}/`,
    titulo: cambiar(plantilla.titulo),
    h1: cambiar(plantilla.h1),
    tituloSeo: cambiar(plantilla.tituloSeo),
    descripcion: cambiar(plantilla.descripcion || ''),
    palabraClave: `Casetas ${nombre}`,
    hero: { ...foto, alt: `casetas-${slug}` },
    faq: [],
    cuerpo: cambiar(plantilla.cuerpo),
  };
  nueva.palabras = nueva.cuerpo.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (nueva.cuerpo.includes(ORIGEN)) throw new Error(`queda "${ORIGEN}" en ${nuevoSlug}`);
  fs.writeFileSync(destino, JSON.stringify(nueva, null, 1) + '\n');
  creadas++;
}
console.log('casetas creadas:', creadas);

/* ---- 3. foto con nombre de localidad para las 6 páginas de casas nuevas ---- */
const CASAS = [
  ['casas-de-madera-arganda-del-rey', 'madera', 'casas-de-madera-arganda-del-rey'],
  ['casas-de-madera-santa-fe', 'madera', 'casas-de-madera-santa-fe'],
  ['hormigon-arganda-del-rey', 'hormigon', 'casas-prefabricadas-hormigon-arganda-del-rey'],
  ['hormigon-santa-fe', 'hormigon', 'casas-prefabricadas-hormigon-santa-fe'],
  ['steel-framing-arganda-del-rey', 'steel-framing', 'steel-framing-arganda-del-rey'],
  ['steel-framing-santa-fe', 'steel-framing', 'steel-framing-santa-fe'],
];
for (const [slug, linea, nombreFoto] of CASAS) {
  const p = leer(slug);
  if (p.hero.src.includes('/2026/09/')) continue;
  const origen = leer(linea).hero.src;
  const foto = await fotoLocal(`public${origen}`, nombreFoto, p.hero.ancho, p.hero.alto);
  p.hero = { ...foto, alt: nombreFoto };
  fs.writeFileSync(`${PAGINAS}/${slug}.json`, JSON.stringify(p, null, 1) + '\n');
  console.log('foto local:', slug, '->', foto.src);
}
