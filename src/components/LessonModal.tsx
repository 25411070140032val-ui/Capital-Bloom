import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Shield,
  Sparkles,
  Volume2,
  VolumeX,
  ArrowRight,
  Headphones,
  Puzzle,
  Sliders,
  Zap,
  FileCheck2,
  ListOrdered,
  Check,
  Film,
  Gamepad2,
  RotateCcw,
  Lock,
} from 'lucide-react';
import { BiomeModule, QuizQuestion } from '../data/biomesData';
import { getBiomeSingleTopicLessons } from '../data/singleTopicLessons';
import { BloomMascot, PlumageTheme, BloomMood } from './BloomMascot';
import { getBiomeUniqueDesign } from './AnimatedBiomeBanner';
import { BiomeScenicBackground } from './BiomeScenicBackground';
import { LessonVisualAid } from './LessonVisualAid';
import { speakWarmText, stopWarmVoice } from '../utils/warmVoice';
import { soundFX } from '../utils/soundEffects';

export interface SM2CardItem {
  questionId: string;
  biomeId: number;
  biomeTitle: string;
  conceptTag: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  intervalDays: 1 | 3 | 7 | 14;
  repetitions: number;
  mistakeCount: number;
  lastReviewedISO: string;
  nextReviewLabel: string;
}

export type LessonNumber = 1 | 2 | 3 | 4 | 5 | 6;

interface LessonModalProps {
  biome: BiomeModule;
  initialLesson?: LessonNumber;
  learningMode: 'seed' | 'flight';
  streakVouchers: number;
  plumage?: PlumageTheme;
  completedLessonKeys?: string[];
  onClose: () => void;
  onCompleteBiome: (result: {
    biomeId: number;
    lessonCompleted: LessonNumber;
    mistakes: QuizQuestion[];
    perfectScore: boolean;
    earnedXP: number;
    dilemmaSavedMXN: number;
    closeModal?: boolean;
  }) => void;
}

interface PostAnimationQuestion {
  id: string;
  question: string;
  options: string[];
  correctIdx: number;
  feedback: string;
}

/**
 * Preguntas que aparecen en la pantalla posterior al minivideo animado.
 */
