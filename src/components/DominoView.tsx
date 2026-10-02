import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  ShieldCheck,
  Globe2,
  MapPin,
  RotateCcw,
  Factory,
  ArrowRight,
} from 'lucide-react';
import { BloomMascot, PlumageTheme } from './BloomMascot';
import { soundFX } from '../utils/soundEffects';

interface DominoLinkData {
  step: number;
  title: string;
  nationalDescription: string;
  globalDescription: string;
  keyCitation: string;
  thresholdToFall: number;
}

const DOMINO_LINKS: DominoLinkData[] = [
  {
    step: 1,
    title: '01. Choque Económico y Financiero',
    nationalDescription:
      'Inflación en la canasta básica, variación cambiaria o alza de tasas para frenar precios. El crédito se encarece, las MIPYMES cierran y se frena la inversión.',
    globalDescription:
      'Inflación descontrolada, burbujas de deuda o movimientos de tasas de la Reserva Federal de EE. UU. congelan el crédito global y disparan el desempleo.',
    keyCitation: 'Banco de México (2025/2026) · FMI (2024/2026)',
    thresholdToFall: 30,
  },
  {
    step: 2,
    title: '02. Precarización Social e Informalidad',
    nationalDescription:
      'Al perderse empleos formales, la población se refugia en la informalidad (>50% en México). El poder adquisitivo cae y se pierde acceso a salud y ahorro.',
    globalDescription:
      'Las familias pierden capacidad para adquirir alimentos básicos, vivienda o salud, detonando protestas y desigualdad extrema.',
    keyCitation: 'INEGI (2025) · OIT (2024) · CONEVAL (2024)',
    thresholdToFall: 45,
  },
  {
    step: 3,
    title: '03. Crisis de Seguridad e Ingobernabilidad',
    nationalDescription:
      'Sin oportunidades ni colchón financiero, se debilita la seguridad comunitaria y aumentan los costos logísticos e informales.',
    globalDescription:
      'La presión social desestabiliza a las instituciones, abriendo paso a polarización extrema y paralizando reformas.',
    keyCitation: 'SESNSP (2025) · PNUD (2024)',
    thresholdToFall: 60,
  },
  {
    step: 4,
    title: '04. Polarización Política y Crisis Migratoria',
    nationalDescription:
      'La incertidumbre provoca desplazamiento forzado interno mientras las regiones fronterizas se saturan sin recursos suficientes.',
    globalDescription:
      'Guerras comerciales, proteccionismo agresivo por recursos escasos y oleadas migratorias masivas.',
    keyCitation: 'ONU (2024) · CEPAL (2024)',
    thresholdToFall: 75,
  },
  {
    step: 5,
    title: '05. Deterioro del Tejido Social y Ambiental',
    nationalDescription:
      'Los recursos que irían a transición ecológica, agua y bosques se desvían a emergencias inmediatas, afectando la cohesión comunitaria.',
    globalDescription:
      'Se abandonan los fondos climáticos y de energías limpias por supervivencia a corto plazo, generando emergencias crónicas.',
    keyCitation: 'PNUD (2024) · World Economic Forum (2025)',
    thresholdToFall: 88,
  },
];

