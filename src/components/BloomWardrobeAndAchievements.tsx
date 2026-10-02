import React from 'react';
import {
  Lock,
  Unlock,
  Check,
  Shirt,
  Sparkles,
  Trophy,
  Award,
  ArrowRight,
  X,
  Shield,
  Flame,
} from 'lucide-react';
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
} from './BloomMascot';
import { soundFX } from '../utils/soundEffects';

export const SHIRT_UNLOCK_LESSON = 2;
export const HOODIE_UNLOCK_LESSON = 6;
export const JACKET_UNLOCK_LESSON = 12;
export const ARMOR_UNLOCK_LESSON = 18;

export interface LessonRewardMilestone {
  lessonCount: number;
  type: 'emote' | 'clothing';
  title: string;
  badgeText: string;
  accentClass: string;
}

export const LESSON_REWARD_MILESTONES: Record<number, LessonRewardMilestone> = {
  1: {
    lessonCount: 1,
    type: 'emote',
    title: 'Six Seven',
    badgeText: '1er Emote: Six Seven',
    accentClass: 'bg-[#0F172A] border-[#38BDF8] text-[#38BDF8]',
  },
  2: {
    lessonCount: 2,
    type: 'clothing',
    title: 'Playera Casual “Capital Bloom”',
    badgeText: '1ª Prenda: Playera Casual Capital Bloom',
    accentClass: 'bg-[#181B20] border-[#FFB72B] text-[#FFD166]',
  },
  4: {
    lessonCount: 4,
    type: 'emote',
    title: 'Paso Floss',
    badgeText: '2do Emote: Paso Floss',
    accentClass: 'bg-[#064E3B] border-[#34D399] text-[#A7F3D0]',
  },
  6: {
    lessonCount: 6,
    type: 'clothing',
    title: 'Hoodie Asimétrica Cyber-Quetzal de Neobioma',
    badgeText: '2ª Prenda: Hoodie Cyber-Quetzal de Neobioma',
    accentClass: 'bg-[#0F172A] border-[#34D399] text-[#A7F3D0]',
  },
  9: {
    lessonCount: 9,
    type: 'emote',
    title: 'Zorro Guapo',
    badgeText: '3er Emote: Zorro Guapo',
    accentClass: 'bg-[#1E293B] border-[#F59E0B] text-[#FDE68A]',
  },
  12: {
    lessonCount: 12,
    type: 'clothing',
    title: 'Chamarra Visor de Exploradora Astral',
    badgeText: '3ª Prenda: Chamarra Visor de Exploradora Astral',
    accentClass: 'bg-[#1E1B4B] border-[#F59E0B] text-[#FDE68A]',
  },
  15: {
    lessonCount: 15,
    type: 'emote',
    title: 'Cara Phonk',
    badgeText: '4to Emote: Cara Phonk',
    accentClass: 'bg-[#3B0764] border-[#E879F9] text-[#F5D0FE]',
  },
  18: {
    lessonCount: 18,
    type: 'clothing',
    title: 'Armadura Cúbica de Diamante',
    badgeText: '4ª Prenda: Armadura Cúbica de Diamante',
    accentClass: 'bg-[#083344] border-[#22D3EE] text-[#67E8F9]',
  },
  21: {
    lessonCount: 21,
    type: 'emote',
    title: 'Payaso Bailarín',
    badgeText: '5to Emote: Payaso Bailarín',
    accentClass: 'bg-[#450A0A] border-[#EF4444] text-[#FECACA]',
  },
  24: {
    lessonCount: 24,
    type: 'emote',
    title: 'Baile Ruso',
    badgeText: 'Último Emote: Baile Ruso',
    accentClass: 'bg-[#450A0A] border-[#F59E0B] text-[#FDE68A]',
  },
};

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  rewardLabel: string;
  targetLessons: number;
  currentProgress: number;
  unlocked: boolean;
  accentHex: string;
}

