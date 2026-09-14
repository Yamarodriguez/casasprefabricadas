/**
 * Preguntas frecuentes por página.
 *
 * WordPress traía las mismas cuatro preguntas genéricas repetidas en
 * cientos de páginas (unas en el campo `faq`, otras sueltas dentro del
 * cuerpo), sin relación con la línea de producto ni con la localidad.
 * Aquí se generan para CADA página según lo que trata:
 *
 *   línea   madera / hormigón / steel framing / casetas / genérica
 *   tema    precios, planos, llave en mano, financiación, cabañas, casetas
 *           de obra, casas modulares... (por la ruta)
 *   lugar   la provincia o ciudad (por la palabra clave)
 *
 * Cada página recibe 6 preguntas: primero las del tema o del lugar, y se
 * completa con las de la línea. Las respuestas repiten los datos que ya
 * da el propio sitio (precios por m², plazos, licencias) para no
 * contradecirse.
 *
 * Marcadores en los textos:
 *   {N} nombre en plural    ("casas de madera")
 *   {n} nombre en singular  ("casa de madera")
 *   {L} lugar               ("Valencia")
 *   {P} frase de precio de la línea
 *   {T} plazo de la línea   ("entre 6 y 9 meses")
 */

const LINEAS = {
  generica: {
    N: 'casas prefabricadas',
    n: 'casa prefabricada',
    titulo: 'casas prefabricadas',
    P: 'Como referencia, una casa prefabricada de 100 m² cuesta entre 47.000 y 60.000 € en madera y puede llegar a los 100.000 € en hormigón, sin contar terreno, cimentación ni licencias.',
    T: 'entre 6 y 9 meses',
  },
  madera: {
    N: 'casas de madera',
    n: 'casa de madera',
    titulo: 'casas prefabricadas de madera',
    P: 'Como referencia, una casa de madera ronda los 600–900 €/m²: unos 34.000–38.000 € para 68 m² con dos dormitorios, sin contar terreno, cimentación ni licencias.',
    T: 'entre 3 y 6 meses',
  },
  hormigon: {
    N: 'casas prefabricadas de hormigón',
    n: 'casa prefabricada de hormigón',
    titulo: 'casas prefabricadas de hormigón',
    P: 'Como referencia, una casa prefabricada de hormigón cuesta entre 900 y 1.500 €/m² terminada: unos 90.000–100.000 € para 100 m² llave en mano, sin contar terreno, cimentación ni licencias.',
    T: 'entre 4 y 9 meses',
  },
  steel: {
    N: 'casas de Steel Framing',
    n: 'casa de Steel Framing',
    titulo: 'casas prefabricadas Steel Framing',
    P: 'Como referencia, el Steel Framing cuesta desde 360 €/m² en obra gris y desde 450 €/m² terminado: unos 45.000–70.000 € para una casa de 100 m², sin contar terreno, cimentación ni licencias.',
    T: 'entre 3 y 5 meses',
  },
  casetas: {
    N: 'casetas prefabricadas',
    n: 'caseta prefabricada',
    titulo: 'casetas prefabricadas',
    P: 'Como referencia, una caseta cuesta desde 600 € en modelos pequeños de jardín hasta 7.000 € en casetas grandes de madera aisladas, montaje aparte.',
    T: 'entre una y cuatro semanas',
  },
};

/* ------------------------------------------------------------ por línea */
/* Cada pregunta lleva una clave para que un tema pueda quitarla cuando ya
   la responde con más detalle (evita repetir "¿cuánto cuesta?" en la
   página de precios). */
const BASE = {
  generica: [
    {
      clave: 'precio',
      p: '¿Cuánto cuesta una casa prefabricada en España?',
      r: 'El precio de una casa prefabricada depende sobre todo del sistema constructivo y de los acabados. Como referencia, una casa de madera ronda los 600–900 €/m², una de Steel Framing parte de unos 450 €/m² terminada y una de hormigón se mueve entre 900 y 1.500 €/m². Así, una casa prefabricada de 100 m² cuesta entre 47.000 y 60.000 € en madera y puede llegar a los 100.000 € en hormigón. A eso hay que sumar el terreno, la cimentación, las acometidas y las licencias.',
    },
    {
      clave: 'plazo',
      p: '¿Cuánto tarda en construirse una casa prefabricada?',
      r: 'Entre 6 y 9 meses llave en mano, frente a los 12–18 meses de una vivienda tradicional. La clave es que la casa se fabrica en taller mientras se prepara la cimentación en el terreno, y el montaje en la parcela se resuelve en pocos días o semanas. El plazo real depende del modelo, de los acabados y, sobre todo, de lo que tarde el ayuntamiento en conceder la licencia.',
    },
    {
      clave: 'licencia',
      p: '¿Necesito licencia de obra para instalar una casa prefabricada?',
      r: 'Sí. Una casa prefabricada fija, anclada al terreno con cimentación, es una vivienda a todos los efectos: necesita proyecto visado por un arquitecto, licencia de obra del ayuntamiento y cumplir el Código Técnico de la Edificación. El terreno debe ser urbanizable; en suelo rústico hay que consultar la normativa de cada comunidad autónoma. Solo las casas móviles con ruedas tienen un régimen distinto.',
    },
    {
      clave: 'hipoteca',
      p: '¿Se puede financiar una casa prefabricada con una hipoteca?',
      r: 'Sí, siempre que sea una casa fija con proyecto, licencia y escritura. Los bancos la tratan como cualquier vivienda y financian normalmente hasta el 80 % del valor de tasación del terreno más la casa. Si es una casa móvil o no va anclada, no se puede hipotecar, pero sí financiar con un préstamo personal o con la financiación que ofrecen muchos fabricantes.',
    },
    {
      clave: 'calidad',
      p: '¿Las casas prefabricadas son de calidad y duran tanto como una casa tradicional?',
      r: 'Sí. Se fabrican en taller con control de calidad en cada fase, con los mismos materiales que una obra convencional y cumpliendo el CTE. Su vida útil supera los 50 años, igual que una casa de ladrillo, y suelen aislar mejor porque los cerramientos vienen diseñados como un sistema completo. La diferencia está en el proceso, no en el resultado.',
    },
    {
      clave: 'material',
      p: '¿Casa prefabricada de madera, de hormigón o de Steel Framing: cuál elegir?',
      r: 'Depende del presupuesto, del clima y del estilo que busques. La madera es la más económica, cálida y rápida, ideal para climas fríos y parcelas con encanto. El hormigón es la más robusta y la que menos mantenimiento pide, perfecta si quieres una casa moderna y para toda la vida. El Steel Framing está a medio camino: estructura de acero ligera, muy rápida de montar y con excelente aislamiento. En nuestro catálogo puedes comparar modelos de los tres sistemas.',
    },
  ],
  madera: [
    {
      clave: 'precio',
      p: '¿Cuánto cuesta una casa de madera prefabricada?',
      r: 'Según la Asociación Española de Casas de Madera (AECA), el precio medio está entre 600 y 900 €/m². Una casa de madera de 68 m² con dos dormitorios ronda los 34.000–38.000 €, una de 50 m² con un dormitorio unos 21.000 €, y una mini casa de 36 m² puede salir desde 8.000 €. Los modelos de gama alta, con maderas nobles y grandes ventanales, llegan a 1.200–1.500 €/m². Todo ello sin contar terreno, cimentación ni licencias.',
    },
    {
      clave: 'calidad',
      p: '¿Cuánto dura una casa de madera?',
      r: 'Una casa de madera bien construida dura entre 50 y 100 años. La madera estructural va tratada en autoclave contra hongos e insectos, y los diseños actuales protegen los puntos críticos: aleros amplios, zócalo elevado y cámara ventilada en la fachada. En los países nórdicos y en Canadá hay casas de madera centenarias en perfecto estado.',
    },
    {
      clave: 'aislamiento',
      p: '¿Una casa de madera aísla bien del frío y del calor?',
      r: 'Muy bien: la madera es un aislante natural, hasta 15 veces mejor que el hormigón. Los muros de entramado ligero o de paneles SIP llevan además lana de roca o fibra de madera, con lo que una casa de madera consume entre un 30 % y un 50 % menos en calefacción que una convencional. En verano el efecto es el mismo: la casa se mantiene fresca.',
    },
    {
      clave: 'mantenimiento',
      p: '¿Qué mantenimiento necesita una casa de madera?',
      r: 'Menos del que se cree. Por fuera conviene revisar el lasur o barniz cada 3–5 años (según la orientación y la lluvia) y mantener limpios canalones y bajantes. Por dentro no requiere nada especial. Si eliges fachada de madera termotratada o revestimiento mixto (madera y fibrocemento), el mantenimiento se reduce todavía más.',
    },
    {
      clave: 'licencia',
      p: '¿Necesito licencia para instalar una casa de madera?',
      r: 'Sí: una casa de madera habitable es una vivienda y necesita proyecto visado, licencia de obra y cumplir el CTE, igual que cualquier construcción. El terreno debe ser urbanizable; en suelo rústico depende de la comunidad autónoma. Las casetas y casas de madera pequeñas sin cimentación pueden tramitarse como obra menor o declaración responsable según el ayuntamiento.',
    },
    {
      clave: 'plazo',
      p: '¿Cuánto tarda en construirse una casa de madera?',
      r: 'Es uno de los sistemas más rápidos: la fabricación en taller lleva de 6 a 10 semanas y el montaje en la parcela, de una a tres semanas. Contando cimentación, instalaciones y acabados, una casa de madera prefabricada está lista para entrar a vivir en 3–6 meses desde que se obtiene la licencia.',
    },
  ],
  hormigon: [
    {
      clave: 'precio',
      p: '¿Cuánto cuesta una casa prefabricada de hormigón?',
      r: 'Entre 900 y 1.500 €/m² terminada, según acabados y nivel de equipamiento. Una casa prefabricada de hormigón de 100 m² se mueve así entre 90.000 y 100.000 € llave en mano, sin contar terreno, cimentación ni licencias. Es más cara que la madera, pero a cambio no necesita prácticamente mantenimiento y su valor de reventa es el de una vivienda de obra.',
    },
    {
      clave: 'plazo',
      p: '¿Cuánto tarda en construirse una casa prefabricada de hormigón?',
      r: 'Entre 4 y 9 meses llave en mano. Los paneles y módulos de hormigón se fabrican en planta en 6–8 semanas mientras se ejecuta la cimentación, y el montaje en la parcela se completa en pocos días con grúa. Después quedan instalaciones y acabados. Frente a los 12–18 meses de una obra tradicional, el ahorro de tiempo es enorme.',
    },
    {
      clave: 'calidad',
      p: '¿Qué ventajas tiene una casa de hormigón prefabricada frente a una de obra tradicional?',
      r: 'El mismo material, pero fabricado en condiciones controladas: sin desviaciones de presupuesto, con plazo cerrado por contrato y con una calidad de acabado imposible de conseguir a pie de obra. Además genera menos residuos, permite integrar el aislamiento en el propio panel y el resultado es una casa moderna, robusta y con muy poco mantenimiento.',
    },
    {
      clave: 'resistencia',
      p: '¿Las casas prefabricadas de hormigón resisten bien el clima?',
      r: 'Sí. El hormigón armado es el material más resistente a la humedad, al viento, al fuego y a los movimientos sísmicos, y no se pudre ni lo atacan los insectos. Con el aislamiento integrado en los paneles, la casa mantiene una temperatura estable tanto en zonas de costa como en climas continentales con mucho frío.',
    },
    {
      clave: 'hipoteca',
      p: '¿Se puede hipotecar una casa prefabricada de hormigón?',
      r: 'Sí. Al ir anclada al terreno con cimentación y contar con proyecto y licencia, es un bien inmueble como cualquier vivienda: se escritura, se inscribe en el Registro y los bancos la financian con hipoteca hasta el 80 % del valor de tasación. Muchos fabricantes ofrecen además financiación propia para el resto.',
    },
    {
      clave: 'mantenimiento',
      p: '¿Qué mantenimiento necesita una casa de hormigón?',
      r: 'Prácticamente ninguno. Basta con repintar o revisar el revestimiento exterior cada 8–10 años y mantener limpias las juntas y los canalones. No hay madera exterior que tratar ni estructura que revisar, lo que la convierte en la opción más cómoda a largo plazo.',
    },
  ],
  steel: [
    {
      clave: 'que',
      p: '¿Qué es el Steel Framing?',
      r: 'Es un sistema constructivo en seco basado en una estructura de perfiles de acero galvanizado ligero, ensamblados en paneles que forman muros, forjados y cubierta. Sobre esa estructura van el aislamiento, las placas y los revestimientos. Se usa desde hace décadas en Estados Unidos, Australia y el norte de Europa, y en España está homologado bajo el Código Técnico de la Edificación.',
    },
    {
      clave: 'precio',
      p: '¿Cuánto cuesta una casa de Steel Framing por metro cuadrado?',
      r: 'Los precios del Steel Framing rondan desde 360 €/m² en obra gris (estructura y cerramientos) y desde 450 €/m² con terminaciones. Una casa de Steel Framing de 100 m² completa se mueve así entre 45.000 y 70.000 € según acabados, sin contar terreno, cimentación ni licencias. Es algo más cara que la madera y bastante más económica que el hormigón.',
    },
    {
      clave: 'plazo',
      p: '¿Cuánto tarda en construirse una casa de Steel Framing?',
      r: 'Entre 3 y 5 meses. La estructura de acero se fabrica en taller a partir de los planos y se levanta en la parcela en una o dos semanas; como es una obra en seco no hay tiempos de fraguado ni de secado. El resto del plazo son instalaciones y acabados, además del tiempo que tarde la licencia municipal.',
    },
    {
      clave: 'calidad',
      p: '¿Es resistente y seguro el Steel Framing?',
      r: 'Sí. El acero galvanizado no se pudre, no lo atacan las termitas ni el fuego y aguanta terremotos y vientos fuertes mejor que el ladrillo gracias a su ligereza y flexibilidad. Su vida útil supera los 100 años y toda la estructura se calcula y certifica según el CTE.',
    },
    {
      clave: 'aislamiento',
      p: '¿Aísla bien una casa de Steel Framing?',
      r: 'Muy bien. Entre los perfiles queda una cámara que se rellena con lana mineral, y por fuera se añade un aislamiento continuo que corta los puentes térmicos del acero. El resultado es una casa con calificación energética A o B, silenciosa y con facturas de climatización muy por debajo de una vivienda tradicional.',
    },
    {
      clave: 'licencia',
      p: '¿Necesito licencia y puedo hipotecar una casa de Steel Framing?',
      r: 'Sí a las dos cosas. Es una vivienda fija con cimentación, así que necesita proyecto visado y licencia de obra, y una vez escriturada se financia con hipoteca como cualquier casa. El terreno debe ser urbanizable; en suelo rústico depende de la normativa de la comunidad autónoma.',
    },
  ],
  casetas: [
    {
      clave: 'precio',
      p: '¿Cuánto cuesta una caseta prefabricada?',
      r: 'Los precios de las casetas van desde unos 600 € en modelos de jardín pequeños (2,5 × 2 m, de resina o madera fina) hasta 7.000 € o más en casetas grandes de madera maciza, aisladas y con ventanas. El precio depende del material, del grosor de las paredes, del suelo y de si va montada o en kit.',
    },
    {
      clave: 'licencia',
      p: '¿Necesito licencia para poner una caseta en mi jardín o parcela?',
      r: 'Depende del ayuntamiento y del tamaño. Las casetas pequeñas, desmontables y sin cimentación suelen tramitarse con una simple declaración responsable o como obra menor; si lleva solera de hormigón, supera cierta superficie o se va a usar como vivienda, se necesita licencia de obra. Conviene consultarlo siempre en el ayuntamiento antes de comprar.',
    },
    {
      clave: 'material',
      p: '¿Qué material es mejor para una caseta: madera, resina, metal u hormigón?',
      r: 'La madera es la más bonita y la que mejor aísla, pero pide un tratamiento cada uno o dos años. La resina o el plástico no necesitan mantenimiento y resisten la lluvia, aunque aíslan poco. El metal es económico y muy resistente, ideal para almacenaje. El hormigón prefabricado es la opción definitiva para casetas de aperos, de obra o de vigilancia que deban durar décadas.',
    },
    {
      clave: 'plazo',
      p: '¿Cuánto se tarda en montar una caseta prefabricada?',
      r: 'Las casetas en kit se montan entre un día y una semana según el tamaño, con herramientas básicas y dos personas. Lo importante es preparar antes una base nivelada: una solera de hormigón, losas o rastreles sobre grava. Las casetas de hormigón o las grandes de madera se sirven montadas o las instala el fabricante en un día.',
    },
    {
      clave: 'usos',
      p: '¿Se puede usar una caseta prefabricada como oficina, negocio o vivienda?',
      r: 'Sí, siempre que esté preparada para ello: aislamiento en paredes y techo, instalación eléctrica, ventanas con doble acristalamiento y, si es vivienda, cumplir la normativa de habitabilidad y contar con licencia. Las casetas de obra, de vigilancia y para negocio (quioscos, taquillas, puestos) son módulos ya equipados que solo hay que conectar.',
    },
    {
      clave: 'mantenimiento',
      p: '¿Qué mantenimiento necesita una caseta?',
      r: 'Las de madera: aplicar lasur o aceite protector cada 1–2 años y revisar la cubierta. Las de resina o plástico: nada más que limpiarlas. Las de metal: vigilar la aparición de óxido en tornillos y esquinas. En todos los casos conviene que la caseta no quede en contacto directo con el suelo húmedo.',
    },
  ],
};

