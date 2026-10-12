/**
 * Fechas reales de cada página -> src/data/fechas.json
 *
 *   publicado   la de WordPress (post_date) y, en las páginas nuevas, el
 *               primer commit de su JSON. Una vez escrita no se cambia.
 *   modificado  el último commit que tocó el JSON de la página.
 *
 * Las IA y Google priorizan lo actualizado, pero una fecha que cambia en
 * las 600 páginas a la vez (la de compilación) no es una señal fiable:
 * aquí cada página lleva la suya. Alimenta dateModified/datePublished del
 * JSON-LD, la fecha visible junto a las migas y el lastmod del sitemap.
 *
 * Uso, tras commitear cambios de contenido:
 *   node scripts/fechas.mjs
 * La primera vez, con las fechas de WordPress (sacadas del XML):
 *   node scripts/fechas.mjs ruta/fechas-wordpress.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const DIR = 'src/content/pages';
const SALIDA = 'src/data/fechas.json';

const previas = fs.existsSync(SALIDA) ? JSON.parse(fs.readFileSync(SALIDA, 'utf8')) : {};
const wordpress = process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2], 'utf8')) : {};

/* un solo git log: fecha de cada commit y los JSON que tocó, del más
   nuevo al más antiguo */
const log = execSync(`git log --format=@%cs --name-only -- ${DIR}`, { encoding: 'utf8' });
const ultimo = {};
const primero = {};
let fecha = '';
for (const linea of log.split('\n')) {
  if (linea.startsWith('@')) fecha = linea.slice(1);
  else if (linea.trim()) {
    const archivo = path.basename(linea.trim());
    ultimo[archivo] ??= fecha;
    primero[archivo] = fecha;
  }
}

const hoy = new Date().toISOString().slice(0, 10);
const salida = {};
for (const archivo of fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).sort()) {
  const { ruta } = JSON.parse(fs.readFileSync(path.join(DIR, archivo), 'utf8'));
  const modificado = ultimo[archivo] || hoy; // sin commit todavía: hoy
  const publicado = previas[ruta]?.publicado || wordpress[ruta]?.publicado || primero[archivo] || modificado;
  salida[ruta] = { publicado, modificado: modificado < publicado ? publicado : modificado };
}

fs.writeFileSync(SALIDA, JSON.stringify(salida, null, 1) + '\n');
console.log(`${Object.keys(salida).length} páginas con fecha -> ${SALIDA}`);