function getPostAnimationQuestions(
  biome: BiomeModule,
  lessonNumber: LessonNumber
): PostAnimationQuestion[] {
  const singleTopics = getBiomeSingleTopicLessons(biome.id);
  const currentTopic = singleTopics[lessonNumber - 1] || singleTopics[0];

  if (biome.id === 1) {
    switch (lessonNumber) {
      case 1:
        return [
          {
            id: 'b1-l1-q1',
            question:
              '1. Según el minivideo, ¿cuál era el límite principal del trueque directo entre el agricultor y el artesano?',
            options: [
              'La doble coincidencia de necesidades: ambos debían necesitar lo que el otro ofrecía ese mismo día',
              'Que en la antigüedad no existía el maíz ni el calzado',
              'Que estaba prohibido hablar en los mercados',
            ],
            correctIdx: 0,
            feedback:
              '¡Exacto! Sin doble coincidencia de necesidades no se podía concretar el trueque.',
          },
          {
            id: 'b1-l1-q2',
            question:
              '2. De acuerdo con el Dato Clave del minivideo, ¿cómo evolucionó el dinero y qué equivalían 100 semillas de cacao?',
            options: [
              'Evolucionó de Trueque → Cacao y Monedas → Papel → Digital, y 100 semillas de cacao equivalían a 1 canoa',
              'Empezó con tarjetas digitales y terminó en el trueque',
              '100 semillas de cacao no tenían ningún valor de intercambio',
            ],
            correctIdx: 0,
            feedback:
              '¡Muy bien! En Mesoamérica 100 semillas de cacao equivalían a 1 canoa y cumplían las 3 funciones del dinero.',
          },
        ];
      case 2:
        return [
          {
            id: 'b1-l2-q1',
            question:
              '1. Según el minivideo, ¿por qué los billetes actuales se llaman "dinero fiduciario"?',
            options: [
              'Porque su valor se basa en la confianza y el respaldo productivo real del país',
              'Porque cada billete tiene oro fundido por dentro',
              'Porque valen según el color de su tinta',
            ],
            correctIdx: 0,
            feedback:
              '¡Correcto! Fiducia significa confianza respaldada por la producción nacional.',
          },
          {
            id: 'b1-l2-q2',
            question:
              '2. ¿Qué institución autónoma cuida en México el poder adquisitivo de tus pesos regulando los billetes en circulación?',
            options: [
              'El Banco de México (Banxico)',
              'Cualquier tienda departamental',
              'Las aplicaciones de mensajería',
            ],
            correctIdx: 0,
            feedback:
              '¡Así es! Banxico protege la estabilidad del poder de compra de nuestra moneda.',
          },
        ];
      case 3:
        return [
          {
            id: 'b1-l3-q1',
            question:
              '1. Según el minivideo de los 3 sectores productivos de México, ¿qué actividades integran el Sector Primario (~4% del PIB) y el Secundario (~32% del PIB)?',
            options: [
              'Primario: agricultura, ganadería y pesca; Secundario: industria, manufactura y construcción',
              'Ninguno produce bienes físicos ni alimentos',
              'Ambos se dedican exclusivamente a redes sociales',
            ],
            correctIdx: 0,
            feedback:
              '¡Exacto! El campo aporta los insumos primarios y la industria los transforma.',
          },
          {
            id: 'b1-l3-q2',
            question:
              '2. ¿Cuál de los tres sectores aporta la mayor proporción (~64%) al PIB de México?',
            options: [
              'El Sector Terciario (Comercio, servicios, logística, tecnología y turismo)',
              'Únicamente la caza y recolección',
              'La impresión de monedas antiguas',
            ],
            correctIdx: 0,
            feedback:
              '¡Muy bien! El Sector Terciario representa cerca del 64% del PIB nacional.',
          },
        ];
      case 4:
        return [
          {
            id: 'b1-l4-q1',
            question:
              '1. Según el minivideo, ¿cuál es el camino para integrarte a la economía formal en México?',
            options: [
              'Inscribirte en el RFC, abrir cuenta bancaria formal y emitir comprobantes oficiales (CFDI)',
              'Operar únicamente con efectivo escondido sin recibos',
              'Evitar cualquier contrato o comprobante de pago',
            ],
            correctIdx: 0,
            feedback:
              '¡Correcto! El registro formal y los comprobantes CFDI te abren acceso a derechos y crédito.',
          },
          {
            id: 'b1-l4-q2',
            question:
              '2. ¿Qué ventaja directa obtienes en tu día a día al operar dentro de la economía formal?',
            options: [
              'Seguridad social, historial crediticio bancario y respaldo legal para crecer',
              'Perder todo acceso a servicios bancarios',
              'Pagar multas por tener cuenta de ahorro',
            ],
            correctIdx: 0,
            feedback:
              '¡Excelente! La formalidad protege tu trabajo y tu acceso al sistema financiero.',
          },
        ];
      case 5:
        return [
          {
            id: 'b1-l5-q1',
            question:
              '1. Según el minivideo, ¿de dónde nacen realmente tus ingresos en la economía?',
            options: [
              'De tus habilidades aplicadas para resolver problemas útiles y reales para otras personas',
              'Únicamente del azar sin necesidad de aprender nada',
              'De gastar más de lo que ganas cada semana',
            ],
            correctIdx: 0,
            feedback:
              '¡Exacto! Mientras más valioso es el problema que sabes resolver, mayor es tu ingreso.',
          },
          {
            id: 'b1-l5-q2',
            question:
              '2. En tu día a día, ¿qué hábito multiplica tu capacidad de generar ingresos?',
            options: [
              'Aprender habilidades técnicas u oficios especializados y cumplir con puntualidad',
              'Dejar los proyectos a medias y no actualizar tus conocimientos',
              'Ignorar el tiempo que te costó ganar cada peso',
            ],
            correctIdx: 0,
            feedback:
              '¡Muy bien! Invertir en tus habilidades y reputación eleva el valor de tu hora de trabajo.',
          },
        ];
      case 6:
        return [
          {
            id: 'b1-l6-q1',
            question:
              '1. Según el minivideo, ¿qué rango de tasa de ISR tiene el Régimen Simplificado de Confianza (RESICO) para personas físicas?',
            options: [
              'Entre el 1.0% y el 2.5% sobre los ingresos cobrados con factura',
              'El 85% de tus ingresos totales',
              'No permite emitir facturas legales',
            ],
            correctIdx: 0,
            feedback:
              '¡Correcto! RESICO ofrece tasas muy bajas (1% a 2.5%) para impulsar la formalidad.',
          },
          {
            id: 'b1-l6-q2',
            question:
              '2. ¿Cuál es la diferencia que viste entre Ingreso Bruto e Ingreso Neto?',
            options: [
              'El Bruto es el total antes de impuestos y el Neto es lo que te queda libre en tu cuenta tras impuestos',
              'Son exactamente la misma cantidad siempre',
              'El Neto es el dinero que pierdes por no facturar',
            ],
            correctIdx: 0,
            feedback:
              '¡Excelente! Conocer tu Ingreso Neto real te permite planear tus metas con precisión.',
          },
        ];
    }
  }

  const qFromQuiz = biome.quiz[(lessonNumber - 1) % biome.quiz.length] || biome.quiz[0];

  return [
    {
      id: `b${biome.id}-l${lessonNumber}-pa1`,
      question: `1. Según el minivideo de "${currentTopic.topicTitle}", ¿qué dato clave y principio debes recordar?`,
      options: [
        `${biome.curiousFact.stat}: ${currentTopic.topicFocusSummary}`,
        `Ignorar "${currentTopic.topicTitle}" y decidir por impulso sin información`,
        'Dejar tu dinero sin control ni seguimiento mensual',
      ],
      correctIdx: 0,
      feedback: `¡Exacto! Como viste en la Escena 3 del minivideo: ${biome.curiousFact.stat}.`,
    },
    {
      id: `b${biome.id}-l${lessonNumber}-pa2`,
      question: `2. ${qFromQuiz.question}`,
      options: qFromQuiz.options,
      correctIdx: qFromQuiz.correctIndex,
      feedback: qFromQuiz.explanation,
    },
  ];
}