/* ------------------------------------------------------------ por lugar */
const LUGAR = [
  {
    p: '¿Se pueden instalar {N} en {L}?',
    r: 'Sí. Trabajamos con empresas y fabricantes de {N} que sirven en {L} y en toda su zona de influencia. El fabricante se encarga del transporte, del montaje en tu parcela y de la puesta en marcha de las instalaciones; tú solo tienes que aportar un terreno urbanizable y la licencia del ayuntamiento, con la que te ayudamos desde el primer día.',
  },
  {
    p: '¿Cuánto cuesta una {n} en {L}?',
    r: '{P} El precio final en {L} varía con la distancia desde la fábrica, el tipo de cimentación que pida tu terreno y las tasas municipales, así que lo mejor es pedir presupuesto sin compromiso indicando dónde está la parcela.',
  },
  {
    p: '¿Cuánto tarda la entrega de una {n} en {L}?',
    r: '{T} desde que se concede la licencia, según el modelo y los acabados. Al fabricarse en taller mientras se prepara el terreno en {L}, el montaje en la parcela se resuelve en pocos días. El plazo que más varía es el de la licencia municipal, por eso conviene iniciar los trámites cuanto antes.',
  },
  {
    p: '¿Qué fabricantes de {N} hay en {L}?',
    r: 'En esta página encontrarás los modelos y las empresas de {N} que trabajan en {L}, con precios orientativos y fotos. Te recomendamos comparar al menos dos o tres presupuestos y visitar una casa ya montada antes de decidir. Si lo prefieres, cuéntanos qué buscas y te ponemos en contacto con el fabricante más adecuado para tu zona.',
  },
];
/* estas ya las responde el bloque de lugar con más detalle */
const LUGAR_EVITA = ['precio', 'plazo'];

/* ------------------------------------------------------------- por tema */
/* `ancla` se prueba contra la ruta. Una entrada `casetas:x` tiene
   prioridad sobre `x` cuando la línea es casetas (las respuestas sobre
   proyectos y cimentaciones no encajan en una caseta de jardín). */