export function getBloomAchievements(
  completedLessonsCount: number,
  protectedCapitalMXN: number
): AchievementItem[] {
  return [
    {
      id: 'ach-1',
      title: 'Primer Aleteo Financiero',
      description: 'Completa tu primera lección interactiva en Capital Bloom.',
      rewardLabel: 'Desbloquea Emote: Six Seven',
      targetLessons: 1,
      currentProgress: completedLessonsCount,
      unlocked: completedLessonsCount >= 1,
      accentHex: '#38BDF8',
    },
    {
      id: 'ach-2',
      title: 'Estilo Capitán Bloom',
      description: 'Finaliza 2 lecciones para conseguir tu primera prenda oficial.',
      rewardLabel: 'Desbloquea 1ª Prenda: Playera Casual Capital Bloom',
      targetLessons: 2,
      currentProgress: completedLessonsCount,
      unlocked: completedLessonsCount >= 2,
      accentHex: '#FBBF24',
    },
    {
      id: 'ach-3',
      title: 'Ritmo en Contrafase',
      description: 'Avanza y termina 4 lecciones del camino.',
      rewardLabel: 'Desbloquea Emote: Paso Floss',
      targetLessons: 4,
      currentProgress: completedLessonsCount,
      unlocked: completedLessonsCount >= 4,
      accentHex: '#34D399',
    },
    {
      id: 'ach-4',
      title: 'Guardián del Primer Bioma',
      description: 'Completa 6 lecciones (1 bioma entero dominado).',
      rewardLabel: 'Desbloquea 2ª Prenda: Hoodie Asimétrica Cyber-Quetzal',
      targetLessons: 6,
      currentProgress: completedLessonsCount,
      unlocked: completedLessonsCount >= 6,
      accentHex: '#10B981',
    },
    {
      id: 'ach-5',
      title: 'Aura de Abundancia',
      description: 'Alcanza 9 lecciones completadas con disciplina.',
      rewardLabel: 'Desbloquea Emote: Zorro Guapo',
      targetLessons: 9,
      currentProgress: completedLessonsCount,
      unlocked: completedLessonsCount >= 9,
      accentHex: '#F59E0B',
    },
    {
      id: 'ach-6',
      title: 'Exploradora de Cumbres',
      description: 'Completa 12 lecciones (2 biomas completos).',
      rewardLabel: 'Desbloquea 3ª Prenda: Chamarra Visor de Exploradora Astral',
      targetLessons: 12,
      currentProgress: completedLessonsCount,
      unlocked: completedLessonsCount >= 12,
      accentHex: '#818CF8',
    },
    {
      id: 'ach-7',
      title: 'Paso Firme Sigma',
      description: 'Supera 15 lecciones financieras.',
      rewardLabel: 'Desbloquea Emote: Cara Phonk',
      targetLessons: 15,
      currentProgress: completedLessonsCount,
      unlocked: completedLessonsCount >= 15,
      accentHex: '#E879F9',
    },
    {
      id: 'ach-8',
      title: 'Fortaleza Cúbica de Diamante',
      description: 'Completa 18 lecciones (3 biomas completos) para obtener la última prenda.',
      rewardLabel: 'Desbloquea 4ª Prenda: Armadura Cúbica de Diamante',
      targetLessons: 18,
      currentProgress: completedLessonsCount,
      unlocked: completedLessonsCount >= 18,
      accentHex: '#22D3EE',
    },
    {
      id: 'ach-9',
      title: 'Energía Imparable',
      description: 'Llega a 21 lecciones resueltas.',
      rewardLabel: 'Desbloquea Emote: Payaso Bailarín',
      targetLessons: 21,
      currentProgress: completedLessonsCount,
      unlocked: completedLessonsCount >= 21,
      accentHex: '#EF4444',
    },
    {
      id: 'ach-10',
      title: 'Leyenda del Baile Ruso',
      description: 'Completa 24 lecciones (4 biomas) para conseguir el emote más padre.',
      rewardLabel: 'Desbloquea Último Emote: Baile Ruso',
      targetLessons: 24,
      currentProgress: completedLessonsCount,
      unlocked: completedLessonsCount >= 24,
      accentHex: '#F97316',
    },
    {
      id: 'ach-11',
      title: 'Escudo Anti-Impulsos MXN',
      description: 'Protege al menos $2,000 MXN frente a compras impulsivas en lecciones.',
      rewardLabel: 'Insignia de Resiliencia Patrimonial',
      targetLessons: 2000,
      currentProgress: protectedCapitalMXN,
      unlocked: protectedCapitalMXN >= 2000,
      accentHex: '#2F7D5B',
    },
    {
      id: 'ach-12',
      title: 'Maestro de los 14 Biomas',
      description: 'Completa las 84 lecciones del Atlas de Capital Bloom.',
      rewardLabel: 'Corona de Sabiduría Financiera Total',
      targetLessons: 84,
      currentProgress: completedLessonsCount,
      unlocked: completedLessonsCount >= 84,
      accentHex: '#A855F7',
    },
  ];
}

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

