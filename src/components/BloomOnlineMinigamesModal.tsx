import React, { useState, useEffect, useRef } from 'react';
import {
  Gamepad2,
  Trophy,
  Zap,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Globe,
  Clock,
  Flame,
  X,
  Lock,
  Unlock,
} from 'lucide-react';
import {
  BloomMascot,
  PlumageTheme,
  EquippedSkinId,
  CasualShirtColor,
  HoodieVariant,
  JacketVariant,
  ArmorVariant,
  BloomEmoteId,
} from './BloomMascot';
import { PublicCommunityMember } from './BloomOnlineCommunityModal';
import { soundFX } from '../utils/soundEffects';

export type MinigameId = 'nectar_flight' | 'sprint_503020' | 'shield_radar';

export interface OnlineMinigameScore {
  id: string;
  gameId: MinigameId;
  userId: string;
  displayName: string;
  plumage: PlumageTheme;
  equippedSkin: EquippedSkinId;
  activeEmote: BloomEmoteId;
  score: number;
  quizStreakBonus: boolean;
  durationSec: number;
  timestampISO: string;
}

interface EntryFinanceQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const ENTRY_FINANCE_QUESTIONS: EntryFinanceQuestion[] = [
  {
    id: 'fq_1',
    category: 'Inflación y Rendimiento',
    question:
      'Si guardas $1,000 MXN bajo el colchón durante un año con inflación del 5%, ¿qué ocurre con tu dinero?',
    options: [
      'Conserva exactamente el mismo poder de compra',
      'Pierde poder adquisitivo porque las cosas suben de precio',
      'Gana 5% de rendimiento automático',
    ],
    correctIndex: 1,
    explanation:
      'El dinero estancado pierde poder de compra frente a la inflación; por eso conviene invertirlo con GAT Real positiva.',
  },
  {
    id: 'fq_2',
    category: 'Presupuesto 50/30/20',
    question:
      'En la regla 50/30/20, ¿qué porcentaje de tu ingreso se recomienda destinar directo a ahorro, inversión y futuro?',
    options: ['El 20% apenas recibes tu ingreso', 'Solo lo que sobre a fin de mes', 'El 50% en compras impulsivas'],
    correctIndex: 0,
    explanation:
      'Separar el 20% al inicio ("Págate a ti primero") garantiza que tu patrimonio crezca cada mes.',
  },
  {
    id: 'fq_3',
    category: 'Tarjetas de Crédito',
    question:
      '¿Qué significa ser un usuario "totalero" en una tarjeta de crédito?',
    options: [
      'Pagar únicamente el pago mínimo cada mes',
      'Usar el 100% del límite de crédito en caprichos',
      'Cubrir el 100% del saldo para no generar intereses antes de la fecha límite de pago',
    ],
    correctIndex: 2,
    explanation:
      'El usuario totalero liquida el total de sus compras antes de la fecha límite y aprovecha el financiamiento sin pagar intereses.',
  },
  {
    id: 'fq_4',
    category: 'Fondo de Emergencia',
    question:
      '¿Cuántos meses de tus gastos básicos se recomienda acumular en tu Fondo de Emergencia con liquidez diaria?',
    options: [
      'De 3 a 6 meses de gastos básicos',
      '1 sola semana de gastos',
      'Invertirlo todo a 10 años sin poder retirarlo',
    ],
    correctIndex: 0,
    explanation:
      'Tener de 3 a 6 meses de gastos básicos en un instrumento seguro y líquido te protege ante cualquier imprevisto sin endeudarte.',
  },
  {
    id: 'fq_5',
    category: 'Interés Compuesto',
    question:
      '¿Cuál es la clave del interés compuesto al invertir en instrumentos como CETES?',
    options: [
      'Retirar y gastar los intereses cada semana',
      'Reinvertir los intereses ganados para que también generen nuevos intereses',
      'Pedir préstamos con tasas altas',
    ],
    correctIndex: 1,
    explanation:
      'Al reinvertir tus ganancias, el capital crece de forma exponencial como una bola de nieve.',
  },
  {
    id: 'fq_6',
    category: 'Seguridad Digital',
    question:
      'Si recibes un mensaje urgente diciendo que tu cuenta será bloqueada a menos que ingreses tu NIP y CVV en una liga, ¿qué debes hacer?',
    options: [
      'Ingresar los datos rápido para no perder la cuenta',
      'No abrir la liga ni compartir NIP/CVV; ningún banco solicita datos confidenciales por mensaje',
      'Reenviarle foto de tu tarjeta por chat',
    ],
    correctIndex: 1,
    explanation:
      'Se trata de phishing. Tu banco jamás te pedirá NIP, contraseñas ni códigos CVV por mensaje o llamada.',
  },
  {
    id: 'fq_7',
    category: 'Compras Conscientes',
    question:
      '¿Para qué sirve aplicar la Regla de las 72 Horas antes de comprar algo que no tenías planeado?',
    options: [
      'Para enfriar el impulso emocional y decidir con claridad si realmente lo necesitas',
      'Para pagar más intereses en la tienda',
      'Para comprar el doble de artículos',
    ],
    correctIndex: 0,
    explanation:
      'Esperar 72 horas desactiva el impulso dopaminérgico y protege tu capital de compras de las que luego te arrepientes.',
  },
  {
    id: 'fq_8',
    category: 'Gasto Hormiga',
    question:
      '¿Qué es el "gasto hormiga" en tus finanzas personales?',
    options: [
      'El pago anual de tu seguro médico',
      'Pequeños gastos frecuentes (cafés, comisiones, antojos diarios) que sumados al mes representan una gran fuga',
      'La inversión mensual en tu cuenta de retiro',
    ],
    correctIndex: 1,
    explanation:
      'Aunque parecen montos pequeños de $30 o $60 MXN, al año pueden sumar más de $15,000 MXN que podrías haber invertido.',
  },
];