const TEMAS = {
  precios: {
    ancla: /\bprecios\b/,
    evita: ['precio'],
    lista: [
      {
        p: '¿Cuánto cuesta una {n} llave en mano?',
        r: '{P} Llave en mano significa que el precio incluye estructura, cerramientos, cubierta, carpinterías, instalaciones y acabados interiores: solo entras con los muebles. Lo que no suele incluir es el terreno, la cimentación, las acometidas de agua y luz y las licencias, que se presupuestan aparte.',
      },
      {
        p: '¿Qué incluye el precio de una {n} y qué hay que sumar aparte?',
        r: 'Los precios de {N} que verás publicados se refieren normalmente a la casa terminada sobre cimentación. Hay que añadir el terreno, el estudio geotécnico, la cimentación (un 5–10 % del precio), las acometidas, el proyecto de arquitecto (4–8 %), la licencia de obra y los impuestos (ICIO e IVA al 10 % en vivienda nueva). Un cálculo prudente es sumar un 20–30 % al precio de la casa.',
      },
      {
        p: '¿Cómo conseguir el mejor precio en una {n}?',
        r: 'Compara varios fabricantes con el mismo programa de necesidades, elige un modelo de catálogo en lugar de un diseño a medida, mantén una planta compacta y sencilla, y decide los acabados antes de firmar. Pedir presupuesto con la parcela ya localizada evita sorpresas con la cimentación y el transporte.',
      },
    ],
  },
  'casetas:precios': {
    ancla: /\bprecios\b/,
    evita: ['precio'],
    lista: [
      {
        p: '¿De qué depende el precio de una caseta?',
        r: '{P} Lo que más pesa es el material (resina, chapa, madera u hormigón), el grosor de las paredes (de 16 a 70 mm en madera), la superficie, si lleva suelo, ventanas y aislamiento, y si se entrega en kit o montada. El transporte y la base también se presupuestan aparte.',
      },
      {
        p: '¿Qué hay que sumar al precio de una caseta prefabricada?',
        r: 'La base (losas, rastreles o una solera de hormigón, entre 100 y 600 € según el tamaño), el transporte, el montaje si no lo haces tú (un 10–15 % del precio) y el tratamiento protector en las de madera. Si va a tener luz, la instalación eléctrica certificada.',
      },
      {
        p: '¿Cómo conseguir una caseta al mejor precio?',
        r: 'Elige el tamaño justo para lo que vas a guardar, compara varios fabricantes con el mismo grosor de pared, aprovecha las ofertas de fin de temporada (otoño e invierno) y móntala tú mismo si el modelo lo permite. No ahorres en la base ni en la cubierta: son lo que hace que la caseta dure.',
      },
    ],
  },
  planos: {
    ancla: /\bplanos\b/,
    evita: ['material'],
    lista: [
      {
        p: '¿Puedo descargar planos de {N} gratis?',
        r: 'Sí. En esta página encontrarás planos de {N} con distribución, superficies y medidas para que te hagas una idea real de cada modelo. Son planos orientativos: el proyecto de ejecución que exige el ayuntamiento lo redacta un arquitecto adaptando el modelo a tu parcela y a la normativa local.',
      },
      {
        p: '¿Se pueden modificar los planos de una {n}?',
        r: 'Sí. Los fabricantes trabajan con modelos de catálogo que se adaptan: cambiar una distribución, añadir un dormitorio, ampliar el porche o girar la casa para orientarla al sur. Las modificaciones sobre un modelo existente son mucho más económicas que un diseño desde cero.',
      },
      {
        p: '¿Qué distribución es más habitual en los planos de {N}?',
        r: 'Las más demandadas son casas de una planta de 80 a 120 m² con dos o tres dormitorios, salón-cocina abierto y porche; y casas de dos plantas de 120 a 180 m² con la zona de día abajo y los dormitorios arriba. Los planos de {N} pequeñas, de 40 a 60 m², son la opción para segunda residencia o parcelas reducidas.',
      },
    ],
  },
  'casetas:planos': {
    ancla: /\bplanos\b/,
    evita: ['material'],
    lista: [
      {
        p: '¿Puedo descargar planos de casetas gratis?',
        r: 'Sí. En esta página tienes planos de casetas de jardín, de aperos, de obra y de madera con medidas, alzados y distribución, para que calcules el espacio que necesitas y prepares la base. Si vas a pedir licencia, el ayuntamiento suele aceptar los planos del fabricante para una caseta desmontable.',
      },
      {
        p: '¿Qué medidas de caseta son las más habituales?',
        r: 'De 2 × 2 m a 3 × 3 m para herramientas y bicicletas; de 3 × 4 m a 4 × 5 m para taller o despacho; y a partir de 5 × 5 m para casetas habitables o de almacén agrícola. La altura interior útil suele estar entre 2 y 2,5 m. Antes de elegir, comprueba los retranqueos y la superficie máxima que permite tu municipio.',
      },
      {
        p: '¿Se puede hacer una caseta a medida a partir de un plano?',
        r: 'Sí. La mayoría de fabricantes adaptan sus modelos (medidas, posición de puertas y ventanas, tipo de cubierta) o construyen casetas a medida partiendo de tu croquis. Es la solución cuando la caseta debe encajar en un hueco concreto o adosarse a un muro.',
      },
    ],
  },
  baratas: {
    ancla: /\bbarat|\bofertas\b/,
    evita: ['precio'],
    lista: [
      {
        p: '¿Cuánto cuesta una {n} barata?',
        r: '{P} Las opciones más económicas son los modelos de catálogo de planta compacta, con acabados estándar y entregados en obra gris o en kit para terminar por tu cuenta. Con un presupuesto ajustado, la madera y el Steel Framing suelen ser los sistemas más baratos por metro cuadrado.',
      },
      {
        p: '¿Es posible una {n} barata sin perder calidad?',
        r: 'Sí. La fabricación industrializada reduce costes por sí sola: menos mano de obra en obra, menos residuos y sin imprevistos. Una {n} barata de un fabricante serio cumple el CTE igual que una cara; lo que cambia son el tamaño, los acabados y los extras. Otra vía son las casas prefabricadas de segunda mano o de exposición.',
      },
      {
        p: '¿Dónde se puede ahorrar y dónde no en una {n} económica?',
        r: 'Ahorra eligiendo un modelo de catálogo, una planta cuadrada o rectangular, cubierta sencilla y acabados de serie. No ahorres en aislamiento, carpinterías ni en la cimentación: son lo que determina el confort y las facturas durante décadas, y cambiarlos después cuesta mucho más.',
      },
    ],
  },
  'casetas:baratas': {
    ancla: /\bbarat|\bofertas\b/,
    evita: ['precio'],
    lista: [
      {
        p: '¿Cuánto cuesta una caseta barata?',
        r: 'Las casetas más económicas parten de 200–400 € en armarios de resina y de 500–800 € en casetas de madera de 19 mm o de chapa galvanizada de 4–6 m². Con 1.000–1.500 € ya tienes una caseta de madera de 28 mm con ventana y suelo, suficiente para herramientas, bicicletas o un pequeño taller.',
      },
      {
        p: '¿Merece la pena una caseta barata?',
        r: 'Para guardar cosas al resguardo de la lluvia, sí. Ten en cuenta que las paredes finas (16–19 mm) aíslan poco y se mueven con la humedad, así que no sirven para uso habitable. Si el uso va a ser diario, subir a 28 mm cuesta poco más y la caseta dura el doble.',
      },
      {
        p: '¿Cómo encontrar casetas baratas de calidad?',
        r: 'Compara el grosor de pared y el tipo de cubierta, no solo el precio; busca madera tratada en autoclave o resina con protección UV; aprovecha ofertas de fin de temporada y modelos de exposición; y monta la caseta tú mismo. Un buen fabricante barato da garantía de al menos dos años.',
      },
    ],
  },
  llave: {
    ancla: /llave-en-mano/,
    evita: ['plazo'],
    lista: [
      {
        p: '¿Qué significa {n} llave en mano?',
        r: 'Que el fabricante se ocupa de todo: proyecto, fabricación, transporte, montaje, instalaciones, acabados interiores y limpieza final, y te entrega la casa lista para entrar a vivir a un precio y un plazo cerrados por contrato. Tú solo aportas el terreno. Es la fórmula más cómoda y la que evita sustos de presupuesto.',
      },
      {
        p: '¿Qué incluye y qué no incluye una {n} llave en mano?',
        r: 'Incluye estructura, cubierta, ventanas y puertas, fontanería, electricidad, calefacción o aire, baños y cocina montados, suelos y pintura. Habitualmente quedan fuera el terreno, la cimentación (que depende de cada parcela), las acometidas hasta la red, la licencia y los impuestos, y el mobiliario. Pide siempre el desglose por escrito.',
      },
      {
        p: '¿Cuánto tarda una {n} llave en mano?',
        r: '{T} desde que se concede la licencia, según el modelo y los acabados. La casa se fabrica en taller mientras se prepara la cimentación, y el plazo queda fijado en el contrato con penalizaciones por retraso: esa es una de las grandes ventajas frente a una obra tradicional.',
      },
    ],
  },
  'casetas:llave': {
    ancla: /llave-en-mano/,
    evita: ['plazo'],
    lista: [
      {
        p: '¿Qué significa caseta llave en mano?',
        r: 'Que el fabricante la entrega montada e instalada en tu parcela, con suelo, cubierta, ventanas, tratamiento protector y, si lo pides, instalación eléctrica, lista para usar el mismo día. Tú solo preparas la base o la incluyes en el encargo. Es la opción más cómoda para casetas grandes, de hormigón o de uso profesional.',
      },
      {
        p: '¿Qué incluye una caseta llave en mano?',
        r: 'Transporte, montaje por el equipo del fabricante, anclaje a la base, cubierta impermeabilizada, carpinterías con cristal y cerradura, y el tratamiento de la madera. Como extras se suelen añadir solera de hormigón, aislamiento, electricidad, canalones y suelo interior.',
      },
      {
        p: '¿Cuánto tarda una caseta llave en mano?',
        r: 'Entre una y cuatro semanas desde el pedido, según el modelo y la distancia. La instalación en sí se completa en un día para casetas de madera de hasta 20 m² y en una mañana para las de hormigón, siempre que la base esté preparada y el camión pueda acceder.',
      },
    ],
  },
  venta: {
    ancla: /\bventa\b/,
    evita: [],
    lista: [
      {
        p: '¿Dónde comprar {N} en España?',
        r: 'En esta página reunimos {N} en venta de fabricantes y empresas de toda España, con modelos, precios orientativos y fotos. Puedes comparar por sistema constructivo, tamaño y presupuesto, y pedir presupuesto directamente. Te recomendamos contrastar dos o tres ofertas y visitar un modelo montado antes de decidir.',
      },
      {
        p: '¿Es mejor comprar una {n} nueva o de segunda mano?',
        r: 'Una {n} nueva te permite elegir distribución y acabados y llega con garantía. Las de segunda mano o de exposición son más baratas, pero conviene revisar su estado, si es desmontable y si su traslado y nueva instalación son viables. En cualquier caso, exige documentación técnica y certificado de conformidad.',
      },
      {
        p: '¿Qué garantía tiene la compra de una {n}?',
        r: 'La misma que cualquier vivienda nueva en España: 10 años para daños estructurales, 3 años para habitabilidad (aislamiento, humedades, instalaciones) y 1 año para acabados, según la Ley de Ordenación de la Edificación. Además, el fabricante suele ofrecer garantía propia sobre ventanas, cubierta y equipos.',
      },
    ],
  },
  'casetas:venta': {
    ancla: /\bventa\b/,
    evita: [],
    lista: [
      {
        p: '¿Dónde comprar casetas prefabricadas en España?',
        r: 'En esta página encontrarás casetas en venta de fabricantes de toda España: de jardín, de aperos, de obra, de madera, de resina y de hormigón, con medidas, fotos y precios orientativos. Compara el grosor de pared, la cubierta y lo que incluye cada oferta, y pide presupuesto con el transporte a tu localidad.',
      },
      {
        p: '¿Es mejor comprar una caseta nueva o de segunda mano?',
        r: 'Las casetas de obra y los módulos prefabricados de segunda mano son una buena compra si la estructura está sana: se ahorra hasta un 60 %. En casetas de madera usadas conviene revisar pudrición en la base y el estado de la cubierta. Las de resina pierden poco valor y se encuentran fácilmente de ocasión.',
      },
      {
        p: '¿Qué garantía tiene una caseta prefabricada?',
        r: 'La garantía legal de dos años para cualquier producto nuevo, y la del fabricante, que en madera tratada y resina suele ser de 5 a 10 años frente a pudrición o decoloración. Guarda la factura y sigue las instrucciones de montaje y tratamiento: son la condición de la garantía.',
      },
    ],
  },
  fabricantes: {
    ancla: /\bfabricantes\b/,
    evita: ['material'],
    lista: [
      {
        p: '¿Cómo elegir un buen fabricante de {N}?',
        r: 'Fíjate en los años de experiencia, en que fabrique en planta propia, en que ofrezca casas ya construidas para visitar y en que entregue un contrato con precio y plazo cerrados. Pide referencias de clientes en tu zona y comprueba que trabaja con proyecto visado y certificados de materiales. Desconfía de precios muy por debajo del mercado.',
      },
      {
        p: '¿Los fabricantes de {N} se encargan de la licencia y el proyecto?',
        r: 'La mayoría sí: cuentan con arquitectos que adaptan el modelo a tu parcela, redactan el proyecto de ejecución y lo presentan en el ayuntamiento. Es una parte del servicio que conviene preguntar al pedir presupuesto, porque ahorra meses de gestiones y evita errores con la normativa local.',
      },
      {
        p: '¿Cuántos presupuestos de fabricantes conviene pedir?',
        r: 'Al menos tres, con el mismo programa de necesidades (metros, dormitorios, acabados) para que sean comparables. Compara qué incluye cada uno, el plazo de entrega, las garantías y la forma de pago; el más barato no siempre es el más completo.',
      },
    ],
  },
  financiacion: {
    ancla: /\bfinanciacion\b/,
    evita: ['hipoteca'],
    lista: [
      {
        p: '¿Cómo se financia una {n}?',
        r: 'Hay tres vías: hipoteca bancaria (para casas fijas, con proyecto y licencia, hasta el 80 % del valor de tasación de terreno y casa), préstamo personal (para importes menores o casas móviles) y financiación del propio fabricante, que muchos ofrecen a través de entidades colaboradoras. Se pueden combinar: por ejemplo, préstamo para la entrada y hipoteca para el resto.',
      },
      {
        p: '¿Los bancos dan hipoteca para {N}?',
        r: 'Sí, siempre que la casa vaya anclada al terreno con cimentación, tenga proyecto visado, licencia y se inscriba en el Registro de la Propiedad. El banco tasa terreno y vivienda y suele financiar hasta el 80 %. Durante la construcción se libera el dinero por fases (hipoteca autopromotor), lo que encaja con los pagos escalonados del fabricante.',
      },
      {
        p: '¿Qué entrada necesito para financiar una {n}?',
        r: 'Como en cualquier vivienda, conviene tener ahorrado en torno al 20 % del precio más un 10–12 % para gastos (proyecto, licencia, notaría, impuestos). Si ya tienes el terreno en propiedad, cuenta como aportación y reduce la entrada necesaria; muchos compradores de {N} financian así el 100 % de la construcción.',
      },
    ],
  },
  catalogo: {
    ancla: /\bcatalogo\b/,
    evita: [],
    lista: [
      {
        p: '¿Qué encontraré en el catálogo de {N}?',
        r: 'Modelos ordenados por tamaño y precio, con fotos, planos de distribución y superficies. Cada ficha indica los metros, el número de estancias y el precio orientativo, para que puedas comparar y elegir el punto de partida de tu proyecto. Puedes descargarlo gratis en PDF desde esta página.',
      },
      {
        p: '¿Los modelos del catálogo se pueden personalizar?',
        r: 'Sí. El catálogo es una base: cualquier modelo admite cambios de distribución, de acabados, de orientación o de tamaño. Partir de un modelo de catálogo es más rápido y económico que un diseño desde cero, porque el fabricante ya tiene resuelta la estructura y las instalaciones.',
      },
      {
        p: '¿Los precios del catálogo de {N} son definitivos?',
        r: 'Son orientativos: el precio final depende de los acabados elegidos, de la distancia a la fábrica y de la base o cimentación que exija tu terreno. Con el modelo elegido y la parcela localizada, el fabricante te dará un presupuesto cerrado en pocos días.',
      },
    ],
  },
  imagenes: {
    ancla: /\b(imagenes|fotos)\b/,
    evita: [],
    lista: [
      {
        p: '¿Las imágenes de {N} corresponden a casas reales?',
        r: 'Sí. Las fotos que verás son de {N} construidas y entregadas, además de renders de modelos nuevos que aún no se han montado. Sirven para ver acabados, fachadas, porches e interiores reales, y para inspirarte antes de elegir modelo. Si te gusta una, pídenos sus planos y precio.',
      },
      {
        p: '¿Puedo pedir una casa igual a la de una imagen?',
        r: 'Sí: cada imagen corresponde a un modelo con sus planos y superficies. Puedes reproducirlo tal cual o adaptarlo (cambiar el revestimiento, el tamaño del porche, la orientación de las ventanas). Indícanos qué foto te interesa y te enviamos la ficha del modelo con precio orientativo.',
      },
      {
        p: '¿Cómo se ve una {n} por dentro?',
        r: 'Igual que una casa convencional: paredes lisas pintadas o revestidas, suelos de tarima o porcelánico, cocinas y baños de serie o a medida. En las {N} los interiores suelen ganar en amplitud, luz y techos altos, porque la estructura permite grandes ventanales y espacios abiertos sin pilares intermedios.',
      },
    ],
  },
  'casetas:imagenes': {
    ancla: /\b(imagenes|fotos)\b/,
    evita: [],
    lista: [
      {
        p: '¿Las imágenes de casetas son de modelos reales?',
        r: 'Sí. Son fotos de casetas de jardín, de aperos, de obra, de madera, de resina y de hormigón ya instaladas, junto con algunas vistas 3D de modelos nuevos. Sirven para comparar acabados, tipos de cubierta y tamaños reales, y para elegir la que mejor encaja en tu parcela.',
      },
      {
        p: '¿Puedo pedir una caseta igual a la de una foto?',
        r: 'Sí: cada imagen corresponde a un modelo con sus medidas y su precio orientativo. Indícanos la foto que te interesa y te enviamos la ficha completa. Casi todos los modelos admiten cambios de medida, posición de puertas y ventanas y color del tratamiento.',
      },
      {
        p: '¿Cómo queda una caseta por dentro?',
        r: 'Depende del uso: como almacén, con la madera vista y estanterías; como despacho o taller, con aislamiento, panelado interior, suelo de tarima e instalación eléctrica. Las fotos de interiores te ayudan a ver cuánto espacio útil ofrece cada medida.',
      },
    ],
  },
  construccion: {
    ancla: /\bconstruccion(es)?\b/,
    evita: ['plazo'],
    lista: [
      {
        p: '¿Cómo es el proceso de construcción de una {n}?',
        r: 'Cinco fases: proyecto y licencia (2–4 meses según el ayuntamiento), cimentación y acometidas en la parcela (2–4 semanas), fabricación de módulos o paneles en taller (en paralelo, 6–10 semanas), transporte y montaje (de dos días a tres semanas) e instalaciones y acabados finales (4–8 semanas). Todo bajo un contrato con precio y plazo cerrados.',
      },
      {
        p: '¿Cuánto tarda la construcción de una {n}?',
        r: '{T} desde la licencia. La gran diferencia con una obra tradicional (12–18 meses) es que la casa se fabrica mientras se prepara el terreno, sin esperas por lluvia ni tiempos de secado. El plazo real depende del modelo, de los acabados y del ayuntamiento.',
      },
      {
        p: '¿Qué cimentación necesita una {n}?',
        r: 'Normalmente una losa de hormigón armado o zapatas corridas, definidas por el arquitecto tras el estudio geotécnico. Las {N} son más ligeras que una casa de ladrillo, así que la cimentación es menos profunda y más económica. En terrenos con pendiente se recurre a pilotes o a una plataforma elevada.',
      },
    ],
  },
  'casetas:construccion': {
    ancla: /\bconstruccion(es)?\b/,
    evita: ['plazo'],
    lista: [
      {
        p: '¿Cómo se construye una caseta prefabricada?',
        r: 'Las de madera se fabrican en taller con paredes de tablas machihembradas o paneles, se envían en kit numerado y se montan sobre una base nivelada en un día. Las de hormigón se moldean en planta como una pieza o varios paneles y se colocan con grúa. Las de obra y vigilancia son estructura metálica con panel sándwich, entregadas montadas.',
      },
      {
        p: '¿Qué base necesita una caseta?',
        r: 'Una superficie plana, nivelada y algo mayor que la caseta: losas de hormigón o rastreles sobre grava para casetas pequeñas de madera o resina; una solera de hormigón armado de 10–15 cm para casetas grandes, de hormigón o de uso profesional. Elevar la caseta unos centímetros del suelo evita humedades.',
      },
      {
        p: '¿Puedo montar la caseta yo mismo?',
        r: 'Sí, en la mayoría de modelos de madera y resina: vienen con instrucciones, piezas numeradas y tornillería, y se montan entre dos personas con herramientas básicas en 4–10 horas. Las casetas de hormigón, las muy grandes y las de uso profesional las instala el fabricante.',
      },
    ],
  },
  presupuesto: {
    ancla: /\bpresupuesto\b/,
    evita: ['precio'],
    lista: [
      {
        p: '¿Cómo pedir presupuesto de una {n}?',
        r: 'Rellena el formulario de esta página con los datos básicos: localidad de la parcela, metros aproximados, número de dormitorios y sistema constructivo que prefieres. Con eso te enviamos un presupuesto orientativo en 24–48 horas y, si te encaja, el fabricante visita el terreno y cierra el precio definitivo.',
      },
      {
        p: '¿El presupuesto de una {n} tiene compromiso o coste?',
        r: 'No. El presupuesto orientativo es gratuito y sin compromiso. Solo se pagan el proyecto y el estudio geotécnico cuando decides seguir adelante con un fabricante, y esos importes se descuentan después del precio de la casa.',
      },
      {
        p: '¿Qué datos necesita el fabricante para presupuestar una {n}?',
        r: 'La ubicación exacta de la parcela (para transporte y normativa), su superficie y pendiente, si tiene acometidas de agua y luz cerca, los metros y dormitorios que quieres, y el nivel de acabados. Cuanto más completa sea la información, más ajustado y fiable será el presupuesto.',
      },
    ],
  },
  modelos: {
    ancla: /\bmodelos\b/,
    evita: ['material'],
    lista: [
      {
        p: '¿Qué modelos de {N} son los más vendidos?',
        r: 'Los modelos de una planta de 80 a 120 m² con dos o tres dormitorios y porche, ideales como primera vivienda o segunda residencia. Les siguen las casas de dos plantas de 120 a 180 m² para familias, y los modelos pequeños de 40 a 60 m² como casa de invitados o vivienda mínima. En esta página puedes verlos todos con precios orientativos.',
      },
      {
        p: '¿Puedo modificar un modelo de {n}?',
        r: 'Sí. Todos los modelos se adaptan: cambiar la distribución, añadir un dormitorio o un garaje, ampliar el porche, elegir otro revestimiento. Es la vía más económica para tener una casa a medida, porque parte de una estructura y unas instalaciones ya resueltas y probadas.',
      },
      {
        p: '¿Cómo elegir el modelo de {n} adecuado?',
        r: 'Empieza por la parcela: su tamaño, la orientación y lo que permite el ayuntamiento (edificabilidad, retranqueos, alturas). Después define el programa: cuántos dormitorios, si quieres una o dos plantas, porche o garaje. Con eso, elige entre los modelos que encajen y compara precios y plazos.',
      },
    ],
  },
  'casetas:modelos': {
    ancla: /\bmodelos\b/,
    evita: ['material'],
    lista: [
      {
        p: '¿Qué modelos de casetas son los más vendidos?',
        r: 'Las casetas de jardín de madera de 3 × 3 m con paredes de 28 mm, las de resina de 4–6 m² sin mantenimiento y las casetas de aperos de hormigón de 6–10 m². Para uso profesional, los módulos de obra de 6 m y las garitas de vigilancia de 2 × 2 m. En esta página puedes verlos con medidas y precios orientativos.',
      },
      {
        p: '¿Se puede modificar un modelo de caseta?',
        r: 'Sí: casi todos admiten cambiar las medidas, añadir ventanas, elegir el lado de la puerta, subir el grosor de pared, añadir porche o cambiar la cubierta a dos aguas. En hormigón y en módulos de obra se personalizan distribución, instalaciones y acabados.',
      },
      {
        p: '¿Cómo elegir el modelo de caseta adecuado?',
        r: 'Piensa primero en el uso (almacén, taller, despacho, animales, negocio), después en el sitio disponible y en la normativa municipal (superficie máxima y distancia a linderos), y por último en el material y el grosor de pared que exige ese uso. Con eso, compara modelos con las mismas prestaciones.',
      },
    ],
  },
  amedida: {
    ancla: /a-medida/,
    evita: ['material'],
    lista: [
      {
        p: '¿Se puede hacer una {n} a medida?',
        r: 'Sí. Además de los modelos de catálogo, los fabricantes diseñan {N} a medida desde cero: distribución, tamaño, fachadas y acabados a tu gusto, adaptados a la parcela y a la normativa. El proceso lo lleva un arquitecto del fabricante y el resultado es igual de prefabricado: se construye en taller y se monta en tu terreno.',
      },
      {
        p: '¿Cuánto cuesta más una {n} a medida?',
        r: 'Entre un 10 % y un 25 % más que el modelo de catálogo equivalente, por el trabajo de diseño y por fabricar piezas únicas. La vía intermedia es partir de un modelo y personalizarlo: suele cubrir el 90 % de las necesidades a un coste mucho menor.',
      },
      {
        p: '¿Cuánto tarda una {n} a medida?',
        r: 'Añade uno o dos meses de diseño al plazo habitual, que es {T} desde la licencia. Merece la pena dedicar tiempo a la fase de proyecto, porque una vez en fábrica los cambios son costosos.',
      },
    ],
  },
  empresas: {
    ancla: /\bempresas\b/,
    evita: ['material'],
    lista: [
      {
        p: '¿Cómo elegir una empresa de {N}?',
        r: 'Busca empresas con fábrica propia, años de trayectoria y casas ya construidas que puedas visitar. Exige contrato con precio y plazo cerrados, proyecto visado y garantías por escrito. Pide referencias de clientes en tu provincia y compara al menos tres presupuestos con el mismo programa de necesidades.',
      },
      {
        p: '¿Qué diferencia hay entre una empresa de {N} y una constructora tradicional?',
        r: 'La empresa de {N} fabrica la casa en planta con procesos industriales, controla la calidad en cada fase y te da un precio y un plazo cerrados. La constructora tradicional ejecuta todo a pie de obra, con más mano de obra, más imprevistos y plazos más largos. Ambas entregan una vivienda con las mismas garantías legales.',
      },
      {
        p: '¿Las empresas de {N} trabajan en toda España?',
        r: 'La mayoría sí, dentro de un radio de transporte razonable desde su fábrica, y algunas tienen delegaciones en varias comunidades. En nuestro directorio puedes localizar empresas por provincia y pedir presupuesto a las que sirvan en tu zona.',
      },
    ],
  },
  render: {
    ancla: /\brender\b/,
    evita: [],
    lista: [
      {
        p: '¿Qué es un render o diseño 3D de una casa prefabricada?',
        r: 'Es una imagen realista generada por ordenador a partir de los planos: muestra cómo quedará la casa por fuera y por dentro, con sus materiales, luces y entorno, antes de fabricarla. Sirve para tomar decisiones sobre distribución y acabados con seguridad y para evitar cambios costosos una vez en fábrica.',
      },
      {
        p: '¿El diseño 3D de mi casa prefabricada tiene coste?',
        r: 'Muchos fabricantes lo incluyen en el proyecto cuando eliges un modelo o firmas el encargo; como servicio independiente, un render exterior e interior ronda los 150–400 € por vista. Si contratas después la casa, el importe suele descontarse.',
      },
      {
        p: '¿Qué necesito para encargar un render de mi casa prefabricada?',
        r: 'Un plano o croquis con medidas, fotos o referencia de la parcela y una idea de los acabados (revestimiento, carpinterías, cubierta). Con eso, en una o dos semanas tienes las vistas 3D para revisar y ajustar antes de pasar a fabricación.',
      },
    ],
  },
  modernas: {
    ancla: /\bmodernas\b/,
    evita: ['precio'],
    lista: [
      {
        p: '¿Cómo son las {N} modernas?',
        r: 'Volúmenes limpios de cubierta plana o a un agua, grandes ventanales, fachadas combinadas (hormigón, madera y metal), espacios abiertos y mucha luz. Suelen incorporar domótica, aerotermia y paneles solares de serie. Los sistemas prefabricados encajan especialmente bien con este estilo porque permiten luces amplias sin pilares.',
      },
      {
        p: '¿Cuánto cuesta una {n} moderna?',
        r: '{P} El estilo moderno tiende a la gama media-alta por los grandes acristalamientos y los acabados: cuenta con 1.200–1.800 €/m² en modelos de diseño. La planta compacta y la cubierta plana, sin embargo, ayudan a contener el precio.',
      },
      {
        p: '¿Las {N} modernas son eficientes energéticamente?',
        r: 'Sí, suelen ser las más eficientes: aislamiento reforzado, ventanas de altas prestaciones orientadas al sur, protecciones solares y sistemas de climatización eficientes. Muchas alcanzan calificación energética A y algunas se diseñan directamente como casas pasivas.',
      },
    ],
  },
  minimalistas: {
    ancla: /\bminimalistas\b/,
    evita: ['material'],
    lista: [
      {
        p: '¿Qué caracteriza a una casa prefabricada minimalista?',
        r: 'Líneas rectas, cubierta plana, pocos materiales (blanco, hormigón visto, madera clara, vidrio), ausencia de ornamentos y espacios diáfanos con almacenamiento oculto. El menos es más también en la planta: distribuciones sencillas y racionales que además abaratan la fabricación.',
      },
      {
        p: '¿Es más barata una casa prefabricada minimalista?',
        r: 'Su geometría simple, sin quiebros ni cubiertas complicadas, reduce el coste de estructura y montaje. Lo que encarece son los acabados: grandes vidrios, carpinterías ocultas y detalles muy cuidados. En conjunto se sitúa en un rango parecido al de una casa moderna estándar.',
      },
      {
        p: '¿Qué sistema constructivo va mejor con el estilo minimalista?',
        r: 'El hormigón prefabricado, por sus superficies lisas y su capacidad para volar terrazas y cubiertas, y el Steel Framing, por su ligereza y precisión. La madera también funciona con revestimientos de listones o paneles lisos. En todos los casos la clave está en el detalle constructivo.',
      },
    ],
  },
  mediterraneas: {
    ancla: /\bmediterraneas\b/,
    evita: ['material'],
    lista: [
      {
        p: '¿Cómo son las casas prefabricadas mediterráneas?',
        r: 'Muros blancos o en tonos tierra, cubierta plana o de teja árabe, porches, pérgolas y patios, ventanas con contraventanas y una relación fuerte entre interior y exterior. Están pensadas para el sol y el calor: muros con inercia, sombras y ventilación cruzada.',
      },
      {
        p: '¿Qué sistema es mejor para una casa mediterránea prefabricada?',
        r: 'El hormigón prefabricado es el más natural para este estilo por su inercia térmica, que mantiene la casa fresca de día y templada de noche. El Steel Framing y la madera también sirven si se combinan con revestimientos claros, aislamiento reforzado y protecciones solares bien diseñadas.',
      },
      {
        p: '¿Son adecuadas las casas prefabricadas para la costa?',
        r: 'Sí. Los materiales se especifican para ambiente marino: hormigón con recubrimientos adecuados, acero galvanizado, carpinterías de aluminio lacado o PVC y herrajes inoxidables. Conviene indicarlo al fabricante desde el principio para que ajuste las especificaciones.',
      },
    ],
  },
  pasivas: {
    ancla: /\bpasivas\b/,
    evita: [],
    lista: [
      {
        p: '¿Qué es una casa prefabricada pasiva?',
        r: 'Una vivienda diseñada según el estándar Passivhaus: aislamiento muy grueso, ventanas de triple vidrio, hermeticidad al aire, sin puentes térmicos y ventilación mecánica con recuperación de calor. Consume hasta un 90 % menos en calefacción y refrigeración que una casa convencional y mantiene una temperatura estable todo el año.',
      },
      {
        p: '¿Cuánto cuesta más una casa pasiva prefabricada?',
        r: 'Entre un 5 % y un 15 % más que la misma casa en estándar normal, por el aislamiento extra, las ventanas de altas prestaciones y el sistema de ventilación. Ese sobrecoste se recupera en pocos años con el ahorro en facturas, y la casa gana confort y valor de reventa.',
      },
      {
        p: '¿Por qué la prefabricación es ideal para casas pasivas?',
        r: 'Porque la hermeticidad y la ausencia de puentes térmicos, que son lo más difícil de conseguir a pie de obra, se controlan con precisión en fábrica. Los paneles llegan con el aislamiento y las membranas ya integrados, y el test de hermeticidad (blower door) se supera con margen.',
      },
    ],
  },
  modulares: {
    ancla: /\bmodulares\b/,
    evita: ['plazo'],
    lista: [
      {
        p: '¿Qué es una casa prefabricada modular?',
        r: 'Una casa formada por módulos tridimensionales completos (con instalaciones, suelos y acabados) que se fabrican en planta y se transportan en camión para unirse en la parcela. Es el sistema con mayor grado de industrialización: en fábrica se ejecuta hasta el 90 % de la vivienda.',
      },
      {
        p: '¿Se puede ampliar una casa modular en el futuro?',
        r: 'Sí, es una de sus grandes ventajas: se pueden añadir módulos nuevos (un dormitorio, un despacho, una segunda planta) sin obras mayores en la casa existente. Conviene preverlo en el proyecto inicial para dejar preparadas la cimentación y las conexiones.',
      },
      {
        p: '¿Cuánto tarda en instalarse una casa modular?',
        r: 'El montaje en la parcela dura de uno a tres días con grúa. Contando proyecto, licencia, cimentación y fabricación, la casa modular está lista en 4–6 meses. Es el sistema prefabricado más rápido de todos.',
      },
    ],
  },
  moviles: {
    ancla: /\bmoviles\b/,
    evita: ['precio', 'licencia', 'hipoteca'],
    lista: [
      {
        p: '¿Qué es una casa prefabricada móvil?',
        r: 'Una vivienda construida sobre un chasis con ruedas (mobile home) o diseñada para transportarse y reubicarse sin obra. No lleva cimentación: se apoya sobre una base nivelada y se conecta a las acometidas. Es la opción habitual para campings, parcelas con permiso temporal o segunda residencia económica.',
      },
      {
        p: '¿Necesito licencia para una casa móvil?',
        r: 'Al no ser una edificación fija, en muchos municipios basta una autorización o declaración responsable, siempre que conserve las ruedas y no se ancle al terreno. Si se instala de forma permanente o en suelo rústico, cada ayuntamiento y comunidad autónoma aplica su criterio; consúltalo antes de comprar.',
      },
      {
        p: '¿Cuánto cuesta una casa prefabricada móvil?',
        r: 'Desde 20.000–30.000 € en modelos de 30–40 m² hasta 60.000–80.000 € en mobile homes de 80–100 m² con dos o tres dormitorios y acabados de vivienda. Es más barata que una casa fija, pero no se puede hipotecar: se financia con préstamo personal o del fabricante.',
      },
    ],
  },
  contenedores: {
    ancla: /\bcontenedores\b/,
    evita: ['precio'],
    lista: [
      {
        p: '¿Cómo son las casas prefabricadas de contenedores?',
        r: 'Se construyen a partir de contenedores marítimos (de 20 o 40 pies) reforzados, aislados y unidos entre sí para formar viviendas de 15 a 150 m². Son casas de estética industrial, muy resistentes, rápidas de instalar y fáciles de transportar o ampliar añadiendo módulos.',
      },
      {
        p: '¿Cuánto cuesta una casa contenedor?',
        r: 'Desde unos 15.000–25.000 € por un contenedor de 40 pies (30 m²) acondicionado como vivienda, hasta 60.000–90.000 € en casas de tres o cuatro contenedores con acabados completos. El aislamiento y las instalaciones son lo que más pesa en el precio: un contenedor sin aislar es inhabitable.',
      },
      {
        p: '¿Se puede vivir todo el año en una casa contenedor?',
        r: 'Sí, siempre que se aísle correctamente por dentro o por fuera (poliuretano proyectado, lana de roca o paneles SIP) y se instalen ventanas de calidad. Bien ejecutadas cumplen el CTE y necesitan licencia de obra como cualquier vivienda fija.',
      },
    ],
  },
  cube: {
    ancla: /\bcube\b/,
    evita: ['precio'],
    lista: [
      {
        p: '¿Qué es una casa prefabricada Cube?',
        r: 'Es un tipo de vivienda modular compacta de forma cúbica, normalmente de 25 a 60 m² por módulo, con diseño moderno, grandes ventanales y acabados de serie. Se fabrica completa en taller, se transporta en camión y se instala en un día. Varios cubos pueden unirse para formar casas mayores.',
      },
      {
        p: '¿Para qué se usa una casa Cube?',
        r: 'Como vivienda mínima, casa de invitados, despacho en el jardín, estudio, alojamiento turístico o casa de fin de semana. Su tamaño y su precio la hacen ideal para parcelas pequeñas y como primera vivienda económica de una o dos personas.',
      },
      {
        p: '¿Cuánto cuesta una casa Cube?',
        r: 'Desde unos 25.000–35.000 € en modelos de 25–30 m² hasta 60.000–90.000 € en casas de dos o tres cubos con 60–90 m². El precio suele incluir instalaciones, cocina y baño montados; se añaden transporte, base y acometidas.',
      },
    ],
  },
  lujo: {
    ancla: /de-lujo/,
    evita: ['precio'],
    lista: [
      {
        p: '¿Cómo son las casas prefabricadas de lujo?',
        r: 'Viviendas de diseño de 200 a 500 m² con arquitectura de autor, grandes acristalamientos, materiales nobles (piedra, madera maciza, hormigón visto), domótica integral, piscina, spa o garaje para varios coches. Se fabrican con los mismos sistemas prefabricados pero con especificaciones de alta gama y proyecto a medida.',
      },
      {
        p: '¿Cuánto cuesta una casa prefabricada de lujo?',
        r: 'A partir de 1.800–2.500 €/m², es decir, desde unos 400.000 € en adelante según superficie, materiales y equipamiento. Sigue siendo un 15–30 % más económica que la misma casa construida de forma tradicional, y con un plazo mucho más corto.',
      },
      {
        p: '¿Se nota que una casa de lujo es prefabricada?',
        r: 'No. La prefabricación es un proceso de construcción, no un estilo: la casa terminada es indistinguible de una obra convencional de alta gama. De hecho, la precisión de fábrica permite detalles (carpinterías ocultas, juntas perfectas, grandes voladizos) difíciles de conseguir a pie de obra.',
      },
    ],
  },
  grandes: {
    ancla: /\bgrandes\b/,
    evita: ['precio', 'plazo'],
    lista: [
      {
        p: '¿Hasta qué tamaño se puede hacer una casa de madera prefabricada?',
        r: 'Sin límite práctico: hay casas de madera grandes de 200, 300 y hasta 500 m² en una o dos plantas, con garaje, porches y distribuciones familiares. Se resuelven con entramado ligero o con madera laminada (CLT y vigas GL), que permite luces de más de 10 metros sin pilares.',
      },
      {
        p: '¿Cuánto cuesta una casa de madera grande?',
        r: 'El precio por metro cuadrado baja al aumentar el tamaño: una casa de madera de 200 m² se mueve entre 130.000 y 180.000 € llave en mano (650–900 €/m²), y una de 300 m² desde unos 190.000 €. Los extras de gama alta (maderas nobles, grandes ventanales) pueden elevar el precio a 1.200 €/m².',
      },
      {
        p: '¿Cuánto tarda una casa de madera grande?',
        r: 'De 5 a 8 meses desde la licencia, algo más que un modelo estándar por el volumen de fabricación y de acabados. La estructura completa, incluso en casas de 300 m², se levanta en dos o tres semanas.',
      },
    ],
  },
  pequenas: {
    ancla: /\bpequenas\b/,
    evita: ['precio', 'licencia'],
    lista: [
      {
        p: '¿Cuánto cuesta una casa de madera pequeña?',
        r: 'Una casa de madera de 36 m² puede salir desde 8.000 € en kit para montar, y desde 20.000–25.000 € montada con instalaciones y aislamiento. Los modelos de 50 m² con un dormitorio rondan los 21.000–30.000 €. Son la opción más económica para vivienda mínima, casa de invitados o estudio.',
      },
      {
        p: '¿Necesito licencia para una casa de madera pequeña?',
        r: 'Si va a ser vivienda habitable, sí, aunque sea pequeña: proyecto y licencia de obra. Si es una construcción auxiliar sin cimentación (estudio, casa de invitados sin cocina), muchos ayuntamientos la tramitan como obra menor o declaración responsable, con límites de superficie que varían entre 10 y 40 m².',
      },
      {
        p: '¿Cómo aprovechar mejor el espacio en una casa de madera pequeña?',
        r: 'Planta abierta con cocina integrada en el salón, altillo para dormir aprovechando la altura de la cubierta, armarios empotrados en tabiques, puertas correderas y un porche que amplíe la zona de estar con buen tiempo. Las ventanas grandes hacen que 40 m² parezcan muchos más.',
      },
    ],
  },
  jardin: {
    ancla: /\bjardin\b/,
    evita: ['precio', 'licencia'],
    lista: [
      {
        p: '¿Qué es una casa de madera para jardín?',
        r: 'Una construcción de madera de 5 a 40 m² que se instala en el jardín como trastero, taller, despacho, casa de invitados o refugio de verano. Van desde casetas sencillas de paredes de 19 mm hasta casas de madera de 44–70 mm aisladas, con ventanas, porche y posibilidad de instalación eléctrica.',
      },
      {
        p: '¿Necesito licencia para una casa de madera en el jardín?',
        r: 'Para las pequeñas y desmontables, sin cimentación, suele bastar una declaración responsable o una licencia de obra menor; a partir de cierta superficie (10–25 m² según el ayuntamiento) o si lleva solera y se usa como vivienda, licencia de obra mayor. Pregunta en tu ayuntamiento antes de comprar.',
      },
      {
        p: '¿Cuánto cuesta una casa de madera de jardín?',
        r: 'Desde 1.000–2.000 € en modelos de 6–9 m² con paredes de 19–28 mm, hasta 8.000–15.000 € en casas de 20–30 m² con paredes de 44–70 mm, aislamiento y suelo. El montaje en kit es sencillo; muchos fabricantes ofrecen instalación por un pequeño extra.',
      },
    ],
  },
  'casetas:jardin': {
    ancla: /\bjardin\b/,
    evita: ['precio', 'licencia'],
    lista: [
      {
        p: '¿Qué caseta de jardín elegir?',
        r: 'Para herramientas y bicicletas, una caseta de resina o de madera de 19 mm de 3–5 m². Para taller, despacho o zona de estar, madera de 28–44 mm con ventana y suelo, de 6 a 15 m². Si quieres olvidarte del mantenimiento, resina; si buscas estética y aislamiento, madera tratada en autoclave.',
      },
      {
        p: '¿Necesito licencia para una caseta de jardín?',
        r: 'Las casetas pequeñas y desmontables, sin cimentación, suelen tramitarse con una declaración responsable o una licencia de obra menor. Cada ayuntamiento fija una superficie máxima (normalmente 10–25 m²) y una distancia mínima a linderos. Consúltalo antes de comprar para elegir el tamaño adecuado.',
      },
      {
        p: '¿Cuánto cuesta una caseta de jardín?',
        r: 'Desde 300–600 € en casetas de resina o madera fina de 2–4 m², hasta 2.500–5.000 € en casetas de madera de 28–44 mm de 10–15 m² con ventanas, suelo y porche. Añade la base (100–600 €) y, si no la montas tú, la instalación.',
      },
    ],
  },
  cabanas: {
    ancla: /\bcabanas\b/,
    evita: ['precio'],
    lista: [
      {
        p: '¿Qué diferencia hay entre una cabaña de madera y una casa de madera?',
        r: 'La cabaña es más pequeña (20–80 m²), de estilo rústico, normalmente de troncos o tablones macizos, y pensada como refugio, casa de vacaciones o alojamiento rural. La casa de madera es una vivienda completa con estructura calculada, aislamiento en cámara e instalaciones de vivienda. Ambas se fabrican prefabricadas y se montan en tu terreno.',
      },
      {
        p: '¿Cuánto cuesta una cabaña de madera?',
        r: 'Desde 8.000–15.000 € en cabañas de 20–30 m² en kit, hasta 40.000–70.000 € en cabañas de 60–80 m² montadas, aisladas y con baño y cocina. Los troncos macizos y las vigas vistas encarecen frente al entramado ligero.',
      },
      {
        p: '¿Se puede vivir todo el año en una cabaña de madera?',
        r: 'Sí, si está aislada correctamente (paredes de al menos 70 mm o doble pared con aislamiento, cubierta y suelo aislados) y tiene ventanas de doble vidrio y calefacción. Para uso de vivienda habitual necesita licencia como cualquier casa; para uso ocasional en parcela rústica, consulta la normativa de tu comunidad.',
      },
    ],
  },
  cobertizos: {
    ancla: /\bcobertizos\b/,
    evita: ['precio', 'licencia'],
    lista: [
      {
        p: '¿Para qué sirve un cobertizo de madera?',
        r: 'Para guardar herramientas, leña, bicicletas, muebles de jardín o maquinaria, y como taller o zona cubierta al aire libre. Los hay cerrados (tipo caseta), abiertos (leñeros, porches) y adosados a la casa. Se fabrican en madera tratada en autoclave y se montan en kit en unas horas.',
      },
      {
        p: '¿Cuánto cuesta un cobertizo de madera?',
        r: 'Desde 300–600 € en cobertizos pequeños y leñeros, hasta 2.000–4.000 € en cobertizos de 10–15 m² con puerta y ventana. El grosor de la madera (16, 19 o 28 mm) y la cubierta (tela asfáltica o tejas) marcan la diferencia de precio.',
      },
      {
        p: '¿Necesito licencia para un cobertizo?',
        r: 'Los cobertizos pequeños, desmontables y sin cimentación normalmente no requieren más que una comunicación al ayuntamiento; los de mayor tamaño o con solera pueden necesitar licencia de obra menor. Ten en cuenta también los retranqueos a lindero que fije tu municipio.',
      },
    ],
  },
  cocheras: {
    ancla: /\bcocheras\b/,
    evita: ['precio', 'licencia'],
    lista: [
      {
        p: '¿Qué tipos de cocheras de madera hay?',
        r: 'Garajes cerrados con puerta basculante o corredera, cocheras abiertas tipo carport con pilares y cubierta, y modelos mixtos con trastero. Se fabrican en madera laminada o maciza tratada, para uno o dos coches, y se montan en kit o las instala el fabricante en uno o dos días.',
      },
      {
        p: '¿Cuánto cuesta una cochera de madera?',
        r: 'Un carport abierto para un coche ronda los 1.500–3.000 €; un garaje cerrado de madera para un vehículo, 5.000–9.000 €; y para dos coches con trastero, 9.000–15.000 €. Se añade la solera de hormigón y, si procede, la puerta motorizada.',
      },
      {
        p: '¿Necesito licencia para una cochera de madera?',
        r: 'Normalmente licencia de obra menor si es un carport abierto y de obra mayor si es un garaje cerrado con solera, según el ayuntamiento. Computa como superficie construida, así que revisa la edificabilidad y los retranqueos de tu parcela.',
      },
    ],
  },
  pergolas: {
    ancla: /\bpergolas\b/,
    evita: ['precio', 'licencia'],
    lista: [
      {
        p: '¿Qué pérgola de madera elegir?',
        r: 'Depende del uso: adosada a la fachada para cubrir una terraza, exenta para crear una zona de estar en el jardín, o con cubierta (policarbonato, tejas o lona) para protegerse de la lluvia. La madera laminada permite mayores luces; la maciza tratada en autoclave es más económica.',
      },
      {
        p: '¿Cuánto cuesta una pérgola de madera?',
        r: 'Desde 400–800 € en pérgolas sencillas de 3 × 3 m en kit, hasta 3.000–6.000 € en pérgolas grandes de madera laminada con cubierta y montaje incluido. El anclaje al suelo (dados de hormigón o placas) se presupuesta aparte.',
      },
      {
        p: '¿Necesito licencia para instalar una pérgola?',
        r: 'Las pérgolas abiertas y desmontables suelen tramitarse con una declaración responsable o no requieren licencia según el municipio; si lleva cubierta cerrada y se ancla con obra puede necesitar licencia de obra menor. Consúltalo en tu ayuntamiento.',
      },
    ],
  },
  perfiles: {
    ancla: /\bperfiles\b/,
    evita: ['que'],
    lista: [
      {
        p: '¿Qué perfiles se usan en Steel Framing?',
        r: 'Perfiles de acero galvanizado conformados en frío: montantes tipo C (PGC) y canales tipo U (PGU), en espesores de 0,9 a 2,5 mm y alturas de 90 a 200 mm, separados cada 40 o 60 cm. Con ellos se forman paneles de muro, vigas de forjado y cerchas de cubierta, unidos con tornillos autoperforantes.',
      },
      {
        p: '¿Los perfiles de Steel Framing se oxidan?',
        r: 'No: el galvanizado en caliente (Z275 o superior) protege el acero durante toda la vida útil de la casa, más de 100 años en condiciones normales. Además, la estructura queda dentro de la envolvente, seca y ventilada, sin contacto con el exterior.',
      },
      {
        p: '¿Dónde comprar perfiles de Steel Framing?',
        r: 'En distribuidores de acero y en los propios fabricantes de casas de Steel Framing, que los sirven cortados a medida y preperforados a partir de los planos. Para un proyecto de vivienda es mejor comprar el paquete estructural completo, con cálculo y certificación incluidos.',
      },
    ],
  },
  alquiler: {
    ancla: /\balquiler\b/,
    evita: ['precio'],
    lista: [
      {
        p: '¿Cuánto cuesta alquilar una caseta?',
        r: 'El alquiler de casetas de obra o módulos prefabricados ronda los 80–200 € al mes según tamaño y equipamiento (aseos, oficina, almacén), más transporte e instalación. Para eventos y ferias se alquilan por días o semanas. A partir de 18–24 meses suele compensar la compra.',
      },
      {
        p: '¿Qué tipos de casetas se alquilan?',
        r: 'Casetas de obra (oficina, vestuario, almacén), módulos sanitarios, casetas de vigilancia, quioscos y stands para ferias y eventos, y módulos de vivienda temporal. Se entregan montadas y equipadas, listas para conectar a la red.',
      },
      {
        p: '¿El alquiler de una caseta incluye transporte y montaje?',
        r: 'Normalmente el transporte y la instalación se cobran aparte, en función de la distancia y de si hace falta grúa. Pide el presupuesto completo con entrega, retirada y, si procede, conexión de agua y electricidad.',
      },
    ],
  },
  aperos: {
    ancla: /\baperos\b/,
    evita: ['precio', 'licencia'],
    lista: [
      {
        p: '¿Qué es una caseta de aperos?',
        r: 'Una pequeña construcción para guardar herramientas y maquinaria agrícola o de jardín, de 4 a 20 m², en madera, chapa u hormigón prefabricado. Las de hormigón son las más duraderas y seguras frente a robos; las de madera, las más económicas y fáciles de montar.',
      },
      {
        p: '¿Puedo poner una caseta de aperos en suelo rústico?',
        r: 'Sí, es uno de los pocos usos permitidos en suelo rústico, siempre que esté vinculada a la explotación agrícola y respete los límites de superficie y altura que fije tu comunidad autónoma (habitualmente 10–20 m² y 3 m). Necesitarás licencia de obra menor y no puede destinarse a vivienda.',
      },
      {
        p: '¿Cuánto cuesta una caseta de aperos?',
        r: 'Desde 500–1.000 € en casetas de madera o chapa de 4–6 m², hasta 3.000–6.000 € en casetas de hormigón prefabricado de 10–20 m² instaladas. Las de hormigón requieren solera y transporte con grúa.',
      },
    ],
  },
  campo: {
    ancla: /\bcampo\b/,
    evita: ['precio', 'licencia'],
    lista: [
      {
        p: '¿Qué es una caseta de campo?',
        r: 'Una construcción prefabricada pensada para fincas y parcelas rústicas: almacén de aperos, refugio de fin de semana o pequeña vivienda de recreo. Se fabrican en madera, hormigón o mixtas, de 10 a 60 m², con o sin porche, y se entregan montadas o en kit.',
      },
      {
        p: '¿Puedo instalar una caseta de campo en mi finca?',
        r: 'Para uso agrícola (aperos, almacén) sí, con licencia de obra menor y respetando los límites de superficie de tu comunidad. Para uso de vivienda o recreo en suelo rústico la normativa es más restrictiva y varía mucho por comunidad autónoma: consúltalo en el ayuntamiento antes de comprar.',
      },
      {
        p: '¿Cuánto cuesta una caseta de campo?',
        r: 'Desde 2.000–4.000 € en casetas de madera de 10–15 m², hasta 15.000–30.000 € en casetas de hormigón o madera de 30–60 m² con porche, instalaciones y acabados de vivienda.',
      },
    ],
  },
  ferias: {
    ancla: /\bferias\b/,
    evita: ['precio'],
    lista: [
      {
        p: '¿Qué son las casetas de ferias?',
        r: 'Módulos prefabricados desmontables para ferias, mercados, eventos y fiestas: stands, barras, quioscos y casetas de feria tradicionales. Se fabrican en madera, aluminio o estructura metálica con lona, se montan en horas y se pueden alquilar o comprar.',
      },
      {
        p: '¿Es mejor alquilar o comprar una caseta de feria?',
        r: 'Para un evento puntual, alquilar (desde 100–300 € por evento según tamaño). Si participas en varias ferias al año o eres ayuntamiento, asociación o feriante, comprar compensa a partir del segundo o tercer uso: una caseta de 3 × 3 m cuesta desde 1.500–3.000 €.',
      },
      {
        p: '¿Qué normativa cumplen las casetas de feria?',
        r: 'Deben ser estables frente al viento, con anclajes, y cumplir la normativa de seguridad de la instalación (materiales ignífugos, instalación eléctrica certificada). El organizador o el ayuntamiento indica los requisitos; los fabricantes entregan certificados de homologación.',
      },
    ],
  },
  obra: {
    ancla: /\bobra\b/,
    evita: ['precio', 'usos'],
    lista: [
      {
        p: '¿Qué es una caseta de obra?',
        r: 'Un módulo prefabricado de estructura metálica y panel sándwich, de 3 a 12 m de largo, usado como oficina, vestuario, comedor, almacén o aseo en obras de construcción. Se entrega montado, equipado y listo para conectar; se puede comprar nuevo, de segunda mano o alquilar.',
      },
      {
        p: '¿Cuánto cuesta una caseta de obra?',
        r: 'Nueva, desde 3.000–5.000 € un módulo de 6 m sin equipar y 6.000–12.000 € con ventanas, instalación eléctrica y aseo. De segunda mano, desde 1.500 €. En alquiler, 80–200 € al mes más transporte.',
      },
      {
        p: '¿Se puede usar una caseta de obra como vivienda o despacho?',
        r: 'Sí: con aislamiento reforzado, ventanas de doble vidrio, climatización e instalaciones certificadas se usan como oficinas, aulas, consultas o viviendas temporales. Para uso permanente como vivienda debe cumplir la normativa de habitabilidad y contar con licencia.',
      },
    ],
  },
  plastico: {
    ancla: /\bplastico\b/,
    evita: ['precio', 'material'],
    lista: [
      {
        p: '¿Son buenas las casetas de plástico?',
        r: 'Para almacenaje en el jardín, sí: no se pudren, no se oxidan, resisten la lluvia y los rayos UV, y no necesitan mantenimiento. Aíslan poco y son menos robustas que la madera o el metal, por lo que no valen como taller o zona de estar. Son las más fáciles de montar.',
      },
      {
        p: '¿Cuánto cuesta una caseta de plástico?',
        r: 'Desde 200–400 € en armarios de resina de 1–2 m², hasta 1.500–2.500 € en casetas de plástico de 6–10 m² con ventana y suelo. Entre medias, las de 4–5 m² rondan los 600–1.000 €.',
      },
      {
        p: '¿Aguanta el viento una caseta de plástico?',
        r: 'Sí, siempre que se ancle al suelo (kit de anclaje a solera o a losas) y se monte sobre una base nivelada. Sin anclaje, una caseta de resina vacía puede volcar con vientos fuertes.',
      },
    ],
  },
  resina: {
    ancla: /\bresina\b/,
    evita: ['precio', 'material', 'mantenimiento'],
    lista: [
      {
        p: '¿Qué diferencia hay entre resina y plástico en una caseta?',
        r: 'La resina (polipropileno o polietileno de alta densidad con tratamiento UV) es un plástico de mayor calidad: más rígido, más grueso, con acabado que imita la madera y garantía de hasta 10 años frente a decoloración y grietas. Las casetas de resina son la gama alta de las casetas de plástico.',
      },
      {
        p: '¿Cuánto cuesta una caseta de resina?',
        r: 'Desde 400–700 € en modelos de 2–3 m², hasta 2.000–3.500 € en casetas de resina de 8–12 m² con ventanas, claraboya y suelo reforzado. Las marcas de referencia marcan los precios: cuanto más gruesos los paneles, más cara y más duradera.',
      },
      {
        p: '¿Necesita mantenimiento una caseta de resina?',
        r: 'Ninguno: basta con lavarla con agua y jabón. No hay que pintarla, tratarla ni preocuparse por la humedad, y los paneles no se decoloran gracias al tratamiento UV. Solo conviene revisar los anclajes al suelo una vez al año.',
      },
    ],
  },
  vigilancia: {
    ancla: /\bvigilancia\b/,
    evita: ['precio', 'usos'],
    lista: [
      {
        p: '¿Qué es una caseta de vigilancia?',
        r: 'Un módulo prefabricado compacto (de 1,5 × 1,5 m a 3 × 3 m) para control de accesos, garitas de seguridad, peajes o puntos de información. Se fabrican en hormigón, acero o panel sándwich, con ventanas de gran visibilidad, aislamiento, instalación eléctrica y climatización opcional.',
      },
      {
        p: '¿Cuánto cuesta una caseta de vigilancia?',
        r: 'Desde 2.000–3.500 € en garitas básicas de panel sándwich, hasta 6.000–12.000 € en casetas de hormigón o acero con vidrio de seguridad, climatización y aseo. Se entregan montadas y se instalan en un día.',
      },
      {
        p: '¿Se puede personalizar una caseta de vigilancia?',
        r: 'Sí: dimensiones, número y tipo de ventanas, vidrio blindado, puertas de seguridad, mostrador, aseo, climatización y rotulación corporativa. Los fabricantes las adaptan al uso (control de acceso a urbanización, obra, aparcamiento o industria).',
      },
    ],
  },
  bicicletas: {
    ancla: /\bbicicletas\b/,
    evita: ['precio', 'usos'],
    lista: [
      {
        p: '¿Qué caseta elegir para guardar bicicletas?',
        r: 'Para 2–4 bicis, una caseta baja de madera o resina de 1,2–1,5 m de alto y 2–2,5 m de ancho, con doble puerta frontal o tapa abatible. Para más bicis o bicicletas eléctricas, una caseta de jardín estándar con enchufe para cargar. Lo importante es una buena cerradura y el anclaje al suelo.',
      },
      {
        p: '¿Cuánto cuesta una caseta para bicicletas?',
        r: 'Desde 300–600 € en modelos de resina o metal para dos o tres bicis, hasta 1.000–2.500 € en casetas de madera de 3–5 m² con puerta con cerradura. Los aparcamientos cubiertos para comunidades y empresas se presupuestan a medida.',
      },
      {
        p: '¿Es segura una caseta para bicicletas frente a robos?',
        r: 'Las de metal y las de madera de 19–28 mm con cerradura de seguridad y anclaje al suelo ofrecen buena protección; las de resina son más fáciles de forzar. Dentro, ancla las bicis con un candado en U a un punto fijo para sumar una segunda barrera.',
      },
    ],
  },
  gatos: {
    ancla: /\bgatos\b/,
    evita: ['precio', 'usos', 'licencia', 'plazo'],
    lista: [
      {
        p: '¿Cómo debe ser una casa de madera para gatos de exterior?',
        r: 'Pequeña (40–60 cm), elevada del suelo, con tejado inclinado, entrada reducida para retener el calor y, a ser posible, con dos aberturas para que el gato no se sienta atrapado. Madera tratada, aislamiento en paredes y suelo y una manta térmica por dentro son las claves para el invierno.',
      },
      {
        p: '¿Cuánto cuesta una casa de madera para gatos?',
        r: 'Desde 40–80 € en casetas sencillas, hasta 150–300 € en casas de madera aisladas, con terraza, rascador o dos plantas. Las casetas para colonias felinas, de hormigón o madera gruesa, rondan los 200–400 €.',
      },
      {
        p: '¿Dónde colocar la caseta del gato?',
        r: 'En un rincón resguardado del viento y la lluvia, a la sombra en verano y con la entrada orientada hacia una pared o un seto, nunca hacia el viento dominante. Sobre una base elevada (palé o ladrillos) para aislarla de la humedad del suelo.',
      },
    ],
  },
  perros: {
    ancla: /\bperros\b/,
    evita: ['precio', 'usos', 'licencia', 'plazo'],
    lista: [
      {
        p: '¿Qué tamaño debe tener la caseta de mi perro?',
        r: 'El perro debe poder entrar, girarse y tumbarse estirado: como regla, el largo interior igual a 1,2 veces la longitud del perro y la altura igual a 1,2 veces su altura hasta la cruz. Una caseta demasiado grande no retiene el calor; mejor ajustada que enorme.',
      },
      {
        p: '¿Cuánto cuesta una casa de madera para perros?',
        r: 'Desde 60–120 € en casetas de madera para razas pequeñas, 150–300 € para razas medianas y grandes, y 300–600 € en modelos aislados, con porche o techo abatible para limpiar. Las casetas de hormigón o resina para exterior duro rondan los 200–400 €.',
      },
      {
        p: '¿Cómo aislar la caseta del perro para el invierno?',
        r: 'Elévala del suelo, coloca aislamiento (poliestireno o lana) en paredes, suelo y techo bajo un segundo panel de madera, añade una cortina de lamas en la entrada y una cama elevada o manta térmica. Orienta la puerta contra el viento dominante y sitúala en un lugar resguardado.',
      },
    ],
  },
  negocio: {
    ancla: /\bnegocio\b/,
    evita: ['precio', 'licencia', 'usos'],
    lista: [
      {
        p: '¿Qué casetas se usan para un negocio?',
        r: 'Quioscos, puestos de mercado, taquillas, cafeterías de temporada, casetas de venta en gasolineras o aparcamientos y oficinas de atención al público. Se fabrican en madera, acero o panel sándwich, con mostrador, ventana de despacho, instalación eléctrica, rotulación y equipamiento a medida.',
      },
      {
        p: '¿Cuánto cuesta una caseta para negocio?',
        r: 'Desde 3.000–6.000 € en quioscos y puestos básicos de 4–8 m², hasta 12.000–30.000 € en módulos comerciales de 15–30 m² con acabados, instalaciones, climatización y aseo. La inversión es mucho menor que una obra convencional y la caseta se puede trasladar.',
      },
      {
        p: '¿Necesito licencia para instalar una caseta de negocio?',
        r: 'Sí: licencia de actividad y, según el emplazamiento, licencia de ocupación de vía pública (si es suelo municipal) o de obra menor (si es parcela privada). Los ayuntamientos suelen exigir certificados de homologación de la caseta y de su instalación eléctrica.',
      },
    ],
  },
  casetasmadera: {
    ancla: /^\/casetas-de-madera\/$/,
    evita: ['precio', 'material', 'mantenimiento'],
    lista: [
      {
        p: '¿Qué grosor de pared debe tener una caseta de madera?',
        r: 'Para almacenaje, 16–19 mm bastan. Para taller, despacho o uso frecuente, 28–34 mm. Si quieres una caseta habitable en invierno, 44–70 mm o doble pared con aislamiento. El grosor determina la rigidez, el aislamiento y la durabilidad.',
      },
      {
        p: '¿Cuánto cuesta una caseta de madera?',
        r: 'Desde 600–1.200 € en casetas de 4–6 m² de 19 mm, hasta 4.000–8.000 € en casetas de 15–25 m² de 44 mm con suelo, ventanas y porche. La instalación por el fabricante suele costar un 10–15 % del precio.',
      },
      {
        p: '¿Cómo proteger una caseta de madera?',
        r: 'Aplica un tratamiento protector (lasur o aceite) justo después del montaje y renuévalo cada 1–2 años; monta la caseta sobre una base elevada y nivelada; cubre el tejado con tela asfáltica o tejas; y deja ventilación para evitar condensaciones. Elige madera tratada en autoclave si va a estar muy expuesta.',
      },
    ],
  },
  metalicas: {
    ancla: /\bmetalicas\b/,
    evita: ['precio', 'material', 'mantenimiento'],
    lista: [
      {
        p: '¿Qué ventajas tiene una caseta metálica?',
        r: 'Es la más económica por metro cuadrado, muy resistente al fuego, a los insectos y a la pudrición, y se monta en pocas horas. La chapa de acero galvanizado o lacado aguanta décadas a la intemperie. A cambio aísla poco del calor y del frío y suena con la lluvia, por lo que se usa sobre todo como almacén, garaje o taller.',
      },
      {
        p: '¿Cuánto cuesta una caseta metálica?',
        r: 'Desde 250–500 € en casetas de chapa de 2–4 m², hasta 1.500–3.000 € en casetas metálicas de 10–15 m² con puerta doble y ventana. Los garajes y naves ligeras de acero para uno o dos coches se mueven entre 3.000 y 8.000 €. Conviene añadir un kit de anclaje y una base nivelada.',
      },
      {
        p: '¿Se oxida una caseta metálica?',
        r: 'No si es de acero galvanizado o lacado y se monta bien: los puntos débiles son los tornillos, los cortes y las esquinas, que conviene revisar una vez al año y retocar con imprimación antióxido si aparece alguna marca. Una base que la separe del suelo húmedo alarga mucho su vida.',
      },
    ],
  },
  casetashormigon: {
    ancla: /casetas-hormigon/,
    evita: ['precio', 'material', 'plazo'],
    lista: [
      {
        p: '¿Qué ventajas tiene una caseta de hormigón prefabricado?',
        r: 'Es la más resistente y segura: no se pudre, no arde, no la fuerzan fácilmente y no necesita mantenimiento en décadas. Ideal para casetas de aperos, de obra, de vigilancia, cuartos de bombas, de contadores o trasteros en fincas. Se sirve montada y se coloca con grúa en unas horas.',
      },
      {
        p: '¿Cuánto cuesta una caseta de hormigón prefabricado?',
        r: 'Desde 1.500–3.000 € en casetas de 4–6 m² (cuartos de contadores, aperos), hasta 6.000–15.000 € en casetas de 15–30 m² con puerta metálica, ventanas y acabados. Hay que sumar la solera de hormigón y el transporte con grúa.',
      },
      {
        p: '¿Qué base necesita una caseta de hormigón?',
        r: 'Una solera de hormigón armado nivelada, de 10–15 cm de espesor, algo mayor que la caseta. Al pesar varias toneladas, el camión grúa debe poder acceder hasta el punto de instalación. Con la solera preparada, la instalación se completa en una mañana.',
      },
    ],
  },
};