export const LessonModal: React.FC<LessonModalProps> = ({
  biome,
  initialLesson = 1,
  streakVouchers,
  plumage = 'emerald',
  completedLessonKeys = [],
  onClose,
  onCompleteBiome,
}) => {
  const [activeAngle, setActiveAngle] = useState<LessonNumber>(initialLesson);
  const [isMuted, setIsMuted] = useState<boolean>(soundFX.muted);

  /**
   * FLUJO SECUENCIAL DE PANTALLAS (NO APILADO ABAJO):
   * - 'video': Al entrar aparece el título y el minivideo animado con voz de fondo.
   * - 'post_video': Hasta después de que termina el minivideo, la pantalla cambia
   *   al Juego Dinámico de la lección + las Preguntas de comprobación.
   */
  const [screenPhase, setScreenPhase] = useState<'video' | 'post_video'>('video');

  // Estado del Juego Dinámico (varía según la lección 1..6)
  const [dynamicGameSolved, setDynamicGameSolved] = useState<boolean>(false);
  const [l3MatchedCount, setL3MatchedCount] = useState<number>(0);
  const [l3SelectedLeft, setL3SelectedLeft] = useState<number>(0);
  const [l4StepProgress, setL4StepProgress] = useState<number>(0);
  const [l5Classified, setL5Classified] = useState<Record<number, boolean>>({});
  const [ answers, setAnswers ] = useState<Record<string, number>>({});

  const workspaceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveAngle(initialLesson);
  }, [initialLesson, biome.id]);

  // Al cambiar de lección o bioma, regresamos a la pantalla 1 ('video') y reiniciamos estados
  useEffect(() => {
    setScreenPhase('video');
    setDynamicGameSolved(false);
    setL3MatchedCount(0);
    setL3SelectedLeft(0);
    setL4StepProgress(0);
    setL5Classified({});
    setAnswers({});
    workspaceRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeAngle, biome.id]);

  useEffect(() => {
    return () => {
      stopWarmVoice();
    };
  }, []);

  const uniqueDesign = useMemo(() => getBiomeUniqueDesign(biome.id), [biome.id]);
  const singleTopicList = useMemo(() => getBiomeSingleTopicLessons(biome.id), [biome.id]);
  const currentLessonTopic = singleTopicList[activeAngle - 1] || singleTopicList[0];

  const questions = useMemo(
    () => getPostAnimationQuestions(biome, activeAngle),
    [biome, activeAngle]
  );

  const speakBackgroundVoice = React.useCallback((text: string, onDone?: () => void) => {
    if (soundFX.muted) {
      onDone?.();
      return;
    }
    void speakWarmText({
      text,
      persona: 'Kore',
      forceRestart: true,
      onEnd: onDone,
    });
  }, []);

  // Cuando termina el minivideo, detenemos la voz de fondo y cambiamos a la pantalla de Juego + Preguntas
  const handleVideoComplete = React.useCallback(() => {
    stopWarmVoice();
    soundFX.playSuccess();
    setScreenPhase('post_video');
    workspaceRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const solvedQuestionsCount = questions.filter(
    (q) => answers[q.id] === q.correctIdx
  ).length;
  const isCurrentLessonSolved =
    screenPhase === 'post_video' &&
    dynamicGameSolved &&
    solvedQuestionsCount === questions.length;

  const currentBloomMood: BloomMood = isCurrentLessonSolved ? 'celebrating' : 'happy';

  const handleSaveLessonProgress = (nextAngle?: LessonNumber, shouldClose = false) => {
    stopWarmVoice();
    soundFX.playCelebration();
    const earnedXP = activeAngle === 6 ? 120 : 55;
    const savedMXN =
      activeAngle === 6
        ? Math.abs(biome.dilemmaChallenge.resilientOption.financialImpactMXN) * 6
        : 0;

    onCompleteBiome({
      biomeId: biome.id,
      lessonCompleted: activeAngle,
      mistakes: [],
      perfectScore: true,
      earnedXP,
      dilemmaSavedMXN: savedMXN,
      closeModal: shouldClose,
    });

    if (nextAngle && !shouldClose) {
      setActiveAngle(nextAngle);
    }
  };

  const toggleMute = () => {
    const nextMuted = soundFX.toggleMute();
    setIsMuted(nextMuted);
    if (nextMuted) {
      stopWarmVoice();
    } else {
      soundFX.playTap();
    }
  };

  const progressPercent = Math.round((activeAngle / 6) * 100);

  const LESSON_ICONS: Record<LessonNumber, React.ReactNode> = {
    1: <Headphones className="w-3.5 h-3.5 shrink-0" />,
    2: <FileCheck2 className="w-3.5 h-3.5 shrink-0" />,
    3: <Puzzle className="w-3.5 h-3.5 shrink-0" />,
    4: <ListOrdered className="w-3.5 h-3.5 shrink-0" />,
    5: <Sliders className="w-3.5 h-3.5 shrink-0" />,
    6: <Zap className="w-3.5 h-3.5 shrink-0" />,
  };

  const LESSON_TABS = singleTopicList.map((item) => ({
    id: item.lessonNumber,
    shortTitle: `0${item.lessonNumber}. ${item.topicTitle}`,
    typeBadge: screenPhase === 'video' && activeAngle === item.lessonNumber ? '1º Minivideo' : '2º Juego + Quiz',
    icon: LESSON_ICONS[item.lessonNumber],
  }));

  // Renderizador del Juego Dinámico corto según la lección (1 a 6)
  const renderDynamicMiniGame = () => {
    // LECCIÓN 1: Juego Dinámico de Intercambio / Misión Visual
    if (activeAngle === 1) {
      const isBiome1 = biome.id === 1;
      const promptText = isBiome1
        ? 'El artesano tiene calzado 🩴 pero NO necesita tu maíz 🌽. Toca el instrumento que superó el límite del trueque en Mesoamérica para cerrar el trato:'
        : `Toca la acción correcta que activa el principio de "${currentLessonTopic.topicTitle}":`;
      const options = isBiome1
        ? [
            { label: '🫘 Pagar con Semillas de Cacao (Dinero Mercancía divisible)', ok: true },
            { label: '🐟 Quedarme sin calzado porque no tengo pescado', ok: false },
            { label: '🪨 Abandonar el mercado sin intercambiar nada', ok: false },
          ]
        : [
            { label: `✅ ${biome.dilemmaChallenge.resilientOption.label}`, ok: true },
            { label: `❌ ${biome.dilemmaChallenge.impulseOption.label}`, ok: false },
          ];

      return (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-extrabold text-[#0A3323]">{promptText}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {options.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (item.ok) {
                    soundFX.playSuccess();
                    setDynamicGameSolved(true);
                  } else {
                    soundFX.playError();
                  }
                }}
                className={`p-3.5 rounded-2xl border-2 border-b-4 text-xs font-extrabold text-left cursor-pointer transition-all ${
                  dynamicGameSolved && item.ok
                    ? 'bg-[#D1FAE5] border-[#059669] text-[#064E3B]'
                    : 'bg-[#F8FBCA]/60 border-[#0A3323]/30 text-[#0A3323] hover:bg-[#F8FBCA]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // LECCIÓN 2: Juego Dinámico "Escudo del Poder Adquisitivo"
    if (activeAngle === 2) {
      const isBiome1 = biome.id === 1;
      return (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-extrabold text-[#0A3323]">
            {isBiome1
              ? 'Toca la institución y el respaldo que protegen el valor de tus billetes en México:'
              : `Toca el indicador clave que respalda "${currentLessonTopic.topicTitle}":`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                soundFX.playSuccess();
                setDynamicGameSolved(true);
              }}
              className={`p-3.5 rounded-2xl border-2 border-b-4 text-xs font-extrabold text-left cursor-pointer transition-all ${
                dynamicGameSolved
                  ? 'bg-[#D1FAE5] border-[#059669] text-[#064E3B]'
                  : 'bg-[#F8FBCA]/60 border-[#0A3323]/30 text-[#0A3323] hover:bg-[#F8FBCA]'
              }`}
            >
              {isBiome1
                ? '🏛️ Banco de México (Banxico) + Confianza en la producción real'
                : `📊 ${biome.curiousFact.stat} (${biome.dilemmaChallenge.resilientOption.label})`}
            </button>
            <button
              type="button"
              onClick={() => soundFX.playError()}
              className="p-3.5 rounded-2xl border-2 border-b-4 bg-white border-[#0A3323]/30 text-[#0A3323] text-xs font-extrabold text-left cursor-pointer hover:bg-[#FEE2E2]/50"
            >
              {isBiome1
                ? '🖨️ Imprimir billetes sin límite aunque no haya más producción'
                : `❌ ${biome.dilemmaChallenge.impulseOption.label}`}
            </button>
          </div>
        </div>
      );
    }

    // LECCIÓN 3: Juego Dinámico "Conecta los 3 Pares en Pantalla"
    if (activeAngle === 3) {
      const pairs =
        biome.id === 1
          ? [
              { left: '🌱 Sector Primario', right: '4% del PIB (Campo y pesca)' },
              { left: '🏭 Sector Secundario', right: '32% del PIB (Industria y obras)' },
              { left: '🏪 Sector Terciario', right: '64% del PIB (Comercio y servicios)' },
            ]
          : [
              { left: `🎯 ${currentLessonTopic.topicTitle}`, right: 'Tema central de la lección' },
              { left: '📊 Dato Clave', right: biome.curiousFact.stat },
              { left: '✅ Acción Diaria', right: biome.dilemmaChallenge.resilientOption.label },
            ];

      return (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-extrabold text-[#0A3323]">
            Conecta en orden cada elemento con su pareja correcta ({l3MatchedCount}/3 conectados):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {pairs.map((p, idx) => {
              const matched = idx < l3MatchedCount;
              const isNext = idx === l3SelectedLeft && !matched;
              return (
                <button
                  key={p.left}
                  type="button"
                  onClick={() => {
                    if (matched) return;
                    if (idx === l3MatchedCount) {
                      soundFX.playSuccess();
                      const nextCount = l3MatchedCount + 1;
                      setL3MatchedCount(nextCount);
                      setL3SelectedLeft(nextCount);
                      if (nextCount >= 3) {
                        setDynamicGameSolved(true);
                      }
                    } else {
                      soundFX.playError();
                    }
                  }}
                  className={`p-3 rounded-2xl border-2 border-b-4 text-left cursor-pointer transition-all ${
                    matched
                      ? 'bg-[#D1FAE5] border-[#059669] text-[#064E3B]'
                      : isNext
                      ? 'bg-[#FEF3C7] border-[#D97706] text-[#0A3323]'
                      : 'bg-white border-[#0A3323]/30 text-[#0A3323]'
                  }`}
                >
                  <span className="text-xs font-extrabold block">{p.left}</span>
                  <span className="text-[11px] font-mono text-[#145A3A] block mt-1">
                    → {p.right}
                  </span>
                  <span className="text-[10px] font-mono font-extrabold mt-1.5 block">
                    {matched ? '✓ CONECTADO' : isNext ? '👆 TOCA PARA CONECTAR' : 'En espera'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // LECCIÓN 4: Juego Dinámico "Toca la Secuencia en Orden (1º → 2º → 3º)"
    if (activeAngle === 4) {
      const steps =
        biome.id === 1
          ? [
              '1º Inscribir tu RFC y abrir cuenta bancaria formal',
              '2º Emitir comprobantes fiscales oficiales (CFDI)',
              '3º Acceder a seguridad social, crédito e historial',
            ]
          : biome.sequenceActivity.correctOrder.slice(0, 3);

      return (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-extrabold text-[#0A3323]">
            Toca los pasos en orden del 1º al 3º para activar la ruta ({l4StepProgress}/3):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {steps.map((st, idx) => {
              const done = idx < l4StepProgress;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    if (done) return;
                    if (idx === l4StepProgress) {
                      soundFX.playSuccess();
                      const next = l4StepProgress + 1;
                      setL4StepProgress(next);
                      if (next >= steps.length) {
                        setDynamicGameSolved(true);
                      }
                    } else {
                      soundFX.playError();
                    }
                  }}
                  className={`p-3.5 rounded-2xl border-2 border-b-4 text-left text-xs font-extrabold cursor-pointer transition-all ${
                    done
                      ? 'bg-[#D1FAE5] border-[#059669] text-[#064E3B]'
                      : 'bg-[#F8FBCA]/60 border-[#0A3323]/30 text-[#0A3323] hover:bg-[#F8FBCA]'
                  }`}
                >
                  <span>{st}</span>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // LECCIÓN 5: Juego Dinámico "Radar Rápido: ¿Multiplica o Drena?"
    if (activeAngle === 5) {
      const cards =
        biome.id === 1
          ? [
              {
                text: 'Aprender una habilidad técnica u oficio que resuelva problemas reales',
                isGood: true,
              },
              {
                text: 'Dejar los proyectos incompletos y esperar que el ingreso suba por suerte',
                isGood: false,
              },
            ]
          : [
              { text: biome.dilemmaChallenge.resilientOption.label, isGood: true },
              { text: biome.dilemmaChallenge.impulseOption.label, isGood: false },
            ];

      return (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-extrabold text-[#0A3323]">
            Clasifica cada hábito en el radar tocando si Multiplica 🌿 o Drena 🥀:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cards.map((c, idx) => {
              const solved = l5Classified[idx] === true;
              return (
                <div
                  key={c.text}
                  className={`p-3.5 rounded-2xl border-2 space-y-2.5 ${
                    solved
                      ? 'bg-[#D1FAE5]/70 border-[#059669]'
                      : 'bg-[#F8FBCA]/50 border-[#0A3323]/25'
                  }`}
                >
                  <p className="text-xs font-extrabold text-[#0A3323]">{c.text}</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (c.isGood) {
                          soundFX.playSuccess();
                          const next = { ...l5Classified, [idx]: true };
                          setL5Classified(next);
                          if (next[0] && next[1]) setDynamicGameSolved(true);
                        } else {
                          soundFX.playError();
                        }
                      }}
                      className="flex-1 py-1.5 px-2.5 rounded-xl bg-[#065F46] text-white text-[11px] font-extrabold cursor-pointer"
                    >
                      🌿 Multiplica
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!c.isGood) {
                          soundFX.playSuccess();
                          const next = { ...l5Classified, [idx]: true };
                          setL5Classified(next);
                          if (next[0] && next[1]) setDynamicGameSolved(true);
                        } else {
                          soundFX.playError();
                        }
                      }}
                      className="flex-1 py-1.5 px-2.5 rounded-xl bg-[#7F1D1D] text-white text-[11px] font-extrabold cursor-pointer"
                    >
                      🥀 Drena
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // LECCIÓN 6: Juego Dinámico "Simulador de Decisión en Pesos ($ MXN)"
    const isBiome1 = biome.id === 1;
    return (
      <div className="space-y-3">
        <p className="text-xs sm:text-sm font-extrabold text-[#0A3323]">
          {isBiome1
            ? 'Simulador RESICO: Un cliente te ofrece $10,000 MXN si entregas factura (tasa ISR ~1% = $100 MXN). Elige la decisión inteligente:'
            : `Simulador de Decisión (${biome.dilemmaChallenge.scenarioTitle}): Elige la opción que protege tu capital:`}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => soundFX.playError()}
            className="p-3.5 rounded-2xl border-2 border-b-4 bg-white border-[#0A3323]/30 text-[#7F1D1D] text-xs font-extrabold text-left cursor-pointer hover:bg-[#FEE2E2]/50"
          >
            {isBiome1
              ? '❌ Rechazar el proyecto y perder $10,000 MXN por miedo a facturar'
              : `❌ ${biome.dilemmaChallenge.impulseOption.label}`}
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playSuccess();
              setDynamicGameSolved(true);
            }}
            className={`p-3.5 rounded-2xl border-2 border-b-4 text-xs font-extrabold text-left cursor-pointer transition-all ${
              dynamicGameSolved
                ? 'bg-[#D1FAE5] border-[#059669] text-[#064E3B]'
                : 'bg-[#F8FBCA]/60 border-[#0A3323]/30 text-[#0A3323] hover:bg-[#F8FBCA]'
            }`}
          >
            {isBiome1
              ? '✅ Facturar en RESICO, pagar solo ~$100 MXN (1%) y cobrar $9,900 MXN netos'
              : `✅ ${biome.dilemmaChallenge.resilientOption.label}`}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071A12]/85 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lesson-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className={`w-full max-w-4xl ${uniqueDesign.bannerBg} sm:rounded-3xl border-3 border-[#F8FBCA] shadow-2xl overflow-hidden flex flex-col h-full sm:h-auto sm:max-h-[92vh] relative my-auto`}
      >
        <BiomeScenicBackground topicId={biome.id} variant="modal" />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* CABECERA CON EL TÍTULO DE LA LECCIÓN */}
        <div
          className={`relative z-10 px-4 sm:px-6 pt-3.5 pb-3 ${uniqueDesign.subBarStyle} border-b-4 space-y-2.5 text-white`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFX.playTap();
                stopWarmVoice();
                onClose();
              }}
              className="min-h-[40px] min-w-[40px] rounded-2xl bg-[#F8FBCA] border-2 border-[#0A3323] flex items-center justify-center text-[#0A3323] hover:bg-[#F6C8C7] transition-colors cursor-pointer shrink-0"
              aria-label="Cerrar lección"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono text-[#F8FBCA] mb-0.5">
                <span className="uppercase font-extrabold text-[#FFD166]">
                  LECCIÓN 0{activeAngle} DE 06 · BIOMA 0{biome.id}
                </span>
                <span className="inline-flex items-center gap-1 shrink-0 font-extrabold bg-black/35 px-2.5 py-0.5 rounded-full">
                  {screenPhase === 'video' ? (
                    <>
                      <Film className="w-3 h-3 text-[#34D399]" />
                      <span>Fase 1 de 2 · Minivideo Animado</span>
                    </>
                  ) : (
                    <>
                      <Gamepad2 className="w-3 h-3 text-[#FFD166]" />
                      <span>Fase 2 de 2 · Juego y Preguntas</span>
                    </>
                  )}
                </span>
              </div>
              <h1
                id="lesson-modal-title"
                className="text-base sm:text-xl font-extrabold text-white font-display truncate"
              >
                {currentLessonTopic.topicTitle}
              </h1>
              <div className="h-2.5 bg-black/45 rounded-full overflow-hidden border border-[#F8FBCA]/60 p-0.5 mt-1">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#839958] via-[#F8FBCA] to-[#E0B0FF] rounded-full"
                  initial={{ width: '16%' }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div
              className="px-2.5 py-1.5 rounded-2xl bg-[#734A91] border-2 border-[#E0B0FF] flex items-center gap-1 text-xs font-mono font-extrabold text-[#F1D7FF] shrink-0 tabular-nums"
              title="Escudos Protectores de Racha"
            >
              <Shield className="w-3.5 h-3.5 fill-[#E0B0FF] text-[#E0B0FF]" />
              <span>{streakVouchers}</span>
            </div>

            <button
              onClick={toggleMute}
              className="min-h-[40px] min-w-[40px] rounded-2xl bg-[#F8FBCA] border-2 border-[#0A3323] flex items-center justify-center text-[#0A3323] hover:bg-[#F7FAD5] transition-colors cursor-pointer shrink-0"
              aria-label={isMuted ? 'Activar audio' : 'Silenciar audio'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#145A3A]" />
              )}
            </button>
          </div>

          {/* Pestañas de las 6 Lecciones del Bioma */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-1.5">
            {LESSON_TABS.map((tab) => {
              const isActive = activeAngle === tab.id;
              const isDone = completedLessonKeys.includes(`${biome.id}-${tab.id}`);
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFX.playTap();
                    setActiveAngle(tab.id);
                  }}
                  title={tab.shortTitle}
                  className={`min-h-[42px] px-2 py-1 rounded-xl text-left transition-all border-2 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#F8FBCA] text-[#0A3323] border-[#0A3323] ring-2 ring-[#F8FBCA]'
                      : isDone
                      ? 'bg-[#2F7D5B] text-[#F8FBCA] border-[#F8FBCA]/70 hover:bg-[#145A3A]'
                      : 'bg-black/35 text-[#F8FBCA] border-white/30 hover:bg-black/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 text-[10px] font-extrabold">
                    <span className="truncate">{tab.shortTitle}</span>
                    {isDone ? <Check className="w-3 h-3 stroke-[3] shrink-0" /> : tab.icon}
                  </div>
                  <span
                    className={`text-[9px] font-mono font-bold truncate ${
                      isActive ? 'text-[#145A3A]' : 'text-[#F8FBCA]/85'
                    }`}
                  >
                    {tab.typeBadge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ESPACIO CENTRAL SECUENCIAL:
            - PANTALLA 1 ('video'): ÚNICAMENTE EL MINIVIDEO ANIMADO CON VOZ DE FONDO
            - PANTALLA 2 ('post_video'): APARECE HASTA DESPUÉS DE TERMINAR EL MINIVIDEO */}
        <div
          ref={workspaceRef}
          className="relative z-10 p-4 sm:p-6 overflow-y-auto space-y-4 flex-1"
        >
          <AnimatePresence mode="wait">
            {screenPhase === 'video' ? (
              <motion.div
                key={`video-phase-${biome.id}-${activeAngle}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <LessonVisualAid
                  biomeId={biome.id}
                  lessonNumber={activeAngle}
                  topicTitle={currentLessonTopic.topicTitle}
                  topicSummary={currentLessonTopic.topicFocusSummary}
                  biomeTitle={uniqueDesign.biomeTitle}
                  keyFactStat={biome.curiousFact.stat}
                  keyFactLabel={biome.curiousFact.fact}
                  dailyMistakeLabel={biome.dilemmaChallenge.impulseOption.label}
                  dailySmartLabel={biome.dilemmaChallenge.resilientOption.label}
                  sequenceSteps={biome.sequenceActivity.correctOrder}
                  onVideoComplete={handleVideoComplete}
                  onSpeakScene={speakBackgroundVoice}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`post-video-phase-${biome.id}-${activeAngle}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* Barra superior para volver a ver el minivideo si el usuario lo desea */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-[#0A3323] border-2 border-[#34D399] text-white">
                  <div className="flex items-center gap-2 text-xs font-extrabold">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                    <span>Minivideo completado · Ahora resuelve el juego rápido y las preguntas</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playTap();
                      setScreenPhase('video');
                    }}
                    className="px-3 py-1 rounded-xl bg-[#F8FBCA] text-[#0A3323] text-xs font-extrabold flex items-center gap-1.5 cursor-pointer hover:bg-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Volver a ver el minivideo</span>
                  </button>
                </div>

                {/* 1. JUEGO DINÁMICO INTERACTIVO DE LA LECCIÓN */}
                <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#0A3323] border-b-6 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl bg-[#734A91] text-[#F8FBCA] text-[11px] font-mono font-extrabold flex items-center gap-1.5">
                        <Gamepad2 className="w-3.5 h-3.5" />
                        <span>JUEGO DINÁMICO · LECCIÓN 0{activeAngle}</span>
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-extrabold ${
                        dynamicGameSolved
                          ? 'bg-[#D1FAE5] text-[#064E3B] border border-[#059669]'
                          : 'bg-[#FEF3C7] text-[#78350F] border border-[#F59E0B]'
                      }`}
                    >
                      {dynamicGameSolved ? '✓ Juego superado' : 'En curso'}
                    </span>
                  </div>

                  {renderDynamicMiniGame()}
                </div>

                {/* 2. PREGUNTAS DE LA LECCIÓN (APARECEN EN ESTA SEGUNDA PANTALLA) */}
                <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#0A3323] border-b-6 space-y-4 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono font-extrabold text-[#145A3A] uppercase">
                        PREGUNTAS DE LA LECCIÓN 0{activeAngle}
                      </span>
                      <h2 className="text-sm sm:text-base font-extrabold text-[#0A3323] font-display">
                        Responde estas 2 preguntas sobre lo que viste en el minivideo
                      </h2>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#F8FBCA] border border-[#0A3323] text-xs font-mono font-extrabold text-[#0A3323]">
                      {solvedQuestionsCount}/{questions.length} correctas
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {questions.map((q) => {
                      const picked = answers[q.id];
                      return (
                        <div
                          key={q.id}
                          className="p-3.5 sm:p-4 rounded-2xl bg-[#F8FBCA]/45 border-2 border-[#0A3323]/20 space-y-2.5"
                        >
                          <p className="text-xs sm:text-sm font-extrabold text-[#0A3323]">
                            {q.question}
                          </p>

                          <div className="grid grid-cols-1 gap-2">
                            {q.options.map((opt, idx) => {
                              const isSelected = picked === idx;
                              const isRight = idx === q.correctIdx;

                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    if (idx === q.correctIdx) {
                                      soundFX.playSuccess();
                                    } else {
                                      soundFX.playError();
                                    }
                                    setAnswers((prev) => ({ ...prev, [q.id]: idx }));
                                  }}
                                  className={`p-3 rounded-xl border-2 border-b-4 text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                    isSelected
                                      ? isRight
                                        ? 'bg-[#D1FAE5] border-[#059669] text-[#064E3B]'
                                        : 'bg-[#FEE2E2] border-[#DC2626] text-[#7F1D1D]'
                                      : 'bg-white border-[#0A3323]/30 text-[#0A3323] hover:bg-[#F8FBCA]'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {isSelected && isRight && (
                                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {picked !== undefined && (
                            <p
                              className={`text-xs font-bold p-2.5 rounded-xl ${
                                picked === q.correctIdx
                                  ? 'bg-[#D1FAE5] text-[#064E3B]'
                                  : 'bg-[#FEE2E2] text-[#7F1D1D]'
                              }`}
                            >
                              {q.feedback}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PIE DE ACCIÓN */}
        <div className="relative z-10 px-4 sm:px-6 py-3.5 border-t-3 border-[#0A3323] bg-gradient-to-r from-[#F8FBCA] via-[#F7FAD5] to-[#F1D7FF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <BloomMascot mood={currentBloomMood} size="sm" plumage={plumage} />
            <div className="text-xs">
              <p className="font-extrabold text-[#0A3323]">
                {screenPhase === 'video'
                  ? 'Reproduciendo minivideo con voz de fondo...'
                  : !isCurrentLessonSolved
                  ? `Completa el juego dinámico y las 2 preguntas (${solvedQuestionsCount}/${questions.length})`
                  : `¡Lección 0${activeAngle} completada con éxito!`}
              </p>
              <p className="text-[11px] font-mono text-[#145A3A]">
                {screenPhase === 'video'
                  ? '🎬 Al terminar las 4 escenas pasarás automáticamente a las preguntas'
                  : isCurrentLessonSolved
                  ? '✓ Pulsa para guardar tu avance y pasar a la siguiente lección'
                  : '🔒 Supera el juego rápido y las 2 preguntas para avanzar'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end">
            {screenPhase === 'video' ? (
              <div className="px-4 py-2 rounded-2xl bg-[#0A3323]/10 border-2 border-[#0A3323]/30 text-[#0A3323] text-xs font-extrabold flex items-center gap-2">
                <Film className="w-3.5 h-3.5 shrink-0" />
                <span>Viendo minivideo...</span>
              </div>
            ) : !isCurrentLessonSolved ? (
              <div className="px-4 py-2 rounded-2xl bg-[#0A3323]/10 border-2 border-[#0A3323]/30 text-[#0A3323] text-xs font-extrabold flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {!dynamicGameSolved
                    ? 'Resuelve el juego dinámico'
                    : `Faltan ${questions.length - solvedQuestionsCount} pregunta(s)`}
                </span>
              </div>
            ) : activeAngle < 6 ? (
              <>
                <button
                  onClick={() => handleSaveLessonProgress(undefined, true)}
                  className="min-h-[42px] px-3.5 py-2 rounded-2xl bg-white hover:bg-[#F8FBCA] text-[#0A3323] border-2 border-[#0A3323] text-xs font-extrabold cursor-pointer"
                >
                  Terminar y salir
                </button>
                <button
                  onClick={() =>
                    handleSaveLessonProgress((activeAngle + 1) as LessonNumber, false)
                  }
                  className="min-h-[44px] px-5 py-2.5 rounded-2xl duo-btn-primary text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer"
                >
                  <span>¡Terminar Lección 0{activeAngle} y Siguiente!</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => handleSaveLessonProgress(undefined, true)}
                className="min-h-[46px] px-6 py-2.5 rounded-2xl duo-btn-primary text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>¡TERMINAR LECCIÓN 06 Y RECLAMAR PROGRESO!</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
