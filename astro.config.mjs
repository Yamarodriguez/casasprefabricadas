import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://prefabricadascasas.es',
  trailingSlash: 'always',
  build: { format: 'directory' },
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