/* Orden de comprobación: los específicos antes que los genéricos, para
   que "/casetas-hormigon-prefabricadas/" no caiga en otro tema. */
const ORDEN_TEMAS = [
  'casetasmadera', 'casetashormigon',
  'precios', 'planos', 'baratas', 'llave', 'venta', 'fabricantes', 'financiacion',
  'catalogo', 'imagenes', 'construccion', 'presupuesto', 'modelos', 'amedida',
  'empresas', 'render', 'modernas', 'minimalistas', 'mediterraneas', 'pasivas',
  'modulares', 'moviles', 'contenedores', 'cube', 'lujo', 'grandes', 'pequenas',
  'jardin', 'cabanas', 'cobertizos', 'cocheras', 'pergolas', 'perfiles', 'alquiler',
  'aperos', 'campo', 'ferias', 'obra', 'plastico', 'resina', 'vigilancia',
  'bicicletas', 'gatos', 'perros', 'negocio', 'metalicas',
];

/* Raíces de cada línea: no llevan lugar aunque la palabra clave no
   encaje con el patrón de prefijos. */
const RAICES = new Set([
  '/', '/madera/', '/hormigon/', '/steel-framing/', '/casas-steel-framing/', '/casetas/',
  '/casetas-prefabricadas/',
]);

