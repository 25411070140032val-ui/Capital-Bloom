import React from 'react';
import { Sparkles, Trees, Clock, Compass } from 'lucide-react';
import { BloomMascot, PlumageTheme } from './BloomMascot';
import { BiomeScenicBackground } from './BiomeScenicBackground';

export interface UniqueBiomeDesign {
  topicId: number;
  biomeTitle: string;
  climateTag: string;
  floraFaunaTag: string;
  bitacoraParticularidad: string;
  bannerBg: string;
  bannerBorder: string;
  bannerScrim: string;
  kickerStyle: string;
  badgeStyle: string;
  ctaStyle: string;
  pathBgGradient: string;
  pathBorder: string;
  subBarStyle: string;
  miniBarStyle: string;
  trailBorderColor: string;
  primaryWaveHex: string;
  secondaryWaveHex: string;
  accentHex: string;
  particlePrimary: string;
  particleSecondary: string;
  cardSurface: string;
}

export const BIOME_UNIQUE_DESIGNS: Record<number, UniqueBiomeDesign> = {
  1: {
    topicId: 1,
    biomeTitle: 'Selva Tropical Seca · Cacao y Ceibas',
    climateTag: 'Estación Seca Dorada · Raíces Profundas',
    floraFaunaTag: 'Ceibas Milenarias, Árboles de Cacao y Hojarasca Ámbar',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Ecosistema estacional de corteza dorada donde las Ceibas almacenan agua en sus raíces profundas y el Cacao histórico simboliza el origen del trueque y el valor real del trabajo.',
    bannerBg: 'bg-[#3D2618]',
    bannerBorder: 'border-[#839958]',
    bannerScrim: 'from-[#2B1B10]/85 via-[#5C3A21]/55 to-transparent',
    kickerStyle: 'bg-[#F8FBCA] text-[#2B1B10] border-[#839958]',
    badgeStyle: 'bg-[#839958] border-[#F8FBCA] text-[#0A3323]',
    ctaStyle: 'bg-[#F8FBCA] text-[#0A3323] hover:bg-[#F7FAD5] border-[#839958]',
    pathBgGradient: 'from-[#3D2618] via-[#5C3A21] to-[#3A2518]',
    pathBorder: 'border-[#839958]',
    subBarStyle: 'bg-gradient-to-r from-[#2B1B10] via-[#5C3A21] to-[#839958] text-[#F8FBCA] border-[#839958]',
    miniBarStyle: 'bg-[#F8FBCA]/95 border-[#5C3A21]',
    trailBorderColor: 'border-[#F8FBCA]',
    primaryWaveHex: '#839958',
    secondaryWaveHex: '#D3968C',
    accentHex: '#F8FBCA',
    particlePrimary: '#F8FBCA',
    particleSecondary: '#F6C8C7',
    cardSurface: 'bg-gradient-to-b from-[#F8FBCA] to-[#EEDC9A]/70 border-[#5C3A21]',
  },
  2: {
    topicId: 2,
    biomeTitle: 'Selva Tropical Húmeda · Cascadas y Dosel',
    climateTag: 'Lluvia Perenne · Bio-Abundancia',
    floraFaunaTag: 'Doble Cascada Turquesa, Lianas, Monstera y Orquídeas',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Selva siempreverde de alta precipitación con cascadas gemelas, lianas colgantes y orquídeas epífitas; enseña a filtrar el exceso de estímulos y frenar el gasto impulsivo.',
    bannerBg: 'bg-[#072E22]',
    bannerBorder: 'border-[#2F7D5B]',
    bannerScrim: 'from-[#06261C]/85 via-[#145A3A]/50 to-transparent',
    kickerStyle: 'bg-[#E0B0FF] text-[#0A3323] border-[#F8FBCA]',
    badgeStyle: 'bg-[#2F7D5B] border-[#F8FBCA] text-[#F8FBCA]',
    ctaStyle: 'bg-[#F8FBCA] text-[#0A3323] hover:bg-[#E0B0FF] border-[#2F7D5B]',
    pathBgGradient: 'from-[#062B1F] via-[#0F5238] to-[#083024]',
    pathBorder: 'border-[#2F7D5B]',
    subBarStyle: 'bg-gradient-to-r from-[#072E22] via-[#145A3A] to-[#105666] text-[#F8FBCA] border-[#2F7D5B]',
    miniBarStyle: 'bg-[#F8FBCA]/95 border-[#145A3A]',
    trailBorderColor: 'border-[#BAE8E8]',
    primaryWaveHex: '#2F7D5B',
    secondaryWaveHex: '#105666',
    accentHex: '#E0B0FF',
    particlePrimary: '#F8FBCA',
    particleSecondary: '#E0B0FF',
    cardSurface: 'bg-gradient-to-b from-[#E4F7E9] to-[#2F7D5B]/35 border-[#145A3A]',
  },
  3: {
    topicId: 3,
    biomeTitle: 'Bosque Templado de Pino · Agujas Azules',
    climateTag: 'Niebla Matutina · Claridad de Metas',
    floraFaunaTag: 'Pinos Rectos de Montaña y Rayos de Sol entre Niebla',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Pinares de crecimiento vertical que buscan la luz solar con precisión; sus troncos rectos y haces de luz representan metas SMART con monto, fecha y ruta clara.',
    bannerBg: 'bg-[#0D3B47]',
    bannerBorder: 'border-[#7285A5]',
    bannerScrim: 'from-[#092C36]/85 via-[#105666]/55 to-transparent',
    kickerStyle: 'bg-[#F7FAD5] text-[#0D3B47] border-[#7285A5]',
    badgeStyle: 'bg-[#105666] border-[#F7FAD5] text-[#F7FAD5]',
    ctaStyle: 'bg-[#F7FAD5] text-[#0D3B47] hover:bg-[#F8FBCA] border-[#7285A5]',
    pathBgGradient: 'from-[#0C2D3A] via-[#174E5F] to-[#0D313A]',
    pathBorder: 'border-[#7285A5]',
    subBarStyle: 'bg-gradient-to-r from-[#092C36] via-[#105666] to-[#7285A5] text-[#F7FAD5] border-[#7285A5]',
    miniBarStyle: 'bg-[#F7FAD5]/95 border-[#105666]',
    trailBorderColor: 'border-[#F7FAD5]',
    primaryWaveHex: '#105666',
    secondaryWaveHex: '#7285A5',
    accentHex: '#F7FAD5',
    particlePrimary: '#F7FAD5',
    particleSecondary: '#839958',
    cardSurface: 'bg-gradient-to-b from-[#EBF5F8] to-[#7285A5]/40 border-[#105666]',
  },
  4: {
    topicId: 4,
    biomeTitle: 'Bosque Templado de Encino · Robledal Ámbar',
    climateTag: 'Suelo de Hojarasca · Presupuesto Equilibrado',
    floraFaunaTag: 'Encinos Centenarios de Copa Ancha, Bellotas y Hongos',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Robledal caducifolio de copas frondosas en tonos ocre, terracota y olivo que recicla cada hoja caída en su suelo fértil, igual que el presupuesto 50/30/20 distribuye cada peso.',
    bannerBg: 'bg-[#2C3E24]',
    bannerBorder: 'border-[#D3968C]',
    bannerScrim: 'from-[#1F2E19]/85 via-[#4A5D32]/55 to-transparent',
    kickerStyle: 'bg-[#F9D6D5] text-[#1F2E19] border-[#D3968C]',
    badgeStyle: 'bg-[#839958] border-[#F9D6D5] text-[#0A3323]',
    ctaStyle: 'bg-[#F9D6D5] text-[#0A3323] hover:bg-[#F8FBCA] border-[#839958]',
    pathBgGradient: 'from-[#2A361E] via-[#4A5D32] to-[#3B281E]',
    pathBorder: 'border-[#D3968C]',
    subBarStyle: 'bg-gradient-to-r from-[#1F2E19] via-[#4A5D32] to-[#8F6277] text-[#F8FBCA] border-[#D3968C]',
    miniBarStyle: 'bg-[#F8FBCA]/95 border-[#4A5D32]',
    trailBorderColor: 'border-[#F9D6D5]',
    primaryWaveHex: '#839958',
    secondaryWaveHex: '#D3968C',
    accentHex: '#F9D6D5',
    particlePrimary: '#F9D6D5',
    particleSecondary: '#F8FBCA',
    cardSurface: 'bg-gradient-to-b from-[#F8FBCA] to-[#D3968C]/40 border-[#4A5D32]',
  },
  5: {
    topicId: 5,
    biomeTitle: 'Bosque de Oyamel · Santuario Monarca',
    climateTag: 'Microclima Térmico · Fondo de Emergencia',
    floraFaunaTag: 'Abetos Sagrados de Oyamel y Racimos de Mariposa Monarca',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Bosque de altura cuyas ramas densas de oyamel crean un escudo térmico que protege a millones de mariposas Monarca de las heladas, reflejando el Fondo de Emergencia.',
    bannerBg: 'bg-[#231942]',
    bannerBorder: 'border-[#F6C8C7]',
    bannerScrim: 'from-[#17112B]/85 via-[#5E3A73]/55 to-transparent',
    kickerStyle: 'bg-[#F6C8C7] text-[#17112B] border-[#F8FBCA]',
    badgeStyle: 'bg-[#734A91] border-[#F6C8C7] text-[#F8FBCA]',
    ctaStyle: 'bg-[#F6C8C7] text-[#0A3323] hover:bg-[#F8FBCA] border-[#734A91]',
    pathBgGradient: 'from-[#1E1638] via-[#432B59] to-[#134632]',
    pathBorder: 'border-[#F6C8C7]',
    subBarStyle: 'bg-gradient-to-r from-[#17112B] via-[#734A91] to-[#2F7D5B] text-[#F8FBCA] border-[#F6C8C7]',
    miniBarStyle: 'bg-[#F1D7FF]/95 border-[#734A91]',
    trailBorderColor: 'border-[#F6C8C7]',
    primaryWaveHex: '#2F7D5B',
    secondaryWaveHex: '#734A91',
    accentHex: '#F6C8C7',
    particlePrimary: '#F6C8C7',
    particleSecondary: '#F8FBCA',
    cardSurface: 'bg-gradient-to-b from-[#F9D6D5] to-[#E0B0FF]/55 border-[#734A91]',
  },
  6: {
    topicId: 6,
    biomeTitle: 'Bosque de Coníferas · Río Turquesa',
    climateTag: 'Cauce Cristalino · Liquidez y Seguridad Bancaria',
    floraFaunaTag: 'Coníferas Boreales, Cantos Rodados y Río de Deshielo',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Valle de coníferas atravesado por un río turquesa encauzado por rocas firmes; simboliza cuentas de débito reguladas donde tu liquidez fluye segura sin desbordarse.',
    bannerBg: 'bg-[#083A47]',
    bannerBorder: 'border-[#839958]',
    bannerScrim: 'from-[#062933]/85 via-[#105666]/55 to-transparent',
    kickerStyle: 'bg-[#F8FBCA] text-[#062933] border-[#2F7D5B]',
    badgeStyle: 'bg-[#105666] border-[#F8FBCA] text-[#F8FBCA]',
    ctaStyle: 'bg-[#F8FBCA] text-[#062933] hover:bg-[#F7FAD5] border-[#105666]',
    pathBgGradient: 'from-[#072B36] via-[#105666] to-[#124E3F]',
    pathBorder: 'border-[#BAE8E8]',
    subBarStyle: 'bg-gradient-to-r from-[#062933] via-[#105666] to-[#2F7D5B] text-[#F8FBCA] border-[#BAE8E8]',
    miniBarStyle: 'bg-[#F7FAD5]/95 border-[#105666]',
    trailBorderColor: 'border-[#BAE8E8]',
    primaryWaveHex: '#105666',
    secondaryWaveHex: '#2F7D5B',
    accentHex: '#F8FBCA',
    particlePrimary: '#F8FBCA',
    particleSecondary: '#BAE8E8',
    cardSurface: 'bg-gradient-to-b from-[#E3F6F5] to-[#105666]/30 border-[#105666]',
  },
  7: {
    topicId: 7,
    biomeTitle: 'Bosque Mesófilo · Niebla de Montaña',
    climateTag: 'Nubes entre Helechos · Visión Totalera',
    floraFaunaTag: 'Helechos Arborescentes Gigantes, Bromelias y Bancos de Niebla',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Bosque de niebla con helechos arborescentes milenarios y bromelias; enseña a despejar la neblina de las fechas de corte, pago mínimo y CAT en tarjetas de crédito.',
    bannerBg: 'bg-[#16263E]',
    bannerBorder: 'border-[#A87BC7]',
    bannerScrim: 'from-[#101C2E]/85 via-[#2F525A]/55 to-transparent',
    kickerStyle: 'bg-[#E0B0FF] text-[#101C2E] border-[#839958]',
    badgeStyle: 'bg-[#2F7D5B] border-[#E0B0FF] text-[#F8FBCA]',
    ctaStyle: 'bg-[#E0B0FF] text-[#101C2E] hover:bg-[#F8FBCA] border-[#734A91]',
    pathBgGradient: 'from-[#132238] via-[#274B59] to-[#1B3F36]',
    pathBorder: 'border-[#E0B0FF]',
    subBarStyle: 'bg-gradient-to-r from-[#101C2E] via-[#105666] to-[#734A91] text-[#F1D7FF] border-[#E0B0FF]',
    miniBarStyle: 'bg-[#F1D7FF]/95 border-[#1D2951]',
    trailBorderColor: 'border-[#E0B0FF]',
    primaryWaveHex: '#2F7D5B',
    secondaryWaveHex: '#7285A5',
    accentHex: '#E0B0FF',
    particlePrimary: '#E0B0FF',
    particleSecondary: '#F8FBCA',
    cardSurface: 'bg-gradient-to-b from-[#F1D7FF]/85 to-[#7285A5]/40 border-[#1D2951]',
  },
  8: {
    topicId: 8,
    biomeTitle: 'Desierto de Salares · Espejo Cristalino',
    climateTag: 'Reflejo Salino · Ciberseguridad y Transparencia',
    floraFaunaTag: 'Costras Hexagonales de Sal, Laguna Espejo y Cielo Rosado',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Llanura de salares geométricos con lagunas espejo que reflejan el cielo; advierte sobre espejismos digitales (phishing y fraudes) frente a la transparencia real.',
    bannerBg: 'bg-[#59344F]',
    bannerBorder: 'border-[#F6C8C7]',
    bannerScrim: 'from-[#3D2236]/85 via-[#8F6277]/55 to-transparent',
    kickerStyle: 'bg-[#F9D6D5] text-[#3D2236] border-[#F8FBCA]',
    badgeStyle: 'bg-[#8F6277] border-[#F9D6D5] text-[#F9D6D5]',
    ctaStyle: 'bg-[#F9D6D5] text-[#3D2236] hover:bg-[#F8FBCA] border-[#8F6277]',
    pathBgGradient: 'from-[#4A2545] via-[#8F6277] to-[#2B586E]',
    pathBorder: 'border-[#F9D6D5]',
    subBarStyle: 'bg-gradient-to-r from-[#3D2236] via-[#8F6277] to-[#105666] text-[#F9D6D5] border-[#F9D6D5]',
    miniBarStyle: 'bg-[#F9D6D5]/95 border-[#8F6277]',
    trailBorderColor: 'border-[#F9D6D5]',
    primaryWaveHex: '#8F6277',
    secondaryWaveHex: '#105666',
    accentHex: '#F9D6D5',
    particlePrimary: '#F8FBCA',
    particleSecondary: '#E0B0FF',
    cardSurface: 'bg-gradient-to-b from-[#F9D6D5] to-[#F1D7FF]/65 border-[#8F6277]',
  },
  9: {
    topicId: 9,
    biomeTitle: 'Desierto Rocoso Hamada · Cañón Rojo',
    climateTag: 'Estratos de Arenisca · Erosión Inflacionaria vs. Interés',
    floraFaunaTag: 'Mesetas Rojas Escalonadas, Arco de Piedra y Cactáceas',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Mesetas rocosas Hamada y arcos de arenisca roja tallados siglo tras siglo; muestra cómo la inflación erosiona el efectivo suelto mientras el interés compuesto construye roca.',
    bannerBg: 'bg-[#5E2C25]',
    bannerBorder: 'border-[#D3968C]',
    bannerScrim: 'from-[#421D18]/85 via-[#8F4B3E]/55 to-transparent',
    kickerStyle: 'bg-[#F8FBCA] text-[#421D18] border-[#D3968C]',
    badgeStyle: 'bg-[#BA7B7C] border-[#F8FBCA] text-[#F8FBCA]',
    ctaStyle: 'bg-[#F8FBCA] text-[#421D18] hover:bg-[#F9D6D5] border-[#BA7B7C]',
    pathBgGradient: 'from-[#4A1C17] via-[#8F4B3E] to-[#6E2F23]',
    pathBorder: 'border-[#D3968C]',
    subBarStyle: 'bg-gradient-to-r from-[#421D18] via-[#8F4B3E] to-[#BA7B7C] text-[#F8FBCA] border-[#D3968C]',
    miniBarStyle: 'bg-[#F9D6D5]/95 border-[#8F4B3E]',
    trailBorderColor: 'border-[#F8FBCA]',
    primaryWaveHex: '#BA7B7C',
    secondaryWaveHex: '#D3968C',
    accentHex: '#F8FBCA',
    particlePrimary: '#F8FBCA',
    particleSecondary: '#F6C8C7',
    cardSurface: 'bg-gradient-to-b from-[#F9D6D5] to-[#D3968C]/55 border-[#8F4B3E]',
  },
  10: {
    topicId: 10,
    biomeTitle: 'Desierto con Oasis · Laguna de Palmas',
    climateTag: 'Manantial Subterráneo · Renta Fija y CETES',
    floraFaunaTag: 'Dunas Doradas, Manantial Turquesa y Palmeras Datileras',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Oasis alimentado por un acuífero profundo en medio de dunas doradas con palmeras datileras; representa rendimientos constantes y seguros en CETES y renta fija.',
    bannerBg: 'bg-[#104547]',
    bannerBorder: 'border-[#F8FBCA]',
    bannerScrim: 'from-[#0A2E36]/85 via-[#105666]/55 to-transparent',
    kickerStyle: 'bg-[#F8FBCA] text-[#0A2E36] border-[#2F7D5B]',
    badgeStyle: 'bg-[#2F7D5B] border-[#F8FBCA] text-[#F8FBCA]',
    ctaStyle: 'bg-[#F8FBCA] text-[#0A3323] hover:bg-[#F7FAD5] border-[#2F7D5B]',
    pathBgGradient: 'from-[#0D3B3E] via-[#1B6B63] to-[#9E6B43]',
    pathBorder: 'border-[#F8FBCA]',
    subBarStyle: 'bg-gradient-to-r from-[#0A2E36] via-[#105666] to-[#839958] text-[#F8FBCA] border-[#F8FBCA]',
    miniBarStyle: 'bg-[#F8FBCA]/95 border-[#105666]',
    trailBorderColor: 'border-[#F8FBCA]',
    primaryWaveHex: '#105666',
    secondaryWaveHex: '#D3968C',
    accentHex: '#2F7D5B',
    particlePrimary: '#F8FBCA',
    particleSecondary: '#F6C8C7',
    cardSurface: 'bg-gradient-to-b from-[#F8FBCA] to-[#105666]/30 border-[#105666]',
  },
  11: {
    topicId: 11,
    biomeTitle: 'Montaña · Cordillera y Pasos de Alta Montaña',
    climateTag: 'Vientos de Cordillera · Macroeconomía y Comercio Global',
    floraFaunaTag: 'Picos Nevados de la Sierra, Sendero de Paso y Águila Real',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Grandes cordilleras con pasos de montaña que conectan regiones lejanas bajo el vuelo del Águila Real; ilustra cadenas de suministro, divisas, aranceles y T-MEC.',
    bannerBg: 'bg-[#111E6C]',
    bannerBorder: 'border-[#E0B0FF]',
    bannerScrim: 'from-[#0B144A]/85 via-[#1D2951]/55 to-transparent',
    kickerStyle: 'bg-[#F8FBCA] text-[#111E6C] border-[#7285A5]',
    badgeStyle: 'bg-[#1D2951] border-[#F8FBCA] text-[#F8FBCA]',
    ctaStyle: 'bg-[#F8FBCA] text-[#111E6C] hover:bg-[#E0B0FF] border-[#1D2951]',
    pathBgGradient: 'from-[#0B1536] via-[#1D2951] to-[#3B4E7A]',
    pathBorder: 'border-[#E0B0FF]',
    subBarStyle: 'bg-gradient-to-r from-[#0B144A] via-[#111E6C] to-[#7285A5] text-[#F8FBCA] border-[#E0B0FF]',
    miniBarStyle: 'bg-[#F1D7FF]/95 border-[#111E6C]',
    trailBorderColor: 'border-[#F8FBCA]',
    primaryWaveHex: '#1D2951',
    secondaryWaveHex: '#7285A5',
    accentHex: '#F8FBCA',
    particlePrimary: '#F8FBCA',
    particleSecondary: '#E0B0FF',
    cardSurface: 'bg-gradient-to-b from-[#EBF0FF] to-[#7285A5]/40 border-[#111E6C]',
  },
  12: {
    topicId: 12,
    biomeTitle: 'Montaña · Alta Cumbre Rocosa y Glaciar Alpino',
    climateTag: 'Alpenglow de Granito · Bolsa, ETFs y Largo Plazo',
    floraFaunaTag: 'Agujas de Granito Rosado, Glaciar Alpino y Constelación Bursátil',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Cumbres de granito iluminadas por el alpenglow y glaciares eternos bajo una constelación ascendente; enseña paciencia e inversión diversificada en ETFs.',
    bannerBg: 'bg-[#3B1E54]',
    bannerBorder: 'border-[#F6C8C7]',
    bannerScrim: 'from-[#261138]/85 via-[#734A91]/55 to-transparent',
    kickerStyle: 'bg-[#F1D7FF] text-[#261138] border-[#F6C8C7]',
    badgeStyle: 'bg-[#734A91] border-[#F6C8C7] text-[#F1D7FF]',
    ctaStyle: 'bg-[#F1D7FF] text-[#261138] hover:bg-[#F8FBCA] border-[#734A91]',
    pathBgGradient: 'from-[#231138] via-[#5E377A] to-[#8F5368]',
    pathBorder: 'border-[#F6C8C7]',
    subBarStyle: 'bg-gradient-to-r from-[#261138] via-[#734A91] to-[#8F6277] text-[#F1D7FF] border-[#F6C8C7]',
    miniBarStyle: 'bg-[#F1D7FF]/95 border-[#734A91]',
    trailBorderColor: 'border-[#F6C8C7]',
    primaryWaveHex: '#734A91',
    secondaryWaveHex: '#BA7B7C',
    accentHex: '#F1D7FF',
    particlePrimary: '#F1D7FF',
    particleSecondary: '#F6C8C7',
    cardSurface: 'bg-gradient-to-b from-[#F1D7FF] to-[#F6C8C7]/60 border-[#734A91]',
  },
  13: {
    topicId: 13,
    biomeTitle: 'Páramo · Alta Montaña sobre el Límite del Bosque',
    climateTag: 'Lagunas Glaciales · Cobertura en UDIs y Divisas',
    floraFaunaTag: 'Rosetas de Frailejones (Espeletia) y Lagunas de Páramo',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Ecosistema esponja de alta montaña donde los Frailejones aterciopelados capturan agua de la niebla; representa blindar el poder adquisitivo en UDIs y múltiples monedas.',
    bannerBg: 'bg-[#143642]',
    bannerBorder: 'border-[#E0B0FF]',
    bannerScrim: 'from-[#0D242C]/85 via-[#105666]/55 to-transparent',
    kickerStyle: 'bg-[#F8FBCA] text-[#0D242C] border-[#839958]',
    badgeStyle: 'bg-[#105666] border-[#E0B0FF] text-[#F8FBCA]',
    ctaStyle: 'bg-[#F8FBCA] text-[#0D242C] hover:bg-[#F1D7FF] border-[#105666]',
    pathBgGradient: 'from-[#0E2A34] via-[#1C5560] to-[#2F593E]',
    pathBorder: 'border-[#F8FBCA]',
    subBarStyle: 'bg-gradient-to-r from-[#0D242C] via-[#105666] to-[#734A91] text-[#F8FBCA] border-[#F8FBCA]',
    miniBarStyle: 'bg-[#F7FAD5]/95 border-[#105666]',
    trailBorderColor: 'border-[#F8FBCA]',
    primaryWaveHex: '#105666',
    secondaryWaveHex: '#734A91',
    accentHex: '#839958',
    particlePrimary: '#F8FBCA',
    particleSecondary: '#E0B0FF',
    cardSurface: 'bg-gradient-to-b from-[#F7FAD5] to-[#E0B0FF]/55 border-[#105666]',
  },
  14: {
    topicId: 14,
    biomeTitle: 'Páramo · Superpáramo Volcánico y Cumbre Estelar',
    climateTag: 'Aurora Austral · Pirámide Patrimonial e Impuestos',
    floraFaunaTag: 'Cumbres de Obsidiana, Lagunas de Cráter y Aurora Multicolor',
    bitacoraParticularidad:
      'Bitácora ExpoCiencias 2026: Cumbre volcánica de roca obsidiana sobre el mar de nubes iluminada por auroras; culmina la Pirámide de Activos combinando liquidez, renta fija, ETFs y cultura fiscal.',
    bannerBg: 'bg-[#0F1738]',
    bannerBorder: 'border-[#F8FBCA]',
    bannerScrim: 'from-[#080D24]/85 via-[#1D2951]/55 to-transparent',
    kickerStyle: 'bg-[#F8FBCA] text-[#0F1738] border-[#E0B0FF]',
    badgeStyle: 'bg-[#734A91] border-[#F8FBCA] text-[#F8FBCA]',
    ctaStyle: 'bg-[#F8FBCA] text-[#0F1738] hover:bg-[#E0B0FF] border-[#734A91]',
    pathBgGradient: 'from-[#080D24] via-[#1E1B4B] to-[#311042]',
    pathBorder: 'border-[#E0B0FF]',
    subBarStyle: 'bg-gradient-to-r from-[#080D24] via-[#734A91] to-[#2F7D5B] text-[#F8FBCA] border-[#E0B0FF]',
    miniBarStyle: 'bg-[#F8FBCA]/95 border-[#1D2951]',
    trailBorderColor: 'border-[#E0B0FF]',
    primaryWaveHex: '#734A91',
    secondaryWaveHex: '#2F7D5B',
    accentHex: '#F8FBCA',
    particlePrimary: '#F8FBCA',
    particleSecondary: '#E0B0FF',
    cardSurface: 'bg-gradient-to-b from-[#F1D7FF] to-[#F8FBCA]/85 border-[#1D2951]',
  },
};

