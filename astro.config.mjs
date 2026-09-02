import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://prefabricadascasas.es',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (pagina) =>
        !['/aviso-legal/', '/politica-de-privacidad/', '/politica-de-cookies/', '/gracias/']
          .some((r) => pagina.endsWith(r)),
    }),
  ],
});