/* La palabra clave es "Casas Prefabricadas Hormigón Madrid", "Casas de
   Madera Álava", "Steel Framing Ávila", "Casetas valencia"... se quita el
   producto y queda el lugar. */
const PREFIJO_PRODUCTO =
  /^(casas\s+(prefabricadas\s+)?(de\s+)?(hormig[oó]n\s+|madera\s+)?|steel\s+framing\s+|casetas\s+)/i;

/* Nombres que no salen bien de la palabra clave (en minúsculas, tal
   como quedan tras quitar el producto). Van con artículo cuando el
   nombre lo lleva: "en el País Vasco", no "en País Vasco". */
const NOMBRES = {
  'santa maría': 'El Puerto de Santa María',
  'el puerto de santa maría': 'El Puerto de Santa María',
  castro: 'Castro Urdiales',
  molina: 'Molina de Segura',
  'molina de segura': 'Molina de Segura',
  'vitoria gasteiz': 'Vitoria-Gasteiz',
  compostela: 'Santiago de Compostela',
  'pais vasco': 'el País Vasco',
  'país vasco': 'el País Vasco',
  catalunya: 'Cataluña',
};

const MINUSCULAS = new Set(['de', 'del', 'la', 'las', 'el', 'los', 'y']);

function capitalizar(texto) {
  return texto
    .trim()
    .split(/\s+/)
    .map((w, i) => (i > 0 && MINUSCULAS.has(w.toLowerCase()) ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1)))
    .join(' ');
}

