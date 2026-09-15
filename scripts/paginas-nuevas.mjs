// Páginas nuevas para las búsquedas que no tenían página (auditoría SEO
// de septiembre de 2026). Escribe un JSON por página en src/content/pages,
// con el mismo formato que las que vinieron de WordPress.
//   node scripts/paginas-nuevas.mjs
import fs from 'node:fs';

const hero = (src, alt, ancho, alto) => ({ src, alt, ancho, alto, srcset: `${src} ${ancho}w` });
const CTA = '<p><a href="/presupuesto/">Pedir presupuesto gratis</a></p>';

const paginas = [
  {
    slug: 'casas-prefabricadas-segunda-mano',
    titulo: 'Casas prefabricadas de segunda mano',
    h1: 'Casas prefabricadas de segunda mano: dónde comprar y qué revisar',
    tituloSeo: 'Casas prefabricadas de segunda mano: guía y precios',
    palabraClave: 'Casas prefabricadas de segunda mano',
    hero: hero('/wp-content/uploads/2021/09/venta-de-casas-prefabricadas.jpg', 'Casas prefabricadas de segunda mano', 820, 312),
    cuerpo: `
<p>Una <strong>casa prefabricada de segunda mano</strong> puede costar entre un 30 % y un 60 % menos que la misma casa nueva. La clave está en que sea desmontable, en que el traslado sea viable y en revisar bien lo que se compra. En esta guía te contamos dónde se venden, qué tipos existen, cuánto cuestan y qué comprobar antes de pagar.</p>

<h2>Qué se entiende por casa prefabricada de segunda mano</h2>
<p>Hay tres situaciones muy distintas que se anuncian con el mismo nombre:</p>
<ul>
<li><strong>Casas móviles y mobile homes usadas.</strong> Van sobre chasis con ruedas, se transportan en camión y se reubican sin obra. Son la mayoría de los anuncios y las más fáciles de comprar.</li>
<li><strong>Casas modulares desmontables.</strong> Módulos completos de madera, Steel Framing u hormigón ligero que se desconectan de la cimentación, se cargan y se vuelven a montar en otra parcela. Requieren grúa, transporte especial y un nuevo proyecto en destino.</li>
<li><strong>Casas de exposición y modelos de muestra.</strong> Casas que el fabricante ha tenido expuestas uno o dos años y vende con descuento. No son de segunda mano en sentido estricto: están nuevas y con garantía, pero salen entre un 15 % y un 30 % más baratas.</li>
</ul>
<p>Una casa prefabricada de hormigón con cimentación no se puede trasladar: en ese caso lo que se compra es la vivienda con su terreno, como cualquier casa de segunda mano.</p>

<h2>Cuánto cuesta una casa prefabricada de segunda mano</h2>
<p>Como referencia con lo que se ve en los portales de anuncios y en los propios fabricantes:</p>
<ul>
<li><strong>Casas móviles usadas de 30–40 m²:</strong> entre 8.000 y 18.000 €, según año, estado y equipamiento.</li>
<li><strong>Mobile homes de 60–90 m² con dos o tres dormitorios:</strong> entre 20.000 y 45.000 €.</li>
<li><strong>Casas modulares de madera desmontables de 60–100 m²:</strong> entre 25.000 y 55.000 €, más el traslado y la nueva cimentación (5.000–15.000 €).</li>
<li><strong>Casas de exposición:</strong> el precio de catálogo con un 15–30 % de descuento; una casa de madera de 100 m² que nueva cuesta 55.000 € puede quedar en 40.000–47.000 €.</li>
<li><strong>Casetas de obra y módulos prefabricados usados:</strong> desde 1.500 € un módulo de 6 m, frente a los 3.000–5.000 € nuevo.</li>
</ul>
<p>A cualquiera de estos precios hay que sumar el transporte (entre 1.000 y 6.000 € según distancia y si hace falta grúa), la base o cimentación en la parcela nueva, las acometidas y, si es una casa fija, el proyecto y la licencia.</p>

<h2>Dónde comprar casas prefabricadas de segunda mano</h2>
<ul>
<li><strong>Los propios fabricantes.</strong> Muchos venden sus casas de exposición y aceptan casas usadas como parte del pago de una nueva. Es la vía más segura: la casa viene revisada y con garantía. Pídenos que te pongamos en contacto con los fabricantes de tu zona que tienen casas de exposición.</li>
<li><strong>Portales de anuncios</strong> (Milanuncios, Wallapop, Idealista) en las categorías de casas móviles y casas prefabricadas: la oferta más amplia, pero sin garantía y con mucha variedad de estado.</li>
<li><strong>Campings y parques residenciales.</strong> Cuando un camping renueva sus mobile homes, vende las antiguas a precios muy bajos, a veces por lotes.</li>
<li><strong>Empresas de alquiler de módulos.</strong> Renuevan flota cada pocos años y venden casetas de obra y módulos habitables usados.</li>
</ul>

<h2>Qué revisar antes de comprar</h2>
<h3>Estructura y humedades</h3>
<p>En casas de madera, revisa la base (donde apoya en el suelo), las esquinas y el arranque de los muros: la pudrición empieza siempre ahí. En módulos de acero, busca óxido en las uniones y en el chasis. En cualquier caso, mira techos y rincones por si hay manchas de humedad o moho.</p>
<h3>Cubierta, ventanas y suelo</h3>
<p>Una cubierta con la tela asfáltica levantada o tejas rotas es lo primero que se paga en reparaciones. Comprueba que las ventanas cierran y no tienen condensación entre vidrios, y que el suelo no cede al pisar.</p>
<h3>Instalaciones</h3>
<p>Electricidad con cuadro y diferencial, fontanería sin fugas, calentador o caldera en funcionamiento. En mobile homes antiguas la instalación eléctrica puede no cumplir la normativa actual y hay que rehacerla.</p>
<h3>Documentación</h3>
<p>Pide la ficha técnica del fabricante, el certificado de conformidad (marcado CE en casas móviles), las facturas de compra y, si la casa estaba instalada legalmente, la licencia o autorización que tenía. Sin documentación, será difícil obtener licencia en la parcela nueva.</p>
<h3>Traslado</h3>
<p>Antes de cerrar la compra, pide presupuesto de transporte: una casa modular de 100 m² puede necesitar dos camiones y una grúa, y el acceso a tu parcela (ancho de calle, pendiente, cables) puede hacerlo inviable.</p>

<h2>Licencia y normativa para una casa de segunda mano</h2>
<p>La antigüedad de la casa no cambia los trámites: si va a ir fija sobre cimentación, necesita proyecto y licencia de obra en el ayuntamiento de destino igual que una nueva, y el terreno debe ser urbanizable. Si es una casa móvil que conserva las ruedas y no se ancla, muchos municipios la tramitan como instalación temporal con una declaración responsable. Consulta la <a href="/licencia-casa-prefabricada-terreno-rustico/">guía de licencias en terreno rústico</a> antes de comprar.</p>

<h2>Segunda mano o nueva: cuándo compensa cada opción</h2>
<p>La segunda mano compensa cuando la casa es móvil o desmontable, el traslado es corto y el estado es bueno: el ahorro real, descontando transporte y puesta a punto, suele quedar entre el 25 % y el 40 %. No compensa cuando hay que rehacer instalaciones o cubierta, cuando la casa no tiene documentación o cuando el traslado exige grúa y transporte especial: en ese caso una casa nueva de catálogo, con garantía decenal y precio cerrado, sale igual o mejor. Las <a href="/casas-prefabricadas-menos-100000-euros/">casas prefabricadas nuevas por menos de 100.000 €</a> son la alternativa a comparar.</p>
${CTA}
`,
  },
  {
    slug: 'casas-prefabricadas-menos-100000-euros',
    titulo: 'Casas prefabricadas por menos de 100.000 euros',
    h1: 'Casas prefabricadas por menos de 100.000 euros: qué se puede comprar',
    tituloSeo: 'Casas prefabricadas por menos de 100.000 € (2026)',
    palabraClave: 'Casas prefabricadas por menos de 100.000 euros',
    hero: hero('/wp-content/uploads/2021/09/casas-prefabricadas-baratas.jpg', 'Casas prefabricadas por menos de 100.000 euros', 820, 312),
    cuerpo: `
<p>Con <strong>menos de 100.000 euros</strong> se compra hoy una casa prefabricada de madera de hasta 150 m², una de Steel Framing de hasta 140 m² o una de hormigón de 80–100 m², todas llave en mano y con garantía decenal. Lo que no entra en esa cifra es el terreno, la cimentación y las licencias. Aquí tienes lo que da de sí cada tramo de presupuesto y qué modelos encajan.</p>

<h2>Qué incluye y qué no incluye el precio de la casa</h2>
<p>Los precios que siguen son de casa terminada sobre cimentación: estructura, cubierta, ventanas y puertas, instalaciones, baños y cocina montados, suelos y pintura. Quedan fuera el terreno, el estudio geotécnico, la cimentación (un 5–10 % del precio), las acometidas de agua y luz, el proyecto de arquitecto (4–8 %), la licencia de obra y los impuestos (ICIO e IVA al 10 % en vivienda nueva). Un cálculo prudente para el coste total es sumar entre un 20 % y un 30 % al precio de la casa.</p>

<h2>Hasta 50.000 euros</h2>
<ul>
<li><strong>Casas de madera de 50–80 m²</strong> con uno o dos dormitorios: entre 30.000 y 50.000 € llave en mano. Es el tramo con más oferta.</li>
<li><strong>Casas de Steel Framing de 60–90 m²:</strong> entre 35.000 y 50.000 €.</li>
<li><strong>Casas móviles de 60–80 m²</strong> con dos dormitorios: 40.000–50.000 €, sin cimentación.</li>
<li><strong>Tiny houses y mini casas de 25–40 m²</strong> completas: desde 25.000 €. Más en la página de <a href="/tiny-houses/">tiny houses</a>.</li>
</ul>

<h2>De 50.000 a 75.000 euros</h2>
<ul>
<li><strong>Casas de madera de 90–120 m²</strong> con tres dormitorios: 50.000–70.000 €. Es la franja de la casa de madera «típica» de una planta con porche.</li>
<li><strong>Steel Framing de 100–130 m²:</strong> 50.000–75.000 €, con acabados de serie.</li>
<li><strong>Hormigón prefabricado de 60–75 m²:</strong> desde 60.000 €, en paneles con acabados básicos.</li>
<li><strong>Casas con contenedores de dos o tres módulos (60–90 m²):</strong> 50.000–70.000 €.</li>
</ul>

<h2>De 75.000 a 100.000 euros</h2>
<ul>
<li><strong>Casas de madera de 130–160 m²</strong> en una o dos plantas, con cuatro dormitorios: 75.000–100.000 €.</li>
<li><strong>Steel Framing de 140–180 m²:</strong> 75.000–100.000 €.</li>
<li><strong>Hormigón prefabricado de 80–100 m²:</strong> 80.000–100.000 €, la opción más robusta y con menos mantenimiento dentro de este presupuesto.</li>
<li><strong>Casas modulares de módulos completos de 70–90 m²:</strong> 80.000–100.000 €, con instalación en dos o tres días.</li>
</ul>

<h2>Cómo estirar el presupuesto sin perder calidad</h2>
<ul>
<li><strong>Modelo de catálogo, no diseño a medida:</strong> ahorra entre un 10 % y un 25 %.</li>
<li><strong>Planta compacta y cubierta sencilla:</strong> una casa cuadrada de una planta cuesta menos por metro que una en forma de L con dos alturas.</li>
<li><strong>Acabados de serie</strong> en suelos, cocina y baños, que se pueden mejorar más adelante.</li>
<li><strong>Entrega en obra gris</strong> (estructura, cerramientos y cubierta) si puedes terminar el interior por tu cuenta: el Steel Framing parte de 360 €/m² así.</li>
<li><strong>No recortes en aislamiento, carpinterías ni cimentación:</strong> son lo que fija el confort y las facturas durante décadas.</li>
</ul>

<h2>Financiar una casa de menos de 100.000 euros</h2>
<p>Una casa fija con proyecto y licencia se financia con hipoteca (hasta el 80 % del valor de tasación de terreno y casa) y, durante la obra, con hipoteca autopromotor que libera el dinero por fases. Con 20.000 € de entrada más un 10–12 % para gastos se puede afrontar una casa de 80.000 €. Las casas móviles no se hipotecan: se financian con préstamo personal o con la financiación del fabricante. Tienes el detalle en <a href="/financiacion/">financiación de casas prefabricadas</a>.</p>

<h2>Qué pedir al fabricante antes de firmar</h2>
<p>El desglose por escrito de lo que incluye el precio, el plazo de entrega con penalización por retraso, las garantías (10 años estructura, 3 habitabilidad, 1 acabados), y una casa ya entregada que puedas visitar. Compara al menos tres presupuestos con el mismo programa de necesidades: es la única forma de que los precios sean comparables. Si te interesa el precio por tamaño, mira <a href="/casas-prefabricadas-100-m2-precio/">cuánto cuesta una casa prefabricada de 100 m²</a>.</p>
${CTA}
`,
  },
  {
    slug: 'casas-prefabricadas-100-m2-precio',
    titulo: 'Casa prefabricada de 100 m²: precio',
    h1: 'Cuánto cuesta una casa prefabricada de 100 m² (y de 50, 80, 120 y 150)',
    tituloSeo: 'Casa prefabricada 100 m2: precio por sistema en 2026',
    palabraClave: 'Casa prefabricada 100 m2 precio',
    hero: hero('/wp-content/uploads/2021/09/casas-prefabricadas-precios.jpg', 'Precio de una casa prefabricada de 100 m²', 820, 312),
    cuerpo: `
<p>Una <strong>casa prefabricada de 100 m²</strong> cuesta en 2026 entre <strong>47.000 y 60.000 € en madera</strong>, entre <strong>45.000 y 70.000 € en Steel Framing</strong> y entre <strong>90.000 y 120.000 € en hormigón</strong>, llave en mano y sin contar terreno, cimentación ni licencias. Es el tamaño más demandado: tres dormitorios, dos baños, salón-cocina y porche en una planta. Aquí tienes el precio por sistema y por tamaño, y lo que hace subir o bajar la cifra.</p>

<h2>Cuánto cuesta una casa prefabricada de 100 m² según el sistema</h2>
<ul>
<li><strong>Madera (entramado ligero o SIP):</strong> 47.000–60.000 €. Es la más económica y la más rápida: 3–6 meses desde la licencia.</li>
<li><strong>Steel Framing:</strong> 45.000–70.000 € terminada (desde 36.000 € en obra gris). 3–5 meses.</li>
<li><strong>Hormigón prefabricado:</strong> 90.000–120.000 €. La más robusta y la de menor mantenimiento. 4–9 meses.</li>
<li><strong>Modular de módulos completos:</strong> 100.000–150.000 €, con el montaje en la parcela en dos o tres días.</li>
<li><strong>Contenedores (tres unidades de 40 pies):</strong> 60.000–90.000 €.</li>
</ul>

<h2>Precio por tamaño: de 50 a 150 m²</h2>
<p>El precio por metro cuadrado baja al aumentar la superficie, porque cocina, baños e instalaciones pesan lo mismo en una casa pequeña que en una grande:</p>
<ul>
<li><strong>Casa prefabricada de 50 m²</strong> (1 dormitorio): 21.000–30.000 € en madera; 28.000–38.000 € en Steel Framing; 50.000–65.000 € en hormigón.</li>
<li><strong>Casa prefabricada de 80 m²</strong> (2 dormitorios): 38.000–50.000 € en madera; 40.000–58.000 € en Steel Framing; 72.000–96.000 € en hormigón.</li>
<li><strong>Casa prefabricada de 100 m²</strong> (3 dormitorios): 47.000–60.000 € en madera; 45.000–70.000 € en Steel Framing; 90.000–120.000 € en hormigón.</li>
<li><strong>Casa prefabricada de 120 m²</strong> (3–4 dormitorios): 58.000–75.000 € en madera; 55.000–85.000 € en Steel Framing; 108.000–145.000 € en hormigón.</li>
<li><strong>Casa prefabricada de 150 m²</strong> (4 dormitorios, dos plantas): 90.000–135.000 € en madera; 68.000–105.000 € en Steel Framing; 135.000–190.000 € en hormigón.</li>
</ul>

<h2>Lo que hay que sumar al precio de la casa</h2>
<ul>
<li><strong>Terreno:</strong> lo que más varía; una parcela urbanizable de 500 m² va de 15.000 € en zonas rurales a más de 150.000 € cerca de las grandes ciudades.</li>
<li><strong>Estudio geotécnico y cimentación:</strong> 6.000–12.000 € para 100 m² (losa o zapatas).</li>
<li><strong>Acometidas de agua, luz y saneamiento:</strong> 2.000–8.000 € según la distancia a la red.</li>
<li><strong>Proyecto de arquitecto y dirección de obra:</strong> 4–8 % del precio de la casa.</li>
<li><strong>Licencia de obra e impuestos:</strong> ICIO (2–4 % del presupuesto según el municipio) e IVA al 10 %.</li>
</ul>
<p>Para una casa de madera de 100 m² a 55.000 €, el coste total sin terreno queda entre 68.000 y 75.000 €. Para una de hormigón a 100.000 €, entre 122.000 y 135.000 €.</p>

<h2>Qué hace subir el precio de una casa de 100 m²</h2>
<ul>
<li>Dos plantas en vez de una (más estructura y escalera): un 10–15 % más.</li>
<li>Cubierta inclinada compleja o a varias aguas frente a cubierta plana o a dos aguas.</li>
<li>Grandes acristalamientos y carpinterías de altas prestaciones.</li>
<li>Acabados de gama alta en cocina, baños y suelos: pueden añadir 10.000–25.000 €.</li>
<li>Diseño a medida en vez de modelo de catálogo: entre un 10 % y un 25 % más.</li>
<li>Distancia desde la fábrica y dificultad de acceso a la parcela (grúa, transporte especial).</li>
</ul>

<h2>Cómo pedir presupuesto para una casa de 100 m²</h2>
<p>Indica la localidad y, si puedes, la ubicación exacta de la parcela, el número de dormitorios, si quieres una o dos plantas y el sistema que prefieres. Con eso te enviamos en 24–48 horas propuestas de dos o tres fabricantes comparables, con el desglose de lo que incluye cada uno. Si tu presupuesto tiene un tope, mira también las <a href="/casas-prefabricadas-menos-100000-euros/">casas prefabricadas por menos de 100.000 €</a>.</p>
${CTA}
`,
  },
  {
    slug: 'tiny-houses',
    titulo: 'Tiny houses y mini casas prefabricadas',
    h1: 'Tiny houses y mini casas prefabricadas: modelos, precios y normativa',
    tituloSeo: 'Tiny houses en España: modelos, precios y normativa',
    palabraClave: 'Tiny houses prefabricadas',
    hero: hero('/wp-content/uploads/2021/09/casa-prefabricadas-cube.jpg', 'Tiny house prefabricada', 810, 450),
    cuerpo: `
<p>Una <strong>tiny house</strong> es una mini casa de entre 15 y 40 m², completa (dormitorio, baño, cocina y zona de estar), que se fabrica entera en taller y se instala en un día. Las hay sobre remolque, para moverlas, y fijas sobre una base. En España cuestan entre <strong>25.000 y 60.000 €</strong> y se usan como vivienda mínima, casa de invitados, estudio, alojamiento turístico o segunda residencia.</p>

<h2>Tipos de tiny house</h2>
<ul>
<li><strong>Sobre remolque (tiny house on wheels).</strong> De 15 a 25 m², con un ancho máximo de 2,55 m para poder circular por carretera. Se mueve con un vehículo con enganche o en camión. Legalmente es un remolque o una caravana, no una vivienda.</li>
<li><strong>Fija sobre base o cimentación ligera.</strong> De 20 a 40 m², sin límite de ancho, con techos más altos y mejor aislamiento. Es una edificación y necesita licencia.</li>
<li><strong>Modular ampliable.</strong> Un módulo de 25–30 m² al que se pueden añadir más módulos. Las <a href="/cube/">casas prefabricadas Cube</a> son este tipo.</li>
</ul>

<h2>Cuánto cuesta una tiny house</h2>
<ul>
<li><strong>En kit o en obra gris, de 15–20 m²:</strong> desde 12.000–18.000 €, para terminar por tu cuenta.</li>
<li><strong>Terminada, de 20–25 m², sobre remolque:</strong> 30.000–45.000 €, con baño, cocina y aislamiento.</li>
<li><strong>Fija de 25–40 m² con acabados de vivienda:</strong> 35.000–60.000 €.</li>
<li><strong>Diseño a medida o gama alta:</strong> 60.000–90.000 €.</li>
</ul>
<p>Por metro cuadrado son caras (1.200–1.800 €/m²) porque cocina, baño e instalaciones son las mismas que en una casa grande; en total, en cambio, son la vivienda completa más barata que existe. Hay que sumar el transporte (500–2.500 €), la base (losas, pilotes o solera: 800–3.000 €) y las acometidas o los sistemas autónomos (placas solares, depósito de agua, fosa séptica).</p>

<h2>Materiales y aislamiento</h2>
<p>La mayoría se construyen con entramado ligero de madera o con Steel Framing, que pesan poco (importante sobre remolque) y aíslan bien. Para vivir todo el año hacen falta muros con al menos 10 cm de aislamiento, ventanas de doble vidrio y una buena ventilación: en 25 m² la condensación aparece enseguida si la casa no respira. Las de gama alta llevan suelo radiante eléctrico, aerotermia compacta o estufa de leña.</p>

<h2>Normativa y licencia para una tiny house en España</h2>
<h3>Sobre remolque</h3>
<p>Si conserva las ruedas y no se ancla al terreno, se considera un vehículo (remolque de más de 750 kg, con matrícula propia). Aparcarla en una parcela privada de forma temporal suele permitirse; vivir en ella de forma permanente es una zona gris que cada ayuntamiento interpreta a su manera, y en suelo rústico está en general prohibido el uso residencial. En campings y parques de mobile homes es donde más seguridad jurídica hay.</p>
<h3>Fija</h3>
<p>Es una edificación: necesita proyecto y licencia de obra, cumplir el Código Técnico y las condiciones de habitabilidad de la comunidad autónoma (superficie mínima de vivienda, que en muchas comunidades es de 25–40 m² útiles). El terreno debe ser urbanizable; en rústico, consulta la <a href="/licencia-casa-prefabricada-terreno-rustico/">guía de licencias en terreno rústico</a>.</p>
<h3>Como construcción auxiliar</h3>
<p>Una tiny house de menos de 25–40 m² (según el municipio) instalada en el jardín de una vivienda existente, como estudio o casa de invitados sin cocina, se tramita muchas veces como obra menor o declaración responsable. Es la vía más sencilla si ya tienes casa.</p>

<h2>Para quién tiene sentido una tiny house</h2>
<ul>
<li>Una o dos personas que quieren vivienda propia con poco presupuesto y sin hipoteca.</li>
<li>Casa de invitados, estudio o despacho en el jardín de una casa existente.</li>
<li>Alojamiento turístico rural o glamping (el uso que más crece).</li>
<li>Segunda residencia en una parcela de recreo donde no se permite construir una casa convencional.</li>
</ul>
<p>Si necesitas más de 40 m², una <a href="/casas-de-madera-pequenas/">casa de madera pequeña</a> de 40–60 m² sale más a cuenta por metro cuadrado que dos tiny houses.</p>
${CTA}
`,
  },
  {
    slug: 'opiniones',
    titulo: 'Opiniones sobre casas prefabricadas',
    h1: 'Casas prefabricadas: opiniones, ventajas reales y problemas frecuentes',
    tituloSeo: 'Casas prefabricadas: opiniones y problemas frecuentes',
    palabraClave: 'Casas prefabricadas opiniones',
    hero: hero('/wp-content/uploads/2021/09/Imagenes-casas-prefabricadas.jpg', 'Opiniones sobre casas prefabricadas', 810, 450),
    cuerpo: `
<p>Las <strong>opiniones sobre casas prefabricadas</strong> se repiten con los años: quien compra a un fabricante serio, con proyecto y contrato cerrado, está satisfecho y repite; quien compra por precio a quien no debía, tiene problemas de humedades, retrasos o sobrecostes. Aquí recogemos lo que dicen los compradores, lo que es cierto y lo que es mito, y cómo evitar los problemas más frecuentes.</p>

<h2>Lo que más valoran quienes ya viven en una casa prefabricada</h2>
<ul>
<li><strong>El precio cerrado.</strong> Es la opinión más repetida: saber desde el contrato lo que va a costar, frente a las desviaciones del 15–30 % habituales en una obra tradicional.</li>
<li><strong>El plazo.</strong> Entrar a vivir en 4–9 meses, con la casa fabricándose mientras se tramita la licencia.</li>
<li><strong>El aislamiento.</strong> Facturas de calefacción y refrigeración muy por debajo de la casa anterior, sobre todo en madera y Steel Framing, donde el aislamiento va en el propio muro.</li>
<li><strong>La limpieza de la obra.</strong> Pocas semanas de trabajos en la parcela, sin meses de polvo, ruido y escombros.</li>
<li><strong>El acabado.</strong> Juntas, carpinterías y encuentros hechos en fábrica, con una precisión difícil a pie de obra.</li>
</ul>

<h2>Las quejas más frecuentes (y de dónde vienen)</h2>
<ul>
<li><strong>Humedades y condensaciones.</strong> Casi siempre en casas de madera con muros finos, sin cámara ventilada o mal instaladas sobre el terreno. Se evita con muros de 44 mm o más con aislamiento, zócalo elevado y ventilación.</li>
<li><strong>Retrasos en la entrega.</strong> En la mayoría de los casos el retraso es de la licencia municipal, no del fabricante; en el resto, de fabricantes sin taller propio que subcontratan. Exige plazo con penalización en el contrato.</li>
<li><strong>Sobrecostes.</strong> Vienen de lo que el presupuesto no incluía: cimentación, acometidas, transporte, licencias. Pide el desglose por escrito y calcula un 20–30 % sobre el precio de la casa.</li>
<li><strong>Ruido de lluvia y de pasos.</strong> En casas ligeras (madera, Steel Framing) mal aisladas acústicamente. Se resuelve con lana mineral en cámaras y forjados y con cubiertas bien aisladas.</li>
<li><strong>Problemas para hipotecar.</strong> Solo con casas móviles o no escrituradas; una casa fija con proyecto y licencia se hipoteca como cualquier vivienda.</li>
<li><strong>Dificultad para revender.</strong> Un mito heredado de las casas móviles antiguas: una casa prefabricada fija y escriturada se vende como cualquier casa, y las de hormigón conservan el valor de una vivienda de obra.</li>
</ul>

<h2>Mitos y verdades</h2>
<h3>«Duran menos que una casa de ladrillo»</h3>
<p>Falso para una casa bien construida: las de hormigón y Steel Framing superan los 100 años de vida útil; las de madera, entre 50 y 100 con mantenimiento. Todas cumplen el Código Técnico de la Edificación y llevan garantía decenal.</p>
<h3>«Son todas iguales»</h3>
<p>Falso: los modelos de catálogo se adaptan y hay proyectos a medida. Lo que sí es cierto es que un diseño desde cero cuesta entre un 10 % y un 25 % más.</p>
<h3>«Se nota que es prefabricada»</h3>
<p>Solo en las casas móviles y en las de gama muy baja. Una casa de madera, de Steel Framing o de hormigón terminada es indistinguible de una convencional.</p>
<h3>«No hace falta licencia»</h3>
<p>Falso para cualquier casa fija: necesita proyecto y licencia igual que una de obra. Solo las casas móviles con ruedas tienen un régimen distinto.</p>

<h2>Cómo elegir bien: lo que separa una buena experiencia de una mala</h2>
<ul>
<li>Fabricante con <strong>taller propio</strong>, años de trayectoria y casas ya entregadas que puedas visitar (pide hablar con sus propietarios).</li>
<li><strong>Contrato</strong> con precio cerrado, desglose de lo incluido, plazo con penalización y garantías por escrito.</li>
<li><strong>Proyecto visado</strong> por arquitecto y licencia antes de fabricar nada.</li>
<li>Espesor de aislamiento, tipo de carpinterías y detalle de la cimentación <strong>por escrito</strong>: es donde se esconde la diferencia entre dos presupuestos «iguales».</li>
<li>Desconfía de precios muy por debajo del mercado y de quien pide más del 30–40 % por adelantado.</li>
</ul>

<h2>Tu opinión</h2>
<p>Si ya vives en una casa prefabricada o has tenido problemas con un fabricante, escríbenos a <a href="mailto:casasprefabricadas@prefabricadascasas.es">casasprefabricadas@prefabricadascasas.es</a>: publicamos experiencias reales (con tu permiso y sin datos personales) para que otros compradores decidan con información. Y si estás empezando, compara modelos y <a href="/fabricantes/">fabricantes</a> antes de pedir presupuesto.</p>
${CTA}
`,
  },
  {
    slug: 'licencia-casa-prefabricada-terreno-rustico',
    titulo: 'Licencia para casa prefabricada en terreno rústico',
    h1: 'Licencia para una casa prefabricada en terreno rústico: qué se puede instalar',
    tituloSeo: 'Casa prefabricada en terreno rústico: licencia y normativa',
    palabraClave: 'Licencia casa prefabricada terreno rústico',
    hero: hero('/wp-content/uploads/2021/11/permisos-casas-de-madera-prefabricadas-1024x379.png', 'Licencia para casa prefabricada en terreno rústico', 1024, 379),
    cuerpo: `
<p>La pregunta más repetida de quien tiene una parcela en el campo: <strong>¿puedo poner una casa prefabricada en terreno rústico?</strong> La respuesta corta es que <strong>una vivienda fija, no</strong>, salvo excepciones ligadas a una explotación agrícola o a normativas autonómicas concretas; y que <strong>una construcción auxiliar o una casa móvil, a veces sí</strong>, con condiciones. Aquí tienes cómo funciona la normativa, qué se puede instalar y cómo tramitarlo.</p>

<h2>Suelo urbano, urbanizable y rústico: la diferencia que lo decide todo</h2>
<ul>
<li><strong>Suelo urbano:</strong> tiene calles, agua, luz y saneamiento. Se puede construir una vivienda con licencia de obra.</li>
<li><strong>Suelo urbanizable:</strong> está previsto para construir, pero hace falta desarrollarlo (urbanización) antes de edificar. A veces tarda años.</li>
<li><strong>Suelo rústico (no urbanizable):</strong> protegido para uso agrícola, forestal, ganadero o por sus valores naturales. La vivienda está, en general, prohibida; solo se admiten construcciones vinculadas a la explotación y, en algunas comunidades, viviendas ligadas a ella o en parcelas de gran tamaño.</li>
</ul>
<p>Lo primero es pedir en el ayuntamiento la <strong>cédula urbanística</strong> o consultar el catastro y el planeamiento municipal: te dirá la clasificación exacta de tu parcela y qué usos permite.</p>

<h2>Qué se puede instalar en terreno rústico</h2>
<h3>Casetas de aperos y almacenes agrícolas</h3>
<p>Es el uso más claro: una <a href="/casetas-de-aperos/">caseta de aperos</a> de madera, chapa u hormigón, vinculada a la explotación agrícola, con licencia de obra menor y respetando los límites de superficie y altura que fija cada comunidad (habitualmente entre 10 y 20 m² y 3 m de altura, sin instalaciones de vivienda).</p>
<h3>Casas móviles y tiny houses sobre ruedas</h3>
<p>Al no ser edificaciones, muchos municipios permiten su estancia temporal con una autorización o declaración responsable, siempre que conserven las ruedas, no se anclen ni se conecten de forma permanente a las redes. Vivir en ellas de forma habitual en suelo rústico está en general prohibido y puede acabar en orden de retirada y multa. Más en <a href="/moviles/">casas prefabricadas móviles</a> y <a href="/tiny-houses/">tiny houses</a>.</p>
<h3>Vivienda ligada a la explotación agraria</h3>
<p>Varias comunidades permiten una vivienda en rústico si está vinculada a una explotación agrícola o ganadera en activo y la parcela supera una superficie mínima (a menudo 1–3 hectáreas). Exige justificar la actividad y pasar por un procedimiento de autorización autonómica previo a la licencia municipal.</p>
<h3>Rehabilitación de construcciones existentes</h3>
<p>Si en la parcela hay una edificación antigua legal (una casa de labor, un pajar), su rehabilitación o sustitución suele permitirse dentro del volumen existente. En ese caso una casa prefabricada de madera o de Steel Framing es la forma más rápida de reconstruirla.</p>

<h2>Qué NO se puede hacer</h2>
<ul>
<li>Instalar una casa prefabricada fija con cimentación como vivienda en rústico común sin autorización: es una infracción urbanística, con orden de demolición y sanción, y no prescribe en suelo protegido.</li>
<li>Camuflar una vivienda como «caseta de aperos» o «almacén»: las inspecciones comprueban instalaciones y uso.</li>
<li>Conectar de forma permanente a agua y luz una casa móvil declarada como temporal.</li>
</ul>

<h2>Diferencias entre comunidades autónomas</h2>
<p>La normativa es autonómica y cambia mucho: Andalucía regula las edificaciones en suelo rústico con la LISTA (2021) y permite viviendas vinculadas a la actividad agraria en parcelas de superficie mínima; Galicia admite la rehabilitación de construcciones tradicionales y viviendas en núcleos rurales; Comunidad Valenciana, Cataluña, Castilla-La Mancha, Extremadura o Aragón fijan parcelas mínimas (de 1 a 5 hectáreas según la zona) para la vivienda unifamiliar aislada en rústico; y en Baleares o Canarias las restricciones son mayores. En todos los casos la licencia la da el ayuntamiento, pero antes hace falta un informe o autorización autonómica. Antes de comprar una parcela rústica para vivir, consulta al ayuntamiento y a un arquitecto de la zona.</p>

<h2>Cómo tramitar la licencia paso a paso</h2>
<ol>
<li><strong>Cédula urbanística</strong> en el ayuntamiento: clasificación del suelo y usos permitidos.</li>
<li><strong>Consulta previa</strong> con el técnico municipal sobre lo que quieres instalar (caseta, casa móvil temporal, vivienda vinculada).</li>
<li><strong>Proyecto</strong> redactado por arquitecto o arquitecto técnico según el caso (memoria, planos, justificación del uso).</li>
<li><strong>Autorización autonómica</strong> si se trata de vivienda en rústico (informe de la consejería competente).</li>
<li><strong>Licencia de obra</strong> municipal (menor para casetas, mayor para viviendas) y pago del ICIO.</li>
<li><strong>Licencia de primera ocupación</strong> al terminar, para poder contratar suministros y escriturar.</li>
</ol>

<h2>Y en terreno urbanizable o urbano</h2>
<p>Ahí una casa prefabricada se tramita exactamente igual que una casa de obra: proyecto visado, licencia de obra mayor, cumplimiento del Código Técnico, y al terminar, primera ocupación y escritura. Los fabricantes de <a href="/fabricantes/">casas prefabricadas</a> suelen encargarse del proyecto y de la tramitación; pregúntalo al pedir presupuesto.</p>
${CTA}
`,
  },
];

for (const p of paginas) {
  const cuerpo = p.cuerpo.trim();
  const palabras = cuerpo.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const json = {
    slug: p.slug,
    ruta: `/${p.slug}/`,
    titulo: p.titulo,
    h1: p.h1,
    tituloSeo: p.tituloSeo,
    descripcion: '',
    palabraClave: p.palabraClave,
    noindex: false,
    hero: p.hero,
    faq: [],
    cuerpo,
    palabras,
  };
  fs.writeFileSync(`src/content/pages/${p.slug}.json`, JSON.stringify(json, null, 1) + '\n');
  console.log(p.slug, palabras, 'palabras', p.tituloSeo.length, 'car. título');
}
