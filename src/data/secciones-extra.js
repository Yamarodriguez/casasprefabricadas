/**
 * Secciones nuevas (h2 + dos párrafos) que se AÑADEN al final del contenido
 * de cada página, sin tocar lo que ya había. Van justo antes de las
 * preguntas frecuentes.
 *
 *   LUGAR   páginas de provincia/ciudad: dos secciones por línea, con tres
 *           variantes cada una; la variante la elige el nombre del lugar,
 *           así dos provincias vecinas no llevan el mismo texto.
 *   RAIZ    las portadas de cada línea (/, /madera/, /hormigon/...).
 *   TEMA    precios, planos, llave en mano, cabañas, casetas de obra...
 *
 * Marcadores: {N} plural, {n} singular, {L} lugar, {P} frase de precio,
 * {T} plazo (los mismos que en src/utils/faq.js).
 */

export const LUGAR = {
  generica: {
    a: [
      {
        h2: 'Casas prefabricadas en {L}: lo que conviene saber antes de comprar',
        p: [
          'Elegir una casa prefabricada en {L} empieza por la parcela: comprueba en el ayuntamiento que el suelo es urbanizable, qué edificabilidad permite y qué distancias a linderos exige. Con eso claro, un fabricante puede darte precio cerrado y plazo en pocos días. {P}',
          'En {L} trabajan fabricantes de casas de madera, de hormigón y de Steel Framing, con modelos de 40 a 250 m². Compara al menos tres presupuestos con el mismo programa de necesidades y pide visitar una casa ya entregada en la zona: es la mejor forma de comprobar acabados y calidad real.',
        ],
      },
      {
        h2: 'Comprar una casa prefabricada en {L} paso a paso',
        p: [
          'El proceso en {L} es el mismo que en el resto de España: parcela, proyecto visado, licencia municipal, fabricación en taller y montaje. La diferencia con una obra tradicional es que la casa se construye mientras se tramita la licencia y se prepara la cimentación, y por eso el plazo total queda {T}.',
          'Para que el presupuesto sea fiable, indica desde el principio la ubicación exacta de la parcela en {L}: el transporte de los módulos, el acceso de la grúa y el tipo de terreno son lo que más varía de un encargo a otro. El resto —estructura, cerramientos, instalaciones y acabados— va con precio cerrado.',
        ],
      },
      {
        h2: 'Precios y plazos de las casas prefabricadas en {L}',
        p: [
          '{P} En {L} el precio final depende de tres factores: la distancia desde la fábrica, la cimentación que pida el terreno y las tasas municipales. Por eso los fabricantes dan primero un presupuesto orientativo y lo cierran tras visitar la parcela.',
          'El plazo habitual es {T} desde la licencia. Si tienes prisa, elige un modelo de catálogo en lugar de un diseño a medida, cierra los acabados antes de firmar y presenta la documentación en el ayuntamiento cuanto antes: la licencia es casi siempre lo que más tarda.',
        ],
      },
    ],
    b: [
      {
        h2: 'Ventajas de una casa prefabricada en {L}',
        p: [
          'Precio y plazo cerrados por contrato, menos residuos y menos molestias en la parcela, y una calidad de acabado que solo se consigue fabricando en taller. Las casas prefabricadas cumplen el Código Técnico de la Edificación, se escrituran y se hipotecan como cualquier vivienda en {L}.',
          'Además, el aislamiento viene diseñado como un sistema completo, así que el gasto en calefacción y refrigeración es muy inferior al de una casa de ladrillo. Para vivienda habitual, segunda residencia o una casa para alquilar en {L}, es la opción con mejor relación calidad-precio.',
        ],
      },
      {
        h2: 'Qué incluye una casa prefabricada llave en mano en {L}',
        p: [
          'Estructura, cubierta, ventanas y puertas, instalaciones de agua, luz y climatización, baños y cocina montados, suelos y pintura: la casa lista para entrar a vivir. Lo que no entra en el precio es el terreno, la cimentación (que depende de cada parcela en {L}), las acometidas hasta la red, la licencia y los impuestos.',
          'Pide siempre el desglose por escrito y compara qué incluye cada fabricante: dos presupuestos con el mismo precio pueden diferir mucho en aislamiento, carpinterías o equipamiento. Te ponemos en contacto con fabricantes que sirven en {L} y te ayudamos a compararlos.',
        ],
      },
      {
        h2: 'Fabricantes y empresas de casas prefabricadas en {L}',
        p: [
          'En esta página reunimos modelos, precios orientativos y fotos de fabricantes que entregan en {L} y su zona. Todos trabajan con proyecto visado, garantía decenal y contrato con plazo cerrado; muchos ofrecen además financiación propia o gestionan la hipoteca.',
          'Cuéntanos qué buscas —metros, dormitorios, sistema constructivo y presupuesto— y te enviamos en 24–48 horas propuestas de fabricantes que trabajan en {L}, sin compromiso. Si ya tienes parcela, indícalo: el presupuesto será mucho más ajustado.',
        ],
      },
    ],
  },

  madera: {
    a: [
      {
        h2: 'Casas de madera en {L}: precios, plazos y licencias',
        p: [
          '{P} En {L} el precio final de una casa de madera depende del grosor de los muros, del tipo de madera (pino nórdico, abeto, alerce), de los acabados y de la distancia desde la fábrica. Los modelos de catálogo son siempre más económicos que un diseño desde cero.',
          'El plazo es de los más cortos que existen: {T} desde la licencia, porque la estructura se fabrica en taller en 6–10 semanas y se monta en la parcela en pocos días. La licencia se tramita en el ayuntamiento como la de cualquier vivienda; te ayudamos con la documentación.',
        ],
      },
      {
        h2: 'Cómo elegir tu casa de madera en {L}',
        p: [
          'Decide primero el sistema: entramado ligero (el más económico y rápido), paneles SIP (máximo aislamiento) o madera maciza y troncos (el aspecto más rústico). Para vivir todo el año en {L} conviene muros de 44 mm o más con aislamiento en cámara, ventanas de doble vidrio y una buena cubierta ventilada.',
          'Fíjate en que la madera esté tratada en autoclave, en la garantía frente a hongos e insectos y en el sistema de anclaje a la cimentación. Pide ver una casa de madera ya montada cerca de {L}: el envejecimiento de la fachada dice más que cualquier catálogo.',
        ],
      },
      {
        h2: 'Casas de madera prefabricadas en {L}: cómo funciona el encargo',
        p: [
          'Empieza con la parcela en {L}: suelo urbanizable, edificabilidad y distancias a linderos. Con el modelo elegido, el arquitecto del fabricante adapta el proyecto a tu terreno, lo visa y lo presenta en el ayuntamiento. Mientras llega la licencia, se prepara la cimentación y la casa se fabrica en taller.',
          'El montaje en {L} lo hace el equipo del fabricante en una a tres semanas; después vienen instalaciones y acabados. Todo queda recogido en un contrato con precio y plazo cerrados, y la casa se entrega con garantía decenal, igual que una vivienda de obra.',
        ],
      },
    ],
    b: [
      {
        h2: 'Por qué una casa de madera es una buena elección en {L}',
        p: [
          'La madera es un aislante natural: una casa de madera bien construida gasta entre un 30 % y un 50 % menos en calefacción que una de ladrillo, y en verano se mantiene fresca. Es además el sistema más económico por metro cuadrado y el que menos tiempo de obra necesita en {L}.',
          'Bien tratada y con los detalles constructivos correctos (aleros, zócalo, cámara ventilada), una casa de madera dura entre 50 y 100 años. Se escritura, se inscribe en el Registro y se financia con hipoteca como cualquier vivienda de {L}.',
        ],
      },
      {
        h2: 'Mantenimiento y durabilidad de las casas de madera en {L}',
        p: [
          'El mantenimiento de una casa de madera en {L} se reduce a renovar el lasur o el aceite protector de la fachada cada 3–5 años (según la orientación y la lluvia) y a mantener limpios canalones y bajantes. El interior no necesita nada especial.',
          'Si prefieres olvidarte del mantenimiento, elige fachada de madera termotratada, alerce o un revestimiento mixto de madera y fibrocemento: la estructura sigue siendo de madera, pero la piel exterior aguanta décadas sin tratar. Los fabricantes que sirven en {L} ofrecen las tres opciones.',
        ],
      },
      {
        h2: 'Fabricantes de casas de madera en {L}',
        p: [
          'Aquí reunimos modelos, precios orientativos y fotos de fabricantes de casas de madera que entregan en {L}: cabañas, casas de una y dos plantas, casas de madera modernas y a medida. Todos trabajan con madera certificada, proyecto visado y contrato con precio y plazo cerrados.',
          'Dinos metros, dormitorios y presupuesto, y te enviamos en 24–48 horas propuestas de fabricantes que trabajan en {L}, sin compromiso. Si ya tienes la parcela, el presupuesto llega mucho más ajustado.',
        ],
      },
    ],
  },

  hormigon: {
    a: [
      {
        h2: 'Casas prefabricadas de hormigón en {L}: precios y plazos',
        p: [
          '{P} En {L} el precio final depende del sistema (paneles o módulos completos), de los acabados y de la distancia desde la planta. Es el sistema prefabricado más caro por metro cuadrado, y también el que menos mantenimiento pide y mejor valor de reventa conserva.',
          'El plazo es {T} llave en mano: los paneles se fabrican en planta en 6–8 semanas mientras se ejecuta la cimentación en {L}, y el montaje con grúa se completa en pocos días. Después quedan instalaciones y acabados.',
        ],
      },
      {
        h2: 'Cómo se construye una casa de hormigón prefabricado en {L}',
        p: [
          'El arquitecto del fabricante adapta el modelo a tu parcela en {L} y redacta el proyecto de ejecución; con la licencia concedida se ejecuta la losa o las zapatas. En paralelo, en fábrica se moldean los paneles de muro y forjado con el aislamiento y las instalaciones ya integrados.',
          'Los paneles llegan en camión y se montan con grúa en dos o tres días. Como el hormigón sale de fábrica curado y con acabado, no hay esperas por fraguado ni por lluvia: el plazo se cumple. La casa se entrega con garantía decenal, igual que una obra tradicional.',
        ],
      },
      {
        h2: 'Qué tener en cuenta al comprar una casa de hormigón en {L}',
        p: [
          'Comprueba que la parcela en {L} admite el acceso de un camión con grúa (ancho de calle, pendiente, líneas eléctricas) y pide el estudio geotécnico antes de cerrar el presupuesto: el hormigón pesa más que la madera y la cimentación debe calcularse en consecuencia.',
          'Compara al menos tres fabricantes con el mismo programa de necesidades y fíjate en el espesor del aislamiento, el tipo de carpintería y qué instalaciones entran en el precio. Los mejores fabricantes que sirven en {L} enseñan casas ya entregadas: pide visitarlas.',
        ],
      },
    ],
    b: [
      {
        h2: 'Ventajas del hormigón prefabricado en {L}',
        p: [
          'El mismo material que una casa de obra, pero fabricado en condiciones controladas: sin desviaciones de presupuesto, con plazo cerrado por contrato y con una calidad de acabado imposible de conseguir a pie de obra. En {L} es la opción preferida para vivienda habitual y para toda la vida.',
          'El hormigón armado resiste la humedad, el viento, el fuego y los movimientos sísmicos, no se pudre ni lo atacan los insectos, y con el aislamiento integrado mantiene una temperatura estable tanto en costa como en interior. El mantenimiento se reduce a repintar cada 8–10 años.',
        ],
      },
      {
        h2: 'Financiación de casas prefabricadas de hormigón en {L}',
        p: [
          'Una casa de hormigón prefabricado va anclada al terreno con cimentación, cuenta con proyecto y licencia y se inscribe en el Registro de la Propiedad: es un bien inmueble como cualquier vivienda de {L}, y los bancos la financian con hipoteca hasta el 80 % del valor de tasación.',
          'Durante la construcción el dinero se libera por fases (hipoteca autopromotor), lo que encaja con los pagos escalonados del fabricante. Si ya tienes el terreno, cuenta como aportación y reduce la entrada necesaria. Muchos fabricantes que trabajan en {L} gestionan la financiación.',
        ],
      },
      {
        h2: 'Fabricantes de casas de hormigón en {L}',
        p: [
          'En esta página encontrarás modelos, precios orientativos y fotos de fabricantes de casas prefabricadas de hormigón que entregan en {L}: casas modernas de una y dos plantas, casas modulares y proyectos a medida, todos con proyecto visado y garantía decenal.',
          'Cuéntanos metros, dormitorios y presupuesto, y en 24–48 horas te enviamos propuestas de fabricantes que sirven en {L}, sin compromiso. Con la parcela localizada, el presupuesto llega ya ajustado a tu terreno.',
        ],
      },
    ],
  },

  steel: {
    a: [
      {
        h2: 'Steel Framing en {L}: precios y plazos',
        p: [
          '{P} En {L} el precio final depende del nivel de acabados, de la complejidad de la cubierta y de la distancia desde el taller. Es un sistema algo más caro que la madera y bastante más económico que el hormigón, con una relación calidad-precio muy difícil de igualar.',
          'El plazo es {T} desde la licencia: la estructura de acero galvanizado se fabrica en taller a partir de los planos y se levanta en la parcela de {L} en una o dos semanas. Como es obra en seco, no hay tiempos de fraguado ni esperas por lluvia.',
        ],
      },
      {
        h2: 'Cómo se construye una casa de Steel Framing en {L}',
        p: [
          'Sobre la cimentación (una losa ligera, porque la estructura pesa poco) se montan los paneles de perfiles de acero galvanizado que forman muros, forjados y cubierta. Van cortados y perforados de fábrica según el proyecto visado, así que en {L} el montaje es rápido y preciso.',
          'Después se cierra la envolvente con placas exteriores, aislamiento en cámara y aislamiento continuo por fuera, se pasan las instalaciones por dentro de los perfiles y se termina con placas de yeso, revestimientos y carpinterías. La casa se entrega con garantía decenal.',
        ],
      },
      {
        h2: 'Casas de Steel Framing en {L}: cómo elegir fabricante',
        p: [
          'Pide que el fabricante trabaje con perfiles de acero galvanizado certificados (Z275 o superior), cálculo estructural firmado y aislamiento continuo exterior que corte los puentes térmicos: es lo que distingue una casa de Steel Framing bien hecha en {L} de una barata.',
          'Compara tres presupuestos con el mismo programa de necesidades y visita una casa ya entregada cerca de {L}. Fíjate en el silencio interior, la estabilidad de la temperatura y la calidad de las carpinterías: son los puntos donde más se nota la diferencia.',
        ],
      },
    ],
    b: [
      {
        h2: 'Ventajas del Steel Framing en {L}',
        p: [
          'El acero galvanizado no se pudre, no lo atacan las termitas ni el fuego y aguanta terremotos y vientos fuertes mejor que el ladrillo, gracias a su ligereza y flexibilidad. Su vida útil supera los 100 años y toda la estructura se calcula y certifica según el CTE, como cualquier vivienda en {L}.',
          'Con la cámara rellena de lana mineral y el aislamiento continuo exterior, una casa de Steel Framing en {L} alcanza calificación energética A o B: facturas de climatización muy por debajo de una vivienda tradicional y un confort estable todo el año.',
        ],
      },
      {
        h2: 'Licencia y financiación del Steel Framing en {L}',
        p: [
          'Una casa de Steel Framing es una vivienda fija con cimentación: necesita proyecto visado y licencia de obra del ayuntamiento, y una vez escriturada se financia con hipoteca como cualquier casa de {L}. El terreno debe ser urbanizable; en suelo rústico depende de la normativa autonómica.',
          'Los fabricantes que sirven en {L} suelen encargarse del proyecto y de la tramitación de la licencia, y muchos ofrecen financiación propia o colaboran con entidades bancarias. Pregúntalo al pedir presupuesto: ahorra meses de gestiones.',
        ],
      },
      {
        h2: 'Fabricantes de Steel Framing en {L}',
        p: [
          'Aquí reunimos modelos, precios orientativos y fotos de fabricantes de casas de Steel Framing que entregan en {L}: viviendas de una y dos plantas, casas modernas de cubierta plana, ampliaciones y proyectos a medida, con proyecto visado y garantía decenal.',
          'Dinos metros, dormitorios y presupuesto y te enviamos en 24–48 horas propuestas de fabricantes que trabajan en {L}, sin compromiso. Si ya tienes parcela, el presupuesto llega ajustado a tu terreno.',
        ],
      },
    ],
  },

  casetas: {
    a: [
      {
        h2: 'Casetas prefabricadas en {L}: precios y modelos',
        p: [
          '{P} En {L} el precio final depende del material (madera, resina, metal u hormigón), del grosor de las paredes, de la superficie y de si la caseta se entrega en kit o montada. El transporte y la base se presupuestan aparte.',
          'Los modelos más vendidos en {L} son las casetas de jardín de madera de 3 × 3 m, las de resina sin mantenimiento de 4–6 m² y las casetas de aperos de hormigón para fincas. Para uso profesional, módulos de obra, garitas de vigilancia y quioscos para negocio.',
        ],
      },
      {
        h2: 'Cómo elegir una caseta en {L}',
        p: [
          'Piensa primero en el uso: para guardar herramientas y bicicletas bastan 16–19 mm de pared en madera o una caseta de resina; para taller, despacho o uso diario, 28–44 mm con ventana y suelo; para fincas y almacén agrícola, hormigón prefabricado. Después comprueba en el ayuntamiento de {L} la superficie máxima y la distancia a linderos.',
          'Con el uso y el tamaño claros, compara varios fabricantes con el mismo grosor de pared y el mismo tipo de cubierta: es donde está la diferencia real de calidad. En {L} muchos fabricantes ofrecen instalación por un pequeño extra.',
        ],
      },
      {
        h2: 'Instalación de casetas prefabricadas en {L}',
        p: [
          'Una caseta necesita una base plana y nivelada: losas o rastreles sobre grava para modelos pequeños de madera o resina, y una solera de hormigón de 10–15 cm para casetas grandes, de hormigón o de uso profesional. Elevarla unos centímetros del suelo evita humedades.',
          'Las casetas en kit se montan en {L} entre un día y una semana con dos personas y herramientas básicas; las de hormigón y los módulos de obra llegan montados y se colocan con grúa en una mañana. El plazo desde el pedido es {T}.',
        ],
      },
    ],
    b: [
      {
        h2: 'Licencia para instalar una caseta en {L}',
        p: [
          'Las casetas pequeñas, desmontables y sin cimentación suelen tramitarse en {L} con una declaración responsable o como obra menor. Si lleva solera de hormigón, supera la superficie que fija el ayuntamiento (normalmente 10–25 m²) o se va a usar como vivienda, hace falta licencia de obra.',
          'En suelo rústico, las casetas de aperos son uno de los pocos usos permitidos, siempre vinculadas a la explotación agrícola y con límites de superficie y altura. Consúltalo en el ayuntamiento antes de comprar para elegir el tamaño adecuado.',
        ],
      },
      {
        h2: 'Mantenimiento de las casetas en {L}',
        p: [
          'Las casetas de madera necesitan lasur o aceite protector cada uno o dos años y una revisión de la cubierta; las de resina y plástico, solo limpieza; las metálicas, vigilar tornillos y esquinas por si aparece óxido; las de hormigón, nada en décadas.',
          'En todos los casos conviene que la caseta no toque el suelo húmedo, que el agua de lluvia se evacúe bien y que tenga algo de ventilación para evitar condensaciones. Con eso, una caseta de calidad en {L} dura 15–30 años según el material.',
        ],
      },
      {
        h2: 'Fabricantes de casetas prefabricadas en {L}',
        p: [
          'En esta página encontrarás casetas de jardín, de aperos, de obra, de madera, de resina y de hormigón de fabricantes que sirven en {L}, con medidas, fotos y precios orientativos. Muchas se venden también de segunda mano o en alquiler para obras y eventos.',
          'Cuéntanos el uso, las medidas y tu presupuesto y te enviamos en 24–48 horas propuestas de fabricantes que entregan en {L}, con el transporte incluido en el precio.',
        ],
      },
    ],
  },
};

