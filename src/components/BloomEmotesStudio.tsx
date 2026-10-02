import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Volume2,
  Play,
  Square,
  Check,
  Music,
  Zap,
  Lock,
  Unlock,
  ArrowRight,
} from 'lucide-react';
import {
  BloomMascot,
  PlumageTheme,
  BloomEmoteId,
  EMOTE_META,
  EquippedSkinId,
  CasualShirtColor,
  ExecutiveSuitVariant,
  HoodieVariant,
  ElotePonchoVariant,
  JacketVariant,
  SamuraiArmorVariant,
  ArmorVariant,
} from './BloomMascot';
import { soundFX } from '../utils/soundEffects';

interface BloomEmotesStudioProps {
  plumage: PlumageTheme;
  equippedSkin: EquippedSkinId;
  shirtColor: CasualShirtColor;
  executiveVariant?: ExecutiveSuitVariant;
  hoodieVariant: HoodieVariant;
  elotePonchoVariant?: ElotePonchoVariant;
  jacketVariant: JacketVariant;
  samuraiVariant?: SamuraiArmorVariant;
  armorVariant?: ArmorVariant;
  activeEmote: BloomEmoteId;
  onSelectActiveEmote: (emote: BloomEmoteId) => void;
  completedLessonsCount?: number;
  onGoToNextLesson?: () => void;
  compact?: boolean;
  onOpenFullStudio?: () => void;
}

