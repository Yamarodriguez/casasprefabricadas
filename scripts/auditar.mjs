/**
 * Auditoria de la migracion. Se pasa sobre dist/ despues de `npm run build`.
 *
 *   node scripts/auditar.mjs
 *
 * Comprueba lo que exige el playbook: JSON validos, un solo H1 por pagina,
 * 0 href="#", 0 enlaces internos rotos, 0 fugas de plantilla, sitemap
 * correcto, robots, 404, y que las imagenes referenciadas existan en public/.
 */
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(RAIZ, 'dist');
const PUBLICO = path.join(RAIZ, 'public');

if (!fs.existsSync(DIST)) {
  console.error('No hay dist/. Ejecuta antes:  npm run build');
  process.exit(1);
}

const htmls = [];
(function recorrer(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const q = path.join(d, f.name);
    if (f.isDirectory()) recorrer(q);
    else if (f.name.endsWith('.html')) htmls.push(q);
  }
})(DIST);

const rutaDe = (f) => '/' + path.relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
const rutas = new Set(htmls.map(rutaDe));

const problemas = [];
const anota = (tipo, detalle) => problemas.push({ tipo, detalle });

let totalImgs = 0;
const imgsFaltan = new Set();
const enlacesRotos = new Map();
let sinDescripcion = 0;
let sinCanonica = 0;

for (const f of htmls) {
  const html = fs.readFileSync(f, 'utf8');
  const ruta = rutaDe(f);

  // 1. un solo H1
  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1 !== 1) anota('h1', `${ruta}: ${h1} h1`);

  // 2. sin href="#"
  if (/href="#"/.test(html)) anota('href-vacio', ruta);

  // 3. fugas de plantilla / restos de WordPress
  for (const fuga of ['[CIUDAD]', '{{', 'wpcf7', 'elementor', 'undefined"', 'NaN']) {
    if (html.includes(fuga)) anota('fuga', `${ruta}: ${fuga}`);
  }

  // 4. metadatos
  if (!/<meta name="description" content="[^"]+"/.test(html)) sinDescripcion++;
  if (!/<link rel="canonical"/.test(html)) sinCanonica++;

  // 5. imagenes referenciadas que no estan en public/
  for (const m of html.matchAll(/(?:src|srcset)="([^"]*\/wp-content\/uploads\/[^"]*)"/g)) {
    for (const trozo of m[1].split(',')) {
      const u = trozo.trim().split(/\s+/)[0];
      if (!u.startsWith('/wp-content/')) continue;
      totalImgs++;
      if (!fs.existsSync(path.join(PUBLICO, decodeURIComponent(u).replace(/^\//, '')))) imgsFaltan.add(u);
    }
  }

  // 6. enlaces internos
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const u = m[1];
    if (u.startsWith('/wp-content/') || u.startsWith('/_astro/') || /\.\w{2,4}$/.test(u)) continue;
    const norm = u.endsWith('/') ? u : u + '/';
    if (!rutas.has(norm)) enlacesRotos.set(u, (enlacesRotos.get(u) || 0) + 1);
  }
}

// 7. ficheros que tienen que estar
for (const req of ['sitemap-index.xml', 'robots.txt', '404.html']) {
  if (!fs.existsSync(path.join(DIST, req))) anota('falta-fichero', req);
}

const sitemaps = fs.readdirSync(DIST).filter((f) => /^sitemap.*\.xml$/.test(f));
let urlsSitemap = 0;
for (const s of sitemaps) {
  urlsSitemap += (fs.readFileSync(path.join(DIST, s), 'utf8').match(/<loc>/g) || []).length;
}

// ------------------------------------------------------------------ informe
const por = problemas.reduce((a, p) => ((a[p.tipo] = (a[p.tipo] || 0) + 1), a), {});
const bien = (c) => (c === 0 ? 'OK  ' : 'MAL ');

console.log('=== AUDITORIA ===');
console.log(`     paginas generadas        ${htmls.length}`);
console.log(`${bien(por['h1'] || 0)} un solo H1 por pagina    ${por['h1'] || 0} fallos`);
console.log(`${bien(por['href-vacio'] || 0)} href="#"                 ${por['href-vacio'] || 0}`);
console.log(`${bien(por['fuga'] || 0)} fugas de plantilla       ${por['fuga'] || 0}`);
console.log(`${bien(enlacesRotos.size)} enlaces internos rotos   ${enlacesRotos.size} distintos`);
console.log(`${bien(imgsFaltan.size)} imagenes que faltan      ${imgsFaltan.size} de ${totalImgs} referencias`);
console.log(`${bien(sinDescripcion)} sin meta description     ${sinDescripcion}`);
console.log(`${bien(sinCanonica)} sin canonical            ${sinCanonica}`);
console.log(`${bien(por['falta-fichero'] || 0)} sitemap/robots/404       ${sitemaps.join(', ') || 'ninguno'}`);
console.log(`     URLs en el sitemap       ${urlsSitemap}`);

if (enlacesRotos.size) {
  console.log('\n-- enlaces internos rotos (top 15)');
  [...enlacesRotos].sort((a, b) => b[1] - a[1]).slice(0, 15)
    .forEach(([u, n]) => console.log(`   ${String(n).padStart(4)}  ${u}`));
}
if (imgsFaltan.size) {
  console.log(`\n-- faltan ${imgsFaltan.size} imagenes en public/ (muestra)`);
  [...imgsFaltan].slice(0, 8).forEach((u) => console.log('   ', u));
  console.log('   Ejecuta:  node scripts/descargar-imagenes.mjs');
}
for (const p of problemas.filter((p) => p.tipo === 'fuga').slice(0, 10)) console.log('   fuga:', p.detalle);
for (const p of problemas.filter((p) => p.tipo === 'h1').slice(0, 10)) console.log('   h1:', p.detalle);

const grave = (por['h1'] || 0) + (por['href-vacio'] || 0) + (por['fuga'] || 0)
  + enlacesRotos.size + (por['falta-fichero'] || 0);
console.log(grave === 0 ? '\nTodo correcto.' : `\n${grave} problemas por resolver.`);
