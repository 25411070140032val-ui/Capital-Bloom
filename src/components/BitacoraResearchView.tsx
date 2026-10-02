import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  CheckCircle2,
  ClipboardCheck,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { BloomMascot, PlumageTheme } from './BloomMascot';
import { soundFX } from '../utils/soundEffects';

interface SurveySubmission {
  id: string;
  role: string;
  impulseScoreBefore: number;
  resilienceScoreAfter: number;
  comment: string;
  date: string;
}

const INITIAL_EVIDENCE: SurveySubmission[] = [
  {
    id: 'ev-1',
    role: 'Estudiante STEAM (Bachillerato)',
    impulseScoreBefore: 42,
    resilienceScoreAfter: 88,
    comment:
      'Entendí cómo funcionan las cuentas de custodia en CETES Directo y dejé de gastar mi beca en micropagos.',
    date: '18/09/2026',
  },
  {
    id: 'ev-2',
    role: 'Estudiante de Ingeniería',
    impulseScoreBefore: 50,
    resilienceScoreAfter: 92,
    comment:
      'La diferencia entre ser totalero y pagar el mínimo más el simulador de RESICO me ahorraron comisiones bancarias.',
    date: '19/09/2026',
  },
  {
    id: 'ev-3',
    role: 'Emprendedor Independiente',
    impulseScoreBefore: 38,
    resilienceScoreAfter: 85,
    comment:
      'Separar el flujo de efectivo y aplicar la regla de las 72 horas frenó mis compras impulsivas nocturnas.',
    date: '21/09/2026',
  },
  {
    id: 'ev-4',
    role: 'Docente y Tutor Familiar',
    impulseScoreBefore: 60,
    resilienceScoreAfter: 94,
    comment:
      'Es una plataforma neutral que no intenta vender tarjetas ni endeudar; reduce la fuga del gasto en casa.',
    date: '22/09/2026',
  },
];

