import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Sliders,
  RefreshCw,
  Layers,
  Flame,
  Shield,
  Check,
  Play,
  Settings2,
  X,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  GitCommitVertical,
  Palette,
  Headphones,
  Puzzle,
  Zap,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  ListOrdered,
  Trees,
  Lock,
  Unlock,
  Shirt,
  Sun,
  Moon,
  Trophy,
  Volume2,
  VolumeX,
  Users,
  Gamepad2,
} from 'lucide-react';
import { BIOME_MODULES, BiomeModule, QuizQuestion } from './data/biomesData';
import { getBiomeSingleTopicLessons } from './data/singleTopicLessons';
import { LessonModal, SM2CardItem, LessonNumber } from './components/LessonModal';
import { SimulatorsView } from './components/SimulatorsView';
import { DominoView } from './components/DominoView';
import { SpacedRepetitionView } from './components/SpacedRepetitionView';
import { PWAInstallButton, OfflineIndicator } from './components/PWAInstallButton';
import {
  BloomMascot,
  PlumageTheme,
  EquippedSkinId,
  CasualShirtColor,
  SHIRT_COLOR_META,
  HoodieVariant,
  HOODIE_VARIANT_META,
  JacketVariant,
  JACKET_VARIANT_META,
  ArmorVariant,
  ARMOR_VARIANT_META,
  BloomEmoteId,
  EMOTE_META,
  getSavedBloomOutfit,
  saveBloomOutfit,
} from './components/BloomMascot';
import { BloomEmotesStudio, ORDERED_EMOTE_IDS } from './components/BloomEmotesStudio';
import {
  BloomAchievementsSection,
  BloomWardrobeModal,
  LESSON_REWARD_MILESTONES,
  SHIRT_UNLOCK_LESSON,
  HOODIE_UNLOCK_LESSON,
  JACKET_UNLOCK_LESSON,
  ARMOR_UNLOCK_LESSON,
  getBloomAchievements,
} from './components/BloomWardrobeAndAchievements';
import {
  BloomOnlineCommunityModal,
  PublicCommunityMember,
} from './components/BloomOnlineCommunityModal';
import { BloomOnlineMinigamesModal } from './components/BloomOnlineMinigamesModal';
import { AnimatedBiomeBanner, getBiomeUniqueDesign } from './components/AnimatedBiomeBanner';
import { BiomeScenicBackground, BiomeSculptedCrest } from './components/BiomeScenicBackground';
import { soundFX } from './utils/soundEffects';

type BiomeFamilyFilter = 'all' | 'tropical' | 'temperate' | 'desert' | 'paramo';
type ActiveLabModal = null | 'simulators' | 'sm2' | 'domino';

const INITIAL_SM2_CARDS: SM2CardItem[] = BIOME_MODULES.slice(0, 6).map((b, idx) => ({
  questionId: b.quiz[0].id,
  biomeId: b.id,
  biomeTitle: b.title,
  conceptTag: b.quiz[0].conceptTag,
  question: b.quiz[0].question,
  options: b.quiz[0].options,
  correctIndex: b.quiz[0].correctIndex,
  explanation: b.quiz[0].explanation,
  intervalDays: idx === 0 ? 7 : idx === 1 ? 3 : 1,
  repetitions: idx === 0 ? 3 : idx === 1 ? 2 : 1,
  mistakeCount: idx === 2 ? 1 : 0,
  lastReviewedISO: '2026-09-25',
  nextReviewLabel: idx === 0 ? 'En 7 días' : idx === 1 ? 'En 3 días' : 'Hoy (Día 1)',
}));

// Definition of the 6 Interactive Lesson Types inside every Topic (Tema) — 84 Lessons total across 14 Topics
interface TopicLessonBlueprint {
  lessonNumber: LessonNumber;
  title: string;
  shortLabel: string;
  interactiveType: string;
  description: string;
  xpReward: number;
  nodeBg: string;
  cardBg: string;
  badgeColor: string;
}

const TOPIC_LESSONS_BLUEPRINT: TopicLessonBlueprint[] = [
  {
    lessonNumber: 1,
    title: 'Lección 01 · Idea Clave (~5 min)',
    shortLabel: 'Idea Clave',
    interactiveType: '3 Escenas + 2 Preguntas + Meta',
    description: 'Explora las 3 escenas cortas con voz de Bloom, 2 preguntas rápidas y tu compromiso.',
    xpReward: 45,
    nodeBg: 'bg-[#2F7D5B] border-[#0A3323] text-[#F8FBCA]',
    cardBg: 'bg-[#F8FBCA] border-[#2F7D5B]',
    badgeColor: 'text-[#145A3A]',
  },
  {
    lessonNumber: 2,
    title: 'Lección 02 · Completa 3 Reglas (~5 min)',
    shortLabel: 'Completa Reglas',
    interactiveType: '3 Frases Clave en 1 Vista',
    description: 'Toca la palabra correcta en 3 frases claras para dominar el tema.',
    xpReward: 50,
    nodeBg: 'bg-[#105666] border-[#0A3323] text-[#F7FAD5]',
    cardBg: 'bg-[#F7FAD5] border-[#105666]',
    badgeColor: 'text-[#105666]',
  },
  {
    lessonNumber: 3,
    title: 'Lección 03 · Conecta Pares (~5 min)',
    shortLabel: 'Conecta Pares',
    interactiveType: '2 Rondas de 3 Pares + Reto',
    description: 'Une conceptos y casos reales con un solo toque en 2 rondas ágiles.',
    xpReward: 55,
    nodeBg: 'bg-[#734A91] border-[#1D2951] text-[#F1D7FF]',
    cardBg: 'bg-[#F1D7FF] border-[#734A91]',
    badgeColor: 'text-[#734A91]',
  },
  {
    lessonNumber: 4,
    title: 'Lección 04 · Ordena los Pasos (~5 min)',
    shortLabel: 'Ordena Pasos',
    interactiveType: 'Toca en Orden (1º a 4º) · 2 Retos',
    description: 'Toca los pasos en orden lógico en 2 situaciones prácticas sin usar flechas.',
    xpReward: 60,
    nodeBg: 'bg-[#8F6277] border-[#0A3323] text-[#F9D6D5]',
    cardBg: 'bg-[#F9D6D5] border-[#8F6277]',
    badgeColor: 'text-[#8F6277]',
  },
  {
    lessonNumber: 5,
    title: 'Lección 05 · ¿Suma o Drena? (~5 min)',
    shortLabel: '¿Suma o Drena?',
    interactiveType: '5 Hábitos Cotidianos + Caso',
    description: 'Clasifica con un toque 5 decisiones reales y descubre cuánto ahorras.',
    xpReward: 65,
    nodeBg: 'bg-[#839958] border-[#0A3323] text-[#0A3323]',
    cardBg: 'bg-[#F8FBCA] border-[#839958]',
    badgeColor: 'text-[#0B3D2E]',
  },
  {
    lessonNumber: 6,
    title: 'Lección 06 · Reto Final (~5 min)',
    shortLabel: 'Reto Final',
    interactiveType: 'Simulador MXN + 3 Preguntas',
    description: 'Toma una decisión práctica en pesos y responde las 3 preguntas finales.',
    xpReward: 95,
    nodeBg: 'bg-[#111E6C] border-[#1D2951] text-[#E0B0FF]',
    cardBg: 'bg-[#E0B0FF]/80 border-[#111E6C]',
    badgeColor: 'text-[#111E6C]',
  },
];

const BIOME_ECOSYSTEM_META: Record<
  'tropical' | 'temperate' | 'desert' | 'paramo',
  {
    name: string;
    shortName: string;
    climateLabel: string;
    description: string;
    bgTint: string;
    borderTint: string;
    badgeBg: string;
    badgeText: string;
    accentHex: string;
    secondaryHex: string;
    cardSurface: string;
  }
> = {
  tropical: {
    name: 'Selva Tropical y Dosel Húmedo',
    shortName: 'Selva Tropical',
    climateLabel: 'Crecimiento Orgánico y Flujo Vital',
    description: 'Ecosistemas de abundante biodiversidad donde nacen las raíces del valor y el ahorro.',
    bgTint: 'from-[#F8FBCA] via-[#839958]/45 to-[#2F7D5B]/40',
    borderTint: 'border-[#145A3A]',
    badgeBg: 'bg-[#145A3A] text-[#F8FBCA]',
    badgeText: 'text-[#145A3A]',
    accentHex: '#2F7D5B',
    secondaryHex: '#839958',
    cardSurface: 'bg-gradient-to-b from-[#F8FBCA] to-[#839958]/30 border-[#2F7D5B]',
  },
  temperate: {
    name: 'Bosque Templado y Corrientes de Agua',
    shortName: 'Bosque y Agua',
    climateLabel: 'Equilibrio, Liquidez y Resiliencia',
    description: 'Bosques de niebla y ríos cristalinos que enseñan control emocional y flujo de efectivo.',
    bgTint: 'from-[#F7FAD5] via-[#7285A5]/45 to-[#105666]/40',
    borderTint: 'border-[#105666]',
    badgeBg: 'bg-[#105666] text-[#F7FAD5]',
    badgeText: 'text-[#105666]',
    accentHex: '#105666',
    secondaryHex: '#7285A5',
    cardSurface: 'bg-gradient-to-b from-[#F7FAD5] to-[#7285A5]/35 border-[#105666]',
  },
  desert: {
    name: 'Desierto, Oasis y Salar Cristalino',
    shortName: 'Desierto y Oasis',
    climateLabel: 'Protección Patrimonial y Claridad',
    description: 'Oasis estratégicos que enseñan a defender el capital de la inflación y las deudas.',
    bgTint: 'from-[#F9D6D5] via-[#F6C8C7]/85 to-[#D3968C]/55',
    borderTint: 'border-[#8F6277]',
    badgeBg: 'bg-[#8F6277] text-[#F9D6D5]',
    badgeText: 'text-[#8F6277]',
    accentHex: '#8F6277',
    secondaryHex: '#BA7B7C',
    cardSurface: 'bg-gradient-to-b from-[#F9D6D5] to-[#F6C8C7] border-[#8F6277]',
  },
  paramo: {
    name: 'Alta Montaña y Páramo Estelar',
    shortName: 'Alta Montaña',
    climateLabel: 'Visión Macroeconómica y Libertad',
    description: 'Cumbres de largo alcance donde el interés compuesto y la jubilación multiplican tu futuro.',
    bgTint: 'from-[#F1D7FF] via-[#E0B0FF]/80 to-[#A87BC7]/55',
    borderTint: 'border-[#734A91]',
    badgeBg: 'bg-[#734A91] text-[#F1D7FF]',
    badgeText: 'text-[#734A91]',
    accentHex: '#734A91',
    secondaryHex: '#A87BC7',
    cardSurface: 'bg-gradient-to-b from-[#F1D7FF] to-[#E0B0FF]/70 border-[#734A91]',
  },
};

const PLUMAGE_OPTIONS: {
  id: PlumageTheme;
  name: string;
  meaning: string;
  swatches: [string, string, string];
  cardTone: string;
}[] = [
  {
    id: 'emerald',
    name: 'Jade Prehispánico',
    meaning: 'Abundancia vital, crecimiento orgánico y resiliencia',
    swatches: ['#2F7D5B', '#F1D7FF', '#F8FBCA'],
    cardTone: 'bg-[#F8FBCA] border-[#2F7D5B]',
  },
  {
    id: 'orchid',
    name: 'Amatista Feng Shui',
    meaning: 'Sabiduría estratégica, transmutación y fortuna',
    swatches: ['#734A91', '#F8FBCA', '#F6C8C7'],
    cardTone: 'bg-[#F1D7FF] border-[#734A91]',
  },
  {
    id: 'oasis',
    name: 'Turquesa del Agua',
    meaning: 'Flujo sereno de efectivo, liquidez y claridad mental',
    swatches: ['#105666', '#F7FAD5', '#E0B0FF'],
    cardTone: 'bg-[#F7FAD5] border-[#105666]',
  },
  {
    id: 'desert',
    name: 'Cuarzo Terracota',
    meaning: 'Cimientos firmes, enfoque patrimonial y constancia',
    swatches: ['#8F6277', '#F9D6D5', '#F8FBCA'],
    cardTone: 'bg-[#F9D6D5] border-[#8F6277]',
  },
];