function nombreLugar(resto) {
  const limpio = resto.trim().replace(/\s+/g, ' ');
  return NOMBRES[limpio.toLowerCase()] || capitalizar(limpio);
}

export function clasificar(pagina) {
  const ruta = pagina.ruta || '/';
  const linea = /caseta/.test(ruta)
    ? 'casetas'
    : /steel/.test(ruta)
      ? 'steel'
      : /hormigon/.test(ruta)
        ? 'hormigon'
        : /madera/.test(ruta)
          ? 'madera'
          : 'generica';

  let tema = null;
  for (const clave of ORDEN_TEMAS) {
    if (TEMAS[clave].ancla.test(ruta)) {
      tema = clave;
      break;
    }
  }

  let lugar = null;
  if (!tema && !RAICES.has(ruta)) {
    const resto = (pagina.palabraClave || '').replace(PREFIJO_PRODUCTO, '').trim();
    if (resto) lugar = nombreLugar(resto);
  }
  return { linea, tema, lugar };
}

function rellenar(texto, datos) {
  const salida = texto.replace(/\{(N|n|L|P|T)\}/g, (_, k) => datos[k] ?? '');
  return salida[0].toUpperCase() + salida.slice(1);
}

/** Título del bloque: "Preguntas frecuentes de casas prefabricadas de madera en Valencia". */
export function tituloFaq(pagina) {
  const { linea, lugar } = clasificar(pagina);
  return `Preguntas frecuentes de ${LINEAS[linea].titulo}${lugar ? ` en ${lugar}` : ''}`;
}

