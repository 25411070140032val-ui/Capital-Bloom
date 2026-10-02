import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export type PlumageTheme = 'emerald' | 'orchid' | 'oasis' | 'desert';

export type BloomMood = 'still' | 'happy' | 'celebrating' | 'thinking' | 'encouraging';

export type EquippedSkinId =
  | 'none'
  | 'shirt'
  | 'executive_suit'
  | 'hoodie'
  | 'elote_poncho'
  | 'astral_jacket'
  | 'samurai_armor'
  | 'diamond_armor';

export type CasualShirtColor =
  | 'black'
  | 'magenta'
  | 'aqua'
  | 'white'
  | 'gold_elote'
  | 'emerald_jade';

export type ExecutiveSuitVariant =
  | 'wall_street_navy'
  | 'obsidian_gold'
  | 'emerald_tycoon'
  | 'crimson_boss';

export type HoodieVariant =
  | 'cyber_quetzal'
  | 'nebula_split'
  | 'solar_obsidian'
  | 'arctic_holo';

export type ElotePonchoVariant =
  | 'golden_maize'
  | 'oaxaca_fiesta'
  | 'obsidian_sun'
  | 'sierra_azul';

export type JacketVariant = 'aurora_gold' | 'crimson_summit' | 'emerald_guardian';

export type SamuraiArmorVariant =
  | 'imperial_jade'
  | 'shogun_crimson'
  | 'cyber_ronin'
  | 'solar_gold';

export type ArmorVariant = 'diamond' | 'emerald' | 'gold' | 'obsidian';

export type BloomEmoteId =
  | 'none'
  | 'six_seven'
  | 'elote_fiesta'
  | 'floss_dance'
  | 'griddy_step'
  | 'handsome_fox'
  | 'mariachi_zapateado'
  | 'phonk_face'
  | 'moonwalk_glide'
  | 'clown_dance'
  | 'russian_dance';

export interface BloomEmoteMeta {
  id: Exclude<BloomEmoteId, 'none'>;
  title: string;
  shortTitle: string;
  subtitle: string;
  audioTypeLabel: string;
  bpm: number;
  unlockLesson: number;
  orderLabel: string;
  accentHex: string;
  secondaryHex: string;
  cardGradient: string;
}

export const EMOTE_META: Record<Exclude<BloomEmoteId, 'none'>, BloomEmoteMeta> = {
  six_seven: {
    id: 'six_seven',
    title: 'Six Seven',
    shortTitle: 'Six Seven',
    subtitle: 'Balanza 6-7 en vivo',
    audioTypeLabel: '808 Bounce & Synth 6-7',
    bpm: 118,
    unlockLesson: 1,
    orderLabel: '1er Emote · Lección 1',
    accentHex: '#38BDF8',
    secondaryHex: '#FBBF24',
    cardGradient: 'from-[#0F172A] via-[#1E293B] to-[#0284C7]',
  },
  elote_fiesta: {
    id: 'elote_fiesta',
    title: 'Fiesta del Elote Dorado',
    shortTitle: 'Elote Dorado',
    subtitle: 'Cumbia con Elote Preparado y Oro',
    audioTypeLabel: 'Cumbia Marimba Dorada',
    bpm: 124,
    unlockLesson: 3,
    orderLabel: '2do Emote · Lección 3',
    accentHex: '#FACC15',
    secondaryHex: '#EF4444',
    cardGradient: 'from-[#422006] via-[#713F12] to-[#B45309]',
  },
  floss_dance: {
    id: 'floss_dance',
    title: 'Paso Floss',
    shortTitle: 'Paso Floss',
    subtitle: 'Swing de cadera en contrafase',
    audioTypeLabel: 'Electro-Funk Floss Synth',
    bpm: 128,
    unlockLesson: 4,
    orderLabel: '3er Emote · Lección 4',
    accentHex: '#34D399',
    secondaryHex: '#38BDF8',
    cardGradient: 'from-[#064E3B] via-[#0F766E] to-[#0284C7]',
  },
  griddy_step: {
    id: 'griddy_step',
    title: 'Paso Griddy',
    shortTitle: 'Paso Griddy',
    subtitle: 'Goggles con alas y taloneo viral',
    audioTypeLabel: 'Trap Bounce Flute Synth',
    bpm: 132,
    unlockLesson: 7,
    orderLabel: '4to Emote · Lección 7',
    accentHex: '#A855F7',
    secondaryHex: '#38BDF8',
    cardGradient: 'from-[#1E1B4B] via-[#312E81] to-[#6D28D9]',
  },
  handsome_fox: {
    id: 'handsome_fox',
    title: 'Zorro Guapo',
    shortTitle: 'Zorro Guapo',
    subtitle: 'Batalla de Aura +999K',
    audioTypeLabel: 'Aura Groove Synth',
    bpm: 120,
    unlockLesson: 9,
    orderLabel: '5to Emote · Lección 9',
    accentHex: '#F59E0B',
    secondaryHex: '#38BDF8',
    cardGradient: 'from-[#0F172A] via-[#1E293B] to-[#B45309]',
  },
  mariachi_zapateado: {
    id: 'mariachi_zapateado',
    title: 'Mariachi Zapateado Real',
    shortTitle: 'Mariachi Real',
    subtitle: 'Sombrero de Charro y Lluvia de Oro',
    audioTypeLabel: 'Mariachi Trompeta Synth',
    bpm: 138,
    unlockLesson: 11,
    orderLabel: '6to Emote · Lección 11',
    accentHex: '#10B981',
    secondaryHex: '#FBBF24',
    cardGradient: 'from-[#064E3B] via-[#14532D] to-[#991B1B]',
  },
  phonk_face: {
    id: 'phonk_face',
    title: 'Cara Phonk',
    shortTitle: 'Cara Phonk',
    subtitle: 'Mirada láser Sigma Drift',
    audioTypeLabel: '808 Drift Cowbell Synth',
    bpm: 145,
    unlockLesson: 15,
    orderLabel: '7mo Emote · Lección 15',
    accentHex: '#E879F9',
    secondaryHex: '#22D3EE',
    cardGradient: 'from-[#1E1B4B] via-[#3B0764] to-[#701A75]',
  },
  moonwalk_glide: {
    id: 'moonwalk_glide',
    title: 'Moonwalk Astral',
    shortTitle: 'Moonwalk Astral',
    subtitle: 'Deslizamiento lunar con estela estelar',
    audioTypeLabel: 'Retro Synthwave Groove',
    bpm: 116,
    unlockLesson: 19,
    orderLabel: '8vo Emote · Lección 19',
    accentHex: '#38BDF8',
    secondaryHex: '#F472B6',
    cardGradient: 'from-[#090D16] via-[#1E1B4B] to-[#0284C7]',
  },
  clown_dance: {
    id: 'clown_dance',
    title: 'Payaso Bailarín',
    shortTitle: 'Payaso Bailarín',
    subtitle: 'Jig frenético de carnaval',
    audioTypeLabel: 'Carnival Jig Synth',
    bpm: 148,
    unlockLesson: 21,
    orderLabel: '9no Emote · Lección 21',
    accentHex: '#EF4444',
    secondaryHex: '#F97316',
    cardGradient: 'from-[#450A0A] via-[#1E1B4B] to-[#991B1B]',
  },
  russian_dance: {
    id: 'russian_dance',
    title: 'Baile Ruso',
    shortTitle: 'Baile Ruso',
    subtitle: 'Kazachok legendario con Ushanka',
    audioTypeLabel: 'Polka Folclórica Synth',
    bpm: 136,
    unlockLesson: 24,
    orderLabel: '10mo Emote · Lección 24',
    accentHex: '#F59E0B',
    secondaryHex: '#EF4444',
    cardGradient: 'from-[#450A0A] via-[#7F1D1D] to-[#B45309]',
  },
};

export interface BloomOutfitState {
  equippedSkin: EquippedSkinId;
  casualShirtEquipped: boolean;
  shirtColor: CasualShirtColor;
  executiveVariant: ExecutiveSuitVariant;
  hoodieVariant: HoodieVariant;
  elotePonchoVariant: ElotePonchoVariant;
  jacketVariant: JacketVariant;
  samuraiVariant: SamuraiArmorVariant;
  armorVariant: ArmorVariant;
  activeEmote: BloomEmoteId;
}

const OUTFIT_STORAGE_KEY = 'cb_bloom_outfit_v4';
const OUTFIT_EVENT_NAME = 'cb-bloom-outfit-change';

const VALID_SKINS: EquippedSkinId[] = [
  'none',
  'shirt',
  'executive_suit',
  'hoodie',
  'elote_poncho',
  'astral_jacket',
  'samurai_armor',
  'diamond_armor',
];

const VALID_EMOTES: BloomEmoteId[] = [
  'none',
  'six_seven',
  'elote_fiesta',
  'floss_dance',
  'griddy_step',
  'handsome_fox',
  'mariachi_zapateado',
  'phonk_face',
  'moonwalk_glide',
  'clown_dance',
  'russian_dance',
];

export function getSavedBloomOutfit(): BloomOutfitState {
  const defaultState: BloomOutfitState = {
    equippedSkin: 'none',
    casualShirtEquipped: false,
    shirtColor: 'black',
    executiveVariant: 'wall_street_navy',
    hoodieVariant: 'cyber_quetzal',
    elotePonchoVariant: 'golden_maize',
    jacketVariant: 'aurora_gold',
    samuraiVariant: 'imperial_jade',
    armorVariant: 'diamond',
    activeEmote: 'none',
  };

  if (typeof window === 'undefined') {
    return defaultState;
  }
  try {
    const raw = localStorage.getItem(OUTFIT_STORAGE_KEY);
    if (!raw) {
      return defaultState;
    }
    const parsed = JSON.parse(raw);
    const equippedSkin: EquippedSkinId = VALID_SKINS.includes(parsed.equippedSkin)
      ? parsed.equippedSkin
      : parsed.casualShirtEquipped
      ? 'shirt'
      : 'none';

    const activeEmote: BloomEmoteId = VALID_EMOTES.includes(parsed.activeEmote)
      ? parsed.activeEmote
      : 'none';

    return {
      equippedSkin,
      casualShirtEquipped: equippedSkin === 'shirt',
      shirtColor: [
        'black',
        'magenta',
        'aqua',
        'white',
        'gold_elote',
        'emerald_jade',
      ].includes(parsed.shirtColor)
        ? parsed.shirtColor
        : 'black',
      executiveVariant: [
        'wall_street_navy',
        'obsidian_gold',
        'emerald_tycoon',
        'crimson_boss',
      ].includes(parsed.executiveVariant)
        ? parsed.executiveVariant
        : 'wall_street_navy',
      hoodieVariant: [
        'cyber_quetzal',
        'nebula_split',
        'solar_obsidian',
        'arctic_holo',
      ].includes(parsed.hoodieVariant)
        ? parsed.hoodieVariant
        : 'cyber_quetzal',
      elotePonchoVariant: [
        'golden_maize',
        'oaxaca_fiesta',
        'obsidian_sun',
        'sierra_azul',
      ].includes(parsed.elotePonchoVariant)
        ? parsed.elotePonchoVariant
        : 'golden_maize',
      jacketVariant: ['aurora_gold', 'crimson_summit', 'emerald_guardian'].includes(
        parsed.jacketVariant
      )
        ? parsed.jacketVariant
        : 'aurora_gold',
      samuraiVariant: [
        'imperial_jade',
        'shogun_crimson',
        'cyber_ronin',
        'solar_gold',
      ].includes(parsed.samuraiVariant)
        ? parsed.samuraiVariant
        : 'imperial_jade',
      armorVariant: ['diamond', 'emerald', 'gold', 'obsidian'].includes(parsed.armorVariant)
        ? parsed.armorVariant
        : 'diamond',
      activeEmote,
    };
  } catch {
    return defaultState;
  }
}