/* Portadas de línea (sin lugar): dos secciones fijas por línea. */
export const RAIZ = {
  generica: [
    {
      h2: 'Cómo elegir tu casa prefabricada: madera, hormigón o Steel Framing',
      p: [
        'La madera es la más económica, cálida y rápida de montar (600–900 €/m², 3–6 meses); el hormigón, la más robusta y la que menos mantenimiento pide (900–1.500 €/m², 4–9 meses); el Steel Framing, la estructura ligera de acero galvanizado que combina rapidez, resistencia y un aislamiento excelente (desde 450 €/m² terminada).',
        'Los tres sistemas cumplen el Código Técnico de la Edificación, se escrituran y se hipotecan como cualquier vivienda, y se entregan con garantía decenal. La elección depende del presupuesto, del clima de tu parcela y del estilo que buscas; en esta web puedes comparar modelos, precios y fabricantes de los tres.',
      ],
    },
    {
      h2: 'Comprar una casa prefabricada en España: el proceso completo',
      p: [
        'Primero la parcela: suelo urbanizable, edificabilidad y distancias a linderos, que se consultan en el ayuntamiento. Después el modelo, de catálogo o a medida, que el arquitecto del fabricante adapta a tu terreno y presenta con el proyecto visado para la licencia de obra.',
        'Mientras llega la licencia se prepara la cimentación y la casa se fabrica en taller; el montaje en la parcela se resuelve en días o semanas y quedan instalaciones y acabados. El plazo total es de 6 a 9 meses llave en mano, con precio y plazo cerrados por contrato.',
      ],
    },
  ],
  madera: [
    {
      h2: 'Casas de madera prefabricadas: sistemas, precios y plazos',
      p: [
        'Hay tres formas de construir una casa de madera: entramado ligero (la más económica y la más usada), paneles SIP (máximo aislamiento) y madera maciza o troncos (el aspecto más rústico). Según la Asociación Española de Casas de Madera, el precio medio está entre 600 y 900 €/m².',
        'Es el sistema prefabricado más rápido: la estructura se fabrica en taller en 6–10 semanas y se monta en la parcela en una a tres semanas; la casa está lista para entrar a vivir en 3–6 meses desde la licencia. Bien tratada y con los detalles constructivos correctos, dura entre 50 y 100 años.',
      ],
    },
    {
      h2: 'Por qué elegir una casa de madera',
      p: [
        'La madera es un aislante natural, hasta 15 veces mejor que el hormigón: una casa de madera bien construida gasta entre un 30 % y un 50 % menos en calefacción y se mantiene fresca en verano. Es además el material de construcción con menor huella de carbono.',
        'Se escritura, se inscribe en el Registro y se financia con hipoteca como cualquier vivienda; el mantenimiento se reduce a renovar el lasur de la fachada cada 3–5 años, o a nada si eliges madera termotratada o un revestimiento mixto. En esta web encontrarás modelos, precios y fabricantes de casas de madera de toda España.',
      ],
    },
  ],
  hormigon: [
    {
      h2: 'Casas prefabricadas de hormigón: cómo se construyen y qué cuestan',
      p: [
        'Los muros, forjados y cubierta se moldean en planta como paneles o módulos completos, con el aislamiento y las instalaciones ya integrados, y se montan en la parcela con grúa en dos o tres días. El precio está entre 900 y 1.500 €/m² terminada, y el plazo entre 4 y 9 meses llave en mano.',
        'Es el mismo material que una casa de obra, pero fabricado en condiciones controladas: sin desviaciones de presupuesto, con plazo cerrado por contrato y con una calidad de acabado que no se consigue a pie de obra. La casa se entrega con garantía decenal y se hipoteca como cualquier vivienda.',
      ],
    },
    {
      h2: 'Ventajas de una casa de hormigón prefabricado',
      p: [
        'El hormigón armado resiste la humedad, el viento, el fuego y los movimientos sísmicos, no se pudre ni lo atacan los insectos, y con el aislamiento integrado en los paneles mantiene una temperatura estable tanto en la costa como en climas continentales con mucho frío.',
        'El mantenimiento es mínimo (repintar cada 8–10 años) y el valor de reventa es el de una vivienda de obra. Es la opción preferida para vivienda habitual y para casas modernas de líneas rectas y grandes ventanales; en esta web puedes comparar modelos, precios y fabricantes.',
      ],
    },
  ],
  steel: [
    {
      h2: 'Steel Framing: la construcción en seco con estructura de acero',
      p: [
        'El Steel Framing sustituye el ladrillo y el hormigón por una estructura de perfiles de acero galvanizado ligero, ensamblados en paneles que forman muros, forjados y cubierta. Sobre ella van el aislamiento, las placas y los revestimientos. Se usa desde hace décadas en Estados Unidos, Australia y el norte de Europa, y en España está homologado bajo el CTE.',
        'Cuesta desde 360 €/m² en obra gris y desde 450 €/m² terminada, y se construye en 3–5 meses: la estructura se fabrica en taller a partir de los planos y se levanta en la parcela en una o dos semanas, sin tiempos de fraguado ni esperas por lluvia.',
      ],
    },
    {
      h2: 'Ventajas de una casa de Steel Framing',
      p: [
        'El acero galvanizado no se pudre, no lo atacan las termitas ni el fuego y aguanta terremotos y vientos fuertes mejor que el ladrillo. Su vida útil supera los 100 años y toda la estructura se calcula y certifica según el Código Técnico de la Edificación.',
        'Con la cámara rellena de lana mineral y un aislamiento continuo exterior que corta los puentes térmicos, una casa de Steel Framing alcanza calificación energética A o B. Se escritura y se hipoteca como cualquier vivienda; en esta web encontrarás modelos, precios y fabricantes de toda España.',
      ],
    },
  ],
  casetas: [
    {
      h2: 'Casetas prefabricadas: materiales, precios y usos',
      p: [
        'Las casetas van desde unos 600 € en modelos de jardín pequeños hasta 7.000 € o más en casetas grandes de madera aisladas, y las hay de madera (las más bonitas y las que mejor aíslan), de resina y plástico (sin mantenimiento), metálicas (económicas y resistentes) y de hormigón prefabricado (las más duraderas y seguras).',
        'Sirven como trastero de jardín, taller, despacho, almacén de aperos, garaje de bicicletas, refugio para mascotas, módulo de obra, garita de vigilancia o quiosco para negocio. En esta web encontrarás modelos, medidas, precios y fabricantes de toda España.',
      ],
    },
    {
      h2: 'Cómo instalar una caseta prefabricada',
      p: [
        'Comprueba primero en tu ayuntamiento la superficie máxima y la distancia a linderos: las casetas pequeñas y desmontables suelen tramitarse con una declaración responsable, y las que llevan solera o se usan como vivienda necesitan licencia de obra.',
        'Prepara una base plana y nivelada (losas, rastreles sobre grava o una solera de hormigón según el tamaño), monta la caseta en kit entre un día y una semana o deja que la instale el fabricante, y en las de madera aplica el tratamiento protector cuanto antes. Bien colocada, una caseta de calidad dura entre 15 y 30 años.',
      ],
    },
  ],
};