const BLOOM_FRAGMENTED_WISDOM: {
  tag: string;
  quote: string;
  microAction: string;
}[] = [
  {
    tag: 'COSMOVISIÓN PREHISPÁNICA · VOLUNTAD',
    quote:
      'Para las culturas mesoamericanas, el colibrí simboliza la fuerza de voluntad: aunque es pequeño, recorre cada bioma con constancia.',
    microAction:
      'Micro-acción (3 min): Tu capital tampoco necesita ser enorme al inicio; la constancia en CETES multiplica cada gota de néctar.',
  },
  {
    tag: 'FENG SHUI FINANCIERO · FLUJO DE ABUNDANCIA',
    quote:
      'En el Feng Shui moderno, el agua estancada pierde vitalidad; el dinero guardado bajo el colchón pierde energía frente a la inflación.',
    microAction:
      'Micro-acción (3 min): Mantén tu dinero en movimiento seguro con GAT Real positiva para atraer riqueza y serenidad.',
  },
  {
    tag: 'PAUSA ESTRATÉGICA · REGLA DE LAS 72 HORAS',
    quote:
      'Antes de realizar una compra impulsiva, detente y observa el ecosistema completo de tus metas financieras.',
    microAction:
      'Micro-acción (3 min): Pausa 72 horas cualquier gasto emocional y transfiere ese monto a tu fondo de libertad.',
  },
  {
    tag: 'HÁBITO DE ORO · PÁGATE A TI PRIMERO',
    quote:
      'El error más común es ahorrar lo que sobra a fin de mes; el verdadero guardián separa su néctar apenas recibe su ingreso.',
    microAction:
      'Micro-acción (3 min): Programa una transferencia automática del 10% o 20% el mismo día que recibas tu quincena o mesada.',
  },
  {
    tag: 'DETECTOR DE FUGAS · GASTO HORMIGA',
    quote:
      'Una pequeña grieta en el oasis vacía el manantial sin hacer ruido: cafés diarios, envíos urgentes y comisiones invisibles.',
    microAction:
      'Micro-acción (3 min): Revisa tus últimos 5 cargos pequeños de la semana y elige uno para transformarlo en ahorro productivo.',
  },
  {
    tag: 'ESCUDO VITAL · FONDO DE EMERGENCIA',
    quote:
      'Un colibrí resiste la tormenta porque guarda reserva energética antes de que cambie el clima del bioma.',
    microAction:
      'Micro-acción (3 min): Construye paso a paso de 3 a 6 meses de tus gastos básicos en una cuenta a la vista con rendimiento diario.',
  },
  {
    tag: 'ARQUITECTURA 50 / 30 / 20 · EQUILIBRIO',
    quote:
      'La abundancia no consiste en privarte de todo, sino en darle a cada peso una misión clara dentro de tu ecosistema.',
    microAction:
      'Micro-acción (3 min): Destina 50% a necesidades, 30% a gustos conscientes y 20% directo a inversión y futuro.',
  },
  {
    tag: 'INTERÉS COMPUESTO · EL OCTAVO MILAGRO',
    quote:
      'Cuando reinviertes los rendimientos que genera tu dinero, tus intereses comienzan a generar sus propios intereses.',
    microAction:
      'Micro-acción (3 min): Activa la reinversión automática en tus instrumentos de renta fija para acelerar la bola de nieve.',
  },
  {
    tag: 'INTELIGENCIA EN CRÉDITO · TOTALERO SIEMPRE',
    quote:
      'La tarjeta de crédito es una herramienta de vuelo, no una extensión de tu sueldo. El pago mínimo es una trampa de interés.',
    microAction:
      'Micro-acción (3 min): Anota en tu calendario tu fecha de corte y tu fecha límite de pago para cubrir el 100% sin intereses.',
  },
  {
    tag: 'LIMPIEZA DE ECOSISTEMA · SUSCRIPCIONES FANTASMA',
    quote:
      'Muchas plataformas cobran mes tras mes por servicios que ya no nutren tu vida ni tu aprendizaje.',
    microAction:
      'Micro-acción (3 min): Cancela hoy al menos una suscripción recurrente que no hayas utilizado en los últimos 30 días.',
  },
  {
    tag: 'PODER ADQUISITIVO · VENCE A LA INFLACIÓN',
    quote:
      'Si una inversión te ofrece 6% anual pero la inflación es de 5%, tu ganancia real es apenas del 1%.',
    microAction:
      'Micro-acción (3 min): Compara siempre la GAT Real (después de inflación) antes de elegir dónde guardar tus ahorros.',
  },
  {
    tag: 'DIVERSIFICACIÓN · NO UN SOLO ÁRBOL',
    quote:
      'El colibrí nunca depende de una sola flor: visita distintas especies para asegurar su sustento todo el año.',
    microAction:
      'Micro-acción (3 min): Combina liquidez diaria (fondo de emergencia), renta fija (CETES/Bonos) y largo plazo (ETFs/Retiro).',
  },
  {
    tag: 'SEGURIDAD DIGITAL · ESCUDO ANTIFRAUDE',
    quote:
      'Ninguna institución financiera legítima te pedirá tu NIP, código CVV o contraseñas por llamada o mensaje urgente.',
    microAction:
      'Micro-acción (3 min): Usa tarjetas digitales con CVV dinámico para todas tus compras en línea y activa alertas en tu app.',
  },
  {
    tag: 'PSICOLOGÍA DEL DINERO · COSTO EN HORAS DE VIDA',
    quote:
      'No compras las cosas con dinero: las compras con las horas de vida y esfuerzo que dedicaste para ganarlo.',
    microAction:
      'Micro-acción (3 min): Antes de comprar un capricho, divide su precio entre lo que ganas por hora y pregúntate si lo vale.',
  },
  {
    tag: 'MESES SIN INTERESES · REGLA DE VIDA ÚTIL',
    quote:
      'Nunca financies a 12 o 18 meses algo cuyo beneficio dura apenas unas horas o semanas.',
    microAction:
      'Micro-acción (3 min): Usa Meses Sin Intereses solo en bienes duraderos (herramientas de estudio o salud) sin sobrepasar el 15% de tu ingreso.',
  },
  {
    tag: 'HISTORIAL CREDITICIO · PUERTA A MEJORES TASAS',
    quote:
      'Un buen puntaje en Buró de Crédito es tu carta de presentación para obtener créditos hipotecarios o educativos más baratos.',
    microAction:
      'Micro-acción (3 min): Mantén el uso de tu línea de crédito por debajo del 30% de tu límite total para elevar tu score.',
  },
  {
    tag: 'INVERSIÓN EN TI MISMO · MAYOR DIVIDENDO',
    quote:
      'El activo que genera los rendimientos más altos y que nadie puede arrebatarte son tus habilidades y tu educación.',
    microAction:
      'Micro-acción (3 min): Dedica 5 minutos diarios a completar una lección de Capital Bloom para fortalecer tu criterio financiero.',
  },
  {
    tag: 'ABUNDANCIA CONSCIENTE · GRATITUD Y ORDEN',
    quote:
      'Quien lleva claridad y registro de poco capital está preparado para administrar grandes patrimonios sin perder la paz.',
    microAction:
      'Micro-acción (3 min): Revisa una vez por semana tu balance personal celebrando cada peso protegido de compras impulsivas.',
  },
];

// Winding horizontal offsets for Duolingo-style snake path of 6 lessons inside each Biome Habitat
const PATH_OFFSETS = [
  'translate-x-0',
  '-translate-x-8 sm:-translate-x-14',
  'translate-x-6 sm:translate-x-12',
  '-translate-x-6 sm:-translate-x-12',
  'translate-x-8 sm:translate-x-14',
  'translate-x-0',
];

const SHIRT_COLOR_LIST: CasualShirtColor[] = ['black', 'magenta', 'aqua', 'white'];
const HOODIE_VARIANT_LIST: HoodieVariant[] = [
  'cyber_quetzal',
  'nebula_split',
  'solar_obsidian',
  'arctic_holo',
];
const JACKET_VARIANT_LIST: JacketVariant[] = [
  'aurora_gold',
  'crimson_summit',
  'emerald_guardian',
];
const ARMOR_VARIANT_LIST: ArmorVariant[] = ['diamond', 'emerald', 'gold', 'obsidian'];

