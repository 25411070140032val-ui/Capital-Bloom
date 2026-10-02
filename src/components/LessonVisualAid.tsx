import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Film,
  Sparkles,
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';
import { stopWarmVoice } from '../utils/warmVoice';

export interface LessonVisualAidProps {
  biomeId?: number;
  lessonNumber: 1 | 2 | 3 | 4 | 5 | 6;
  topicTitle: string;
  topicSummary?: string;
  biomeTitle: string;
  keyFactStat?: string;
  keyFactLabel?: string;
  dailyMistakeLabel?: string;
  dailySmartLabel?: string;
  sequenceSteps?: string[];
  onVideoComplete?: () => void;
  onSpeakScene?: (sceneText: string, onDone?: () => void) => void;
}

interface StoryCardNode {
  badge: string;
  emoji: string;
  title: string;
  description: string;
  accentBorder: string;
  accentBg: string;
}

interface StorySceneSpec {
  sceneNumber: 1 | 2 | 3 | 4;
  tabLabel: string;
  sceneTitle: string;
  bgGradient: string;
  voiceScript: string;
  subtitleText: string;
  cards: [StoryCardNode, StoryCardNode, StoryCardNode];
}

const EMPTY_STEPS: string[] = [];

/**
 * Convierte el resumen técnico de la lección en una oración narrativa natural con hilo conductor.
 */
function formatNaturalSummary(topicTitle: string, rawSummary: string): string {
  const cleaned = rawSummary
    .replace(/^Únicamente se enfoca en\s+/i, '')
    .replace(/\.$/, '')
    .trim();

  if (!cleaned) {
    return `Comprender cómo funciona ${topicTitle.toLowerCase()} te permite tomar mejores decisiones con tu dinero.`;
  }

  return `En esta historia veremos cómo ${cleaned}.`;
}

/**
 * Construye las 4 escenas animadas con continuidad narrativa completa de principio a fin,
 * sin mencionar "capítulo tal" y conectando cada escena con la siguiente.
 */