/* Páginas de tema: dos secciones cada una. Cuando la línea es casetas y
   hay una versión propia (casetas:x) se usa esa. Si un tema no tiene
   entrada, la página recibe las secciones de la portada de su línea. */
export const TEMA = {
  precios: [
    {
      h2: 'Cuánto cuesta una {n} en 2026: guía de precios',
      p: [
        '{P} A ese precio hay que sumar lo que no lleva la casa: el terreno, el estudio geotécnico, la cimentación (un 5–10 % del precio), las acometidas de agua y luz, el proyecto de arquitecto (4–8 %), la licencia de obra y los impuestos (ICIO e IVA al 10 % en vivienda nueva).',
        'Un cálculo prudente es sumar entre un 20 % y un 30 % al precio de la casa para tener el coste total. Los modelos de catálogo, las plantas compactas y los acabados de serie son lo que más abarata; el diseño a medida, las cubiertas complejas y los grandes acristalamientos, lo que más encarece.',
      ],
    },
    {
      h2: 'Cómo comparar precios de {N} sin equivocarte',
      p: [
        'Pide siempre presupuestos con el mismo programa de necesidades (metros, dormitorios, plantas y nivel de acabados) y exige el desglose por escrito: dos ofertas con el mismo precio pueden diferir mucho en aislamiento, carpinterías, instalaciones o equipamiento de cocina y baños.',
        'Fíjate en si el precio es en obra gris o llave en mano, si incluye transporte y montaje, y qué garantías ofrece el fabricante. Con la parcela ya localizada, el presupuesto será mucho más ajustado, porque el transporte y la cimentación dejan de ser una estimación.',
      ],
    },
  ],
  planos: [
    {
      h2: 'Planos de {N}: distribuciones que funcionan',
      p: [
        'Las distribuciones más demandadas son las casas de una planta de 80 a 120 m² con dos o tres dormitorios, salón-cocina abierto y porche, y las de dos plantas de 120 a 180 m² con la zona de día abajo y los dormitorios arriba. Para parcelas pequeñas o segunda residencia, los planos de 40 a 60 m² con un dormitorio y altillo.',
        'Al elegir un plano piensa en la orientación: salón y porche al sur para aprovechar el sol en invierno, dormitorios al este, y ventanas pequeñas al norte. Un buen plano ahorra energía durante toda la vida de la casa.',
      ],
    },
    {
      h2: 'Del plano al proyecto: qué exige el ayuntamiento',
      p: [
        'Los planos de esta página son orientativos y sirven para elegir modelo y calcular metros. Para la licencia hace falta un proyecto de ejecución redactado y visado por un arquitecto, que adapta el modelo a tu parcela (retranqueos, alturas, edificabilidad) y a la normativa local.',
        'Los fabricantes de {N} cuentan con arquitectos propios que hacen ese trabajo a partir del plano elegido, y las modificaciones sobre un modelo existente (añadir un dormitorio, ampliar el porche, girar la casa) son mucho más económicas que un diseño desde cero.',
      ],
    },
  ],
  baratas: [
    {
      h2: 'Dónde ahorrar en una {n} barata (y dónde no)',
      p: [
        'Ahorra eligiendo un modelo de catálogo en lugar de un diseño a medida, una planta cuadrada o rectangular sin quiebros, cubierta sencilla, acabados de serie y una superficie ajustada a lo que necesitas. Recibirla en obra gris y terminar el interior por tu cuenta reduce todavía más el precio.',
        'No ahorres en aislamiento, carpinterías, cubierta ni cimentación: son lo que determina el confort y las facturas durante décadas, y cambiarlos después cuesta mucho más que hacerlos bien desde el principio. {P}',
      ],
    },
    {
      h2: 'Ofertas de {N}: cómo reconocer una buena oportunidad',
      p: [
        'Las mejores ofertas son las casas de exposición, los modelos que el fabricante renueva, las promociones de fin de temporada y las casas prefabricadas de segunda mano desmontables. Exige siempre documentación técnica, certificado de conformidad y garantía por escrito.',
        'Desconfía de precios muy por debajo del mercado sin desglose: suelen excluir transporte, montaje, instalaciones o acabados. Una {n} barata de un fabricante serio cumple el Código Técnico igual que una cara; lo que cambia son el tamaño, los acabados y los extras.',
      ],
    },
  ],
  llave: [
    {
      h2: '{N} llave en mano: qué incluye el precio',
      p: [
        'Llave en mano significa que el fabricante se ocupa de todo —proyecto, fabricación, transporte, montaje, instalaciones, acabados interiores y limpieza final— y te entrega la casa lista para entrar a vivir a un precio y un plazo cerrados por contrato. Tú solo aportas el terreno.',
        'Habitualmente quedan fuera el terreno, la cimentación (que depende de cada parcela), las acometidas hasta la red, la licencia, los impuestos y el mobiliario. Pide siempre el desglose por escrito y compara qué incluye cada fabricante antes de firmar.',
      ],
    },
    {
      h2: 'Plazos y garantías de una {n} llave en mano',
      p: [
        'El plazo habitual es {T} desde que se concede la licencia. La casa se fabrica en taller mientras se prepara la cimentación, y el plazo queda fijado en el contrato con penalizaciones por retraso: esa es una de las grandes ventajas frente a una obra tradicional.',
        'La casa se entrega con las garantías legales de cualquier vivienda nueva (10 años para estructura, 3 para habitabilidad y 1 para acabados) más la garantía propia del fabricante sobre carpinterías, cubierta y equipos. Todo por escrito, con precio cerrado.',
      ],
    },
  ],
  venta: [
    {
      h2: 'Comprar {N} en España: cómo elegir bien',
      p: [
        'Compara al menos tres fabricantes con el mismo programa de necesidades, visita una casa ya montada antes de decidir y exige contrato con precio y plazo cerrados, proyecto visado y garantías por escrito. El más barato no siempre es el más completo.',
        'Una {n} nueva te permite elegir distribución y acabados; las de segunda mano o de exposición son más baratas, pero conviene revisar su estado, si son desmontables y si su traslado y nueva instalación son viables. En cualquier caso, pide la documentación técnica.',
      ],
    },
    {
      h2: 'Vender o comprar una {n}: trámites',
      p: [
        'Una casa fija, con cimentación, proyecto y licencia, se compra y se vende como cualquier vivienda: escritura ante notario, inscripción en el Registro de la Propiedad e hipoteca si hace falta. Las casas móviles con ruedas se transmiten como bien mueble, con contrato de compraventa.',
        'Si vas a vender, reúne el proyecto, la licencia, el certificado final de obra, la cédula de habitabilidad y las garantías del fabricante: con esa documentación la venta es rápida y el precio se mantiene, porque una {n} bien construida conserva el valor de una vivienda de obra.',
      ],
    },
  ],
  fabricantes: [
    {
      h2: 'Cómo reconocer a un buen fabricante de {N}',
      p: [
        'Fábrica propia, años de experiencia, casas ya entregadas que se puedan visitar, proyecto visado, certificados de materiales, contrato con precio y plazo cerrados y garantía decenal por escrito. Pide referencias de clientes en tu zona y desconfía de precios muy por debajo del mercado.',
        'La mayoría de fabricantes cuentan con arquitectos que adaptan el modelo a tu parcela, redactan el proyecto y lo presentan en el ayuntamiento, y muchos ofrecen financiación propia o gestionan la hipoteca. Pregúntalo al pedir presupuesto: ahorra meses de gestiones.',
      ],
    },
    {
      h2: 'Fabricantes de {N} por toda España',
      p: [
        'En esta web reunimos fabricantes de casas de madera, de hormigón y de Steel Framing que entregan en toda España, con sus modelos, precios orientativos y fotos. Puedes localizarlos por provincia y pedir presupuesto a los que sirvan en tu zona.',
        'Cuéntanos qué buscas —metros, dormitorios, sistema constructivo, presupuesto y localidad de la parcela— y te enviamos en 24–48 horas propuestas de dos o tres fabricantes comparables, sin compromiso.',
      ],
    },
  ],
  financiacion: [
    {
      h2: 'Hipoteca para {N}: requisitos y pasos',
      p: [
        'Los bancos financian una {n} siempre que vaya anclada al terreno con cimentación, tenga proyecto visado y licencia y se inscriba en el Registro de la Propiedad. Tasan terreno y vivienda y suelen conceder hasta el 80 % del valor; durante la construcción el dinero se libera por fases (hipoteca autopromotor).',
        'Conviene tener ahorrado en torno al 20 % del precio más un 10–12 % para gastos (proyecto, licencia, notaría, impuestos). Si ya tienes el terreno en propiedad, cuenta como aportación y reduce la entrada necesaria: muchos compradores financian así el 100 % de la construcción.',
      ],
    },
    {
      h2: 'Otras formas de financiar una {n}',
      p: [
        'Para importes menores o para casas móviles, que no se pueden hipotecar, la vía es el préstamo personal. Y muchos fabricantes ofrecen financiación propia a través de entidades colaboradoras, con pagos escalonados según avanza la fabricación y el montaje.',
        'Las opciones se pueden combinar: préstamo personal para la entrada e hipoteca para el resto, o financiación del fabricante para la casa e hipoteca sobre el terreno. Pide al fabricante que te explique sus condiciones al solicitar presupuesto.',
      ],
    },
  ],
  catalogo: [
    {
      h2: 'Cómo usar el catálogo de {N}',
      p: [
        'Cada modelo del catálogo lleva sus metros, número de estancias, planos de distribución, fotos y precio orientativo. Empieza por filtrar por tamaño y presupuesto, quédate con dos o tres modelos y pide para ellos un presupuesto con la parcela localizada: es cuando el precio se vuelve real.',
        'Los precios del catálogo son orientativos porque dependen de los acabados elegidos, de la distancia a la fábrica y de la cimentación que exija tu terreno. Con el modelo y la parcela definidos, el fabricante cierra el presupuesto en pocos días.',
      ],
    },
    {
      h2: 'Del modelo de catálogo a tu casa',
      p: [
        'Cualquier modelo del catálogo admite cambios de distribución, acabados, orientación o tamaño. Partir de un modelo es más rápido y económico que un diseño desde cero, porque el fabricante ya tiene resuelta la estructura y las instalaciones y solo adapta lo que tú cambias.',
        'Descarga el catálogo gratis en PDF desde esta página, marca los modelos que te gusten y cuéntanos qué cambiarías: te enviamos el presupuesto ajustado en 24–48 horas.',
      ],
    },
  ],
  imagenes: [
    {
      h2: 'Fotos de {N}: en qué fijarse',
      p: [
        'Las fotos de esta página son de {N} construidas y entregadas, además de renders de modelos nuevos. Fíjate en los detalles que marcan la calidad: el encuentro de la fachada con la cubierta, los aleros, el zócalo, las carpinterías y cómo envejece el revestimiento exterior.',
        'En los interiores, mira la altura de techos, el tamaño de los ventanales y cómo se resuelven salón, cocina y porche: los sistemas prefabricados permiten grandes luces sin pilares intermedios, y las mejores fotos lo muestran.',
      ],
    },
    {
      h2: 'Pide la casa que ves en la foto',
      p: [
        'Cada imagen corresponde a un modelo con sus planos, superficies y precio orientativo. Puedes reproducirlo tal cual o adaptarlo: cambiar el revestimiento, el tamaño del porche o la orientación de las ventanas.',
        'Indícanos qué foto te interesa y la localidad de tu parcela y te enviamos la ficha del modelo con presupuesto ajustado en 24–48 horas, sin compromiso.',
      ],
    },
  ],
  construccion: [
    {
      h2: 'Las cinco fases de la construcción de una {n}',
      p: [
        'Proyecto y licencia (2–4 meses según el ayuntamiento), cimentación y acometidas en la parcela (2–4 semanas), fabricación en taller de los módulos o paneles (en paralelo, 6–10 semanas), transporte y montaje (de dos días a tres semanas) e instalaciones y acabados finales (4–8 semanas).',
        'Todo bajo un contrato con precio y plazo cerrados. La gran diferencia con una obra tradicional de 12–18 meses es que la casa se fabrica mientras se prepara el terreno, sin esperas por lluvia ni tiempos de secado.',
      ],
    },
    {
      h2: 'Cimentación y terreno para una {n}',
      p: [
        'Lo habitual es una losa de hormigón armado o zapatas corridas, definidas por el arquitecto tras el estudio geotécnico. Las {N} son más ligeras que una casa de ladrillo, así que la cimentación es menos profunda y más económica; en terrenos con pendiente se recurre a pilotes o a una plataforma elevada.',
        'Antes de cerrar el presupuesto comprueba el acceso a la parcela para camión y grúa, la disponibilidad de acometidas de agua y luz cerca y la naturaleza del terreno: son los tres factores que más varían el coste de una casa a otra.',
      ],
    },
  ],
  presupuesto: [
    {
      h2: 'Qué necesitamos para darte presupuesto de tu {n}',
      p: [
        'La localidad y, si es posible, la ubicación exacta de la parcela (para transporte, acceso y normativa), su superficie y pendiente, si tiene acometidas de agua y luz cerca, los metros y dormitorios que quieres, el sistema constructivo que prefieres y el nivel de acabados.',
        'Con esos datos te enviamos un presupuesto orientativo en 24–48 horas y, si te encaja, el fabricante visita el terreno y cierra el precio definitivo. El presupuesto es gratuito y sin compromiso; solo se paga el proyecto cuando decides seguir adelante, y se descuenta del precio final.',
      ],
    },
    {
      h2: 'Cómo leer un presupuesto de {n}',
      p: [
        'Comprueba si el precio es en obra gris o llave en mano, si incluye transporte, montaje, instalaciones y acabados, y qué queda fuera (terreno, cimentación, acometidas, licencia e impuestos). Pide el desglose por partidas y las garantías por escrito.',
        'Compara al menos tres presupuestos con el mismo programa de necesidades: es la única forma de que sean comparables. Un cálculo prudente para el coste total es sumar entre un 20 % y un 30 % al precio de la casa.',
      ],
    },
  ],
  modelos: [
    {
      h2: 'Modelos de {N} más vendidos',
      p: [
        'Las casas de una planta de 80 a 120 m² con dos o tres dormitorios y porche, ideales como primera vivienda o segunda residencia; las de dos plantas de 120 a 180 m² para familias; y los modelos pequeños de 40 a 60 m² como casa de invitados, estudio o vivienda mínima.',
        'Todos los modelos se adaptan: cambiar la distribución, añadir un dormitorio o un garaje, ampliar el porche o elegir otro revestimiento. Es la vía más económica para tener una casa a medida, porque parte de una estructura ya resuelta y probada.',
      ],
    },
    {
      h2: 'Cómo elegir el modelo de {n} adecuado',
      p: [
        'Empieza por la parcela: su tamaño, la orientación y lo que permite el ayuntamiento (edificabilidad, retranqueos, alturas). Después define el programa: cuántos dormitorios, una o dos plantas, porche, garaje, y el presupuesto total incluyendo terreno, cimentación y licencias.',
        'Con eso, elige entre los modelos que encajen y pide presupuesto para dos o tres con la parcela localizada. Si dudas entre sistemas constructivos, en esta web puedes comparar el mismo programa en madera, hormigón y Steel Framing.',
      ],
    },
  ],
  amedida: [
    {
      h2: '{N} a medida: cómo es el proceso de diseño',
      p: [
        'Empieza con una reunión para definir el programa de necesidades (metros, estancias, estilo, presupuesto) y las condiciones de la parcela. El arquitecto del fabricante propone un anteproyecto, se ajusta contigo en una o dos rondas y, cuando estás conforme, se redacta el proyecto de ejecución y se visa.',
        'A partir de ahí el proceso es el mismo que con un modelo de catálogo: licencia, cimentación, fabricación en taller y montaje. Cuenta con uno o dos meses más de plazo por la fase de diseño; merece la pena, porque una vez en fábrica los cambios son costosos.',
      ],
    },
    {
      h2: 'Cuánto cuesta una {n} a medida',
      p: [
        'Entre un 10 % y un 25 % más que el modelo de catálogo equivalente, por el trabajo de diseño y por fabricar piezas únicas. {P}',
        'La vía intermedia es partir de un modelo y personalizarlo (distribución, tamaño, fachadas, acabados): suele cubrir el 90 % de las necesidades a un coste mucho menor y con menos plazo. Cuéntanos qué buscas y te decimos cuál de las dos vías te conviene.',
      ],
    },
  ],
  empresas: [
    {
      h2: 'Empresas de {N}: qué comparar antes de contratar',
      p: [
        'Fábrica propia, trayectoria, casas ya construidas que se puedan visitar, contrato con precio y plazo cerrados, proyecto visado y garantías por escrito. Pide referencias de clientes en tu provincia y compara al menos tres presupuestos con el mismo programa de necesidades.',
        'Una empresa de {N} fabrica en planta con procesos industriales y controla la calidad en cada fase; una constructora tradicional ejecuta todo a pie de obra, con más imprevistos y plazos más largos. Ambas entregan una vivienda con las mismas garantías legales.',
      ],
    },
    {
      h2: 'Empresas de {N} en toda España',
      p: [
        'La mayoría trabajan dentro de un radio de transporte razonable desde su fábrica, y algunas tienen delegaciones en varias comunidades. En nuestro directorio puedes localizar empresas por provincia y pedir presupuesto a las que sirvan en tu zona.',
        'Cuéntanos metros, dormitorios, sistema constructivo, presupuesto y localidad de la parcela, y te enviamos en 24–48 horas propuestas de dos o tres empresas comparables, sin compromiso.',
      ],
    },
  ],
  render: [
    {
      h2: 'Diseño 3D de casas prefabricadas: por qué merece la pena',
      p: [
        'Un render muestra cómo quedará la casa por fuera y por dentro —materiales, luces, entorno— antes de fabricarla. Permite tomar decisiones sobre distribución y acabados con seguridad y evita cambios costosos una vez en fábrica, donde cada modificación se paga.',
        'Muchos fabricantes lo incluyen en el proyecto al elegir un modelo o firmar el encargo; como servicio independiente, un render exterior e interior ronda los 150–400 € por vista, importe que suele descontarse si contratas la casa.',
      ],
    },
    {
      h2: 'Qué hace falta para encargar un render',
      p: [
        'Un plano o croquis con medidas, fotos o referencia de la parcela y una idea de los acabados (revestimiento, carpinterías, cubierta). Con eso, en una o dos semanas tienes las vistas 3D para revisar y ajustar antes de pasar a fabricación.',
        'Cuéntanos qué modelo te interesa y te decimos si el fabricante incluye el diseño 3D en el proyecto o cuánto costaría como servicio aparte.',
      ],
    },
  ],
  modernas: [
    {
      h2: 'Casas prefabricadas modernas: diseño y eficiencia',
      p: [
        'Volúmenes limpios de cubierta plana o a un agua, grandes ventanales, fachadas combinadas de hormigón, madera y metal, espacios abiertos y mucha luz. Los sistemas prefabricados encajan especialmente bien con este estilo porque permiten luces amplias sin pilares intermedios.',
        'Suelen ser las casas más eficientes: aislamiento reforzado, ventanas de altas prestaciones orientadas al sur, protecciones solares y climatización eficiente. Muchas alcanzan calificación energética A y algunas se diseñan directamente como casas pasivas.',
      ],
    },
    {
      h2: 'Cuánto cuesta una casa prefabricada moderna',
      p: [
        '{P} El estilo moderno tiende a la gama media-alta por los grandes acristalamientos y los acabados: cuenta con 1.200–1.800 €/m² en modelos de diseño. La planta compacta y la cubierta plana, en cambio, ayudan a contener el precio.',
        'El hormigón prefabricado y el Steel Framing son los sistemas más usados en casas modernas por sus superficies lisas y su capacidad para volar terrazas y cubiertas; la madera funciona igual de bien con revestimientos de listones o paneles lisos.',
      ],
    },
  ],
  minimalistas: [
    {
      h2: 'Casas prefabricadas minimalistas: menos es más',
      p: [
        'Líneas rectas, cubierta plana, pocos materiales (blanco, hormigón visto, madera clara, vidrio), ausencia de ornamentos y espacios diáfanos con almacenamiento oculto. La planta también es sencilla y racional, lo que además abarata la fabricación.',
        'Su geometría simple reduce el coste de estructura y montaje; lo que encarece son los acabados —grandes vidrios, carpinterías ocultas, detalles muy cuidados—, de modo que el precio queda en un rango parecido al de una casa moderna estándar.',
      ],
    },
    {
      h2: 'Qué sistema constructivo va mejor con el estilo minimalista',
      p: [
        'El hormigón prefabricado, por sus superficies lisas y su capacidad para volar terrazas y cubiertas, y el Steel Framing, por su ligereza y precisión. La madera también funciona con revestimientos de listones o paneles lisos.',
        'En todos los casos la clave está en el detalle constructivo: encuentros limpios, carpinterías enrasadas y una envolvente muy bien aislada para que los grandes vidrios no penalicen el consumo. Pide ver casas terminadas del fabricante antes de decidir.',
      ],
    },
  ],
  mediterraneas: [
    {
      h2: 'Casas prefabricadas mediterráneas: pensadas para el sol',
      p: [
        'Muros blancos o en tonos tierra, cubierta plana o de teja árabe, porches, pérgolas y patios, ventanas con contraventanas y una relación fuerte entre interior y exterior. Están diseñadas para el clima cálido: muros con inercia, sombras y ventilación cruzada.',
        'El hormigón prefabricado es el sistema más natural para este estilo por su inercia térmica, que mantiene la casa fresca de día y templada de noche; el Steel Framing y la madera funcionan igual con revestimientos claros, aislamiento reforzado y buenas protecciones solares.',
      ],
    },
    {
      h2: 'Casas prefabricadas para la costa',
      p: [
        'Los materiales se especifican para ambiente marino: hormigón con recubrimientos adecuados, acero galvanizado, carpinterías de aluminio lacado o PVC y herrajes inoxidables. Conviene indicarlo al fabricante desde el principio para que ajuste las especificaciones.',
        'En la costa importan también la orientación (porches y grandes huecos protegidos del sol de tarde), la ventilación cruzada y las protecciones solares exteriores. Con eso, una casa mediterránea prefabricada apenas necesita aire acondicionado.',
      ],
    },
  ],
  pasivas: [
    {
      h2: 'Casas prefabricadas pasivas: consumo casi nulo',
      p: [
        'Diseñadas según el estándar Passivhaus: aislamiento muy grueso, ventanas de triple vidrio, hermeticidad al aire, sin puentes térmicos y ventilación mecánica con recuperación de calor. Consumen hasta un 90 % menos en calefacción y refrigeración que una casa convencional y mantienen una temperatura estable todo el año.',
        'Cuestan entre un 5 % y un 15 % más que la misma casa en estándar normal; ese sobrecoste se recupera en pocos años con el ahorro en facturas, y la casa gana confort, silencio, calidad del aire y valor de reventa.',
      ],
    },
    {
      h2: 'Por qué la prefabricación es ideal para una casa pasiva',
      p: [
        'La hermeticidad y la ausencia de puentes térmicos, que son lo más difícil de conseguir a pie de obra, se controlan con precisión en fábrica. Los paneles llegan con el aislamiento y las membranas ya integrados, y el test de hermeticidad (blower door) se supera con margen.',
        'Madera, Steel Framing y hormigón sirven para una casa pasiva; lo que cambia es el espesor de la envolvente y el cuidado en los encuentros. Pide al fabricante experiencia certificada en Passivhaus antes de contratar.',
      ],
    },
  ],
  modulares: [
    {
      h2: 'Casas prefabricadas modulares: el sistema más industrializado',
      p: [
        'Módulos tridimensionales completos —con instalaciones, suelos y acabados— que se fabrican en planta y se transportan en camión para unirse en la parcela. En fábrica se ejecuta hasta el 90 % de la vivienda, y el montaje en el terreno dura de uno a tres días con grúa.',
        'Contando proyecto, licencia, cimentación y fabricación, una casa modular está lista en 4–6 meses: es el sistema prefabricado más rápido de todos. Los módulos pueden ser de madera, de Steel Framing o de hormigón.',
      ],
    },
    {
      h2: 'Ampliar una casa modular',
      p: [
        'Es una de sus grandes ventajas: se pueden añadir módulos nuevos (un dormitorio, un despacho, una segunda planta) sin obras mayores en la casa existente. Conviene preverlo en el proyecto inicial para dejar preparadas la cimentación y las conexiones.',
        'También se pueden trasladar: un módulo se desconecta, se carga en camión y se vuelve a instalar en otra parcela. Para casas de vacaciones, alquiler turístico o familias que crecen, la modularidad es la solución más flexible.',
      ],
    },
  ],
  moviles: [
    {
      h2: 'Casas prefabricadas móviles: sin cimentación y sin obra',
      p: [
        'Viviendas sobre un chasis con ruedas (mobile homes) o diseñadas para transportarse y reubicarse sin obra: se apoyan sobre una base nivelada y se conectan a las acometidas. Son la opción habitual para campings, parcelas con permiso temporal o segunda residencia económica.',
        'Cuestan desde 20.000–30.000 € en modelos de 30–40 m² hasta 60.000–80.000 € en mobile homes de 80–100 m² con dos o tres dormitorios y acabados de vivienda. Al no ser bien inmueble no se hipotecan, pero sí se financian con préstamo personal o del fabricante.',
      ],
    },
    {
      h2: 'Licencia y normativa de las casas móviles',
      p: [
        'Al no ser una edificación fija, en muchos municipios basta una autorización o declaración responsable, siempre que conserve las ruedas y no se ancle al terreno. Si se instala de forma permanente o en suelo rústico, cada ayuntamiento y comunidad autónoma aplica su criterio.',
        'Consúltalo antes de comprar: la diferencia entre una instalación temporal y una permanente cambia por completo los trámites. Los fabricantes de casas móviles conocen la normativa de cada zona y te orientan.',
      ],
    },
  ],
  contenedores: [
    {
      h2: 'Casas prefabricadas con contenedores: cómo se hacen',
      p: [
        'Se construyen a partir de contenedores marítimos de 20 o 40 pies, reforzados, aislados y unidos entre sí para formar viviendas de 15 a 150 m². Son casas de estética industrial, muy resistentes, rápidas de instalar y fáciles de transportar o ampliar añadiendo módulos.',
        'Cuestan desde 15.000–25.000 € por un contenedor de 40 pies acondicionado como vivienda hasta 60.000–90.000 € en casas de tres o cuatro contenedores con acabados completos. El aislamiento y las instalaciones son lo que más pesa en el precio.',
      ],
    },
    {
      h2: 'Habitabilidad y licencia de una casa contenedor',
      p: [
        'Un contenedor sin aislar es inhabitable: hace falta aislamiento por dentro o por fuera (poliuretano proyectado, lana de roca o paneles SIP), ventanas de calidad y ventilación. Bien ejecutada, una casa contenedor cumple el Código Técnico y mantiene una temperatura estable todo el año.',
        'Como vivienda fija necesita proyecto visado y licencia de obra igual que cualquier casa; anclada y escriturada, se puede hipotecar. Pide al fabricante experiencia demostrable en contenedores y visita alguna casa terminada.',
      ],
    },
  ],
  cube: [
    {
      h2: 'Casas prefabricadas Cube: pequeñas, modernas y listas en un día',
      p: [
        'Viviendas modulares compactas de forma cúbica, normalmente de 25 a 60 m² por módulo, con diseño moderno, grandes ventanales y acabados de serie. Se fabrican completas en taller, se transportan en camión y se instalan en un día; varios cubos pueden unirse para formar casas mayores.',
        'Cuestan desde 25.000–35.000 € en modelos de 25–30 m² hasta 60.000–90.000 € en casas de dos o tres cubos con 60–90 m². El precio suele incluir instalaciones, cocina y baño montados; se añaden transporte, base y acometidas.',
      ],
    },
    {
      h2: 'Para qué sirve una casa Cube',
      p: [
        'Como vivienda mínima, casa de invitados, despacho en el jardín, estudio, alojamiento turístico o casa de fin de semana. Su tamaño y su precio la hacen ideal para parcelas pequeñas y como primera vivienda económica de una o dos personas.',
        'Según el uso y la instalación (fija o desmontable), la licencia va de una declaración responsable a una licencia de obra completa. Consúltalo en el ayuntamiento antes de comprar; el fabricante te ayuda con la documentación.',
      ],
    },
  ],
  lujo: [
    {
      h2: 'Casas prefabricadas de lujo: arquitectura de autor con plazos de fábrica',
      p: [
        'Viviendas de diseño de 200 a 500 m² con grandes acristalamientos, materiales nobles (piedra, madera maciza, hormigón visto), domótica integral, piscina, spa o garaje para varios coches. Se fabrican con los mismos sistemas prefabricados pero con especificaciones de alta gama y proyecto a medida.',
        'Cuestan a partir de 1.800–2.500 €/m², es decir, desde unos 400.000 € en adelante según superficie, materiales y equipamiento: un 15–30 % menos que la misma casa construida de forma tradicional, y con un plazo mucho más corto.',
      ],
    },
    {
      h2: 'Prefabricado no se nota: la calidad está en el detalle',
      p: [
        'La prefabricación es un proceso de construcción, no un estilo: la casa terminada es indistinguible de una obra convencional de alta gama. La precisión de fábrica permite detalles —carpinterías ocultas, juntas perfectas, grandes voladizos— difíciles de conseguir a pie de obra.',
        'Elige un fabricante con experiencia en proyectos de este nivel, arquitecto propio y casas terminadas que puedas visitar. En esta web encontrarás fabricantes de casas prefabricadas de lujo en madera, hormigón y Steel Framing.',
      ],
    },
  ],
  grandes: [
    {
      h2: 'Casas de madera grandes: estructura y precio',
      p: [
        'Hay casas de madera de 200, 300 y hasta 500 m² en una o dos plantas, con garaje, porches y distribuciones familiares. Se resuelven con entramado ligero o con madera laminada (CLT y vigas GL), que permite luces de más de 10 metros sin pilares.',
        'El precio por metro cuadrado baja al aumentar el tamaño: una casa de madera de 200 m² se mueve entre 130.000 y 180.000 € llave en mano (650–900 €/m²), y una de 300 m² desde unos 190.000 €. Los extras de gama alta pueden elevar el precio a 1.200 €/m².',
      ],
    },
    {
      h2: 'Plazos y montaje de una casa de madera grande',
      p: [
        'De 5 a 8 meses desde la licencia, algo más que un modelo estándar por el volumen de fabricación y de acabados. La estructura completa, incluso en casas de 300 m², se levanta en dos o tres semanas.',
        'Para casas grandes conviene un buen estudio de orientación y de zonificación (zona de día, zona de noche, invitados) y prever desde el proyecto la climatización por zonas: es lo que hace que una casa grande sea cómoda y económica de mantener.',
      ],
    },
  ],
  pequenas: [
    {
      h2: 'Casas de madera pequeñas: precio y licencia',
      p: [
        'Una casa de madera de 36 m² puede salir desde 8.000 € en kit para montar, y desde 20.000–25.000 € montada con instalaciones y aislamiento; los modelos de 50 m² con un dormitorio rondan los 21.000–30.000 €. Son la opción más económica para vivienda mínima, casa de invitados o estudio.',
        'Si va a ser vivienda habitable necesita proyecto y licencia de obra aunque sea pequeña; si es una construcción auxiliar sin cimentación, muchos ayuntamientos la tramitan como obra menor o declaración responsable, con límites de superficie que varían entre 10 y 40 m².',
      ],
    },
    {
      h2: 'Cómo aprovechar el espacio en una casa de madera pequeña',
      p: [
        'Planta abierta con cocina integrada en el salón, altillo para dormir aprovechando la altura de la cubierta, armarios empotrados en tabiques, puertas correderas y un porche que amplíe la zona de estar con buen tiempo. Las ventanas grandes hacen que 40 m² parezcan muchos más.',
        'Elige muros de 44 mm o más con aislamiento si vas a usarla en invierno, y prevé desde el principio la instalación eléctrica y de agua: añadirlas después en una casa pequeña es complicado.',
      ],
    },
  ],
  jardin: [
    {
      h2: 'Casas de madera para jardín: usos y modelos',
      p: [
        'Construcciones de madera de 5 a 40 m² que se instalan en el jardín como trastero, taller, despacho, casa de invitados o refugio de verano. Van desde casetas sencillas de paredes de 19 mm hasta casas de madera de 44–70 mm aisladas, con ventanas, porche y posibilidad de instalación eléctrica.',
        'Cuestan desde 1.000–2.000 € en modelos de 6–9 m² con paredes de 19–28 mm, hasta 8.000–15.000 € en casas de 20–30 m² con paredes gruesas, aislamiento y suelo. El montaje en kit es sencillo; muchos fabricantes ofrecen instalación por un pequeño extra.',
      ],
    },
    {
      h2: 'Licencia y base para una casa de madera en el jardín',
      p: [
        'Para las pequeñas y desmontables, sin cimentación, suele bastar una declaración responsable o una licencia de obra menor; a partir de cierta superficie (10–25 m² según el ayuntamiento) o si lleva solera y se usa como vivienda, licencia de obra mayor.',
        'Prepara una base plana y nivelada (losas, rastreles sobre grava o una solera de hormigón según el tamaño), deja distancia a los linderos y aplica el tratamiento protector a la madera cuanto antes: son las tres claves para que dure.',
      ],
    },
  ],
  cabanas: [
    {
      h2: 'Cabañas de madera: precios y tipos',
      p: [
        'Desde 8.000–15.000 € en cabañas de 20–30 m² en kit, hasta 40.000–70.000 € en cabañas de 60–80 m² montadas, aisladas y con baño y cocina. Los troncos macizos y las vigas vistas encarecen frente al entramado ligero, pero dan el aspecto rústico que se busca en una cabaña.',
        'Se usan como refugio de fin de semana, casa de vacaciones, alojamiento rural o vivienda mínima. Para vivir todo el año necesitan paredes de al menos 70 mm o doble pared con aislamiento, cubierta y suelo aislados, ventanas de doble vidrio y calefacción.',
      ],
    },
    {
      h2: 'Licencia para una cabaña de madera',
      p: [
        'Para uso de vivienda habitual necesita proyecto y licencia como cualquier casa; para uso ocasional en parcela rústica, la normativa varía mucho por comunidad autónoma y conviene consultarla en el ayuntamiento antes de comprar.',
        'Los fabricantes de cabañas conocen los límites de superficie y altura de cada zona y adaptan el modelo para que encaje en la licencia que puedas obtener. Pide ver cabañas ya montadas: el envejecimiento de la madera dice mucho de la calidad.',
      ],
    },
  ],
  cobertizos: [
    {
      h2: 'Cobertizos de madera: modelos y precios',
      p: [
        'Cerrados (tipo caseta), abiertos (leñeros, porches) o adosados a la casa, para guardar herramientas, leña, bicicletas, muebles de jardín o maquinaria, o como taller y zona cubierta al aire libre. Se fabrican en madera tratada en autoclave y se montan en kit en unas horas.',
        'Cuestan desde 300–600 € en cobertizos pequeños y leñeros, hasta 2.000–4.000 € en cobertizos de 10–15 m² con puerta y ventana. El grosor de la madera (16, 19 o 28 mm) y la cubierta (tela asfáltica o tejas) marcan la diferencia de precio.',
      ],
    },
    {
      h2: 'Instalar un cobertizo: licencia y base',
      p: [
        'Los cobertizos pequeños, desmontables y sin cimentación normalmente no requieren más que una comunicación al ayuntamiento; los de mayor tamaño o con solera pueden necesitar licencia de obra menor. Ten en cuenta también las distancias a lindero que fije tu municipio.',
        'Móntalo sobre una base nivelada y elevada del suelo, orienta la abertura a resguardo del viento dominante y aplica el tratamiento protector el primer año: un cobertizo de madera bien colocado dura 15–20 años.',
      ],
    },
  ],
  cocheras: [
    {
      h2: 'Cocheras de madera: garajes cerrados y carports',
      p: [
        'Garajes cerrados con puerta basculante o corredera, cocheras abiertas tipo carport con pilares y cubierta, y modelos mixtos con trastero. Se fabrican en madera laminada o maciza tratada, para uno o dos coches, y se montan en kit o las instala el fabricante en uno o dos días.',
        'Un carport abierto para un coche ronda los 1.500–3.000 €; un garaje cerrado de madera para un vehículo, 5.000–9.000 €; y para dos coches con trastero, 9.000–15.000 €. Se añade la solera de hormigón y, si procede, la puerta motorizada.',
      ],
    },
    {
      h2: 'Licencia para una cochera de madera',
      p: [
        'Normalmente licencia de obra menor si es un carport abierto y de obra mayor si es un garaje cerrado con solera, según el ayuntamiento. Computa como superficie construida, así que revisa la edificabilidad y los retranqueos de tu parcela.',
        'Elige madera laminada para luces amplias sin pilares intermedios, y una cubierta con pendiente y canalón para evacuar bien el agua: son los dos detalles que más diferencian una cochera duradera.',
      ],
    },
  ],
  pergolas: [
    {
      h2: 'Pérgolas de madera: tipos y precios',
      p: [
        'Adosadas a la fachada para cubrir una terraza, exentas para crear una zona de estar en el jardín, o con cubierta (policarbonato, tejas o lona) para protegerse de la lluvia. La madera laminada permite mayores luces; la maciza tratada en autoclave es más económica.',
        'Cuestan desde 400–800 € en pérgolas sencillas de 3 × 3 m en kit, hasta 3.000–6.000 € en pérgolas grandes de madera laminada con cubierta y montaje incluido. El anclaje al suelo (dados de hormigón o placas) se presupuesta aparte.',
      ],
    },
    {
      h2: 'Instalar una pérgola: licencia y anclaje',
      p: [
        'Las pérgolas abiertas y desmontables suelen tramitarse con una declaración responsable o no requieren licencia según el municipio; si lleva cubierta cerrada y se ancla con obra puede necesitar licencia de obra menor. Consúltalo en tu ayuntamiento.',
        'Ancla siempre los pilares (placas sobre solera o dados de hormigón) y deja la madera separada del suelo con pies metálicos: así no se pudre la base, que es donde fallan las pérgolas mal instaladas.',
      ],
    },
  ],
  perfiles: [
    {
      h2: 'Perfiles de Steel Framing: tipos y características',
      p: [
        'Perfiles de acero galvanizado conformados en frío: montantes tipo C (PGC) y canales tipo U (PGU), en espesores de 0,9 a 2,5 mm y alturas de 90 a 200 mm, separados cada 40 o 60 cm. Con ellos se forman paneles de muro, vigas de forjado y cerchas de cubierta, unidos con tornillos autoperforantes.',
        'El galvanizado en caliente (Z275 o superior) protege el acero durante toda la vida útil de la casa, más de 100 años en condiciones normales, y la estructura queda dentro de la envolvente, seca y ventilada.',
      ],
    },
    {
      h2: 'Dónde comprar perfiles de Steel Framing',
      p: [
        'En distribuidores de acero y en los propios fabricantes de casas de Steel Framing, que los sirven cortados a medida y preperforados a partir de los planos. Para un proyecto de vivienda es mejor comprar el paquete estructural completo, con cálculo y certificación incluidos.',
        'Si vas a autoconstruir, pide perfiles con marcado CE, el cálculo estructural firmado y las instrucciones de montaje del fabricante; el Steel Framing es rápido y preciso, pero exige seguir el proyecto al milímetro.',
      ],
    },
  ],
  alquiler: [
    {
      h2: 'Alquiler de casetas: precios y modalidades',
      p: [
        'El alquiler de casetas de obra o módulos prefabricados ronda los 80–200 € al mes según tamaño y equipamiento (aseos, oficina, almacén), más transporte e instalación. Para eventos y ferias se alquilan por días o semanas. A partir de 18–24 meses suele compensar la compra.',
        'Se alquilan casetas de obra (oficina, vestuario, almacén), módulos sanitarios, garitas de vigilancia, quioscos y stands para ferias y eventos, y módulos de vivienda temporal, todos entregados montados y listos para conectar.',
      ],
    },
    {
      h2: 'Qué incluye el alquiler de una caseta',
      p: [
        'Normalmente el transporte y la instalación se cobran aparte, en función de la distancia y de si hace falta grúa. Pide el presupuesto completo con entrega, retirada y, si procede, conexión de agua y electricidad, y comprueba las condiciones de mantenimiento y seguro.',
        'Cuéntanos el uso, el tamaño y los meses que la necesitas, y te enviamos propuestas de alquiler o de compra (nueva o de segunda mano) para que compares cuál te sale mejor.',
      ],
    },
  ],
  aperos: [
    {
      h2: 'Casetas de aperos: materiales y precios',
      p: [
        'Pequeñas construcciones de 4 a 20 m² para guardar herramientas y maquinaria agrícola o de jardín, en madera, chapa u hormigón prefabricado. Las de hormigón son las más duraderas y seguras frente a robos; las de madera, las más económicas y fáciles de montar.',
        'Cuestan desde 500–1.000 € en casetas de madera o chapa de 4–6 m², hasta 3.000–6.000 € en casetas de hormigón prefabricado de 10–20 m² instaladas. Las de hormigón requieren solera y transporte con grúa.',
      ],
    },
    {
      h2: 'Caseta de aperos en suelo rústico',
      p: [
        'Es uno de los pocos usos permitidos en suelo rústico, siempre que esté vinculada a la explotación agrícola y respete los límites de superficie y altura que fije tu comunidad autónoma (habitualmente 10–20 m² y 3 m). Necesitarás licencia de obra menor y no puede destinarse a vivienda.',
        'Los fabricantes conocen los límites de cada zona y adaptan las medidas para que la caseta encaje en la licencia. Pide la solera incluida en el presupuesto si no quieres ocuparte de la base.',
      ],
    },
  ],
  campo: [
    {
      h2: 'Casetas de campo: modelos y precios',
      p: [
        'Construcciones prefabricadas pensadas para fincas y parcelas rústicas: almacén de aperos, refugio de fin de semana o pequeña vivienda de recreo. Se fabrican en madera, hormigón o mixtas, de 10 a 60 m², con o sin porche, y se entregan montadas o en kit.',
        'Cuestan desde 2.000–4.000 € en casetas de madera de 10–15 m², hasta 15.000–30.000 € en casetas de hormigón o madera de 30–60 m² con porche, instalaciones y acabados de vivienda.',
      ],
    },
    {
      h2: 'Instalar una caseta de campo en tu finca',
      p: [
        'Para uso agrícola (aperos, almacén) sí, con licencia de obra menor y respetando los límites de superficie de tu comunidad. Para uso de vivienda o recreo en suelo rústico la normativa es más restrictiva y varía mucho por comunidad autónoma: consúltalo en el ayuntamiento antes de comprar.',
        'Prevé el acceso del camión, una base nivelada y, si la caseta va a tener agua y luz, la distancia a las acometidas o una solución autónoma (depósito, placas solares). El fabricante te orienta según la parcela.',
      ],
    },
  ],
  ferias: [
    {
      h2: 'Casetas de ferias: comprar o alquilar',
      p: [
        'Módulos prefabricados desmontables para ferias, mercados, eventos y fiestas: stands, barras, quioscos y casetas de feria tradicionales, en madera, aluminio o estructura metálica con lona. Se montan en horas y se pueden alquilar o comprar.',
        'Para un evento puntual, alquilar (desde 100–300 € por evento según tamaño). Si participas en varias ferias al año o eres ayuntamiento, asociación o feriante, comprar compensa a partir del segundo o tercer uso: una caseta de 3 × 3 m cuesta desde 1.500–3.000 €.',
      ],
    },
    {
      h2: 'Normativa y seguridad de las casetas de feria',
      p: [
        'Deben ser estables frente al viento, con anclajes, y cumplir la normativa de seguridad de la instalación (materiales ignífugos, instalación eléctrica certificada). El organizador o el ayuntamiento indica los requisitos; los fabricantes entregan certificados de homologación.',
        'Pide casetas con rotulación personalizable, mostrador y cierre con cerradura, y comprueba el peso y el volumen plegado si vas a transportarlas tú: son los detalles que hacen que una caseta de feria sea práctica de verdad.',
      ],
    },
  ],
  obra: [
    {
      h2: 'Casetas de obra: tipos y precios',
      p: [
        'Módulos prefabricados de estructura metálica y panel sándwich, de 3 a 12 m de largo, usados como oficina, vestuario, comedor, almacén o aseo en obras de construcción. Se entregan montados, equipados y listos para conectar; se pueden comprar nuevos, de segunda mano o alquilar.',
        'Nuevos, desde 3.000–5.000 € un módulo de 6 m sin equipar y 6.000–12.000 € con ventanas, instalación eléctrica y aseo. De segunda mano, desde 1.500 €. En alquiler, 80–200 € al mes más transporte.',
      ],
    },
    {
      h2: 'Otros usos de una caseta de obra',
      p: [
        'Con aislamiento reforzado, ventanas de doble vidrio, climatización e instalaciones certificadas, se usan como oficinas, aulas, consultas, puntos de venta o viviendas temporales. Para uso permanente como vivienda debe cumplir la normativa de habitabilidad y contar con licencia.',
        'Los módulos se acoplan entre sí y se apilan en dos alturas, así que una instalación puede crecer sin obra. Pide al fabricante el certificado de homologación y la ficha técnica del panel sándwich.',
      ],
    },
  ],
  plastico: [
    {
      h2: 'Casetas de plástico: ventajas y límites',
      p: [
        'Para almacenaje en el jardín no se pudren, no se oxidan, resisten la lluvia y los rayos UV y no necesitan mantenimiento; son las más fáciles de montar. Aíslan poco y son menos robustas que la madera o el metal, por lo que no valen como taller o zona de estar.',
        'Cuestan desde 200–400 € en armarios de resina de 1–2 m², hasta 1.500–2.500 € en casetas de plástico de 6–10 m² con ventana y suelo. Entre medias, las de 4–5 m² rondan los 600–1.000 €.',
      ],
    },
    {
      h2: 'Cómo instalar una caseta de plástico',
      p: [
        'Sobre una base plana y nivelada (losas o una solera ligera) y siempre anclada al suelo con el kit de anclaje: sin anclaje, una caseta de resina vacía puede volcar con vientos fuertes.',
        'Elige paneles gruesos con protección UV y refuerzos metálicos en cubierta y suelo si vas a guardar peso; son los detalles que separan una caseta de plástico que dura diez años de una que se deforma el primer verano.',
      ],
    },
  ],
  resina: [
    {
      h2: 'Casetas de resina: la gama alta del plástico',
      p: [
        'La resina (polipropileno o polietileno de alta densidad con tratamiento UV) es más rígida y gruesa que el plástico corriente, con acabado que imita la madera y garantía de hasta 10 años frente a decoloración y grietas. Son las casetas de plástico de mejor calidad.',
        'Cuestan desde 400–700 € en modelos de 2–3 m², hasta 2.000–3.500 € en casetas de resina de 8–12 m² con ventanas, claraboya y suelo reforzado. Cuanto más gruesos los paneles, más cara y más duradera.',
      ],
    },
    {
      h2: 'Mantenimiento e instalación de una caseta de resina',
      p: [
        'Ninguno: basta con lavarla con agua y jabón. No hay que pintarla ni tratarla, los paneles no se decoloran y la humedad no la afecta. Solo conviene revisar los anclajes al suelo una vez al año.',
        'Móntala sobre una base nivelada, ancla la estructura y, si la zona es ventosa, elige un modelo con refuerzos metálicos en la cubierta. El montaje se hace entre dos personas en 3–6 horas sin herramientas especiales.',
      ],
    },
  ],
  vigilancia: [
    {
      h2: 'Casetas de vigilancia: modelos y precios',
      p: [
        'Módulos prefabricados compactos (de 1,5 × 1,5 m a 3 × 3 m) para control de accesos, garitas de seguridad, peajes o puntos de información, en hormigón, acero o panel sándwich, con ventanas de gran visibilidad, aislamiento, instalación eléctrica y climatización opcional.',
        'Cuestan desde 2.000–3.500 € en garitas básicas de panel sándwich, hasta 6.000–12.000 € en casetas de hormigón o acero con vidrio de seguridad, climatización y aseo. Se entregan montadas y se instalan en un día.',
      ],
    },
    {
      h2: 'Personalizar una caseta de vigilancia',
      p: [
        'Dimensiones, número y tipo de ventanas, vidrio blindado, puertas de seguridad, mostrador, aseo, climatización y rotulación corporativa. Los fabricantes las adaptan al uso: control de acceso a urbanización, obra, aparcamiento o industria.',
        'Prevé una base nivelada, la acometida eléctrica y, si va en vía pública, la autorización municipal. Pide el certificado de homologación y la ficha técnica de los materiales.',
      ],
    },
  ],
  bicicletas: [
    {
      h2: 'Casetas para bicicletas: qué modelo elegir',
      p: [
        'Para 2–4 bicis, una caseta baja de madera o resina de 1,2–1,5 m de alto y 2–2,5 m de ancho, con doble puerta frontal o tapa abatible. Para más bicis o bicicletas eléctricas, una caseta de jardín estándar con enchufe para cargar. Lo importante es una buena cerradura y el anclaje al suelo.',
        'Cuestan desde 300–600 € en modelos de resina o metal para dos o tres bicis, hasta 1.000–2.500 € en casetas de madera de 3–5 m² con puerta con cerradura. Los aparcamientos cubiertos para comunidades y empresas se presupuestan a medida.',
      ],
    },
    {
      h2: 'Seguridad de una caseta para bicicletas',
      p: [
        'Las de metal y las de madera de 19–28 mm con cerradura de seguridad y anclaje al suelo ofrecen buena protección; las de resina son más fáciles de forzar. Dentro, ancla las bicis con un candado en U a un punto fijo para sumar una segunda barrera.',
        'Si la caseta va en un patio comunitario, consulta a la comunidad de propietarios y al ayuntamiento; los modelos para comunidades incluyen cerradura por usuario, anclajes individuales y punto de carga para eléctricas.',
      ],
    },
  ],
  gatos: [
    {
      h2: 'Casas de madera para gatos: cómo deben ser',
      p: [
        'Pequeñas (40–60 cm), elevadas del suelo, con tejado inclinado, entrada reducida para retener el calor y, a ser posible, dos aberturas para que el gato no se sienta atrapado. Madera tratada, aislamiento en paredes y suelo y una manta térmica por dentro son las claves para el invierno.',
        'Cuestan desde 40–80 € en casetas sencillas, hasta 150–300 € en casas de madera aisladas, con terraza, rascador o dos plantas. Las casetas para colonias felinas, de hormigón o madera gruesa, rondan los 200–400 €.',
      ],
    },
    {
      h2: 'Dónde colocar la casa del gato',
      p: [
        'En un rincón resguardado del viento y la lluvia, a la sombra en verano y con la entrada orientada hacia una pared o un seto, nunca hacia el viento dominante. Sobre una base elevada (palé o ladrillos) para aislarla de la humedad del suelo.',
        'Renueva el tratamiento de la madera una vez al año, cambia la manta cada temporada y revisa que la entrada no se bloquee con hojas o nieve. Con eso, una casa de madera para gatos dura muchos años.',
      ],
    },
  ],
  perros: [
    {
      h2: 'Casas de madera para perros: tamaño y precio',
      p: [
        'El perro debe poder entrar, girarse y tumbarse estirado: como regla, el largo interior igual a 1,2 veces la longitud del perro y la altura igual a 1,2 veces su altura hasta la cruz. Una caseta demasiado grande no retiene el calor; mejor ajustada que enorme.',
        'Cuestan desde 60–120 € en casetas de madera para razas pequeñas, 150–300 € para razas medianas y grandes, y 300–600 € en modelos aislados, con porche o techo abatible para limpiar. Las de hormigón o resina para exterior duro rondan los 200–400 €.',
      ],
    },
    {
      h2: 'Aislar la caseta del perro para el invierno',
      p: [
        'Elévala del suelo, coloca aislamiento (poliestireno o lana) en paredes, suelo y techo bajo un segundo panel de madera, añade una cortina de lamas en la entrada y una cama elevada o manta térmica. Orienta la puerta contra el viento dominante y sitúala en un lugar resguardado.',
        'En verano, busca sombra y ventilación: un techo abatible o una ventana lateral evitan que la caseta se convierta en un horno. Renueva el tratamiento de la madera cada año y limpia el interior con frecuencia.',
      ],
    },
  ],
  negocio: [
    {
      h2: 'Casetas para negocio: modelos y precios',
      p: [
        'Quioscos, puestos de mercado, taquillas, cafeterías de temporada, casetas de venta en gasolineras o aparcamientos y oficinas de atención al público, en madera, acero o panel sándwich, con mostrador, ventana de despacho, instalación eléctrica, rotulación y equipamiento a medida.',
        'Cuestan desde 3.000–6.000 € en quioscos y puestos básicos de 4–8 m², hasta 12.000–30.000 € en módulos comerciales de 15–30 m² con acabados, instalaciones, climatización y aseo. La inversión es mucho menor que una obra convencional y la caseta se puede trasladar.',
      ],
    },
    {
      h2: 'Licencias para instalar una caseta de negocio',
      p: [
        'Licencia de actividad y, según el emplazamiento, licencia de ocupación de vía pública (si es suelo municipal) o de obra menor (si es parcela privada). Los ayuntamientos suelen exigir certificados de homologación de la caseta y de su instalación eléctrica.',
        'Los fabricantes entregan la documentación técnica necesaria y adaptan la caseta a los requisitos del ayuntamiento (accesibilidad, salidas, materiales). Pide un render con tu rotulación antes de fabricar.',
      ],
    },
  ],
  metalicas: [
    {
      h2: 'Casetas metálicas: ventajas y precios',
      p: [
        'Son las más económicas por metro cuadrado, muy resistentes al fuego, a los insectos y a la pudrición, y se montan en pocas horas. La chapa de acero galvanizado o lacado aguanta décadas a la intemperie. A cambio aíslan poco y suenan con la lluvia, por lo que se usan sobre todo como almacén, garaje o taller.',
        'Cuestan desde 250–500 € en casetas de chapa de 2–4 m², hasta 1.500–3.000 € en casetas metálicas de 10–15 m² con puerta doble y ventana. Los garajes y naves ligeras de acero para uno o dos coches se mueven entre 3.000 y 8.000 €.',
      ],
    },
    {
      h2: 'Instalación y mantenimiento de una caseta metálica',
      p: [
        'Móntala sobre una base nivelada y separada del suelo húmedo, con el kit de anclaje, y sella las juntas de la cubierta. Los puntos débiles son los tornillos, los cortes y las esquinas: revísalos una vez al año y retoca con imprimación antióxido si aparece alguna marca.',
        'Si vas a usarla como taller, añade un aislamiento interior de panel sándwich o lana con placa: convierte una caseta de chapa en un espacio utilizable todo el año por poco dinero.',
      ],
    },
  ],
  casetasmadera: [
    {
      h2: 'Casetas de madera: grosor de pared y precio',
      p: [
        'Para almacenaje, 16–19 mm bastan. Para taller, despacho o uso frecuente, 28–34 mm. Si quieres una caseta habitable en invierno, 44–70 mm o doble pared con aislamiento. El grosor determina la rigidez, el aislamiento y la durabilidad.',
        'Cuestan desde 600–1.200 € en casetas de 4–6 m² de 19 mm, hasta 4.000–8.000 € en casetas de 15–25 m² de 44 mm con suelo, ventanas y porche. La instalación por el fabricante suele costar un 10–15 % del precio.',
      ],
    },
    {
      h2: 'Proteger una caseta de madera',
      p: [
        'Aplica un tratamiento protector (lasur o aceite) justo después del montaje y renuévalo cada 1–2 años; monta la caseta sobre una base elevada y nivelada; cubre el tejado con tela asfáltica o tejas; y deja ventilación para evitar condensaciones.',
        'Elige madera tratada en autoclave si la caseta va a estar muy expuesta, y comprueba que la puerta y las ventanas llevan junta: son los detalles que hacen que una caseta de madera dure 20 años en vez de 5.',
      ],
    },
  ],
  casetashormigon: [
    {
      h2: 'Casetas de hormigón prefabricado: ventajas y precios',
      p: [
        'Es la caseta más resistente y segura: no se pudre, no arde, no la fuerzan fácilmente y no necesita mantenimiento en décadas. Ideal para casetas de aperos, de obra, de vigilancia, cuartos de bombas, de contadores o trasteros en fincas. Se sirve montada y se coloca con grúa en unas horas.',
        'Cuestan desde 1.500–3.000 € en casetas de 4–6 m² (cuartos de contadores, aperos), hasta 6.000–15.000 € en casetas de 15–30 m² con puerta metálica, ventanas y acabados. Hay que sumar la solera de hormigón y el transporte con grúa.',
      ],
    },
    {
      h2: 'Base e instalación de una caseta de hormigón',
      p: [
        'Una solera de hormigón armado nivelada, de 10–15 cm de espesor, algo mayor que la caseta. Al pesar varias toneladas, el camión grúa debe poder acceder hasta el punto de instalación. Con la solera preparada, la instalación se completa en una mañana.',
        'En suelo rústico, comprueba los límites de superficie y altura de tu comunidad y tramita la licencia de obra menor antes de encargar la caseta; el fabricante entrega la documentación técnica necesaria.',
      ],
    },
  ],
};