/** Las 6 preguntas de una página, ya con los marcadores rellenos. */
export function generarFaq(pagina, maximo = 6) {
  if (!pagina.palabraClave) return []; // aviso legal, cookies, privacidad
  const { linea, tema, lugar } = clasificar(pagina);
  const datos = { ...LINEAS[linea], L: lugar || '' };

  const salida = [];
  const evita = new Set();

  if (tema) {
    const bloque = TEMAS[`${linea}:${tema}`] || TEMAS[tema];
    for (const q of bloque.lista) salida.push(q);
    for (const k of bloque.evita) evita.add(k);
  }
  if (lugar) {
    for (const q of LUGAR) salida.push(q);
    for (const k of LUGAR_EVITA) evita.add(k);
  }
  for (const q of BASE[linea]) {
    if (salida.length >= maximo) break;
    if (!evita.has(q.clave)) salida.push(q);
  }

  return salida.slice(0, maximo).map((q) => ({
    pregunta: rellenar(q.p, datos),
    respuesta: rellenar(q.r, datos),
  }));
}

/* ------------------------------------------------------- colocación */
/* En el original el bloque iba entre "Presupuesto" y el directorio de
   localidades. WordPress lo dejó en 104 páginas dentro del cuerpo
   (<h2>Preguntas frecuentes...</h2> + h3/p hasta el siguiente h2): ahí se
   sustituye por una marca ANTES de reconstruir() para que las preguntas
   antiguas no se conviertan en tarjetas, y la marca se cambia por el
   acordeón nuevo DESPUÉS, en el mismo sitio. Donde no había bloque, va
   justo antes del último titular cuando ese titular solo abre el mapa
   de Google o el directorio de localidades (así queda en el mismo sitio
   que en las páginas que sí lo traían); si no, al final. */
