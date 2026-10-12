import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fechas from './src/data/fechas.json' with { type: 'json' };

const SITIO = 'https://prefabricadascasas.es';

export default defineConfig({
  site: SITIO,
  trailingSlash: 'always',
  // el CSS (7 KB comprimido) va dentro de cada HTML: se ahorra una peticion
  // que bloqueaba el primer pintado en movil
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (pagina) =>
        !['/aviso-legal/', '/politica-de-privacidad/', '/politica-de-cookies/', '/gracias/']
          .some((r) => pagina.endsWith(r)),
      /* lastmod = ultimo cambio real de cada pagina (src/data/fechas.json,
         node scripts/fechas.mjs). Antes era la fecha de compilacion en
         todas: una señal que Google y Bing aprenden a ignorar. */
      serialize(item) {
        const ruta = item.url.slice(SITIO.length) || '/';
        const fecha = fechas[ruta]?.modificado;
        return fecha ? { ...item, lastmod: fecha } : item;
      },
    }),
  ],
});