const MINIGAME_META: Record<
  MinigameId,
  {
    id: MinigameId;
    title: string;
    subtitle: string;
    durationSec: number;
    badge: string;
    accentBg: string;
  }
> = {
  nectar_flight: {
    id: 'nectar_flight',
    title: 'Vuelo de Néctar: CETES vs. Inflación',
    subtitle:
      'Atrapa activos que multiplican tu capital (+120 pts) y esquiva fugas e inflación en 30 segundos.',
    durationSec: 30,
    badge: 'ARCADE DE REFLEJOS · 30 SEG',
    accentBg: 'from-[#145A3A] to-[#105666]',
  },
  sprint_503020: {
    id: 'sprint_503020',
    title: 'Sprint Relámpago 50 / 30 / 20',
    subtitle:
      'Clasifica a toda velocidad cada gasto o ahorro en Necesidades (50%), Gustos (30%) o Inversión (20%).',
    durationSec: 30,
    badge: 'CLASIFICADOR RÁPIDO · 30 SEG',
    accentBg: 'from-[#734A91] to-[#1D2951]',
  },
  shield_radar: {
    id: 'shield_radar',
    title: 'Escudo Antifraude y Cazador de Fugas',
    subtitle:
      'Analiza alertas bancarias en tiempo real: aprueba inversiones reales y bloquea phishing o cargos fantasma.',
    durationSec: 30,
    badge: 'DEFENSA EN VIVO · 30 SEG',
    accentBg: 'from-[#8F6277] to-[#1E293B]',
  },
};

const SPRINT_503020_CARDS: {
  label: string;
  amount: string;
  category: '50' | '30' | '20';
  hint: string;
}[] = [
  {
    label: 'Despensa básica y verduras de la semana',
    amount: '$850 MXN',
    category: '50',
    hint: 'Alimentación esencial = 50% Necesidades',
  },
  {
    label: 'Transferencia automática a CETES 28 días',
    amount: '$600 MXN',
    category: '20',
    hint: 'Inversión patrimonial = 20% Ahorro y Futuro',
  },
  {
    label: 'Salida al cine VIP con palomitas',
    amount: '$320 MXN',
    category: '30',
    hint: 'Entretenimiento = 30% Gustos Conscientes',
  },
  {
    label: 'Recibo de luz e internet para estudiar',
    amount: '$590 MXN',
    category: '50',
    hint: 'Servicios básicos del hogar = 50% Necesidades',
  },
  {
    label: 'Aportación a tu Fondo de Emergencia (Bonddia)',
    amount: '$500 MXN',
    category: '20',
    hint: 'Reserva de liquidez = 20% Ahorro y Futuro',
  },
  {
    label: 'Videojuego o skin edición especial',
    amount: '$450 MXN',
    category: '30',
    hint: 'Ocio personal = 30% Gustos Conscientes',
  },
  {
    label: 'Transporte público / pasajes de la quincena',
    amount: '$380 MXN',
    category: '50',
    hint: 'Movilidad esencial = 50% Necesidades',
  },
  {
    label: 'Aportación voluntaria para tu retiro (Afore/ETF)',
    amount: '$700 MXN',
    category: '20',
    hint: 'Crecimiento a largo plazo = 20% Ahorro y Futuro',
  },
  {
    label: 'Cena con amigos el fin de semana',
    amount: '$420 MXN',
    category: '30',
    hint: 'Convivencia recreativa = 30% Gustos Conscientes',
  },
];

const SHIELD_RADAR_ALERTS: {
  title: string;
  detail: string;
  action: 'approve' | 'block';
  reason: string;
}[] = [
  {
    title: 'SMS Urgente: "Tu cuenta será suspendida, ingresa tu NIP aquí"',
    detail: 'Liga desconocida: http://banco-seguro-verifica.xyz',
    action: 'block',
    reason: '¡Phishing bloqueado! Ningún banco pide tu NIP por SMS.',
  },
  {
    title: 'Reinversión Automática de CETES 28 Días (+11% anual)',
    detail: 'Institución oficial: Cetesdirecto · Interés compuesto activo',
    action: 'approve',
    reason: '¡Excelente! Reinvertir tus rendimientos acelera tu capital.',
  },
  {
    title: 'Suscripción mensual de plataforma que no abres hace 4 meses',
    detail: 'Cargo automático recurrente: $249 MXN/mes',
    action: 'block',
    reason: '¡Fuga cancelada! Cortaste una suscripción fantasma.',
  },
  {
    title: 'Transferencia programada "Págate a ti primero" (20% ahorro)',
    detail: 'Destino: Tu Fondo de Emergencia con liquidez diaria',
    action: 'approve',
    reason: '¡Bien hecho! Automatizar tu ahorro protege tu futuro.',
  },
  {
    title: 'Llamada solicitando los 3 dígitos CVV de tu tarjeta',
    detail: 'Supuesto "soporte técnico" pide código de seguridad',
    action: 'block',
    reason: '¡Fraude detenido! El CVV jamás se comparte por llamada.',
  },
  {
    title: 'Compra impulsiva a las 11:30 PM por anuncio en redes',
    detail: 'Artículo no planeado: $1,290 MXN sin comparar precios',
    action: 'block',
    reason: '¡Regla de 72 horas aplicada! Evitaste un gasto emocional.',
  },
  {
    title: 'Pago total de tu tarjeta antes de la fecha límite (Totalero)',
    detail: '$0.00 MXN de intereses generados en el mes',
    action: 'approve',
    reason: '¡Perfecto! Ser totalero eleva tu score sin pagar intereses.',
  },
];

