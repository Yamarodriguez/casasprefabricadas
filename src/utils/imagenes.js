import fs from 'node:fs';
import path from 'node:path';

const PUBLICO = path.resolve('public');
const cache = new Map();

/** ¿Existe el archivo en public/? Se cachea: son ~10.000 comprobaciones por build. */
export function existe(ruta) {
  if (!ruta || !ruta.startsWith('/')) return false;
  if (cache.has(ruta)) return cache.get(ruta);
  const limpia = decodeURIComponent(ruta.split('?')[0].split('#')[0]);
  const ok = fs.existsSync(path.join(PUBLICO, limpia));
  cache.set(ruta, ok);
  return ok;
}

/** Marcador SVG en data: URI para cuando falta una imagen. Nunca renombra rutas. */
export function marcador(ancho = 960, alto = 540, texto = 'Casas Prefabricadas') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}" role="img" aria-label="${escapar(texto)}">
<rect width="100%" height="100%" fill="#eef2f7"/>
<rect x="1" y="1" width="${ancho - 2}" height="${alto - 2}" fill="none" stroke="#dde3ea" stroke-width="2"/>
<text x="50%" y="50%" fill="#8394a8" font-family="system-ui,sans-serif" font-size="${Math.max(14, Math.round(ancho / 28))}" text-anchor="middle" dominant-baseline="middle">${escapar(texto)}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapar(s) {
  return String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
}

/**
 * Sustituye por un marcador las imágenes cuyo archivo no está en public/,
 * y limpia del srcset las variantes que falten. Las rutas que SÍ existen no
 * se tocan jamás: /wp-content/uploads/ está indexado en Google Imágenes.
 */
/* Los 5 archivos que faltan en la biblioteca (2021/09) tienen su misma
   foto subida de nuevo en 2022/02 con otro nombre: es la que usan las
   tarjetas de todas las páginas de provincia. Solo se sustituyen estas
   rutas concretas, comprobadas una a una; el resto no se toca. */
const EQUIVALENTES = {
  '/wp-content/uploads/2021/09/casa-prefabricada-hormigon.jpg': '/wp-content/uploads/2022/02/casas-prefabricadas-de-hormigon-1024x576.jpg',
  '/wp-content/uploads/2021/09/casa-prefabricada-mediterraneas.jpg': '/wp-content/uploads/2022/02/casa-prefabricada-mediterraneas-1024x576.jpg',
  '/wp-content/uploads/2021/09/casa-prefabricadas-Modernas.jpg': '/wp-content/uploads/2022/02/casa-prefabricadas-Modernas-1024x576.jpg',
  '/wp-content/uploads/2021/09/casa-prefabricadas-modulares.jpg': '/wp-content/uploads/2022/02/casa-prefabricadas-modulares-1024x576.jpg',
  'https://prefabricadas.casa/wp-content/uploads/2021/09/catalogos-casa-prefabricadas.jpg': '/wp-content/uploads/2022/02/catalogos-casa-prefabricadas-1024x1024.jpg',
};

export function sanearImagenes(html) {
  if (!html) return { html: '', faltan: [] };
  const faltan = [];

  const salida = html.replace(/<img\b[^>]*>/gi, (tag) => {
    let src = (tag.match(/\ssrc="([^"]*)"/i) || [])[1];
    if (!src) return tag;

    if (EQUIVALENTES[src] && existe(EQUIVALENTES[src])) {
      tag = tag.replace(/\ssrc="[^"]*"/i, ` src="${EQUIVALENTES[src]}"`).replace(/\ssrcset="[^"]*"/i, '').replace(/\ssizes="[^"]*"/i, '');
      src = EQUIVALENTES[src];
    }

    if (!existe(src)) {
      faltan.push(src);
      const alt = (tag.match(/\salt="([^"]*)"/i) || [, ''])[1];
      const w = Number((tag.match(/\swidth="(\d+)"/i) || [, 960])[1]);
      const h = Number((tag.match(/\sheight="(\d+)"/i) || [, Math.round(w * 0.5625)])[1]);
      return tag
        .replace(/\ssrc="[^"]*"/i, ` src="${marcador(w, h, alt || 'Imagen no disponible')}"`)
        .replace(/\ssrcset="[^"]*"/i, '')
        .replace(/\ssizes="[^"]*"/i, '');
    }

    // el src existe: se sirve la copia .webp si la hay (scripts/webp.mjs,
    // un 69 % menos de peso) y se podan del srcset las variantes que falten
    return tag
      .replace(/\ssrc="([^"]*)"/i, (todo, u) => ` src="${aWebp(u)}"`)
      .replace(/\ssrcset="([^"]*)"/i, (todo, valor) => {
        const buenas = valor
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
          .filter((t) => {
            const u = t.split(/\s+/)[0];
            const ok = existe(u);
            if (!ok) faltan.push(u);
            return ok;
          })
          .map((t) => {
            const [u, ...resto] = t.split(/\s+/);
            return [aWebp(u), ...resto].join(' ');
          });
        return buenas.length ? ` srcset="${buenas.join(', ')}"` : '';
      });
  });

  return { html: salida, faltan };
}

/** La ruta .webp equivalente si existe en public/; si no, la original. */
export function aWebp(ruta) {
  if (!/\.(jpe?g|png)$/i.test(ruta)) return ruta;
  const webp = ruta.replace(/\.(jpe?g|png)$/i, '.webp');
  return existe(webp) ? webp : ruta;
}