/* Versiones para casetas de los temas compartidos con las casas. */
TEMA['casetas:precios'] = [
  {
    h2: 'Precios de casetas prefabricadas: de qué dependen',
    p: [
      '{P} Lo que más pesa es el material (resina, chapa, madera u hormigón), el grosor de las paredes (de 16 a 70 mm en madera), la superficie, si lleva suelo, ventanas y aislamiento, y si se entrega en kit o montada.',
      'A ese precio hay que sumar la base (losas, rastreles o una solera de hormigón, entre 100 y 600 € según el tamaño), el transporte, el montaje si no lo haces tú (un 10–15 %) y el tratamiento protector en las de madera. Si va a tener luz, la instalación eléctrica certificada.',
    ],
  },
  {
    h2: 'Cómo conseguir una caseta al mejor precio',
    p: [
      'Elige el tamaño justo para lo que vas a guardar, compara varios fabricantes con el mismo grosor de pared y el mismo tipo de cubierta, aprovecha las ofertas de fin de temporada (otoño e invierno) y móntala tú mismo si el modelo lo permite.',
      'No ahorres en la base ni en la cubierta: son lo que hace que la caseta dure. Y pide garantía por escrito: un buen fabricante da al menos dos años en madera tratada y hasta diez en resina.',
    ],
  },
];
TEMA['casetas:planos'] = [
  {
    h2: 'Planos de casetas: medidas habituales',
    p: [
      'De 2 × 2 m a 3 × 3 m para herramientas y bicicletas; de 3 × 4 m a 4 × 5 m para taller o despacho; y a partir de 5 × 5 m para casetas habitables o de almacén agrícola. La altura interior útil suele estar entre 2 y 2,5 m.',
      'Antes de elegir, comprueba los retranqueos y la superficie máxima que permite tu municipio, y mide el hueco disponible dejando espacio para abrir las puertas y para pasar alrededor de la caseta.',
    ],
  },
  {
    h2: 'Del plano a la caseta a medida',
    p: [
      'La mayoría de fabricantes adaptan sus modelos (medidas, posición de puertas y ventanas, tipo de cubierta) o construyen casetas a medida partiendo de tu croquis. Es la solución cuando la caseta debe encajar en un hueco concreto o adosarse a un muro.',
      'Si vas a pedir licencia, el ayuntamiento suele aceptar los planos del fabricante para una caseta desmontable; para casetas con solera o de uso habitable, hará falta un proyecto técnico.',
    ],
  },
];
TEMA['casetas:baratas'] = [
  {
    h2: 'Casetas baratas: qué se puede esperar por cada precio',
    p: [
      'Desde 200–400 € en armarios de resina y 500–800 € en casetas de madera de 19 mm o de chapa de 4–6 m²; con 1.000–1.500 € ya tienes una caseta de madera de 28 mm con ventana y suelo, suficiente para herramientas, bicicletas o un pequeño taller.',
      'Las paredes finas (16–19 mm) aíslan poco y se mueven con la humedad, así que no sirven para uso habitable. Si el uso va a ser diario, subir a 28 mm cuesta poco más y la caseta dura el doble.',
    ],
  },
  {
    h2: 'Cómo encontrar casetas baratas de calidad',
    p: [
      'Compara el grosor de pared y el tipo de cubierta, no solo el precio; busca madera tratada en autoclave o resina con protección UV; aprovecha ofertas de fin de temporada y modelos de exposición; y monta la caseta tú mismo.',
      'Un buen fabricante barato da garantía de al menos dos años y entrega instrucciones de montaje claras. Desconfía de casetas sin marca ni ficha técnica.',
    ],
  },
];
TEMA['casetas:llave'] = [
  {
    h2: 'Casetas llave en mano: qué incluye',
    p: [
      'La caseta se entrega montada e instalada en tu parcela, con suelo, cubierta, ventanas, tratamiento protector y, si lo pides, instalación eléctrica, lista para usar el mismo día. Como extras se suelen añadir solera de hormigón, aislamiento, canalones y suelo interior.',
      'Es la opción más cómoda para casetas grandes, de hormigón o de uso profesional. Pide el presupuesto con transporte, montaje y base incluidos para poder comparar entre fabricantes.',
    ],
  },
  {
    h2: 'Plazos de una caseta llave en mano',
    p: [
      'Entre una y cuatro semanas desde el pedido, según el modelo y la distancia. La instalación en sí se completa en un día para casetas de madera de hasta 20 m² y en una mañana para las de hormigón, siempre que la base esté preparada y el camión pueda acceder.',
      'Si necesitas licencia (solera, superficie grande o uso habitable), tramítala antes de encargar la caseta: es lo único que puede alargar el plazo.',
    ],
  },
];
TEMA['casetas:venta'] = [
  {
    h2: 'Casetas en venta: cómo comparar ofertas',
    p: [
      'Compara el grosor de pared, el tipo de cubierta, si incluye suelo y ventanas, y lo que entra en el precio (transporte, montaje, base). Dos casetas con el mismo precio pueden tener paredes de 16 y de 28 mm, y la diferencia en durabilidad es enorme.',
      'Las casetas de obra y los módulos prefabricados de segunda mano son una buena compra si la estructura está sana: se ahorra hasta un 60 %. En casetas de madera usadas revisa pudrición en la base y el estado de la cubierta.',
    ],
  },
  {
    h2: 'Garantía de una caseta prefabricada',
    p: [
      'La garantía legal de dos años para cualquier producto nuevo, más la del fabricante, que en madera tratada y resina suele ser de 5 a 10 años frente a pudrición o decoloración. Guarda la factura y sigue las instrucciones de montaje y tratamiento: son la condición de la garantía.',
      'Cuéntanos el uso, las medidas y tu presupuesto y te enviamos propuestas de fabricantes que entregan en tu zona con el transporte incluido en el precio.',
    ],
  },
];
TEMA['casetas:imagenes'] = [
  {
    h2: 'Fotos de casetas: en qué fijarse',
    p: [
      'Las fotos de esta página son de casetas de jardín, de aperos, de obra, de madera, de resina y de hormigón ya instaladas. Fíjate en el grosor visible de las paredes, en cómo se resuelve la cubierta y el canalón, en la base sobre la que van montadas y en el estado de la madera con el tiempo.',
      'En los interiores, mira el aprovechamiento del espacio: estanterías, altura útil y ventilación. Son los detalles que hacen que una caseta sea práctica de verdad.',
    ],
  },
  {
    h2: 'Pide la caseta que ves en la foto',
    p: [
      'Cada imagen corresponde a un modelo con sus medidas y su precio orientativo. Indícanos la foto que te interesa y la localidad, y te enviamos la ficha completa con transporte incluido.',
      'Casi todos los modelos admiten cambios de medida, posición de puertas y ventanas y color del tratamiento; los de hormigón y los módulos de obra se personalizan por completo.',
    ],
  },
];
TEMA['casetas:construccion'] = [
  {
    h2: 'Cómo se fabrica una caseta prefabricada',
    p: [
      'Las de madera se fabrican en taller con paredes de tablas machihembradas o paneles, se envían en kit numerado y se montan sobre una base nivelada en un día. Las de hormigón se moldean en planta como una pieza o varios paneles y se colocan con grúa. Las de obra y vigilancia son estructura metálica con panel sándwich, entregadas montadas.',
      'En todos los casos el trabajo en la parcela se reduce a la base y a las conexiones: por eso una caseta se instala en horas y no en semanas.',
    ],
  },
  {
    h2: 'Montar la caseta tú mismo',
    p: [
      'Sí, en la mayoría de modelos de madera y resina: vienen con instrucciones, piezas numeradas y tornillería, y se montan entre dos personas con herramientas básicas en 4–10 horas. Las casetas de hormigón, las muy grandes y las de uso profesional las instala el fabricante.',
      'Prepara antes la base (losas, rastreles sobre grava o solera según el tamaño), comprueba que está a nivel y deja el tratamiento protector aplicado en la primera semana.',
    ],
  },
];
TEMA['casetas:modelos'] = [
  {
    h2: 'Modelos de casetas más vendidos',
    p: [
      'Las casetas de jardín de madera de 3 × 3 m con paredes de 28 mm, las de resina de 4–6 m² sin mantenimiento y las casetas de aperos de hormigón de 6–10 m². Para uso profesional, los módulos de obra de 6 m y las garitas de vigilancia de 2 × 2 m.',
      'Casi todos admiten cambiar las medidas, añadir ventanas, elegir el lado de la puerta, subir el grosor de pared, añadir porche o cambiar la cubierta a dos aguas.',
    ],
  },
  {
    h2: 'Cómo elegir el modelo de caseta adecuado',
    p: [
      'Piensa primero en el uso (almacén, taller, despacho, animales, negocio), después en el sitio disponible y en la normativa municipal (superficie máxima y distancia a linderos), y por último en el material y el grosor de pared que exige ese uso.',
      'Con eso, compara modelos con las mismas prestaciones y pide presupuesto con transporte a tu localidad: es la única forma de que los precios sean comparables.',
    ],
  },
];
TEMA['casetas:catalogo'] = [
  {
    h2: 'Cómo usar el catálogo de casetas',
    p: [
      'Cada modelo lleva sus medidas exteriores e interiores, el grosor de pared, el tipo de cubierta, si incluye suelo y ventanas, fotos y precio orientativo. Filtra por uso y por tamaño, quédate con dos o tres modelos y pide presupuesto con transporte a tu localidad.',
      'Los precios del catálogo son orientativos porque dependen del transporte, de la base y de los extras (montaje, aislamiento, electricidad). Con el modelo elegido, el fabricante cierra el presupuesto en pocos días.',
    ],
  },
  {
    h2: 'Del catálogo a tu caseta',
    p: [
      'Cualquier modelo admite cambios de medida, posición de puertas y ventanas, color del tratamiento o tipo de cubierta; los de hormigón y los módulos de obra se personalizan por completo.',
      'Descarga el catálogo gratis en PDF desde esta página, marca los modelos que te gusten y cuéntanos qué cambiarías: te enviamos el presupuesto ajustado en 24–48 horas.',
    ],
  },
];
TEMA['casetas:presupuesto'] = [
  {
    h2: 'Qué necesitamos para darte presupuesto de tu caseta',
    p: [
      'El uso (almacén, taller, despacho, animales, negocio), las medidas aproximadas, el material que prefieres, la localidad de entrega, si quieres montaje incluido y si hace falta base o instalación eléctrica.',
      'Con esos datos te enviamos un presupuesto con transporte incluido en 24–48 horas, sin compromiso. Si nos mandas una foto del sitio donde irá la caseta, el presupuesto llega todavía más ajustado.',
    ],
  },
  {
    h2: 'Cómo leer un presupuesto de caseta',
    p: [
      'Comprueba el grosor de pared, si incluye suelo, ventanas y cubierta impermeabilizada, si el precio es en kit o montada, y qué queda fuera (transporte, base, tratamiento, electricidad). Pide la garantía por escrito.',
      'Compara al menos tres presupuestos con las mismas prestaciones: es la única forma de que sean comparables.',
    ],
  },
];
