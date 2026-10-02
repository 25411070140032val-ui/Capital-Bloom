import biome1DryJungleImg from '../assets/images/biome_dry_jungle_1790448305159.jpg';
import biome2RainforestImg from '../assets/images/biome_tropical_forest_1790365158003.jpg';
import biome3PineForestImg from '../assets/images/biome_temperate_woods_1790365167594.jpg';
import biome4OakForestImg from '../assets/images/biome_oak_forest_1790448316887.jpg';
import biome5MonarchForestImg from '../assets/images/biome_monarch_forest_1790448326691.jpg';
import biome6ConiferRiverImg from '../assets/images/biome_conifer_river_1790448336561.jpg';
import biome7CloudForestImg from '../assets/images/biome_cloud_forest_1790448346179.jpg';
import biome8SaltFlatsImg from '../assets/images/biome_salt_flats_1790448358578.jpg';
import biome9RedCanyonImg from '../assets/images/biome_red_canyon_1790448367447.jpg';
import biome10DesertOasisImg from '../assets/images/biome_desert_oasis_1790365176593.jpg';
import biome11MountainPassImg from '../assets/images/biome_mountain_pass_1790448377872.jpg';
import biome12GlacierPeakImg from '../assets/images/biome_glacier_peak_1790448389161.jpg';
import biome13ParamoImg from '../assets/images/biome_high_paramo_1790365186719.jpg';
import biome14VolcanicAuroraImg from '../assets/images/biome_volcanic_aurora_1790448398817.jpg';

export interface VideoScene {
  step: number;
  title: string;
  narration: string;
  visualKeyMetric: string;
  visualContext: string;
}

export interface SequenceChallenge {
  prompt: string;
  correctOrder: string[];
  explanation: string;
}

export interface FrontalLobeDilemma {
  scenarioTitle: string;
  context: string;
  impulseOption: {
    label: string;
    dopamineTrap: string;
    financialImpactMXN: number;
  };
  resilientOption: {
    label: string;
    cognitiveBenefit: string;
    financialImpactMXN: number;
  };
}

