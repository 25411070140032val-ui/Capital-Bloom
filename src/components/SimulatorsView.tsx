import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  Brain,
  Scale,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { BloomMascot, PlumageTheme } from './BloomMascot';
import { soundFX } from '../utils/soundEffects';

interface SimulatorsViewProps {
  learningMode: 'seed' | 'flight';
  plumage?: PlumageTheme;
  onEarnSimulatorXP: (xp: number, savedMXN: number) => void;
}

interface AntLeakItem {
  id: string;
  name: string;
  category: 'Hormiga' | 'Fantasma' | 'Micropago';
  dailyOrMonthlyCostMXN: number;
  frequencyPerYear: number;
  redirected: boolean;
}

const INITIAL_LEAKS: AntLeakItem[] = [
  {
    id: 'leak-1',
    name: 'Refresco, café o antojo diario de camino ($45 MXN/día)',
    category: 'Hormiga',
    dailyOrMonthlyCostMXN: 45,
    frequencyPerYear: 240,
    redirected: true,
  },
  {
    id: 'leak-2',
    name: 'Monedas virtuales / Skins / Pase de temporada ($380 MXN/mes)',
    category: 'Micropago',
    dailyOrMonthlyCostMXN: 380,
    frequencyPerYear: 12,
    redirected: true,
  },
  {
    id: 'leak-3',
    name: 'Dos suscripciones de streaming o apps olvidadas ($340 MXN/mes)',
    category: 'Fantasma',
    dailyOrMonthlyCostMXN: 340,
    frequencyPerYear: 12,
    redirected: false,
  },
  {
    id: 'leak-4',
    name: 'Comisiones y envíos de comida rápida por app ($160 MXN/semana)',
    category: 'Hormiga',
    dailyOrMonthlyCostMXN: 160,
    frequencyPerYear: 52,
    redirected: false,
  },
];