// Ordered from first unlocked (Six Seven) to last unlocked (Baile Ruso) — 10 Emotes total
export const ORDERED_EMOTE_IDS: Exclude<BloomEmoteId, 'none'>[] = [
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

export const BloomEmotesStudio: React.FC<BloomEmotesStudioProps> = ({
  plumage,
  equippedSkin,
  shirtColor,
  executiveVariant,
  hoodieVariant,
  elotePonchoVariant,
  jacketVariant,
  samuraiVariant,
  armorVariant,
  activeEmote,
  onSelectActiveEmote,
  completedLessonsCount = 0,
  onGoToNextLesson,
  compact = false,
  onOpenFullStudio,
}) => {
  const [stageEmote, setStageEmote] = useState<Exclude<BloomEmoteId, 'none'>>(
    activeEmote !== 'none' ? activeEmote : 'six_seven'
  );
  const [isStagePaused, setIsStagePaused] = useState<boolean>(false);

  const currentMeta = EMOTE_META[stageEmote] || EMOTE_META.six_seven;
  const isStageEmoteUnlocked = completedLessonsCount >= currentMeta.unlockLesson;

  const triggerEmoteSynthAudio = (emoteId: Exclude<BloomEmoteId, 'none'>) => {
    if (emoteId === 'six_seven') {
      soundFX.playSixSevenEmote();
    } else if (emoteId === 'elote_fiesta') {
      soundFX.playEloteFiestaEmote();
    } else if (emoteId === 'floss_dance') {
      soundFX.playFlossEmote();
    } else if (emoteId === 'griddy_step') {
      soundFX.playGriddyStepEmote();
    } else if (emoteId === 'handsome_fox') {
      soundFX.playHandsomeFoxAuraEmote();
    } else if (emoteId === 'mariachi_zapateado') {
      soundFX.playMariachiZapateadoEmote();
    } else if (emoteId === 'phonk_face') {
      soundFX.playPhonkFaceEmote();
    } else if (emoteId === 'moonwalk_glide') {
      soundFX.playMoonwalkGlideEmote();
    } else if (emoteId === 'clown_dance') {
      soundFX.playClownJigEmote();
    } else if (emoteId === 'russian_dance') {
      soundFX.playRussianDanceEmote();
    }
  };

  // Selecting an emote previews it on the stage; it ONLY equips globally if already unlocked via lessons!
  const handlePickStageEmote = (emoteId: Exclude<BloomEmoteId, 'none'>) => {
    const meta = EMOTE_META[emoteId];
    const unlocked = completedLessonsCount >= meta.unlockLesson;
    setStageEmote(emoteId);
    setIsStagePaused(false);
    triggerEmoteSynthAudio(emoteId);

    if (unlocked) {
      onSelectActiveEmote(emoteId);
    }
  };

  if (compact) {
    return (
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0A3323] border-2 border-[#38BDF8] border-b-6 text-white space-y-4 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-white font-display">
            Emotes ({ORDERED_EMOTE_IDS.length})
          </h3>

          {onOpenFullStudio && (
            <button
              onClick={() => {
                soundFX.playTap();
                onOpenFullStudio();
              }}
              className="px-3 py-1.5 rounded-xl bg-[#F8FBCA] text-[#0A3323] border-2 border-[#0A3323] border-b-4 text-[11px] font-extrabold cursor-pointer shrink-0 hover:bg-[#38BDF8] hover:text-[#0F172A] transition-colors"
            >
              Escenario Grande
            </button>
          )}
        </div>

        <div
          className={`relative p-4 rounded-2xl bg-gradient-to-r ${currentMeta.cardGradient} border-2 border-white/25 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden`}
        >
          <div className="flex items-center gap-3.5 z-10">
            <div className="p-2 rounded-2xl bg-black/35 border border-white/20 flex flex-col items-center justify-center shrink-0">
              <BloomMascot
                size="lg"
                plumage={plumage}
                previewSkin={equippedSkin}
                shirtColor={shirtColor}
                executiveVariant={executiveVariant}
                hoodieVariant={hoodieVariant}
                elotePonchoVariant={elotePonchoVariant}
                jacketVariant={jacketVariant}
                samuraiVariant={samuraiVariant}
                armorVariant={armorVariant}
                emote={isStagePaused ? 'none' : stageEmote}
              />
              {!isStageEmoteUnlocked ? (
                <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8F6277] text-white border border-[#0A3323] text-[9px] font-mono font-extrabold">
                  <Lock className="w-2.5 h-2.5" />
                  <span>
                    {completedLessonsCount}/{currentMeta.unlockLesson}
                  </span>
                </span>
              ) : (
                <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2F7D5B] text-[#F8FBCA] border border-[#0A3323] text-[9px] font-mono font-extrabold">
                  <Unlock className="w-2.5 h-2.5" />
                  <span>DESBLOQUEADO</span>
                </span>
              )}
            </div>

            <div className="space-y-1">
              <span className="inline-block px-2 py-0.5 rounded-md bg-black/45 text-[#F8FBCA] text-[10px] font-mono font-extrabold">
                {currentMeta.orderLabel}
              </span>
              <h4 className="text-base font-extrabold text-white">{currentMeta.title}</h4>
              <p className="text-[10px] font-mono text-[#FDE68A]">
                {isStageEmoteUnlocked
                  ? '✓ Obtenido al completar lecciones'
                  : `🔒 Completa ${currentMeta.unlockLesson} ${
                      currentMeta.unlockLesson === 1 ? 'lección' : 'lecciones'
                    } para usar`}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto z-10 shrink-0">
            <button
              onClick={() => triggerEmoteSynthAudio(stageEmote)}
              className="flex-1 sm:w-full min-h-[38px] px-3 py-1.5 rounded-xl bg-[#F8FBCA] text-[#0A3323] border-2 border-[#0A3323] border-b-4 text-[11px] font-extrabold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#FFD166]"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#0A3323]" />
              <span>Ritmo Synth</span>
            </button>

            {isStageEmoteUnlocked ? (
              <button
                onClick={() => {
                  soundFX.playTap();
                  if (activeEmote === stageEmote) {
                    onSelectActiveEmote('none');
                    setIsStagePaused(true);
                  } else {
                    onSelectActiveEmote(stageEmote);
                    setIsStagePaused(false);
                  }
                }}
                className={`flex-1 sm:w-full min-h-[38px] px-3 py-1.5 rounded-xl border-2 text-[11px] font-extrabold flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeEmote === stageEmote
                    ? 'bg-[#34D399] text-[#0A3323] border-[#0A3323] border-b-4'
                    : 'bg-black/40 text-white border-white/30 hover:bg-black/60'
                }`}
              >
                {activeEmote === stageEmote ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Activo en Bloom</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Usar en Bloom</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  soundFX.playTap();
                  if (onGoToNextLesson) onGoToNextLesson();
                }}
                className="flex-1 sm:w-full min-h-[38px] px-3 py-1.5 rounded-xl bg-[#181B20] text-[#FFD166] border-2 border-[#FFD166]/60 text-[11px] font-extrabold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-black"
                title="Completa lecciones para desbloquear este emote"
              >
                <Lock className="w-3.5 h-3.5 text-[#FFD166]" />
                <span>Ir a Lección ({completedLessonsCount}/{currentMeta.unlockLesson})</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {ORDERED_EMOTE_IDS.map((id) => {
            const meta = EMOTE_META[id];
            const isUnlocked = completedLessonsCount >= meta.unlockLesson;
            const isSelected = stageEmote === id && !isStagePaused;
            return (
              <button
                key={id}
                onClick={() => handlePickStageEmote(id)}
                className={`p-2.5 rounded-2xl border-2 flex flex-col items-center text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white/15 border-[#38BDF8] ring-2 ring-[#38BDF8] shadow-md'
                    : 'bg-black/30 border-white/15 hover:border-white/40'
                }`}
              >
                <BloomMascot
                  size="sm"
                  plumage={plumage}
                  previewSkin={equippedSkin}
                  shirtColor={shirtColor}
                  executiveVariant={executiveVariant}
                  hoodieVariant={hoodieVariant}
                  elotePonchoVariant={elotePonchoVariant}
                  jacketVariant={jacketVariant}
                  samuraiVariant={samuraiVariant}
                  armorVariant={armorVariant}
                  emote={id}
                />
                <span className="mt-1.5 text-xs font-extrabold text-white leading-tight">
                  {meta.title}
                </span>
                {isUnlocked ? (
                  <span
                    className="mt-0.5 text-[9px] font-mono font-bold"
                    style={{ color: meta.accentHex }}
                  >
                    {activeEmote === id
                      ? '● ACTIVO EN BLOOM'
                      : `DESBLOQUEADO (L${meta.unlockLesson})`}
                  </span>
                ) : (
                  <span className="mt-0.5 inline-flex items-center gap-1 text-[9px] font-mono font-bold text-[#FDE68A]">
                    <Lock className="w-2.5 h-2.5" />
                    <span>
                      CANDADO · {completedLessonsCount}/{meta.unlockLesson}
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* MAIN LIVE STAGE */}
      <div
        className={`relative p-5 sm:p-6 rounded-3xl bg-gradient-to-br ${currentMeta.cardGradient} border-3 border-[#0A3323] border-b-8 text-white shadow-xl overflow-hidden`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col items-center">
            <div className="relative p-5 rounded-3xl bg-black/40 border-2 border-white/25 shadow-inner flex flex-col items-center justify-center">
              <BloomMascot
                size="xl"
                plumage={plumage}
                previewSkin={equippedSkin}
                shirtColor={shirtColor}
                executiveVariant={executiveVariant}
                hoodieVariant={hoodieVariant}
                elotePonchoVariant={elotePonchoVariant}
                jacketVariant={jacketVariant}
                samuraiVariant={samuraiVariant}
                armorVariant={armorVariant}
                emote={isStagePaused ? 'none' : stageEmote}
              />

              <div className="mt-3 flex items-end gap-1 h-4">
                {[0.5, 0.9, 0.6, 1, 0.7, 0.95, 0.55, 0.85].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 rounded-full"
                    style={{ backgroundColor: currentMeta.accentHex }}
                    animate={
                      isStagePaused
                        ? { height: '4px' }
                        : { height: ['4px', `${Math.round(h * 16)}px`, '4px'] }
                    }
                    transition={{
                      duration: 60 / currentMeta.bpm,
                      repeat: Infinity,
                      delay: i * 0.06,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>

            {!isStageEmoteUnlocked ? (
              <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8F6277] border border-[#0A3323] text-[10px] font-mono font-extrabold text-white">
                <Lock className="w-3 h-3" />
                <span>
                  CANDADO · {completedLessonsCount}/{currentMeta.unlockLesson} LECCIONES
                </span>
              </span>
            ) : (
              <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F7D5B] border border-[#0A3323] text-[10px] font-mono font-extrabold text-[#F8FBCA]">
                <Unlock className="w-3 h-3" />
                <span>
                  {activeEmote === stageEmote
                    ? 'ACTIVO EN COLIBRÍ BLOOM'
                    : `DESBLOQUEADO EN LECCIÓN ${currentMeta.unlockLesson}`}
                </span>
              </span>
            )}
          </div>

          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-black/55 text-[#F8FBCA] text-[10px] font-mono font-extrabold">
                {currentMeta.orderLabel.toUpperCase()}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-white/15 text-white text-[10px] font-mono font-extrabold flex items-center gap-1">
                <Music className="w-3 h-3" />
                <span>{currentMeta.audioTypeLabel}</span>
              </span>
              <span
                className="px-2.5 py-0.5 rounded-md bg-black/50 border text-[10px] font-mono font-extrabold"
                style={{
                  borderColor: currentMeta.accentHex,
                  color: currentMeta.accentHex,
                }}
              >
                {currentMeta.bpm} BPM
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              {currentMeta.title}
            </h3>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <button
                onClick={() => {
                  setIsStagePaused(false);
                  triggerEmoteSynthAudio(stageEmote);
                }}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-[#F8FBCA] text-[#0A3323] border-2 border-[#0A3323] border-b-4 text-xs font-extrabold flex items-center gap-2 cursor-pointer hover:bg-[#FFD166] transition-transform active:translate-y-0.5"
              >
                <Volume2 className="w-4 h-4 text-[#0A3323]" />
                <span>Escuchar Sintetizador</span>
              </button>

              {isStageEmoteUnlocked ? (
                <button
                  onClick={() => {
                    soundFX.playSuccess();
                    if (activeEmote === stageEmote) {
                      onSelectActiveEmote('none');
                    } else {
                      onSelectActiveEmote(stageEmote);
                      setIsStagePaused(false);
                    }
                  }}
                  className={`min-h-[42px] px-4 py-2 rounded-xl border-2 border-b-4 text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-transform active:translate-y-0.5 ${
                    activeEmote === stageEmote
                      ? 'bg-[#34D399] text-[#0A3323] border-[#0A3323]'
                      : 'bg-black/45 text-white border-white/40 hover:bg-black/65'
                  }`}
                >
                  {activeEmote === stageEmote ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Activo en toda la App (Quitar)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Usar Emote en Bloom</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundFX.playTap();
                    if (onGoToNextLesson) onGoToNextLesson();
                  }}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-[#181B20] text-[#FFD166] border-2 border-[#FFD166] border-b-4 text-xs font-extrabold flex items-center gap-2 cursor-pointer hover:bg-black"
                >
                  <Lock className="w-4 h-4 text-[#FFD166]" />
                  <span>
                    Se desbloquea en Lección {currentMeta.unlockLesson} · Ir a Lección
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => {
                  soundFX.playTap();
                  setIsStagePaused((prev) => !prev);
                }}
                className="min-h-[42px] px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-xs font-extrabold text-white flex items-center gap-1.5 cursor-pointer"
              >
                {isStagePaused ? (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Reanudar</span>
                  </>
                ) : (
                  <>
                    <Square className="w-3.5 h-3.5" />
                    <span>Pausar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED EMOTE CARDS WITH LESSON PROGRESSION & PADLOCKS (10 EMOTES) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {ORDERED_EMOTE_IDS.map((id) => {
          const meta = EMOTE_META[id];
          const isUnlocked = completedLessonsCount >= meta.unlockLesson;
          const isSelected = stageEmote === id;
          const isEquippedGlobal = activeEmote === id && isUnlocked;

          return (
            <div
              key={id}
              onClick={() => handlePickStageEmote(id)}
              className={`p-4 rounded-2xl border-2 border-b-6 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white border-[#0A3323] ring-3 ring-[#38BDF8]'
                  : 'bg-white text-[#0A3323] border-[#0A3323]/75 hover:bg-[#F8FBCA]/60'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-extrabold ${
                      isSelected
                        ? 'bg-white/15 text-[#38BDF8]'
                        : 'bg-[#0A3323] text-[#F8FBCA]'
                    }`}
                  >
                    {meta.orderLabel.toUpperCase()}
                  </span>

                  {!isUnlocked ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8F6277] text-white border border-[#0A3323] text-[10px] font-mono font-extrabold">
                      <Lock className="w-3 h-3" />
                      <span>
                        CANDADO · {completedLessonsCount}/{meta.unlockLesson}
                      </span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2F7D5B] text-[#F8FBCA] border border-[#0A3323] text-[10px] font-mono font-extrabold">
                      <Unlock className="w-3 h-3" />
                      <span>DESBLOQUEADO</span>
                    </span>
                  )}
                </div>

                <div className="py-3 rounded-2xl bg-[#0F172A]/90 border border-white/15 flex flex-col items-center justify-center">
                  <BloomMascot
                    size="md"
                    plumage={plumage}
                    previewSkin={equippedSkin}
                    shirtColor={shirtColor}
                    executiveVariant={executiveVariant}
                    hoodieVariant={hoodieVariant}
                    elotePonchoVariant={elotePonchoVariant}
                    jacketVariant={jacketVariant}
                    samuraiVariant={samuraiVariant}
                    armorVariant={armorVariant}
                    emote={id}
                  />
                </div>

                <h4
                  className={`text-base font-extrabold text-center ${
                    isSelected ? 'text-white' : 'text-[#0A3323]'
                  }`}
                >
                  {meta.title}
                </h4>

                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-mono font-extrabold">
                    <span>
                      {isUnlocked
                        ? `¡Obtenido en Lección ${meta.unlockLesson}!`
                        : `Progreso: ${completedLessonsCount}/${meta.unlockLesson} lecciones`}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-black/20 border border-[#0A3323]/40 overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          (completedLessonsCount / meta.unlockLesson) * 100
                        )}%`,
                        backgroundColor: meta.accentHex,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-current/15 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-extrabold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#FBBF24]" />
                  <span>{meta.bpm} BPM</span>
                </span>

                <span
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${
                    isEquippedGlobal
                      ? 'bg-[#34D399] text-[#0A3323]'
                      : !isUnlocked
                      ? 'bg-[#181B20] text-[#FFD166]'
                      : isSelected
                      ? 'bg-[#38BDF8] text-[#0F172A]'
                      : 'bg-[#0A3323] text-[#F8FBCA]'
                  }`}
                >
                  {isEquippedGlobal
                    ? '✓ Activo en Bloom'
                    : !isUnlocked
                    ? `🔒 Se obtiene en L${meta.unlockLesson}`
                    : 'Usar en Bloom'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