export default function App() {
  const [viewLayout, setViewLayout] = useState<'path' | 'grid'>('path');
  const [stageFilter, setStageFilter] = useState<'all' | 1 | 2>('all');
  const [biomeFilter, setBiomeFilter] = useState<BiomeFamilyFilter>('all');
  const [activeLabModal, setActiveLabModal] = useState<ActiveLabModal>(null);
  const [learningMode, setLearningMode] = useState<'seed' | 'flight'>(() => {
    const saved = localStorage.getItem('cb_learning_mode');
    return saved === 'flight' ? 'flight' : 'seed';
  });

  // Combinable Hummingbird Plumage Theme from User's Palette
  const [plumage, setPlumage] = useState<PlumageTheme>(() => {
    const saved = localStorage.getItem('cb_bloom_plumage') as PlumageTheme | null;
    return saved && ['emerald', 'orchid', 'oasis', 'desert'].includes(saved) ? saved : 'emerald';
  });

  // Earnable Visible Skins State: 1. Shirt (L07), 2. Hoodie (L14), 3. Astral Jacket (L21), 4. Diamond Armor (L28)
  const [equippedSkin, setEquippedSkin] = useState<EquippedSkinId>(
    () => getSavedBloomOutfit().equippedSkin
  );
  const [shirtColor, setShirtColor] = useState<CasualShirtColor>(
    () => getSavedBloomOutfit().shirtColor
  );
  const [hoodieVariant, setHoodieVariant] = useState<HoodieVariant>(
    () => getSavedBloomOutfit().hoodieVariant
  );
  const [jacketVariant, setJacketVariant] = useState<JacketVariant>(
    () => getSavedBloomOutfit().jacketVariant
  );
  const [armorVariant, setArmorVariant] = useState<ArmorVariant>(
    () => getSavedBloomOutfit().armorVariant
  );
  const [activeEmote, setActiveEmote] = useState<BloomEmoteId>(
    () => getSavedBloomOutfit().activeEmote
  );
  const [showEmotesModal, setShowEmotesModal] = useState<boolean>(false);
  const [showWardrobeModal, setShowWardrobeModal] = useState<boolean>(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState<boolean>(false);
  const [showOnlineCommunityModal, setShowOnlineCommunityModal] = useState<boolean>(false);
  const [showOnlineMinigamesModal, setShowOnlineMinigamesModal] = useState<boolean>(false);
  const [onlineUser, setOnlineUser] = useState<PublicCommunityMember | null>(() => {
    try {
      const saved = localStorage.getItem('cb_online_user_v1');
      return saved ? (JSON.parse(saved) as PublicCommunityMember) : null;
    } catch {
      return null;
    }
  });
  const [rewardUnlockNotice, setRewardUnlockNotice] = useState<string | null>(null);

  // Omnipresent Static Bloom Companion Popover & Wisdom Index
  const [showBloomCompanionCard, setShowBloomCompanionCard] = useState<boolean>(false);
  const [wisdomIndex, setWisdomIndex] = useState<number>(0);

  // Completed Topics & Individual Lessons ("topicId-lessonNumber")
  // Starts at 0 completed lessons so every Emote, Prenda de Ropa, and Logro is earned strictly as the user completes lessons!
  const [completedBiomeIds, setCompletedBiomeIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('cb_completed_biomes_v4');
    return saved ? JSON.parse(saved) : [];
  });
  const [completedLessonKeys, setCompletedLessonKeys] = useState<string[]>(() => {
    const saved = localStorage.getItem('cb_completed_lessons_v4');
    return saved ? JSON.parse(saved) : [];
  });

  const [collapsedTopicIds, setCollapsedTopicIds] = useState<number[]>([]);

  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('cb_streak_days_v4');
    return saved ? Number(saved) : 1;
  });
  const [streakVouchers, setStreakVouchers] = useState<number>(() => {
    const saved = localStorage.getItem('cb_streak_vouchers');
    return saved ? Number(saved) : 2;
  });
  const [resilienceXP, setResilienceXP] = useState<number>(() => {
    const saved = localStorage.getItem('cb_resilience_xp');
    return saved ? Number(saved) : 420;
  });
  const [protectedCapitalMXN, setProtectedCapitalMXN] = useState<number>(() => {
    const saved = localStorage.getItem('cb_protected_mxn');
    return saved ? Number(saved) : 1680;
  });

  // SM-2 Spaced Repetition Queue
  const [sm2Cards, setSm2Cards] = useState<SM2CardItem[]>(() => {
    const saved = localStorage.getItem('cb_sm2_cards');
    return saved ? JSON.parse(saved) : INITIAL_SM2_CARDS;
  });

  // Active Biome Modal & Specific Initial Lesson Number (1..6)
  const [selectedBiome, setSelectedBiome] = useState<BiomeModule | null>(null);
  const [selectedInitialLesson, setSelectedInitialLesson] = useState<LessonNumber>(1);

  // Accessibility & Settings Drawer + Light / Dark Theme
  const [showA11yModal, setShowA11yModal] = useState<boolean>(false);
  const [colorTheme, setColorTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('cb_color_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });
  const [largeText, setLargeText] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(() => soundFX.muted);

  // Unlock thresholds for the 4 visible earnable skins (ordered L2 -> L6 -> L12 -> L18)
  const isCasualShirtUnlocked = completedLessonKeys.length >= SHIRT_UNLOCK_LESSON;
  const isHoodieUnlocked = completedLessonKeys.length >= HOODIE_UNLOCK_LESSON;
  const isAstralJacketUnlocked = completedLessonKeys.length >= JACKET_UNLOCK_LESSON;
  const isDiamondArmorUnlocked = completedLessonKeys.length >= ARMOR_UNLOCK_LESSON;

  // Sync Bloom's active outfit globally whenever unlocked/equipped/variant changes
  useEffect(() => {
    let validSkin: EquippedSkinId = equippedSkin;
    if (validSkin === 'shirt' && !isCasualShirtUnlocked) validSkin = 'none';
    if (validSkin === 'hoodie' && !isHoodieUnlocked) validSkin = 'none';
    if (validSkin === 'astral_jacket' && !isAstralJacketUnlocked) validSkin = 'none';
    if (validSkin === 'diamond_armor' && !isDiamondArmorUnlocked) validSkin = 'none';

    let validEmote: BloomEmoteId = activeEmote;
    if (validEmote !== 'none') {
      const reqLessons = EMOTE_META[validEmote]?.unlockLesson ?? 1;
      if (completedLessonKeys.length < reqLessons) {
        validEmote = 'none';
      }
    }

    saveBloomOutfit({
      equippedSkin: validSkin,
      casualShirtEquipped: validSkin === 'shirt',
      shirtColor,
      hoodieVariant,
      jacketVariant,
      armorVariant,
      activeEmote: validEmote,
    });
  }, [
    isCasualShirtUnlocked,
    isHoodieUnlocked,
    isAstralJacketUnlocked,
    isDiamondArmorUnlocked,
    completedLessonKeys.length,
    equippedSkin,
    shirtColor,
    hoodieVariant,
    jacketVariant,
    armorVariant,
    activeEmote,
  ]);

  useEffect(() => {
    localStorage.setItem('cb_learning_mode', learningMode);
  }, [learningMode]);

  useEffect(() => {
    localStorage.setItem('cb_bloom_plumage', plumage);
  }, [plumage]);

  useEffect(() => {
    localStorage.setItem('cb_completed_biomes_v4', JSON.stringify(completedBiomeIds));
  }, [completedBiomeIds]);

  useEffect(() => {
    localStorage.setItem('cb_completed_lessons_v4', JSON.stringify(completedLessonKeys));
  }, [completedLessonKeys]);

  useEffect(() => {
    localStorage.setItem('cb_streak_days_v4', String(streakDays));
    localStorage.setItem('cb_streak_vouchers', String(streakVouchers));
    localStorage.setItem('cb_resilience_xp', String(resilienceXP));
    localStorage.setItem('cb_protected_mxn', String(protectedCapitalMXN));
  }, [streakDays, streakVouchers, resilienceXP, protectedCapitalMXN]);

  useEffect(() => {
    localStorage.setItem('cb_sm2_cards', JSON.stringify(sm2Cards));
  }, [sm2Cards]);

  useEffect(() => {
    localStorage.setItem('cb_color_theme', colorTheme);
    const root = document.documentElement;
    root.classList.toggle('theme-dark', colorTheme === 'dark');
    root.classList.toggle('a11y-large-text', largeText);
    root.classList.toggle('a11y-high-contrast', highContrast);
    root.classList.toggle('a11y-reduce-motion', reduceMotion);
  }, [colorTheme, largeText, highContrast, reduceMotion]);

  const filteredTopics = useMemo(() => {
    return BIOME_MODULES.filter((b) => {
      const matchesStage = stageFilter === 'all' || b.stage === stageFilter;
      const matchesBiome = biomeFilter === 'all' || b.biomeFamily === biomeFilter;
      return matchesStage && matchesBiome;
    });
  }, [stageFilter, biomeFilter]);

  const nextRecommendedTopic =
    BIOME_MODULES.find((b) => !completedBiomeIds.includes(b.id)) || BIOME_MODULES[0];

  const totalLessonsCount = BIOME_MODULES.length * TOPIC_LESSONS_BLUEPRINT.length; // 14 * 6 = 84 lessons

  const [activeBiomeBgId, setActiveBiomeBgId] = useState<number>(1);
  const activeGlobalDesign = getBiomeUniqueDesign(activeBiomeBgId);

  const openTopicLesson = (topic: BiomeModule, lessonNum: LessonNumber) => {
    soundFX.playTap();
    setActiveBiomeBgId(topic.id);
    setSelectedInitialLesson(lessonNum);
    setSelectedBiome(topic);
  };

  const toggleTopicCollapse = (topicId: number) => {
    soundFX.playTap();
    setActiveBiomeBgId(topicId);
    setCollapsedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleCompleteBiome = (result: {
    biomeId: number;
    lessonCompleted: LessonNumber;
    mistakes: QuizQuestion[];
    perfectScore: boolean;
    earnedXP: number;
    dilemmaSavedMXN: number;
    closeModal?: boolean;
  }) => {
    const prevCount = completedLessonKeys.length;
    const newKeys = new Set(completedLessonKeys);
    newKeys.add(`${result.biomeId}-${result.lessonCompleted}`);
    const updatedKeys = Array.from(newKeys);
    setCompletedLessonKeys(updatedKeys);

    const newCount = updatedKeys.length;
    if (newCount > prevCount) {
      setStreakDays((prev) => Math.max(prev, newCount));
      // Check if a reward milestone was just reached!
      for (let c = prevCount + 1; c <= newCount; c++) {
        const milestone = LESSON_REWARD_MILESTONES[c];
        if (milestone) {
          setRewardUnlockNotice(
            `🎉 ¡Lección ${c} completada! Desbloqueaste ${milestone.badgeText} y un nuevo Logro.`
          );
        }
      }
    }

    // Mark entire topic completed if all 6 lessons are done
    const allSixDone = [1, 2, 3, 4, 5, 6].every((num) =>
      updatedKeys.includes(`${result.biomeId}-${num}`)
    );
    const updatedBiomeIds =
      allSixDone && !completedBiomeIds.includes(result.biomeId)
        ? [...completedBiomeIds, result.biomeId]
        : completedBiomeIds;
    if (allSixDone && !completedBiomeIds.includes(result.biomeId)) {
      setCompletedBiomeIds(updatedBiomeIds);
    }

    if (result.perfectScore && result.lessonCompleted === 6) {
      setStreakVouchers((prev) => prev + 1);
    }
    const updatedXP = resilienceXP + result.earnedXP;
    const updatedProtected = protectedCapitalMXN + result.dilemmaSavedMXN;
    setResilienceXP(updatedXP);
    setProtectedCapitalMXN(updatedProtected);

    // Sync live progress and post milestone announcement to the online community feed if logged in
    if (onlineUser && newCount > prevCount) {
      const milestoneHit = LESSON_REWARD_MILESTONES[newCount];
      const announcement = milestoneHit
        ? `completó la Lección ${newCount} y desbloqueó ${milestoneHit.badgeText}`
        : `avanzó a ${newCount}/84 lecciones en el Bioma ${String(result.biomeId).padStart(2, '0')}`;
      fetch('/api/community/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: onlineUser.id,
          milestoneAnnouncement: announcement,
          progress: {
            completedLessonKeys: updatedKeys,
            completedLessonsCount: newCount,
            completedBiomeIds: updatedBiomeIds,
            currentBiomeId: result.biomeId,
            currentBiomeName:
              BIOME_MODULES.find((b) => b.id === result.biomeId)?.biomeName ||
              nextRecommendedTopic.biomeName,
            streakDays: Math.max(streakDays, newCount),
            resilienceXP: updatedXP,
            protectedCapitalMXN: updatedProtected,
            plumage,
            equippedSkin,
            shirtColor,
            hoodieVariant,
            jacketVariant,
            armorVariant,
            activeEmote,
          },
        }),
      }).catch(() => {});
    }

    const biomeObj = BIOME_MODULES.find((b) => b.id === result.biomeId);
    if (biomeObj && result.lessonCompleted === 6) {
      setSm2Cards((prev) => {
        const updated = [...prev];
        biomeObj.quiz.forEach((q) => {
          const wasMistake = result.mistakes.some((m) => m.id === q.id);
          const existingIdx = updated.findIndex((c) => c.questionId === q.id);
          if (existingIdx >= 0) {
            const current = updated[existingIdx];
            const nextInterval: 1 | 3 | 7 | 14 = wasMistake
              ? 1
              : current.intervalDays === 1
              ? 3
              : current.intervalDays === 3
              ? 7
              : 14;
            updated[existingIdx] = {
              ...current,
              intervalDays: nextInterval,
              repetitions: current.repetitions + 1,
              mistakeCount: wasMistake ? current.mistakeCount + 1 : current.mistakeCount,
              lastReviewedISO: '2026-09-25',
            };
          } else {
            updated.push({
              questionId: q.id,
              biomeId: biomeObj.id,
              biomeTitle: biomeObj.title,
              conceptTag: q.conceptTag,
              question: q.question,
              options: q.options,
              correctIndex: q.correctIndex,
              explanation: q.explanation,
              intervalDays: wasMistake ? 1 : 3,
              repetitions: 1,
              mistakeCount: wasMistake ? 1 : 0,
              lastReviewedISO: '2026-09-25',
              nextReviewLabel: wasMistake ? 'Hoy (Día 1)' : 'En 3 días',
            });
          }
        });
        return updated;
      });
    }

    if (result.closeModal !== false) {
      setSelectedBiome(null);
    }
  };

  // Opens the next uncompleted lesson so the user earns Emotes, Ropa, and Logros by completing lessons!
  const handleGoToNextUncompletedLesson = () => {
    for (const biome of BIOME_MODULES) {
      for (const l of TOPIC_LESSONS_BLUEPRINT) {
        if (!completedLessonKeys.includes(`${biome.id}-${l.lessonNumber}`)) {
          setShowEmotesModal(false);
          setShowWardrobeModal(false);
          setShowAchievementsModal(false);
          setShowOnlineCommunityModal(false);
          setShowOnlineMinigamesModal(false);
          setShowBloomCompanionCard(false);
          openTopicLesson(biome, l.lessonNumber);
          return;
        }
      }
    }
    openTopicLesson(BIOME_MODULES[0], 1);
  };

  const unlockedAchievementsCount = useMemo(
    () =>
      getBloomAchievements(completedLessonKeys.length, protectedCapitalMXN).filter(
        (a) => a.unlocked
      ).length,
    [completedLessonKeys.length, protectedCapitalMXN]
  );

  // Keep online profile synced when outfit, emote, or achievements change
  useEffect(() => {
    if (!onlineUser) return;
    localStorage.setItem('cb_online_user_v1', JSON.stringify(onlineUser));
    fetch('/api/community/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: onlineUser.id,
        progress: {
          completedLessonKeys,
          completedLessonsCount: completedLessonKeys.length,
          completedBiomeIds,
          currentBiomeId: nextRecommendedTopic.id,
          currentBiomeName: nextRecommendedTopic.biomeName,
          streakDays,
          resilienceXP,
          protectedCapitalMXN,
          achievementsCount: unlockedAchievementsCount,
          plumage,
          equippedSkin,
          shirtColor,
          hoodieVariant,
          jacketVariant,
          armorVariant,
          activeEmote,
        },
      }),
    }).catch(() => {});
  }, [
    onlineUser,
    completedLessonKeys,
    completedBiomeIds,
    nextRecommendedTopic.id,
    nextRecommendedTopic.biomeName,
    streakDays,
    resilienceXP,
    protectedCapitalMXN,
    unlockedAchievementsCount,
    plumage,
    equippedSkin,
    shirtColor,
    hoodieVariant,
    jacketVariant,
    armorVariant,
    activeEmote,
  ]);

  const handleReviewSM2Card = (questionId: string, wasCorrect: boolean) => {
    setSm2Cards((prev) =>
      prev.map((card) => {
        if (card.questionId !== questionId) return card;
        const nextInterval: 1 | 3 | 7 | 14 = !wasCorrect
          ? 1
          : card.intervalDays === 1
          ? 3
          : card.intervalDays === 3
          ? 7
          : 14;
        return {
          ...card,
          intervalDays: nextInterval,
          repetitions: card.repetitions + 1,
          mistakeCount: wasCorrect ? Math.max(0, card.mistakeCount - 1) : card.mistakeCount + 1,
        };
      })
    );
    if (wasCorrect) {
      setResilienceXP((prev) => prev + 30);
    }
  };

  const handleEarnSimulatorXP = (xp: number, savedMXN: number) => {
    setResilienceXP((prev) => prev + xp);
    setProtectedCapitalMXN((prev) => prev + Math.round(savedMXN / 12));
  };

  const currentWisdom = BLOOM_FRAGMENTED_WISDOM[wisdomIndex % BLOOM_FRAGMENTED_WISDOM.length];

  const getLessonIcon = (lessonNumber: LessonNumber) => {
    switch (lessonNumber) {
      case 1:
        return <Headphones className="w-6 h-6" />;
      case 2:
        return <FileCheck2 className="w-6 h-6" />;
      case 3:
        return <Puzzle className="w-6 h-6" />;
      case 4:
        return <ListOrdered className="w-6 h-6" />;
      case 5:
        return <Sliders className="w-6 h-6" />;
      case 6:
        return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col pb-16 relative overflow-x-hidden transition-colors duration-300 ${
        colorTheme === 'dark' ? 'text-[#F8FBCA]' : 'text-[#0A3323]'
      }`}
    >
      {/* CLEAN HIGH-CONTRAST STUDIO INTERFACE BACKGROUND (LIGHT MODE & DARK MODE, NO BIOME) */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 -z-20 pointer-events-none overflow-hidden transition-colors duration-500 ${
          colorTheme === 'dark'
            ? 'bg-gradient-to-br from-[#06110C] via-[#0B1D15] to-[#0E1726]'
            : 'bg-gradient-to-br from-[#F6F7EC] via-[#ECF0DC] to-[#E2E9D2]'
        }`}
      >
        {/* Subtle Architectural Grid & Dot Pattern for Crisp Contrast Behind Biome Cards */}
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              colorTheme === 'dark'
                ? 'radial-gradient(#F8FBCA 1.25px, transparent 1.25px)'
                : 'radial-gradient(#0A3323 1.25px, transparent 1.25px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Soft Studio Ambient Accent Glows (Adapts to Light / Dark Mode) */}
        <div
          className={`absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full blur-3xl transition-colors duration-500 ${
            colorTheme === 'dark' ? 'bg-[#145A3A]/35' : 'bg-[#D9E5B8]/55'
          }`}
        />
        <div
          className={`absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full blur-3xl transition-colors duration-500 ${
            colorTheme === 'dark' ? 'bg-[#105666]/35' : 'bg-[#D5E6E3]/60'
          }`}
        />
        <div
          className={`absolute -bottom-32 left-1/3 w-[30rem] h-[30rem] rounded-full blur-3xl transition-colors duration-500 ${
            colorTheme === 'dark' ? 'bg-[#734A91]/25' : 'bg-[#EADCF2]/45'
          }`}
        />
      </div>

      {/* TOP BANNER: THE SINGLE PLACE FOR LOGROS, ROPA, EMOTES, AJUSTES Y PLUMAJE */}
      <header className="sticky top-0 z-30 min-h-16 py-2 bg-gradient-to-r from-[#0A3323] via-[#145A3A] to-[#105666] border-b-4 border-[#839958] px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 shadow-md">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              soundFX.playTap();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F8FBCA] font-display whitespace-nowrap"
          >
            Capital Bloom
          </a>
        </div>

        {/* Right Actions: Live Badges + PWA + Logros + Ropa + Emotes + Ajustes y Plumaje (ONLY HERE IN TOP BANNER) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <div className="hidden lg:flex items-center gap-2">
            <span className="px-2.5 py-1.5 rounded-xl bg-[#8F6277] border-2 border-[#F6C8C7] text-[#F9D6D5] text-xs font-mono font-extrabold flex items-center gap-1 tabular-nums">
              <Flame className="w-3.5 h-3.5 fill-[#F6C8C7] text-[#F6C8C7]" />
              <span>{streakDays}d</span>
            </span>
            <span className="px-2.5 py-1.5 rounded-xl bg-[#734A91] border-2 border-[#E0B0FF] text-[#F1D7FF] text-xs font-mono font-extrabold flex items-center gap-1 tabular-nums">
              <Shield className="w-3.5 h-3.5 fill-[#E0B0FF] text-[#E0B0FF]" />
              <span>{streakVouchers}</span>
            </span>
            <span className="px-2.5 py-1.5 rounded-xl bg-[#2F7D5B] border-2 border-[#F8FBCA] text-[#F8FBCA] text-xs font-mono font-extrabold flex items-center gap-1 tabular-nums">
              <Sparkles className="w-3.5 h-3.5 text-[#F8FBCA]" />
              <span>{resilienceXP} XP</span>
            </span>
          </div>

          <PWAInstallButton />

          <button
            onClick={() => {
              soundFX.playTap();
              setShowOnlineMinigamesModal(true);
            }}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] border-2 border-[#BAE6FD] border-b-4 text-white hover:brightness-110 text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer active:translate-y-0.5"
            title="Jugar Minijuegos Online Cortos con Preguntas de Finanzas"
          >
            <Gamepad2 className="w-4 h-4 text-[#BAE6FD] shrink-0" />
            <span>Minijuegos Online</span>
          </button>

          <button
            onClick={() => {
              soundFX.playTap();
              setShowOnlineCommunityModal(true);
            }}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] border-2 border-[#A7F3D0] border-b-4 text-white hover:brightness-110 text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer active:translate-y-0.5"
            title="Iniciar Sesión y Ver Progreso en Línea de la Comunidad"
          >
            <Users className="w-4 h-4 text-[#A7F3D0] shrink-0" />
            <span>
              {onlineUser ? `En Línea: ${onlineUser.displayName}` : 'Iniciar Sesión · En Línea'}
            </span>
          </button>

          <button
            onClick={() => {
              soundFX.playTap();
              setShowAchievementsModal(true);
            }}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] border-2 border-[#F8FBCA] border-b-4 text-[#0A3323] hover:brightness-105 text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer active:translate-y-0.5"
            title="Abrir Sección de Logros"
          >
            <Trophy className="w-4 h-4 text-[#0A3323] shrink-0" />
            <span>Logros</span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#0A3323] text-[#FFD166] text-[10px] font-mono">
              {unlockedAchievementsCount}/12
            </span>
          </button>

          <button
            onClick={() => {
              soundFX.playTap();
              setShowWardrobeModal(true);
            }}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#734A91] to-[#1D2951] border-2 border-[#F1D7FF] border-b-4 text-white hover:brightness-110 text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer active:translate-y-0.5"
            title="Abrir Guardarropa de Ropa de Bloom"
          >
            <Shirt className="w-4 h-4 text-[#F1D7FF] shrink-0" />
            <span>Ropa</span>
          </button>

          <button
            onClick={() => {
              soundFX.playTap();
              setShowEmotesModal(true);
            }}
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0F172A] to-[#1E1B4B] border-2 border-[#38BDF8] border-b-4 text-white hover:from-[#1E293B] hover:to-[#312E81] text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer active:translate-y-0.5"
            title="Abrir Emotes"
          >
            <Sparkles className="w-4 h-4 text-[#38BDF8] shrink-0" />
            <span>Emotes</span>
          </button>

          <button
            onClick={() => {
              soundFX.playTap();
              setShowA11yModal(true);
            }}
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#F8FBCA] border-2 border-[#839958] border-b-4 text-[#0A3323] hover:bg-[#F7FAD5] text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer active:translate-y-0.5"
            title="Personalizar Plumaje Oficial, Interfaz de Modo Claro/Oscuro y Ajustes"
          >
            <Settings2 className="w-4 h-4 text-[#145A3A] shrink-0" />
            <span>Ajustes y Plumaje</span>
          </button>
        </div>
      </header>

      {/* UNLOCK NOTIFICATION BANNER WHEN A LESSON MILESTONE IS COMPLETED */}
      {rewardUnlockNotice && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          <div className="p-4 rounded-3xl bg-gradient-to-r from-[#1D2951] via-[#734A91] to-[#145A3A] border-2 border-[#F8FBCA] border-b-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <BloomMascot size="md" plumage={plumage} emote={activeEmote} />
              <div>
                <p className="text-xs font-mono font-extrabold text-[#FFD166] uppercase">
                  RECOMPENSA DESBLOQUEADA POR COMPLETAR LECCIONES
                </p>
                <h3 className="text-base sm:text-lg font-semibold text-white font-display">
                  {rewardUnlockNotice}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  soundFX.playSuccess();
                  setShowEmotesModal(true);
                  setRewardUnlockNotice(null);
                }}
                className="px-3.5 py-2 rounded-2xl bg-[#F8FBCA] text-[#0A3323] border-2 border-[#0A3323] border-b-4 text-xs font-extrabold cursor-pointer"
              >
                Ver Emotes
              </button>
              <button
                onClick={() => {
                  soundFX.playSuccess();
                  setShowWardrobeModal(true);
                  setRewardUnlockNotice(null);
                }}
                className="px-3.5 py-2 rounded-2xl bg-[#34D399] text-[#0A3323] border-2 border-[#0A3323] border-b-4 text-xs font-extrabold cursor-pointer"
              >
                Ver Ropa
              </button>
              <button
                onClick={() => setRewardUnlockNotice(null)}
                className="p-2 rounded-xl bg-white/15 text-white hover:bg-white/25 cursor-pointer"
                aria-label="Cerrar aviso"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER: FULL-WIDTH CENTERED BIOME EXPERIENCE (NO RIGHT SIDEBAR DUPLICATES) */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-10">
        <div className="space-y-7">
          {/* COLORFUL BIOME ECOSYSTEMS BAR + VIEW CONTROLS */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0A3323] via-[#105666] to-[#1D2951] border-2 border-[#839958] border-b-6 text-white space-y-4 shadow-lg">
              {/* Top Row: Explorar por Ecosistema de Bioma + Stage Filter (Todas las Etapas / Etapa 1 / Etapa 2) */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#F8FBCA]">
                    <Trees className="w-4 h-4 text-[#839958]" />
                    <span>EXPLORAR POR ECOSISTEMA DE BIOMA:</span>
                  </span>

                  <div className="flex items-center gap-1.5 p-1 bg-[#0A3323]/80 rounded-2xl border-2 border-[#A87BC7]/70">
                    {(['all', 1, 2] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => {
                          soundFX.playTap();
                          setStageFilter(st);
                        }}
                        className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
                          stageFilter === st
                            ? 'bg-[#F6C8C7] text-[#0A3323]'
                            : 'text-[#F9D6D5]/85 hover:text-white'
                        }`}
                      >
                        {st === 'all' ? 'Todas las Etapas' : `Etapa ${st}`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(
                    [
                      {
                        id: 'all',
                        label: 'Todos los Biomas',
                        swatch: '#F8FBCA',
                        activeTone:
                          'bg-[#F8FBCA] text-[#0A3323] border-[#839958] ring-2 ring-[#F8FBCA]',
                        idleTone:
                          'bg-[#0A3323] text-[#F8FBCA] border-[#839958]/70 hover:bg-[#145A3A]',
                      },
                      {
                        id: 'tropical',
                        label: 'Selva Tropical',
                        swatch: '#839958',
                        activeTone:
                          'bg-[#2F7D5B] text-[#F8FBCA] border-[#F8FBCA] ring-2 ring-[#839958]',
                        idleTone:
                          'bg-[#145A3A] text-[#F8FBCA] border-[#839958] hover:bg-[#2F7D5B]',
                      },
                      {
                        id: 'temperate',
                        label: 'Bosque y Agua',
                        swatch: '#7285A5',
                        activeTone:
                          'bg-[#105666] text-[#F7FAD5] border-[#F7FAD5] ring-2 ring-[#7285A5]',
                        idleTone:
                          'bg-[#105666]/85 text-[#F7FAD5] border-[#7285A5] hover:bg-[#105666]',
                      },
                      {
                        id: 'desert',
                        label: 'Desierto y Oasis',
                        swatch: '#F6C8C7',
                        activeTone:
                          'bg-[#8F6277] text-[#F9D6D5] border-[#F6C8C7] ring-2 ring-[#F6C8C7]',
                        idleTone:
                          'bg-[#8F6277]/90 text-[#F9D6D5] border-[#D3968C] hover:bg-[#BA7B7C]',
                      },
                      {
                        id: 'paramo',
                        label: 'Alta Montaña',
                        swatch: '#E0B0FF',
                        activeTone:
                          'bg-[#734A91] text-[#F1D7FF] border-[#E0B0FF] ring-2 ring-[#E0B0FF]',
                        idleTone:
                          'bg-[#734A91]/90 text-[#F1D7FF] border-[#A87BC7] hover:bg-[#734A91]',
                      },
                    ] as const
                  ).map((bTab) => {
                    const active = biomeFilter === bTab.id;
                    return (
                      <button
                        key={bTab.id}
                        onClick={() => {
                          soundFX.playTap();
                          setBiomeFilter(bTab.id);
                          const firstMatching = BIOME_MODULES.find(
                            (m) => bTab.id === 'all' || m.biomeFamily === bTab.id
                          );
                          if (firstMatching) {
                            setActiveBiomeBgId(firstMatching.id);
                          }
                        }}
                        className={`min-h-[40px] px-2.5 py-1.5 rounded-xl border-2 border-b-4 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          active ? bTab.activeTone : bTab.idleTone
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 border border-[#0A3323]"
                          style={{ backgroundColor: bTab.swatch }}
                        />
                        <span className="truncate">{bTab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Third Row: Quick Jump Navigator to Any of the 14 Biomes */}
              <div className="pt-2 border-t border-[#F8FBCA]/25 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono font-bold text-[#F8FBCA]">
                  <span>
                    🧭 NAVEGACIÓN RÁPIDA DE BIOMAS: BIOMA {String(activeBiomeBgId).padStart(2, '0')} ·{' '}
                    {activeGlobalDesign.biomeTitle.toUpperCase()}
                  </span>
                  <span className="text-[#F6C8C7]">
                    Toca cualquier código (B01–B14) para ir directo a ese bioma
                  </span>
                </div>
                <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5">
                  {BIOME_MODULES.map((b) => {
                    const isSelectedBg = activeBiomeBgId === b.id;
                    return (
                      <button
                        key={b.id}
                        onClick={() => {
                          soundFX.playTap();
                          setActiveBiomeBgId(b.id);
                          setBiomeFilter('all');
                          setStageFilter('all');
                          window.setTimeout(() => {
                            document
                              .getElementById(`biome-section-${b.id}`)
                              ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }, 60);
                        }}
                        title={`Ir a Bioma ${b.id}: ${getBiomeUniqueDesign(b.id).biomeTitle}`}
                        className={`py-1.5 rounded-xl font-mono text-[11px] font-extrabold border-2 cursor-pointer transition-all ${
                          isSelectedBg
                            ? 'bg-[#F8FBCA] text-[#0A3323] border-[#839958] scale-105 shadow-sm'
                            : 'bg-black/40 text-[#F8FBCA] border-white/25 hover:bg-black/65'
                        }`}
                      >
                        B{String(b.id).padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* VIEW A: COLORFUL BIOME HABITAT CONTAINERS WITH 6 MULTI-COLOR INTERACTIVE LESSONS PER TOPIC */}
            {viewLayout === 'path' && (
              <div className="space-y-10">
                {filteredTopics.map((topic) => {
                  const isCollapsed = collapsedTopicIds.includes(topic.id);
                  const completedLessonsInTopic = TOPIC_LESSONS_BLUEPRINT.filter((l) =>
                    completedLessonKeys.includes(`${topic.id}-${l.lessonNumber}`)
                  ).length;
                  const uniqueDesign = getBiomeUniqueDesign(topic.id);

                  return (
                    <section
                      key={topic.id}
                      id={`biome-section-${topic.id}`}
                      className={`relative rounded-[2.25rem] border-3 border-b-8 ${uniqueDesign.pathBorder} ${uniqueDesign.bannerBg} overflow-hidden shadow-2xl transition-all`}
                      aria-label={`Tema ${topic.id}: ${topic.title}`}
                    >
                      {/* UNA SOLA IMAGEN DE FONDO PARA TODO EL BIOMA (ENCABEZADO + 6 LECCIONES, SIN DUPLICAR) */}
                      <BiomeScenicBackground topicId={topic.id} variant="path" />

                      {/* 1. TOPIC HEADER INTEGRATED OVER THE SINGLE BIOME BACKGROUND */}
                      <AnimatedBiomeBanner
                        topicId={topic.id}
                        stage={topic.stage}
                        title={topic.title}
                        subtitle={topic.subtitle}
                        biomeName={topic.biomeName}
                        biomeFamily={topic.biomeFamily}
                        imageUrl={topic.imageUrl}
                        completedLessonsCount={completedLessonsInTopic}
                        totalLessonsCount={6}
                        plumage={plumage}
                        useSharedSectionBg={true}
                        onStartTopic={() => {
                          const nextLesson =
                            TOPIC_LESSONS_BLUEPRINT.find(
                              (l) => !completedLessonKeys.includes(`${topic.id}-${l.lessonNumber}`)
                            )?.lessonNumber || 1;
                          openTopicLesson(topic, nextLesson);
                        }}
                        onSelectLesson={(lessonNum) => openTopicLesson(topic, lessonNum)}
                      />

                      {/* Biome Habitat Ecological Strip & Collapse Toggle (Unique per Topic!) */}
                      <div
                        className={`relative z-10 px-5 py-3 border-y-2 ${uniqueDesign.subBarStyle} flex flex-wrap items-center justify-between gap-2 text-xs backdrop-blur-md`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 font-extrabold">
                            <Trees className="w-4 h-4 text-[#F8FBCA]" />
                            <span>{uniqueDesign.biomeTitle}</span>
                          </span>
                          <span className="opacity-80">·</span>
                          <span className="font-mono text-[11px] font-bold">
                            {uniqueDesign.climateTag}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleTopicCollapse(topic.id)}
                          className="px-3 py-1 rounded-xl bg-black/35 hover:bg-black/55 border border-white/30 text-white font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>
                            {isCollapsed
                              ? `Desplegar 6 Lecciones (${completedLessonsInTopic}/6)`
                              : `Ocultar 6 Lecciones (${completedLessonsInTopic}/6)`}
                          </span>
                          {isCollapsed ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronUp className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* 2. 6 SINGLE-TOPIC LESSONS OVER THE SAME UNIFIED BIOME BACKGROUND (NO DUPLICATED IMAGE) */}
                      {!isCollapsed && (
                        <div
                          onClick={() => setActiveBiomeBgId(topic.id)}
                          className="pb-5 pt-3 px-4 sm:px-6 flex flex-col items-center space-y-6 relative z-10"
                        >
                          {/* Subtle Scrim for High Contrast on Lesson Stations */}
                          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                          {/* Top Biome Identity Crest */}
                          <div className="relative z-10 w-full">
                            <BiomeSculptedCrest topicId={topic.id} position="top" />
                          </div>

                          {/* Quick 6-Lesson Horizontal Selector Bar at Top of Habitat */}
                          <div
                            className={`relative z-10 w-full max-w-xl grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-2.5 rounded-2xl border-2 border-b-4 shadow-md ${uniqueDesign.miniBarStyle}`}
                          >
                            {TOPIC_LESSONS_BLUEPRINT.map((l) => {
                              const done = completedLessonKeys.includes(
                                `${topic.id}-${l.lessonNumber}`
                              );
                              return (
                                <button
                                  key={l.lessonNumber}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openTopicLesson(topic, l.lessonNumber);
                                  }}
                                  className={`px-2 py-1.5 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 cursor-pointer transition-transform active:translate-y-0.5 border-2 ${
                                    done
                                      ? 'bg-[#2F7D5B] text-[#F8FBCA] border-[#0A3323]'
                                      : `${l.nodeBg} opacity-95 hover:opacity-100`
                                  }`}
                                >
                                  <span>L0{l.lessonNumber}</span>
                                  {done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </button>
                              );
                            })}
                          </div>

                          {/* Winding Expedition Path of 6 Rich Single-Topic Lesson Stations */}
                          {TOPIC_LESSONS_BLUEPRINT.map((lesson, idx) => {
                            const lessonKey = `${topic.id}-${lesson.lessonNumber}`;
                            const isLessonDone = completedLessonKeys.includes(lessonKey);
                            const isFirstPendingInTopic =
                              !isLessonDone &&
                              TOPIC_LESSONS_BLUEPRINT.slice(0, idx).every((prevL) =>
                                completedLessonKeys.includes(`${topic.id}-${prevL.lessonNumber}`)
                              );
                            const offsetClass = PATH_OFFSETS[idx % PATH_OFFSETS.length];
                            const singleTopicMeta =
                              getBiomeSingleTopicLessons(topic.id)[idx] ||
                              getBiomeSingleTopicLessons(topic.id)[0];

                            // Global lesson number (1..84) to highlight distributed Emote & Clothing Milestones
                            const globalLessonIndex = (topic.id - 1) * 6 + lesson.lessonNumber;
                            const lessonMilestone = LESSON_REWARD_MILESTONES[globalLessonIndex];
                            const isMilestoneUnlocked =
                              lessonMilestone !== undefined &&
                              completedLessonKeys.length >= lessonMilestone.lessonCount;

                            return (
                              <div
                                key={lessonKey}
                                className={`relative z-10 flex flex-col items-center ${offsetClass}`}
                              >
                                {/* Connecting dashed trail to next lesson */}
                                {idx < TOPIC_LESSONS_BLUEPRINT.length - 1 && (
                                  <div
                                    aria-hidden="true"
                                    className={`absolute top-20 h-20 w-1.5 border-l-4 border-dashed ${uniqueDesign.trailBorderColor} -z-10`}
                                  />
                                )}

                                {/* Distributed Emote or Clothing Milestone Callout on this Lesson */}
                                {lessonMilestone && (
                                  <div
                                    className={`mb-2.5 px-3.5 py-1.5 rounded-2xl border-2 border-b-4 shadow-md text-[11px] font-extrabold flex items-center gap-1.5 whitespace-nowrap ${lessonMilestone.accentClass}`}
                                  >
                                    {lessonMilestone.type === 'clothing' ? (
                                      <Shirt className="w-3.5 h-3.5 shrink-0" />
                                    ) : (
                                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                                    )}
                                    <span>
                                      {isMilestoneUnlocked
                                        ? `✓ RECOMPENSA OBTENIDA · ${lessonMilestone.badgeText.toUpperCase()}`
                                        : `🔒 AL TERMINAR LECCIÓN ${lessonMilestone.lessonCount} · ${lessonMilestone.badgeText.toUpperCase()}`}
                                    </span>
                                  </div>
                                )}

                                {/* Floating Action Callout on the Active Lesson */}
                                {isFirstPendingInTopic && !lessonMilestone && (
                                  <div className="mb-2.5 px-4 py-1.5 rounded-2xl bg-[#F8FBCA] border-2 border-[#0A3323] border-b-4 shadow-md text-[11px] font-extrabold text-[#0A3323] flex items-center gap-1.5 whitespace-nowrap">
                                    <Sparkles className="w-3.5 h-3.5 text-[#734A91]" />
                                    <span>
                                      ¡ESTACIÓN ACTIVA · 1 SOLO TEMA! +{lesson.xpReward} XP
                                    </span>
                                  </div>
                                )}

                                {/* Tactile 3D Colorful Lesson Node Button atop a Sculpted Ecological Pedestal */}
                                <div className="relative flex flex-col items-center">
                                  {/* 3D Sculpted Stepping-Stone Pedestal Base */}
                                  <div
                                    aria-hidden="true"
                                    className="absolute -bottom-3 w-32 h-9 rounded-full bg-[#0A3323]/85 border-2 border-[#F8FBCA]/80 shadow-xl"
                                  />
                                  <div
                                    aria-hidden="true"
                                    className="absolute -bottom-1.5 w-26 h-5 rounded-full bg-[#F8FBCA]/40"
                                  />

                                  <button
                                    type="button"
                                    onClick={() => openTopicLesson(topic, lesson.lessonNumber)}
                                    className={`w-20 h-20 rounded-[1.75rem] border-3 border-b-8 flex flex-col items-center justify-center transition-transform duration-150 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-xl relative z-10 ${
                                      lesson.nodeBg
                                    } ${
                                      isFirstPendingInTopic
                                        ? 'ring-6 ring-[#F8FBCA]'
                                        : isLessonDone
                                        ? 'ring-4 ring-[#839958]'
                                        : ''
                                    }`}
                                    aria-label={`Lección ${lesson.lessonNumber}: ${singleTopicMeta.topicTitle}`}
                                  >
                                    {isLessonDone && (
                                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#F8FBCA] border-2 border-[#0A3323] text-[#145A3A] flex items-center justify-center shadow-xs">
                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                      </span>
                                    )}
                                    {getLessonIcon(lesson.lessonNumber)}
                                    <span className="text-[10px] font-mono font-extrabold mt-0.5 tabular-nums">
                                      L0{lesson.lessonNumber}
                                    </span>
                                  </button>
                                </div>

                                {/* Rich Interactive Biome Expedition Station Card */}
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openTopicLesson(topic, lesson.lessonNumber);
                                  }}
                                  className={`mt-4 w-full max-w-[365px] rounded-2xl border-2 border-b-6 shadow-xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-0.5 ${lesson.cardBg}`}
                                >
                                  {/* Station Top Telemetry Strip */}
                                  <div className="px-3.5 py-1.5 bg-[#0A3323] text-[#F8FBCA] flex items-center justify-between text-[10px] font-mono font-extrabold">
                                    <span>LECCIÓN 0{lesson.lessonNumber} · TEMA ÚNICO</span>
                                    <span className="text-[#F6C8C7]">
                                      +{lesson.xpReward} XP · ~5 MIN
                                    </span>
                                  </div>

                                  {/* Station Body */}
                                  <div className="p-3.5 text-left space-y-1.5">
                                    <p className="text-xs sm:text-sm font-extrabold text-[#0A3323] leading-snug">
                                      Lección {lesson.lessonNumber}: {singleTopicMeta.topicTitle}
                                    </p>
                                    <p className="text-[11px] text-[#0A3323]/90 font-medium leading-relaxed">
                                      {singleTopicMeta.topicFocusSummary}
                                    </p>

                                    <div className="pt-1.5 flex items-center justify-between gap-2 border-t border-[#0A3323]/15">
                                      <span
                                        className={`text-[10px] font-mono font-extrabold uppercase ${lesson.badgeColor}`}
                                      >
                                        {singleTopicMeta.interactiveBadge}
                                      </span>
                                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0A3323] text-[#F8FBCA] text-[10px] font-extrabold">
                                        <span>{isLessonDone ? 'Repasar' : 'Iniciar'}</span>
                                        <ArrowRight className="w-3 h-3" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          {/* Bottom Sculpted Organic Terrain Silhouette for this Specific Biome */}
                          <div className="relative z-10 w-full -mx-4 sm:-mx-6 -mb-4 pt-2">
                            <BiomeSculptedCrest topicId={topic.id} position="bottom" />
                          </div>
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            )}

            {/* VIEW B: COLORFUL COMPACT TOPIC ATLAS WITH DIRECT 6-LESSON BUTTONS */}
            {viewLayout === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredTopics.map((topic) => {
                  const uniqueDesign = getBiomeUniqueDesign(topic.id);
                  return (
                    <article
                      key={topic.id}
                      className={`rounded-3xl border-2 border-b-6 overflow-hidden flex flex-col justify-between shadow-md transition-transform hover:-translate-y-0.5 group ${uniqueDesign.cardSurface}`}
                    >
                      <div>
                        <div className={`relative h-48 overflow-hidden ${uniqueDesign.bannerBg}`}>
                          <BiomeScenicBackground topicId={topic.id} variant="banner" />
                          <div className={`absolute inset-0 bg-gradient-to-r ${uniqueDesign.bannerScrim}`} />
                          <div className="absolute top-2.5 left-2.5 z-10">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] font-extrabold shadow-xs ${uniqueDesign.badgeStyle}`}
                            >
                              <Trees className="w-3 h-3" />
                              <span>{uniqueDesign.biomeTitle}</span>
                            </span>
                          </div>
                          <div className="absolute top-2.5 right-2.5 z-10">
                            <BloomMascot mood="happy" size="sm" plumage={plumage} />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-3.5 flex flex-col justify-end z-10">
                            <div className="flex items-center justify-between text-[11px] text-[#F8FBCA]">
                              <span className="font-bold">{uniqueDesign.floraFaunaTag}</span>
                              <span className="font-mono font-bold tabular-nums">
                                TEMA {String(topic.id).padStart(2, '0')} · ~5 MIN/LECCIÓN
                              </span>
                            </div>
                            <h3 className="text-base font-semibold text-white font-display">
                              {topic.title}
                            </h3>
                          </div>
                        </div>

                        <div className="p-4 space-y-3">
                          <p className="text-[11px] text-[#145A3A] font-extrabold leading-snug bg-[#F8FBCA]/80 p-2.5 rounded-xl border border-[#839958]">
                            {uniqueDesign.bitacoraParticularidad}
                          </p>
                          <p className="text-xs text-[#0A3323] font-medium leading-relaxed">
                            {topic.summary}
                          </p>

                          {/* Direct 6 Single-Topic Lesson Buttons inside the Compact Card */}
                          <div className="space-y-1.5">
                            <p className="text-[11px] font-mono font-extrabold text-[#0A3323] uppercase">
                              6 LECCIONES (1 SOLO TEMA POR LECCIÓN):
                            </p>
                            <div className="grid grid-cols-1 gap-1.5">
                              {TOPIC_LESSONS_BLUEPRINT.map((l, idx) => {
                                const done = completedLessonKeys.includes(
                                  `${topic.id}-${l.lessonNumber}`
                                );
                                const singleTopicMeta =
                                  getBiomeSingleTopicLessons(topic.id)[idx] ||
                                  getBiomeSingleTopicLessons(topic.id)[0];
                                return (
                                  <button
                                    key={l.lessonNumber}
                                    onClick={() => openTopicLesson(topic, l.lessonNumber)}
                                    className={`min-h-[38px] px-3 py-1.5 rounded-xl border-2 text-left text-[11px] font-extrabold flex items-center justify-between gap-2 cursor-pointer transition-transform active:translate-y-0.5 ${
                                      done
                                        ? 'bg-[#2F7D5B] border-[#0A3323] text-[#F8FBCA]'
                                        : `${l.cardBg} text-[#0A3323]`
                                    }`}
                                  >
                                    <span className="truncate">
                                      L{l.lessonNumber}. {singleTopicMeta.topicTitle}
                                    </span>
                                    {done ? (
                                      <Check className="w-3.5 h-3.5 text-[#F8FBCA] shrink-0" />
                                    ) : (
                                      <ArrowRight className="w-3 h-3 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
        </div>
      </main>

      {/* OMNIPRESENT BLOOM HUMMINGBIRD COMPANION (COLIBRÍ BLOOM · ABUNDANCIA Y GUÍA WITH EXPANDED FINANCIAL TIPS) */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-30 flex flex-col items-end">
        {showBloomCompanionCard && (
          <div className="mb-3 w-85 sm:w-[26rem] max-h-[82vh] overflow-y-auto p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#F8FBCA] via-[#F9D6D5] to-[#F1D7FF] border-2 border-[#0A3323] border-b-6 shadow-2xl space-y-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <BloomMascot
                  size="md"
                  plumage={plumage}
                  previewSkin={equippedSkin}
                  shirtColor={shirtColor}
                  hoodieVariant={hoodieVariant}
                  jacketVariant={jacketVariant}
                  armorVariant={armorVariant}
                  emote={activeEmote}
                />
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#0A3323] text-[#F8FBCA] text-[10px] font-mono font-extrabold">
                    CONSEJO {(wisdomIndex % BLOOM_FRAGMENTED_WISDOM.length) + 1} DE{' '}
                    {BLOOM_FRAGMENTED_WISDOM.length}
                  </span>
                  <h4 className="text-sm sm:text-base font-semibold text-[#0A3323] font-display mt-0.5">
                    Colibrí Bloom · Abundancia y Guía
                  </h4>
                  <p className="text-[10px] font-mono font-extrabold text-[#734A91] uppercase">
                    {currentWisdom.tag}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBloomCompanionCard(false)}
                className="p-1.5 rounded-lg bg-[#F8FBCA] border border-[#0A3323] text-[#0A3323] hover:bg-[#F6C8C7] cursor-pointer shrink-0"
                aria-label="Cerrar mensaje de Bloom"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Active Advice / Wisdom Card */}
            <div className="p-3.5 rounded-2xl bg-[#F8FBCA] border-2 border-[#2F7D5B] space-y-2 text-xs shadow-xs">
              <p className="text-[#0A3323] leading-relaxed font-bold text-xs sm:text-sm">
                “{currentWisdom.quote}”
              </p>
              <p className="text-[#145A3A] font-extrabold pt-2 border-t border-[#2F7D5B]/40 leading-relaxed">
                {currentWisdom.microAction}
              </p>
            </div>

            {/* Navigation Buttons for Advice */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  soundFX.playTap();
                  setWisdomIndex(
                    (prev) =>
                      (prev - 1 + BLOOM_FRAGMENTED_WISDOM.length) %
                      BLOOM_FRAGMENTED_WISDOM.length
                  );
                }}
                className="px-3 py-2 rounded-xl bg-white border-2 border-[#0A3323] text-[#0A3323] text-[11px] font-extrabold hover:bg-[#F8FBCA] cursor-pointer"
              >
                ← Anterior
              </button>

              <button
                onClick={() => {
                  soundFX.playTap();
                  const nextRandom = Math.floor(Math.random() * BLOOM_FRAGMENTED_WISDOM.length);
                  setWisdomIndex(
                    nextRandom === wisdomIndex % BLOOM_FRAGMENTED_WISDOM.length
                      ? (nextRandom + 1) % BLOOM_FRAGMENTED_WISDOM.length
                      : nextRandom
                  );
                }}
                className="px-3 py-2 rounded-xl bg-[#F1D7FF] border-2 border-[#734A91] text-[#1D2951] text-[11px] font-extrabold hover:bg-[#E0B0FF] cursor-pointer"
              >
                Al azar
              </button>

              <button
                onClick={() => {
                  soundFX.playTap();
                  setWisdomIndex((prev) => (prev + 1) % BLOOM_FRAGMENTED_WISDOM.length);
                }}
                className="px-3.5 py-2 rounded-xl bg-[#2F7D5B] border-2 border-[#0A3323] text-[#F8FBCA] text-[11px] font-extrabold hover:bg-[#145A3A] cursor-pointer"
              >
                Siguiente Consejo →
              </button>
            </div>

            {/* Quick Browser of All 18 Abundance & Financial Tips */}
            <div className="pt-2 border-t border-[#0A3323]/20 space-y-1.5">
              <p className="text-[10px] font-mono font-extrabold text-[#0A3323] uppercase">
                Explorar todos los consejos de abundancia ({BLOOM_FRAGMENTED_WISDOM.length}):
              </p>
              <div className="max-h-36 overflow-y-auto pr-1 space-y-1">
                {BLOOM_FRAGMENTED_WISDOM.map((tip, idx) => {
                  const isActiveTip = wisdomIndex % BLOOM_FRAGMENTED_WISDOM.length === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        soundFX.playTap();
                        setWisdomIndex(idx);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-xl border text-left text-[11px] font-bold flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                        isActiveTip
                          ? 'bg-[#0A3323] text-[#F8FBCA] border-[#0A3323]'
                          : 'bg-white/75 text-[#0A3323] border-[#0A3323]/25 hover:bg-[#F8FBCA]'
                      }`}
                    >
                      <span className="truncate">
                        {idx + 1}. {tip.tag}
                      </span>
                      {isActiveTip && (
                        <span className="text-[9px] font-mono text-[#FFD166] shrink-0">
                          ● Activo
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Bottom-Right Companion Button (Shows active Emotes and Outfit visibly!) */}
        <button
          onClick={() => {
            soundFX.playTap();
            setShowBloomCompanionCard((prev) => !prev);
          }}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-[#F8FBCA] via-[#F6C8C7] to-[#E0B0FF] border-2 border-[#0A3323] border-b-5 shadow-xl flex items-center gap-2.5 cursor-pointer"
          aria-label="Abrir compañero colibrí Bloom"
        >
          <BloomMascot
            size="sm"
            plumage={plumage}
            previewSkin={equippedSkin}
            shirtColor={shirtColor}
            hoodieVariant={hoodieVariant}
            jacketVariant={jacketVariant}
            armorVariant={armorVariant}
            emote={activeEmote}
          />
          <div className="text-left pr-1 hidden sm:block">
            <p className="text-[10px] font-mono font-extrabold text-[#145A3A] uppercase leading-none">
              COLIBRÍ BLOOM
            </p>
            <p className="text-xs font-extrabold text-[#0A3323] leading-tight mt-0.5">
              Abundancia y Guía ({BLOOM_FRAGMENTED_WISDOM.length} consejos)
            </p>
          </div>
        </button>
      </div>

      {/* COLORFUL FOOTER */}
      <footer className="mt-12 border-t-4 border-[#839958] bg-gradient-to-r from-[#0A3323] via-[#145A3A] to-[#105666] py-6 px-4 sm:px-8 text-xs text-[#F8FBCA]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-bold text-[#F8FBCA]">
            Capital Bloom · Educación Financiera Minimalista, Fragmentada y Gamificada
          </p>
          <p className="font-mono text-[#F7FAD5] tabular-nums">
            14 Biomas Vivos · 84 Lecciones Interactivas · iOS &amp; Android PWA
          </p>
        </div>
      </footer>

      {/* ACTIVE TOPIC & LESSON MODAL */}
      {selectedBiome && (
        <LessonModal
          key={selectedBiome.id}
          biome={selectedBiome}
          initialLesson={selectedInitialLesson}
          learningMode={learningMode}
          streakVouchers={streakVouchers}
          plumage={plumage}
          completedLessonKeys={completedLessonKeys}
          onClose={() => setSelectedBiome(null)}
          onCompleteBiome={handleCompleteBiome}
        />
      )}

      {/* INTERACTIVE PRACTICE LABORATORY MODAL (SIMULATORS, SM-2 OR DOMINO) */}
      {activeLabModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A3323]/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-[#F8FBCA] via-[#F9D6D5]/80 to-[#F1D7FF] border-3 border-[#0A3323] border-b-8 p-4 sm:p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between gap-3 pb-3 border-b-2 border-[#0A3323]/20 sticky top-0 z-20 bg-[#F8FBCA]/95 backdrop-blur-xs px-3 py-2 rounded-2xl">
              <div className="flex items-center gap-2.5">
                <BloomMascot staticMascot={true} size="sm" plumage={plumage} />
                <div>
                  <p className="text-[11px] font-mono font-extrabold text-[#145A3A] uppercase">
                    LABORATORIO INTERACTIVO DE CAPITAL BLOOM
                  </p>
                  <h3 className="text-base sm:text-lg font-semibold text-[#0A3323] font-display">
                    {activeLabModal === 'simulators'
                      ? 'Simuladores Financieros MXN'
                      : activeLabModal === 'sm2'
                      ? 'Repaso Espaciado Inteligente (SM-2)'
                      : 'Efecto Dominó Macroeconómico'}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveLabModal(null)}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-[#0A3323] text-[#F8FBCA] hover:bg-[#145A3A] text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Volver a los Biomas</span>
              </button>
            </div>

            {activeLabModal === 'simulators' && (
              <SimulatorsView
                learningMode={learningMode}
                plumage={plumage}
                onEarnSimulatorXP={handleEarnSimulatorXP}
              />
            )}

            {activeLabModal === 'sm2' && (
              <SpacedRepetitionView
                sm2Cards={sm2Cards}
                plumage={plumage}
                onReviewCard={handleReviewSM2Card}
              />
            )}

            {activeLabModal === 'domino' && <DominoView plumage={plumage} />}
          </div>
        </div>
      )}

      {/* AJUSTES Y PLUMAJE MODAL (ONLY PLUMAGE PALETTE, INTERFACE THEME, AND GENERAL SETTINGS — NO CLOTHING OR EMOTES) */}
      {showA11yModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A3323]/75 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-modal-title"
        >
          <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto bg-gradient-to-br from-[#F8FBCA] via-[#F9D6D5] to-[#F1D7FF] rounded-3xl border-3 border-[#0A3323] border-b-8 p-5 sm:p-6 shadow-2xl space-y-5 my-auto">
            <div className="flex items-start justify-between gap-4 pb-3 border-b-2 border-[#0A3323]/20">
              <div className="flex items-center gap-3">
                <BloomMascot size="md" plumage={plumage} emote={activeEmote} />
                <div>
                  <p className="text-xs font-extrabold text-[#145A3A]">
                    Paleta Oficial, Interfaz y Accesibilidad
                  </p>
                  <h3
                    id="a11y-modal-title"
                    className="text-lg sm:text-xl font-semibold text-[#0A3323] font-display"
                  >
                    Ajustes y Plumaje
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowA11yModal(false)}
                className="min-h-[44px] min-w-[44px] rounded-xl bg-[#F8FBCA] border-2 border-[#0A3323] flex items-center justify-center text-[#0A3323] hover:bg-[#F6C8C7] cursor-pointer shrink-0"
                aria-label="Cerrar ajustes"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs sm:text-sm">
              {/* SECTION 1: PLUMAGE PALETTE (PALETA OFICIAL COMBINABLE) */}
              <div className="space-y-2">
                <p className="font-extrabold text-[#0A3323]">
                  1. Plumaje Combinable de Bloom (Paleta Oficial)
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {PLUMAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        soundFX.playTap();
                        setPlumage(opt.id);
                      }}
                      className={`min-h-[52px] p-3 rounded-xl border-2 text-xs font-extrabold flex flex-col justify-between text-left cursor-pointer ${
                        opt.cardTone
                      } ${
                        plumage === opt.id
                          ? 'ring-3 ring-[#0A3323] border-b-4'
                          : 'opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full gap-1">
                        <span>{opt.name}</span>
                        <div className="flex items-center -space-x-1">
                          {opt.swatches.map((hex, idx) => (
                            <span
                              key={idx}
                              className="w-4 h-4 rounded-full border border-[#0A3323]"
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-[#0A3323]/80 font-medium mt-1">
                        {opt.meaning}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 2: INTERFAZ DEL MODO (MODO CLARO Y MODO OSCURO) */}
              <div className="p-3.5 rounded-2xl bg-white/85 border-2 border-[#0A3323] space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <p className="font-extrabold text-[#0A3323] flex items-center gap-1.5">
                    {colorTheme === 'dark' ? (
                      <Moon className="w-4 h-4 text-[#734A91]" />
                    ) : (
                      <Sun className="w-4 h-4 text-[#D97706]" />
                    )}
                    <span>2. Interfaz del Modo (Modo Claro / Modo Oscuro)</span>
                  </p>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0A3323] text-[#F8FBCA] text-[10px] font-mono font-extrabold">
                    {colorTheme === 'dark' ? '🌙 OSCURO ACTIVO' : '☀️ CLARO ACTIVO'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      soundFX.playTap();
                      setColorTheme('light');
                    }}
                    className={`min-h-[46px] px-3.5 py-2.5 rounded-xl border-2 text-xs font-extrabold flex items-center justify-between gap-2 cursor-pointer transition-all ${
                      colorTheme === 'light'
                        ? 'bg-[#F8FBCA] text-[#0A3323] border-[#0A3323] border-b-4 ring-2 ring-[#2F7D5B]'
                        : 'bg-white text-[#0A3323] border-[#0A3323]/45 hover:bg-[#F8FBCA]/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-[#D97706] shrink-0" />
                      <span>Modo Claro</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#145A3A]">
                      {colorTheme === 'light' ? '✓ ACTIVO' : 'ELEGIR'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      soundFX.playTap();
                      setColorTheme('dark');
                    }}
                    className={`min-h-[46px] px-3.5 py-2.5 rounded-xl border-2 text-xs font-extrabold flex items-center justify-between gap-2 cursor-pointer transition-all ${
                      colorTheme === 'dark'
                        ? 'bg-[#0B1D15] text-[#F8FBCA] border-[#0A3323] border-b-4 ring-2 ring-[#839958]'
                        : 'bg-[#181B20] text-[#F8FBCA] border-[#0A3323]/60 hover:bg-[#0B1D15]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-[#FFD166] shrink-0" />
                      <span>Modo Oscuro</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#FFD166]">
                      {colorTheme === 'dark' ? '✓ ACTIVO' : 'ELEGIR'}
                    </span>
                  </button>
                </div>
              </div>

              {/* SECTION 3: MODALIDAD DE EJEMPLOS PRÁCTICOS */}
              <div className="space-y-1.5 pt-2 border-t-2 border-[#0A3323]/15">
                <p className="font-extrabold text-[#0A3323]">
                  3. Modalidad de Ejemplos Prácticos
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      soundFX.playTap();
                      setLearningMode('seed');
                    }}
                    className={`min-h-[44px] p-2.5 rounded-xl border-2 text-xs font-extrabold cursor-pointer ${
                      learningMode === 'seed'
                        ? 'border-[#0A3323] bg-[#2F7D5B] text-[#F8FBCA]'
                        : 'border-[#0A3323]/60 bg-[#F8FBCA] text-[#0A3323]'
                    }`}
                  >
                    Modo Semilla (Custodia)
                  </button>
                  <button
                    onClick={() => {
                      soundFX.playTap();
                      setLearningMode('flight');
                    }}
                    className={`min-h-[44px] p-2.5 rounded-xl border-2 text-xs font-extrabold cursor-pointer ${
                      learningMode === 'flight'
                        ? 'border-[#1D2951] bg-[#734A91] text-[#F1D7FF]'
                        : 'border-[#1D2951]/60 bg-[#F1D7FF] text-[#1D2951]'
                    }`}
                  >
                    Modo Vuelo (Titular)
                  </button>
                </div>
              </div>

              {/* SECTION 4: ACCESIBILIDAD Y AUDIO */}
              <div className="space-y-2.5 pt-2 border-t-2 border-[#0A3323]/15">
                <p className="font-extrabold text-[#0A3323]">
                  4. Audio y Accesibilidad Visual
                </p>

                <button
                  onClick={() => {
                    const muted = soundFX.toggleMute();
                    setIsSoundMuted(muted);
                    if (!muted) soundFX.playTap();
                  }}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-white border-2 border-[#0A3323] flex items-center justify-between text-xs font-extrabold text-[#0A3323] hover:bg-[#F8FBCA] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {isSoundMuted ? (
                      <VolumeX className="w-4 h-4 text-[#8F6277]" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-[#145A3A]" />
                    )}
                    <span>Efectos de Sonido de la Aplicación</span>
                  </span>
                  <span className="font-mono text-[#145A3A]">
                    {isSoundMuted ? '○ SILENCIADOS' : '● ACTIVOS'}
                  </span>
                </button>

                <button
                  onClick={() => setLargeText((prev) => !prev)}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F8FBCA] border-2 border-[#0A3323] flex items-center justify-between text-xs font-extrabold text-[#0A3323] hover:bg-[#F7FAD5] cursor-pointer"
                >
                  <span>Texto Ampliado (112.5%)</span>
                  <span className="font-mono text-[#145A3A]">
                    {largeText ? '● ACTIVO' : '○ INACTIVO'}
                  </span>
                </button>

                <button
                  onClick={() => setHighContrast((prev) => !prev)}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F1D7FF] border-2 border-[#1D2951] flex items-center justify-between text-xs font-extrabold text-[#1D2951] hover:bg-[#E0B0FF] cursor-pointer"
                >
                  <span>Modo Alto Contraste</span>
                  <span className="font-mono text-[#734A91]">
                    {highContrast ? '● ACTIVO' : '○ INACTIVO'}
                  </span>
                </button>

                <button
                  onClick={() => setReduceMotion((prev) => !prev)}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F9D6D5] border-2 border-[#8F6277] flex items-center justify-between text-xs font-extrabold text-[#0A3323] hover:bg-[#F6C8C7] cursor-pointer"
                >
                  <span>Reducir Animaciones</span>
                  <span className="font-mono text-[#8F6277]">
                    {reduceMotion ? '● ACTIVO' : '○ INACTIVO'}
                  </span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowA11yModal(false)}
                className="min-h-[44px] px-6 py-2 rounded-xl duo-btn-primary text-xs font-extrabold cursor-pointer"
              >
                ¡Listo!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED INDEPENDENT WARDROBE (ROPA DE BLOOM) MODAL */}
      {showWardrobeModal && (
        <BloomWardrobeModal
          plumage={plumage}
          activeEmote={activeEmote}
          equippedSkin={equippedSkin}
          onSelectEquippedSkin={setEquippedSkin}
          shirtColor={shirtColor}
          onSelectShirtColor={setShirtColor}
          hoodieVariant={hoodieVariant}
          onSelectHoodieVariant={setHoodieVariant}
          jacketVariant={jacketVariant}
          onSelectJacketVariant={setJacketVariant}
          armorVariant={armorVariant}
          onSelectArmorVariant={setArmorVariant}
          completedLessonsCount={completedLessonKeys.length}
          onGoToNextLesson={handleGoToNextUncompletedLesson}
          onClose={() => setShowWardrobeModal(false)}
        />
      )}

      {/* DEDICATED INDEPENDENT ACHIEVEMENTS (SECCIÓN DE LOGROS) MODAL */}
      {showAchievementsModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A3323]/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievements-modal-title"
        >
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-gradient-to-br from-[#F8FBCA] via-[#F9D6D5] to-[#F1D7FF] rounded-3xl border-3 border-[#0A3323] border-b-8 p-5 sm:p-6 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between gap-4 pb-3 border-b-2 border-[#0A3323]/20">
              <div className="flex items-center gap-3">
                <BloomMascot size="md" plumage={plumage} emote={activeEmote} />
                <div>
                  <p className="text-xs font-extrabold text-[#145A3A]">
                    Avance por Lección · Emotes, Ropa y Dominio Financiero
                  </p>
                  <h3
                    id="achievements-modal-title"
                    className="text-lg sm:text-xl font-semibold text-[#0A3323] font-display"
                  >
                    Sección de Logros
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowAchievementsModal(false)}
                className="min-h-[44px] min-w-[44px] rounded-xl bg-[#F8FBCA] border-2 border-[#0A3323] flex items-center justify-center text-[#0A3323] hover:bg-[#F6C8C7] cursor-pointer shrink-0"
                aria-label="Cerrar logros"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <BloomAchievementsSection
              compact={false}
              completedLessonsCount={completedLessonKeys.length}
              protectedCapitalMXN={protectedCapitalMXN}
              onGoToNextLesson={handleGoToNextUncompletedLesson}
            />

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowAchievementsModal(false)}
                className="min-h-[44px] px-6 py-2 rounded-xl duo-btn-primary text-xs font-extrabold cursor-pointer"
              >
                Cerrar Logros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED FULL-SCREEN EMOTES MODAL */}
      {showEmotesModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A3323]/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="emotes-modal-title"
        >
          <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-gradient-to-br from-[#F8FBCA] via-[#F9D6D5] to-[#F1D7FF] rounded-3xl border-3 border-[#0A3323] border-b-8 p-5 sm:p-6 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between gap-4 pb-3 border-b-2 border-[#0A3323]/20">
              <div className="flex items-center gap-3">
                <BloomMascot
                  size="md"
                  plumage={plumage}
                  previewSkin={equippedSkin}
                  shirtColor={shirtColor}
                  hoodieVariant={hoodieVariant}
                  jacketVariant={jacketVariant}
                  armorVariant={armorVariant}
                  emote={activeEmote !== 'none' ? activeEmote : 'six_seven'}
                />
                <h3
                  id="emotes-modal-title"
                  className="text-lg sm:text-xl font-semibold text-[#0A3323] font-display"
                >
                  Emotes
                </h3>
              </div>
              <button
                onClick={() => setShowEmotesModal(false)}
                className="min-h-[44px] min-w-[44px] rounded-xl bg-[#F8FBCA] border-2 border-[#0A3323] flex items-center justify-center text-[#0A3323] hover:bg-[#F6C8C7] cursor-pointer shrink-0"
                aria-label="Cerrar emotes"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <BloomEmotesStudio
              compact={false}
              plumage={plumage}
              equippedSkin={equippedSkin}
              shirtColor={shirtColor}
              hoodieVariant={hoodieVariant}
              jacketVariant={jacketVariant}
              armorVariant={armorVariant}
              activeEmote={activeEmote}
              onSelectActiveEmote={setActiveEmote}
              completedLessonsCount={completedLessonKeys.length}
              onGoToNextLesson={handleGoToNextUncompletedLesson}
            />

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowEmotesModal(false)}
                className="min-h-[44px] px-6 py-2 rounded-xl duo-btn-primary text-xs font-extrabold cursor-pointer"
              >
                Cerrar Emotes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED ONLINE USER LOGIN & COMMUNITY PROGRESS MODAL */}
      {showOnlineCommunityModal && (
        <BloomOnlineCommunityModal
          currentUser={onlineUser}
          onAuthSuccess={(loggedInMember) => {
            setOnlineUser(loggedInMember);
            localStorage.setItem('cb_online_user_v1', JSON.stringify(loggedInMember));
            if (
              Array.isArray(loggedInMember.completedLessonKeys) &&
              loggedInMember.completedLessonKeys.length > completedLessonKeys.length
            ) {
              setCompletedLessonKeys(loggedInMember.completedLessonKeys);
            }
          }}
          onLogout={() => {
            setOnlineUser(null);
            localStorage.removeItem('cb_online_user_v1');
          }}
          localProgress={{
            completedLessonsCount: completedLessonKeys.length,
            completedLessonKeys,
            completedBiomeIds,
            currentBiomeId: nextRecommendedTopic.id,
            currentBiomeName: nextRecommendedTopic.biomeName,
            streakDays,
            resilienceXP,
            protectedCapitalMXN,
            achievementsCount: unlockedAchievementsCount,
            plumage,
            equippedSkin,
            shirtColor,
            hoodieVariant,
            jacketVariant,
            armorVariant,
            activeEmote,
          }}
          onGoToNextLesson={handleGoToNextUncompletedLesson}
          onClose={() => setShowOnlineCommunityModal(false)}
        />
      )}

      {/* DEDICATED ONLINE MINIGAMES MODAL (SHORT 30S GAMES GATED BY FINANCE QUESTIONS) */}
      {showOnlineMinigamesModal && (
        <BloomOnlineMinigamesModal
          currentUser={onlineUser}
          plumage={plumage}
          equippedSkin={equippedSkin}
          shirtColor={shirtColor}
          hoodieVariant={hoodieVariant}
          jacketVariant={jacketVariant}
          armorVariant={armorVariant}
          activeEmote={activeEmote}
          onEarnMinigameReward={(xp, savedMXN) => {
            setResilienceXP((prev) => prev + xp);
            setProtectedCapitalMXN((prev) => prev + savedMXN);
          }}
          onOpenLoginModal={() => {
            setShowOnlineMinigamesModal(false);
            setShowOnlineCommunityModal(true);
          }}
          onClose={() => setShowOnlineMinigamesModal(false)}
        />
      )}

      <OfflineIndicator />
    </div>
  );
}
