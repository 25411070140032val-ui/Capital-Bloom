import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  RefreshCw,
  AlertTriangle,
  Sparkles,
  Layers,
} from 'lucide-react';
import { SM2CardItem } from './LessonModal';
import { BloomMascot, PlumageTheme } from './BloomMascot';
import { soundFX } from '../utils/soundEffects';

interface SpacedRepetitionViewProps {
  sm2Cards: SM2CardItem[];
  plumage?: PlumageTheme;
  onReviewCard: (questionId: string, wasCorrect: boolean) => void;
}

export const SpacedRepetitionView: React.FC<SpacedRepetitionViewProps> = ({
  sm2Cards,
  plumage = 'emerald',
  onReviewCard,
}) => {
  const [filterInterval, setFilterInterval] = useState<'all' | 'mistakes' | 1 | 3 | 7 | 14>('all');
  const [activePracticeCardId, setActivePracticeCardId] = useState<string | null>(
    sm2Cards[0]?.questionId ?? null
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const filteredCards = sm2Cards.filter((card) => {
    if (filterInterval === 'all') return true;
    if (filterInterval === 'mistakes') return card.mistakeCount > 0;
    return card.intervalDays === filterInterval;
  });

  const activeCard =
    sm2Cards.find((c) => c.questionId === activePracticeCardId) || filteredCards[0] || sm2Cards[0];

  const handleSelectCard = (questionId: string) => {
    soundFX.playTap();
    setActivePracticeCardId(questionId);
    setSelectedOption(null);
    setSubmitted(false);
  };

  const handleVerifyPractice = () => {
    if (!activeCard || selectedOption === null) return;
    setSubmitted(true);
    const isCorrect = selectedOption === activeCard.correctIndex;
    if (isCorrect) {
      soundFX.playSuccess();
    } else {
      soundFX.playError();
    }
    onReviewCard(activeCard.questionId, isCorrect);
  };

  const handleNextInterleavedCard = () => {
    if (filteredCards.length === 0) return;
    soundFX.playTap();
    const currentIdx = filteredCards.findIndex((c) => c.questionId === activeCard?.questionId);
    const nextIdx = (currentIdx + 1) % filteredCards.length;
    handleSelectCard(filteredCards[nextIdx].questionId);
  };

  const mistakesTotal = sm2Cards.filter((c) => c.mistakeCount > 0).length;
  const masteredTotal = sm2Cards.filter((c) => c.intervalDays >= 7).length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#BEC092]">
        <div className="flex items-center gap-3.5">
          <BloomMascot
            mood={
              submitted && activeCard && selectedOption === activeCard.correctIndex
                ? 'celebrating'
                : 'happy'
            }
            size="md"
            plumage={plumage}
          />
          <div>
            <p className="text-xs font-bold text-[#734A91]">
              Entrenamiento de Memoria · SuperMemo SM-2 + Práctica Intercalada
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A3323] mt-0.5 font-display">
              Gimnasio de Repaso Inteligente
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#0A3323] font-mono tabular-nums">
          <span>Tarjetas: <strong>{sm2Cards.length}</strong></span>
          <span aria-hidden="true">·</span>
          <span className="text-[#8F6277] font-bold">Por reforzar: {mistakesTotal}</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#2F7D5B] font-bold">Dominadas: {masteredTotal}</span>
        </div>
      </div>

      {/* 3 Golden Rules Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#F7FAD5]/80 border-2 border-[#839958]">
          <p className="text-xs font-mono font-bold text-[#145A3A] tabular-nums">
            01. Micro-Impactos (3 min)
          </p>
          <p className="text-xs text-[#0A3323]/80 mt-1 leading-relaxed">
            Aprende cada concepto desde 4 ángulos rápidos sin textos eternos ni aburrimiento.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[#F1D7FF]/55 border-2 border-[#A87BC7]">
          <p className="text-xs font-mono font-bold text-[#734A91] tabular-nums">
            02. Algoritmo SM-2 (1→3→7→14d)
          </p>
          <p className="text-xs text-[#0A3323]/80 mt-1 leading-relaxed">
            Repasa justo antes de olvidar: cada acierto duplica los días del siguiente reto.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[#F9D6D5]/55 border-2 border-[#D3968C]">
          <p className="text-xs font-mono font-bold text-[#8F6277] tabular-nums">
            03. Interleaving (+43% Memoria)
          </p>
          <p className="text-xs text-[#0A3323]/80 mt-1 leading-relaxed">
            Mezclar tarjetas de Ahorro, Crédito, CETES y Divisas multiplica tu intuición real.
          </p>
        </div>
      </div>

      {/* Interactive Practice Stage + Card Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 duo-card p-5 sm:p-6 space-y-5">
          {activeCard ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#BEC092]/50">
                <p className="text-xs text-[#105666] font-bold">
                  <span>Bioma {String(activeCard.biomeId).padStart(2, '0')}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span className="text-[#2F7D5B]">{activeCard.conceptTag}</span>
                </p>
                <span className="text-xs font-mono font-bold text-[#734A91] tabular-nums">
                  Escalón SM-2: Día {activeCard.intervalDays} · Repaso #{activeCard.repetitions}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-semibold text-[#0A3323] font-display">
                {activeCard.question}
              </h2>

              <div className="space-y-3">
                {activeCard.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === activeCard.correctIndex;
                  let style = 'border-[#BEC092] bg-white hover:bg-[#F7FAD5]/40 text-[#0A3323]';
                  if (submitted) {
                    if (isCorrect) {
                      style = 'border-[#2F7D5B] bg-[#F7FAD5] text-[#0A3323] font-bold';
                    } else if (isSelected && !isCorrect) {
                      style = 'border-[#8F6277] bg-[#F9D6D5] text-[#0A3323]';
                    }
                  } else if (isSelected) {
                    style = 'border-[#734A91] bg-[#F1D7FF]/50 text-[#0A3323] font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={submitted}
                      onClick={() => {
                        soundFX.playTap();
                        setSelectedOption(idx);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border-2 border-b-4 text-sm transition-all flex items-center gap-3.5 cursor-pointer active:translate-y-0.5 ${style}`}
                    >
                      <span className="w-8 h-8 rounded-xl border-2 border-current/30 flex items-center justify-center font-mono text-xs font-bold tabular-nums shrink-0">
                        {idx + 1}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl border-2 ${
                    selectedOption === activeCard.correctIndex
                      ? 'bg-[#F7FAD5] border-[#2F7D5B] text-[#0A3323]'
                      : 'bg-[#F9D6D5] border-[#8F6277] text-[#0A3323]'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold">
                    {selectedOption === activeCard.correctIndex ? (
                      <>
                        <Sparkles className="w-4 h-4 text-[#2F7D5B] shrink-0" />
                        <span>
                          ● ¡NIVEL DE MEMORIA SUBIÓ! (+30 XP)
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-[#8F6277] shrink-0" />
                        <span>
                          ▲ REFUERZO ACTIVADO · Volverá a salir en Día 1
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm mt-1 leading-relaxed">{activeCard.explanation}</p>
                </motion.div>
              )}

              <div className="flex items-center justify-end pt-2">
                {!submitted ? (
                  <button
                    onClick={handleVerifyPractice}
                    disabled={selectedOption === null}
                    className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-2xl duo-btn-primary text-xs font-bold disabled:opacity-40 cursor-pointer"
                  >
                    COMPROBAR TARJETA
                  </button>
                ) : (
                  <button
                    onClick={handleNextInterleavedCard}
                    className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-2xl duo-btn-purple text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>SIGUIENTE TARJETA →</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-[#0A3323]/70">Elige una tarjeta de la lista para practicar.</p>
          )}
        </div>

        {/* Right 5 cols: Filterable SM-2 Queue */}
        <div className="lg:col-span-5 duo-card p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#0A3323] font-display">
              Mazo de Tarjetas SM-2
            </h3>
            <Layers className="w-4 h-4 text-[#734A91]" />
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F7FAD5] border border-[#BEC092] rounded-xl">
            <button
              onClick={() => setFilterInterval('all')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filterInterval === 'all'
                  ? 'bg-[#0A3323] text-white'
                  : 'text-[#0A3323]/70 hover:text-[#0A3323]'
              }`}
            >
              Todas ({sm2Cards.length})
            </button>
            <button
              onClick={() => setFilterInterval('mistakes')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filterInterval === 'mistakes'
                  ? 'bg-[#8F6277] text-white'
                  : 'text-[#0A3323]/70 hover:text-[#0A3323]'
              }`}
            >
              Reforzar ({mistakesTotal})
            </button>
            {([1, 3, 7, 14] as const).map((day) => (
              <button
                key={day}
                onClick={() => setFilterInterval(day)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer tabular-nums ${
                  filterInterval === day
                    ? 'bg-[#2F7D5B] text-white'
                    : 'text-[#0A3323]/70 hover:text-[#0A3323]'
                }`}
              >
                Día {day}
              </button>
            ))}
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {filteredCards.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#0A3323]/60 border-2 border-dashed border-[#BEC092] rounded-2xl">
                No hay tarjetas en este filtro. ¡Avanza en el camino de biomas!
              </div>
            ) : (
              filteredCards.map((card) => {
                const isCurrent = activeCard?.questionId === card.questionId;
                return (
                  <button
                    key={card.questionId}
                    onClick={() => handleSelectCard(card.questionId)}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 border-b-4 transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isCurrent
                        ? 'border-[#2F7D5B] bg-[#F7FAD5]'
                        : 'border-[#BEC092] bg-white hover:bg-[#F7FAD5]/30'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#0A3323] truncate">
                        {card.conceptTag}
                      </p>
                      <p className="text-xs text-[#105666] truncate mt-0.5">
                        Bioma {String(card.biomeId).padStart(2, '0')}: {card.biomeTitle}
                      </p>
                    </div>

                    <div className="text-right shrink-0 font-mono text-xs tabular-nums">
                      <span
                        className={`font-bold ${
                          card.mistakeCount > 0
                            ? 'text-[#8F6277]'
                            : card.intervalDays >= 7
                            ? 'text-[#2F7D5B]'
                            : 'text-[#734A91]'
                        }`}
                      >
                        {card.mistakeCount > 0
                          ? `▲ Día ${card.intervalDays}`
                          : `● Día ${card.intervalDays}`}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