const BLOQUE_ANTIGUO = /<h2[^>]*>\s*Preguntas frecuentes[^<]*<\/h2>[\s\S]*?(?=<h2\b|$)/i;
const MARCA = /<aside\b[^>]*data-faq="1"[^>]*>\s*<\/aside>/i;
const CIERRE = /<iframe\b|<ul class="zonas">/i;

export function marcarFaqAntiguo(html) {
  return html.replace(BLOQUE_ANTIGUO, '<aside data-faq="1"></aside>');
}

export function colocarFaq(html, bloque) {
  if (!bloque) return html.replace(MARCA, '');
  if (MARCA.test(html)) return html.replace(MARCA, bloque);
  const h2s = [...html.matchAll(/<h2\b/gi)];
  if (h2s.length) {
    const ultimo = h2s[h2s.length - 1].index;
    if (CIERRE.test(html.slice(ultimo))) return html.slice(0, ultimo) + bloque + html.slice(ultimo);
  }
  return html + bloque;
}

/* ------------------------------------------------------------ HTML */
function escapar(texto) {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Acordeón nativo: h2 del bloque, un <details> por pregunta con el h3
    dentro del <summary> (jerarquía h2 > h3, como el original). `name`
    hace que solo quede una abierta a la vez en los navegadores que lo
    soportan; en el resto funcionan como acordeón normal. */
export function renderFaq(faq, titulo) {
  if (!faq?.length) return '';
  const items = faq
    .map(
      (q) =>
        `<details name="faq"><summary><h3>${escapar(q.pregunta)}</h3></summary>` +
        `<div class="faq__respuesta"><p>${escapar(q.respuesta)}</p></div></details>`,
    )
    .join('');
  return `<section class="faq" aria-labelledby="faq-titulo"><h2 id="faq-titulo">${escapar(titulo)}</h2><div class="faq__lista">${items}</div></section>`;
}