interface FallingFlightToken {
  id: number;
  lane: 0 | 1 | 2;
  yPct: number;
  label: string;
  isGood: boolean;
  points: number;
}

interface BloomOnlineMinigamesModalProps {
  currentUser: PublicCommunityMember | null;
  plumage: PlumageTheme;
  equippedSkin: EquippedSkinId;
  shirtColor: CasualShirtColor;
  hoodieVariant: HoodieVariant;
  jacketVariant: JacketVariant;
  armorVariant: ArmorVariant;
  activeEmote: BloomEmoteId;
  onEarnMinigameReward: (xp: number, protectedMXN: number) => void;
  onOpenLoginModal: () => void;
  onClose: () => void;
}

export const BloomOnlineMinigamesModal: React.FC<BloomOnlineMinigamesModalProps> = ({
  currentUser,
  plumage,
  equippedSkin,
  shirtColor,
  hoodieVariant,
  jacketVariant,
  armorVariant,
  activeEmote,
  onEarnMinigameReward,
  onOpenLoginModal,
  onClose,
}) => {
  const [selectedGame, setSelectedGame] = useState<MinigameId>('nectar_flight');
  // Stage: 'lobby' -> 'quiz_gate' (must answer finance questions first!) -> 'playing' (short 30s game) -> 'results'
  const [stage, setStage] = useState<'lobby' | 'quiz_gate' | 'playing' | 'results'>('lobby');

  // Online Leaderboard & Real-time SSE state
  const [scores, setScores] = useState<OnlineMinigameScore[]>([]);
  const [onlineConnections, setOnlineConnections] = useState<number>(1);
  const [liveToast, setLiveToast] = useState<string | null>(null);

  // Quiz Gate State (2 Finance Questions required before playing!)
  const [gateQuestions, setGateQuestions] = useState<EntryFinanceQuestion[]>([]);
  const [gateIdx, setGateIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isOptionCorrect, setIsOptionCorrect] = useState<boolean | null>(null);
  const [firstTryCorrectCount, setFirstTryCorrectCount] = useState<number>(0);
  const [attemptedCurrentQuestion, setAttemptedCurrentQuestion] = useState<boolean>(false);

  // Active Short Minigame State (30 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(1);
  const [feedbackBanner, setFeedbackBanner] = useState<{
    text: string;
    good: boolean;
  } | null>(null);

  // Game 1: Nectar Flight State
  const [playerLane, setPlayerLane] = useState<0 | 1 | 2>(1);
  const [flightTokens, setFlightTokens] = useState<FallingFlightToken[]>([]);
  const playerLaneRef = useRef<0 | 1 | 2>(1);
  const nextTokenIdRef = useRef<number>(1);

  // Game 2: Sprint 50/30/20 State
  const [sprintCardIdx, setSprintCardIdx] = useState<number>(0);

  // Game 3: Shield Radar State
  const [radarAlertIdx, setRadarAlertIdx] = useState<number>(0);

  // Connect to Real-time SSE Stream + initial overview fetch
  useEffect(() => {
    let isMounted = true;
    fetch('/api/minigames/overview')
      .then((r) => r.json())
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data.scores)) setScores(data.scores);
        if (typeof data.onlineConnections === 'number') {
          setOnlineConnections(data.onlineConnections);
        }
      })
      .catch(() => {});

    const evSource = new EventSource('/api/minigames/stream');
    evSource.addEventListener('init', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        if (Array.isArray(data.scores)) setScores(data.scores);
        if (typeof data.onlineConnections === 'number') {
          setOnlineConnections(data.onlineConnections);
        }
      } catch {
        // ignore parse error
      }
    });

    evSource.addEventListener('score:updated', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data) as {
          latestEntry?: OnlineMinigameScore;
          scores?: OnlineMinigameScore[];
        };
        if (Array.isArray(data.scores)) setScores(data.scores);
        if (data.latestEntry) {
          setLiveToast(
            `⚡ En vivo: ${data.latestEntry.displayName} logró ${data.latestEntry.score} pts en ${MINIGAME_META[data.latestEntry.gameId].title}`
          );
          window.setTimeout(() => {
            if (isMounted) setLiveToast(null);
          }, 4500);
        }
      } catch {
        // ignore parse error
      }
    });

    return () => {
      isMounted = false;
      evSource.close();
    };
  }, []);

  // Pick 2 random financial questions to unlock the minigame
  const startQuizGateForGame = (gameId: MinigameId) => {
    soundFX.playTap();
    setSelectedGame(gameId);
    const shuffled = [...ENTRY_FINANCE_QUESTIONS].sort(() => Math.random() - 0.5);
    setGateQuestions(shuffled.slice(0, 2));
    setGateIdx(0);
    setSelectedOption(null);
    setIsOptionCorrect(null);
    setFirstTryCorrectCount(0);
    setAttemptedCurrentQuestion(false);
    setStage('quiz_gate');
  };

  const handleSelectQuizOption = (optIndex: number) => {
    const currentQ = gateQuestions[gateIdx];
    if (!currentQ) return;
    setSelectedOption(optIndex);
    const correct = optIndex === currentQ.correctIndex;
    setIsOptionCorrect(correct);

    if (correct) {
      soundFX.playSuccess();
      if (!attemptedCurrentQuestion) {
        setFirstTryCorrectCount((prev) => prev + 1);
      }
    } else {
      soundFX.playError();
    }
    setAttemptedCurrentQuestion(true);
  };

  const handleAdvanceFromQuizQuestion = () => {
    if (gateIdx + 1 < gateQuestions.length) {
      soundFX.playTap();
      setGateIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsOptionCorrect(null);
      setAttemptedCurrentQuestion(false);
    } else {
      // Both finance entry questions answered -> Launch the 30-second minigame!
      launchActiveMinigame();
    }
  };

  const launchActiveMinigame = () => {
    soundFX.playCelebration();
    const initialBonus = firstTryCorrectCount === 2 ? 150 : firstTryCorrectCount === 1 ? 75 : 30;
    setScore(initialBonus);
    setCombo(1);
    setTimeLeft(MINIGAME_META[selectedGame].durationSec);
    setFeedbackBanner({
      text:
        firstTryCorrectCount === 2
          ? '¡Pase Financiero Perfecto! Comienzas con +150 pts y bono activo'
          : `¡Pase Financiero superado! Comienzas con +${initialBonus} pts`,
      good: true,
    });
    setPlayerLane(1);
    playerLaneRef.current = 1;
    setFlightTokens([]);
    setSprintCardIdx(0);
    setRadarAlertIdx(0);
    setStage('playing');
  };

  // 30-second countdown timer while stage === 'playing'
  useEffect(() => {
    if (stage !== 'playing') return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [stage]);

  // Trigger end of game when timeLeft hits 0
  useEffect(() => {
    if (stage === 'playing' && timeLeft === 0) {
      finishMinigameRound();
    }
  }, [stage, timeLeft]);

  // Game 1: Nectar Flight loop (tokens fall and collide with Bloom's lane)
  useEffect(() => {
    if (stage !== 'playing' || selectedGame !== 'nectar_flight') return;

    const goodLabels = [
      'CETES +11%',
      'Fondo Emergencia',
      'Interés Compuesto',
      'Ahorro 20%',
      'GAT Real +',
    ];
    const badLabels = [
      'Gasto Hormiga -$80',
      'Pago Mínimo TDC',
      'Inflación -5%',
      'Phishing SMS',
      'Compra Impulsiva',
    ];

    const interval = window.setInterval(() => {
      setFlightTokens((prev) => {
        const moved = prev
          .map((t) => ({ ...t, yPct: t.yPct + 11 }))
          .filter((t) => {
            // Check collision near bottom (yPct >= 78 && yPct <= 95)
            if (t.yPct >= 78 && t.yPct <= 95 && t.lane === playerLaneRef.current) {
              if (t.isGood) {
                soundFX.playSuccess();
                setScore((s) => s + t.points);
                setCombo((c) => Math.min(5, c + 1));
                setFeedbackBanner({
                  text: `✓ ¡Atrapaste ${t.label}! +${t.points} pts`,
                  good: true,
                });
              } else {
                soundFX.playError();
                setScore((s) => Math.max(0, s - 60));
                setCombo(1);
                setFeedbackBanner({
                  text: `⚠️ Choque con ${t.label} (-60 pts)`,
                  good: false,
                });
              }
              return false;
            }
            return t.yPct < 98;
          });

        // Spawn a new token with ~65% probability per tick
        if (Math.random() < 0.68 && moved.length < 5) {
          const isGood = Math.random() < 0.62;
          const lane = Math.floor(Math.random() * 3) as 0 | 1 | 2;
          const labelList = isGood ? goodLabels : badLabels;
          const label = labelList[Math.floor(Math.random() * labelList.length)];
          moved.push({
            id: nextTokenIdRef.current++,
            lane,
            yPct: 6,
            label,
            isGood,
            points: isGood ? 120 : 60,
          });
        }
        return moved;
      });
    }, 280);

    return () => window.clearInterval(interval);
  }, [stage, selectedGame]);

  // Keyboard support for Nectar Flight lanes
  useEffect(() => {
    if (stage !== 'playing' || selectedGame !== 'nectar_flight') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPlayerLane((prev) => {
          const next = Math.max(0, prev - 1) as 0 | 1 | 2;
          playerLaneRef.current = next;
          return next;
        });
      } else if (e.key === 'ArrowRight') {
        setPlayerLane((prev) => {
          const next = Math.min(2, prev + 1) as 0 | 1 | 2;
          playerLaneRef.current = next;
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, selectedGame]);

  // Game 2 handler: Classify 50 / 30 / 20
  const handlePickSprintCategory = (picked: '50' | '30' | '20') => {
    const card = SPRINT_503020_CARDS[sprintCardIdx % SPRINT_503020_CARDS.length];
    if (picked === card.category) {
      soundFX.playSuccess();
      const gained = 110 + combo * 20;
      setScore((prev) => prev + gained);
      setCombo((prev) => Math.min(5, prev + 1));
      setFeedbackBanner({
        text: `✓ ¡Correcto! ${card.hint} (+${gained} pts)`,
        good: true,
      });
    } else {
      soundFX.playError();
      setCombo(1);
      setScore((prev) => Math.max(0, prev - 40));
      setFeedbackBanner({
        text: `✗ Era ${card.category}%: ${card.hint}`,
        good: false,
      });
    }
    setSprintCardIdx((prev) => prev + 1);
  };

  // Game 3 handler: Approve or Block on Security Radar
  const handlePickRadarDecision = (decision: 'approve' | 'block') => {
    const alertItem = SHIELD_RADAR_ALERTS[radarAlertIdx % SHIELD_RADAR_ALERTS.length];
    if (decision === alertItem.action) {
      soundFX.playSuccess();
      const gained = 130 + combo * 25;
      setScore((prev) => prev + gained);
      setCombo((prev) => Math.min(5, prev + 1));
      setFeedbackBanner({
        text: `✓ ${alertItem.reason} (+${gained} pts)`,
        good: true,
      });
    } else {
      soundFX.playError();
      setCombo(1);
      setScore((prev) => Math.max(0, prev - 50));
      setFeedbackBanner({
        text: `⚠️ Riesgo financiero: ${alertItem.reason}`,
        good: false,
      });
    }
    setRadarAlertIdx((prev) => prev + 1);
  };

  const finishMinigameRound = async () => {
    soundFX.playCelebration();
    setStage('results');

    const earnedXP = Math.max(40, Math.round(score / 10));
    const earnedMXN = Math.max(80, Math.round(score / 4));
    onEarnMinigameReward(earnedXP, earnedMXN);

    try {
      const res = await fetch('/api/minigames/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: selectedGame,
          userId: currentUser?.id || 'guest_local',
          displayName: currentUser?.displayName || 'Tú (Explorador Bloom)',
          plumage,
          equippedSkin,
          activeEmote,
          score,
          quizStreakBonus: firstTryCorrectCount === 2,
          durationSec: MINIGAME_META[selectedGame].durationSec,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.scores)) {
          setScores(data.scores);
        }
      }
    } catch {
      // ignore network error
    }
  };

  const filteredLeaderboard = scores
    .filter((s) => s.gameId === selectedGame)
    .sort((a, b) => b.score - a.score);

  const currentQ = gateQuestions[gateIdx];
  const currentSprintCard =
    SPRINT_503020_CARDS[sprintCardIdx % SPRINT_503020_CARDS.length];
  const currentRadarAlert =
    SHIELD_RADAR_ALERTS[radarAlertIdx % SHIELD_RADAR_ALERTS.length];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A3323]/85 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="minigames-online-title"
    >
      <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-gradient-to-br from-[#F8FBCA] via-[#F9D6D5] to-[#F1D7FF] rounded-3xl border-3 border-[#0A3323] border-b-8 p-5 sm:p-6 shadow-2xl space-y-5 my-auto">
        {/* TOP HEADER */}
        <div className="flex items-start justify-between gap-4 pb-3 border-b-2 border-[#0A3323]/20">
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
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0A3323] text-[#34D399] text-[10px] font-mono font-extrabold">
                  <Globe className="w-3 h-3" />
                  <span>
                    {currentUser
                      ? `SESIÓN EN LÍNEA: ${currentUser.displayName.toUpperCase()}`
                      : `MODO ONLINE ACTIVO (${onlineConnections} CONEXIÓN)`}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#734A91] text-white text-[10px] font-mono font-extrabold">
                  <Clock className="w-3 h-3" />
                  <span>PARTIDAS CORTAS DE 30 SEG · PASE CON PREGUNTAS FINANCIERAS</span>
                </span>
              </div>
              <h3
                id="minigames-online-title"
                className="text-lg sm:text-xl font-semibold text-[#0A3323] font-display mt-0.5"
              >
                Minijuegos Online Cortos con Pase Financiero
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-[#F8FBCA] border-2 border-[#0A3323] flex items-center justify-center text-[#0A3323] hover:bg-[#F6C8C7] cursor-pointer shrink-0"
            aria-label="Cerrar minijuegos online"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* REAL-TIME ONLINE SCORE NOTIFICATION */}
        {liveToast && (
          <div className="px-4 py-2.5 rounded-2xl bg-[#0F172A] border-2 border-[#34D399] text-[#34D399] text-xs font-mono font-extrabold flex items-center justify-between">
            <span>{liveToast}</span>
            <span className="text-[10px] text-white">EN TIEMPO REAL</span>
          </div>
        )}

        {/* 3 MINIGAME SELECTOR TABS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.keys(MINIGAME_META) as MinigameId[]).map((gId) => {
            const meta = MINIGAME_META[gId];
            const isSelected = selectedGame === gId;
            return (
              <button
                key={gId}
                onClick={() => {
                  soundFX.playTap();
                  setSelectedGame(gId);
                  if (stage !== 'lobby') setStage('lobby');
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `bg-gradient-to-br ${meta.accentBg} text-white border-[#0A3323] border-b-4 ring-3 ring-[#0A3323]`
                    : 'bg-white/90 text-[#0A3323] border-[#0A3323]/40 hover:bg-white'
                }`}
              >
                <div>
                  <span
                    className={`inline-block text-[10px] font-mono font-extrabold uppercase ${
                      isSelected ? 'text-[#FFD166]' : 'text-[#734A91]'
                    }`}
                  >
                    {meta.badge}
                  </span>
                  <h4 className="text-sm font-extrabold mt-0.5 leading-snug">{meta.title}</h4>
                </div>
                <p
                  className={`text-[11px] mt-1.5 leading-snug ${
                    isSelected ? 'text-white/90' : 'text-[#0A3323]/80'
                  }`}
                >
                  {meta.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* MAIN CONTENT GRID: LEFT = GAME ARENA (7 cols), RIGHT = ONLINE LEADERBOARD (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT 7 COLS: GAME ARENA */}
          <div className="lg:col-span-7 p-5 rounded-3xl bg-[#0F172A] border-3 border-[#0A3323] border-b-6 text-white space-y-4 shadow-xl">
            {/* STAGE 1: LOBBY */}
            {stage === 'lobby' && (
              <div className="space-y-4 text-center py-4">
                <div className="flex justify-center">
                  <BloomMascot
                    size="lg"
                    plumage={plumage}
                    previewSkin={equippedSkin}
                    shirtColor={shirtColor}
                    hoodieVariant={hoodieVariant}
                    jacketVariant={jacketVariant}
                    armorVariant={armorVariant}
                    emote={activeEmote}
                  />
                </div>

                <div className="space-y-1.5 max-w-lg mx-auto">
                  <span className="px-3 py-1 rounded-full bg-[#34D399]/20 border border-[#34D399] text-[#34D399] text-[11px] font-mono font-extrabold">
                    REQUISITO DE ENTRADA: 2 PREGUNTAS RÁPIDAS DE FINANZAS
                  </span>
                  <h4 className="text-xl font-semibold text-white font-display">
                    {MINIGAME_META[selectedGame].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F8FBCA]/90 leading-relaxed">
                    {MINIGAME_META[selectedGame].subtitle}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 max-w-md mx-auto text-left space-y-1.5 text-xs">
                  <p className="font-mono font-extrabold text-[#FFD166] uppercase text-[10px]">
                    ¿CÓMO FUNCIONA LA PARTIDA ONLINE?
                  </p>
                  <p className="text-white/95">
                    1. Respondes <strong>2 preguntas de finanzas</strong> para desbloquear el arranque y ganar hasta <strong>+150 pts de bono inicial</strong>.
                  </p>
                  <p className="text-white/95">
                    2. Juegas una ronda intensa y corta de <strong>30 segundos</strong>.
                  </p>
                  <p className="text-white/95">
                    3. Tu récord se publica en tiempo real en el ranking online junto a tu Colibrí Bloom.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => startQuizGateForGame(selectedGame)}
                    className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-[#34D399] hover:bg-[#10B981] text-[#0A3323] border-2 border-[#F8FBCA] border-b-4 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-transform active:translate-y-0.5"
                  >
                    <Gamepad2 className="w-5 h-5" />
                    <span>Responder Preguntas de Finanzas y Jugar (30s)</span>
                  </button>

                  {!currentUser && (
                    <button
                      onClick={() => {
                        soundFX.playTap();
                        onOpenLoginModal();
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-xs font-extrabold text-[#F8FBCA] cursor-pointer"
                    >
                      Iniciar sesión para guardar mi nombre
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* STAGE 2: MANDATORY FINANCE QUESTIONS GATE BEFORE PLAYING */}
            {stage === 'quiz_gate' && currentQ && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/15">
                  <span className="px-3 py-1 rounded-full bg-[#F59E0B] text-[#0A3323] text-[11px] font-mono font-extrabold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>
                      PASE FINANCIERO PARA COMENZAR · PREGUNTA {gateIdx + 1} DE{' '}
                      {gateQuestions.length}
                    </span>
                  </span>
                  <span className="text-xs font-mono text-[#34D399] font-extrabold">
                    Categoría: {currentQ.category}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#1E293B] border-2 border-[#38BDF8] space-y-3">
                  <p className="text-sm sm:text-base font-extrabold text-white leading-snug">
                    {currentQ.question}
                  </p>

                  <div className="space-y-2">
                    {currentQ.options.map((opt, idx) => {
                      const isPicked = selectedOption === idx;
                      const isRightOption = idx === currentQ.correctIndex;
                      let btnStyle =
                        'bg-[#0F172A] border-white/25 text-white hover:border-[#38BDF8]';
                      if (isPicked) {
                        btnStyle = isOptionCorrect
                          ? 'bg-[#065F46] border-[#34D399] text-white ring-2 ring-[#34D399]'
                          : 'bg-[#7F1D1D] border-[#F87171] text-white';
                      } else if (selectedOption !== null && isRightOption) {
                        btnStyle = 'bg-[#065F46]/60 border-[#34D399] text-[#A7F3D0]';
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectQuizOption(idx)}
                          className={`w-full p-3 rounded-xl border-2 text-left text-xs sm:text-sm font-bold flex items-center justify-between gap-3 cursor-pointer transition-all ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isPicked &&
                            (isOptionCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-[#F87171] shrink-0" />
                            ))}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption !== null && (
                    <div
                      className={`p-3 rounded-xl border text-xs space-y-2 ${
                        isOptionCorrect
                          ? 'bg-[#064E3B] border-[#34D399] text-[#A7F3D0]'
                          : 'bg-[#451A03] border-[#FBBF24] text-[#FDE68A]'
                      }`}
                    >
                      <p className="font-extrabold">
                        {isOptionCorrect
                          ? '✓ ¡Respuesta correcta! Pase financiero validado.'
                          : '💡 Selecciona la opción correcta en verde para continuar:'}
                      </p>
                      <p className="text-white/95 leading-relaxed">{currentQ.explanation}</p>

                      {isOptionCorrect && (
                        <button
                          onClick={handleAdvanceFromQuizQuestion}
                          className="w-full min-h-[42px] mt-1 px-4 py-2 rounded-xl bg-[#34D399] text-[#0A3323] font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Unlock className="w-4 h-4" />
                          <span>
                            {gateIdx + 1 < gateQuestions.length
                              ? 'Siguiente Pregunta de Finanzas →'
                              : '¡Pase Desbloqueado! Comenzar Minijuego (30s) →'}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STAGE 3: ACTIVE 30-SECOND MINIGAME */}
            {stage === 'playing' && (
              <div className="space-y-3.5">
                {/* Live Telemetry Bar: Countdown, Score, Combo */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-[#1E293B] border-2 border-[#38BDF8]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-xl font-mono text-sm font-extrabold flex items-center gap-1.5 ${
                        timeLeft <= 8
                          ? 'bg-[#EF4444] text-white animate-pulse'
                          : 'bg-[#0F172A] text-[#38BDF8]'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>{timeLeft}s</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-[#0F172A] text-[#FFD166] font-mono text-xs font-extrabold">
                      COMBO x{combo}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#A7F3D0] block">
                      PUNTUACIÓN ONLINE
                    </span>
                    <span className="text-lg font-mono font-extrabold text-white tabular-nums">
                      {score} PTS
                    </span>
                  </div>
                </div>

                {feedbackBanner && (
                  <div
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border ${
                      feedbackBanner.good
                        ? 'bg-[#064E3B] border-[#34D399] text-[#A7F3D0]'
                        : 'bg-[#7F1D1D] border-[#F87171] text-[#FECACA]'
                    }`}
                  >
                    {feedbackBanner.text}
                  </div>
                )}

                {/* GAME 1: NECTAR FLIGHT (3 LANES ARCADE) */}
                {selectedGame === 'nectar_flight' && (
                  <div className="space-y-3">
                    <div className="relative h-72 rounded-2xl bg-gradient-to-b from-[#091E16] via-[#0F293A] to-[#1E1B4B] border-2 border-[#34D399] overflow-hidden select-none">
                      {/* 3 Vertical Lane Dividers */}
                      <div className="absolute inset-0 grid grid-cols-3 pointer-events-none">
                        <div className="border-r border-white/10" />
                        <div className="border-r border-white/10" />
                        <div />
                      </div>

                      {/* Falling Financial Tokens */}
                      {flightTokens.map((tok) => (
                        <div
                          key={tok.id}
                          style={{
                            top: `${tok.yPct}%`,
                            left: `${tok.lane * 33.33 + 16.66}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                          className={`absolute px-2.5 py-1 rounded-xl border-2 text-[11px] font-extrabold whitespace-nowrap shadow-md transition-all duration-150 ${
                            tok.isGood
                              ? 'bg-[#065F46] border-[#34D399] text-[#A7F3D0]'
                              : 'bg-[#7F1D1D] border-[#F87171] text-[#FECACA]'
                          }`}
                        >
                          {tok.isGood ? '💎 ' : '⚠️ '}
                          {tok.label}
                        </div>
                      ))}

                      {/* Player Controlled Bloom Mascot at the Bottom Lane */}
                      <div
                        style={{
                          bottom: '6px',
                          left: `${playerLane * 33.33 + 16.66}%`,
                          transform: 'translateX(-50%)',
                        }}
                        className="absolute transition-all duration-150"
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
                      </div>
                    </div>

                    {/* 3 Tactile Lane Controls */}
                    <div className="grid grid-cols-3 gap-2.5">
                      {(['Carril Izquierdo', 'Carril Central', 'Carril Derecho'] as const).map(
                        (label, laneIdx) => {
                          const lane = laneIdx as 0 | 1 | 2;
                          const active = playerLane === lane;
                          return (
                            <button
                              key={lane}
                              type="button"
                              onClick={() => {
                                soundFX.playTap();
                                setPlayerLane(lane);
                                playerLaneRef.current = lane;
                              }}
                              className={`min-h-[46px] py-2.5 px-3 rounded-xl border-2 font-extrabold text-xs cursor-pointer transition-all ${
                                active
                                  ? 'bg-[#34D399] text-[#0A3323] border-white border-b-4'
                                  : 'bg-[#1E293B] text-white border-white/25 hover:border-[#34D399]'
                              }`}
                            >
                              {lane === 0 ? '← ' : ''}
                              {label}
                              {lane === 2 ? ' →' : ''}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}

                {/* GAME 2: SPRINT 50 / 30 / 20 */}
                {selectedGame === 'sprint_503020' && (
                  <div className="space-y-4 py-2">
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#312E81] to-[#1E1B4B] border-2 border-[#E0B0FF] text-center space-y-2">
                      <span className="px-3 py-0.5 rounded-full bg-[#F1D7FF] text-[#1D2951] text-[11px] font-mono font-extrabold">
                        MONTO: {currentSprintCard.amount}
                      </span>
                      <h5 className="text-base sm:text-lg font-extrabold text-white">
                        {currentSprintCard.label}
                      </h5>
                      <p className="text-xs text-[#E0B0FF]">
                        ¿En qué bloque de tu presupuesto 50 / 30 / 20 va este movimiento?
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        onClick={() => handlePickSprintCategory('50')}
                        className="min-h-[56px] p-3 rounded-2xl bg-[#145A3A] hover:bg-[#2F7D5B] border-2 border-[#F8FBCA] border-b-4 text-white font-extrabold text-xs flex flex-col items-center justify-center cursor-pointer"
                      >
                        <span className="text-sm font-mono text-[#FFD166]">50%</span>
                        <span>Necesidades Vitales</span>
                      </button>

                      <button
                        onClick={() => handlePickSprintCategory('30')}
                        className="min-h-[56px] p-3 rounded-2xl bg-[#734A91] hover:bg-[#A87BC7] border-2 border-[#F1D7FF] border-b-4 text-white font-extrabold text-xs flex flex-col items-center justify-center cursor-pointer"
                      >
                        <span className="text-sm font-mono text-[#FFD166]">30%</span>
                        <span>Gustos Conscientes</span>
                      </button>

                      <button
                        onClick={() => handlePickSprintCategory('20')}
                        className="min-h-[56px] p-3 rounded-2xl bg-[#0369A1] hover:bg-[#0284C7] border-2 border-[#BAE6FD] border-b-4 text-white font-extrabold text-xs flex flex-col items-center justify-center cursor-pointer"
                      >
                        <span className="text-sm font-mono text-[#FFD166]">20%</span>
                        <span>Ahorro e Inversión</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* GAME 3: ESCUDO ANTIFRAUDE Y CAZADOR DE FUGAS */}
                {selectedGame === 'shield_radar' && (
                  <div className="space-y-4 py-2">
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-2 border-[#FBBF24] space-y-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FBBF24] text-[#0A3323] text-[10px] font-mono font-extrabold">
                        RADAR BANCARIO EN TIEMPO REAL
                      </span>
                      <h5 className="text-base sm:text-lg font-extrabold text-white">
                        {currentRadarAlert.title}
                      </h5>
                      <p className="text-xs font-mono text-[#94A3B8]">
                        {currentRadarAlert.detail}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handlePickRadarDecision('approve')}
                        className="min-h-[56px] p-3.5 rounded-2xl bg-[#059669] hover:bg-[#10B981] border-2 border-[#A7F3D0] border-b-4 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>✓ Aprobar / Conservar</span>
                      </button>

                      <button
                        onClick={() => handlePickRadarDecision('block')}
                        className="min-h-[56px] p-3.5 rounded-2xl bg-[#DC2626] hover:bg-[#EF4444] border-2 border-[#FCA5A5] border-b-4 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-5 h-5" />
                        <span>🛡️ Bloquear / Cancelar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STAGE 4: POST-GAME ONLINE RESULTS */}
            {stage === 'results' && (
              <div className="space-y-4 text-center py-4">
                <div className="flex justify-center">
                  <BloomMascot
                    size="lg"
                    plumage={plumage}
                    previewSkin={equippedSkin}
                    shirtColor={shirtColor}
                    hoodieVariant={hoodieVariant}
                    jacketVariant={jacketVariant}
                    armorVariant={armorVariant}
                    emote={activeEmote !== 'none' ? activeEmote : 'six_seven'}
                  />
                </div>

                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full bg-[#34D399]/20 border border-[#34D399] text-[#34D399] text-xs font-mono font-extrabold">
                    ✓ RÉCORD SINCRONIZADO EN EL RANKING ONLINE
                  </span>
                  <h4 className="text-2xl font-extrabold text-[#FFD166] font-mono">
                    {score} PUNTOS
                  </h4>
                  <p className="text-xs text-[#F8FBCA]">
                    Ganaste <strong>+{Math.max(40, Math.round(score / 10))} XP</strong> y protegiste{' '}
                    <strong>+${Math.max(80, Math.round(score / 4))} MXN</strong> para tu progreso general.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => startQuizGateForGame(selectedGame)}
                    className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-[#34D399] hover:bg-[#10B981] text-[#0A3323] border-2 border-[#F8FBCA] border-b-4 text-xs font-extrabold flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Volver a Jugar (Nuevas Preguntas)</span>
                  </button>

                  <button
                    onClick={() => setStage('lobby')}
                    className="min-h-[44px] px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs font-extrabold cursor-pointer"
                  >
                    Cambiar de Minijuego
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT 5 COLS: LIVE ONLINE LEADERBOARD FOR THIS MINIGAME */}
          <div className="lg:col-span-5 p-4 sm:p-5 rounded-3xl bg-white/95 border-2 border-[#0A3323] border-b-6 space-y-3.5 shadow-lg">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#0A3323]/15">
              <div>
                <p className="text-[10px] font-mono font-extrabold text-[#145A3A] uppercase">
                  TABLA DE RÉCORDS EN LÍNEA
                </p>
                <h4 className="text-sm sm:text-base font-extrabold text-[#0A3323] font-display">
                  {MINIGAME_META[selectedGame].title}
                </h4>
              </div>
              <Trophy className="w-5 h-5 text-[#D97706] shrink-0" />
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredLeaderboard.length === 0 ? (
                <div className="p-5 rounded-2xl bg-[#F8FBCA]/60 border-2 border-[#0A3323]/30 text-center space-y-2">
                  <Trophy className="w-7 h-7 text-[#145A3A] mx-auto" />
                  <p className="text-xs font-extrabold text-[#0A3323]">
                    Aún no hay récords registrados en este minijuego
                  </p>
                  <p className="text-[11px] text-[#0A3323]/80 leading-relaxed">
                    Responde las 2 preguntas financieras de entrada y completa una partida de 30 segundos para registrar tu puntaje oficial.
                  </p>
                </div>
              ) : (
                filteredLeaderboard.map((entry, idx) => {
                  const isSelf =
                    (currentUser && entry.userId === currentUser.id) ||
                    entry.userId === 'guest_local';
                  return (
                    <div
                      key={entry.id}
                      className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-2.5 ${
                        isSelf
                          ? 'bg-[#F8FBCA] border-[#145A3A] ring-2 ring-[#145A3A]'
                          : 'bg-white border-[#0A3323]/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-lg font-mono text-xs font-extrabold flex items-center justify-center shrink-0 border ${
                            idx === 0
                              ? 'bg-[#FFD166] text-[#0A3323] border-[#0A3323]'
                              : 'bg-[#0A3323] text-[#F8FBCA] border-[#0A3323]'
                          }`}
                        >
                          #{idx + 1}
                        </span>
                        <BloomMascot
                          size="sm"
                          plumage={entry.plumage}
                          previewSkin={entry.equippedSkin}
                          emote={entry.activeEmote}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-extrabold text-[#0A3323] truncate">
                            {entry.displayName}
                          </p>
                          <p className="text-[10px] font-mono text-[#145A3A]">
                            {entry.quizStreakBonus
                              ? '★ Pase Financiero Perfecto'
                              : 'Pase Financiero Completado'}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="px-2.5 py-1 rounded-xl bg-[#0A3323] text-[#FFD166] font-mono text-xs font-extrabold tabular-nums">
                          {entry.score} pts
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