export function saveBloomOutfit(next: Partial<BloomOutfitState>): void {
  if (typeof window === 'undefined') return;
  const current = getSavedBloomOutfit();
  const merged: BloomOutfitState = {
    ...current,
    ...next,
  };
  if (next.equippedSkin !== undefined) {
    merged.casualShirtEquipped = next.equippedSkin === 'shirt';
  } else if (next.casualShirtEquipped !== undefined) {
    merged.equippedSkin = next.casualShirtEquipped
      ? 'shirt'
      : current.equippedSkin === 'shirt'
      ? 'none'
      : current.equippedSkin;
  }
  localStorage.setItem(OUTFIT_STORAGE_KEY, JSON.stringify(merged));
  window.dispatchEvent(new CustomEvent(OUTFIT_EVENT_NAME, { detail: merged }));
}

interface BloomMascotProps {
  mood?: BloomMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  plumage?: PlumageTheme;
  staticMascot?: boolean;
  wearCasualShirt?: boolean;
  previewSkin?: EquippedSkinId;
  shirtColor?: CasualShirtColor;
  executiveVariant?: ExecutiveSuitVariant;
  hoodieVariant?: HoodieVariant;
  elotePonchoVariant?: ElotePonchoVariant;
  jacketVariant?: JacketVariant;
  samuraiVariant?: SamuraiArmorVariant;
  armorVariant?: ArmorVariant;
  emote?: BloomEmoteId;
}

const PLUMAGE_COLORS: Record<
  PlumageTheme,
  {
    body: string;
    bodyShade: string;
    wingTip: string;
    belly: string;
  }
> = {
  emerald: {
    body: '#2F7D5B',
    bodyShade: '#145A3A',
    wingTip: '#F1D7FF',
    belly: '#F7FAD5',
  },
  orchid: {
    body: '#734A91',
    bodyShade: '#1D2951',
    wingTip: '#F8FBCA',
    belly: '#F1D7FF',
  },
  oasis: {
    body: '#105666',
    bodyShade: '#0B3D2E',
    wingTip: '#F7FAD5',
    belly: '#F8FBCA',
  },
  desert: {
    body: '#8F6277',
    bodyShade: '#0A3323',
    wingTip: '#F7FAD5',
    belly: '#F9D6D5',
  },
};

export const SHIRT_COLOR_META: Record<
  CasualShirtColor,
  {
    id: CasualShirtColor;
    label: string;
    fill: string;
    collarFill: string;
    stroke: string;
    swatchHex: string;
  }
> = {
  black: {
    id: 'black',
    label: 'Negra (Base)',
    fill: '#181B20',
    collarFill: '#0D0F12',
    stroke: '#0A3323',
    swatchHex: '#181B20',
  },
  magenta: {
    id: 'magenta',
    label: 'Magenta',
    fill: '#D81B60',
    collarFill: '#AD1457',
    stroke: '#0A3323',
    swatchHex: '#D81B60',
  },
  aqua: {
    id: 'aqua',
    label: 'Azul Aqua',
    fill: '#00B4D8',
    collarFill: '#0088A9',
    stroke: '#0A3323',
    swatchHex: '#00B4D8',
  },
  white: {
    id: 'white',
    label: 'Blanco',
    fill: '#F8FAFC',
    collarFill: '#E2E8F0',
    stroke: '#0A3323',
    swatchHex: '#F8FAFC',
  },
  gold_elote: {
    id: 'gold_elote',
    label: 'Elote Dorado',
    fill: '#CA8A04',
    collarFill: '#854D0E',
    stroke: '#0A3323',
    swatchHex: '#FACC15',
  },
  emerald_jade: {
    id: 'emerald_jade',
    label: 'Jade Imperial',
    fill: '#047857',
    collarFill: '#064E3B',
    stroke: '#0A3323',
    swatchHex: '#10B981',
  },
};

export const EXECUTIVE_SUIT_VARIANT_META: Record<
  ExecutiveSuitVariant,
  {
    id: ExecutiveSuitVariant;
    label: string;
    jacketFill: string;
    lapelFill: string;
    tieFill: string;
    pocketSquareFill: string;
    glassesFrame: string;
    swatchHex: string;
  }
> = {
  wall_street_navy: {
    id: 'wall_street_navy',
    label: 'Azul Reforma',
    jacketFill: '#0F172A',
    lapelFill: '#1E293B',
    tieFill: '#EF4444',
    pocketSquareFill: '#FBBF24',
    glassesFrame: '#38BDF8',
    swatchHex: '#1E3A8A',
  },
  obsidian_gold: {
    id: 'obsidian_gold',
    label: 'Smoking Oro',
    jacketFill: '#18181B',
    lapelFill: '#27272A',
    tieFill: '#FACC15',
    pocketSquareFill: '#FEF08A',
    glassesFrame: '#F59E0B',
    swatchHex: '#FACC15',
  },
  emerald_tycoon: {
    id: 'emerald_tycoon',
    label: 'Magnate CETES',
    jacketFill: '#064E3B',
    lapelFill: '#047857',
    tieFill: '#FBBF24',
    pocketSquareFill: '#A7F3D0',
    glassesFrame: '#34D399',
    swatchHex: '#10B981',
  },
  crimson_boss: {
    id: 'crimson_boss',
    label: 'Vino Imperial',
    jacketFill: '#450A0A',
    lapelFill: '#7F1D1D',
    tieFill: '#FDE047',
    pocketSquareFill: '#FECDD3',
    glassesFrame: '#FB7185',
    swatchHex: '#991B1B',
  },
};

export const HOODIE_VARIANT_META: Record<
  HoodieVariant,
  {
    id: HoodieVariant;
    label: string;
    primaryFill: string;
    secondarySplitFill: string;
    hoodOuterFill: string;
    hoodLiningFill: string;
    pocketFill: string;
    neonAccent: string;
    cordColor: string;
    swatchHex: string;
  }
> = {
  cyber_quetzal: {
    id: 'cyber_quetzal',
    label: 'Cyber-Quetzal (Neón)',
    primaryFill: '#0F172A',
    secondarySplitFill: '#065F46',
    hoodOuterFill: '#111827',
    hoodLiningFill: '#10B981',
    pocketFill: '#1E293B',
    neonAccent: '#34D399',
    cordColor: '#FBBF24',
    swatchHex: '#10B981',
  },
  nebula_split: {
    id: 'nebula_split',
    label: 'Nebulosa Split (Bicolor)',
    primaryFill: '#2E1065',
    secondarySplitFill: '#0284C7',
    hoodOuterFill: '#3B0764',
    hoodLiningFill: '#38BDF8',
    pocketFill: '#1E1B4B',
    neonAccent: '#F472B6',
    cordColor: '#38BDF8',
    swatchHex: '#A855F7',
  },
  solar_obsidian: {
    id: 'solar_obsidian',
    label: 'Fuego Azteca (Ámbar)',
    primaryFill: '#18181B',
    secondarySplitFill: '#9F1239',
    hoodOuterFill: '#27272A',
    hoodLiningFill: '#FB923C',
    pocketFill: '#3F3F46',
    neonAccent: '#FBBF24',
    cordColor: '#FB7185',
    swatchHex: '#F97316',
  },
  arctic_holo: {
    id: 'arctic_holo',
    label: 'Glaciar Holo (Polar)',
    primaryFill: '#F1F5F9',
    secondarySplitFill: '#C7D2FE',
    hoodOuterFill: '#E2E8F0',
    hoodLiningFill: '#818CF8',
    pocketFill: '#CBD5E1',
    neonAccent: '#4F46E5',
    cordColor: '#EC4899',
    swatchHex: '#818CF8',
  },
};

export const ELOTE_PONCHO_VARIANT_META: Record<
  ElotePonchoVariant,
  {
    id: ElotePonchoVariant;
    label: string;
    ponchoPrimary: string;
    ponchoStripe: string;
    hatBrim: string;
    hatCrown: string;
    trimGold: string;
    swatchHex: string;
  }
> = {
  golden_maize: {
    id: 'golden_maize',
    label: 'Maíz Dorado y Jade',
    ponchoPrimary: '#92400E',
    ponchoStripe: '#10B981',
    hatBrim: '#78350F',
    hatCrown: '#F59E0B',
    trimGold: '#FEF08A',
    swatchHex: '#F59E0B',
  },
  oaxaca_fiesta: {
    id: 'oaxaca_fiesta',
    label: 'Rosa Mexicano Fiesta',
    ponchoPrimary: '#9D174D',
    ponchoStripe: '#06B6D4',
    hatBrim: '#831843',
    hatCrown: '#EC4899',
    trimGold: '#FDE047',
    swatchHex: '#EC4899',
  },
  obsidian_sun: {
    id: 'obsidian_sun',
    label: 'Sol de Obsidiana',
    ponchoPrimary: '#18181B',
    ponchoStripe: '#EF4444',
    hatBrim: '#0F172A',
    hatCrown: '#DC2626',
    trimGold: '#FACC15',
    swatchHex: '#EF4444',
  },
  sierra_azul: {
    id: 'sierra_azul',
    label: 'Añil de Alta Montaña',
    ponchoPrimary: '#1E3A8A',
    ponchoStripe: '#F59E0B',
    hatBrim: '#1E1B4B',
    hatCrown: '#0284C7',
    trimGold: '#FDE68A',
    swatchHex: '#0284C7',
  },
};

export const JACKET_VARIANT_META: Record<
  JacketVariant,
  {
    id: JacketVariant;
    label: string;
    bodyFill: string;
    chevronFill: string;
    collarFill: string;
    visorLens: string;
    visorFrame: string;
    swatchHex: string;
  }
> = {
  aurora_gold: {
    id: 'aurora_gold',
    label: 'Aurora Imperial',
    bodyFill: '#1E1B4B',
    chevronFill: '#F59E0B',
    collarFill: '#FEF3C7',
    visorLens: '#38BDF8',
    visorFrame: '#FBBF24',
    swatchHex: '#F59E0B',
  },
  crimson_summit: {
    id: 'crimson_summit',
    label: 'Cumbre Volcánica',
    bodyFill: '#7F1D1D',
    chevronFill: '#FDBA74',
    collarFill: '#FDE68A',
    visorLens: '#A7F3D0',
    visorFrame: '#FB923C',
    swatchHex: '#EF4444',
  },
  emerald_guardian: {
    id: 'emerald_guardian',
    label: 'Guardián Esmeralda',
    bodyFill: '#064E3B',
    chevronFill: '#34D399',
    collarFill: '#ECFDF5',
    visorLens: '#F472B6',
    visorFrame: '#6EE7B7',
    swatchHex: '#10B981',
  },
};