export const SimulatorsView: React.FC<SimulatorsViewProps> = ({
  learningMode,
  plumage = 'emerald',
  onEarnSimulatorXP,
}) => {
  const [activeSimulator, setActiveSimulator] = useState<'cetes' | 'frontal' | 'fiscal'>('cetes');

  // --- SIMULATOR 1: CETES, INFLATION & CUSTODY ---
  const [initialCapital, setInitialCapital] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(600);
  const [yearsHorizon, setYearsHorizon] = useState<number>(5);
  const [cetesRate, setCetesRate] = useState<number>(10.25);
  const [inflationRate, setInflationRate] = useState<number>(4.2);

  const cetesProjection = useMemo(() => {
    const points: {
      year: number;
      investedPrincipal: number;
      cetesNominal: number;
      mattressRealValue: number;
    }[] = [];

    const rMonthly = cetesRate / 100 / 12;
    const infAnnual = inflationRate / 100;

    for (let y = 0; y <= yearsHorizon; y++) {
      const months = y * 12;
      const principal = initialCapital + monthlyContribution * months;

      let cetesTotal = initialCapital * Math.pow(1 + rMonthly, months);
      if (rMonthly > 0 && months > 0) {
        cetesTotal +=
          monthlyContribution * ((Math.pow(1 + rMonthly, months) - 1) / rMonthly);
      } else {
        cetesTotal = principal;
      }

      const mattressReal = principal / Math.pow(1 + infAnnual, y);

      points.push({
        year: y,
        investedPrincipal: Math.round(principal),
        cetesNominal: Math.round(cetesTotal),
        mattressRealValue: Math.round(mattressReal),
      });
    }

    return points;
  }, [initialCapital, monthlyContribution, yearsHorizon, cetesRate, inflationRate]);

  const finalPoint = cetesProjection[cetesProjection.length - 1];
  const gatReal = (((1 + cetesRate / 100) / (1 + inflationRate / 100) - 1) * 100).toFixed(2);
  const compoundGain = finalPoint.cetesNominal - finalPoint.investedPrincipal;
  const inflationLossOnCash = finalPoint.investedPrincipal - finalPoint.mattressRealValue;

  // --- SIMULATOR 2: FRONTAL LOBE & ANT EXPENSE INTERCEPTOR ---
  const [leaks, setLeaks] = useState<AntLeakItem[]>(INITIAL_LEAKS);
  const [waiting72HoursApplied, setWaiting72HoursApplied] = useState<boolean>(true);
  const [claimedHabitReward, setClaimedHabitReward] = useState<boolean>(false);

  const toggleLeakRedirect = (id: string) => {
    soundFX.playTap();
    setLeaks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, redirected: !item.redirected } : item))
    );
  };

  const leakStats = useMemo(() => {
    let annualRedirectedMXN = 0;
    let annualLostMXN = 0;
    leaks.forEach((item) => {
      const yearly = item.dailyOrMonthlyCostMXN * item.frequencyPerYear;
      if (item.redirected) {
        annualRedirectedMXN += yearly;
      } else {
        annualLostMXN += yearly;
      }
    });
    if (waiting72HoursApplied) {
      annualRedirectedMXN += 2400;
    }
    const fiveYearCompoundInCetes = Math.round(
      annualRedirectedMXN * ((Math.pow(1.1, 5) - 1) / 0.1)
    );
    return {
      annualRedirectedMXN,
      annualLostMXN,
      fiveYearCompoundInCetes,
    };
  }, [leaks, waiting72HoursApplied]);

  // --- SIMULATOR 3: MEXICAN FISCAL SYSTEM (SAT: ISR, RESICO, IVA) ---
  const [monthlyGrossIncome, setMonthlyGrossIncome] = useState<number>(9500);
  const [taxRegime, setTaxRegime] = useState<'resico' | 'asalariado'>('resico');
  const [ivaZone, setIvaZone] = useState<'general16' | 'frontera8'>('general16');

  const fiscalCalculation = useMemo(() => {
    const resicoRate = monthlyGrossIncome <= 25000 ? 0.01 : 0.011;
    const resicoISR = Math.round(monthlyGrossIncome * resicoRate);

    let salariedRate = 0.055;
    if (monthlyGrossIncome > 15000) salariedRate = 0.115;
    else if (monthlyGrossIncome > 10000) salariedRate = 0.082;
    const salariedISR = Math.round(monthlyGrossIncome * salariedRate);

    const activeISR = taxRegime === 'resico' ? resicoISR : salariedISR;
    const netMonthlyIncome = monthlyGrossIncome - activeISR;

    const taxedConsumptionBase = Math.round(netMonthlyIncome * 0.45);
    const ivaRate = ivaZone === 'general16' ? 0.16 : 0.08;
    const monthlyIVAPaid = Math.round(taxedConsumptionBase * ivaRate);

    const totalTaxContribution = activeISR + monthlyIVAPaid;

    const socialProgramsShare = Math.round(totalTaxContribution * (2.5 / 26.1));
    const debtServiceShare = Math.round(totalTaxContribution * (3.8 / 26.1));
    const publicServicesShare =
      totalTaxContribution - socialProgramsShare - debtServiceShare;

    return {
      resicoISR,
      salariedISR,
      activeISR,
      netMonthlyIncome,
      monthlyIVAPaid,
      totalTaxContribution,
      socialProgramsShare,
      debtServiceShare,
      publicServicesShare,
    };
  }, [monthlyGrossIncome, taxRegime, ivaZone]);

  const maxChartVal = Math.max(finalPoint.cetesNominal, 1000);
  const buildPolyline = (key: 'cetesNominal' | 'investedPrincipal' | 'mattressRealValue') => {
    return cetesProjection
      .map((pt, idx) => {
        const x = 50 + (idx / Math.max(1, cetesProjection.length - 1)) * 510;
        const y = 220 - (pt[key] / maxChartVal) * 180;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header & Interactive Simulator Selector */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#BEC092]">
        <div className="flex items-center gap-3.5">
          <BloomMascot mood="happy" size="md" plumage={plumage} />
          <div>
            <p className="text-xs font-bold text-[#2F7D5B]">
              Arcade Financiero · Aprende Jugando con Tus Números
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A3323] mt-0.5 font-display">
              Simuladores Interactivos
            </h1>
          </div>
        </div>

        {/* Segmented Control */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#F7FAD5] border-2 border-[#BEC092] rounded-2xl self-start">
          <button
            onClick={() => {
              soundFX.playTap();
              setActiveSimulator('cetes');
            }}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSimulator === 'cetes'
                ? 'bg-[#2F7D5B] text-white shadow-xs'
                : 'text-[#0A3323]/75 hover:text-[#0A3323]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>01. CETES vs. Inflación</span>
          </button>
          <button
            onClick={() => {
              soundFX.playTap();
              setActiveSimulator('frontal');
            }}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSimulator === 'frontal'
                ? 'bg-[#734A91] text-white shadow-xs'
                : 'text-[#0A3323]/75 hover:text-[#0A3323]'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>02. Caza-Hormigas</span>
          </button>
          <button
            onClick={() => {
              soundFX.playTap();
              setActiveSimulator('fiscal');
            }}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSimulator === 'fiscal'
                ? 'bg-[#105666] text-white shadow-xs'
                : 'text-[#0A3323]/75 hover:text-[#0A3323]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>03. Radar SAT / RESICO</span>
          </button>
        </div>
      </div>

      {/* SIMULATOR 1: TWO-ZONE SANDBOX FOR CETES & INFLATION */}
      {activeSimulator === 'cetes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Zone: Interactive Visual Stage */}
          <div className="lg:col-span-8 duo-card p-5 sm:p-6 space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="text-xs text-[#105666] font-semibold">
                  <span>Enfoque activo: {learningMode === 'seed' ? 'Modo Semilla (Custodia)' : 'Modo Vuelo (Titular)'}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>GAT Real: <strong className="font-mono text-[#2F7D5B] tabular-nums">+{gatReal}%</strong> anual</span>
                </p>
                <h2 className="text-lg sm:text-xl font-semibold text-[#0A3323] mt-0.5 font-display">
                  Máquina del Tiempo: Interés Compuesto vs. Efectivo Quieto
                </h2>
              </div>
              <span className="text-xs font-mono text-[#2F7D5B] font-bold tabular-nums">
                ● RENDIMIENTO REAL POSITIVO
              </span>
            </div>

            {/* Key Quantitative Outcomes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#BEC092]/50">
              <div className="p-3.5 rounded-2xl bg-[#F7FAD5]/70 border border-[#839958]">
                <p className="text-xs text-[#0B3D2E] font-bold">Total en CETES ({yearsHorizon} años)</p>
                <p className="text-2xl font-bold text-[#145A3A] font-mono tabular-nums mt-0.5">
                  ${finalPoint.cetesNominal.toLocaleString('es-MX')}
                </p>
                <p className="text-xs text-[#2F7D5B] font-mono font-bold tabular-nums mt-0.5">
                  +${compoundGain.toLocaleString('es-MX')} MXN extra
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#BEC092]">
                <p className="text-xs text-[#0A3323]/70 font-bold">Puesto de tu Bolsillo</p>
                <p className="text-2xl font-bold text-[#0A3323] font-mono tabular-nums mt-0.5">
                  ${finalPoint.investedPrincipal.toLocaleString('es-MX')}
                </p>
                <p className="text-xs text-[#0A3323]/60 font-mono tabular-nums mt-0.5">
                  ${initialCapital} + ${monthlyContribution}/mes
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F9D6D5]/60 border border-[#BA7B7C]">
                <p className="text-xs text-[#8F6277] font-bold">Poder Real en el Colchón</p>
                <p className="text-2xl font-bold text-[#8F6277] font-mono tabular-nums mt-0.5">
                  ${finalPoint.mattressRealValue.toLocaleString('es-MX')}
                </p>
                <p className="text-xs text-[#8F6277] font-mono font-bold tabular-nums mt-0.5">
                  ▲ -${inflationLossOnCash.toLocaleString('es-MX')} por inflación
                </p>
              </div>
            </div>

            {/* Live SVG Coordinate Curve */}
            <div className="bg-[#F7FAD5]/35 rounded-2xl p-4 border-2 border-[#BEC092]">
              <svg
                viewBox="0 0 600 250"
                className="w-full h-56 overflow-visible"
                role="img"
                aria-label="Gráfica de crecimiento en CETES frente a inflación"
              >
                {[0, 0.25, 0.5, 0.75, 1].map((step, i) => {
                  const y = 220 - step * 180;
                  const val = Math.round(step * maxChartVal);
                  return (
                    <g key={i}>
                      <line
                        x1="50"
                        y1={y}
                        x2="560"
                        y2={y}
                        stroke="#BEC092"
                        strokeOpacity="0.6"
                        strokeDasharray={i === 0 ? undefined : '4 4'}
                      />
                      <text
                        x="44"
                        y={y + 4}
                        textAnchor="end"
                        className="text-[10px] fill-[#0A3323] font-mono"
                      >
                        ${(val / 1000).toFixed(0)}k
                      </text>
                    </g>
                  );
                })}

                <polyline
                  fill="none"
                  stroke="#8F6277"
                  strokeWidth="3"
                  strokeDasharray="5 4"
                  points={buildPolyline('mattressRealValue')}
                />
                <polyline
                  fill="none"
                  stroke="#7285A5"
                  strokeWidth="3"
                  points={buildPolyline('investedPrincipal')}
                />
                <polyline
                  fill="none"
                  stroke="#2F7D5B"
                  strokeWidth="4"
                  points={buildPolyline('cetesNominal')}
                />

                {cetesProjection.map((pt, idx) => {
                  const x = 50 + (idx / Math.max(1, cetesProjection.length - 1)) * 510;
                  const yCetes = 220 - (pt.cetesNominal / maxChartVal) * 180;
                  return (
                    <g key={pt.year}>
                      <circle cx={x} cy={yCetes} r="5" fill="#0A3323" stroke="#F8FBCA" strokeWidth="2" />
                      <text
                        x={x}
                        y="240"
                        textAnchor="middle"
                        className="text-[10px] fill-[#0A3323] font-mono font-bold"
                      >
                        Año {pt.year}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#BEC092]/60 text-xs text-[#0A3323]">
                <span className="flex items-center gap-1.5 font-bold text-[#145A3A]">
                  <span className="w-3 h-1 rounded-full bg-[#2F7D5B] inline-block" />
                  CETES Reinvertidos ({cetesRate}% anual)
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-[#1D2951]">
                  <span className="w-3 h-1 rounded-full bg-[#7285A5] inline-block" />
                  Capital Aportado
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-[#8F6277]">
                  <span className="w-3 h-1 rounded-full bg-[#8F6277] inline-block" />
                  Efectivo bajo el colchón (-{inflationRate}% inflación/año)
                </span>
              </div>
            </div>
          </div>

          {/* Right Zone: Control & Concept Deck */}
          <div className="lg:col-span-4 duo-card p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#0A3323] font-display">
                Mueve tus Palancas
              </h3>
              <button
                onClick={() => {
                  soundFX.playTap();
                  setInitialCapital(1000);
                  setMonthlyContribution(600);
                  setYearsHorizon(5);
                  setCetesRate(10.25);
                  setInflationRate(4.2);
                }}
                className="min-h-[36px] px-2.5 py-1 rounded-xl text-xs font-bold text-[#145A3A] hover:bg-[#F7FAD5] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#0A3323] mb-1">
                  <label htmlFor="sim-init-cap">Semilla Inicial (Desde $100 MXN)</label>
                  <span className="font-mono text-[#2F7D5B] tabular-nums">
                    ${initialCapital.toLocaleString('es-MX')} MXN
                  </span>
                </div>
                <input
                  id="sim-init-cap"
                  type="range"
                  min={100}
                  max={20000}
                  step={100}
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Number(e.target.value))}
                  className="w-full accent-[#2F7D5B] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#0A3323] mb-1">
                  <label htmlFor="sim-monthly">Ahorro Mensual</label>
                  <span className="font-mono text-[#2F7D5B] tabular-nums">
                    ${monthlyContribution.toLocaleString('es-MX')} MXN/mes
                  </span>
                </div>
                <input
                  id="sim-monthly"
                  type="range"
                  min={100}
                  max={5000}
                  step={100}
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full accent-[#2F7D5B] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#0A3323] mb-1">
                  <label htmlFor="sim-years">Tiempo de Inversión</label>
                  <span className="font-mono text-[#734A91] tabular-nums">
                    {yearsHorizon} {yearsHorizon === 1 ? 'año' : 'años'}
                  </span>
                </div>
                <input
                  id="sim-years"
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={yearsHorizon}
                  onChange={(e) => setYearsHorizon(Number(e.target.value))}
                  className="w-full accent-[#734A91] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#0A3323] mb-1">
                  <label htmlFor="sim-cetes">Tasa Anual CETES / Renta Fija</label>
                  <span className="font-mono text-[#145A3A] tabular-nums">
                    {cetesRate.toFixed(2)}% anual
                  </span>
                </div>
                <input
                  id="sim-cetes"
                  type="range"
                  min={5}
                  max={12}
                  step={0.25}
                  value={cetesRate}
                  onChange={(e) => setCetesRate(Number(e.target.value))}
                  className="w-full accent-[#145A3A] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#0A3323] mb-1">
                  <label htmlFor="sim-inflation">Inflación Anual (Banxico)</label>
                  <span className="font-mono text-[#8F6277] tabular-nums">
                    {inflationRate.toFixed(1)}% anual
                  </span>
                </div>
                <input
                  id="sim-inflation"
                  type="range"
                  min={2.5}
                  max={8.5}
                  step={0.1}
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full accent-[#8F6277] cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAD5] border border-[#839958] text-xs text-[#0A3323] space-y-1">
              <p className="font-bold text-[#145A3A]">
                Fórmula: M = C × (1 + r/12)^(12t)
              </p>
              <p className="leading-relaxed">
                Cada peso que pones a trabajar en renta fija vence a la inflación y multiplica tu poder de compra futuro.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATOR 2: FRONTAL LOBE & ANT EXPENSE INTERCEPTOR */}
      {activeSimulator === 'frontal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 duo-card p-5 sm:p-6 space-y-4">
            <div>
              <p className="text-xs font-bold text-[#734A91]">
                Minijuego Conductual · Domina tus Impulsos
              </p>
              <h2 className="text-lg sm:text-xl font-semibold text-[#0A3323] mt-0.5 font-display">
                Caza las Fugas de tu Bolsillo
              </h2>
              <p className="text-xs text-[#0A3323]/70 mt-1">
                Toca cada fuga para interceptarla y enviarla directo a tu fondo de crecimiento:
              </p>
            </div>

            <div className="space-y-3">
              {leaks.map((item) => {
                const annualCost = item.dailyOrMonthlyCostMXN * item.frequencyPerYear;
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleLeakRedirect(item.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 border-b-4 transition-all flex items-center justify-between gap-4 cursor-pointer active:translate-y-0.5 ${
                      item.redirected
                        ? 'border-[#2F7D5B] bg-[#F7FAD5]'
                        : 'border-[#BEC092] bg-white hover:bg-[#F9D6D5]/30'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-[#105666] font-semibold">
                        <span>Fuga {item.category}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          ${annualCost.toLocaleString('es-MX')} MXN al año
                        </span>
                      </p>
                      <p className="text-sm font-bold text-[#0A3323] mt-0.5">
                        {item.name}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold whitespace-nowrap shrink-0 ${
                        item.redirected ? 'text-[#145A3A]' : 'text-[#8F6277]'
                      }`}
                    >
                      {item.redirected ? '● ATRAPADA' : '▲ FUGA ACTIVA'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-[#F1D7FF]/50 border-2 border-[#A87BC7] flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#1D2951]">
                  Escudo de las 72 Horas en compras online
                </p>
                <p className="text-xs text-[#0A3323]/80 mt-0.5">
                  Dejar enfriar el carrito 3 días evita compras por impulso (+$2,400 MXN/año).
                </p>
              </div>
              <button
                onClick={() => {
                  soundFX.playTap();
                  setWaiting72HoursApplied((prev) => !prev);
                }}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer ${
                  waiting72HoursApplied
                    ? 'duo-btn-purple'
                    : 'bg-white border-2 border-[#BEC092] text-[#0A3323]'
                }`}
              >
                {waiting72HoursApplied ? 'Escudo ON' : 'Escudo OFF'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 duo-card p-5 sm:p-6 space-y-5">
            <h3 className="text-base font-semibold text-[#0A3323] font-display">
              Tu Recompensa Real
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F7FAD5] border-2 border-[#839958]">
                <p className="text-xs text-[#145A3A] font-bold">
                  Dinero Rescatado por Año
                </p>
                <p className="text-2xl font-bold text-[#0A3323] font-mono tabular-nums mt-1">
                  +${leakStats.annualRedirectedMXN.toLocaleString('es-MX')} MXN / año
                </p>
                <p className="text-xs text-[#0B3D2E] mt-1">
                  Son ${(leakStats.annualRedirectedMXN / 12).toFixed(0)} MXN libres cada mes.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0A3323] text-white border-b-4 border-[#145A3A]">
                <p className="text-xs text-[#F8FBCA] font-bold">
                  En 5 Años Invertidos en Renta Fija (~10%)
                </p>
                <p className="text-3xl font-bold text-[#F6C8C7] font-mono tabular-nums mt-1">
                  ${leakStats.fiveYearCompoundInCetes.toLocaleString('es-MX')} MXN
                </p>
                <p className="text-xs text-[#BEC092] mt-1.5 leading-relaxed">
                  Convertiste gastos invisibles en capital real para tus metas más grandes.
                </p>
              </div>

              {!claimedHabitReward ? (
                <button
                  onClick={() => {
                    soundFX.playFanfare();
                    setClaimedHabitReward(true);
                    onEarnSimulatorXP(75, leakStats.annualRedirectedMXN);
                  }}
                  className="w-full min-h-[48px] py-3 px-4 rounded-2xl duo-btn-primary text-xs font-bold cursor-pointer"
                >
                  RECLAMAR +75 XP POR ATRAPAR FUGAS
                </button>
              ) : (
                <div className="p-3.5 rounded-2xl bg-[#F7FAD5] border-2 border-[#2F7D5B] text-xs text-[#0A3323] font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2F7D5B]" />
                  <span>¡+75 XP sumados a tu racha!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SIMULATOR 3: MEXICAN FISCAL SYSTEM (SAT: ISR, RESICO, IVA) */}
      {activeSimulator === 'fiscal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 duo-card p-5 sm:p-6 space-y-5">
            <div>
              <p className="text-xs font-bold text-[#105666]">
                Ciudadanía Financiera · SHCP / SAT / CONEVAL (2026)
              </p>
              <h2 className="text-lg sm:text-xl font-semibold text-[#0A3323] mt-0.5 font-display">
                Radar de Impuestos (ISR, RESICO e IVA)
              </h2>
              <p className="text-xs text-[#0A3323]/75 mt-1 leading-relaxed">
                Descubre cuánto queda libre en tu bolsillo según tu régimen fiscal y cómo se distribuye el Presupuesto Público en México.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F7FAD5]/70 border border-[#839958]">
                <p className="text-xs text-[#0B3D2E] font-bold">Tu Ingreso Libre</p>
                <p className="text-xl font-bold text-[#0A3323] font-mono tabular-nums mt-1">
                  ${fiscalCalculation.netMonthlyIncome.toLocaleString('es-MX')} MXN
                </p>
                <p className="text-xs text-[#145A3A] font-mono font-bold tabular-nums mt-1">
                  ISR: ${fiscalCalculation.activeISR.toLocaleString('es-MX')} MXN
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#BEC092]">
                <p className="text-xs text-[#0A3323]/70 font-bold">IVA en Compras</p>
                <p className="text-xl font-bold text-[#0A3323] font-mono tabular-nums mt-1">
                  ${fiscalCalculation.monthlyIVAPaid.toLocaleString('es-MX')} MXN
                </p>
                <p className="text-xs text-[#105666] mt-1">
                  0% en alimentos y medicinas
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F1D7FF]/50 border border-[#A87BC7]">
                <p className="text-xs text-[#734A91] font-bold">RESICO vs. Nómina</p>
                <p className="text-xl font-bold text-[#1D2951] font-mono tabular-nums mt-1">
                  ${fiscalCalculation.resicoISR} vs. ${fiscalCalculation.salariedISR}
                </p>
                <p className="text-xs text-[#734A91] mt-1">
                  Tasa de 1% a 2.5% en RESICO
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-[#BEC092]/50 text-xs">
              <h3 className="text-sm font-bold text-[#0A3323]">
                Destino de tus ${fiscalCalculation.totalTaxContribution.toLocaleString('es-MX')} MXN de impuestos en el Presupuesto:
              </h3>

              <div className="p-3.5 rounded-2xl bg-[#F7FAD5]/50 border border-[#BEC092] flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-[#0A3323]">
                    01. Salud, Educación, Seguridad e Infraestructura (~19.5% PIB)
                  </p>
                  <p className="text-[#0A3323]/70 mt-0.5">
                    Escuelas públicas, hospitales, carreteras, energía y operación del país.
                  </p>
                </div>
                <span className="font-mono font-bold text-[#145A3A] tabular-nums shrink-0">
                  ${fiscalCalculation.publicServicesShare.toLocaleString('es-MX')} MXN
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F9D6D5]/40 border border-[#D7A9A9] flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-[#0A3323]">
                    02. Costo Financiero de la Deuda (~3.8% PIB)
                  </p>
                  <p className="text-[#0A3323]/70 mt-0.5">
                    Pago de intereses de deuda pública (incluyendo rendimientos de CETES).
                  </p>
                </div>
                <span className="font-mono font-bold text-[#8F6277] tabular-nums shrink-0">
                  ${fiscalCalculation.debtServiceShare.toLocaleString('es-MX')} MXN
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F1D7FF]/40 border border-[#A87BC7] flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-[#0A3323]">
                    03. Programas Sociales y Becas Directas (~2.5% PIB)
                  </p>
                  <p className="text-[#0A3323]/70 mt-0.5">
                    Becas educativas y pensiones directas (presentes en &gt;70% de los hogares).
                  </p>
                </div>
                <span className="font-mono font-bold text-[#734A91] tabular-nums shrink-0">
                  ${fiscalCalculation.socialProgramsShare.toLocaleString('es-MX')} MXN
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 duo-card p-5 sm:p-6 space-y-5">
            <h3 className="text-base font-semibold text-[#0A3323] font-display">
              Personaliza el Cálculo
            </h3>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#0A3323] mb-1">
                <label htmlFor="fiscal-income">Ingreso Mensual</label>
                <span className="font-mono text-[#145A3A] tabular-nums">
                  ${monthlyGrossIncome.toLocaleString('es-MX')} MXN
                </span>
              </div>
              <input
                id="fiscal-income"
                type="range"
                min={3000}
                max={35000}
                step={500}
                value={monthlyGrossIncome}
                onChange={(e) => setMonthlyGrossIncome(Number(e.target.value))}
                className="w-full accent-[#2F7D5B] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-[#0A3323]">Régimen en el SAT</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    soundFX.playTap();
                    setTaxRegime('resico');
                  }}
                  className={`min-h-[44px] p-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                    taxRegime === 'resico'
                      ? 'border-[#2F7D5B] bg-[#F7FAD5] text-[#0A3323]'
                      : 'border-[#BEC092] text-[#0A3323]/70'
                  }`}
                >
                  RESICO (1% – 2.5%)
                </button>
                <button
                  onClick={() => {
                    soundFX.playTap();
                    setTaxRegime('asalariado');
                  }}
                  className={`min-h-[44px] p-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                    taxRegime === 'asalariado'
                      ? 'border-[#2F7D5B] bg-[#F7FAD5] text-[#0A3323]'
                      : 'border-[#BEC092] text-[#0A3323]/70'
                  }`}
                >
                  Asalariado Formal
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-[#0A3323]">Zona de IVA</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    soundFX.playTap();
                    setIvaZone('general16');
                  }}
                  className={`min-h-[44px] p-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                    ivaZone === 'general16'
                      ? 'border-[#734A91] bg-[#F1D7FF]/50 text-[#1D2951]'
                      : 'border-[#BEC092] text-[#0A3323]/70'
                  }`}
                >
                  General (16%)
                </button>
                <button
                  onClick={() => {
                    soundFX.playTap();
                    setIvaZone('frontera8');
                  }}
                  className={`min-h-[44px] p-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                    ivaZone === 'frontera8'
                      ? 'border-[#734A91] bg-[#F1D7FF]/50 text-[#1D2951]'
                      : 'border-[#BEC092] text-[#0A3323]/70'
                  }`}
                >
                  Frontera (8%)
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAD5] border border-[#839958] text-xs text-[#0A3323] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#145A3A]">
                <ShieldCheck className="w-4 h-4" />
                <span>Dato Clave de Formalidad</span>
              </div>
              <p className="leading-relaxed">
                El régimen RESICO fue diseñado para que emprendedores y profesionistas independientes paguen solo entre 1% y 2.5% de ISR de forma sencilla.
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};