export interface QuizQuestion {
  id: string;
  conceptTag: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BiomeModule {
  id: number;
  stage: 1 | 2;
  title: string;
  subtitle: string;
  biomeName: string;
  biomeFamily: 'tropical' | 'temperate' | 'desert' | 'paramo';
  imageUrl: string;
  durationMinutes: number;
  coreCompetency: string;
  summary: string;
  theoryParagraphs: string[];
  levelAdaptation: {
    seedMode: string;
    flightMode: string;
  };
  curiousFact: {
    stat: string;
    fact: string;
    source: string;
  };
  shortVideoCapsule: {
    title: string;
    durationLabel: string;
    scenes: VideoScene[];
  };
  sequenceActivity: SequenceChallenge;
  dilemmaChallenge: FrontalLobeDilemma;
  quiz: QuizQuestion[];
}

export const BIOME_MODULES: BiomeModule[] = [
  {
    id: 1,
    stage: 1,
    title: 'El Origen del Dinero (Ganar)',
    subtitle: 'Del cacao prehispánico a generar valor real',
    biomeName: 'Selva tropical seca',
    biomeFamily: 'tropical',
    imageUrl: biome1DryJungleImg,
    durationMinutes: 3,
    coreCompetency: 'Generación de valor e ingresos formales vs. informales',
    summary:
      'Descubre por qué el dinero es energía de tiempo almacenada y cómo funcionan los tres motores productivos de México.',
    theoryParagraphs: [
      'Antes de ahorrar o invertir, hay que entender de dónde brota el dinero. En el México prehispánico se usaban semillas de cacao y mantas de algodón porque tenían valor directo. Hoy, el peso mexicano es dinero fiduciario respaldado por la productividad del país y la estabilidad del Banco de México (Banxico).',
      'En México, el PIB (~2.12 billones USD, FMI 2026) se mueve en tres motores: Primario (4%, agroindustria como aguacate y frutos rojos), Secundario (32%, manufactura automotriz, aeroespacial y electrónica) y Terciario (64%, comercio, turismo y servicios). Más del 50% de las personas trabaja en la informalidad (INEGI, 2025), lo que da efectivo rápido pero sin acceso a seguridad social ni crédito barato.',
    ],
    levelAdaptation: {
      seedMode:
        'Si tus ingresos vienen de becas, apoyos para transporte o proyectos de fin de semana, trata cada peso como "energía de tu tiempo" para que no se evapore el primer día.',
      flightMode:
        'Si ya generas ingresos por prácticas, empleo o proyectos freelance, conocer el Régimen Simplificado de Confianza (RESICO, tasa de 1% a 2.5% de ISR) te permite entrar a la formalidad conservando tu liquidez.',
    },
    curiousFact: {
      stat: '54.8% Informalidad Laboral',
      fact: 'Más de la mitad de la fuerza laboral en México opera en la economía informal (INEGI, 2025). Aunque entrega efectivo inmediato, frena la productividad y deja a los hogares sin escudo ante imprevistos.',
      source: 'INEGI (2025) · Sistema de Cuentas Nacionales',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: Del Cacao al Nearshoring',
      durationLabel: '01:15 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'El problema del trueque',
          narration:
            'Si tenías maíz y querías calzado, necesitabas que el artesano quisiera maíz ese mismo día. El dinero nació como tecnología para guardar tu tiempo y esfuerzo.',
          visualKeyMetric: '100 granos de cacao = 1 canoa de agua dulce',
          visualContext: 'Evolución del intercambio en Mesoamérica',
        },
        {
          step: 2,
          title: 'Los 3 motores de riqueza en México',
          narration:
            'El 64% del PIB viene de servicios y comercio, el 32% de manufactura avanzada y el 4% del campo. Tus ingresos crecen cuando resuelves problemas más valiosos.',
          visualKeyMetric: '64% Servicios · 32% Industria · 4% Agro',
          visualContext: 'Estructura productiva nacional (INEGI / FMI 2026)',
        },
        {
          step: 3,
          title: 'Formalidad inteligente con RESICO',
          narration:
            'Estar en la economía formal te abre historial y tasas bajas. Con esquemas como RESICO pagas entre 1% y 2.5% de impuestos mientras construyes reputación financiera.',
          visualKeyMetric: '1.0% – 2.5% tasa ISR en RESICO',
          visualContext: 'Transición hacia la formalidad financiera',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena los pasos para transformar una habilidad en patrimonio real:',
      correctOrder: [
        'Desarrollar una habilidad útil que resuelva un problema real',
        'Recibir un ingreso monetario (beca, sueldo o proyecto)',
        'Separar primero tu porcentaje semilla (ahorro/custodia)',
        'Multiplicar el excedente en instrumentos que superen la inflación',
      ],
      explanation:
        'El error más común es gastar apenas entra el dinero y tratar de ahorrar "lo que sobre". La secuencia ganadora protege tu semilla primero.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'Ingreso Extra de Fin de Semana ($1,200 MXN)',
      context:
        'Acabas de recibir $1,200 MXN por colaborar en un proyecto el fin de semana. Tu grupo de amigos propone gastar $950 MXN hoy mismo en comida rápida y compras dentro de un juego.',
      impulseOption: {
        label: 'Gastar los $950 MXN hoy porque "para eso trabajé"',
        dopamineTrap:
          'Pico de dopamina de 45 minutos seguido de quedarte con solo $250 MXN para toda la quincena.',
        financialImpactMXN: -950,
      },
      resilientOption: {
        label: 'Apartar $600 MXN a tu fondo semilla y destinar $200 MXN a convivir sin excesos',
        cognitiveBenefit:
          'Entrenas tu corteza prefrontal: convives con tus amigos sin destruir el 80% de tu esfuerzo.',
        financialImpactMXN: 600,
      },
    },
    quiz: [
      {
        id: 'b1_q1',
        conceptTag: 'Origen del Dinero y PIB',
        question: '¿Cuál es el sector económico que aporta la mayor proporción (~64%) al Producto Interno Bruto de México?',
        options: [
          'Sector Terciario (Comercio, servicios, logística y turismo)',
          'Sector Primario (Agricultura y ganadería exclusivamente)',
          'Emisión de billetes nuevos por parte de bancos privados',
          'Importación de videojuegos y plataformas digitales',
        ],
        correctIndex: 0,
        explanation:
          'El Sector Terciario representa cerca del 64% del PIB nacional y es el mayor empleador del país, seguido por el Secundario (~32%) y el Primario (~4%).',
      },
      {
        id: 'b1_q2',
        conceptTag: 'Economía Informal en México',
        question: 'Según datos del INEGI (2025), ¿qué vulnerabilidad principal conlleva que más del 50% de la población trabaje en la informalidad?',
        options: [
          'Carencia de seguridad social, menor productividad y falta de acceso a financiamiento formal',
          'Que el dinero recibido en efectivo no sirve para comprar alimentos',
          'Que el Banco de México prohíbe ahorrar en cuentas digitales',
          'Que las monedas pierden su peso físico cada mes',
        ],
        correctIndex: 0,
        explanation:
          'La informalidad impide cotizar en seguridad social o construir historial financiero, dejando a los hogares expuestos ante cualquier choque económico.',
      },
      {
        id: 'b1_q3',
        conceptTag: 'Valor del Dinero Fiduciario',
        question: '¿Qué respalda realmente el valor del peso mexicano en tu bolsillo hoy en día?',
        options: [
          'La actividad productiva del país y el mandato constitucional de estabilidad de Banxico',
          'Lingotes de cacao guardados en cada sucursal bancaria',
          'La cantidad de colores impresos en el billete',
          'El número de seguidores que tienen las fintechs en redes sociales',
        ],
        correctIndex: 0,
        explanation:
          'El dinero fiduciario mantiene su valor gracias a la producción real de bienes y servicios del país y al control de la inflación por parte del Banco de México.',
      },
    ],
  },
  {
    id: 2,
    stage: 1,
    title: 'Mentalidad Financiera',
    subtitle: 'El Costo de Oportunidad y la Batalla contra el Impulso',
    biomeName: 'Selva tropical húmeda',
    biomeFamily: 'tropical',
    imageUrl: biome2RainforestImg,
    durationMinutes: 3,
    coreCompetency: 'Entrenamiento del lóbulo frontal contra el neuromarketing y micropagos',
    summary:
      'Domina el Costo de Oportunidad y descubre cómo los algoritmos y micropagos intentan secuestrar tu dopamina.',
    theoryParagraphs: [
      'El sistema límbico del cerebro reacciona en milisegundos ante ofertas relámpago, mientras que la corteza prefrontal (la que planea tu futuro) necesita unos segundos extra para evaluar. El neuromarketing digital explota esto con contadores regresivos y "monedas virtuales" que disfrazan el precio real en pesos.',
      'El Costo de Oportunidad es el valor de la mejor alternativa que sacrificas al elegir algo. Cuando gastas $150 MXN diarios en antojos o micropagos ($4,500 MXN al mes), no solo pierdes ese efectivo: sacrificas los $54,000 MXN anuales más rendimientos que habrían pagado tu equipo, tu viaje o tu primera inversión.',
    ],
    levelAdaptation: {
      seedMode:
        'Ojo con las monedas virtuales (gemas, diamantes, pases de batalla): están diseñadas para que olvides cuántas semanas de ahorro representan en el mundo real.',
      flightMode:
        'Cuidado con las entregas a domicilio con sobreprecio del 40% y compras con 1 clic. Antes de pagar, convierte el precio en pesos a horas reales de tu esfuerzo.',
    },
    curiousFact: {
      stat: 'Regla de las 72 Horas (-78% Impulso)',
      fact: 'Posponer una compra no esencial durante 72 horas reduce hasta en un 78% la probabilidad de hacer el gasto impulsivo, pues deja que baje el pico de dopamina anticipatoria.',
      source: 'CONDUSEF (2024) · Economía Conductual',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: Dopamina Prestada vs. Logro Real',
      durationLabel: '01:20 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'El truco del pago con 1 toque',
          narration:
            'Pagar con billetes activaba una señal cerebral de freno. Pagar con un clic anestesia esa alerta para que gastes hasta un 35% más sin darte cuenta.',
          visualKeyMetric: '+35% gasto promedio al eliminar fricción visual',
          visualContext: 'Neurociencia del consumo digital',
        },
        {
          step: 2,
          title: 'Traduce precios a Horas de Vida',
          narration:
            'Si generas $60 MXN por hora libre, un artículo de moda de $1,800 MXN no cuesta dinero: cuesta 30 horas completas de tu tiempo.',
          visualKeyMetric: '$1,800 MXN ÷ $60/h = 30 horas de tu tiempo',
          visualContext: 'Cálculo directo del Costo de Oportunidad',
        },
        {
          step: 3,
          title: 'El escudo de las 72 Horas',
          narration:
            'Cuando veas un letrero de "últimas horas", manda el producto a una lista de espera de 3 días. Si después de 72 horas sigue siendo útil, decides con mente fría.',
          visualKeyMetric: '72 horas de enfriamiento cognitivo',
          visualContext: 'Protocolo anti-impulso Capital Bloom',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena el protocolo mental cuando aparece una "oferta relámpago" en tu pantalla:',
      correctOrder: [
        'Detener el pulgar y detectar el disparador emocional (urgencia o presión social)',
        'Convertir el precio en pesos a horas de esfuerzo o semanas de ahorro',
        'Aplicar el enfriamiento de 72 horas fuera del carrito de compra',
        'Comparar contra tu meta principal (Costo de Oportunidad)',
      ],
      explanation:
        'Poner una pausa consciente entre el anuncio y el botón de pago le devuelve el volante a tu corteza prefrontal.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'Skin y Pase "Edición Limitada" ($480 MXN)',
      context:
        'Un juego lanza un paquete cosmético por $480 MXN con un reloj que expira hoy a medianoche. En el chat grupal todos dicen que lo van a comprar ya.',
      impulseOption: {
        label: 'Comprarlo de inmediato por miedo a quedarme fuera (FOMO)',
        dopamineTrap:
          'En 2 semanas saldrá otro cosmético nuevo y esos $480 MXN habrán perdido el 100% de su liquidez.',
        financialImpactMXN: -480,
      },
      resilientOption: {
        label: 'Cerrar la tienda virtual y mandar esos $480 MXN a mi meta de inversión',
        cognitiveBenefit:
          'Cambias la dopamina fugaz del gasto por la satisfacción real de ver subir tu barra de patrimonio.',
        financialImpactMXN: 480,
      },
    },
    quiz: [
      {
        id: 'b2_q1',
        conceptTag: 'Costo de Oportunidad',
        question: '¿Qué es exactamente el "Costo de Oportunidad" en tus finanzas personales?',
        options: [
          'El valor de la mejor alternativa que renuncias a obtener cuando decides gastar tu dinero en otra cosa',
          'La comisión que te cobra el cajero automático por consultar tu saldo',
          'El descuento que ponen las tiendas departamentales a mitad de año',
          'El precio de envío en una plataforma de comercio electrónico',
        ],
        correctIndex: 0,
        explanation:
          'Cada peso tiene un único destino posible a la vez: gastarlo en consumo efímero implica renunciar al rendimiento que habría tenido en tu meta.',
      },
      {
        id: 'b2_q2',
        conceptTag: 'Neuromarketing y Micropagos',
        question: '¿Por qué muchos juegos y apps convierten tu dinero real en "gemas, monedas o diamantes" antes de comprar?',
        options: [
          'Para disociar psicológicamente el gasto del valor real en pesos y reducir la sensación de pérdida',
          'Porque el Banco de México obliga a usar monedas de fantasía en internet',
          'Para que los servidores pesen menos megabytes',
          'Para devolverte intereses bancarios cada fin de año',
        ],
        correctIndex: 0,
        explanation:
          'Al usar divisas ficticias con conversiones confusas (ej. 800 gemas = $179 MXN), el cerebro pierde la referencia del costo real.',
      },
    ],
  },
  {
    id: 3,
    stage: 1,
    title: 'Definir una Meta Financiera',
    subtitle: 'La Arquitectura del Propósito',
    biomeName: 'Bosque templado de pino',
    biomeFamily: 'temperate',
    imageUrl: biome3PineForestImg,
    durationMinutes: 3,
    coreCompetency: 'Diseño de metas cuantificables con horizonte temporal',
    summary:
      'Ahorrar "por si acaso" falla ante el primer antojo. Construye metas con nombre, monto exacto y cuota semanal automática.',
    theoryParagraphs: [
      'Un pino templado concentra su energía en crecer hacia arriba con raíces firmes. En finanzas, decir "quiero ahorrar" es tan vago que tu cerebro lo olvida frente a la primera tentación.',
      'La Arquitectura del Propósito convierte deseos sueltos en metas con estructura: 1) Nombre específico, 2) Monto exacto en MXN, 3) Fecha en el calendario (Corto: <1 año, Mediano: 1–3 años, Largo: >3 años) y 4) Cuota semanal o quincenal separada al principio.',
    ],
    levelAdaptation: {
      seedMode:
        'Parte cualquier meta grande en tajadas semanales: juntar $2,400 MXN en 6 meses son exactamente $100 MXN por semana ($14.30 MXN al día).',
      flightMode:
        'Activa 3 apartados simultáneos: 1) Fondo de Paz Mental (imprevistos), 2) Herramienta de impulso (equipo, cursos, movilidad) y 3) Crecimiento compuesto.',
    },
    curiousFact: {
      stat: '+42% Probabilidad de Logro',
      fact: 'Ponerle nombre específico, monto exacto y cuota semanal fija a una meta financiera eleva en 42% la tasa de éxito frente a guardar dinero en una cuenta sin etiquetar.',
      source: 'OCDE (2023) · Behavioural Financial Insights',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: Ingeniería de una Meta en 3 Pasos',
      durationLabel: '01:10 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'Por qué falla el ahorro sin nombre',
          narration:
            'Si tienes $1,500 MXN sueltos en tu cuenta, tu mente lee "dinero libre para gastar". Si ese apartado se llama "Mi Laptop Nueva $12,000", tocarlo para un antojo activa una alerta.',
          visualKeyMetric: 'Etiquetado mental = Escudo conductual',
          visualContext: 'Contabilidad mental (Richard Thaler)',
        },
        {
          step: 2,
          title: 'Divide y vencerás',
          narration:
            'Divide el costo total entre las semanas disponibles. $3,600 MXN en 18 semanas se vuelve un reto alcanzable de $200 MXN por semana.',
          visualKeyMetric: '$3,600 MXN ÷ 18 semanas = $200 MXN/sem',
          visualContext: 'Fraccionamiento de metas',
        },
        {
          step: 3,
          title: 'Alinea plazo con instrumento',
          narration:
            'Metas de corto plazo (1 a 12 meses) van en renta fija segura y líquida (CETES 28/91 días). Metas de largo plazo aprovechan el interés compuesto.',
          visualKeyMetric: 'Corto · Mediano · Largo Plazo',
          visualContext: 'Estrategia patrimonial',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena los pasos para diseñar una meta bajo la Arquitectura del Propósito:',
      correctOrder: [
        'Definir el objetivo específico y cotizar su costo real en pesos',
        'Establecer la fecha límite exacta en el calendario',
        'Dividir el monto total entre las semanas o quincenas disponibles',
        'Separar la cuota al inicio de cada periodo en un apartado blindado',
      ],
      explanation:
        'La claridad matemática elimina la fricción y transforma un sueño lejano en un hábito semanal automático.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'Meta para tu Equipo Portátil ($8,000 MXN en 8 meses)',
      context:
        'Llevas 3 meses ahorrando $1,000 MXN al mes y ya tienes $3,000 MXN listos. Sale una preventa relámpago para un concierto por $2,800 MXN.',
      impulseOption: {
        label: 'Vaciar los $2,800 MXN del apartado de la computadora y decir "luego lo repongo"',
        dopamineTrap:
          'Rompes tu racha de 90 días y frenas la herramienta que multiplicaría tus proyectos.',
        financialImpactMXN: -2800,
      },
      resilientOption: {
        label: 'Dejar intactos los $3,000 MXN ganando rendimientos y generar un ingreso extra si quiero ir',
        cognitiveBenefit:
          'Cumples tu palabra contigo mismo y mantienes vivo el interés compuesto de tu meta.',
        financialImpactMXN: 1000,
      },
    },
    quiz: [
      {
        id: 'b3_q1',
        conceptTag: 'Arquitectura de Metas Financieras',
        question: '¿Cuál de los siguientes enunciados cumple con la "Arquitectura del Propósito" para una meta financiera?',
        options: [
          'Reunir $4,800 MXN en 24 semanas apartando $200 MXN cada lunes en renta fija para mi curso de tecnología',
          'Tratar de gastar menos en la tienda este año',
          'Guardar lo que me sobre a fin de mes si no salgo',
          'Esperar a ganarme un premio en redes sociales',
        ],
        correctIndex: 0,
        explanation:
          'Una meta bien diseñada define el propósito, el monto exacto ($4,800 MXN), el plazo (24 semanas), la cuota periódica ($200 MXN) y dónde se resguarda.',
      },
      {
        id: 'b3_q2',
        conceptTag: 'Contabilidad Mental',
        question: '¿Qué efecto psicológico produce etiquetar cada apartado de ahorro con su nombre y objetivo específico?',
        options: [
          'Crea una barrera mental que frena la tentación de usar ese dinero en compras impulsivas',
          'Hace que el banco cobre menos IVA en el supermercado',
          'Duplica el saldo automáticamente cada domingo',
          'Impide ver el saldo desde el celular',
        ],
        correctIndex: 0,
        explanation:
          'El etiquetado mental (mental accounting) vincula el dinero con una recompensa valiosa, reduciendo el impulso de gastarlo en antojos.',
      },
    ],
  },
  {
    id: 4,
    stage: 1,
    title: 'Control de Gastos y Ahorro',
    subtitle: 'El Mapa del Flujo de Efectivo',
    biomeName: 'Bosque templado de encino',
    biomeFamily: 'temperate',
    imageUrl: biome4OakForestImg,
    durationMinutes: 4,
    coreCompetency: 'Erradicación del gasto hormiga, vampiro y fantasma',
    summary:
      'Caza las 3 fugas silenciosas de dinero (Hormiga, Fantasma y Vampiro) sin tener que llenar hojas de cálculo eternas.',
    theoryParagraphs: [
      'Las apps contables tradicionales fallan porque exigen anotar cada peso a mano hasta cansarte. El Mapa del Flujo de Efectivo de Capital Bloom ataca de raíz las 3 fugas del bolsillo mexicano: 1) Gasto Hormiga (pequeños antojos diarios de $25 a $60 MXN), 2) Gasto Fantasma (suscripciones digitales automáticas que ni abres) y 3) Gasto Vampiro (comisiones, envíos urgentes y recargos por no planear).',
      'Cerrar estas fugas libera miles de pesos al año tanto para tus metas personales como para fortalecer la tranquilidad económica en casa.',
    ],
    levelAdaptation: {
      seedMode:
        'Un antojo diario de $45 MXN durante 200 días hábiles suma $9,000 MXN al año: suficiente para arrancar un portafolio sólido en renta fija.',
      flightMode:
        'Audita tus cargos domiciliados (streaming, apps, entregas con comisión): cancelar 2 suscripciones fantasma de $199 MXN te devuelve $4,776 MXN cada año.',
    },
    curiousFact: {
      stat: '$18,000 – $32,000 MXN/año',
      fact: 'El gasto hormiga y fantasma drena entre $18,000 y $32,000 pesos anuales del bolsillo promedio en México, superando lo que la mayoría destina a invertir.',
      source: 'CONDUSEF (2024) · Radiografía del Gasto Hormiga',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: Las 3 Fugas Silenciosas',
      durationLabel: '01:15 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'Gasto Hormiga: La ilusión de los $40 pesos',
          narration:
            '$40 pesos parecen nada hoy, pero repetidos 300 días al año son $12,000 MXN que salieron de tu cuenta sin dejar rastro.',
          visualKeyMetric: '$40 MXN × 300 días = $12,000 MXN/año',
          visualContext: 'Impacto acumulado anual',
        },
        {
          step: 2,
          title: 'Gasto Fantasma: Suscripciones en piloto automático',
          narration:
            'Las pruebas gratis de 7 días apuestan a que olvidarás cancelarlas. Revisa tus cobros recurrentes el día 1 de cada mes.',
          visualKeyMetric: 'Auditoría mensual de cobros automáticos',
          visualContext: 'Higiene digital de suscripciones',
        },
        {
          step: 3,
          title: 'Págate a ti primero',
          narration:
            'Apenas recibas un ingreso, separa tu porcentaje semilla antes de empezar a gastar. El resto lo usas con total tranquilidad.',
          visualKeyMetric: 'Ingreso − Semilla = Presupuesto Libre',
          visualContext: 'Regla de oro del flujo de efectivo',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena de mayor a menor prioridad en tu Mapa del Flujo de Efectivo:',
      correctOrder: [
        'Semilla de Ahorro e Inversión (Págate a ti primero)',
        'Necesidades Esenciales (Transporte, alimentación, estudio)',
        'Herramientas de Impulso (Libros, cursos, conectividad)',
        'Gustos Planeados sin culpa (Dentro de tu tope semanal)',
      ],
      explanation:
        'Cuando aseguras tu semilla al principio y cubres lo básico, disfrutar de tus gustos ya no genera estrés ni deudas.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'Detector de Fugas del Mes: $680 MXN',
      context:
        'Revisas tus movimientos y detectas 2 suscripciones que no usas ($320 MXN) y 9 envíos de antojos nocturnos ($360 MXN solo en comisiones de entrega).',
      impulseOption: {
        label: 'Dejarlo así porque "qué flojera entrar a cancelar"',
        dopamineTrap:
          'Se esfumarán $8,160 MXN en los próximos 12 meses en piloto automático.',
        financialImpactMXN: -680,
      },
      resilientOption: {
        label: 'Cancelar hoy mismo ambas suscripciones y mandar esos $680 MXN/mes a renta fija',
        cognitiveBenefit:
          'En 3 minutos de acción rescatas más de $8,160 MXN al año para tus proyectos.',
        financialImpactMXN: 680,
      },
    },
    quiz: [
      {
        id: 'b4_q1',
        conceptTag: 'Gasto Hormiga vs Fantasma',
        question: '¿Cuál es la diferencia clave entre el "Gasto Hormiga" y el "Gasto Fantasma"?',
        options: [
          'El gasto hormiga son compras pequeñas y repetitivas del día a día; el gasto fantasma son suscripciones o cargos automáticos que pagas sin usar',
          'El gasto hormiga solo ocurre en verano y el fantasma en invierno',
          'El gasto fantasma te da rendimientos en el banco',
          'No hay diferencia, ambos son inversiones bursátiles',
        ],
        correctIndex: 0,
        explanation:
          'Detectar ambos te permite frenar el gasto hormiga con un tope semanal y eliminar el gasto fantasma cancelando cargos recurrentes inútiles.',
      },
      {
        id: 'b4_q2',
        conceptTag: 'Flujo de Efectivo Inteligente',
        question: '¿Qué significa aplicar la regla de "Págate a ti primero" al recibir cualquier ingreso?',
        options: [
          'Separar tu porcentaje de ahorro/inversión en el instante en que recibes el dinero, antes de gastar en lo demás',
          'Gastarlo todo en ropa el primer día de pago',
          'Esperar a ver si sobra algo el último día del mes',
          'Pedir prestado antes de cobrar',
        ],
        correctIndex: 0,
        explanation:
          'Separar la semilla apenas llega el ingreso automatiza el hábito y evita que el consumo diario absorba todo tu flujo.',
      },
    ],
  },
  {
    id: 5,
    stage: 1,
    title: 'El Ahorro y Resiliencia',
    subtitle: 'Construcción de tu Escudo Financiero',
    biomeName: 'Bosque templado de oyamel',
    biomeFamily: 'temperate',
    imageUrl: biome5MonarchForestImg,
    durationMinutes: 4,
    coreCompetency: 'Fondo de emergencia y protección en instituciones reguladas',
    summary:
      'Crea tu escudo contra imprevistos: descubre por qué ahorrar en instituciones reguladas vence al colchón y a las tandas.',
    theoryParagraphs: [
      'El bosque de oyamel crea un microclima que protege a las mariposas monarca de las tormentas invernales. En tus finanzas, ese escudo térmico es tu Fondo de Emergencia: una reserva líquida lista para cubrir entre 3 y 6 meses de tus gastos básicos.',
      'Cuando no existe un fondo de emergencia, cualquier imprevisto obliga a caer en préstamos carísimos o empeños. Además, guardar billetes bajo el colchón o en tandas informales hace que tu dinero pierda valor cada mes frente a la inflación y sin protección legal.',
    ],
    levelAdaptation: {
      seedMode:
        'Empieza armando un Escudo Base de $1,500 a $3,000 MXN en una cuenta segura: te salvará ante cualquier reparación urgente de tu equipo o imprevisto.',
      flightMode:
        'Suma cuánto cuestan 3 meses de tus gastos indispensables y resguárdalos en un instrumento con liquidez diaria respaldado por el Gobierno Federal o el seguro del IPAB.',
    },
    curiousFact: {
      stat: '400,000 UDIs (~$3.3M MXN)',
      fact: 'El ahorro en bancos regulados en México está protegido por el seguro del IPAB hasta por 400,000 UDIs, mientras que las tandas y cajas informales no tienen garantía legal.',
      source: 'IPAB / CONDUSEF (2025) · Protección al Ahorro',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: Colchón vs. Tanda vs. Cuenta Regulada',
      durationLabel: '01:25 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'El mito del dinero bajo el colchón',
          narration:
            'Si guardas $5,000 MXN en un cajón por 3 años con inflación del 4.5% anual, tendrás los mismos billetes, pero solo comprarán lo equivalente a $4,380 MXN de hoy.',
          visualKeyMetric: '-12.4% poder de compra real en 3 años',
          visualContext: 'Erosión silenciosa del efectivo inactivo',
        },
        {
          step: 2,
          title: 'Tu Fondo de Emergencia frena el Efecto Dominó',
          narration:
            'Un imprevisto de $2,500 MXN sin ahorro termina convirtiéndose en una deuda de $5,000 MXN. Con tu fondo eres tu propio banco al 0% de interés.',
          visualKeyMetric: '0% intereses pagados a terceros',
          visualContext: 'Paz mental y autonomía',
        },
        {
          step: 3,
          title: 'Verifica siempre en el SIPRES',
          narration:
            'Antes de depositar un peso en cualquier app financiera, confirma en el registro SIPRES de la CONDUSEF que esté regulada en México.',
          visualKeyMetric: 'SIPRES CONDUSEF · Verificación oficial',
          visualContext: 'Blindaje contra estafas',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena los escalones de seguridad antes de asumir riesgos de inversión:',
      correctOrder: [
        'Confirmar que la institución esté regulada oficialmente (CONDUSEF / CNBV / SHCP)',
        'Reunir tu primer mes de gastos básicos en liquidez inmediata',
        'Completar de 3 a 6 meses de Fondo de Emergencia que supere a la inflación',
        'Destinar el capital excedente a inversiones de mayor plazo o renta variable',
      ],
      explanation:
        'Jamás se arriesga en activos volátiles el dinero que representa tu escudo de tranquilidad.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'La Tanda Informal vs. Ahorro Regulado con Rendimiento',
      context:
        'Te invitan a una tanda de $500 MXN quincenales donde te toca el último turno (en 10 meses) sin recibir ni un peso de interés.',
      impulseOption: {
        label: 'Entrar en el último número de la tanda solo por presión social',
        dopamineTrap:
          'Financias gratis a los primeros turnos, corres riesgo de que alguien falle y pierdes 10 meses de rendimientos.',
        financialImpactMXN: -450,
      },
      resilientOption: {
        label: 'Programar mi ahorro quincenal de $500 MXN en CETES / cuenta regulada a mi nombre',
        cognitiveBenefit:
          'Tu dinero está seguro desde el día 1 y genera rendimientos reales cada mes.',
        financialImpactMXN: 520,
      },
    },
    quiz: [
      {
        id: 'b5_q1',
        conceptTag: 'Fondo de Emergencia y Resiliencia',
        question: '¿Cuál es la misión principal de tener un Fondo de Emergencia?',
        options: [
          'Resolver imprevistos reales (salud, reparaciones urgentes, baja de ingresos) sin endeudarte caro ni frenar tus metas',
          'Tener efectivo listo para las rebajas de temporada',
          'Prestar dinero sin respaldo',
          'Apostar en juegos de azar',
        ],
        correctIndex: 0,
        explanation:
          'El Fondo de Emergencia es el amortiguador que impide que un imprevisto cotidiano desate una cadena de deudas.',
      },
      {
        id: 'b5_q2',
        conceptTag: 'Instituciones Reguladas en México',
        question: '¿En qué portal oficial puedes comprobar si una institución financiera es legal y está supervisada en México?',
        options: [
          'En el SIPRES (Sistema de Registro de Prestadores de Servicios Financieros) de la CONDUSEF',
          'En los comentarios de un video viral',
          'En un grupo de mensajería',
          'No existe ningún registro público en el país',
        ],
        correctIndex: 0,
        explanation:
          'El SIPRES de la CONDUSEF permite verificar gratis si un banco, SOFIPO o institución opera legalmente bajo supervisión.',
      },
    ],
  },
  {
    id: 6,
    stage: 1,
    title: 'Cuentas Comunes y de Custodia',
    subtitle: 'Instrumentos de Transición Financiera',
    biomeName: 'Bosque templado de coníferas',
    biomeFamily: 'temperate',
    imageUrl: biome6ConiferRiverImg,
    durationMinutes: 4,
    coreCompetency: 'Cuentas de custodia, cuentas titulares y GAT Real',
    summary:
      'Conoce cómo funcionan las cuentas de custodia para empezar desde cero y cómo elegir cuentas sin comisiones ocultas.',
    theoryParagraphs: [
      'En México existen dos grandes vías para acceder al sistema financiero formal: las Cuentas de Custodia (como CETES Directo Niños/Custodia o cuentas bancarias vinculadas a un tutor legal, que permiten invertir en renta fija desde $100 MXN) y las Cuentas Titulares con RFC e identificación oficial.',
      'Al evaluar dónde guardar tu dinero, la métrica clave que debes revisar por ley es la GAT Real (Ganancia Anual Total Real), que muestra el rendimiento neto anual después de descontar la inflación estimada, verificando siempre que tenga $0 de comisión por manejo de cuenta.',
    ],
    levelAdaptation: {
      seedMode:
        'En Modo Semilla puedes activar una cuenta de custodia vinculada para invertir en bonos gubernamentales seguros desde $100 MXN sin pagar comisiones.',
      flightMode:
        'En Modo Vuelo compara siempre la GAT Real entre instituciones y abre contratos sin saldo mínimo ni anualidades.',
    },
    curiousFact: {
      stat: 'Desde $100 MXN · $0 Comisión',
      fact: 'En México es posible abrir un portafolio en bonos gubernamentales (tanto en modalidad de custodia como titular) desde $100 pesos sin comisiones de intermediación.',
      source: 'SHCP / Nacional Financiera (2025)',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: Custodia, Titularidad y GAT Real',
      durationLabel: '01:20 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'Modalidad Custodia: Empezar temprano',
          narration:
            'Un subportafolio de custodia permite invertir en renta fija gubernamental bajo el respaldo de un tutor legal, creando el hábito mucho antes.',
          visualKeyMetric: 'Custodia + Renta Fija desde $100 MXN',
          visualContext: 'Inclusión financiera sin barreras',
        },
        {
          step: 2,
          title: 'Modalidad Titular: Expansión completa',
          narration:
            'Con identificación oficial y RFC asumes la titularidad plena de tus cuentas y desbloqueas casas de bolsa reguladas para activos globales.',
          visualKeyMetric: 'Titularidad Plena + Renta Fija y Variable',
          visualContext: 'Evolución de tu portafolio',
        },
        {
          step: 3,
          title: 'La brújula: GAT Real positiva',
          narration:
            'La GAT Nominal dice cuánto paga la cuenta en papel; la GAT Real ya resta la inflación esperada. Busca siempre GAT Real mayor a 0%.',
          visualKeyMetric: 'GAT Real > 0% = Crecimiento verdadero',
          visualContext: 'Indicador oficial de CONDUSEF',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena los pasos para elegir tu cuenta financiera ideal sin perder dinero en comisiones:',
      correctOrder: [
        'Verificar que la entidad esté regulada y tenga $0 comisión por manejo de cuenta',
        'Revisar que no exija un saldo mínimo mensual penalizado',
        'Comparar la GAT Real (que el rendimiento supere a la inflación)',
        'Activar transferencias automáticas vía SPEI hacia tu apartado de inversión',
      ],
      explanation:
        'Una cuenta sin comisiones y con GAT Real positiva hace que cada peso trabaje para ti y no para el banco.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'Elección de Cuenta Digital',
      context:
        'El Banco A ofrece una tarjeta metálica llamativa pero pide $4,000 MXN de saldo mínimo o cobra $180 MXN al mes de multa. La Opción B es una cuenta regulada con $0 comisiones más CETES Directo.',
      impulseOption: {
        label: 'Elegir el Banco A solo por la estética de la tarjeta',
        dopamineTrap:
          'Si un mes tu saldo baja del mínimo, perderás hasta $2,160 MXN al año en penalizaciones.',
        financialImpactMXN: -2160,
      },
      resilientOption: {
        label: 'Elegir la Opción B con $0 comisiones y poner mi saldo a generar rendimientos',
        cognitiveBenefit:
          'Cero fugas por comisiones bancarias y 100% de tu capital libre.',
        financialImpactMXN: 1200,
      },
    },
    quiz: [
      {
        id: 'b6_q1',
        conceptTag: 'Cuentas de Custodia',
        question: '¿Para qué sirve una cuenta de custodia (como CETES Directo Niños / Custodia) en México?',
        options: [
          'Permite empezar a ahorrar e invertir legalmente en renta fija gubernamental bajo el respaldo de un padre, madre o tutor',
          'Sirve únicamente para pedir préstamos con intereses altos',
          'Cobra el 50% del saldo cada mes',
          'Es una cuenta exclusiva para empresas multinacionales',
        ],
        correctIndex: 0,
        explanation:
          'Las cuentas de custodia abren la puerta a la renta fija segura desde $100 MXN para formar hábitos tempranos.',
      },
      {
        id: 'b6_q2',
        conceptTag: 'GAT Real (Ganancia Anual Total)',
        question: '¿Qué indica que una cuenta de ahorro o inversión tenga una "GAT Real" positiva?',
        options: [
          'Que el rendimiento que paga supera a la inflación estimada, haciendo crecer tu poder adquisitivo real',
          'Que tiene sucursales abiertas los domingos',
          'Que cobra comisión por cada retiro',
          'Que paga en monedas virtuales de videojuegos',
        ],
        correctIndex: 0,
        explanation:
          'La GAT Real descuenta la inflación; cuando es positiva, tu dinero compra más bienes en el futuro que hoy.',
      },
    ],
  },
  {
    id: 7,
    stage: 1,
    title: 'Créditos, Deudas y Riesgos',
    subtitle: 'El Apalancamiento y la Reputación Financiera',
    biomeName: 'Bosque mesófilo de montaña',
    biomeFamily: 'temperate',
    imageUrl: biome7CloudForestImg,
    durationMinutes: 4,
    coreCompetency: 'Dominio del CAT, fecha de corte/pago, Buró de Crédito y ser Totalero',
    summary:
      'El crédito no es una extensión de tu sueldo. Aprende el secreto de ser "Totalero" y evita la trampa mortal del pago mínimo.',
    theoryParagraphs: [
      'Una tarjeta de crédito tiene dos fechas que debes dominar: la Fecha de Corte (cuando se cierra la cuenta de tus compras del mes) y la Fecha Límite de Pago (20 días naturales después del corte).',
      'Si pagas el 100% del "Pago para no generar intereses" antes de la fecha límite, eres "Totalero": usas el dinero del banco gratis hasta por 50 días al 0% de interés y subes tu Score en el Buró de Crédito. Pero si pagas solo el "Pago Mínimo", se activa un Costo Anual Total (CAT) que en México supera el 70%–100% anual, haciendo que la deuda crezca como bola de nieve.',
    ],
    levelAdaptation: {
      seedMode:
        'Entrena la regla #1 del crédito antes de usar cualquier tarjeta: jamás pidas prestado para gastos que se consumen en minutos y aléjate de apps de préstamos exprés ("montadeudas").',
      flightMode:
        'Para construir un Score arriba de 700 puntos en Buró, domicilia un gasto pequeño que ya tenías en tu presupuesto y liquida el 100% cada mes antes de la fecha límite.',
    },
    curiousFact: {
      stat: 'CAT promedio > 72.5% anual',
      fact: 'En México, el Costo Anual Total (CAT) promedio de las tarjetas clásicas supera el 72% anual. Pagar solo el mínimo en una compra de $5,000 MXN puede tardar más de 4 años en liquidarse.',
      source: 'Banco de México (2025) · Indicadores de Tarjetas de Crédito',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: Ser Totalero vs. El Pago Mínimo',
      durationLabel: '01:30 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'El truco de los 50 días al 0%',
          narration:
            'Si tu tarjeta corta el día 5, tienes hasta el día 25 para pagar. Si compras el día 6, tendrás casi 50 días para liquidar al 0% de interés siendo Totalero.',
          visualKeyMetric: 'Hasta 50 días de financiamiento al 0%',
          visualContext: 'Mecánica de Fecha de Corte y Fecha Límite',
        },
        {
          step: 2,
          title: 'El Buró de Crédito es tu aliado',
          narration:
            'Estar en el Buró no es malo: todos los que tienen un crédito están ahí con una calificación (Score de 400 a 850). Pagar puntual te da acceso a tasas bajas en el futuro.',
          visualKeyMetric: 'Score Crediticio: 400 a 850 puntos',
          visualContext: 'Reputación financiera inteligente',
        },
        {
          step: 3,
          title: 'Alerta Roja: Apps Montadeudas',
          narration:
            'Nunca instales apps de préstamos rápidos que pidan permiso para leer tus contactos y fotos: son redes de extorsión no reguladas.',
          visualKeyMetric: 'Verifica siempre en SIPRES CONDUSEF',
          visualContext: 'Seguridad digital',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena la jugada maestra de un usuario "Totalero" con su tarjeta:',
      correctOrder: [
        'Confirmar que ya tienes ese dinero disponible en tu presupuesto mensual',
        'Hacer la compra justo después de tu Fecha de Corte para ganar más días',
        'Revisar el monto de "Pago para no generar intereses" al llegar el corte',
        'Liquidar el 100% antes de la Fecha Límite de Pago ($0 de intereses)',
      ],
      explanation:
        'Un Totalero aprovecha los beneficios y construye historial crediticio sin regalarle un solo peso de interés al banco.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'Llegó el Estado de Cuenta: $2,400 MXN',
      context:
        'Tu estado de cuenta marca: "Pago para no generar intereses: $2,400 MXN" y en letras gigantes: "Pago Mínimo: ¡Solo $220 MXN!". Tienes los $2,400 MXN en tu cuenta.',
      impulseOption: {
        label: 'Pagar solo los $220 MXN del mínimo para sentir que me sobra efectivo hoy',
        dopamineTrap:
          'Al día siguiente se cobran intereses sobre todo el saldo promedio diario con un CAT >70%.',
        financialImpactMXN: -640,
      },
      resilientOption: {
        label: 'Pagar los $2,400 MXN completos ("Pago para no generar intereses") hoy mismo',
        cognitiveBenefit:
          'Pagas $0.00 de intereses, tu Score sube y duermes con tranquilidad total.',
        financialImpactMXN: 2400,
      },
    },
    quiz: [
      {
        id: 'b7_q1',
        conceptTag: 'Usuario Totalero y Tarjetas',
        question: '¿Qué concepto del estado de cuenta debes pagar antes de la fecha límite para NO generar ni un centavo de interés?',
        options: [
          'El "Pago para no generar intereses" completo (ser Totalero)',
          'Solo el "Pago mínimo"',
          'La mitad de tus compras del mes',
          'Únicamente la comisión anual',
        ],
        correctIndex: 0,
        explanation:
          'Cubrir el "Pago para no generar intereses" liquida el total del periodo y mantiene tu tasa de interés en 0%.',
      },
      {
        id: 'b7_q2',
        conceptTag: 'Indicador CAT (Banco de México)',
        question: '¿Para qué sirve el CAT (Costo Anual Total) que por ley deben mostrar todos los créditos en México?',
        options: [
          'Para comparar el costo real anual de un crédito sumando tasa de interés, anualidad, comisiones y seguros',
          'Para medir la batería que consume la app del banco',
          'Para contar cuántas compras hiciste en el año',
          'Para calcular el descuento en tiendas de ropa',
        ],
        correctIndex: 0,
        explanation:
          'El CAT revela el costo verdadero de cualquier préstamo en un solo porcentaje anual comparable.',
      },
    ],
  },
  {
    id: 8,
    stage: 1,
    title: 'Finanzas en la Era Digital',
    subtitle: 'Interfaces, Pagos y Consumo Conectado (SPEI, Dimo y BNPL)',
    biomeName: 'Desierto con lagos salares (sollos)',
    biomeFamily: 'desert',
    imageUrl: biome8SaltFlatsImg,
    durationMinutes: 4,
    coreCompetency: 'Rieles de pago de Banxico (SPEI/Dimo) y defensa ante "Compra Ahora, Paga Después"',
    summary:
      'Domina los pagos digitales (SPEI, Dimo, CVV dinámico) y no caigas en el espejismo de dividir compras impulsivas en quincenas.',
    theoryParagraphs: [
      'En los lagos salares del desierto, el reflejo crea espejismos. En el mundo digital, ese espejismo son los botones de "Compra Ahora y Paga en 4 Quincenas" (BNPL): hacen que una compra parezca chiquita, pero si acumulas 4 o 5 al mismo tiempo, tu quincena llega comprometida antes de cobrarla.',
      'A tu favor tienes la infraestructura pública del Banco de México: el sistema SPEI (transferencias gratuitas en segundos 24/7 con CLABE) y Dimo (envíos seguros usando solo el número de celular vinculado a tu cuenta), además de las tarjetas digitales con código CVV dinámico que cambia cada pocos minutos.',
    ],
    levelAdaptation: {
      seedMode:
        'Activa siempre la verificación en dos pasos (2FA), jamás compartas códigos SMS con nadie y usa CVV dinámico en compras por internet.',
      flightMode:
        'Aplica la regla de Vida Útil > Plazo de Pago: usa Meses Sin Intereses (MSI) solo para herramientas duraderas (como una computadora de trabajo), nunca para cenas o ropa rápida.',
    },
    curiousFact: {
      stat: 'Regla: Vida Útil > Plazo de Pago',
      fact: 'Financiar a 12 meses algo que se consume en un día (como una salida o boletos) compromete tu flujo futuro en algo que ya dejó de existir.',
      source: 'CONDUSEF (2025) · Finanzas Digitales Seguras',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: SPEI y Dimo vs. Espejismos BNPL',
      durationLabel: '01:20 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'SPEI y Dimo: Transferencias en segundos',
          narration:
            'Operados por el Banco de México, permiten mover dinero 24/7 sin pagar comisiones en banca móvil.',
          visualKeyMetric: 'SPEI / Dimo 24/7 · $0 comisión',
          visualContext: 'Infraestructura del Banco de México',
        },
        {
          step: 2,
          title: 'El espejismo de "Paga en 6 quincenas"',
          narration:
            'Dividir pagos con comisión oculta encarece el producto hasta un 15% y fragmenta tu presupuesto en microdeudas.',
          visualKeyMetric: 'Cuidado con las comisiones por fraccionar pagos',
          visualContext: 'Psicología del BNPL',
        },
        {
          step: 3,
          title: 'Escudo de Ciberseguridad: CVV Dinámico',
          narration:
            'Para compras en línea usa siempre la versión digital de tu tarjeta: su código de 3 dígitos caduca en minutos, blindándote contra clonaciones.',
          visualKeyMetric: 'CVV Temporal = Cero clonación en línea',
          visualContext: 'Higiene cibernética',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena el protocolo de seguridad antes de hacer un pago en internet:',
      correctOrder: [
        'Confirmar que el sitio sea legítimo (HTTPS) y que la compra esté en tu plan',
        'Generar el código CVV dinámico temporal en tu tarjeta digital',
        'Evitar fraccionar en quincenas con comisión si puedes liquidar de contado',
        'Guardar el comprobante o Clave de Rastreo SPEI de la operación',
      ],
      explanation:
        'Combinar tarjetas digitales dinámicas con compras de contado planeadas protege tu saldo y tus datos.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'Calzado de Moda a "6 Quincenas sin Tarjeta"',
      context:
        'Unos tenis cuestan $2,100 MXN de contado. Una app de pagos fraccionados te ofrece llevarlos hoy por "6 quincenas de $395 MXN" ($2,370 MXN en total).',
      impulseOption: {
        label: 'Aceptar las 6 quincenas porque hoy solo desembolso $395 MXN',
        dopamineTrap:
          'Pagas $270 MXN extra de pura comisión (12.8% más caro) y amarras tus próximas 6 quincenas.',
        financialImpactMXN: -2370,
      },
      resilientOption: {
        label: 'Ahorrar en mi apartado ganando rendimientos y comprarlos de contado sin sobreprecio',
        cognitiveBenefit:
          'Te ahorras los $270 MXN de comisión y mantienes libres tus quincenas futuras.',
        financialImpactMXN: 270,
      },
    },
    quiz: [
      {
        id: 'b8_q1',
        conceptTag: 'Infraestructura SPEI y Pagos Digitales',
        question: '¿Qué institución desarrolla y opera el sistema SPEI para transferencias electrónicas en México?',
        options: [
          'El Banco de México (Banxico)',
          'Una tienda de comercio electrónico extranjera',
          'Las cadenas de supermercados',
          'Ninguna, las transferencias viajan por correo postal',
        ],
        correctIndex: 0,
        explanation:
          'El SPEI (Sistema de Pagos Electrónicos Interbancarios) es operado por el Banco de México para transferencias inmediatas y seguras.',
      },
      {
        id: 'b8_q2',
        conceptTag: 'Meses Sin Intereses Inteligentes',
        question: '¿Cuál es la regla de oro para usar "Meses Sin Intereses" (MSI) de forma inteligente?',
        options: [
          'Que la vida útil del bien o herramienta dure mucho más que los meses que tardarás en pagarlo, al mismo precio de contado',
          'Usarlos para pagar comida rápida todos los fines de semana',
          'Aceptarlos aunque nos cobren 18% de comisión por abrir el plan',
          'Acumular 10 compras a meses al mismo tiempo sin llevar registro',
        ],
        correctIndex: 0,
        explanation:
          'Los MSI solo convienen en bienes duraderos sin sobreprecio y dentro de tu flujo mensual.',
      },
    ],
  },
  {
    id: 9,
    stage: 1,
    title: 'Inversiones y Futuro',
    subtitle: 'La Ecuación del Tiempo, el Capital y la Inflación',
    biomeName: 'Desierto con llanuras rocosas y montañas (Hamada)',
    biomeFamily: 'desert',
    imageUrl: biome9RedCanyonImg,
    durationMinutes: 4,
    coreCompetency: 'Inflación, Tasa de Referencia de Banxico e Interés Compuesto',
    summary:
      'Domina la fuerza más poderosa de las finanzas: el Interés Compuesto y cómo vencer a la inflación con el tiempo a tu favor.',
    theoryParagraphs: [
      'En el desierto rocoso (Hamada), la constancia del tiempo moldea cañones enteros. En tu dinero actúan dos fuerzas constantes: la Inflación (el alza generalizada de precios que encoge el poder de compra del efectivo quieto) y el Interés Compuesto (cuando las ganancias de tu inversión se reinvierten para generar nuevas ganancias sobre las ganancias).',
      'El Banco de México (Banxico) tiene el mandato constitucional de controlar la inflación (meta del 3% anual) ajustando su Tasa de Interés de Referencia. Cuando inviertes a una tasa mayor a la inflación, tu dinero crece en términos reales.',
    ],
    levelAdaptation: {
      seedMode:
        'En la fórmula $M = C(1 + r)^t$, el tiempo ($t$) es el exponente: empezar temprano con montos pequeños supera por mucho a empezar tarde con montos grandes.',
      flightMode:
        'Usa la Regla del 72: divide 72 entre la tasa anual de tu inversión para saber en cuántos años se duplicará tu dinero (ej. al 10% anual, $72 / 10 = 7.2$ años).',
    },
    curiousFact: {
      stat: 'Meta de Inflación Banxico: 3.0%',
      fact: 'El mandato constitucional autónomo del Banco de México es preservar el valor de nuestra moneda manteniendo la inflación cerca del 3% anual.',
      source: 'Banco de México (2026) · Política Monetaria',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: El Superpoder del Exponente Tiempo',
      durationLabel: '01:30 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'Inflación: El ladrón silencioso',
          narration:
            'Si los precios suben 4.5% en el año y tu dinero estuvo quieto al 0%, perdiste 4.5% de capacidad de compra aunque veas los mismos billetes.',
          visualKeyMetric: 'Tasa Real ≈ Tasa Nominal − Inflación',
          visualContext: 'Poder adquisitivo real',
        },
        {
          step: 2,
          title: 'Cómo mueve Banxico la Tasa de Referencia',
          narration:
            'Cuando la inflación se acelera, Banxico sube su tasa de referencia: encarece el crédito pero hace que ahorrar en instrumentos como CETES pague más.',
          visualKeyMetric: 'Tasa Alta = Premio al ahorro en Renta Fija',
          visualContext: 'Banco de México en acción',
        },
        {
          step: 3,
          title: 'La bola de nieve del Interés Compuesto',
          narration:
            'En $M = C(1 + r)^t$, al reinvertir los intereses cada periodo, tus rendimientos empiezan a generar sus propios rendimientos.',
          visualKeyMetric: 'Regla del 72: Años para duplicar = 72 ÷ Tasa',
          visualContext: 'Crecimiento exponencial',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena qué ocurre en la economía cuando Banxico sube la tasa de interés para frenar la inflación:',
      correctOrder: [
        'Se detecta un aumento acelerado en los precios de bienes y servicios (Inflación)',
        'La Junta de Gobierno de Banxico eleva la Tasa de Interés de Referencia',
        'Los créditos se encarecen y los instrumentos de ahorro (CETES) pagan mayor rendimiento',
        'El consumo se modera y la inflación regresa gradualmente hacia su meta',
      ],
      explanation:
        'Entender este ciclo te indica cuándo evitar deudas caras y aprovechar las tasas altas en renta fija.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'Bono de Excelencia ($5,000 MXN)',
      context:
        'Recibes $5,000 MXN por un logro académico o proyecto. Puedes dejarlos en una cuenta que paga 0% anual (con inflación de 4.2%) o invertirlos al 10% anual con reinversión.',
      impulseOption: {
        label: 'Dejarlos al 0% porque "así sigo viendo mis $5,000 intactos"',
        dopamineTrap:
          'Ilusión monetaria: en 5 años esos $5,000 MXN habrán perdido más de $930 MXN de poder de compra.',
        financialImpactMXN: -930,
      },
      resilientOption: {
        label: 'Invertirlos al 10% anual activando la reinversión automática',
        cognitiveBenefit:
          'Vences a la inflación y en 5 años tus $5,000 MXN se transforman en ~$8,052 MXN.',
        financialImpactMXN: 3052,
      },
    },
    quiz: [
      {
        id: 'b9_q1',
        conceptTag: 'Política Monetaria de Banxico',
        question: '¿Cuál es el mandato constitucional prioritario del Banco de México (Banxico)?',
        options: [
          'Preservar el poder adquisitivo de la moneda nacional (controlar la inflación)',
          'Vender seguros y tarjetas departamentales',
          'Cobrar impuestos municipales',
          'Fijar el precio de las consolas de videojuegos',
        ],
        correctIndex: 0,
        explanation:
          'Banxico es autónomo y su misión central es mantener estable el poder de compra del peso mexicano.',
      },
      {
        id: 'b9_q2',
        conceptTag: 'Interés Compuesto y Regla del 72',
        question: 'Según la "Regla del 72", si inviertes tu dinero a una tasa anual compuesta del 10%, ¿en cuántos años aproximadamente se duplicará tu capital?',
        options: [
          'En 7.2 años (72 ÷ 10)',
          'En 72 años',
          'En 2 semanas',
          'Nunca se duplica',
        ],
        correctIndex: 0,
        explanation:
          'Dividir 72 entre la tasa anual de interés compuesto (72 / 10 = 7.2 años) te da el tiempo aproximado en que una inversión duplica su valor.',
      },
    ],
  },
  {
    id: 10,
    stage: 1,
    title: 'CETES: Inversión en México',
    subtitle: 'El Primer Escalón en Renta Fija',
    biomeName: 'Desierto con oasis',
    biomeFamily: 'desert',
    imageUrl: biome10DesertOasisImg,
    durationMinutes: 4,
    coreCompetency: 'CETES Directo, Bonddia, plazos (28 a 364 días) y Udibonos',
    summary:
      'Llegas al oasis de la Etapa 1: invierte desde $100 MXN en el instrumento más seguro de México con $0 de comisiones.',
    theoryParagraphs: [
      'Los Certificados de la Tesorería de la Federación (CETES) son bonos emitidos por el Gobierno de México. Cuando compras un CETE (valor nominal de $10 MXN), financias proyectos públicos y al vencer el plazo (28, 91, 182 o 364 días) recibes tu dinero más la ganancia pactada.',
      'Por eso son el corazón de la Renta Fija: conoces tu rendimiento exacto desde el primer segundo. En la plataforma oficial CETES Directo puedes empezar desde $100 MXN sin comisiones, combinando Bonddia (liquidez diaria hábil) con CETES y Udibonos.',
    ],
    levelAdaptation: {
      seedMode:
        'Activa el "Ahorro Recurrente" desde $100 MXN quincenales o mensuales para que tu oasis financiero crezca en automático.',
      flightMode:
        'Arma una "Escalera de CETES" combinando plazos de 28, 91 y 182 días con Udibonos para asegurar tanto liquidez como tasas fijas.',
    },
    curiousFact: {
      stat: '$10 MXN valor nominal por CETE',
      fact: 'Cada CETE vale $10 pesos al vencimiento y se compra "a descuento" (por ejemplo, hoy pagas $9.92 y en 28 días te devuelven $10.00 completos).',
      source: 'Banco de México / CETES Directo (2026)',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: Domina CETES, Bonddia y Udibonos',
      durationLabel: '01:35 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'La tasa base de referencia en México',
          narration:
            'Por estar respaldados por el Estado mexicano, los CETES son la inversión de menor riesgo del país y el termómetro para detectar estafas.',
          visualKeyMetric: 'Riesgo Soberano Mínimo · Desde $100 MXN',
          visualContext: 'Cimiento de todo portafolio en México',
        },
        {
          step: 2,
          title: 'Bonddia vs. CETES a plazo',
          narration:
            'Bonddia te da disponibilidad todos los días hábiles para emergencias; CETES a 28, 91 o 364 días congela tu tasa durante todo el plazo elegido.',
          visualKeyMetric: 'Bonddia (Liquidez diaria) + CETES (Tasa fija)',
          visualContext: 'Equilibrio entre disponibilidad y premio',
        },
        {
          step: 3,
          title: 'Reinversión Automática',
          narration:
            'Con un interruptor en la app, al vencer los 28 días tu capital más los intereses ganados se vuelven a invertir solos sin cobrar comisión.',
          visualKeyMetric: 'Interés Compuesto Automático · $0 Comisión',
          visualContext: 'Graduación de la Etapa 1',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena cómo funciona tu inversión en CETES a 28 días de principio a fin:',
      correctOrder: [
        'Transferir desde $100 MXN vía SPEI a tu cuenta oficial de CETES Directo',
        'Comprar títulos de CETES "a descuento" (por debajo de $10 MXN)',
        'Recibir los $10 MXN íntegros por cada título al cumplirse los 28 días',
        'Reinvertir automáticamente capital más ganancia para el nuevo ciclo',
      ],
      explanation:
        'Así de transparente funciona la renta fija gubernamental en México.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'Promesa de "15% de Ganancia Semanal" vs. CETES Oficial',
      context:
        'Un anuncio en redes promete duplicar tus $1,000 MXN en 3 semanas con un "bot secreto", mientras que CETES Directo paga ~10% anual respaldado oficialmente.',
      impulseOption: {
        label: 'Meter mis $1,000 MXN al supuesto bot que promete 15% semanal',
        dopamineTrap:
          'Estafa piramidal clásica: nadie en el mundo genera 15% semanal sin riesgo. Pierdes todo tu dinero.',
        financialImpactMXN: -1000,
      },
      resilientOption: {
        label: 'Invertir mis $1,000 MXN en CETES Directo y usar su tasa como detector de fraudes',
        cognitiveBenefit:
          'Cualquier promesa que multiplique varias veces la tasa de CETES "garantizado" es alerta de fraude. Tu capital crece seguro.',
        financialImpactMXN: 1100,
      },
    },
    quiz: [
      {
        id: 'b10_q1',
        conceptTag: 'Funcionamiento de CETES',
        question: '¿Por qué los CETES se clasifican como instrumentos de "Renta Fija"?',
        options: [
          'Porque desde el momento en que inviertes conoces con exactitud el plazo y la tasa de rendimiento que recibirás al vencimiento',
          'Porque sirven únicamente para pagar alquileres',
          'Porque su precio cambia un 50% cada hora',
          'Porque cobran una cuota mensual fija',
        ],
        correctIndex: 0,
        explanation:
          'En la Renta Fija, tanto el plazo como la tasa de rendimiento están pactados desde el inicio.',
      },
      {
        id: 'b10_q2',
        conceptTag: 'Termómetro Anti-Fraudes (Tasa Libre de Riesgo)',
        question: '¿Cómo te ayuda conocer la tasa actual de CETES para evitar caer en estafas financieras?',
        options: [
          'Funciona como referencia libre de riesgo: si alguien promete rendimientos muchísimo mayores "100% seguros y sin riesgo", sabes de inmediato que es un fraude',
          'Hace que el teléfono bloquee llamadas desconocidas',
          'Elimina todos los anuncios de internet',
          'No tiene relación con la seguridad financiera',
        ],
        correctIndex: 0,
        explanation:
          'En finanzas, mayor rendimiento exige siempre mayor riesgo; comparar contra CETES desmaskara esquemas piramidales al instante.',
      },
    ],
  },
  {
    id: 11,
    stage: 2,
    title: 'Finanzas sin Fronteras',
    subtitle: 'Divisas, Arbitraje y Globalización (T-MEC y Nearshoring)',
    biomeName: 'Montaña (Cordillera y Pasos)',
    biomeFamily: 'paramo',
    imageUrl: biome11MountainPassImg,
    durationMinutes: 4,
    coreCompetency: 'Tipo de cambio USD/MXN, remesas, T-MEC y relocalización industrial',
    summary:
      'Inicia la Etapa 2 en la montaña: entiende cómo el dólar, las remesas, el T-MEC y el nearshoring mueven tu economía diaria.',
    theoryParagraphs: [
      'Desde la montaña ves el mapa completo: México envía más del 80% de sus exportaciones a Estados Unidos bajo el T-MEC (que pide 75% de contenido regional automotriz) y protagoniza el Nearshoring: empresas globales que mudan sus plantas de Asia (30–45 días en barco) a México (2–4 días por tierra).',
      'Además, México recibe más de $60,000 millones de dólares anuales en remesas familiares que amortiguan el consumo interno, mientras que el dólar actúa como moneda vehículo mundial: cuando el tipo de cambio se mueve, impacta el precio de la tecnología y los insumos ("inflación importada").',
    ],
    levelAdaptation: {
      seedMode:
        'Cada vez que compras tecnología o servicios globales, el tipo de cambio USD/MXN entra en acción. Dominar habilidades técnicas e idiomas te conecta directo con las oportunidades del nearshoring.',
      flightMode:
        'La integración productiva del Bajío, Norte y Centro con Norteamérica permite generar ingresos vinculados a cadenas globales viviendo con costos locales.',
    },
    curiousFact: {
      stat: '2–4 días vs. 30–45 días',
      fact: 'Llevar manufactura desde México a EE. UU. toma de 2 a 4 días por tierra frente a los 30–45 días en barco desde Asia, consolidando a México como el 7.º productor mundial de vehículos.',
      source: 'Banxico / OICA / INA (2026)',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: El Mapa Global de tu Bolsillo',
      durationLabel: '01:35 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'El Dólar y la Inflación Importada',
          narration:
            'Cuando la Reserva Federal de EE. UU. mueve sus tasas o el dólar sube, los componentes electrónicos y maquinaria importada cambian de precio en pesos.',
          visualKeyMetric: 'Tipo de Cambio USD/MXN · Inflación Importada',
          visualContext: 'Interconexión financiera global (BIS 2025)',
        },
        {
          step: 2,
          title: 'Remesas: El amortiguador mexicano',
          narration:
            'Más de $60,000 millones de dólares anuales enviados por familias desde el exterior sostienen el consumo y frenan la caída del Efecto Dominó en millones de hogares.',
          visualKeyMetric: '>$60,000M USD anuales en remesas',
          visualContext: 'Estabilizador socioeconómico',
        },
        {
          step: 3,
          title: 'Nearshoring y T-MEC',
          narration:
            'Parques industriales en Guanajuato, Querétaro, Nuevo León, Coahuila y Chihuahua crecen por la relocalización de cadenas globales de suministro.',
          visualKeyMetric: '75% contenido regional bajo el T-MEC',
          visualContext: 'Ventaja estratégica de México',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena cómo viaja una ola económica internacional hasta llegar a tu ciudad:',
      correctOrder: [
        'Ocurre un ajuste de tasas en EE. UU. o un cambio en cadenas globales de suministro',
        'Se mueven los flujos de capital internacional y varía el tipo de cambio USD/MXN',
        'Se ajusta el costo en pesos de la tecnología y materias primas importadas',
        'Cambia el precio en tiendas locales y la actividad en industrias exportadoras',
      ],
      explanation:
        'Comprender estos canales te da visión macroeconómica para anticipar cambios de precios y oportunidades.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'Cobro Internacional o Remesa ($250 USD)',
      context:
        'Recibes $250 USD desde el extranjero. Una ventanilla informal te castiga el tipo de cambio y cobra $18 USD de comisión, mientras que una cuenta regulada te da tipo de cambio competitivo y permite separar ahorro.',
      impulseOption: {
        label: 'Cambiarlo en la ventanilla cara y gastarlo todo ese mismo día',
        dopamineTrap:
          'Pierdes más de $420 MXN en comisiones y diferencial cambiario en un instante.',
        financialImpactMXN: -420,
      },
      resilientOption: {
        label: 'Usar un canal regulado de baja comisión y mandar el 30% a mi portafolio antes de gastar',
        cognitiveBenefit:
          'Aprovechas cada dólar al máximo y conviertes un ingreso externo en patrimonio.',
        financialImpactMXN: 1500,
      },
    },
    quiz: [
      {
        id: 'b11_q1',
        conceptTag: 'Nearshoring y T-MEC',
        question: '¿En qué consiste el fenómeno del "Nearshoring" que impulsa la economía industrial en México?',
        options: [
          'En que empresas multinacionales trasladan sus fábricas desde países lejanos hacia México para estar cerca del mercado norteamericano y aprovechar el T-MEC',
          'En cerrar las fronteras al comercio exterior',
          'En importar únicamente videojuegos',
          'En eliminar el transporte terrestre',
        ],
        correctIndex: 0,
        explanation:
          'El nearshoring recorta los tiempos de entrega de más de un mes en barco a solo 2–4 días por carretera o tren.',
      },
      {
        id: 'b11_q2',
        conceptTag: 'Amortiguador de Remesas e Inflación Importada',
        question: '¿Qué efecto tienen las remesas familiares dentro del análisis del Efecto Dominó en México?',
        options: [
          'Actúan como un amortiguador real que inyecta liquidez directa a los hogares y frena la caída del consumo básico',
          'Hacen que desaparezcan las monedas',
          'Solo llegan a bancos en Europa',
          'No tienen ningún impacto en las familias',
        ],
        correctIndex: 0,
        explanation:
          'Las remesas fortalecen el ingreso directo de millones de familias para alimentación, salud, educación y vivienda.',
      },
    ],
  },
  {
    id: 12,
    stage: 2,
    title: 'El Mercado Global de Capitales',
    subtitle: 'Acceso Bursátil desde el Celular (Acciones y ETFs)',
    biomeName: 'Montaña (Alta Cumbre Glaciar)',
    biomeFamily: 'paramo',
    imageUrl: biome12GlacierPeakImg,
    durationMinutes: 4,
    coreCompetency: 'Renta Variable, BMV/BIVA, SIC y ETFs diversificados',
    summary:
      'Pasa de ser solo cliente de las grandes marcas globales a ser dueño de una fracción de ellas mediante ETFs diversificados.',
    theoryParagraphs: [
      'Una vez que tu Fondo de Emergencia está firme en Renta Fija (CETES), puedes explorar la Renta Variable. Al adquirir una Acción en una Casa de Bolsa regulada por la CNBV (operando en la BMV, BIVA o el Sistema Internacional de Cotizaciones SIC), te conviertes en copropietario de una empresa real.',
      'Para no jugarte todo tu dinero a una sola carta, existen los ETFs (Fondos Cotizados en Bolsa): una canasta inteligente que agrupa cientos de empresas líderes (como las 500 más grandes del S&P 500 o el índice nacional) en una sola compra accesible desde tu celular.',
    ],
    levelAdaptation: {
      seedMode:
        'Analiza qué empresas crean la tecnología, procesadores y servicios que usas todos los días: entender sus modelos de negocio es la base de la inversión bursátil.',
      flightMode:
        'Aplica la estrategia de aportaciones constantes (Dollar-Cost Averaging) en ETFs diversificados de bajo costo con horizonte paciente de mediano y largo plazo.',
    },
    curiousFact: {
      stat: '1 ETF = Cientos de Empresas',
      fact: 'Con un solo título de un ETF indexado eres dueño de una pequeña fracción de cientos de compañías líderes al mismo tiempo, reduciendo drásticamente el riesgo individual.',
      source: 'CNBV / Bolsa Mexicana de Valores (2025)',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: Consumidor vs. Inversionista con ETFs',
      durationLabel: '01:30 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'Renta Fija vs. Renta Variable',
          narration:
            'En Renta Fija prestas dinero a tasa conocida. En Renta Variable eres socio de empresas: el precio sube y baja en el corto plazo, pero premia la paciencia a largo plazo.',
          visualKeyMetric: 'El secreto de las finanzas es la paciencia',
          visualContext: 'Mentalidad de largo plazo',
        },
        {
          step: 2,
          title: 'Diversificación automática con ETFs',
          narration:
            'Si una empresa individual tropieza, las otras 499 dentro del ETF sostienen tu canasta. Eso es diversificar con inteligencia.',
          visualKeyMetric: 'No pongas todos los huevos en una canasta',
          visualContext: 'Gestión científica del riesgo',
        },
        {
          step: 3,
          title: 'Constancia > Especulación',
          narration:
            'Intentar adivinar el precio de mañana ("day trading") suele terminar en pérdidas. Invertir un monto constante mes a mes construye riqueza real.',
          visualKeyMetric: 'Hábito mensual > Apuesta de un día',
          visualContext: 'Disciplina conductual',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena la ruta segura para dar el salto al Mercado de Capitales:',
      correctOrder: [
        'Tener completo tu Fondo de Emergencia en Renta Fija (CETES / Bonddia)',
        'Elegir únicamente una Casa de Bolsa autorizada y supervisada por la CNBV',
        'Seleccionar un instrumento diversificado de bajas comisiones (ETF indexado)',
        'Realizar aportaciones periódicas manteniendo la calma ante subidas y bajadas',
      ],
      explanation:
        'Tener tu base en renta fija te da la serenidad necesaria para dejar crecer tu renta variable sin vender en pánico.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'Endeudarse por el Teléfono Más Caro ($24,000 MXN) vs. Equipo Funcional + ETF',
      context:
        'Tu celular actual funciona perfecto, pero sale la versión nueva por $24,000 MXN. Puedes endeudarte para comprarlo o seguir con el tuyo e invertir en el ETF que incluye a esa misma empresa.',
      impulseOption: {
        label: 'Endeudarme por $24,000 MXN en un aparato que valdrá 40% menos el próximo año',
        dopamineTrap:
          'Compras un artículo que se deprecia rápido mientras pagas intereses.',
        financialImpactMXN: -9600,
      },
      resilientOption: {
        label: 'Conservar mi teléfono actual y volverme accionista constante mediante ETFs',
        cognitiveBenefit:
          'Dejas de financiar pasivos caros y pasas al lado de quienes poseen activos productivos.',
        financialImpactMXN: 6000,
      },
    },
    quiz: [
      {
        id: 'b12_q1',
        conceptTag: 'ETFs y Diversificación Bursátil',
        question: '¿Qué ventaja principal ofrece un ETF frente a comprar acciones de una sola compañía aislada?',
        options: [
          'Agrupa decenas o cientos de empresas en una sola canasta, diversificando el riesgo automáticamente',
          'Duplica tu saldo todos los lunes sin excepción',
          'No requiere conexión a internet',
          'Funciona como billete de lotería instantáneo',
        ],
        correctIndex: 0,
        explanation:
          'Un ETF distribuye tu inversión entre muchas empresas líderes, evitando que el tropiezo de una sola afecte todo tu ahorro.',
      },
      {
        id: 'b12_q2',
        conceptTag: 'Regulación Bursátil en México (CNBV)',
        question: '¿Qué institución regula y supervisa a las Casas de Bolsa legales en México?',
        options: [
          'La Comisión Nacional Bancaria y de Valores (CNBV)',
          'Cualquier canal de videos en internet',
          'La oficina de correos',
          'No existe supervisión para casas de bolsa',
        ],
        correctIndex: 0,
        explanation:
          'La CNBV supervisa que las Casas de Bolsa autorizadas custodien legalmente los valores de cada inversionista.',
      },
    ],
  },
  {
    id: 13,
    stage: 2,
    title: 'Inversión en Monedas Fuertes',
    subtitle: 'Estrategias de Cobertura y Protección Cambiaria (UDIs, USD, EUR)',
    biomeName: 'Páramo Andino de Frailejones',
    biomeFamily: 'paramo',
    imageUrl: biome13ParamoImg,
    durationMinutes: 4,
    coreCompetency: 'Cobertura cambiaria, Udibonos y diversificación multimoneda',
    summary:
      'En el páramo de altura la vegetación resiste cualquier clima. Aprende a blindar tu portafolio contra la inflación y el tipo de cambio.',
    theoryParagraphs: [
      'Una Cobertura Financiera (Hedging) es como llevar chamarra térmica en la alta montaña: equilibra tu portafolio para que ni la inflación ni los saltos del tipo de cambio detengan tus metas.',
      'Tienes dos grandes escudos a tu alcance: 1) Escudo Inflacionario Interno con UDIs (Unidades de Inversión creadas por Banxico que suben todos los días al ritmo exacto de la inflación, disponibles mediante Udibonos en CETES Directo), y 2) Escudo Cambiario Externo mediante instrumentos productivos ligados a divisas fuertes como el Dólar (USD) o el Euro (EUR).',
    ],
    levelAdaptation: {
      seedMode:
        'Si tu meta incluye estudiar fuera, certificarte en el extranjero o comprar equipo cotizado en dólares, conocer las UDIs y las coberturas protege tu objetivo.',
      flightMode:
        'Evita guardar billetes de dólar en un cajón (también pierden valor por la inflación de EE. UU.): cúbrete usando instrumentos que además paguen rendimiento.',
    },
    curiousFact: {
      stat: '1 UDI en 1995: $1.00 → Hoy > $8.35 MXN',
      fact: 'Cuando Banxico creó la UDI en 1995 valía $1.00 peso; hoy supera los $8.35 pesos porque actualiza su valor diariamente con la inflación oficial.',
      source: 'Banco de México (2026) · Valor de la UDI',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: Tus 2 Escudos de Alta Montaña',
      durationLabel: '01:25 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'Por qué no comprar divisas en pánico',
          narration:
            'Comprar dólares corriendo cuando sale en las noticias que subió al máximo hace que compres caro. La cobertura se construye paso a paso con calma.',
          visualKeyMetric: 'Estrategia constante > Compras de pánico',
          visualContext: 'Inteligencia emocional financiera',
        },
        {
          step: 2,
          title: 'Escudo 1: Udibonos contra la inflación',
          narration:
            'Un Udibono te garantiza el 100% de la inflación acumulada en México más una tasa real extra.',
          visualKeyMetric: 'Udibono = Inflación (UDI) + Tasa Real Fija',
          visualContext: 'Blindaje automático del poder de compra',
        },
        {
          step: 3,
          title: 'Escudo 2: Activos productivos en moneda fuerte',
          narration:
            'Empareja la moneda de tu ahorro con la moneda de tu meta: pesos/UDIs para metas nacionales y activos en USD/EUR para metas internacionales.',
          visualKeyMetric: 'Portafolio Multimoneda Equilibrado',
          visualContext: 'Cobertura inteligente',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena cómo armar un portafolio blindado contra inflación y tipo de cambio:',
      correctOrder: [
        'Resguardar tus gastos cercanos y emergencias en pesos líquidos (Bonddia / CETES)',
        'Blindar metas nacionales de mediano plazo contra la inflación usando Udibonos (UDIs)',
        'Vincular metas internacionales o de largo plazo a activos productivos en moneda fuerte',
        'Rebalancear con calma una vez al año sin dejarte llevar por titulares alarmistas',
      ],
      explanation:
        'Así cada piso de tu patrimonio cumple una función protectora específica.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'Meta de Viaje o Intercambio Académico ($2,000 USD en 2 años)',
      context:
        'Tienes planeado un viaje académico internacional en 24 meses que requerirá $2,000 USD.',
      impulseOption: {
        label: 'No cubrir nada y esperar a cambiar todos los dólares el día antes del vuelo',
        dopamineTrap:
          'Si hay volatilidad global esa semana, el viaje te saldrá miles de pesos más caro.',
        financialImpactMXN: -5200,
      },
      resilientOption: {
        label: 'Acumular mes a mes en instrumentos con cobertura cambiaria y rendimiento, promediando el costo',
        cognitiveBenefit:
          'Neutralizas los sobresaltos del tipo de cambio y llegas a tu meta con certeza.',
        financialImpactMXN: 3800,
      },
    },
    quiz: [
      {
        id: 'b13_q1',
        conceptTag: 'UDIs y Cobertura Inflacionaria',
        question: '¿Qué es una UDI (Unidad de Inversión) calculada por el Banco de México?',
        options: [
          'Una unidad de valor que sube diariamente al ritmo exacto de la inflación (INPC) para blindar el poder de compra',
          'Un token de videojuego',
          'Un recargo por pagar tarde la luz',
          'Una cuenta corriente sin intereses',
        ],
        correctIndex: 0,
        explanation:
          'Las UDIs reflejan la inflación oficial día tras día; al invertir en Udibonos aseguras que tu dinero jamás pierda poder adquisitivo.',
      },
      {
        id: 'b13_q2',
        conceptTag: 'Estrategia de Cobertura Cambiaria',
        question: '¿Por qué conviene más cubrirse en moneda fuerte con instrumentos que dan rendimiento que guardar billetes físicos en casa?',
        options: [
          'Porque los billetes guardados en un cajón no pagan intereses, corren riesgo de extravío y también sufren la inflación de su propio país',
          'Porque los billetes cambian de color cada mes',
          'Porque los cajones cobran impuestos',
          'Porque está prohibido viajar con ahorros',
        ],
        correctIndex: 0,
        explanation:
          'El dólar y el euro también tienen inflación; mantenerlos en activos productivos protege tanto el tipo de cambio como el crecimiento real.',
      },
    ],
  },
  {
    id: 14,
    stage: 2,
    title: 'Cripto Activos y Finanzas',
    subtitle: 'Disrupción Tecnológica, Blockchain y Gestión de Riesgos Globales',
    biomeName: 'Superpáramo Volcánico Estelar',
    biomeFamily: 'paramo',
    imageUrl: biome14VolcanicAuroraImg,
    durationMinutes: 4,
    coreCompetency: 'Tecnología Blockchain, Ley Fintech, volatilidad extrema y tope del 5%',
    summary:
      'Llega a la cumbre de Capital Bloom: separa la tecnología real de la cadena de bloques frente al humo de las "memecoins" y estafas.',
    theoryParagraphs: [
      'Una Blockchain (cadena de bloques) es un registro distribuido y protegido por criptografía que permite validar operaciones en red. Aunque su aporte tecnológico es valioso, en el terreno financiero los criptoactivos presentan volatilidad extrema (caídas de 50% a 80% en semanas) y no son moneda de curso legal en México según el Banco de México y la Ley Fintech.',
      'La regla de oro de gestión de riesgos global es contundente: jamás uses tu Fondo de Emergencia ni pidas prestado para comprar activos volátiles, huye de cualquier "memecoin" promocionada por moda y, si decides explorar este sector, limítalo siempre a menos del 5% de tu portafolio total.',
    ],
    levelAdaptation: {
      seedMode:
        'Aprende cómo funcionan la criptografía y las redes descentralizadas desde la ciencia de datos, y activa tu detector contra esquemas "Pump & Dump" en redes sociales.',
      flightMode:
        'Construye primero el 95% de tu pirámide en instrumentos regulados (CETES, Udibonos y ETFs) antes de asignar siquiera un 1%–5% a activos de alto riesgo.',
    },
    curiousFact: {
      stat: 'Tope Prudencial: Máximo 1% – 5%',
      fact: 'Los gestores profesionales limitan cualquier activo hipervolátil a un máximo del 1% al 5% del portafolio, para que ni siquiera una caída del 80% ponga en peligro su patrimonio.',
      source: 'BIS / Banxico (2025) · Gestión de Riesgos en Activos Virtuales',
    },
    shortVideoCapsule: {
      title: 'Cápsula Animada: La Pirámide Sólida vs. El Espejismo Viral',
      durationLabel: '01:35 min · 3 escenas',
      scenes: [
        {
          step: 1,
          title: 'Tecnología real vs. Especulación ciega',
          narration:
            'La criptografía y blockchain son herramientas informáticas reales, pero miles de tokens sin utilidad se crean solo para vaciar a compradores impulsivos.',
          visualKeyMetric: 'Tecnología ≠ Dinero Mágico Garantizado',
          visualContext: 'Pensamiento crítico financiero',
        },
        {
          step: 2,
          title: 'Cómo opera un "Pump & Dump"',
          narration:
            'Un grupo infla artificialmente una moneda desconocida con campañas virales (FOMO) y vende todo de golpe cuando entran compradores inexpertos.',
          visualKeyMetric: 'FOMO = La trampa más cara del mercado',
          visualContext: 'Defensa contra manipulación en redes',
        },
        {
          step: 3,
          title: 'La Pirámide Patrimonial de Capital Bloom',
          narration:
            'Base firme: Hábito y Fondo de Emergencia en CETES. Centro fuerte: Udibonos y ETFs globales. Punta opcional (<5%): Alto riesgo.',
          visualKeyMetric: '95% Cimiento Regulado · <5% Alto Riesgo',
          visualContext: 'Graduación de los 14 Biomas',
        },
      ],
    },
    sequenceActivity: {
      prompt: 'Ordena de la base más firme a la punta de mayor riesgo la Pirámide de Capital Bloom:',
      correctOrder: [
        'Base: Control de flujo de efectivo y Fondo de Emergencia en Bonddia / CETES',
        'Segundo nivel: Renta Fija a plazo y escudo contra inflación (CETES / Udibonos)',
        'Tercer nivel: Renta Variable global diversificada a largo plazo (ETFs regulados)',
        'Punta opcional (<5%): Activos alternativos o digitales de alta volatilidad',
      ],
      explanation:
        'Empezar la pirámide desde la base garantiza que tu tranquilidad nunca dependa de la suerte.',
    },
    dilemmaChallenge: {
      scenarioTitle: 'El Token Viral de Moda',
      context:
        'En redes todos presumen una moneda con dibujo de mascota que subió 300% ayer. Te sugieren meter los $4,000 MXN de tu Fondo de Emergencia hoy mismo.',
      impulseOption: {
        label: 'Meter todo mi Fondo de Emergencia por miedo a quedarme fuera (FOMO)',
        dopamineTrap:
          'Entras justo en la cima del "Pump & Dump"; en 48 horas se desploma 85% y pierdes tu escudo.',
        financialImpactMXN: -3400,
      },
      resilientOption: {
        label: 'Blindar el 100% de mi Fondo de Emergencia en CETES y jamás arriesgar dinero indispensable',
        cognitiveBenefit:
          'Tu corteza prefrontal vence al ruido viral: tus $4,000 MXN siguen seguros y ganando intereses.',
        financialImpactMXN: 4000,
      },
    },
    quiz: [
      {
        id: 'b14_q1',
        conceptTag: 'Blockchain y Gestión de Riesgo Cripto',
        question: '¿Cuál es la regla prudencial de gestión de riesgos frente a los criptoactivos?',
        options: [
          'Comprender su tecnología y volatilidad extrema, jamás arriesgar el Fondo de Emergencia ni usar deuda, y limitar cualquier exposición a menos del 5% del portafolio',
          'Pedir un préstamo en efectivo para comprar monedas de moda',
          'Enviar dinero a desconocidos que prometen multiplicarlo en 24 horas',
          'Vender todo tu ahorro seguro para apostarlo en un solo token',
        ],
        correctIndex: 0,
        explanation:
          'La educación financiera neutral enseña a distinguir la tecnología del ruido especulativo, protegiendo siempre el 95%+ de tu base patrimonial.',
      },
      {
        id: 'b14_q2',
        conceptTag: 'Esquemas Pump & Dump y FOMO',
        question: '¿Qué ocurre en un esquema "Pump and Dump" promocionado en redes sociales?',
        options: [
          'Se infla artificialmente el precio de un activo sin respaldo mediante euforia viral (FOMO) para que los creadores vendan caro a costa de quienes entran al final',
          'El Banco de México reparte bonos de ahorro',
          'Se reinvierten intereses en renta fija',
          'Se firma un acuerdo comercial internacional',
        ],
        correctIndex: 0,
        explanation:
          'Detectar el mecanismo del FOMO y del "Pump & Dump" inmuniza tu bolsillo contra estafas virales.',
      },
    ],
  },
];