export const SAMURAI_ARMOR_VARIANT_META: Record<
  SamuraiArmorVariant,
  {
    id: SamuraiArmorVariant;
    label: string;
    plateFill: string;
    lacingFill: string;
    crestGold: string;
    trimDark: string;
    swatchHex: string;
  }
> = {
  imperial_jade: {
    id: 'imperial_jade',
    label: 'Jade Imperial',
    plateFill: '#065F46',
    lacingFill: '#34D399',
    crestGold: '#FACC15',
    trimDark: '#022C22',
    swatchHex: '#10B981',
  },
  shogun_crimson: {
    id: 'shogun_crimson',
    label: 'Carmesí Shogun',
    plateFill: '#7F1D1D',
    lacingFill: '#F87171',
    crestGold: '#FBBF24',
    trimDark: '#450A0A',
    swatchHex: '#EF4444',
  },
  cyber_ronin: {
    id: 'cyber_ronin',
    label: 'Ronin Neón Cian',
    plateFill: '#0F172A',
    lacingFill: '#22D3EE',
    crestGold: '#E879F9',
    trimDark: '#1E293B',
    swatchHex: '#22D3EE',
  },
  solar_gold: {
    id: 'solar_gold',
    label: 'Oro del Sol Naciente',
    plateFill: '#92400E',
    lacingFill: '#FDE047',
    crestGold: '#FEF08A',
    trimDark: '#451A03',
    swatchHex: '#FACC15',
  },
};

export const ARMOR_VARIANT_META: Record<
  ArmorVariant,
  {
    id: ArmorVariant;
    label: string;
    light: string;
    mid: string;
    dark: string;
    deep: string;
    highlight: string;
    swatchHex: string;
  }
> = {
  diamond: {
    id: 'diamond',
    label: 'Diamante Celestial',
    light: '#67E8F9',
    mid: '#22D3EE',
    dark: '#0891B2',
    deep: '#164E63',
    highlight: '#ECFEFF',
    swatchHex: '#22D3EE',
  },
  emerald: {
    id: 'emerald',
    label: 'Esmeralda Cúbica',
    light: '#6EE7B7',
    mid: '#10B981',
    dark: '#047857',
    deep: '#064E3B',
    highlight: '#ECFDF5',
    swatchHex: '#10B981',
  },
  gold: {
    id: 'gold',
    label: 'Oro Real',
    light: '#FEF08A',
    mid: '#FACC15',
    dark: '#CA8A04',
    deep: '#713F12',
    highlight: '#FEFCE8',
    swatchHex: '#FACC15',
  },
  obsidian: {
    id: 'obsidian',
    label: 'Obsidiana Encantada',
    light: '#C084FC',
    mid: '#7E22CE',
    dark: '#4C1D95',
    deep: '#1E1B4B',
    highlight: '#F3E8FF',
    swatchHex: '#9333EA',
  },
};

