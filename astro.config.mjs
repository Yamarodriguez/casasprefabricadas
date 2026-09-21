import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://prefabricadascasas.es',
  trailingSlash: 'always',
  // el CSS (7 KB comprimido) va dentro de cada HTML: se ahorra una peticion
  // que bloqueaba el primer pintado en movil
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      // fecha de la compilacion como lastmod: Google prioriza lo que cambia
      lastmod: new Date(),
      filter: (pagina) =>
        !['/aviso-legal/', '/politica-de-privacidad/', '/politica-de-cookies/', '/gracias/']
          .some((r) => pagina.endsWith(r)),
    }),
  ],
});