function buildStoryScenesForLesson(params: {
  biomeId: number;
  lessonNumber: 1 | 2 | 3 | 4 | 5 | 6;
  topicTitle: string;
  topicSummary: string;
  keyFactStat: string;
  keyFactLabel: string;
  dailyMistakeLabel: string;
  dailySmartLabel: string;
  sequenceSteps: string[];
}): StorySceneSpec[] {
  const {
    biomeId,
    lessonNumber,
    topicTitle,
    topicSummary,
    keyFactStat,
    keyFactLabel,
    dailyMistakeLabel,
    dailySmartLabel,
    sequenceSteps,
  } = params;

  // =========================================================================
  // BIOMA 1 · LECCIÓN 1: LA HISTORIA DEL DINERO Y EL TRUEQUE
  // =========================================================================
  if (biomeId === 1 && lessonNumber === 1) {
    return [
      {
        sceneNumber: 1,
        tabLabel: '1. El Trueque',
        sceneTitle: 'El Trueque Directo y su Límite',
        bgGradient: 'from-[#132A1E] via-[#1B4332] to-[#0F172A]',
        voiceScript:
          'Hace miles de años no existían las monedas ni los billetes, así que todo se conseguía mediante el trueque directo. Pero si un agricultor tenía maíz y necesitaba calzado, y el artesano solo buscaba pescado, el intercambio no se podía realizar.',
        subtitleText:
          '1º El Trueque: Si el agricultor ofrecía maíz 🌽 por calzado 🩴, pero el artesano solo buscaba pescado 🐟, no había coincidencia ni trato.',
        cards: [
          {
            badge: 'PASO 1 · QUIEN OFRECE',
            emoji: '🧑‍🌾🌽',
            title: 'Agricultor con Maíz',
            description: 'Cosechó maíz fresco y necesita cambiarlo hoy mismo por unos huaraches.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
          {
            badge: 'PASO 2 · EL LÍMITE',
            emoji: '🌽 ❌ 🐟',
            title: 'Sin Doble Coincidencia',
            description: 'Para que el trueque funcionara, ambos debían querer lo del otro al mismo tiempo.',
            accentBorder: 'border-[#F87171]',
            accentBg: 'bg-[#7F1D1D]/90',
          },
          {
            badge: 'PASO 3 · TRATO FRENADO',
            emoji: '👞🩴',
            title: 'Artesano de Calzado',
            description: 'Tiene el calzado listo, pero no necesita maíz porque hoy busca pescado.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
        ],
      },
      {
        sceneNumber: 2,
        tabLabel: '2. El Cacao',
        sceneTitle: 'El Cacao como Moneda en Mesoamérica',
        bgGradient: 'from-[#2A1810] via-[#3E2723] to-[#0F172A]',
        voiceScript:
          'Para superar esa barrera del trueque, las sociedades buscaron un objeto valioso y fácil de contar que todos aceptaran. En Mesoamérica usaron semillas de cacao como moneda, donde un tamal valía un cacao y una canoa equivalía a cien semillas de cacao.',
        subtitleText:
          '2º La Solución: En Mesoamérica usaron semillas de cacao 🫘 como dinero aceptado por todos (1 tamal = 1 cacao y 100 semillas = 1 canoa 🛶).',
        cards: [
          {
            badge: 'PASO 1 · DINERO MERCANCÍA',
            emoji: '🫘✨',
            title: 'Semillas de Cacao',
            description: 'Un bien valioso, fácil de dividir y aceptado por todos en el mercado.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'PASO 2 · DATO CLAVE',
            emoji: '🫘100 = 🛶1',
            title: '100 Cacao = 1 Canoa',
            description: 'Con 1 semilla comprabas 1 tamal y con 100 semillas de cacao 1 canoa entera.',
            accentBorder: 'border-[#E0B0FF]',
            accentBg: 'bg-[#3B0764]/90',
          },
          {
            badge: 'PASO 3 · INTERCAMBIO LIBRE',
            emoji: '🧑‍🌾🫘➡️🩴',
            title: 'Comercio Destrabado',
            description: 'El agricultor vende su maíz por cacao y con ese cacao compra su calzado.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
      {
        sceneNumber: 3,
        tabLabel: '3. Billetes',
        sceneTitle: 'De las Monedas Metálicas al Papel Moneda',
        bgGradient: 'from-[#1E293B] via-[#0F172A] to-[#064E3B]',
        voiceScript:
          'Después del cacao se acuñaron monedas de oro y plata, pero cargarlas en cofres pesados a otras ciudades era lento y peligroso. Por eso nacieron los billetes de papel moneda, que son ligeros y hoy están respaldados por el Banco de México.',
        subtitleText:
          '3º Evolución: Para no cargar cofres pesados de monedas 🪙📦, surgieron los billetes ligeros respaldados por el Banco de México 🏛️💵.',
        cards: [
          {
            badge: 'PASO 1 · METALES PRECIOSOS',
            emoji: '🪙📦',
            title: 'Monedas Pesadas',
            description: 'El oro y la plata duraban mucho, pero pesaban demasiado en viajes largos.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'PASO 2 · RESPALDO OFICIAL',
            emoji: '🏛️🛡️',
            title: 'Banco de México',
            description: 'Institución que respalda y cuida el valor de nuestra moneda nacional.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
          {
            badge: 'PASO 3 · PAPEL MONEDA',
            emoji: '💵🇲🇽',
            title: 'Billetes Prácticos',
            description: 'Ligeros en tu bolsillo y aceptados en todo el país de forma inmediata.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
      {
        sceneNumber: 4,
        tabLabel: '4. Era Digital',
        sceneTitle: 'El Dinero Digital y sus 3 Funciones en tu Día a Día',
        bgGradient: 'from-[#064E3B] via-[#0A3323] to-[#0F172A]',
        voiceScript:
          'En la actualidad el dinero también viaja en segundos por transferencia digital desde tu celular. Todos los días cumple tres funciones: es medio de cambio al comprar, unidad de cuenta al medir precios y depósito de valor al ahorrar.',
        subtitleText:
          '4º Hoy en tu vida: El dinero viaja en segundos 📱⚡ y cumple 3 funciones: Medio de Cambio, Unidad de Cuenta y Depósito de Valor.',
        cards: [
          {
            badge: 'FUNCIÓN 1 · COMPRAR',
            emoji: '🛒📲',
            title: 'Medio de Cambio',
            description: 'Pagas alimentos, transporte o servicios al instante sin depender del trueque.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
          {
            badge: 'FUNCIÓN 2 · COMPARAR',
            emoji: '🏷️⚖️',
            title: 'Unidad de Cuenta',
            description: 'Mides y comparas el valor de cualquier producto en pesos mexicanos.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'FUNCIÓN 3 · AHORRAR',
            emoji: '🐷📈',
            title: 'Depósito de Valor',
            description: 'Conservas e inviertes el fruto de tu tiempo hoy para tus metas futuras.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
        ],
      },
    ];
  }

  // =========================================================================
  // BIOMA 1 · LECCIÓN 2: EL VALOR DEL DINERO FIDUCIARIO Y BANXICO
  // =========================================================================
  if (biomeId === 1 && lessonNumber === 2) {
    return [
      {
        sceneNumber: 1,
        tabLabel: '1. Fiducia',
        sceneTitle: '¿Por qué tienen valor los billetes?',
        bgGradient: 'from-[#0A3323] via-[#145A3A] to-[#0F172A]',
        voiceScript:
          'A diferencia de las monedas antiguas de oro, los billetes actuales no valen por el papel con que están hechos. Se llaman dinero fiduciario porque su valor nace de la confianza y de todos los bienes y servicios que produce el país.',
        subtitleText:
          '1º Dinero Fiduciario: Los billetes valen por la confianza y el respaldo de la producción real de bienes y servicios de México.',
        cards: [
          {
            badge: 'EL BILLETE',
            emoji: '💵🇲🇽',
            title: 'Moneda Fiduciaria',
            description: 'Su valor no está en el papel físico, sino en lo que puedes comprar con él.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
          {
            badge: 'EL MOTOR REAL',
            emoji: '🏭🥑🏪',
            title: 'Producción del País',
            description: 'Los alimentos, fábricas y servicios de México respaldan cada peso.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'EL VÍNCULO',
            emoji: '🤝🛡️',
            title: 'Confianza Colectiva',
            description: 'Todos aceptamos el peso porque sabemos que mantiene su poder de compra.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
        ],
      },
      {
        sceneNumber: 2,
        tabLabel: '2. Banxico',
        sceneTitle: 'La Misión del Banco de México (Banxico)',
        bgGradient: 'from-[#1E293B] via-[#0F172A] to-[#064E3B]',
        voiceScript:
          'Para cuidar esa confianza, en México existe una institución autónoma llamada Banco de México, conocida como Banxico. Su misión principal es regular cuántos billetes y monedas circulan para proteger el poder adquisitivo de tu dinero.',
        subtitleText:
          '2º Banxico 🏛️: Es la institución autónoma que regula los billetes en circulación para proteger tu poder adquisitivo.',
        cards: [
          {
            badge: 'INSTITUCIÓN AUTÓNOMA',
            emoji: '🏛️🔐',
            title: 'Banco de México',
            description: 'Autoridad encargada de emitir la moneda nacional con total autonomía.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
          {
            badge: 'EQUILIBRIO MONETARIO',
            emoji: '⚖️💵',
            title: 'Control de Billetes',
            description: 'Vigila que la cantidad de dinero crezca en armonía con la economía real.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'TU BENEFICIO',
            emoji: '🛒🛡️',
            title: 'Poder Adquisitivo',
            description: 'Defiende que tus pesos sigan alcanzando para comprar en el mercado.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
      {
        sceneNumber: 3,
        tabLabel: '3. Inflación',
        sceneTitle: '¿Qué pasa si se imprimen billetes sin control?',
        bgGradient: 'from-[#450A0A] via-[#1E293B] to-[#0F172A]',
        voiceScript:
          'Si un gobierno imprimiera millones de billetes extra sin que el país produzca más alimentos ni servicios, habría demasiado dinero para pocos productos. Eso provocaría inflación, haciendo que los precios se disparen y cada billete valga menos.',
        subtitleText:
          '3º El Riesgo: Imprimir billetes sin producir más bienes provoca inflación 📈 y hace que el dinero pierda su valor de compra.',
        cards: [
          {
            badge: 'ERROR MONETARIO',
            emoji: '🖨️💵💵',
            title: 'Imprimir sin Respaldo',
            description: 'Lanzar muchos billetes cuando las fábricas y el campo producen lo mismo.',
            accentBorder: 'border-[#F87171]',
            accentBg: 'bg-[#7F1D1D]/90',
          },
          {
            badge: 'DESEQUILIBRIO',
            emoji: '💵⬆️ 🍎➡️',
            title: 'Pocos Productos',
            description: 'Demasiado dinero compitiendo por la misma cantidad de alimentos y bienes.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'CONSECUENCIA',
            emoji: '🏷️📈',
            title: 'Subida de Precios',
            description: 'Todo se encarece; por eso Banxico limita y cuida la emisión de dinero.',
            accentBorder: 'border-[#E0B0FF]',
            accentBg: 'bg-[#3B0764]/90',
          },
        ],
      },
      {
        sceneNumber: 4,
        tabLabel: '4. En tu Vida',
        sceneTitle: 'Cómo Cuidar el Poder de Compra de tus Pesos',
        bgGradient: 'from-[#064E3B] via-[#0A3323] to-[#0F172A]',
        voiceScript:
          'Como el verdadero valor de tu dinero es lo que puedes comprar con él, en tu día a día evita dejar tus ahorros estancados bajo el colchón. Mejor guárdalos en cuentas formales que generen rendimientos para proteger tu poder adquisitivo.',
        subtitleText:
          '4º En tu día a día: No dejes tus billetes estancados bajo el colchón 🛏️; usa cuentas formales con rendimiento 🏦📈.',
        cards: [
          {
            badge: '❌ EVITA ESTO',
            emoji: '🛏️💸',
            title: 'Dinero Bajo el Colchón',
            description: 'El efectivo inmóvil en casa pierde poder de compra año tras año.',
            accentBorder: 'border-[#F87171]',
            accentBg: 'bg-[#7F1D1D]/90',
          },
          {
            badge: '⚖️ LO QUE IMPORTA',
            emoji: '🛡️📊',
            title: 'Capacidad de Compra',
            description: 'Cuida cuántos bienes reales alcanza a comprar tu ahorro en el futuro.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: '✅ HAZ ESTO HOY',
            emoji: '🏦📈',
            title: 'Ahorro con Rendimiento',
            description: 'Coloca tu dinero en instrumentos seguros que crezcan por encima de los precios.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
    ];
  }

  // =========================================================================
  // BIOMA 1 · LECCIÓN 3: LOS 3 SECTORES PRODUCTIVOS DE MÉXICO
  // =========================================================================
  if (biomeId === 1 && lessonNumber === 3) {
    return [
      {
        sceneNumber: 1,
        tabLabel: '1. Primario',
        sceneTitle: 'El Sector Primario: La Raíz en el Campo',
        bgGradient: 'from-[#132A1E] via-[#1B4332] to-[#0F172A]',
        voiceScript:
          'Toda la riqueza que mueve a México se divide en tres grandes sectores productivos. El primero es el Sector Primario, que aporta cerca del cuatro por ciento del Producto Interno Bruto obteniendo recursos de la agricultura, ganadería y pesca.',
        subtitleText:
          '1º Sector Primario (~4% del PIB): Obtiene los alimentos y materias primas directamente de la agricultura 🌽, ganadería 🐄 y pesca 🐟.',
        cards: [
          {
            badge: 'SECTOR PRIMARIO',
            emoji: '🌽🥑🌾',
            title: 'Agricultura y Campo',
            description: 'Cultivo de maíz, aguacate, frutos rojos y alimentos que nutren al país.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
          {
            badge: 'RECURSOS NATURALES',
            emoji: '🐄🐟🌲',
            title: 'Ganadería y Pesca',
            description: 'Aprovechamiento directo de la naturaleza para generar insumos esenciales.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'APORTE AL PIB',
            emoji: '📊 4%',
            title: '~4% del PIB Nacional',
            description: 'Aunque es el porcentaje más pequeño, es la base indispensable para los demás.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
        ],
      },
      {
        sceneNumber: 2,
        tabLabel: '2. Secundario',
        sceneTitle: 'El Sector Secundario: La Industria que Transforma',
        bgGradient: 'from-[#1E293B] via-[#0F172A] to-[#1E3A8A]',
        voiceScript:
          'Después, esas materias primas del campo viajan al Sector Secundario, que representa cerca del treinta y dos por ciento del PIB de México. Aquí las fábricas, la industria automotriz y la construcción transforman los insumos en productos terminados.',
        subtitleText:
          '2º Sector Secundario (~32% del PIB): La industria 🏭, manufactura automotriz 🚗 y construcción 🏗️ transforman la materia prima.',
        cards: [
          {
            badge: 'MANUFACTURA',
            emoji: '🏭⚙️',
            title: 'Fábricas e Industria',
            description: 'Procesan los recursos naturales para convertirlos en alimentos empacados y equipos.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
          {
            badge: 'EXPORTACIÓN',
            emoji: '🚗✈️🔌',
            title: 'Automotriz y Electrónica',
            description: 'México destaca fabricando vehículos, piezas aeroespaciales y tecnología.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'APORTE AL PIB',
            emoji: '📊 32%',
            title: '~32% del PIB Nacional',
            description: 'Casi una tercera parte de la economía mexicana nace en la industria y construcción.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
      {
        sceneNumber: 3,
        tabLabel: '3. Terciario',
        sceneTitle: 'El Sector Terciario: El Gran Motor de Servicios',
        bgGradient: 'from-[#3B0764] via-[#1E1B4B] to-[#0F172A]',
        voiceScript:
          'Para que esos productos lleguen hasta tus manos entra en acción el Sector Terciario, que es el más grande de México con el sesenta y cuatro por ciento del PIB. Incluye el comercio, el transporte, la educación, el turismo y los servicios digitales.',
        subtitleText:
          '3º Sector Terciario (~64% del PIB): El mayor motor de México, formado por comercio 🏪, logística 🚚, turismo 🏖️ y tecnología 💻.',
        cards: [
          {
            badge: 'DISTRIBUCIÓN',
            emoji: '🏪🚚📦',
            title: 'Comercio y Logística',
            description: 'Lleva los productos desde las fábricas hasta las tiendas y hogares del país.',
            accentBorder: 'border-[#E0B0FF]',
            accentBg: 'bg-[#3B0764]/90',
          },
          {
            badge: 'CONOCIMIENTO',
            emoji: '💻🏥🏖️',
            title: 'Servicios y Turismo',
            description: 'Abarca bancos, hospitales, escuelas, software, restaurantes y hoteles.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
          {
            badge: 'MAYOR MOTOR DEL PIB',
            emoji: '🏆 64%',
            title: '~64% del PIB Nacional',
            description: 'Es el sector que genera la mayor proporción de riqueza y empleos en México.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
      {
        sceneNumber: 4,
        tabLabel: '4. En tu Vida',
        sceneTitle: 'Cómo se Conectan los 3 Sectores en tu Día a Día',
        bgGradient: 'from-[#064E3B] via-[#0A3323] to-[#0F172A]',
        voiceScript:
          'En tu vida diaria los tres sectores trabajan unidos en cada producto que consumes. Conocer cómo se conectan el campo, la industria y los servicios te ayuda a descubrir dónde desarrollar tus habilidades para generar mejores ingresos.',
        subtitleText:
          '4º En tu día a día: Campo (4%) → Industria (32%) → Servicios (64%) trabajan unidos y abren oportunidades para tu talento.',
        cards: [
          {
            badge: 'CADENA COMPLETA',
            emoji: '🌱➡️🏭➡️🏪',
            title: 'De la Tierra a tu Mesa',
            description: 'El campo cosecha, la planta procesa y el comercio lo entrega en tu ciudad.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
          {
            badge: 'DATO CLAVE DEL PIB',
            emoji: '🇲🇽📊',
            title: '4% · 32% · 64%',
            description: 'La suma de los 3 motores impulsa el Producto Interno Bruto de México.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'TU OPORTUNIDAD',
            emoji: '🚀🧠',
            title: 'Aporta Valor Real',
            description: 'Aprender tecnología e idiomas multiplica tu impacto en cualquiera de los 3 sectores.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
        ],
      },
    ];
  }

  // =========================================================================
  // BIOMA 1 · LECCIÓN 4: ECONOMÍA FORMAL VS. ECONOMÍA INFORMAL
  // =========================================================================
  if (biomeId === 1 && lessonNumber === 4) {
    return [
      {
        sceneNumber: 1,
        tabLabel: '1. Informalidad',
        sceneTitle: 'El Límite de la Economía Informal',
        bgGradient: 'from-[#450A0A] via-[#1E293B] to-[#0F172A]',
        voiceScript:
          'En México el cincuenta y cuatro punto ocho por ciento de los trabajadores opera en la economía informal. Aunque reciben dinero en efectivo al instante, no cuentan con contrato, seguro médico ni comprobantes para demostrar sus ingresos.',
        subtitleText:
          '1º Economía Informal (54.8% en México): Entrega efectivo inmediato, pero sin seguro médico ni historial bancario ante imprevistos.',
        cards: [
          {
            badge: 'DATO REAL INEGI',
            emoji: '📊 54.8%',
            title: 'Informalidad en México',
            description: 'Más de la mitad de la fuerza laboral trabaja sin registro ni prestaciones.',
            accentBorder: 'border-[#F87171]',
            accentBg: 'bg-[#7F1D1D]/90',
          },
          {
            badge: 'EFECTIVO SIN RASTRO',
            emoji: '💵⚠️',
            title: 'Sin Comprobantes',
            description: 'Al cobrar solo en efectivo sin recibos, los bancos no pueden ver tu capacidad de pago.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'VULNERABILIDAD',
            emoji: '🏥❌',
            title: 'Sin Escudo Social',
            description: 'Un accidente o imprevisto médico puede consumir todos los ahorros familiares.',
            accentBorder: 'border-[#E0B0FF]',
            accentBg: 'bg-[#3B0764]/90',
          },
        ],
      },
      {
        sceneNumber: 2,
        tabLabel: '2. Formalidad',
        sceneTitle: 'Las Ventajas de la Economía Formal',
        bgGradient: 'from-[#0A3323] via-[#145A3A] to-[#0F172A]',
        voiceScript:
          'En cambio, participar en la economía formal significa que tu trabajo o negocio está registrado legalmente. Eso te brinda acceso a seguridad social, ahorro para el retiro, protección legal y puertas abiertas en el sistema financiero.',
        subtitleText:
          '2º Economía Formal 🛡️: Te brinda seguridad social, ahorro para el retiro, respaldo legal y acceso a créditos más baratos.',
        cards: [
          {
            badge: 'PROTECCIÓN DE SALUD',
            emoji: '🏥🛡️',
            title: 'Seguridad Social',
            description: 'Atención médica, incapacidades y ahorro para tu vivienda y tu retiro.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
          {
            badge: 'HISTORIAL SÓLIDO',
            emoji: '🏦📈',
            title: 'Acceso a Financiamiento',
            description: 'Con ingresos comprobables accedes a créditos bancarios con tasas mucho menores.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
          {
            badge: 'CRECIMIENTO',
            emoji: '🤝🏢',
            title: 'Clientes más Grandes',
            description: 'Al emitir facturas puedes vender tus servicios a empresas e instituciones.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
        ],
      },
      {
        sceneNumber: 3,
        tabLabel: '3. Los 3 Pasos',
        sceneTitle: 'La Ruta Paso a Paso hacia la Formalidad',
        bgGradient: 'from-[#1E293B] via-[#0F172A] to-[#064E3B]',
        voiceScript:
          'Integrarte a la economía formal sigue un orden muy sencillo de tres pasos. Primero te inscribes en el RFC ante el SAT, segundo abres una cuenta bancaria formal a tu nombre y tercero emites comprobantes digitales CFDI por tus ingresos.',
        subtitleText:
          '3º La Secuencia Formal: 1º Inscribir tu RFC 📋 → 2º Abrir cuenta bancaria formal 🏦 → 3º Emitir comprobantes CFDI 🧾.',
        cards: [
          {
            badge: 'PASO 1 · REGISTRO',
            emoji: '1️⃣📋',
            title: 'Inscribir tu RFC',
            description: 'Tramitando tu Registro Federal de Contribuyentes activas tu identidad fiscal.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
          {
            badge: 'PASO 2 · BANCA',
            emoji: '2️⃣🏦',
            title: 'Cuenta Bancaria Formal',
            description: 'Recibes tus pagos de forma segura y trazable en lugar de efectivo suelto.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'PASO 3 · FACTURACIÓN',
            emoji: '3️⃣🧾',
            title: 'Emitir CFDI y Recibos',
            description: 'Compruebas legalmente tus ingresos para construir reputación financiera.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
      {
        sceneNumber: 4,
        tabLabel: '4. En tu Vida',
        sceneTitle: 'Cómo Elegir la Formalidad en tu Día a Día',
        bgGradient: 'from-[#064E3B] via-[#0A3323] to-[#0F172A]',
        voiceScript:
          'Por eso, cuando empieces a cobrar por tus proyectos o empleos, evita quedarte oculto usando solo efectivo sin recibos. Elige siempre construir tu historial formal desde joven para multiplicar tus oportunidades.',
        subtitleText:
          '4º En tu día a día: Evita quedarte sin historial y elige operar con cuenta bancaria y comprobantes oficiales.',
        cards: [
          {
            badge: '❌ EVITA ESTO',
            emoji: '🥀💵',
            title: 'Operar sin Recibos',
            description: 'Cobrar siempre sin registro te cierra el acceso a becas, créditos y contratos.',
            accentBorder: 'border-[#F87171]',
            accentBg: 'bg-[#7F1D1D]/90',
          },
          {
            badge: '⚖️ COMPARA',
            emoji: '🧭📊',
            title: 'Visión de Largo Plazo',
            description: 'La formalidad convierte cada pago recibido en un escalón para tu patrimonio.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: '✅ ELIGE ESTO',
            emoji: '🌿🛡️',
            title: 'Construir Historial',
            description: 'Usa cuentas reguladas y comprobantes oficiales desde tus primeros ingresos.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
    ];
  }

  // =========================================================================
  // BIOMA 1 · LECCIÓN 5: CÓMO TUS HABILIDADES GENERAN INGRESOS
  // =========================================================================
  if (biomeId === 1 && lessonNumber === 5) {
    return [
      {
        sceneNumber: 1,
        tabLabel: '1. El Origen',
        sceneTitle: '¿De Dónde Nacen Realmente tus Ingresos?',
        bgGradient: 'from-[#132A1E] via-[#1B4332] to-[#0F172A]',
        voiceScript:
          'El dinero que ganas en la economía no nace por casualidad, sino del valor que aportas a los demás. Tus ingresos se generan cuando aplicas tus habilidades y tu tiempo para resolver problemas reales y útiles para otras personas.',
        subtitleText:
          '1º El Principio: Tus ingresos nacen de usar tus habilidades 🧠 para resolver problemas reales y útiles para otras personas 🤝.',
        cards: [
          {
            badge: 'TU TALENTO',
            emoji: '🧠🛠️',
            title: 'Habilidades Útiles',
            description: 'Lo que sabes hacer: programar, diseñar, reparar, organizar o enseñar.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
          {
            badge: 'LA CONEXIÓN',
            emoji: '🧩✨',
            title: 'Resolver un Problema',
            description: 'Ayudas a una persona o empresa a ahorrar tiempo, vender más o funcionar mejor.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'EL RESULTADO',
            emoji: '💵🌱',
            title: 'Ingreso Monetario',
            description: 'Recibes una recompensa económica justa por el valor que entregaste.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
        ],
      },
      {
        sceneNumber: 2,
        tabLabel: '2. El Valor',
        sceneTitle: 'Por qué Unas Habilidades Pagan Más que Otras',
        bgGradient: 'from-[#1E293B] via-[#0F172A] to-[#3B0764]',
        voiceScript:
          'No todas las horas de trabajo se pagan igual en el mercado. Mientras más complejo, especializado y valioso es el problema que sabes resolver, mayor es el ingreso que recibes por cada hora de tu esfuerzo.',
        subtitleText:
          '2º La Regla del Valor: Mientras más especializado y útil es el problema que resuelves, más vale cada hora de tu tiempo ⏱️💎.',
        cards: [
          {
            badge: 'TAREA COMÚN',
            emoji: '⏱️🪙',
            title: 'Fácil de Reemplazar',
            description: 'Las actividades que requieren poca preparación suelen tener pagos más bajos.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'PREPARACIÓN',
            emoji: '📚🔬',
            title: 'Especialización',
            description: 'Aprender herramientas técnicas, idiomas o un oficio difícil te distingue.',
            accentBorder: 'border-[#E0B0FF]',
            accentBg: 'bg-[#3B0764]/90',
          },
          {
            badge: 'MAYOR RECOMPENSA',
            emoji: '⏱️💎',
            title: 'Hora de Alto Valor',
            description: 'Resuelves retos más grandes en menos tiempo y multiplicas tus ingresos.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
      {
        sceneNumber: 3,
        tabLabel: '3. Hábitos',
        sceneTitle: 'Hábitos que Multiplican vs. Hábitos que Drenan',
        bgGradient: 'from-[#0A2540] via-[#0F172A] to-[#064E3B]',
        voiceScript:
          'Para hacer crecer tus ingresos necesitas combinar preparación constante con confianza profesional. Quien aprende nuevas habilidades y entrega con puntualidad multiplica sus oportunidades, mientras que dejar proyectos a medias drena su futuro.',
        subtitleText:
          '3º Tu Reputación: Aprender habilidades técnicas y cumplir a tiempo multiplica tus ingresos 🌿; dejar todo a medias los drena 🥀.',
        cards: [
          {
            badge: '🥀 HÁBITO QUE DRENA',
            emoji: '⏳❌',
            title: 'Dejar a Medias',
            description: 'Incumplir entregas o estancarte sin aprender cierra puertas de trabajo.',
            accentBorder: 'border-[#F87171]',
            accentBg: 'bg-[#7F1D1D]/90',
          },
          {
            badge: '🌿 HÁBITO QUE MULTIPLICA',
            emoji: '💻📚',
            title: 'Aprender Siempre',
            description: 'Dominar nuevas herramientas digitales, oficios o habilidades prácticas.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
          {
            badge: '🏆 SELLO PERSONAL',
            emoji: '🤝⭐',
            title: 'Puntualidad y Calidad',
            description: 'La confianza hace que los clientes te recomienden y vuelvan a contratarte.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
      {
        sceneNumber: 4,
        tabLabel: '4. En tu Vida',
        sceneTitle: 'Protege la Energía de tu Tiempo al Cobrar',
        bgGradient: 'from-[#064E3B] via-[#0A3323] to-[#0F172A]',
        voiceScript:
          'Recuerda que cada peso que recibes es energía de tu tiempo y esfuerzo almacenada. Por eso, en cuanto cobres una beca o un proyecto de fin de semana, separa primero tu ahorro semilla antes de gastarlo todo por impulso.',
        subtitleText:
          '4º En tu día a día: Si ganas $1,200 pesos, no los evapores el primer día; aparta primero tu fondo semilla 🌱🐷.',
        cards: [
          {
            badge: '❌ EVITA ESTO',
            emoji: '🍔💸',
            title: 'Evaporar tu Esfuerzo',
            description: 'Gastar $950 de tus $1,200 el mismo día te deja sin respaldo toda la quincena.',
            accentBorder: 'border-[#F87171]',
            accentBg: 'bg-[#7F1D1D]/90',
          },
          {
            badge: '⚖️ REGLA DE ORO',
            emoji: '⏳🔋',
            title: 'Dinero = Tu Tiempo',
            description: 'Honra las horas que trabajaste conservando una parte de cada ingreso.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: '✅ HAZ ESTO HOY',
            emoji: '🌱🏦',
            title: 'Aparta tu Semilla',
            description: 'Separa $600 a tu fondo semilla y disfruta convivir sin vaciar tu cartera.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
    ];
  }

  // =========================================================================
  // BIOMA 1 · LECCIÓN 6: IMPUESTOS BÁSICOS Y EL RÉGIMEN RESICO
  // =========================================================================
  if (biomeId === 1 && lessonNumber === 6) {
    return [
      {
        sceneNumber: 1,
        tabLabel: '1. Impuestos',
        sceneTitle: '¿Qué son los Impuestos y para qué Sirven?',
        bgGradient: 'from-[#132A1E] via-[#1B4332] to-[#0F172A]',
        voiceScript:
          'Cuando trabajas o vendes productos en la economía formal, aportas una pequeña parte de tus ingresos llamada impuestos. Ese dinero público sirve para construir y mantener escuelas, hospitales, alumbrado y carreteras que todos usamos.',
        subtitleText:
          '1º Cultura Fiscal: Los impuestos son la aportación ciudadana que financia escuelas 🏫, hospitales 🏥 y servicios públicos 🛣️.',
        cards: [
          {
            badge: 'TU ACTIVIDAD',
            emoji: '💼🧾',
            title: 'Ingresos Formales',
            description: 'Al cobrar por tu trabajo o negocio registrado participas en la economía del país.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
          {
            badge: 'APORTACIÓN',
            emoji: '🏛️⚖️',
            title: 'Pago de Impuestos',
            description: 'Una proporción regulada por la ley que se destina al presupuesto público.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'BENEFICIO COLECTIVO',
            emoji: '🏫🏥🛣️',
            title: 'Servicios Públicos',
            description: 'Financia infraestructura, educación, salud y seguridad en tu comunidad.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
        ],
      },
      {
        sceneNumber: 2,
        tabLabel: '2. Bruto vs Neto',
        sceneTitle: 'Diferencia entre Ingreso Bruto e Ingreso Neto',
        bgGradient: 'from-[#1E293B] via-[#0F172A] to-[#1E3A8A]',
        voiceScript:
          'Para organizar bien tus finanzas debes distinguir dos conceptos clave al cobrar. El Ingreso Bruto es el monto total antes de impuestos, mientras que el Ingreso Neto es el dinero real que te queda libre en tu cuenta después de impuestos.',
        subtitleText:
          '2º Concepto Clave: El Ingreso Bruto es el total antes de impuestos, y el Ingreso Neto es lo que te queda libre en tu cuenta 💵✅.',
        cards: [
          {
            badge: 'ANTES DE IMPUESTOS',
            emoji: '📊💵',
            title: 'Ingreso Bruto',
            description: 'Es la cifra total pactada en tu recibo o factura antes de retenciones.',
            accentBorder: 'border-[#38BDF8]',
            accentBg: 'bg-[#1E3A8A]/90',
          },
          {
            badge: 'LA RESTA FISCAL',
            emoji: '➖🧾',
            title: 'Impuesto ISR',
            description: 'El Impuesto Sobre la Renta que se calcula según tu régimen fiscal.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'DINERO LIBRE REAL',
            emoji: '✅🏦',
            title: 'Ingreso Neto',
            description: 'Lo que realmente entra libre a tu bolsillo para ahorrar, vivir e invertir.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
      {
        sceneNumber: 3,
        tabLabel: '3. RESICO',
        sceneTitle: 'El Régimen Simplificado de Confianza (RESICO)',
        bgGradient: 'from-[#3B0764] via-[#1E1B4B] to-[#0F172A]',
        voiceScript:
          'Para impulsar a jóvenes, profesionistas y pequeños negocios a ser formales, en México existe el Régimen Simplificado de Confianza, llamado RESICO. Su gran ventaja es que ofrece tasas de ISR muy bajas, de apenas entre el uno y el dos punto cinco por ciento.',
        subtitleText:
          '3º Dato Clave RESICO: Permite facturar legalmente pagando una tasa de ISR muy baja, de solo 1.0% a 2.5% sobre lo cobrado.',
        cards: [
          {
            badge: 'PARA EMPRENDEDORES',
            emoji: '🚀🇲🇽',
            title: 'Régimen RESICO',
            description: 'Diseñado para personas físicas con proyectos, oficios o servicios independientes.',
            accentBorder: 'border-[#E0B0FF]',
            accentBg: 'bg-[#3B0764]/90',
          },
          {
            badge: 'TASA MÍNIMA',
            emoji: '📊 1% a 2.5%',
            title: 'ISR de 1.0% a 2.5%',
            description: 'Una de las tasas más bajas para que conserves casi la totalidad de tu ingreso.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: 'CÁLCULO SIMPLE',
            emoji: '🧾✨',
            title: 'Fácil y Automático',
            description: 'Se calcula directamente sobre las facturas efectivamente cobradas en el mes.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
      {
        sceneNumber: 4,
        tabLabel: '4. Ejemplo Real',
        sceneTitle: 'Simulación Práctica con $10,000 Pesos en RESICO',
        bgGradient: 'from-[#064E3B] via-[#0A3323] to-[#0F172A]',
        voiceScript:
          'Imagina que un cliente te ofrece diez mil pesos por un proyecto si le entregas factura. En lugar de perder el cliente por miedo a los impuestos, en RESICO facturas los diez mil pesos, pagas cerca de cien pesos de ISR y recibes nueve mil novecientos pesos netos.',
        subtitleText:
          '4º En la práctica: Si facturas $10,000 pesos en RESICO (~1% ISR = $100 pesos), cobras $9,900 pesos netos legales en tu cuenta.',
        cards: [
          {
            badge: '❌ EVITA EL MIEDO',
            emoji: '🚫💸',
            title: 'Perder el Proyecto',
            description: 'Rechazar un cliente de $10,000 pesos por no tener RFC ni dar factura.',
            accentBorder: 'border-[#F87171]',
            accentBg: 'bg-[#7F1D1D]/90',
          },
          {
            badge: '🧾 IMPUESTO BAJO',
            emoji: '1% = $100',
            title: 'Solo ~$100 de ISR',
            description: 'Con una tasa cercana al 1% en RESICO, el impuesto sobre $10,000 es mínimo.',
            accentBorder: 'border-[#FBBF24]',
            accentBg: 'bg-[#78350F]/90',
          },
          {
            badge: '✅ INGRESO NETO',
            emoji: '🏦 $9,900',
            title: 'Cobras $9,900 Libres',
            description: 'Ganas el cliente, recibes $9,900 netos y construyes historial bancario formal.',
            accentBorder: 'border-[#34D399]',
            accentBg: 'bg-[#065F46]/90',
          },
        ],
      },
    ];
  }

  // =========================================================================
  // NARRATIVA CONTINUA DE 4 ESCENAS PARA LOS BIOMAS 2 AL 14
  // =========================================================================
  const narrativeIntro = formatNaturalSummary(topicTitle, topicSummary);
  const step1Text = sequenceSteps[0] || 'Analizar tu situación antes de decidir';
  const step2Text = sequenceSteps[1] || 'Comparar opciones y costos reales en pesos';
  const step3Text = sequenceSteps[2] || 'Elegir la opción que protege tu patrimonio';

  // Tomamos la primera oración limpia del dato curioso para que sea ágil y conectada
  const firstFactSentence =
    keyFactLabel.split(/(?<=[.!?])\s+/)[0] ||
    'Conocer este indicador te permite tomar decisiones informadas.';

  return [
    {
      sceneNumber: 1,
      tabLabel: '1. El Concepto',
      sceneTitle: topicTitle,
      bgGradient: 'from-[#0A3323] via-[#145A3A] to-[#0F172A]',
      voiceScript: `Comencemos con ${topicTitle}. ${narrativeIntro}`,
      subtitleText: `1º Concepto Clave: ${narrativeIntro}`,
      cards: [
        {
          badge: 'PUNTO DE PARTIDA',
          emoji: '🧭💡',
          title: 'El Reto Cotidiano',
          description: `Entender cómo influye ${topicTitle.toLowerCase()} en tu bolsillo cada semana.`,
          accentBorder: 'border-[#34D399]',
          accentBg: 'bg-[#065F46]/90',
        },
        {
          badge: 'TEMA DE HOY',
          emoji: '⚖️🔍',
          title: topicTitle,
          description: narrativeIntro,
          accentBorder: 'border-[#FBBF24]',
          accentBg: 'bg-[#78350F]/90',
        },
        {
          badge: 'META DE LA LECCIÓN',
          emoji: '🛡️🎯',
          title: 'Claridad Financiera',
          description: 'Convertir este conocimiento en un hábito práctico para proteger tu dinero.',
          accentBorder: 'border-[#38BDF8]',
          accentBg: 'bg-[#1E3A8A]/90',
        },
      ],
    },
    {
      sceneNumber: 2,
      tabLabel: '2. Paso a Paso',
      sceneTitle: `Cómo Aplicar ${topicTitle} Paso a Paso`,
      bgGradient: 'from-[#0A2540] via-[#0F172A] to-[#064E3B]',
      voiceScript: `Para llevar esta idea a la práctica sin equivocarte, sigue tres pasos en orden. Primero debes ${step1Text.toLowerCase()}, luego ${step2Text.toLowerCase()} y por último ${step3Text.toLowerCase()}.`,
      subtitleText: `2º En Orden: 1º ${step1Text} → 2º ${step2Text} → 3º ${step3Text}.`,
      cards: [
        {
          badge: 'PASO 1',
          emoji: '1️⃣📋',
          title: 'Primer Paso',
          description: step1Text,
          accentBorder: 'border-[#38BDF8]',
          accentBg: 'bg-[#1E3A8A]/90',
        },
        {
          badge: 'PASO 2',
          emoji: '2️⃣⚙️',
          title: 'Segundo Paso',
          description: step2Text,
          accentBorder: 'border-[#FBBF24]',
          accentBg: 'bg-[#78350F]/90',
        },
        {
          badge: 'PASO 3',
          emoji: '3️⃣🏆',
          title: 'Tercer Paso',
          description: step3Text,
          accentBorder: 'border-[#34D399]',
          accentBg: 'bg-[#065F46]/90',
        },
      ],
    },
    {
      sceneNumber: 3,
      tabLabel: '3. Dato Clave',
      sceneTitle: `Dato Clave del Bioma: ${keyFactStat}`,
      bgGradient: 'from-[#3B0764] via-[#1E1B4B] to-[#0F172A]',
      voiceScript: `Seguir ese orden es muy importante porque las cifras reales muestran un dato revelador: ${keyFactStat}. ${firstFactSentence}`,
      subtitleText: `3º Dato Clave: ${keyFactStat} — ${firstFactSentence}`,
      cards: [
        {
          badge: 'CIFRA VERIFICADA',
          emoji: '📊🔢',
          title: keyFactStat,
          description: 'Indicador clave para comprender la magnitud de este tema en la vida real.',
          accentBorder: 'border-[#FBBF24]',
          accentBg: 'bg-[#78350F]/90',
        },
        {
          badge: 'QUÉ SIGNIFICA',
          emoji: '🔎🧠',
          title: 'Contexto Real',
          description: firstFactSentence,
          accentBorder: 'border-[#E0B0FF]',
          accentBg: 'bg-[#3B0764]/90',
        },
        {
          badge: 'TU VENTAJA',
          emoji: '📈✨',
          title: 'Decidir con Datos',
          description: 'Quien conoce los números reales anticipa riesgos y cuida mejor su capital.',
          accentBorder: 'border-[#34D399]',
          accentBg: 'bg-[#065F46]/90',
        },
      ],
    },
    {
      sceneNumber: 4,
      tabLabel: '4. En tu Día a Día',
      sceneTitle: 'Cómo Decidir en tu Día a Día',
      bgGradient: 'from-[#064E3B] via-[#0A3323] to-[#0F172A]',
      voiceScript: `Conociendo todo este contexto, cuando tengas que decidir en tu día a día evita ${dailyMistakeLabel.toLowerCase()}. Mejor elige siempre ${dailySmartLabel.toLowerCase()}.`,
      subtitleText: `4º En tu día a día: Evita «${dailyMistakeLabel}» y elige «${dailySmartLabel}».`,
      cards: [
        {
          badge: '❌ EVITA ESTO',
          emoji: '🥀💸',
          title: 'Decisión Impulsiva',
          description: dailyMistakeLabel,
          accentBorder: 'border-[#F87171]',
          accentBg: 'bg-[#7F1D1D]/90',
        },
        {
          badge: '⚖️ PAUSA Y EVALÚA',
          emoji: '⏸️🧭',
          title: 'Compara el Efecto',
          description: 'Recuerda lo aprendido en esta lección antes de entregar tu dinero.',
          accentBorder: 'border-[#FBBF24]',
          accentBg: 'bg-[#78350F]/90',
        },
        {
          badge: '✅ ELIGE ESTO',
          emoji: '🌿💎',
          title: 'Acción Inteligente',
          description: dailySmartLabel,
          accentBorder: 'border-[#34D399]',
          accentBg: 'bg-[#065F46]/90',
        },
      ],
    },
  ];
}

/**
 * Reproductor de Minivideo Animado con continuidad garantizada:
 * - Un único efecto determinista por escena controla la voz y el avance sin estados obsoletos.
 * - Ninguna escena puede saltarse ni cortarse a la mitad: espera siempre a que concluya toda la narración.
 */
export const LessonVisualAid: React.FC<LessonVisualAidProps> = ({
  biomeId = 1,
  lessonNumber,
  topicTitle,
  topicSummary = 'Comprende este concepto clave paso a paso y aplícalo en tus finanzas.',
  biomeTitle,
  keyFactStat = '100 semillas de cacao = 1 canoa',
  keyFactLabel = 'El dinero facilita el intercambio y conserva tu valor en el tiempo.',
  dailyMistakeLabel = 'Gastar por impulso sin medir el impacto',
  dailySmartLabel = 'Usar tu dinero con estrategia hacia tu meta',
  sequenceSteps = EMPTY_STEPS,
  onVideoComplete,
  onSpeakScene,
}) => {
  const [sceneIdx, setSceneIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const onSpeakRef = useRef(onSpeakScene);
  const onCompleteRef = useRef(onVideoComplete);

  useEffect(() => {
    onSpeakRef.current = onSpeakScene;
    onCompleteRef.current = onVideoComplete;
  }, [onSpeakScene, onVideoComplete]);

  const scenes = React.useMemo(
    () =>
      buildStoryScenesForLesson({
        biomeId,
        lessonNumber,
        topicTitle,
        topicSummary,
        keyFactStat,
        keyFactLabel,
        dailyMistakeLabel,
        dailySmartLabel,
        sequenceSteps,
      }),
    [
      biomeId,
      lessonNumber,
      topicTitle,
      topicSummary,
      keyFactStat,
      keyFactLabel,
      dailyMistakeLabel,
      dailySmartLabel,
      sequenceSteps,
    ]
  );

  const scenesRef = useRef(scenes);
  scenesRef.current = scenes;

  // Único efecto determinista por escena:
  // Inicia la narración completa de la escena actual y solo avanza cuando TANTO la voz
  // como el tiempo mínimo de lectura visual han concluido. Cero estados obsoletos entre escenas.
  useEffect(() => {
    if (!isPlaying) {
      stopWarmVoice();
      return;
    }

    let cancelled = false;
    let voiceDone = false;
    let minTimeDone = false;
    let nextSceneTimeoutId: number | null = null;

    const tryAdvanceToNextScene = () => {
      if (cancelled || !voiceDone || !minTimeDone) return;

      const totalScenes = scenesRef.current.length;
      const transitionPauseMs = sceneIdx < totalScenes - 1 ? 750 : 1400;

      nextSceneTimeoutId = window.setTimeout(() => {
        if (cancelled) return;
        if (sceneIdx < totalScenes - 1) {
          setSceneIdx((prev) => prev + 1);
        } else {
          setIsPlaying(false);
          onCompleteRef.current?.();
        }
      }, transitionPauseMs);
    };

    // Tiempo mínimo de visualización tranquila por escena (7.8 segundos)
    const minVisualTimerId = window.setTimeout(() => {
      if (cancelled) return;
      minTimeDone = true;
      tryAdvanceToNextScene();
    }, 7800);

    const activeScene = scenesRef.current[sceneIdx];
    if (activeScene && onSpeakRef.current) {
      onSpeakRef.current(activeScene.voiceScript, () => {
        if (cancelled) return;
        voiceDone = true;
        tryAdvanceToNextScene();
      });
    } else {
      voiceDone = true;
      tryAdvanceToNextScene();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(minVisualTimerId);
      if (nextSceneTimeoutId !== null) {
        window.clearTimeout(nextSceneTimeoutId);
      }
    };
  }, [sceneIdx, isPlaying, biomeId, lessonNumber]);

  const currentScene = scenes[sceneIdx] || scenes[0];
  const progressPct = Math.round(((sceneIdx + 1) / scenes.length) * 100);

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#0A3323] border-b-6 space-y-4 shadow-xl">
      {/* Controles Superiores */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2.5 py-1 rounded-xl bg-[#0A3323] text-[#34D399] text-[11px] font-mono font-extrabold flex items-center gap-1.5 shrink-0">
            <Film className="w-3.5 h-3.5" />
            <span>ESCENA {currentScene.sceneNumber} DE 4</span>
          </span>
          <span className="text-xs font-mono font-bold text-[#145A3A] hidden sm:inline truncate">
            {biomeTitle}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              soundFX.playTap();
              if (sceneIdx > 0) {
                setSceneIdx((prev) => prev - 1);
                setIsPlaying(true);
              }
            }}
            disabled={sceneIdx === 0}
            className="px-2.5 py-1.5 rounded-xl bg-[#F8FBCA] border-2 border-[#0A3323] text-[#0A3323] text-xs font-extrabold flex items-center gap-1 cursor-pointer disabled:opacity-40"
            title="Escena anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playTap();
              setIsPlaying((prev) => !prev);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#F8FBCA] border-2 border-[#0A3323] text-[#0A3323] text-xs font-extrabold flex items-center gap-1.5 cursor-pointer hover:bg-[#F7FAD5]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Continuar</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playTap();
              if (sceneIdx < scenes.length - 1) {
                setSceneIdx((prev) => prev + 1);
                setIsPlaying(true);
              } else {
                setIsPlaying(false);
                onCompleteRef.current?.();
              }
            }}
            className="px-2.5 py-1.5 rounded-xl bg-[#F8FBCA] border-2 border-[#0A3323] text-[#0A3323] text-xs font-extrabold flex items-center gap-1 cursor-pointer hover:bg-[#F7FAD5]"
            title="Siguiente escena"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playTap();
              setSceneIdx(0);
              setIsPlaying(true);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-[#145A3A] text-[#F8FBCA] border-2 border-[#0A3323] text-xs font-extrabold flex items-center gap-1 cursor-pointer hover:bg-[#0A3323]"
            title="Reiniciar desde la primera escena"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ESCENARIO ANIMADO DE LA HISTORIA */}
      <div
        className={`relative w-full rounded-2xl bg-gradient-to-b ${currentScene.bgGradient} border-2 border-[#34D399]/60 p-4 sm:p-6 flex flex-col justify-between gap-4 overflow-hidden`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-2.5">
          <h3 className="text-sm sm:text-lg font-extrabold text-white font-display">
            {currentScene.sceneTitle}
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-black/45 border border-white/20 text-[11px] font-mono font-extrabold text-[#FFD166]">
            {currentScene.tabLabel}
          </span>
        </div>

        {/* Las 3 Viñetas Visuales de la Escena con aparición progresiva por GPU (cero re-renders de React) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-1">
          {currentScene.cards.map((card, idx) => (
            <motion.div
              key={`${biomeId}-${lessonNumber}-${currentScene.sceneNumber}-${card.title}`}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.55,
                ease: 'easeOut',
              }}
              className={`p-4 rounded-2xl border-2 ${card.accentBg} ${card.accentBorder} shadow-lg flex flex-col items-center text-center space-y-2`}
            >
              <span className="px-2 py-0.5 rounded-md bg-black/40 text-[10px] font-mono font-extrabold text-[#F8FBCA] uppercase">
                {card.badge}
              </span>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/35 border border-white/20 flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
                {card.emoji}
              </div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white leading-snug">
                {card.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#F8FBCA]/95 font-medium leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Subtítulo Sincronizado de la Escena */}
        <div className="px-4 py-3 rounded-xl bg-black/70 border border-[#F8FBCA]/30 text-xs sm:text-sm font-bold text-[#F8FBCA] leading-relaxed text-center shadow-md">
          {currentScene.subtitleText}
        </div>
      </div>

      {/* Barra de Progreso y Selector de las 4 Escenas Conectadas */}
      <div className="space-y-2.5">
        <div className="w-full h-2.5 bg-[#0A3323]/15 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#145A3A] via-[#34D399] to-[#F59E0B] rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {scenes.map((sc, idx) => {
            const active = sceneIdx === idx;
            const visited = idx < sceneIdx;
            return (
              <button
                key={sc.sceneNumber}
                type="button"
                onClick={() => {
                  soundFX.playTap();
                  setSceneIdx(idx);
                  setIsPlaying(true);
                }}
                className={`p-2.5 rounded-xl border-2 text-left cursor-pointer transition-all ${
                  active
                    ? 'bg-[#0A3323] text-[#F8FBCA] border-[#34D399]'
                    : visited
                    ? 'bg-[#D1FAE5]/75 text-[#0A3323] border-[#059669]/50'
                    : 'bg-[#F8FBCA]/50 text-[#0A3323] border-[#0A3323]/20 hover:bg-[#F8FBCA]'
                }`}
              >
                <span className="text-[10px] font-mono font-extrabold block truncate">
                  {sc.tabLabel}
                </span>
                <span className="text-[11px] font-extrabold block truncate mt-0.5">
                  {sc.sceneTitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Botón para pasar al Juego Dinámico y Preguntas */}
      <div className="pt-1 flex flex-wrap items-center justify-between gap-3 border-t border-[#0A3323]/15">
        <p className="text-xs font-bold text-[#145A3A]">
          {sceneIdx === scenes.length - 1
            ? 'Narrando la última escena; al terminar pasarás automáticamente a las preguntas.'
            : `Narrando escena ${sceneIdx + 1} de 4 con continuidad...`}
        </p>

        <button
          type="button"
          onClick={() => {
            soundFX.playTap();
            setIsPlaying(false);
            stopWarmVoice();
            onCompleteRef.current?.();
          }}
          className="px-4 py-2 rounded-2xl bg-[#F8FBCA] text-[#0A3323] border-2 border-[#0A3323] hover:bg-[#D1FAE5] text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ir al Juego y Preguntas</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