export const BloomMascot: React.FC<BloomMascotProps> = ({
  mood = 'happy',
  size = 'md',
  plumage = 'emerald',
  staticMascot = false,
  wearCasualShirt,
  previewSkin,
  shirtColor,
  executiveVariant,
  hoodieVariant,
  elotePonchoVariant,
  jacketVariant,
  samuraiVariant,
  armorVariant,
  emote,
}) => {
  const [globalOutfit, setGlobalOutfit] = useState<BloomOutfitState>(() => getSavedBloomOutfit());

  useEffect(() => {
    const handleOutfitUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<BloomOutfitState>;
      if (customEvent.detail) {
        setGlobalOutfit(customEvent.detail);
      } else {
        setGlobalOutfit(getSavedBloomOutfit());
      }
    };
    window.addEventListener(OUTFIT_EVENT_NAME, handleOutfitUpdate);
    return () => window.removeEventListener(OUTFIT_EVENT_NAME, handleOutfitUpdate);
  }, []);

  const activeSkin: EquippedSkinId =
    previewSkin !== undefined
      ? previewSkin
      : wearCasualShirt !== undefined
      ? wearCasualShirt
        ? 'shirt'
        : 'none'
      : globalOutfit.equippedSkin;

  const activeShirtColor: CasualShirtColor =
    shirtColor !== undefined ? shirtColor : globalOutfit.shirtColor;
  const shirtStyle = SHIRT_COLOR_META[activeShirtColor] || SHIRT_COLOR_META.black;

  const activeExecutiveVariant: ExecutiveSuitVariant =
    executiveVariant !== undefined ? executiveVariant : globalOutfit.executiveVariant;
  const executiveStyle =
    EXECUTIVE_SUIT_VARIANT_META[activeExecutiveVariant] ||
    EXECUTIVE_SUIT_VARIANT_META.wall_street_navy;

  const activeHoodieVariant: HoodieVariant =
    hoodieVariant !== undefined ? hoodieVariant : globalOutfit.hoodieVariant;
  const hoodieStyle =
    HOODIE_VARIANT_META[activeHoodieVariant] || HOODIE_VARIANT_META.cyber_quetzal;

  const activeElotePonchoVariant: ElotePonchoVariant =
    elotePonchoVariant !== undefined ? elotePonchoVariant : globalOutfit.elotePonchoVariant;
  const elotePonchoStyle =
    ELOTE_PONCHO_VARIANT_META[activeElotePonchoVariant] ||
    ELOTE_PONCHO_VARIANT_META.golden_maize;

  const activeJacketVariant: JacketVariant =
    jacketVariant !== undefined ? jacketVariant : globalOutfit.jacketVariant;
  const jacketStyle =
    JACKET_VARIANT_META[activeJacketVariant] || JACKET_VARIANT_META.aurora_gold;

  const activeSamuraiVariant: SamuraiArmorVariant =
    samuraiVariant !== undefined ? samuraiVariant : globalOutfit.samuraiVariant;
  const samuraiStyle =
    SAMURAI_ARMOR_VARIANT_META[activeSamuraiVariant] ||
    SAMURAI_ARMOR_VARIANT_META.imperial_jade;

  const activeArmorVariant: ArmorVariant =
    armorVariant !== undefined ? armorVariant : globalOutfit.armorVariant;
  const armorStyle =
    ARMOR_VARIANT_META[activeArmorVariant] || ARMOR_VARIANT_META.diamond;

  const currentEmote: BloomEmoteId =
    emote !== undefined ? emote : staticMascot ? 'none' : globalOutfit.activeEmote;

  const dimensions =
    size === 'sm'
      ? 'w-14 h-14'
      : size === 'lg'
      ? 'w-24 h-24'
      : size === 'xl'
      ? 'w-36 h-36'
      : 'w-18 h-18';

  const palette = PLUMAGE_COLORS[plumage];
  const isCompletelyStill = (staticMascot || mood === 'still') && currentEmote === 'none';

  // Three small signature feathers on the upper-left side of Bloom's head
  const renderHeadFeathers = () => (
    <g id="bloom-head-feathers-left">
      <path
        d="M79.5 31.7C77 24.5 74 21 71.5 22C69.5 23 69.5 27 70 30.5C66 26 63 24.5 61 26C59 28 61 31.5 64 35.5C59.5 33 56 32.5 55 34.5C54 37 57.5 41.5 62.1 44.8L74 42Z"
        fill={palette.body}
      />
      <path
        d="M79.5 31.7C77 24.5 74 21 71.5 22C69.5 23 69.5 27 70 30.5C66 26 63 24.5 61 26C59 28 61 31.5 64 35.5C59.5 33 56 32.5 55 34.5C54 37 57.5 41.5 62.1 44.8"
        stroke="#0A3323"
        strokeWidth="4.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </g>
  );

  // Back-of-Head Oversized Streetwear Hood Halo
  const renderHoodieBackHalo = () => {
    if (activeSkin !== 'hoodie') return null;
    return (
      <g id="bloom-hoodie-back-halo">
        <path
          d="M44 98 C36 72 44 38 62 24 L72 30 C82 20 118 20 128 30 L138 24 C156 38 164 72 156 98 Z"
          fill={hoodieStyle.hoodOuterFill}
          stroke="#0A3323"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M50 95 C44 72 50 43 65 31 C82 24 118 24 135 31 C150 43 156 72 150 95 Z"
          fill={hoodieStyle.hoodLiningFill}
          stroke="#0A3323"
          strokeWidth="3"
        />
      </g>
    );
  };

  // Exclusive Skin 01: Casual T-Shirt
  const renderCasualShirt = () => {
    if (activeSkin !== 'shirt') return null;
    return (
      <g id="bloom-casual-shirt">
        <path
          d="M66 105 L50 115 L56 131 L68 125 C69 141 78 154 100 154 C122 154 131 141 132 125 L144 131 L150 115 L134 105 C124 109 112 112 100 112 C88 112 76 109 66 105 Z"
          fill={shirtStyle.fill}
          stroke={shirtStyle.stroke}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M78 107 Q100 117 122 107 Q100 112 78 107 Z"
          fill={shirtStyle.collarFill}
          stroke={shirtStyle.stroke}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M53 113 L58 128"
          stroke={shirtStyle.collarFill}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M147 113 L142 128"
          stroke={shirtStyle.collarFill}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <text
          x="100"
          y="129"
          textAnchor="middle"
          fill="#FFB72B"
          stroke="#3B0D16"
          strokeWidth="4.2"
          paintOrder="stroke"
          style={{
            fontFamily: '"Fredoka", "Plus Jakarta Sans", sans-serif',
            fontWeight: 800,
            fontSize: '13.5px',
            letterSpacing: '0.3px',
          }}
        >
          Capital
        </text>
        <text
          x="100"
          y="143"
          textAnchor="middle"
          fill="#FFD166"
          stroke="#3B0D16"
          strokeWidth="4.2"
          paintOrder="stroke"
          style={{
            fontFamily: '"Fredoka", "Plus Jakarta Sans", sans-serif',
            fontWeight: 800,
            fontSize: '13.5px',
            letterSpacing: '0.4px',
          }}
        >
          Bloom
        </text>
      </g>
    );
  };

  // Exclusive Skin 02: Executive Suit ("Traje Ejecutivo Magnate de Reforma")
  const renderExecutiveSuit = () => {
    if (activeSkin !== 'executive_suit') return null;
    return (
      <g id="bloom-executive-suit">
        {/* Tailored Suit Jacket Body */}
        <path
          d="M63 103 L47 115 L53 134 L67 127 C68 144 78 156 100 156 C122 156 132 144 133 127 L147 134 L153 115 L137 103 C125 109 112 112 100 112 C88 112 75 109 63 103 Z"
          fill={executiveStyle.jacketFill}
          stroke="#0A3323"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Crisp White Dress Shirt V-Center */}
        <polygon
          points="83,107 117,107 100,144"
          fill="#F8FAFC"
          stroke="#0A3323"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Silk Power Tie */}
        <polygon
          points="96,110 104,110 106,133 100,143 94,133"
          fill={executiveStyle.tieFill}
          stroke="#0A3323"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Sharp Tailored Lapels */}
        <polygon
          points="74,106 85,108 100,141 72,124"
          fill={executiveStyle.lapelFill}
          stroke="#0A3323"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <polygon
          points="126,106 115,108 100,141 128,124"
          fill={executiveStyle.lapelFill}
          stroke="#0A3323"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Golden Pocket Square & $ Lapel Pin */}
        <polygon
          points="113,127 124,123 126,131 113,131"
          fill={executiveStyle.pocketSquareFill}
          stroke="#0A3323"
          strokeWidth="2"
        />
        <circle cx="80" cy="120" r="3.2" fill="#FACC15" stroke="#0A3323" strokeWidth="1.5" />
      </g>
    );
  };

  const renderExecutiveGlassesOnHead = () => {
    if (activeSkin !== 'executive_suit') return null;
    return (
      <g id="bloom-executive-glasses">
        <path d="M58 46 Q100 40 142 46" stroke="#0A3323" strokeWidth="4" fill="none" />
        <rect
          x="64"
          y="36"
          width="30"
          height="15"
          rx="4"
          fill="#0F172A"
          stroke={executiveStyle.glassesFrame}
          strokeWidth="3"
        />
        <path d="M69 40 L76 47" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <rect
          x="106"
          y="36"
          width="30"
          height="15"
          rx="4"
          fill="#0F172A"
          stroke={executiveStyle.glassesFrame}
          strokeWidth="3"
        />
        <path d="M111 40 L118 47" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  };

  // Exclusive Skin 03: Uncommon Asymmetric Streetwear Tech-Hoodie
  const renderUncommonHoodie = () => {
    if (activeSkin !== 'hoodie') return null;
    return (
      <g id="bloom-uncommon-hoodie">
        <path
          d="M62 101 L44 114 L52 135 L67 127 C67 144 77 158 100 158 C123 158 133 144 133 127 L148 135 L156 114 L138 101 C126 108 113 111 100 111 C87 111 74 108 62 101 Z"
          fill={hoodieStyle.primaryFill}
          stroke="#0A3323"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M104 111 L90 157 C118 158 132 144 133 127 L148 135 L156 114 L138 101 C127 107 115 110 104 111 Z"
          fill={hoodieStyle.secondarySplitFill}
          stroke="#0A3323"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M105 110 L90 156"
          stroke={hoodieStyle.neonAccent}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M71 119 L84 119 L84 126 L75 126"
          stroke={hoodieStyle.neonAccent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          d="M77 137 L83 129 L117 129 L123 137 L119 151 C112 154 88 154 81 151 Z"
          fill={hoodieStyle.pocketFill}
          stroke={hoodieStyle.neonAccent}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M78 152 Q100 159 122 152"
          stroke="#0A3323"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M62 101 C72 114 92 117 104 113 C116 117 128 114 138 101 C126 106 114 108 100 108 C86 108 74 106 62 101 Z"
          fill={hoodieStyle.hoodLiningFill}
          stroke="#0A3323"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M88 111 C86 121 85 127 87 133"
          stroke={hoodieStyle.cordColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="87"
          cy="135"
          r="2.8"
          fill={hoodieStyle.neonAccent}
          stroke="#0A3323"
          strokeWidth="1.5"
        />
        <path
          d="M112 111 C114 121 115 127 113 133"
          stroke={hoodieStyle.cordColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="113"
          cy="135"
          r="2.8"
          fill={hoodieStyle.neonAccent}
          stroke="#0A3323"
          strokeWidth="1.5"
        />
        <polygon
          points="100,116 108,124 100,132 92,124"
          fill={hoodieStyle.neonAccent}
          stroke="#0A3323"
          strokeWidth="2.2"
        />
        <circle cx="100" cy="124" r="2.3" fill="#FFFFFF" />
      </g>
    );
  };

  // Exclusive Skin 04: Artisanal Mexican Poncho & Golden Elote ("Rey del Elote Dorado")
  const renderElotePonchoBody = () => {
    if (activeSkin !== 'elote_poncho') return null;
    return (
      <g id="bloom-elote-poncho-body">
        {/* Flowing Artisanal Sarape / Poncho Drape */}
        <path
          d="M58 103 L44 122 L62 146 L100 159 L138 146 L156 122 L142 103 C128 110 114 113 100 113 C86 113 72 110 58 103 Z"
          fill={elotePonchoStyle.ponchoPrimary}
          stroke="#0A3323"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Woven Pre-Hispanic Diamond & Stripe Trim */}
        <path
          d="M54 123 L100 144 L146 123 L141 133 L100 152 L59 133 Z"
          fill={elotePonchoStyle.ponchoStripe}
          stroke="#0A3323"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Golden Collar Ribbing */}
        <path
          d="M68 105 Q100 119 132 105"
          stroke={elotePonchoStyle.trimGold}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Central Golden Elote Medallion on Poncho */}
        <g transform="translate(100, 128)">
          <path
            d="M-9 2 C-11 -6 -4 -12 0 -12 C4 -12 11 -6 9 2 Z"
            fill="#16A34A"
            stroke="#0A3323"
            strokeWidth="2"
          />
          <ellipse
            cx="0"
            cy="-5"
            rx="5.5"
            ry="9.5"
            fill="#FACC15"
            stroke="#0A3323"
            strokeWidth="2.2"
          />
          {/* Chili & Cotija Topping on Elote Medallion */}
          <circle cx="-1.5" cy="-7" r="1.3" fill="#EF4444" />
          <circle cx="2" cy="-4" r="1.3" fill="#EF4444" />
          <circle cx="0" cy="-2" r="1.2" fill="#FEF08A" />
        </g>
      </g>
    );
  };

  const renderEloteSombreroOnHead = () => {
    if (activeSkin !== 'elote_poncho') return null;
    return (
      <g id="bloom-elote-sombrero-hat">
        {/* Crown of Sombrero */}
        <path
          d="M74 34 C78 12 122 12 126 34 Z"
          fill={elotePonchoStyle.hatCrown}
          stroke="#0A3323"
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        {/* Wide Artisanal Sombrero Brim */}
        <path
          d="M42 34 Q100 22 158 34 Q100 44 42 34 Z"
          fill={elotePonchoStyle.hatBrim}
          stroke="#0A3323"
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        {/* Golden Embroidery Dots along Brim */}
        <circle cx="68" cy="34" r="2.5" fill={elotePonchoStyle.trimGold} />
        <circle cx="84" cy="32" r="2.5" fill={elotePonchoStyle.trimGold} />
        <circle cx="100" cy="31" r="3" fill={elotePonchoStyle.trimGold} />
        <circle cx="116" cy="32" r="2.5" fill={elotePonchoStyle.trimGold} />
        <circle cx="132" cy="34" r="2.5" fill={elotePonchoStyle.trimGold} />
      </g>
    );
  };

  // Exclusive Skin 05: Astral Jacket Body
  const renderAstralJacketBody = () => {
    if (activeSkin !== 'astral_jacket') return null;
    return (
      <g id="bloom-astral-jacket-body">
        <path
          d="M64 103 L47 116 L54 134 L68 127 C69 144 79 156 100 156 C121 156 131 144 132 127 L146 134 L153 116 L136 103 C124 109 112 111 100 111 C88 111 76 109 64 103 Z"
          fill={jacketStyle.bodyFill}
          stroke="#0A3323"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M65 117 L100 138 L135 117 L135 127 L100 148 L65 127 Z"
          fill={jacketStyle.chevronFill}
          stroke="#0A3323"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M70 102 Q100 116 130 102 C126 112 114 116 100 116 C86 116 74 112 70 102 Z"
          fill={jacketStyle.collarFill}
          stroke="#0A3323"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle
          cx="100"
          cy="126"
          r="7"
          fill={jacketStyle.visorFrame}
          stroke="#0A3323"
          strokeWidth="2.2"
        />
        <circle cx="100" cy="126" r="2.5" fill="#FFFFFF" />
      </g>
    );
  };

  const renderAstralGogglesOnHead = () => {
    if (activeSkin !== 'astral_jacket') return null;
    return (
      <g id="bloom-explorer-goggles">
        <path
          d="M58 52 Q100 44 142 52"
          stroke="#0A3323"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <rect
          x="64"
          y="40"
          width="31"
          height="17"
          rx="7"
          fill={jacketStyle.visorLens}
          stroke={jacketStyle.visorFrame}
          strokeWidth="3.5"
        />
        <path d="M70 44 L77 52" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        <rect
          x="105"
          y="40"
          width="31"
          height="17"
          rx="7"
          fill={jacketStyle.visorLens}
          stroke={jacketStyle.visorFrame}
          strokeWidth="3.5"
        />
        <path d="M111 44 L118 52" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M95 48 L105 48" stroke={jacketStyle.visorFrame} strokeWidth="4" />
      </g>
    );
  };

  // Exclusive Skin 06: Samurai Jade Armor ("Armadura Samurái del Ahorro")
  const renderSamuraiArmorChestplate = () => {
    if (activeSkin !== 'samurai_armor') return null;
    return (
      <g id="bloom-samurai-armor-body">
        {/* Layered Sode Shoulder Shields & Do Cuirass */}
        <path
          d="M54 103 L42 120 L54 134 L67 128 C69 145 79 157 100 157 C121 157 131 145 133 128 L146 134 L158 120 L146 103 C130 110 115 112 100 112 C85 112 70 110 54 103 Z"
          fill={samuraiStyle.plateFill}
          stroke="#0A3323"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Horizontal Laced Lamellar Plates */}
        <path
          d="M70 124 H130 M73 134 H127 M78 144 H122"
          stroke={samuraiStyle.lacingFill}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Golden Shogun Sun Crest on Chest */}
        <circle
          cx="100"
          cy="124"
          r="8.5"
          fill={samuraiStyle.crestGold}
          stroke="#0A3323"
          strokeWidth="2.5"
        />
        <circle cx="100" cy="124" r="3.5" fill={samuraiStyle.trimDark} />
      </g>
    );
  };

  const renderSamuraiKabutoOnHead = () => {
    if (activeSkin !== 'samurai_armor') return null;
    return (
      <g id="bloom-samurai-kabuto-helmet">
        {/* Kabuto Side Shikoro Neck Guards */}
        <path
          d="M52 38 L42 58 L58 56 Z M148 38 L158 58 L142 56 Z"
          fill={samuraiStyle.trimDark}
          stroke="#0A3323"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Kabuto Dome Bowl */}
        <path
          d="M56 42 C58 18 142 18 144 42 Z"
          fill={samuraiStyle.plateFill}
          stroke="#0A3323"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Golden Crescent Moon Maedate Crest on Forehead */}
        <path
          d="M100 28 C84 28 74 14 82 6 C82 16 90 21 100 21 C110 21 118 16 118 6 C126 14 116 28 100 28 Z"
          fill={samuraiStyle.crestGold}
          stroke="#0A3323"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
      </g>
    );
  };

  // Exclusive Skin 07: Blocky Voxel Diamond Armor (Helmet + Chestplate)
  const renderDiamondArmorChestplate = () => {
    if (activeSkin !== 'diamond_armor') return null;
    return (
      <g id="bloom-voxel-diamond-chestplate">
        <path
          d="M52 102 H78 V108 H88 V114 H112 V108 H122 V102 H148 V108 H156 V126 H146 V132 H134 V146 H124 V153 H112 V157 H88 V153 H76 V146 H66 V132 H54 V126 H44 V108 H52 Z"
          fill={armorStyle.mid}
          stroke="#0A3323"
          strokeWidth="4"
          strokeLinejoin="miter"
        />
        <path
          d="M100 114 H112 V108 H122 V102 H148 V108 H156 V126 H146 V132 H134 V146 H124 V153 H112 V157 H100 Z"
          fill={armorStyle.dark}
          fillOpacity="0.42"
        />
        <rect x="46" y="110" width="10" height="8" fill={armorStyle.highlight} />
        <rect x="56" y="104" width="12" height="8" fill={armorStyle.light} />
        <rect x="46" y="118" width="16" height="6" fill={armorStyle.light} />
        <rect x="56" y="124" width="10" height="6" fill={armorStyle.dark} />
        <rect x="132" y="104" width="12" height="8" fill={armorStyle.light} />
        <rect x="144" y="110" width="10" height="8" fill={armorStyle.mid} />
        <rect x="138" y="118" width="16" height="6" fill={armorStyle.dark} />
        <rect x="134" y="124" width="10" height="6" fill={armorStyle.deep} />
        <rect
          x="70"
          y="115"
          width="26"
          height="14"
          fill={armorStyle.light}
          stroke={armorStyle.deep}
          strokeWidth="2.5"
        />
        <rect
          x="104"
          y="115"
          width="26"
          height="14"
          fill={armorStyle.mid}
          stroke={armorStyle.deep}
          strokeWidth="2.5"
        />
        <rect x="73" y="117" width="10" height="5" fill={armorStyle.highlight} />
        <rect x="73" y="122" width="5" height="4" fill={armorStyle.highlight} />
        <rect x="107" y="117" width="9" height="5" fill={armorStyle.light} />
        <rect
          x="74"
          y="132"
          width="22"
          height="11"
          fill={armorStyle.mid}
          stroke={armorStyle.deep}
          strokeWidth="2.2"
        />
        <rect
          x="104"
          y="132"
          width="22"
          height="11"
          fill={armorStyle.dark}
          stroke={armorStyle.deep}
          strokeWidth="2.2"
        />
        <rect x="77" y="134" width="8" height="4" fill={armorStyle.light} />
        <rect x="84" y="145" width="32" height="8" fill={armorStyle.deep} />
        <rect x="88" y="147" width="10" height="4" fill={armorStyle.light} />
        <rect x="102" y="147" width="10" height="4" fill={armorStyle.mid} />
      </g>
    );
  };

  const renderDiamondArmorHelmet = () => {
    if (activeSkin !== 'diamond_armor') return null;
    return (
      <g id="bloom-voxel-diamond-helmet">
        <path
          d="M64 18 H136 V26 H146 V36 H154 V78 H141 V48 H106 V63 H94 V48 H59 V78 H46 V36 H54 V26 H64 Z"
          fill={armorStyle.mid}
          stroke="#0A3323"
          strokeWidth="4"
          strokeLinejoin="miter"
        />
        <path
          d="M100 18 H136 V26 H146 V36 H154 V78 H141 V48 H106 V63 H100 Z"
          fill={armorStyle.dark}
          fillOpacity="0.38"
        />
        <rect x="66" y="20" width="44" height="6" fill={armorStyle.highlight} />
        <rect x="110" y="20" width="24" height="6" fill={armorStyle.light} />
        <rect x="56" y="28" width="22" height="8" fill={armorStyle.highlight} />
        <rect x="78" y="28" width="24" height="8" fill={armorStyle.light} />
        <rect x="102" y="28" width="24" height="8" fill={armorStyle.mid} />
        <rect x="126" y="28" width="18" height="8" fill={armorStyle.dark} />
        <rect x="48" y="38" width="16" height="8" fill={armorStyle.light} />
        <rect x="64" y="38" width="26" height="8" fill={armorStyle.mid} />
        <rect
          x="92"
          y="35"
          width="16"
          height="12"
          fill={armorStyle.light}
          stroke={armorStyle.deep}
          strokeWidth="2.2"
        />
        <rect x="95" y="37" width="6" height="5" fill={armorStyle.highlight} />
        <rect x="110" y="38" width="24" height="8" fill={armorStyle.dark} />
        <rect x="134" y="38" width="18" height="8" fill={armorStyle.deep} />
        <rect x="96" y="48" width="4" height="12" fill={armorStyle.highlight} />
        <rect x="100" y="48" width="4" height="12" fill={armorStyle.dark} />
        <rect x="48" y="48" width="9" height="12" fill={armorStyle.highlight} />
        <rect x="48" y="60" width="9" height="15" fill={armorStyle.light} />
        <rect x="143" y="48" width="9" height="12" fill={armorStyle.mid} />
        <rect x="143" y="60" width="9" height="15" fill={armorStyle.deep} />
        <path
          d="M59 48 H94 V63 H106 V48 H141"
          stroke={armorStyle.deep}
          strokeWidth="2.8"
          strokeLinejoin="miter"
          fill="none"
        />
      </g>
    );
  };

  const renderAllEquippedOutfits = () => (
    <>
      {renderCasualShirt()}
      {renderExecutiveSuit()}
      {renderUncommonHoodie()}
      {renderElotePonchoBody()}
      {renderAstralJacketBody()}
      {renderSamuraiArmorChestplate()}
      {renderDiamondArmorChestplate()}
      {renderExecutiveGlassesOnHead()}
      {renderEloteSombreroOnHead()}
      {renderAstralGogglesOnHead()}
      {renderSamuraiKabutoOnHead()}
      {renderDiamondArmorHelmet()}
    </>
  );

  if (isCompletelyStill) {
    return (
      <div className={`${dimensions} relative select-none shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible drop-shadow-xs"
        >
          {renderHoodieBackHalo()}
          <g>
            <path
              d="M66 108C36 94 16 70 14 46C8 78 24 114 62 124Z"
              fill={palette.wingTip}
              stroke="#0A3323"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <path
              d="M70 110C48 102 35 88 32 74C32 94 45 112 68 120Z"
              fill={palette.body}
              stroke="#0A3323"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
          </g>
          <g>
            <path
              d="M134 108C164 94 184 70 186 46C192 78 176 114 138 124Z"
              fill={palette.wingTip}
              stroke="#0A3323"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <path
              d="M130 110C152 102 165 88 168 74C168 94 155 112 132 120Z"
              fill={palette.body}
              stroke="#0A3323"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
          </g>
          <path
            d="M86 156L76 178L87 172L94 175L90 156Z"
            fill="#D3968C"
            stroke="#0A3323"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M114 156L106 175L113 172L124 178L116 156Z"
            fill="#D3968C"
            stroke="#0A3323"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M100 28C72 28 54 46 54 70C54 77 46 83 46 94C46 109 60 116 70 119C70 142 81 160 100 160C119 160 130 142 130 119C140 116 154 109 154 94C154 83 146 77 146 70C146 46 128 28 100 28Z"
            fill={palette.body}
            stroke="#0A3323"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {activeSkin !== 'diamond_armor' && activeSkin !== 'samurai_armor' && renderHeadFeathers()}
          <ellipse
            cx="100"
            cy="132"
            rx="16"
            ry="21"
            fill={palette.belly}
            stroke="#0A3323"
            strokeWidth="3.5"
          />
          {renderAllEquippedOutfits()}
          <circle cx="63" cy="92" r="10" fill="#F8FBCA" fillOpacity="0.65" />
          <circle cx="137" cy="92" r="10" fill="#F8FBCA" fillOpacity="0.65" />
          <circle
            cx="77"
            cy="72"
            r="13.5"
            fill="#FFFFFF"
            stroke="#0A3323"
            strokeWidth="4"
          />
          <circle cx="80" cy="74" r="8" fill="#0A3323" />
          <circle cx="77.5" cy="71" r="2.5" fill="#FFFFFF" />
          <circle
            cx="123"
            cy="72"
            r="13.5"
            fill="#FFFFFF"
            stroke="#0A3323"
            strokeWidth="4"
          />
          <circle cx="120" cy="74" r="8" fill="#0A3323" />
          <circle cx="117.5" cy="71" r="2.5" fill="#FFFFFF" />
          <path
            d="M95 77C97 74 103 74 105 77L100 106Z"
            fill="#1D2951"
            stroke="#0A3323"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  // Whole-Body / Pelvis Rhythm (Anchored at Pelvis Center: 100, 145)
  const pelvisCycleDuration =
    currentEmote === 'floss_dance'
      ? 0.68
      : currentEmote === 'russian_dance'
      ? 0.64
      : currentEmote === 'six_seven'
      ? 0.78
      : currentEmote === 'elote_fiesta'
      ? 0.65
      : currentEmote === 'griddy_step'
      ? 0.62
      : currentEmote === 'mariachi_zapateado'
      ? 0.56
      : currentEmote === 'moonwalk_glide'
      ? 0.88
      : currentEmote === 'handsome_fox'
      ? 0.76
      : currentEmote === 'clown_dance'
      ? 0.44
      : currentEmote === 'phonk_face'
      ? 0.66
      : mood === 'celebrating'
      ? 1.1
      : 2.2;

  const pelvisTransition = {
    duration: pelvisCycleDuration,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  };

  const pelvisAnimate =
    currentEmote === 'floss_dance'
      ? {
          x: [-11, 0, 11, 0, -11],
          y: [0, 3.5, 0, 3.5, 0],
          rotate: [-7, 0, 7, 0, -7],
        }
      : currentEmote === 'russian_dance'
      ? {
          y: [10, -7, 10, -7, 10],
          x: [-3, 0, 3, 0, -3],
          rotate: [-3.5, 0, 3.5, 0, -3.5],
          scaleX: [1.06, 0.96, 1.06, 0.96, 1.06],
          scaleY: [0.92, 1.05, 0.92, 1.05, 0.92],
        }
      : currentEmote === 'six_seven'
      ? {
          x: [-6.5, 0, 6.5, 0, -6.5],
          y: [4.5, -3.5, 4.5, -3.5, 4.5],
          rotate: [-5.5, 0, 5.5, 0, -5.5],
          scaleX: [1.03, 0.98, 1.03, 0.98, 1.03],
          scaleY: [0.97, 1.03, 0.97, 1.03, 0.97],
        }
      : currentEmote === 'elote_fiesta'
      ? {
          x: [-7, 0, 7, 0, -7],
          y: [5, -6, 5, -6, 5],
          rotate: [-6, 0, 6, 0, -6],
        }
      : currentEmote === 'griddy_step'
      ? {
          x: [-4, 4, -4],
          y: [6, -6, 6, -6, 6],
          rotate: [-4, 4, -4],
        }
      : currentEmote === 'mariachi_zapateado'
      ? {
          y: [4, -7, 4, -7, 4],
          x: [-3, 3, -3],
          rotate: [-3, 3, -3],
        }
      : currentEmote === 'moonwalk_glide'
      ? {
          x: [-10, 10, -10],
          y: [2, -2, 2, -2, 2],
          rotate: [-4, 2, -4],
        }
      : currentEmote === 'handsome_fox'
      ? {
          y: [-8, 10, -8],
          x: [-2, 2, -2],
          rotate: [-2, 2, -2],
          scaleX: [0.89, 1.12, 0.89],
          scaleY: [0.89, 1.12, 0.89],
        }
      : currentEmote === 'clown_dance'
      ? {
          y: [-6, 6, -6, 6, -6],
          x: [-4.5, 4.5, -4.5],
          rotate: [-3.5, 3.5, -3.5],
          scaleX: [0.96, 1.04, 0.96, 1.04, 0.96],
          scaleY: [1.04, 0.95, 1.04, 0.95, 1.04],
        }
      : currentEmote === 'phonk_face'
      ? {
          x: [-5, 5, -5],
          y: [4, -4, 4, -4, 4],
          rotate: [-4.5, 4.5, -4.5],
        }
      : mood === 'celebrating'
      ? { y: [0, -6, 0] }
      : { y: [0, -3, 0] };

  return (
    <div className={`${dimensions} relative select-none shrink-0 flex items-center justify-center`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-xs"
      >
        {/* 1. GROUND CONTACT SHADOW */}
        <g transform="translate(100, 183)">
          <motion.ellipse
            cx="0"
            cy="0"
            rx="42"
            ry="7.5"
            fill={
              currentEmote === 'floss_dance'
                ? '#10B981'
                : currentEmote === 'six_seven'
                ? '#38BDF8'
                : currentEmote === 'elote_fiesta'
                ? '#FACC15'
                : currentEmote === 'griddy_step'
                ? '#A855F7'
                : currentEmote === 'mariachi_zapateado'
                ? '#10B981'
                : currentEmote === 'moonwalk_glide'
                ? '#38BDF8'
                : currentEmote === 'handsome_fox'
                ? '#F59E0B'
                : currentEmote === 'clown_dance'
                ? '#EF4444'
                : currentEmote === 'russian_dance'
                ? '#F59E0B'
                : currentEmote === 'phonk_face'
                ? '#E879F9'
                : '#0A3323'
            }
            fillOpacity={currentEmote === 'none' ? 0.18 : 0.34}
            animate={{ scaleX: [1.08, 0.92, 1.08] }}
            transition={pelvisTransition}
          />
        </g>

        {/* Optional Phonk Drift Aura Behind Character */}
        {currentEmote === 'phonk_face' && (
          <g id="emote-phonk-backdrop" transform="translate(100, 98)">
            <motion.circle
              cx="0"
              cy="0"
              r="74"
              fill="#3B0764"
              fillOpacity="0.26"
              stroke="#E879F9"
              strokeWidth="2.5"
              strokeDasharray="10 6"
              animate={{ rotate: [0, 360], scale: [0.96, 1.04, 0.96] }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                scale: pelvisTransition,
              }}
            />
          </g>
        )}

        {/* 2. ARTICULATED LEGS & FEET RIG */}
        {currentEmote === 'russian_dance' || currentEmote === 'mariachi_zapateado' ? (
          <g id="russian-or-mariachi-legs">
            <g transform="translate(86, 154)">
              <motion.g
                animate={{
                  rotate: [54, 0, -4, 0, 54],
                  x: [-8, 0, 2, 0, -8],
                  y: [4, 2, 6, 2, 4],
                }}
                transition={pelvisTransition}
              >
                <path
                  d="M-4 -2 L-16 22 L-4 18 L4 21 L4 -2 Z"
                  fill="#D3968C"
                  stroke="#0A3323"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </motion.g>
            </g>
            <g transform="translate(114, 154)">
              <motion.g
                animate={{
                  rotate: [4, 0, -54, 0, 4],
                  x: [-2, 0, 8, 0, -2],
                  y: [6, 2, 4, 2, 6],
                }}
                transition={pelvisTransition}
              >
                <path
                  d="M-4 -2 L-4 21 L4 18 L16 22 L4 -2 Z"
                  fill="#D3968C"
                  stroke="#0A3323"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </motion.g>
            </g>
          </g>
        ) : currentEmote === 'moonwalk_glide' || currentEmote === 'griddy_step' ? (
          <g id="moonwalk-or-griddy-legs">
            <g transform="translate(86, 155)">
              <motion.g
                animate={{
                  x: [-10, 10, -10],
                  y: [-4, 3, -4],
                  rotate: [22, -18, 22],
                }}
                transition={pelvisTransition}
              >
                <path
                  d="M0 0 L-10 23 L1 17 L8 20 L4 0 Z"
                  fill="#D3968C"
                  stroke="#0A3323"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </motion.g>
            </g>
            <g transform="translate(114, 155)">
              <motion.g
                animate={{
                  x: [10, -10, 10],
                  y: [3, -4, 3],
                  rotate: [-18, 22, -18],
                }}
                transition={pelvisTransition}
              >
                <path
                  d="M0 0 L-8 20 L-1 17 L10 23 L2 0 Z"
                  fill="#D3968C"
                  stroke="#0A3323"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </motion.g>
            </g>
          </g>
        ) : currentEmote === 'clown_dance' ? (
          <g id="clown-dance-frantic-side-kick-legs">
            <g transform="translate(86, 154)">
              <motion.g
                animate={{
                  rotate: [68, -14, 68],
                  x: [-11, 3, -11],
                  y: [-7, 3, -7],
                }}
                transition={pelvisTransition}
              >
                <path
                  d="M-3 -2 L-16 22 L-4 17 L5 20 L4 -2 Z"
                  fill="#D3968C"
                  stroke="#0A3323"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </motion.g>
            </g>
            <g transform="translate(114, 154)">
              <motion.g
                animate={{
                  rotate: [14, -68, 14],
                  x: [-3, 11, -3],
                  y: [3, -7, 3],
                }}
                transition={pelvisTransition}
              >
                <path
                  d="M-4 -2 L-5 20 L4 17 L16 22 L3 -2 Z"
                  fill="#D3968C"
                  stroke="#0A3323"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </motion.g>
            </g>
          </g>
        ) : (
          <g id="default-or-two-step-legs">
            <g transform="translate(86, 155)">
              <motion.g
                animate={
                  currentEmote !== 'none'
                    ? { y: [2, -5, 0, 2], rotate: [10, -6, 10] }
                    : { y: 0, rotate: 0 }
                }
                transition={pelvisTransition}
              >
                <path
                  d="M0 0 L-10 23 L1 17 L8 20 L4 0 Z"
                  fill="#D3968C"
                  stroke="#0A3323"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </motion.g>
            </g>
            <g transform="translate(114, 155)">
              <motion.g
                animate={
                  currentEmote !== 'none'
                    ? { y: [0, 2, -5, 0], rotate: [-6, 10, -6] }
                    : { y: 0, rotate: 0 }
                }
                transition={pelvisTransition}
              >
                <path
                  d="M0 0 L-8 20 L-1 17 L10 23 L2 0 Z"
                  fill="#D3968C"
                  stroke="#0A3323"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </motion.g>
            </g>
          </g>
        )}

        {/* 3. ARTICULATED PELVIS, TORSO, HEAD & ARMS HIERARCHY */}
        <g transform="translate(100, 145)">
          <motion.g animate={pelvisAnimate} transition={pelvisTransition}>
            <g transform="translate(-100, -145)">
              {renderHoodieBackHalo()}

              {/* Back Flossing Arm */}
              {currentEmote === 'floss_dance' && (
                <g transform="translate(100, 108)">
                  <motion.g
                    animate={{
                      rotate: [-32, 0, 32, 0, -32],
                      x: [18, 0, -18, 0, 18],
                    }}
                    transition={pelvisTransition}
                  >
                    <path
                      d="M-8 0 C-14 22 -18 38 -12 48 C-2 52 8 48 12 36 L8 0 Z"
                      fill={palette.bodyShade}
                      stroke="#0A3323"
                      strokeWidth="4"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="-4"
                      cy="46"
                      r="8.5"
                      fill={palette.wingTip}
                      stroke="#0A3323"
                      strokeWidth="3.5"
                    />
                  </motion.g>
                </g>
              )}

              {(currentEmote === 'none' ||
                currentEmote === 'phonk_face' ||
                currentEmote === 'mariachi_zapateado' ||
                currentEmote === 'moonwalk_glide') && (
                <>
                  <g transform="translate(68, 110)">
                    <motion.g
                      animate={
                        currentEmote !== 'none'
                          ? { rotate: [-16, 18, -16], y: [3, -3, 3] }
                          : { rotate: [-8, 8, -8] }
                      }
                      transition={
                        currentEmote !== 'none'
                          ? pelvisTransition
                          : { duration: 0.45, repeat: Infinity, ease: 'easeInOut' }
                      }
                    >
                      <g transform="translate(-68, -110)">
                        <path
                          d="M66 108C36 94 16 70 14 46C8 78 24 114 62 124Z"
                          fill={palette.wingTip}
                          stroke="#0A3323"
                          strokeWidth="4.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M70 110C48 102 35 88 32 74C32 94 45 112 68 120Z"
                          fill={palette.body}
                          stroke="#0A3323"
                          strokeWidth="4.5"
                          strokeLinejoin="round"
                        />
                      </g>
                    </motion.g>
                  </g>

                  <g transform="translate(132, 110)">
                    <motion.g
                      animate={
                        currentEmote !== 'none'
                          ? { rotate: [-18, 16, -18], y: [-3, 3, -3] }
                          : { rotate: [8, -8, 8] }
                      }
                      transition={
                        currentEmote !== 'none'
                          ? pelvisTransition
                          : { duration: 0.45, repeat: Infinity, ease: 'easeInOut' }
                      }
                    >
                      <g transform="translate(-132, -110)">
                        <path
                          d="M134 108C164 94 184 70 186 46C192 78 176 114 138 124Z"
                          fill={palette.wingTip}
                          stroke="#0A3323"
                          strokeWidth="4.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M130 110C152 102 165 88 168 74C168 94 155 112 132 120Z"
                          fill={palette.body}
                          stroke="#0A3323"
                          strokeWidth="4.5"
                          strokeLinejoin="round"
                        />
                      </g>
                    </motion.g>
                  </g>
                </>
              )}

              {/* MAIN BODY & BELLY */}
              <path
                d="M100 28C72 28 54 46 54 70C54 77 46 83 46 94C46 109 60 116 70 119C70 142 81 160 100 160C119 160 130 142 130 119C140 116 154 109 154 94C154 83 146 77 146 70C146 46 128 28 100 28Z"
                fill={palette.body}
                stroke="#0A3323"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              {activeSkin !== 'diamond_armor' &&
                activeSkin !== 'samurai_armor' &&
                renderHeadFeathers()}

              <ellipse
                cx="100"
                cy="132"
                rx="16"
                ry="21"
                fill={palette.belly}
                stroke="#0A3323"
                strokeWidth="3.5"
              />

              {/* Active Outfit Overlays */}
              {renderAllEquippedOutfits()}

              {/* Traditional Folk Fur Hat (Ushanka) on Head during Russian Dance */}
              {currentEmote === 'russian_dance' &&
                activeSkin !== 'diamond_armor' &&
                activeSkin !== 'samurai_armor' && (
                  <g id="folk-ushanka-hat">
                    <path
                      d="M64 40 C64 20 136 20 136 40 Z"
                      fill="#7F1D1D"
                      stroke="#0A3323"
                      strokeWidth="3.5"
                    />
                    <rect
                      x="60"
                      y="27"
                      width="80"
                      height="20"
                      rx="8"
                      fill="#334155"
                      stroke="#0A3323"
                      strokeWidth="3.5"
                    />
                    <polygon
                      points="100,29 103,35 109,35 104,39 106,45 100,41 94,45 96,39 91,35 97,35"
                      fill="#FBBF24"
                      stroke="#0A3323"
                      strokeWidth="1.5"
                    />
                  </g>
                )}

              {/* Charro Sombrero on Head during Mariachi Zapateado */}
              {currentEmote === 'mariachi_zapateado' &&
                activeSkin !== 'diamond_armor' &&
                activeSkin !== 'elote_poncho' && (
                  <g id="mariachi-charro-hat">
                    <path
                      d="M72 34 C76 10 124 10 128 34 Z"
                      fill="#18181B"
                      stroke="#0A3323"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M36 34 Q100 20 164 34 Q100 46 36 34 Z"
                      fill="#18181B"
                      stroke="#FACC15"
                      strokeWidth="3.5"
                    />
                  </g>
                )}

              {/* Astral Fedora Hat during Moonwalk Glide */}
              {currentEmote === 'moonwalk_glide' && activeSkin !== 'diamond_armor' && (
                <g id="moonwalk-fedora-hat" transform="rotate(-8 100 32)">
                  <path
                    d="M68 34 C72 14 128 14 132 34 Z"
                    fill="#F8FAFC"
                    stroke="#0A3323"
                    strokeWidth="3.5"
                  />
                  <rect x="69" y="27" width="62" height="5" fill="#0F172A" />
                  <path
                    d="M48 34 Q100 28 152 36"
                    stroke="#0A3323"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* FACIAL FEATURES */}
              <g id="bloom-facial-features">
                <circle
                  cx="63"
                  cy="92"
                  r="10"
                  fill={currentEmote === 'russian_dance' ? '#FB7185' : '#F8FBCA'}
                  fillOpacity="0.68"
                />
                <circle
                  cx="137"
                  cy="92"
                  r="10"
                  fill={currentEmote === 'russian_dance' ? '#FB7185' : '#F8FBCA'}
                  fillOpacity="0.68"
                />

                {mood === 'celebrating' ||
                currentEmote === 'russian_dance' ||
                currentEmote === 'mariachi_zapateado' ? (
                  <>
                    <circle
                      cx="77"
                      cy="72"
                      r="13.5"
                      fill="#FFFFFF"
                      stroke="#0A3323"
                      strokeWidth="4"
                    />
                    <path
                      d="M71 73C73 67 81 67 83 73"
                      stroke="#0A3323"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="123"
                      cy="72"
                      r="13.5"
                      fill="#FFFFFF"
                      stroke="#0A3323"
                      strokeWidth="4"
                    />
                    <path
                      d="M117 73C119 67 127 67 129 73"
                      stroke="#0A3323"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </>
                ) : (
                  <>
                    <circle
                      cx="77"
                      cy="72"
                      r="13.5"
                      fill={currentEmote === 'phonk_face' ? '#0F172A' : '#FFFFFF'}
                      stroke="#0A3323"
                      strokeWidth="4"
                    />
                    <motion.g
                      animate={
                        currentEmote === 'six_seven'
                          ? { x: [-3.2, 3.2, -3.2], y: [2.2, -1.2, 2.2] }
                          : currentEmote === 'handsome_fox'
                          ? { x: [-3.5, 0, 3.5, 0, -3.5], y: [1.5, -1.5, 1.5, -1.5, 1.5] }
                          : currentEmote === 'floss_dance'
                          ? { x: [2.5, 0, -2.5, 0, 2.5] }
                          : { x: 0, y: 0 }
                      }
                      transition={pelvisTransition}
                    >
                      <circle cx="80" cy="74" r="8" fill="#0A3323" />
                      <circle cx="77.5" cy="71" r="2.5" fill="#FFFFFF" />
                    </motion.g>

                    <circle
                      cx="123"
                      cy="72"
                      r="13.5"
                      fill={currentEmote === 'phonk_face' ? '#0F172A' : '#FFFFFF'}
                      stroke="#0A3323"
                      strokeWidth="4"
                    />
                    <motion.g
                      animate={
                        currentEmote === 'six_seven'
                          ? { x: [-3.2, 3.2, -3.2], y: [-1.2, 2.2, -1.2] }
                          : currentEmote === 'handsome_fox'
                          ? { x: [-3.5, 0, 3.5, 0, -3.5], y: [1.5, -1.5, 1.5, -1.5, 1.5] }
                          : currentEmote === 'floss_dance'
                          ? { x: [2.5, 0, -2.5, 0, 2.5] }
                          : { x: 0, y: 0 }
                      }
                      transition={pelvisTransition}
                    >
                      <circle cx="120" cy="74" r="8" fill="#0A3323" />
                      <circle cx="117.5" cy="71" r="2.5" fill="#FFFFFF" />
                    </motion.g>
                  </>
                )}

                {currentEmote === 'phonk_face' && (
                  <g id="emote-phonk-face-contours">
                    <path
                      d="M57 84 L68 92 L62 106"
                      stroke="#0A3323"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M143 84 L132 92 L138 106"
                      stroke="#0A3323"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M61 59 L92 67"
                      stroke="#0A3323"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M108 64 Q124 49 140 58"
                      stroke="#0A3323"
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <motion.g
                      animate={{ opacity: [0.75, 1, 0.75] }}
                      transition={{ duration: 0.36, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <path
                        d="M52 73 L102 73"
                        stroke="#22D3EE"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                      />
                      <circle cx="79" cy="73" r="6" fill="#22D3EE" />
                      <circle cx="79" cy="73" r="2.8" fill="#FFFFFF" />
                      <path
                        d="M98 73 L148 73"
                        stroke="#E879F9"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                      />
                      <circle cx="121" cy="73" r="6" fill="#E879F9" />
                      <circle cx="121" cy="73" r="2.8" fill="#FFFFFF" />
                    </motion.g>
                  </g>
                )}

                <path
                  d="M95 77C97 74 103 74 105 77L100 106Z"
                  fill="#1D2951"
                  stroke="#0A3323"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
              </g>

              {/* FOREGROUND ARTICULATED ARMS / WINGS */}
              {/* 1) SIX SEVEN */}
              {currentEmote === 'six_seven' && (
                <g id="six-seven-front-weighing-scale-arms">
                  <g transform="translate(100, 118)">
                    <motion.g
                      animate={{ rotate: [-16, 16, -16] }}
                      transition={pelvisTransition}
                    >
                      <path
                        d="M-36 0 Q0 -8 36 0"
                        stroke="#38BDF8"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeOpacity="0.75"
                        fill="none"
                      />
                      <circle cx="0" cy="-4" r="3.5" fill="#FBBF24" stroke="#0A3323" strokeWidth="1.5" />
                    </motion.g>
                  </g>

                  <g transform="translate(64, 110)">
                    <motion.g
                      animate={{
                        y: [11, -13, 11],
                        rotate: [10, -14, 10],
                      }}
                      transition={pelvisTransition}
                    >
                      <path
                        d="M0 -4 C-14 4 -18 18 -8 26 C2 30 14 24 16 14 C10 8 4 2 0 -4 Z"
                        fill={palette.body}
                        stroke="#0A3323"
                        strokeWidth="3.8"
                        strokeLinejoin="round"
                      />
                      <g transform="translate(4, 20)">
                        <path
                          d="M-18 -2 C-14 10 14 10 18 -2 C12 -6 -12 -6 -18 -2 Z"
                          fill={palette.wingTip}
                          stroke="#0A3323"
                          strokeWidth="3.5"
                          strokeLinejoin="round"
                        />
                        <motion.g
                          animate={{ y: [3, -5, 3], scale: [1.08, 0.94, 1.08] }}
                          transition={pelvisTransition}
                        >
                          <rect
                            x="-16"
                            y="-44"
                            width="32"
                            height="34"
                            rx="10"
                            fill="#0F172A"
                            stroke="#38BDF8"
                            strokeWidth="3.2"
                          />
                          <text
                            x="0"
                            y="-20"
                            textAnchor="middle"
                            fill="#38BDF8"
                            style={{
                              fontFamily: '"Fredoka", "JetBrains Mono", sans-serif',
                              fontWeight: 900,
                              fontSize: '22px',
                            }}
                          >
                            6
                          </text>
                        </motion.g>
                      </g>
                    </motion.g>
                  </g>

                  <g transform="translate(136, 110)">
                    <motion.g
                      animate={{
                        y: [-13, 11, -13],
                        rotate: [14, -10, 14],
                      }}
                      transition={pelvisTransition}
                    >
                      <path
                        d="M0 -4 C14 4 18 18 8 26 C-2 30 -14 24 -16 14 C-10 8 -4 2 0 -4 Z"
                        fill={palette.body}
                        stroke="#0A3323"
                        strokeWidth="3.8"
                        strokeLinejoin="round"
                      />
                      <g transform="translate(-4, 20)">
                        <path
                          d="M-18 -2 C-14 10 14 10 18 -2 C12 -6 -12 -6 -18 -2 Z"
                          fill={palette.wingTip}
                          stroke="#0A3323"
                          strokeWidth="3.5"
                          strokeLinejoin="round"
                        />
                        <motion.g
                          animate={{ y: [-5, 3, -5], scale: [0.94, 1.08, 0.94] }}
                          transition={pelvisTransition}
                        >
                          <rect
                            x="-16"
                            y="-44"
                            width="32"
                            height="34"
                            rx="10"
                            fill="#0F172A"
                            stroke="#FBBF24"
                            strokeWidth="3.2"
                          />
                          <text
                            x="0"
                            y="-20"
                            textAnchor="middle"
                            fill="#FBBF24"
                            style={{
                              fontFamily: '"Fredoka", "JetBrains Mono", sans-serif',
                              fontWeight: 900,
                              fontSize: '22px',
                            }}
                          >
                            7
                          </text>
                        </motion.g>
                      </g>
                    </motion.g>
                  </g>
                </g>
              )}

              {/* 2) ELOTE DORADO FIESTA ("FIESTA DEL ELOTE DORADO") */}
              {currentEmote === 'elote_fiesta' && (
                <g id="elote-fiesta-arms-and-golden-corn">
                  {/* Left Wing Dancing */}
                  <g transform="translate(64, 110)">
                    <motion.g
                      animate={{ rotate: [-28, 18, -28], y: [-4, 4, -4] }}
                      transition={pelvisTransition}
                    >
                      <path
                        d="M0 -4 C-18 0 -26 14 -18 26 C-8 30 6 22 10 10 Z"
                        fill={palette.wingTip}
                        stroke="#0A3323"
                        strokeWidth="3.8"
                        strokeLinejoin="round"
                      />
                    </motion.g>
                  </g>

                  {/* Right Wing Holding a Prepared Mexican Golden Elote on a Stick! */}
                  <g transform="translate(136, 108)">
                    <motion.g
                      animate={{ rotate: [-18, 24, -18], y: [-8, 4, -8] }}
                      transition={pelvisTransition}
                    >
                      <path
                        d="M-2 -4 C14 -2 26 8 24 20 C16 26 2 20 -6 8 Z"
                        fill={palette.wingTip}
                        stroke="#0A3323"
                        strokeWidth="3.8"
                        strokeLinejoin="round"
                      />
                      {/* Prepared Mexican Elote Dorado on Wooden Stick */}
                      <g transform="translate(24, -8)">
                        {/* Stick */}
                        <rect
                          x="-2.5"
                          y="12"
                          width="5"
                          height="16"
                          rx="2"
                          fill="#D97706"
                          stroke="#0A3323"
                          strokeWidth="2"
                        />
                        {/* Green Corn Husks */}
                        <path
                          d="M-12 14 C-16 4 -6 -2 0 4 C6 -2 16 4 12 14 Z"
                          fill="#16A34A"
                          stroke="#0A3323"
                          strokeWidth="2.5"
                        />
                        {/* Golden Corn Cob */}
                        <ellipse
                          cx="0"
                          cy="-4"
                          rx="10"
                          ry="17"
                          fill="#FACC15"
                          stroke="#0A3323"
                          strokeWidth="3"
                        />
                        {/* Crema / Mayonesa & Queso Cotija Toppings + Tajín Chili Specs */}
                        <path
                          d="M-6 -12 Q0 -8 6 -12 M-7 -4 Q0 0 7 -4 M-6 4 Q0 8 6 4"
                          stroke="#FEFCE8"
                          strokeWidth="3"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <circle cx="-3" cy="-9" r="1.8" fill="#DC2626" />
                        <circle cx="3" cy="-5" r="1.8" fill="#DC2626" />
                        <circle cx="-2" cy="1" r="1.8" fill="#DC2626" />
                        <circle cx="2" cy="5" r="1.8" fill="#DC2626" />
                      </g>
                    </motion.g>
                  </g>
                </g>
              )}

              {/* 3) PASO GRIDDY ("GRIDDY GOGGLES & HEEL TAPS") */}
              {currentEmote === 'griddy_step' && (
                <g id="griddy-goggles-arms">
                  <g transform="translate(64, 106)">
                    <motion.g
                      animate={{ y: [-18, 8, -18], rotate: [-24, 12, -24] }}
                      transition={pelvisTransition}
                    >
                      <path
                        d="M0 0 C-12 -10 -6 -28 10 -28 C18 -26 18 -12 8 -2 Z"
                        fill={palette.wingTip}
                        stroke="#0A3323"
                        strokeWidth="3.8"
                      />
                      <circle
                        cx="10"
                        cy="-24"
                        r="8"
                        fill="none"
                        stroke="#A855F7"
                        strokeWidth="3.5"
                      />
                    </motion.g>
                  </g>
                  <g transform="translate(136, 106)">
                    <motion.g
                      animate={{ y: [-18, 8, -18], rotate: [24, -12, 24] }}
                      transition={pelvisTransition}
                    >
                      <path
                        d="M0 0 C12 -10 6 -28 -10 -28 C-18 -26 -18 -12 -8 -2 Z"
                        fill={palette.wingTip}
                        stroke="#0A3323"
                        strokeWidth="3.8"
                      />
                      <circle
                        cx="-10"
                        cy="-24"
                        r="8"
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="3.5"
                      />
                    </motion.g>
                  </g>
                </g>
              )}

              {/* 4) HANDSOME FOX */}
              {currentEmote === 'handsome_fox' && (
                <g id="handsome-fox-hand-on-mouth-and-side-wave">
                  <g transform="translate(64, 110)">
                    <motion.g
                      animate={{
                        rotate: [-2.5, 3.5, -2.5],
                        y: [1, -2, 1],
                      }}
                      transition={pelvisTransition}
                    >
                      <path
                        d="M-2 -2 C-16 8 -10 24 6 18 C18 12 28 0 34 -12 C24 -18 14 -10 4 -2 Z"
                        fill={palette.body}
                        stroke="#0A3323"
                        strokeWidth="3.8"
                        strokeLinejoin="round"
                      />
                      <g transform="translate(35, -15)">
                        <path
                          d="M-11 -6 C-6 -14 8 -14 12 -4 C14 4 4 10 -6 6 C-12 4 -14 -1 -11 -6 Z"
                          fill={palette.wingTip}
                          stroke="#0A3323"
                          strokeWidth="3.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M-5 -6 L3 -6 M-6 -1 L4 -1"
                          stroke="#0A3323"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                      </g>
                    </motion.g>
                  </g>

                  <g transform="translate(136, 110)">
                    <motion.g
                      animate={{
                        x: [-14, 18, -14],
                        rotate: [28, -36, 28],
                        y: [2, -3, 2],
                      }}
                      transition={{
                        duration: pelvisCycleDuration * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <path
                        d="M-2 -4 C12 -2 24 8 22 20 C14 26 0 20 -8 10 Z"
                        fill={palette.body}
                        stroke="#0A3323"
                        strokeWidth="3.8"
                        strokeLinejoin="round"
                      />
                      <g transform="translate(18, 16)">
                        <path
                          d="M-6 -4 C4 -12 20 -8 22 4 C18 14 2 14 -8 4 Z"
                          fill={palette.wingTip}
                          stroke="#0A3323"
                          strokeWidth="3.5"
                          strokeLinejoin="round"
                        />
                      </g>
                    </motion.g>
                  </g>
                </g>
              )}

              {/* 5) CLOWN DANCE */}
              {currentEmote === 'clown_dance' && (
                <g id="clown-dance-marionette-arms">
                  <g transform="translate(64, 108)">
                    <motion.g
                      animate={{
                        rotate: [-34, 28, -34],
                        y: [-5, 5, -5],
                      }}
                      transition={pelvisTransition}
                    >
                      <path
                        d="M2 -4 C-12 -4 -24 2 -26 14 C-20 22 -6 18 4 8 Z"
                        fill={palette.body}
                        stroke="#0A3323"
                        strokeWidth="3.8"
                        strokeLinejoin="round"
                      />
                      <g transform="translate(-22, 10)">
                        <path
                          d="M4 2 C-8 -10 -22 -14 -24 -2 C-22 10 -6 14 6 6 Z"
                          fill={palette.wingTip}
                          stroke="#0A3323"
                          strokeWidth="3.5"
                          strokeLinejoin="round"
                        />
                      </g>
                    </motion.g>
                  </g>

                  <g transform="translate(136, 108)">
                    <motion.g
                      animate={{
                        rotate: [-28, 34, -28],
                        y: [5, -5, 5],
                      }}
                      transition={pelvisTransition}
                    >
                      <path
                        d="M-2 -4 C12 -4 24 2 26 14 C20 22 6 18 -4 8 Z"
                        fill={palette.body}
                        stroke="#0A3323"
                        strokeWidth="3.8"
                        strokeLinejoin="round"
                      />
                      <g transform="translate(22, 10)">
                        <path
                          d="M-4 2 C8 -10 22 -14 24 -2 C22 10 6 14 -6 6 Z"
                          fill={palette.wingTip}
                          stroke="#0A3323"
                          strokeWidth="3.5"
                          strokeLinejoin="round"
                        />
                      </g>
                    </motion.g>
                  </g>
                </g>
              )}

              {/* 6) FLOSS DANCE */}
              {currentEmote === 'floss_dance' && (
                <g id="floss-front-arms">
                  <g transform="translate(68, 108)">
                    <motion.g
                      animate={{
                        rotate: [-34, 0, 28, 0, -34],
                        x: [16, 0, -14, 0, 16],
                      }}
                      transition={pelvisTransition}
                    >
                      <path
                        d="M-6 -2 C-10 18 -6 36 2 46 C12 48 18 40 14 26 L6 -2 Z"
                        fill={palette.body}
                        stroke="#0A3323"
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="7"
                        cy="44"
                        r="8.5"
                        fill={palette.wingTip}
                        stroke="#0A3323"
                        strokeWidth="3.5"
                      />
                    </motion.g>
                  </g>

                  <g transform="translate(132, 108)">
                    <motion.g
                      animate={{
                        rotate: [-28, 0, 34, 0, -28],
                        x: [14, 0, -16, 0, 14],
                      }}
                      transition={pelvisTransition}
                    >
                      <path
                        d="M-6 -2 L-14 26 C-18 40 -12 48 -2 46 C6 36 10 18 6 -2 Z"
                        fill={palette.body}
                        stroke="#0A3323"
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="-7"
                        cy="44"
                        r="8.5"
                        fill={palette.wingTip}
                        stroke="#0A3323"
                        strokeWidth="3.5"
                      />
                    </motion.g>
                  </g>
                </g>
              )}

              {/* 7) RUSSIAN DANCE */}
              {currentEmote === 'russian_dance' && (
                <g transform="translate(100, 118)">
                  <motion.g
                    animate={{ y: [-2, 3, -2, 3, -2], scaleX: [1, 1.04, 1, 1.04, 1] }}
                    transition={pelvisTransition}
                  >
                    <g transform="translate(-100, -118)">
                      <path
                        d="M60 112 C78 104 114 106 136 122 C122 132 82 132 60 112 Z"
                        fill={palette.wingTip}
                        stroke="#0A3323"
                        strokeWidth="3.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M140 112 C122 104 86 106 64 122 C78 132 118 132 140 112 Z"
                        fill={palette.body}
                        stroke="#0A3323"
                        strokeWidth="3.8"
                        strokeLinejoin="round"
                      />
                    </g>
                  </motion.g>
                </g>
              )}
            </g>
          </motion.g>
        </g>
      </svg>
    </div>
  );
};
