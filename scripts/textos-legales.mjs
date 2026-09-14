// Escribe los textos legales en las tres páginas que WordPress exportó
// vacías (el plugin Adapta RGPD los generaba al vuelo y no los guardaba).
//   node scripts/textos-legales.mjs
// Los datos del titular se leen de src/data/site.json (bloque "titular");
// mientras no estén, salen entre corchetes para que se vean.
import fs from 'node:fs';

const site = JSON.parse(fs.readFileSync('src/data/site.json', 'utf8'));
const t = site.titular || {};
const NOMBRE = t.nombre || '[NOMBRE O RAZÓN SOCIAL DEL TITULAR]';
const NIF = t.nif || '[NIF]';
const DIRECCION = t.direccion || '[DIRECCIÓN POSTAL]';
const EMAIL = site.email;
const DOMINIO = site.dominio.replace(/^https?:\/\//, '');
const WEB = site.nombre;

const avisoLegal = `
<h2>Datos identificativos</h2>
<p>En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que el titular del sitio web <strong>${DOMINIO}</strong> (en adelante, «el sitio web») es <strong>${NOMBRE}</strong>, con NIF ${NIF} y domicilio en ${DIRECCION}. Correo electrónico de contacto: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
<h2>Objeto del sitio web</h2>
<p>${WEB} es un portal informativo sobre casas prefabricadas de madera, hormigón, Steel Framing y casetas: modelos, precios orientativos, planos, fabricantes y empresas del sector en España. A través del formulario de contacto, el usuario puede solicitar información o presupuesto, que el titular traslada a fabricantes y empresas colaboradoras.</p>
<p>Los precios, plazos y características que aparecen en el sitio web son orientativos y no constituyen oferta contractual. El presupuesto definitivo lo emite en cada caso el fabricante o empresa correspondiente.</p>
<h2>Condiciones de uso</h2>
<p>El acceso al sitio web es gratuito y atribuye la condición de usuario, que acepta estas condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas, contrarias a la buena fe o al orden público, ni a introducir virus o sistemas que puedan dañar el sitio web o a terceros.</p>
<h2>Propiedad intelectual e industrial</h2>
<p>Los textos, imágenes, diseño, logotipos, código fuente y demás contenidos del sitio web son propiedad del titular o de terceros que han autorizado su uso, y están protegidos por la legislación de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa del titular, salvo para uso personal y privado.</p>
<h2>Enlaces a terceros</h2>
<p>El sitio web contiene enlaces a páginas de fabricantes, empresas y otros servicios de terceros. El titular no se hace responsable de los contenidos, condiciones ni políticas de privacidad de esos sitios, cuyo acceso se realiza bajo la exclusiva responsabilidad del usuario.</p>
<h2>Publicidad</h2>
<p>El sitio web muestra anuncios servidos por Google AdSense. El titular no controla ni es responsable de los productos o servicios anunciados. Puedes consultar cómo Google utiliza la información en <a href="https://policies.google.com/technologies/partner-sites" rel="nofollow noopener" target="_blank">policies.google.com/technologies/partner-sites</a>.</p>
<h2>Exclusión de responsabilidad</h2>
<p>El titular no garantiza la ausencia de errores en los contenidos ni la disponibilidad ininterrumpida del sitio web, y no responde de los daños derivados de su uso, de la falta de disponibilidad o de la información obtenida a través de él, dentro de los límites que establece la ley.</p>
<h2>Legislación aplicable</h2>
<p>Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa vigente en materia de consumidores y usuarios.</p>
`;

const privacidad = `
<h2>Responsable del tratamiento</h2>
<p>El responsable del tratamiento de los datos personales recogidos en <strong>${DOMINIO}</strong> es <strong>${NOMBRE}</strong>, NIF ${NIF}, con domicilio en ${DIRECCION}. Correo electrónico: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
<h2>Qué datos tratamos y para qué</h2>
<p><strong>Formulario de contacto y solicitudes de presupuesto:</strong> nombre, correo electrónico, teléfono, localidad y el contenido del mensaje. Los usamos para responder a tu consulta, elaborar el presupuesto y, si lo solicitas, trasladar tu petición a fabricantes y empresas colaboradoras que puedan atenderla en tu zona.</p>
<p><strong>Navegación:</strong> datos técnicos y de uso (páginas visitadas, dispositivo, dirección IP) a través de cookies y tecnologías similares, con fines de medición de audiencia y publicidad, siempre previo consentimiento. Más detalle en la <a href="/politica-de-cookies/">política de cookies</a>.</p>
<h2>Base jurídica</h2>
<p>El tratamiento de los datos del formulario se basa en la aplicación de medidas precontractuales a petición tuya y en tu consentimiento (art. 6.1.a y b del RGPD). El tratamiento de datos de navegación con fines analíticos y publicitarios se basa en tu consentimiento, que puedes retirar en cualquier momento.</p>
<h2>Destinatarios</h2>
<p>Tus datos de contacto se comunican únicamente a los fabricantes y empresas del sector a los que trasladamos tu solicitud de presupuesto, para que puedan atenderla. Además, prestan servicio como encargados del tratamiento: el proveedor de alojamiento web (Netlify, Inc.), el proveedor del formulario de contacto (Web3Forms) y Google LLC (Google Analytics y Google AdSense). Algunos de estos proveedores están fuera del Espacio Económico Europeo; las transferencias se amparan en el Marco de Privacidad de Datos UE-EE. UU. o en cláusulas contractuales tipo aprobadas por la Comisión Europea.</p>
<h2>Conservación</h2>
<p>Los datos de las solicitudes se conservan mientras dure la relación y, después, durante los plazos necesarios para atender posibles responsabilidades legales. Los datos de navegación se conservan según los plazos indicados en la política de cookies.</p>
<h2>Tus derechos</h2>
<p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como retirar el consentimiento, escribiendo a <a href="mailto:${EMAIL}">${EMAIL}</a> e indicando el derecho que ejerces. Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" rel="nofollow noopener" target="_blank">www.aepd.es</a>).</p>
<h2>Seguridad</h2>
<p>Aplicamos las medidas técnicas y organizativas adecuadas para proteger tus datos frente a acceso, alteración o pérdida no autorizados. El sitio web se sirve íntegramente bajo HTTPS.</p>
<h2>Menores</h2>
<p>El sitio web no está dirigido a menores de 14 años. Si tienes conocimiento de que un menor nos ha facilitado datos, escríbenos y los eliminaremos.</p>
`;

const cookies = `
<h2>Qué son las cookies</h2>
<p>Las cookies son pequeños archivos que el sitio web guarda en tu navegador para recordar información sobre tu visita. En <strong>${DOMINIO}</strong> usamos cookies propias imprescindibles y cookies de terceros de medición y publicidad, estas últimas solo si las aceptas en el aviso que aparece al entrar.</p>
<h2>Cookies que utilizamos</h2>
<h3>Técnicas (necesarias)</h3>
<p>Permiten el funcionamiento básico del sitio web y recordar tu elección sobre las cookies. No requieren consentimiento.</p>
<h3>Análisis</h3>
<p><strong>Google Analytics</strong> (Google LLC): mide el número de visitas, las páginas vistas y el comportamiento de navegación de forma agregada, para mejorar el sitio web. Cookies <code>_ga</code>, <code>_ga_*</code> (duración de hasta 2 años). Más información: <a href="https://policies.google.com/privacy" rel="nofollow noopener" target="_blank">policies.google.com/privacy</a>.</p>
<h3>Publicidad</h3>
<p><strong>Google AdSense</strong> (Google LLC): muestra anuncios y, si lo consientes, los personaliza según tus intereses. Puede instalar cookies como <code>IDE</code>, <code>_gcl_*</code> o <code>test_cookie</code> (duración de hasta 13 meses). Puedes gestionar la personalización en <a href="https://adssettings.google.com" rel="nofollow noopener" target="_blank">adssettings.google.com</a> y consultar cómo Google usa los datos en <a href="https://policies.google.com/technologies/partner-sites" rel="nofollow noopener" target="_blank">policies.google.com/technologies/partner-sites</a>.</p>
<h2>Cómo aceptar, rechazar o retirar el consentimiento</h2>
<p>Al entrar en el sitio web aparece un aviso donde puedes aceptar o rechazar las cookies de análisis y publicidad, o configurarlas por finalidad. Puedes cambiar tu elección en cualquier momento desde el enlace de configuración de cookies del propio aviso o borrando las cookies de tu navegador.</p>
<p>También puedes bloquear o eliminar las cookies desde la configuración de tu navegador: <a href="https://support.google.com/chrome/answer/95647" rel="nofollow noopener" target="_blank">Chrome</a>, <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" rel="nofollow noopener" target="_blank">Firefox</a>, <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" rel="nofollow noopener" target="_blank">Safari</a> y <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" rel="nofollow noopener" target="_blank">Edge</a>. Si bloqueas las cookies técnicas, algunas partes del sitio web pueden no funcionar correctamente.</p>
<h2>Más información</h2>
<p>Para cualquier duda sobre esta política, escríbenos a <a href="mailto:${EMAIL}">${EMAIL}</a>. Consulta también nuestra <a href="/politica-de-privacidad/">política de privacidad</a>.</p>
`;

const textos = {
  'aviso-legal': {
    cuerpo: avisoLegal,
    descripcion: `Aviso legal de ${DOMINIO}: datos del titular, condiciones de uso, propiedad intelectual y responsabilidad.`,
  },
  'politica-de-privacidad': {
    cuerpo: privacidad,
    descripcion: `Política de privacidad de ${DOMINIO}: qué datos tratamos, para qué, con quién los compartimos y cómo ejercer tus derechos.`,
  },
  'politica-de-cookies': {
    cuerpo: cookies,
    descripcion: `Política de cookies de ${DOMINIO}: cookies técnicas, de análisis (Google Analytics) y de publicidad (Google AdSense), y cómo gestionarlas.`,
  },
};

for (const [slug, datos] of Object.entries(textos)) {
  const ruta = `src/content/pages/${slug}.json`;
  const p = JSON.parse(fs.readFileSync(ruta, 'utf8'));
  p.cuerpo = datos.cuerpo.trim().replace(/\n+/g, '\n');
  p.descripcion = datos.descripcion;
  p.palabras = p.cuerpo.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  fs.writeFileSync(ruta, JSON.stringify(p, null, 1) + '\n');
  console.log(slug, p.palabras, 'palabras');
}