export const DominoView: React.FC<{ plumage?: PlumageTheme }> = ({ plumage = 'emerald' }) => {
  const [scaleMode, setScaleMode] = useState<'nacional' | 'global'>('nacional');
  const [shockIntensity, setShockIntensity] = useState<number>(65);
  const [educationCoverage, setEducationCoverage] = useState<number>(70);
  const [remittanceBuffer, setRemittanceBuffer] = useState<number>(60);
  const [selectedRegion, setSelectedRegion] = useState<'norte' | 'centro' | 'sur'>('norte');

  const systemicAnalysis = useMemo(() => {
    const educationShield = educationCoverage * 0.45;
    const remittanceShield =
      scaleMode === 'nacional' ? remittanceBuffer * 0.28 : remittanceBuffer * 0.15;
    const netPressure = Math.max(
      5,
      Math.min(100, Math.round(shockIntensity - educationShield - remittanceShield + 20))
    );

    const fallenCount = DOMINO_LINKS.filter((link) => netPressure >= link.thresholdToFall).length;
    return {
      netPressure,
      fallenCount,
      stoppedAtFirstPiece: fallenCount === 0,
    };
  }, [shockIntensity, educationCoverage, remittanceBuffer, scaleMode]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-8"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#BEC092]">
        <div className="flex items-center gap-3.5">
          <BloomMascot
            mood={systemicAnalysis.fallenCount === 0 ? 'celebrating' : 'thinking'}
            size="md"
            plumage={plumage}
          />
          <div>
            <p className="text-xs font-bold text-[#145A3A]">
              Simulador Sistémico · Teoría General de Sistemas
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A3323] mt-0.5 font-display">
              El Efecto Dominó en Acción
            </h1>
          </div>
        </div>

        {/* Scale Toggle */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#F7FAD5] border-2 border-[#BEC092] rounded-2xl self-start">
          <button
            onClick={() => {
              soundFX.playTap();
              setScaleMode('nacional');
            }}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              scaleMode === 'nacional'
                ? 'bg-[#2F7D5B] text-white shadow-xs'
                : 'text-[#0A3323]/75 hover:text-[#0A3323]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Nivel Nacional (México)</span>
          </button>
          <button
            onClick={() => {
              soundFX.playTap();
              setScaleMode('global');
            }}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              scaleMode === 'global'
                ? 'bg-[#734A91] text-white shadow-xs'
                : 'text-[#0A3323]/75 hover:text-[#0A3323]'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Nivel Global</span>
          </button>
        </div>
      </div>

      {/* Two-Zone Sandbox: Domino Chain Stage + Parameter Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 duo-card p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#BEC092]/50">
            <div>
              <p className="text-xs text-[#105666] font-semibold">
                <span>Escala: {scaleMode === 'nacional' ? 'México (con Amortiguador de Remesas)' : 'Sistema Económico Global'}</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">Presión Neta: {systemicAnalysis.netPressure}/100</span>
              </p>
              <h2 className="text-lg font-semibold text-[#0A3323] mt-0.5 font-display">
                Los 5 Eslabones del Dominó
              </h2>
            </div>

            <span
              className={`text-xs font-mono font-bold tabular-nums ${
                systemicAnalysis.fallenCount === 0
                  ? 'text-[#2F7D5B]'
                  : 'text-[#8F6277]'
              }`}
            >
              {systemicAnalysis.fallenCount === 0
                ? '● ¡DOMINÓ DETENIDO A TIEMPO!'
                : `▲ ${systemicAnalysis.fallenCount} DE 5 FICHAS CAÍDAS`}
            </span>
          </div>

          <div className="space-y-3">
            {DOMINO_LINKS.map((link) => {
              const isFallen = systemicAnalysis.netPressure >= link.thresholdToFall;
              return (
                <motion.div
                  layout
                  key={link.step}
                  className={`p-4 rounded-2xl border-2 border-b-4 transition-all ${
                    isFallen
                      ? 'bg-[#F9D6D5]/70 border-[#BA7B7C] text-[#0A3323]'
                      : 'bg-[#F7FAD5]/80 border-[#839958] text-[#0A3323]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-semibold text-[#0A3323] font-display">
                      {link.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold tabular-nums">
                      {isFallen ? (
                        <>
                          <ShieldAlert className="w-4 h-4 text-[#8F6277] shrink-0" />
                          <span className="text-[#8F6277]">
                            ▲ FICHA CAÍDA (Umbral &ge; {link.thresholdToFall})
                          </span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-[#2F7D5B] shrink-0" />
                          <span className="text-[#145A3A]">
                            ● FICHA EN PIE (Protegida)
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#0A3323]/85 mt-1.5 leading-relaxed">
                    {scaleMode === 'nacional'
                      ? link.nationalDescription
                      : link.globalDescription}
                  </p>

                  <p className="text-xs text-[#105666] font-medium mt-2">
                    Referencia: {link.keyCitation}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right 4 cols: Control Sliders */}
        <div className="lg:col-span-4 duo-card p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#0A3323] font-display">
              Escudos contra el Dominó
            </h3>
            <button
              onClick={() => {
                soundFX.playTap();
                setShockIntensity(65);
                setEducationCoverage(70);
                setRemittanceBuffer(60);
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
                <label htmlFor="dom-shock">Choque Económico Inicial</label>
                <span className="font-mono text-[#8F6277] tabular-nums">
                  {shockIntensity}%
                </span>
              </div>
              <input
                id="dom-shock"
                type="range"
                min={20}
                max={95}
                step={5}
                value={shockIntensity}
                onChange={(e) => setShockIntensity(Number(e.target.value))}
                className="w-full accent-[#8F6277] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#0A3323] mb-1">
                <label htmlFor="dom-edu">Hábito Capital Bloom (Educación Temprana)</label>
                <span className="font-mono text-[#2F7D5B] tabular-nums">
                  {educationCoverage}% escudo
                </span>
              </div>
              <input
                id="dom-edu"
                type="range"
                min={0}
                max={100}
                step={5}
                value={educationCoverage}
                onChange={(e) => setEducationCoverage(Number(e.target.value))}
                className="w-full accent-[#2F7D5B] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#0A3323] mb-1">
                <label htmlFor="dom-rem">
                  {scaleMode === 'nacional'
                    ? 'Amortiguador de Remesas (>$60,000M USD)'
                    : 'Liquidez y Cooperación Global'}
                </label>
                <span className="font-mono text-[#734A91] tabular-nums">
                  {remittanceBuffer}%
                </span>
              </div>
              <input
                id="dom-rem"
                type="range"
                min={0}
                max={100}
                step={5}
                value={remittanceBuffer}
                onChange={(e) => setRemittanceBuffer(Number(e.target.value))}
                className="w-full accent-[#734A91] cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A3323] text-white space-y-1.5 border-b-4 border-[#2F7D5B]">
            <p className="text-xs font-bold text-[#F8FBCA]">
              La Regla del Primer Dominó
            </p>
            <p className="text-xs text-[#BEC092] leading-relaxed">
              Es mucho más efectivo frenar la primera ficha con educación financiera, ahorro en renta fija y control de impulsos que intentar levantar la quinta ficha cuando la cadena ya cayó.
            </p>
          </div>
        </div>
      </div>

      {/* Regional Disparity & T-MEC / Nearshoring Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-[#BEC092]">
        <div className="lg:col-span-7 duo-card p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-[#105666]">
                Mapa Económico · PIB ~$2.12 Billones USD (FMI 2026)
              </p>
              <h2 className="text-lg font-semibold text-[#0A3323] mt-0.5 font-display">
                Las 3 Regiones Económicas de México
              </h2>
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#F7FAD5] border border-[#BEC092] rounded-xl self-start">
              {(['norte', 'centro', 'sur'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => {
                    soundFX.playTap();
                    setSelectedRegion(reg);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedRegion === reg
                      ? 'bg-[#0A3323] text-white'
                      : 'text-[#0A3323]/70 hover:text-[#0A3323]'
                  }`}
                >
                  {reg === 'norte' ? 'Norte y Bajío' : reg === 'centro' ? 'Centro' : 'Sur-Sureste'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7FAD5]/70 border border-[#839958] space-y-1.5">
            <p className="text-xs font-bold text-[#145A3A]">
              {selectedRegion === 'norte'
                ? 'Norte y Bajío (Guanajuato, Querétaro, Nuevo León, Coahuila, Chihuahua)'
                : selectedRegion === 'centro'
                ? 'Centro (Valle de México y Zona Metropolitana)'
                : 'Sur-Sureste (Quintana Roo, Tabasco, Campeche, Oaxaca, Chiapas)'}
            </p>
            <p className="text-sm text-[#0A3323] leading-relaxed">
              {selectedRegion === 'norte'
                ? 'Conectados con las cadenas industriales del T-MEC. Concentran la manufactura automotriz (7.º productor global), aeroespacial, electrónica y médica, liderando la llegada de parques industriales por Nearshoring.'
                : selectedRegion === 'centro'
                ? 'Corazón financiero, tecnológico y de servicios corporativos del país. Impulsa gran parte del Sector Terciario (~64% del PIB) y el consumo interno.'
                : 'Sustentado en turismo internacional, energía y agroindustria. Fomentar el ahorro formal y las herramientas digitales impulsa la resiliencia regional.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="p-3.5 rounded-2xl bg-[#F7FAD5] border border-[#839958]">
              <p className="font-mono font-bold text-[#145A3A] tabular-nums">64% PIB</p>
              <p className="font-bold text-[#0A3323] mt-0.5">Sector Terciario</p>
              <p className="text-[#0A3323]/75 mt-0.5">Comercio, servicios, turismo y logística.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F1D7FF]/50 border border-[#A87BC7]">
              <p className="font-mono font-bold text-[#734A91] tabular-nums">32% PIB</p>
              <p className="font-bold text-[#0A3323] mt-0.5">Sector Secundario</p>
              <p className="text-[#0A3323]/75 mt-0.5">Automotriz, electrónica y aeroespacial.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F9D6D5]/50 border border-[#D3968C]">
              <p className="font-mono font-bold text-[#8F6277] tabular-nums">4% PIB</p>
              <p className="font-bold text-[#0A3323] mt-0.5">Sector Primario</p>
              <p className="text-[#0A3323]/75 mt-0.5">Agroexportación líder mundial.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 duo-card p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#734A91]">
            <Factory className="w-4 h-4" />
            <span>Conexión Global · T-MEC y Nearshoring</span>
          </div>
          <h3 className="text-lg font-semibold text-[#0A3323] font-display">
            De Offshoring a Nearshoring
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#F9D6D5]/50 border border-[#D3968C]">
              <p className="font-bold text-[#8F6277]">DE: Offshoring en Asia</p>
              <p className="font-mono text-[#0A3323] font-bold mt-0.5 tabular-nums">
                30 a 45 días en barco
              </p>
              <p className="text-[#0A3323]/75 mt-1">
                Costos de flete altos y riesgo de retrasos en cadenas globales.
              </p>
            </div>

            <div className="flex justify-center text-[#2F7D5B]">
              <ArrowRight className="w-4 h-4 rotate-90" />
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7FAD5] border-2 border-[#2F7D5B]">
              <p className="font-bold text-[#145A3A]">A: Nearshoring en México (T-MEC)</p>
              <p className="font-mono text-[#0A3323] font-bold mt-0.5 tabular-nums">
                2 a 4 días por tierra · 80%+ exportaciones
              </p>
              <p className="text-[#0A3323]/80 mt-1">
                75% de contenido regional automotriz y alta demanda de talento técnico y financiero.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