interface BloomAchievementsSectionProps {
  completedLessonsCount: number;
  protectedCapitalMXN: number;
  onGoToNextLesson: () => void;
  onOpenFullModal?: () => void;
  compact?: boolean;
}

export const BloomAchievementsSection: React.FC<BloomAchievementsSectionProps> = ({
  completedLessonsCount,
  protectedCapitalMXN,
  onGoToNextLesson,
  onOpenFullModal,
  compact = false,
}) => {
  const achievements = getBloomAchievements(completedLessonsCount, protectedCapitalMXN);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const visibleList = compact ? achievements.slice(0, 6) : achievements;

  return (
    <div className="p-5 rounded-3xl bg-gradient-to-br from-[#FEF3C7] via-[#F8FBCA] to-[#F1D7FF] border-2 border-[#0A3323] border-b-6 space-y-4 shadow-md">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#0A3323] text-[#FFD166] flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono font-extrabold text-[#734A91] uppercase">
              RECOMPENSAS POR LECCIÓN
            </p>
            <h3 className="text-base font-semibold text-[#0A3323] font-display">
              Sección de Logros ({unlockedCount}/{achievements.length})
            </h3>
          </div>
        </div>

        {compact && onOpenFullModal && (
          <button
            onClick={() => {
              soundFX.playTap();
              onOpenFullModal();
            }}
            className="px-3 py-1.5 rounded-xl bg-[#0A3323] text-[#F8FBCA] text-[11px] font-extrabold cursor-pointer hover:bg-[#145A3A] shrink-0"
          >
            Ver Todos
          </button>
        )}
      </div>

      {/* Overall Achievement Progress Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs font-extrabold text-[#0A3323]">
          <span>Progreso Total de Logros</span>
          <span className="font-mono text-[#145A3A]">
            {unlockedCount} / {achievements.length} Desbloqueados
          </span>
        </div>
        <div className="h-3 rounded-full bg-white border-2 border-[#0A3323] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#F59E0B] via-[#10B981] to-[#38BDF8] transition-all"
            style={{ width: `${Math.round((unlockedCount / achievements.length) * 100)}%` }}
          />
        </div>
      </div>

      <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-2.5`}>
        {visibleList.map((ach) => {
          const pct = Math.min(100, Math.round((ach.currentProgress / ach.targetLessons) * 100));
          return (
            <div
              key={ach.id}
              className={`p-3.5 rounded-2xl border-2 flex flex-col justify-between gap-2 transition-all ${
                ach.unlocked
                  ? 'bg-white border-[#0A3323] border-b-4 shadow-xs'
                  : 'bg-white/65 border-[#0A3323]/45 opacity-90'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-extrabold text-[#0A3323]">
                    <Award className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>
                      {ach.id === 'ach-11'
                        ? `$${ach.currentProgress}/$${ach.targetLessons}`
                        : `Lecciones: ${Math.min(ach.currentProgress, ach.targetLessons)}/${ach.targetLessons}`}
                    </span>
                  </span>
                  {ach.unlocked ? (
                    <span className="px-2 py-0.5 rounded-full bg-[#2F7D5B] text-[#F8FBCA] text-[9px] font-mono font-extrabold flex items-center gap-1">
                      <Unlock className="w-2.5 h-2.5" />
                      <span>LOGRADO</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-[#8F6277] text-white text-[9px] font-mono font-extrabold flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      <span>CANDADO</span>
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-extrabold text-[#0A3323]">{ach.title}</h4>
                <p className="text-[11px] text-[#0A3323]/80 leading-snug">{ach.description}</p>
              </div>

              <div className="space-y-1.5 pt-1 border-t border-[#0A3323]/10">
                <p className="text-[10px] font-mono font-extrabold text-[#145A3A]">
                  🎁 {ach.rewardLabel}
                </p>
                <div className="h-2 rounded-full bg-[#0A3323]/10 overflow-hidden border border-[#0A3323]/30">
                  <div
                    className="h-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: ach.accentHex }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <p className="text-[11px] font-bold text-[#0A3323]">
          Completa lecciones para desbloquear todos los logros, emotes y ropa de Bloom.
        </p>
        <button
          onClick={() => {
            soundFX.playTap();
            onGoToNextLesson();
          }}
          className="px-3.5 py-2 rounded-xl bg-[#2F7D5B] text-[#F8FBCA] border-2 border-[#0A3323] border-b-4 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer hover:bg-[#145A3A]"
        >
          <span>Ir a la siguiente lección</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

interface BloomWardrobeModalProps {
  plumage: PlumageTheme;
  activeEmote: BloomEmoteId;
  equippedSkin: EquippedSkinId;
  onSelectEquippedSkin: (skin: EquippedSkinId) => void;
  shirtColor: CasualShirtColor;
  onSelectShirtColor: (c: CasualShirtColor) => void;
  hoodieVariant: HoodieVariant;
  onSelectHoodieVariant: (v: HoodieVariant) => void;
  jacketVariant: JacketVariant;
  onSelectJacketVariant: (v: JacketVariant) => void;
  armorVariant: ArmorVariant;
  onSelectArmorVariant: (v: ArmorVariant) => void;
  completedLessonsCount: number;
  onGoToNextLesson: () => void;
  onClose: () => void;
}

export const BloomWardrobeModal: React.FC<BloomWardrobeModalProps> = ({
  plumage,
  activeEmote,
  equippedSkin,
  onSelectEquippedSkin,
  shirtColor,
  onSelectShirtColor,
  hoodieVariant,
  onSelectHoodieVariant,
  jacketVariant,
  onSelectJacketVariant,
  armorVariant,
  onSelectArmorVariant,
  completedLessonsCount,
  onGoToNextLesson,
  onClose,
}) => {
  const isCasualShirtUnlocked = completedLessonsCount >= SHIRT_UNLOCK_LESSON;
  const isHoodieUnlocked = completedLessonsCount >= HOODIE_UNLOCK_LESSON;
  const isAstralJacketUnlocked = completedLessonsCount >= JACKET_UNLOCK_LESSON;
  const isDiamondArmorUnlocked = completedLessonsCount >= ARMOR_UNLOCK_LESSON;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A3323]/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wardrobe-modal-title"
    >
      <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-gradient-to-br from-[#F8FBCA] via-[#F9D6D5] to-[#F1D7FF] rounded-3xl border-3 border-[#0A3323] border-b-8 p-5 sm:p-6 shadow-2xl space-y-5 my-auto">
        <div className="flex items-start justify-between gap-4 pb-3 border-b-2 border-[#0A3323]/20">
          <div className="flex items-center gap-3">
            <BloomMascot
              size="md"
              plumage={plumage}
              emote={activeEmote}
              previewSkin={equippedSkin}
              shirtColor={shirtColor}
              hoodieVariant={hoodieVariant}
              jacketVariant={jacketVariant}
              armorVariant={armorVariant}
            />
            <div>
              <p className="text-xs font-extrabold text-[#145A3A]">
                Guardarropa Oficial · Se obtiene realizando lecciones
              </p>
              <h3
                id="wardrobe-modal-title"
                className="text-lg sm:text-xl font-semibold text-[#0A3323] font-display"
              >
                Ropa de Bloom ({completedLessonsCount} lecciones completadas)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-[#F8FBCA] border-2 border-[#0A3323] flex items-center justify-center text-[#0A3323] hover:bg-[#F6C8C7] cursor-pointer shrink-0"
            aria-label="Cerrar guardarropa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0A3323] text-[#F8FBCA] text-xs flex flex-wrap items-center justify-between gap-2">
          <span>
            ✨ Cada prenda se desbloquea únicamente al terminar tus lecciones en orden: 1ª Playera (L{SHIRT_UNLOCK_LESSON}), 2ª Hoodie (L{HOODIE_UNLOCK_LESSON}), 3ª Chamarra Visor (L{JACKET_UNLOCK_LESSON}) y 4ª Armadura de Diamante (L{ARMOR_UNLOCK_LESSON}).
          </span>
          {equippedSkin !== 'none' && (
            <button
              onClick={() => {
                soundFX.playTap();
                onSelectEquippedSkin('none');
              }}
              className="px-3 py-1 rounded-xl bg-[#8F6277] text-white font-extrabold cursor-pointer shrink-0"
            >
              Quitar ropa equipada
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* PRENDA 1: PLAYERA CASUAL CAPITAL BLOOM (LECCIÓN 2) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F8FBCA] via-white to-[#F1D7FF] border-2 border-[#0A3323] border-b-6 space-y-3.5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative p-3 rounded-2xl bg-[#0A3323]/10 border-2 border-[#0A3323] flex flex-col items-center justify-center shrink-0">
                <BloomMascot
                  size="lg"
                  plumage={plumage}
                  emote={activeEmote}
                  previewSkin="shirt"
                  shirtColor={shirtColor}
                />
                {!isCasualShirtUnlocked ? (
                  <span className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8F6277] text-white border border-[#0A3323] text-[10px] font-mono font-extrabold">
                    <Lock className="w-3 h-3" />
                    <span>CANDADO · {completedLessonsCount}/{SHIRT_UNLOCK_LESSON}</span>
                  </span>
                ) : (
                  <span className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2F7D5B] text-[#F8FBCA] border border-[#0A3323] text-[10px] font-mono font-extrabold">
                    <Unlock className="w-3 h-3" />
                    <span>DESBLOQUEADO</span>
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#181B20] text-[#FFD166] text-[10px] font-mono font-extrabold">
                    1ª PRENDA · LECCIÓN {SHIRT_UNLOCK_LESSON}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-[#0A3323]">
                  Playera Casual “Capital Bloom”
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono font-extrabold text-[#0A3323]">
                    <span>
                      {isCasualShirtUnlocked
                        ? `¡Desbloqueada al completar ${SHIRT_UNLOCK_LESSON} lecciones!`
                        : `Bloqueada (${completedLessonsCount}/${SHIRT_UNLOCK_LESSON} lecciones)`}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white border border-[#0A3323] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2F7D5B] to-[#839958] transition-all"
                      style={{
                        width: `${Math.min(100, (completedLessonsCount / SHIRT_UNLOCK_LESSON) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#0A3323]/15 space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SHIRT_COLOR_LIST.map((cKey) => {
                  const meta = SHIRT_COLOR_META[cKey];
                  const isPicked = shirtColor === cKey;
                  return (
                    <button
                      key={cKey}
                      onClick={() => {
                        soundFX.playTap();
                        onSelectShirtColor(cKey);
                      }}
                      className={`min-h-[38px] px-2.5 py-1.5 rounded-xl border-2 text-xs font-extrabold flex items-center justify-between gap-1.5 cursor-pointer ${
                        isPicked
                          ? 'bg-[#0A3323] text-[#F8FBCA] border-[#0A3323]'
                          : 'bg-white text-[#0A3323] border-[#0A3323]/60'
                      }`}
                    >
                      <span className="truncate">{meta.label}</span>
                      <span
                        className="w-4 h-4 rounded-full border border-[#0A3323] shrink-0"
                        style={{ backgroundColor: meta.swatchHex }}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-xs font-bold text-[#0A3323]">
                  {isCasualShirtUnlocked
                    ? 'Prenda desbloqueada y lista para usar:'
                    : `Termina ${SHIRT_UNLOCK_LESSON} lecciones para poder usar esta playera:`}
                </span>
                {isCasualShirtUnlocked ? (
                  <button
                    onClick={() => {
                      soundFX.playSuccess();
                      onSelectEquippedSkin(equippedSkin === 'shirt' ? 'none' : 'shirt');
                    }}
                    className={`min-h-[40px] px-4 py-2 rounded-xl border-2 text-xs font-extrabold cursor-pointer flex items-center gap-1.5 ${
                      equippedSkin === 'shirt'
                        ? 'bg-[#2F7D5B] text-[#F8FBCA] border-[#0A3323] border-b-4'
                        : 'bg-[#0A3323] text-[#F8FBCA] border-[#0A3323]'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{equippedSkin === 'shirt' ? 'Equipada (Quitar)' : 'Usar Playera'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      soundFX.playTap();
                      onClose();
                      onGoToNextLesson();
                    }}
                    className="min-h-[40px] px-4 py-2 rounded-xl bg-[#181B20] text-[#FFD166] border-2 border-[#0A3323] border-b-4 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Ir a Lección ({completedLessonsCount}/{SHIRT_UNLOCK_LESSON})</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* PRENDA 2: HOODIE ASIMÉTRICA CYBER-QUETZAL DE NEOBIOMA (LECCIÓN 6) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#ECFDF5] via-white to-[#E0F2FE] border-2 border-[#0A3323] border-b-6 space-y-3.5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative p-3 rounded-2xl bg-[#0F172A]/10 border-2 border-[#0A3323] flex flex-col items-center justify-center shrink-0">
                <BloomMascot
                  size="lg"
                  plumage={plumage}
                  emote={activeEmote}
                  previewSkin="hoodie"
                  hoodieVariant={hoodieVariant}
                />
                {!isHoodieUnlocked ? (
                  <span className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8F6277] text-white border border-[#0A3323] text-[10px] font-mono font-extrabold">
                    <Lock className="w-3 h-3" />
                    <span>CANDADO · {completedLessonsCount}/{HOODIE_UNLOCK_LESSON}</span>
                  </span>
                ) : (
                  <span className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2F7D5B] text-[#F8FBCA] border border-[#0A3323] text-[10px] font-mono font-extrabold">
                    <Unlock className="w-3 h-3" />
                    <span>DESBLOQUEADO</span>
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#0F172A] text-[#34D399] text-[10px] font-mono font-extrabold">
                  2ª PRENDA · LECCIÓN {HOODIE_UNLOCK_LESSON}
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-[#0A3323]">
                  Hoodie Asimétrica Cyber-Quetzal de Neobioma
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono font-extrabold text-[#0A3323]">
                    <span>
                      {isHoodieUnlocked
                        ? `¡Desbloqueada al completar ${HOODIE_UNLOCK_LESSON} lecciones!`
                        : `Bloqueada (${completedLessonsCount}/${HOODIE_UNLOCK_LESSON} lecciones)`}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white border border-[#0A3323] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0F172A] via-[#10B981] to-[#34D399] transition-all"
                      style={{
                        width: `${Math.min(100, (completedLessonsCount / HOODIE_UNLOCK_LESSON) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#0A3323]/15 space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HOODIE_VARIANT_LIST.map((hKey) => {
                  const meta = HOODIE_VARIANT_META[hKey];
                  const isPicked = hoodieVariant === hKey;
                  return (
                    <button
                      key={hKey}
                      onClick={() => {
                        soundFX.playTap();
                        onSelectHoodieVariant(hKey);
                      }}
                      className={`min-h-[38px] px-2.5 py-1.5 rounded-xl border-2 text-xs font-extrabold flex items-center justify-between gap-1.5 cursor-pointer ${
                        isPicked
                          ? 'bg-[#0F172A] text-[#34D399] border-[#0A3323]'
                          : 'bg-white text-[#0A3323] border-[#0A3323]/60'
                      }`}
                    >
                      <span className="truncate">{meta.label}</span>
                      <span
                        className="w-4 h-4 rounded-full border border-[#0A3323] shrink-0"
                        style={{ backgroundColor: meta.swatchHex }}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-xs font-bold text-[#0A3323]">
                  {isHoodieUnlocked
                    ? 'Prenda desbloqueada y lista para usar:'
                    : `Termina ${HOODIE_UNLOCK_LESSON} lecciones para poder usar esta hoodie:`}
                </span>
                {isHoodieUnlocked ? (
                  <button
                    onClick={() => {
                      soundFX.playSuccess();
                      onSelectEquippedSkin(equippedSkin === 'hoodie' ? 'none' : 'hoodie');
                    }}
                    className={`min-h-[40px] px-4 py-2 rounded-xl border-2 text-xs font-extrabold cursor-pointer flex items-center gap-1.5 ${
                      equippedSkin === 'hoodie'
                        ? 'bg-[#0F172A] text-[#34D399] border-[#0A3323] border-b-4'
                        : 'bg-[#0A3323] text-[#F8FBCA] border-[#0A3323]'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{equippedSkin === 'hoodie' ? 'Equipada (Quitar)' : 'Usar Hoodie'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      soundFX.playTap();
                      onClose();
                      onGoToNextLesson();
                    }}
                    className="min-h-[40px] px-4 py-2 rounded-xl bg-[#181B20] text-[#FFD166] border-2 border-[#0A3323] border-b-4 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Ir a Lección ({completedLessonsCount}/{HOODIE_UNLOCK_LESSON})</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* PRENDA 3: CHAMARRA VISOR DE EXPLORADORA ASTRAL (LECCIÓN 12) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FEF3C7] via-white to-[#E0E7FF] border-2 border-[#0A3323] border-b-6 space-y-3.5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative p-3 rounded-2xl bg-[#1E1B4B]/10 border-2 border-[#0A3323] flex flex-col items-center justify-center shrink-0">
                <BloomMascot
                  size="lg"
                  plumage={plumage}
                  emote={activeEmote}
                  previewSkin="astral_jacket"
                  jacketVariant={jacketVariant}
                />
                {!isAstralJacketUnlocked ? (
                  <span className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8F6277] text-white border border-[#0A3323] text-[10px] font-mono font-extrabold">
                    <Lock className="w-3 h-3" />
                    <span>CANDADO · {completedLessonsCount}/{JACKET_UNLOCK_LESSON}</span>
                  </span>
                ) : (
                  <span className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2F7D5B] text-[#F8FBCA] border border-[#0A3323] text-[10px] font-mono font-extrabold">
                    <Unlock className="w-3 h-3" />
                    <span>DESBLOQUEADO</span>
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#1E1B4B] text-[#FBBF24] text-[10px] font-mono font-extrabold">
                  3ª PRENDA · LECCIÓN {JACKET_UNLOCK_LESSON}
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-[#0A3323]">
                  Chamarra Visor de Exploradora Astral
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono font-extrabold text-[#0A3323]">
                    <span>
                      {isAstralJacketUnlocked
                        ? `¡Desbloqueada al completar ${JACKET_UNLOCK_LESSON} lecciones!`
                        : `Bloqueada (${completedLessonsCount}/${JACKET_UNLOCK_LESSON} lecciones)`}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white border border-[#0A3323] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1E1B4B] via-[#4F46E5] to-[#F59E0B] transition-all"
                      style={{
                        width: `${Math.min(100, (completedLessonsCount / JACKET_UNLOCK_LESSON) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#0A3323]/15 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {JACKET_VARIANT_LIST.map((jKey) => {
                  const meta = JACKET_VARIANT_META[jKey];
                  const isPicked = jacketVariant === jKey;
                  return (
                    <button
                      key={jKey}
                      onClick={() => {
                        soundFX.playTap();
                        onSelectJacketVariant(jKey);
                      }}
                      className={`min-h-[38px] px-2.5 py-1.5 rounded-xl border-2 text-xs font-extrabold flex items-center justify-between gap-1.5 cursor-pointer ${
                        isPicked
                          ? 'bg-[#1E1B4B] text-[#FDE68A] border-[#0A3323]'
                          : 'bg-white text-[#0A3323] border-[#0A3323]/60'
                      }`}
                    >
                      <span className="truncate">{meta.label}</span>
                      <span
                        className="w-4 h-4 rounded-full border border-[#0A3323] shrink-0"
                        style={{ backgroundColor: meta.swatchHex }}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-xs font-bold text-[#0A3323]">
                  {isAstralJacketUnlocked
                    ? 'Prenda desbloqueada y lista para usar:'
                    : `Termina ${JACKET_UNLOCK_LESSON} lecciones para poder usar esta chamarra:`}
                </span>
                {isAstralJacketUnlocked ? (
                  <button
                    onClick={() => {
                      soundFX.playSuccess();
                      onSelectEquippedSkin(
                        equippedSkin === 'astral_jacket' ? 'none' : 'astral_jacket'
                      );
                    }}
                    className={`min-h-[40px] px-4 py-2 rounded-xl border-2 text-xs font-extrabold cursor-pointer flex items-center gap-1.5 ${
                      equippedSkin === 'astral_jacket'
                        ? 'bg-[#1E1B4B] text-[#FDE68A] border-[#0A3323] border-b-4'
                        : 'bg-[#0A3323] text-[#F8FBCA] border-[#0A3323]'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>
                      {equippedSkin === 'astral_jacket' ? 'Equipada (Quitar)' : 'Usar Chamarra'}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      soundFX.playTap();
                      onClose();
                      onGoToNextLesson();
                    }}
                    className="min-h-[40px] px-4 py-2 rounded-xl bg-[#181B20] text-[#FFD166] border-2 border-[#0A3323] border-b-4 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Ir a Lección ({completedLessonsCount}/{JACKET_UNLOCK_LESSON})</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* PRENDA 4: ARMADURA CÚBICA DE DIAMANTE (LECCIÓN 18 · ÚLTIMA PRENDA) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#ECFEFF] via-white to-[#CFFAFE] border-2 border-[#0A3323] border-b-6 space-y-3.5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative p-3 rounded-2xl bg-[#083344]/15 border-2 border-[#0A3323] flex flex-col items-center justify-center shrink-0">
                <BloomMascot
                  size="lg"
                  plumage={plumage}
                  emote={activeEmote}
                  previewSkin="diamond_armor"
                  armorVariant={armorVariant}
                />
                {!isDiamondArmorUnlocked ? (
                  <span className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8F6277] text-white border border-[#0A3323] text-[10px] font-mono font-extrabold">
                    <Lock className="w-3 h-3" />
                    <span>CANDADO · {completedLessonsCount}/{ARMOR_UNLOCK_LESSON}</span>
                  </span>
                ) : (
                  <span className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2F7D5B] text-[#F8FBCA] border border-[#0A3323] text-[10px] font-mono font-extrabold">
                    <Unlock className="w-3 h-3" />
                    <span>DESBLOQUEADO</span>
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#083344] text-[#67E8F9] text-[10px] font-mono font-extrabold">
                  4ª Y ÚLTIMA PRENDA · LECCIÓN {ARMOR_UNLOCK_LESSON}
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-[#0A3323]">
                  Armadura Cúbica de Diamante
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono font-extrabold text-[#0A3323]">
                    <span>
                      {isDiamondArmorUnlocked
                        ? `¡Desbloqueada al completar ${ARMOR_UNLOCK_LESSON} lecciones!`
                        : `Bloqueada (${completedLessonsCount}/${ARMOR_UNLOCK_LESSON} lecciones)`}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white border border-[#0A3323] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#083344] via-[#06B6D4] to-[#67E8F9] transition-all"
                      style={{
                        width: `${Math.min(100, (completedLessonsCount / ARMOR_UNLOCK_LESSON) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#0A3323]/15 space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ARMOR_VARIANT_LIST.map((aKey) => {
                  const meta = ARMOR_VARIANT_META[aKey];
                  const isPicked = armorVariant === aKey;
                  return (
                    <button
                      key={aKey}
                      onClick={() => {
                        soundFX.playTap();
                        onSelectArmorVariant(aKey);
                      }}
                      className={`min-h-[38px] px-2.5 py-1.5 rounded-xl border-2 text-xs font-extrabold flex items-center justify-between gap-1.5 cursor-pointer ${
                        isPicked
                          ? 'bg-[#083344] text-[#67E8F9] border-[#0A3323]'
                          : 'bg-white text-[#0A3323] border-[#0A3323]/60'
                      }`}
                    >
                      <span className="truncate">{meta.label}</span>
                      <span
                        className="w-4 h-4 rounded-xs border border-[#0A3323] shrink-0"
                        style={{ backgroundColor: meta.swatchHex }}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-xs font-bold text-[#0A3323]">
                  {isDiamondArmorUnlocked
                    ? 'Prenda desbloqueada y lista para usar:'
                    : `Termina ${ARMOR_UNLOCK_LESSON} lecciones para poder usar esta armadura:`}
                </span>
                {isDiamondArmorUnlocked ? (
                  <button
                    onClick={() => {
                      soundFX.playSuccess();
                      onSelectEquippedSkin(
                        equippedSkin === 'diamond_armor' ? 'none' : 'diamond_armor'
                      );
                    }}
                    className={`min-h-[40px] px-4 py-2 rounded-xl border-2 text-xs font-extrabold cursor-pointer flex items-center gap-1.5 ${
                      equippedSkin === 'diamond_armor'
                        ? 'bg-[#083344] text-[#67E8F9] border-[#0A3323] border-b-4'
                        : 'bg-[#0A3323] text-[#F8FBCA] border-[#0A3323]'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>
                      {equippedSkin === 'diamond_armor' ? 'Equipada (Quitar)' : 'Usar Armadura'}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      soundFX.playTap();
                      onClose();
                      onGoToNextLesson();
                    }}
                    className="min-h-[40px] px-4 py-2 rounded-xl bg-[#181B20] text-[#FFD166] border-2 border-[#0A3323] border-b-4 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Ir a Lección ({completedLessonsCount}/{ARMOR_UNLOCK_LESSON})</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="min-h-[44px] px-6 py-2 rounded-xl duo-btn-primary text-xs font-extrabold cursor-pointer"
          >
            Cerrar Guardarropa
          </button>
        </div>
      </div>
    </div>
  );
};