export const BitacoraResearchView: React.FC<{ plumage?: PlumageTheme }> = ({
  plumage = 'emerald',
}) => {
  const [activeTab, setActiveTab] = useState<'benchmarking' | 'pruebas' | 'cronograma'>(
    'benchmarking'
  );
  const [evidenceList, setEvidenceList] = useState<SurveySubmission[]>(INITIAL_EVIDENCE);

  const [respondentRole, setRespondentRole] = useState('Estudiante STEAM');
  const [respondentComment, setRespondentComment] = useState('');
  const [q1Understanding, setQ1Understanding] = useState<number>(95);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playSuccess();
    const newEntry: SurveySubmission = {
      id: `ev-${Date.now()}`,
      role: respondentRole,
      impulseScoreBefore: 45,
      resilienceScoreAfter: q1Understanding,
      comment:
        respondentComment.trim() ||
        'El camino de biomas y los simuladores hacen muy claro cómo proteger el ahorro de la inflación.',
      date: '25/09/2026',
    };
    setEvidenceList((prev) => [newEntry, ...prev]);
    setRespondentComment('');
    setSubmittedNotice(true);
  };

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
          <BloomMascot mood="happy" size="md" plumage={plumage} />
          <div>
            <p className="text-xs font-bold text-[#145A3A]">
              Bitácora Oficial · ExpoCiencias Guanajuato 2026 / Código Ciencia 2026
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A3323] mt-0.5 font-display">
              Investigación, Benchmarking y Evidencia
            </h1>
          </div>
        </div>

        {/* Sub-navigation */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#F7FAD5] border-2 border-[#BEC092] rounded-2xl self-start">
          <button
            onClick={() => {
              soundFX.playTap();
              setActiveTab('benchmarking');
            }}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'benchmarking'
                ? 'bg-[#2F7D5B] text-white'
                : 'text-[#0A3323]/75 hover:text-[#0A3323]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Benchmarking</span>
          </button>
          <button
            onClick={() => {
              soundFX.playTap();
              setActiveTab('pruebas');
            }}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'pruebas'
                ? 'bg-[#734A91] text-white'
                : 'text-[#0A3323]/75 hover:text-[#0A3323]'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Pruebas de Campo</span>
          </button>
          <button
            onClick={() => {
              soundFX.playTap();
              setActiveTab('cronograma');
            }}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'cronograma'
                ? 'bg-[#105666] text-white'
                : 'text-[#0A3323]/75 hover:text-[#0A3323]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Cronograma y Fuentes</span>
          </button>
        </div>
      </div>

      {/* TAB 1: BENCHMARKING MATRIX */}
      {activeTab === 'benchmarking' && (
        <div className="space-y-6">
          <div className="duo-card overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-[#BEC092]/60 bg-[#F7FAD5]/50">
              <p className="text-xs font-bold text-[#145A3A]">
                Análisis de Competencias · Metodología de Benchmarking (Camp, 1989)
              </p>
              <h2 className="text-lg sm:text-xl font-semibold text-[#0A3323] mt-0.5 font-display">
                Comparativa frente a Alternativas del Mercado
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F7FAD5] border-b border-[#BEC092] text-[#0A3323] font-bold">
                    <th className="p-4">Canal / Competidor</th>
                    <th className="p-4">¿Personalizado?</th>
                    <th className="p-4">¿Crea Hábitos?</th>
                    <th className="p-4">Aprendizaje</th>
                    <th className="p-4">Fricción</th>
                    <th className="p-4">Enfoque Principal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#BEC092]/50 text-[#0A3323]">
                  <tr>
                    <td className="p-4 font-bold">Apps de Bancos y Fintechs</td>
                    <td className="p-4 font-mono">No</td>
                    <td className="p-4 font-mono">No</td>
                    <td className="p-4">Pasivo</td>
                    <td className="p-4">Alta: Interfaz fría y corporativa</td>
                    <td className="p-4">Vender tarjetas, créditos o seguros</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">Apps de Control de Gastos</td>
                    <td className="p-4 font-mono">No</td>
                    <td className="p-4 font-mono">No</td>
                    <td className="p-4">Técnico</td>
                    <td className="p-4">Alta: Anotar cada peso manualmente</td>
                    <td className="p-4">Registro contable sin pedagogía</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">Influencers y Creadores</td>
                    <td className="p-4 font-mono">No</td>
                    <td className="p-4 font-mono">No</td>
                    <td className="p-4">Pasivo (Solo ver)</td>
                    <td className="p-4">Baja: Sin seguimiento diario</td>
                    <td className="p-4">Entretenimiento y patrocinios</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">Sitios Web y Blogs</td>
                    <td className="p-4 font-mono">No</td>
                    <td className="p-4 font-mono">No</td>
                    <td className="p-4">Pasivo (Lectura)</td>
                    <td className="p-4">Muy Alta: Textos densos y PDFs</td>
                    <td className="p-4">Consulta teórica aislada</td>
                  </tr>
                  <tr className="bg-[#F7FAD5] font-semibold">
                    <td className="p-4 font-bold text-[#145A3A]">
                      Capital Bloom (Nuestra App)
                    </td>
                    <td className="p-4 font-mono font-bold text-[#2F7D5B]">
                      Sí (Adaptable)
                    </td>
                    <td className="p-4 font-mono font-bold text-[#2F7D5B]">
                      Sí (Rachas + SM-2)
                    </td>
                    <td className="p-4 font-bold text-[#0A3323]">
                      Activo (Retos, Quizes y Simuladores)
                    </td>
                    <td className="p-4 font-bold text-[#0A3323]">
                      Muy Baja: Microlecciones animadas
                    </td>
                    <td className="p-4 font-bold text-[#145A3A]">
                      Educación 100% neutral y gamificada
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 duo-card space-y-1.5">
              <p className="text-xs font-mono font-bold text-[#2F7D5B]">
                01. Transforma el gasto en juego
              </p>
              <h3 className="text-base font-semibold text-[#0A3323] font-display">
                Dopamina de Logro
              </h3>
              <p className="text-xs text-[#0A3323]/80 leading-relaxed">
                Construye el hábito desde cero usando rachas, escudos y retos interactivos en lugar de hojas de cálculo aburridas.
              </p>
            </div>

            <div className="p-5 duo-card space-y-1.5">
              <p className="text-xs font-mono font-bold text-[#734A91]">
                02. Educa sin vender
              </p>
              <h3 className="text-base font-semibold text-[#0A3323] font-display">
                Espacio 100% Neutral
              </h3>
              <p className="text-xs text-[#0A3323]/80 leading-relaxed">
                Libre de publicidad bancaria: jamás presiona para contratar créditos ni endeudarse.
              </p>
            </div>

            <div className="p-5 duo-card space-y-1.5">
              <p className="text-xs font-mono font-bold text-[#8F6277]">
                03. Rompe la pasividad
              </p>
              <h3 className="text-base font-semibold text-[#0A3323] font-display">
                Impacto Personal y Familiar
              </h3>
              <p className="text-xs text-[#0A3323]/80 leading-relaxed">
                Erradica el gasto hormiga y fortalece tanto la autonomía individual como la estabilidad del hogar.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EFFECTIVENESS TESTING */}
      {activeTab === 'pruebas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 duo-card p-5 sm:p-6 space-y-5">
            <div>
              <p className="text-xs font-bold text-[#734A91]">
                Evidencia Empírica · Pruebas de Funcionamiento (17/09/2026 – 22/09/2026)
              </p>
              <h2 className="text-lg sm:text-xl font-semibold text-[#0A3323] mt-0.5 font-display">
                Resultados de Efectividad de Capital Bloom
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F7FAD5] border-2 border-[#839958]">
                <p className="text-xs text-[#145A3A] font-bold">Retención SM-2</p>
                <p className="text-2xl font-bold text-[#0A3323] font-mono tabular-nums mt-1">
                  +43.0%
                </p>
                <p className="text-xs text-[#0B3D2E] mt-0.5">
                  Vs. lectura pasiva
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F1D7FF]/50 border-2 border-[#A87BC7]">
                <p className="text-xs text-[#734A91] font-bold">Freno al Impulso (72h)</p>
                <p className="text-2xl font-bold text-[#1D2951] font-mono tabular-nums mt-1">
                  78.4%
                </p>
                <p className="text-xs text-[#734A91] mt-0.5">
                  Menos compras impulsivas
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F9D6D5]/50 border-2 border-[#D3968C]">
                <p className="text-xs text-[#8F6277] font-bold">Dominio de CETES</p>
                <p className="text-2xl font-bold text-[#0A3323] font-mono tabular-nums mt-1">
                  91.2%
                </p>
                <p className="text-xs text-[#8F6277] mt-0.5">
                  En pruebas de campo
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {evidenceList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border-2 border-[#BEC092] bg-[#F7FAD5]/35 space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#105666]">
                    <span className="font-bold text-[#0A3323]">{item.role}</span>
                    <span className="font-mono font-bold tabular-nums">
                      Pre: {item.impulseScoreBefore}/100 → Post: {item.resilienceScoreAfter}/100 · {item.date}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0A3323]/85 leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleAddEvidence}
            className="lg:col-span-5 duo-card p-5 sm:p-6 space-y-4"
          >
            <h3 className="text-base font-semibold text-[#0A3323] font-display">
              Registrar Testimonio en Vivo
            </h3>
            <p className="text-xs text-[#0A3323]/70">
              Agrega una prueba en vivo durante la demostración en ExpoCiencias Guanajuato 2026:
            </p>

            <div>
              <label className="block text-xs font-bold text-[#0A3323] mb-1">
                Perfil u Ocupación
              </label>
              <select
                value={respondentRole}
                onChange={(e) => setRespondentRole(e.target.value)}
                className="w-full min-h-[44px] px-3 py-2 rounded-xl border-2 border-[#BEC092] text-xs font-semibold text-[#0A3323] bg-white"
              >
                <option value="Estudiante STEAM">Estudiante STEAM</option>
                <option value="Estudiante Universitario">Estudiante Universitario</option>
                <option value="Emprendedor / Profesional">Emprendedor / Profesional</option>
                <option value="Evaluador / Docente ExpoCiencias">Evaluador / Docente ExpoCiencias</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A3323] mb-1">
                Puntaje Post-Prueba (0 a 100)
              </label>
              <input
                type="number"
                min={60}
                max={100}
                value={q1Understanding}
                onChange={(e) => setQ1Understanding(Number(e.target.value))}
                className="w-full min-h-[44px] px-3 py-2 rounded-xl border-2 border-[#BEC092] text-xs font-mono font-bold text-[#2F7D5B] bg-white tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A3323] mb-1">
                Comentario sobre Capital Bloom
              </label>
              <textarea
                rows={3}
                value={respondentComment}
                onChange={(e) => setRespondentComment(e.target.value)}
                placeholder="Ej. El estilo interactivo y los simuladores hacen muy fácil entender CETES..."
                className="w-full p-3 rounded-xl border-2 border-[#BEC092] text-xs text-[#0A3323] bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[48px] py-2.5 px-4 rounded-2xl duo-btn-primary text-xs font-bold cursor-pointer"
            >
              GUARDAR EN BITÁCORA
            </button>

            {submittedNotice && (
              <div className="p-3 rounded-xl bg-[#F7FAD5] border border-[#2F7D5B] text-xs text-[#0A3323] font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F7D5B] shrink-0" />
                <span>¡Evidencia guardada!</span>
              </div>
            )}
          </form>
        </div>
      )}

      {/* TAB 3: SCHEDULE & BIBLIOGRAPHY */}
      {activeTab === 'cronograma' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 duo-card p-5 sm:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[#0A3323] font-display">
              Calendarización Oficial de la Bitácora (Septiembre 2026)
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              {[
                {
                  date: '10/09/2026 · 10:00 a.m.',
                  task: 'Inicio oficial de bitácora Código Ciencia 2026 y registro como finalistas en ExpoCiencias Guanajuato 2026 tras evolución desde Emprenday SOLACYT.',
                },
                {
                  date: '11/09/2026 – 12/09/2026',
                  task: 'Estructuración del cronograma de control y definición de evaluaciones oficiales de impacto.',
                },
                {
                  date: '13/09/2026 – 14/09/2026',
                  task: 'Análisis estructural de la economía mexicana (PIB, informalidad, Banxico, SAT/RESICO) e interdependencia global (T-MEC, Nearshoring).',
                },
                {
                  date: '17/09/2026 – 22/09/2026',
                  task: 'Pruebas de funcionamiento de Capital Bloom mediante cuestionarios a personas de distintas profesiones y oficios.',
                },
                {
                  date: '23/09/2026 – 25/09/2026',
                  task: 'Consolidación de la estructura didáctica de los 14 Biomas, algoritmo SM-2 e implementación multiplataforma (iOS, Android y Web).',
                },
              ].map((row) => (
                <div
                  key={row.date}
                  className="p-3.5 rounded-2xl bg-[#F7FAD5]/60 border border-[#BEC092] flex flex-col sm:flex-row sm:items-baseline gap-2"
                >
                  <span className="font-mono text-xs font-bold text-[#145A3A] whitespace-nowrap shrink-0 tabular-nums">
                    {row.date}
                  </span>
                  <p className="text-[#0A3323]/85 leading-relaxed">{row.task}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 duo-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#734A91]">
              <BookOpen className="w-4 h-4" />
              <span>Literatura Científica y Fuentes Oficiales</span>
            </div>
            <h3 className="text-base font-semibold text-[#0A3323] font-display">
              Referencias Bibliográficas
            </h3>
            <ul className="space-y-2.5 text-xs text-[#0A3323]/80 leading-relaxed">
              <li>
                <strong className="text-[#0A3323]">Banco de México (Banxico) (2025/2026):</strong> Informe Trimestral sobre la Inflación y Reporte sobre las Economías Regionales.
              </li>
              <li>
                <strong className="text-[#0A3323]">INEGI (2025/2026):</strong> Sistema de Cuentas Nacionales de México (SCNM) y Encuesta Nacional de Ocupación y Empleo.
              </li>
              <li>
                <strong className="text-[#0A3323]">SHCP / SAT (2025/2026):</strong> Criterios Generales de Política Económica, PEF y Régimen Simplificado de Confianza (RESICO).
              </li>
              <li>
                <strong className="text-[#0A3323]">CONDUSEF &amp; OCDE (2023/2024):</strong> Educación Financiera y Economía Conductual.
              </li>
              <li>
                <strong className="text-[#0A3323]">Wozniak, P. (1990) &amp; Rohrer &amp; Taylor (2007):</strong> Algoritmo SuperMemo (SM-2) de repetición espaciada y práctica intercalada (Interleaving).
              </li>
              <li>
                <strong className="text-[#0A3323]">Kapp (2012) &amp; Deterding (2011):</strong> Gamificación en entornos educativos y motivación conductual.
              </li>
            </ul>
          </div>
        </div>
      )}
    </motion.section>
  );
};