export function getBiomeUniqueDesign(topicId: number): UniqueBiomeDesign {
  return BIOME_UNIQUE_DESIGNS[topicId] || BIOME_UNIQUE_DESIGNS[1];
}

interface AnimatedBiomeBannerProps {
  topicId: number;
  stage: 1 | 2;
  title: string;
  subtitle: string;
  biomeName: string;
  biomeFamily: 'tropical' | 'temperate' | 'desert' | 'paramo';
  imageUrl: string;
  completedLessonsCount: number;
  totalLessonsCount: number;
  plumage: PlumageTheme;
  onStartTopic: () => void;
  onSelectLesson?: (lessonNum: 1 | 2 | 3 | 4 | 5 | 6) => void;
  useSharedSectionBg?: boolean;
}

export const AnimatedBiomeBanner: React.FC<AnimatedBiomeBannerProps> = React.memo(({
  topicId,
  stage,
  title,
  subtitle,
  biomeFamily,
  completedLessonsCount,
  totalLessonsCount,
  plumage,
  onStartTopic,
  onSelectLesson,
  useSharedSectionBg = false,
}) => {
  const design = getBiomeUniqueDesign(topicId);

  const familyLabel =
    biomeFamily === 'tropical'
      ? '🌴 FAMILIA SELVA TROPICAL'
      : biomeFamily === 'temperate'
      ? '🌲 FAMILIA BOSQUE TEMPLADO'
      : biomeFamily === 'desert'
      ? '🏜️ FAMILIA DESIERTO'
      : '⛰️ FAMILIA MONTAÑA Y PÁRAMO';

  return (
    <div
      className={`relative rounded-t-[2rem] overflow-hidden border-b-2 ${design.bannerBorder} ${
        useSharedSectionBg ? 'bg-transparent' : design.bannerBg
      } text-white min-h-[265px] flex flex-col justify-between group`}
    >
      {/* Solo renderiza su propio fondo si no está integrado en el lienzo único de la sección */}
      {!useSharedSectionBg && <BiomeScenicBackground topicId={topicId} variant="banner" />}

      {/* Velo Gradual Suave para Legibilidad de Tipografía preservando la Imagen Única del Paisaje */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/15 pointer-events-none" />

      {/* BARRA SUPERIOR DE IDENTIDAD ECOLÓGICA DEL BIOMA */}
      <div className="relative z-10 px-5 pt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border-2 text-xs font-extrabold shadow-sm ${design.badgeStyle}`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>BIOMA {String(topicId).padStart(2, '0')}: {design.biomeTitle.toUpperCase()}</span>
          </span>

          <span className="px-3 py-1 rounded-full bg-black/65 border border-white/30 text-[10px] font-mono font-extrabold text-[#F8FBCA]">
            {familyLabel}
          </span>
        </div>

        <span className="px-3.5 py-1 rounded-full bg-black/75 border border-[#F8FBCA]/65 text-[11px] font-mono font-bold text-[#F8FBCA] flex items-center gap-1.5 tabular-nums">
          <Clock className="w-3.5 h-3.5 text-[#F8FBCA]" />
          <span>~5 min/lección · {completedLessonsCount}/{totalLessonsCount} completadas</span>
        </span>
      </div>

      {/* CONTENIDO PRINCIPAL: COLUMNA DE TEMA + FICHA DE PROGRESO DEL BIOMA (SIN DUPLICAR LA IMAGEN) */}
      <div className="relative z-10 p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
        {/* Columna Izquierda (7 cols): Título, Flora/Clima único y Bitácora 2026 */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-0.5 rounded-lg border text-xs font-mono font-extrabold tracking-wide shadow-2xs ${design.kickerStyle}`}
            >
              TEMA {String(topicId).padStart(2, '0')} · ETAPA {stage} · {design.climateTag}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-white font-display drop-shadow-md leading-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-[#F8FBCA] font-medium leading-relaxed drop-shadow-xs">
            {subtitle}
          </p>

          {/* Fichas de Particularidad Botánica/Geológica y Bitácora Oficial ExpoCiencias 2026 */}
          <div className="pt-1 space-y-2">
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-xl bg-black/60 border border-white/30 text-[11px] font-extrabold text-[#F8FBCA]">
              <span>🌿 Ecosistema y Flora:</span>
              <span className="text-white">{design.floraFaunaTag}</span>
            </div>

            <div className="flex items-start gap-2 px-3.5 py-2 rounded-2xl bg-black/70 border border-[#F8FBCA]/50 text-[11px] text-[#F8FBCA] leading-snug shadow-sm">
              <Compass className="w-4 h-4 text-[#F8FBCA] shrink-0 mt-0.5" />
              <span>{design.bitacoraParticularidad}</span>
            </div>
          </div>
        </div>

        {/* Columna Derecha (5 cols): Insignia del Hábitat + Mascota + Barra de 6 Lecciones + CTA */}
        <div className="lg:col-span-5 flex flex-col justify-end">
          <div className="p-3.5 rounded-2xl bg-black/70 border-2 border-[#F8FBCA]/65 shadow-lg space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center shrink-0 shadow-md ${design.badgeStyle}`}
                >
                  <Trees className="w-5 h-5" />
                  <span className="text-[10px] font-mono font-extrabold leading-none mt-0.5">
                    B{String(topicId).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-extrabold text-[#F6C8C7] uppercase">
                    HÁBITAT #{String(topicId).padStart(2, '0')}
                  </p>
                  <p className="text-xs font-extrabold text-white leading-tight">
                    {design.biomeTitle}
                  </p>
                  <p className="text-[10px] text-[#F8FBCA]/90 font-medium mt-0.5">
                    6 Lecciones · 1 tema por lección
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <BloomMascot staticMascot={true} mood="happy" size="sm" plumage={plumage} />
              </div>
            </div>

            {/* Barra Visual Interactiva de las 6 Lecciones del Bioma */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono font-extrabold text-[#F8FBCA]">
                <span>ABRIR LECCIÓN DIRECTA (L1–L6):</span>
                <span>{Math.round((completedLessonsCount / totalLessonsCount) * 100)}%</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {([1, 2, 3, 4, 5, 6] as const).map((lessonNum, idx) => {
                  const isDone = idx < completedLessonsCount;
                  return (
                    <button
                      key={lessonNum}
                      type="button"
                      onClick={() => {
                        if (onSelectLesson) {
                          onSelectLesson(lessonNum);
                        } else {
                          onStartTopic();
                        }
                      }}
                      title={`Abrir Lección ${lessonNum} del Bioma ${topicId}`}
                      className={`py-1 rounded-lg border text-[10px] font-mono font-extrabold transition-all cursor-pointer ${
                        isDone
                          ? 'bg-[#839958] text-[#0A3323] border-[#F8FBCA] hover:bg-[#F8FBCA]'
                          : 'bg-white/15 text-[#F8FBCA] border-white/40 hover:bg-white/30'
                      }`}
                    >
                      L{lessonNum}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={onStartTopic}
              className={`w-full min-h-[42px] px-4 py-2 rounded-xl border-2 border-b-4 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-transform active:translate-y-0.5 cursor-pointer shadow-md ${design.ctaStyle}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explorar las 6 Lecciones de este Bioma</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});


