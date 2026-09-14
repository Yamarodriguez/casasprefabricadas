// Genera los favicons a partir de la casita del logo.
//   node scripts/favicons.mjs
// Escribe en public/: favicon.ico (16+32+48), favicon-32.png, favicon-96.png
// y apple-touch-icon.png (180). Base.astro ya los enlaza.
import sharp from 'sharp';
import fs from 'node:fs';

const LOGO = 'public/wp-content/uploads/2021/09/casas-prefabricadas--1024x450.png';

// la casita ocupa la parte izquierda del logo; se recorta y se cuadra
const casa = await sharp(LOGO)
  .extract({ left: 30, top: 70, width: 500, height: 310 })
  .extend({ top: 95, bottom: 95, left: 0, right: 0, background: '#ffffff' })
  .png()
  .toBuffer();

async function png(tamano) {
  return sharp(casa).resize(tamano, tamano, { fit: 'contain', background: '#ffffff' }).png().toBuffer();
}

fs.writeFileSync('public/favicon-32.png', await png(32));
fs.writeFileSync('public/favicon-96.png', await png(96));
fs.writeFileSync('public/apple-touch-icon.png', await png(180));

// ICO con PNG dentro (lo entienden todos los navegadores actuales)
const tamanos = [16, 32, 48];
const imagenes = await Promise.all(tamanos.map(png));
const cabecera = Buffer.alloc(6);
cabecera.writeUInt16LE(0, 0); // reservado
cabecera.writeUInt16LE(1, 2); // tipo: icono
cabecera.writeUInt16LE(tamanos.length, 4);
const entradas = [];
let desplazamiento = 6 + 16 * tamanos.length;
imagenes.forEach((img, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(tamanos[i] === 256 ? 0 : tamanos[i], 0);
  e.writeUInt8(tamanos[i] === 256 ? 0 : tamanos[i], 1);
  e.writeUInt8(0, 2); // colores en paleta
  e.writeUInt8(0, 3); // reservado
  e.writeUInt16LE(1, 4); // planos
  e.writeUInt16LE(32, 6); // bits por pixel
  e.writeUInt32LE(img.length, 8);
  e.writeUInt32LE(desplazamiento, 12);
  desplazamiento += img.length;
  entradas.push(e);
});
fs.writeFileSync('public/favicon.ico', Buffer.concat([cabecera, ...entradas, ...imagenes]));
console.log('favicons generados en public/');
