/**
 * /llms.txt (https://llmstxt.org): índice en Markdown para agentes de IA.
 * Se genera en cada compilación desde los mismos JSON que las páginas, así
 * que nunca se queda desfasado. Lista las guías, los tipos de casa y sus
 * temas; las ~400 páginas de localidad no van una a una (repetirían lo
 * mismo): van las provincias genéricas en "Optional".
 */
import site from '../data/site.json';
import { clasificar } from '../utils/faq.js';
import { descripcionSeo } from '../utils/seo.js';

const modulos = import.meta.glob('../content/pages/*.json', { eager: true });
const paginas = Object.values(modulos)
  .map((m) => m.default ?? m)
  .filter((p) => p.palabraClave && !p.noindex)
  .map((p) => ({ ...p, ...clasificar(p) }));

const NOMBRE_LINEA = {
  generica: 'Casas prefabricadas (todos los sistemas)',
  madera: 'Casas de madera',
  hormigon: 'Casas prefabricadas de hormigón',
  steel: 'Casas de Steel Framing',
  casetas: 'Casetas prefabricadas',
};
const ORDEN = ['generica', 'madera', 'hormigon', 'steel', 'casetas'];

const enlace = (p) => `- [${p.h1 || p.titulo}](${new URL(p.ruta, site.dominio).href}): ${descripcionSeo(p)}`;
const porRuta = (a, b) => a.ruta.localeCompare(b.ruta);

export function GET() {
  const lineas = [
    `# ${site.nombre} (prefabricadascasas.es)`,
    '',
    `> ${site.descripcion} Guía en español sobre casas prefabricadas en España: precios orientativos por m², plazos, licencias, financiación y comparativa de sistemas constructivos, con páginas por provincia y ciudad.`,
    '',
    'Datos de referencia que usa todo el sitio (2026, sin terreno, cimentación ni licencias): madera 600–900 €/m² y 3–6 meses; Steel Framing desde 450 €/m² terminada y 3–5 meses; hormigón prefabricado 900–1.500 €/m² y 4–9 meses. Toda casa prefabricada fija necesita proyecto y licencia de obra y se puede hipotecar.',
    '',
  ];

  for (const linea of ORDEN) {
    const deLinea = paginas.filter((p) => p.linea === linea && !p.lugar);
    if (!deLinea.length) continue;
    const raiz = deLinea.filter((p) => !p.tema).sort(porRuta);
    const temas = deLinea.filter((p) => p.tema).sort(porRuta);
    lineas.push(`## ${NOMBRE_LINEA[linea]}`, '', ...raiz.map(enlace), ...temas.map(enlace), '');
  }

  const provincias = paginas.filter((p) => p.linea === 'generica' && p.lugar).sort(porRuta);
  lineas.push(
    '## Optional',
    '',
    'Casas prefabricadas por provincia y ciudad (cada una enlaza a sus versiones de madera, hormigón, Steel Framing y casetas):',
    '',
    ...provincias.map((p) => `- [${p.lugar}](${new URL(p.ruta, site.dominio).href})`),
    '',
  );

  return new Response(lineas.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
