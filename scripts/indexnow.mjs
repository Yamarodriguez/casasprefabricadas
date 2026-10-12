/**
 * Avisa a Bing (y a Yandex, Seznam, Naver...) de las páginas cambiadas
 * mediante IndexNow. Importa porque ChatGPT Search y Copilot buscan en el
 * índice de Bing: cuanto antes lo recoja Bing, antes lo pueden citar.
 *
 * La clave está publicada en /ecd5922d22e7b466acb5564ace5eac69.txt (en
 * public/). Ejecutar DESPUÉS de que Netlify haya publicado el cambio:
 *
 *   node scripts/indexnow.mjs            páginas modificadas en los últimos 7 días
 *   node scripts/indexnow.mjs 30         ... en los últimos 30 días
 *   node scripts/indexnow.mjs todas      todas las del sitemap (solo la primera vez)
 *
 * Las fechas salen de src/data/fechas.json (node scripts/fechas.mjs).
 */
import fs from 'node:fs';

const DOMINIO = 'prefabricadascasas.es';
const CLAVE = 'ecd5922d22e7b466acb5564ace5eac69';
const fechas = JSON.parse(fs.readFileSync('src/data/fechas.json', 'utf8'));
const arg = process.argv[2] || '7';

let rutas;
if (arg === 'todas') {
  rutas = Object.keys(fechas);
} else {
  const desde = new Date(Date.now() - Number(arg) * 864e5).toISOString().slice(0, 10);
  rutas = Object.entries(fechas).filter(([, f]) => f.modificado >= desde).map(([r]) => r);
}
/* las legales llevan noindex: no se avisan */
const FUERA = ['/aviso-legal/', '/politica-de-privacidad/', '/politica-de-cookies/', '/gracias/'];
const urlList = rutas.filter((r) => !FUERA.includes(r)).map((r) => `https://${DOMINIO}${r}`);

if (!urlList.length) {
  console.log('No hay páginas cambiadas en ese periodo.');
  process.exit(0);
}

const respuesta = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: DOMINIO, key: CLAVE, keyLocation: `https://${DOMINIO}/${CLAVE}.txt`, urlList }),
});
console.log(`${urlList.length} URL enviadas -> HTTP ${respuesta.status} ${respuesta.statusText}`);
/* 200/202: recibido. 403: la clave no está publicada todavía. 422: URL de otro dominio. */
