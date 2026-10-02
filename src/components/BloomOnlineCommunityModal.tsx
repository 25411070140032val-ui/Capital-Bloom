import React, { useState, useEffect } from 'react';
import {
  User,
  Users,
  LogIn,
  UserPlus,
  LogOut,
  Trophy,
  Flame,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  X,
  RefreshCw,
  Globe,
  ShieldCheck,
  Trees,
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
  EMOTE_META,
} from './BloomMascot';
import { soundFX } from '../utils/soundEffects';

export interface PublicCommunityMember {
  id: string;
  username: string;
  displayName: string;
  email: string;
  financialGoal: string;
  completedLessonsCount: number;
  completedLessonKeys: string[];
  completedBiomeIds: number[];
  currentBiomeId: number;
  currentBiomeName: string;
  streakDays: number;
  resilienceXP: number;
  protectedCapitalMXN: number;
  achievementsCount: number;
  plumage: PlumageTheme;
  equippedSkin: EquippedSkinId;
  shirtColor: CasualShirtColor;
  hoodieVariant: HoodieVariant;
  jacketVariant: JacketVariant;
  armorVariant: ArmorVariant;
  activeEmote: BloomEmoteId;
  cheersReceived: number;
  lastActiveISO: string;
  recentMilestone: string;
}

export interface CommunityFeedItem {
  id: string;
  userId: string;
  displayName: string;
  plumage: PlumageTheme;
  equippedSkin: EquippedSkinId;
  activeEmote: BloomEmoteId;
  actionText: string;
  biomeBadge: string;
  timestampISO: string;
  cheers: number;
}

interface BloomOnlineCommunityModalProps {
  currentUser: PublicCommunityMember | null;
  onAuthSuccess: (user: PublicCommunityMember) => void;
  onLogout: () => void;
  localProgress: {
    completedLessonsCount: number;
    completedLessonKeys: string[];
    completedBiomeIds: number[];
    currentBiomeId: number;
    currentBiomeName: string;
    streakDays: number;
    resilienceXP: number;
    protectedCapitalMXN: number;
    achievementsCount: number;
    plumage: PlumageTheme;
    equippedSkin: EquippedSkinId;
    shirtColor: CasualShirtColor;
    hoodieVariant: HoodieVariant;
    jacketVariant: JacketVariant;
    armorVariant: ArmorVariant;
    activeEmote: BloomEmoteId;
  };
  onGoToNextLesson: () => void;
  onClose: () => void;
}

const SKIN_BADGE_LABELS: Record<EquippedSkinId, string> = {
  none: 'Plumaje Natural',
  shirt: 'Playera Casual (L2)',
  hoodie: 'Hoodie Cyber-Quetzal (L6)',
  astral_jacket: 'Chamarra Visor Astral (L12)',
  diamond_armor: 'Armadura Cúbica (L18)',
};

function formatRelativeMinutes(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.round(diffMs / 60000));
  if (mins < 2) return 'Hace 1 min · En línea';
  if (mins < 60) return `Hace ${mins} min · En línea`;
  const hours = Math.round(mins / 60);
  return `Hace ${hours} h`;
}

export const BloomOnlineCommunityModal: React.FC<BloomOnlineCommunityModalProps> = ({
  currentUser,
  onAuthSuccess,
  onLogout,
  localProgress,
  onGoToNextLesson,
  onClose,
}) => {
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [activeTab, setActiveTab] = useState<'ranking' | 'feed'>('ranking');
  const [displayName, setDisplayName] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [financialGoal, setFinancialGoal] = useState(
    'Completar las 84 lecciones y construir mi fondo de emergencia en CETES'
  );
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [members, setMembers] = useState<PublicCommunityMember[]>([]);
  const [feed, setFeed] = useState<CommunityFeedItem[]>([]);
  const [isLoadingOverview, setIsLoadingOverview] = useState(true);
  const [cheeredIds, setCheeredIds] = useState<string[]>([]);

  const fetchCommunityOverview = async () => {
    try {
      setIsLoadingOverview(true);
      const res = await fetch('/api/community/overview');
      if (res.ok) {
        const data = (await res.json()) as {
          members: PublicCommunityMember[];
          feed: CommunityFeedItem[];
        };
        setMembers(data.members || []);
        setFeed(data.feed || []);
      }
    } catch (err) {
      console.error('Error fetching community overview:', err);
    } finally {
      setIsLoadingOverview(false);
    }
  };

  useEffect(() => {
    fetchCommunityOverview();
  }, [currentUser, localProgress.completedLessonsCount]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/community/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: authMode,
          displayName: displayName.trim(),
          emailOrUsername: emailOrUsername.trim(),
          password: password.trim(),
          financialGoal: financialGoal.trim(),
          progress: localProgress,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'No se pudo iniciar sesión. Intenta nuevamente.');
        setIsSubmitting(false);
        return;
      }

      soundFX.playSuccess();
      onAuthSuccess(data.user as PublicCommunityMember);
      setPassword('');
      await fetchCommunityOverview();
    } catch {
      setAuthError('Error de conexión al sincronizar tu cuenta en línea.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheerMember = async (targetUserId: string) => {
    if (cheeredIds.includes(targetUserId)) return;
    soundFX.playSuccess();
    setCheeredIds((prev) => [...prev, targetUserId]);
    setMembers((prev) =>
      prev.map((m) =>
        m.id === targetUserId ? { ...m, cheersReceived: (m.cheersReceived || 0) + 1 } : m
      )
    );
    try {
      await fetch('/api/community/cheer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId }),
      });
    } catch {
      // ignore transient network error
    }
  };

  const handleCheerFeedEvent = async (eventId: string) => {
    if (cheeredIds.includes(eventId)) return;
    soundFX.playSuccess();
    setCheeredIds((prev) => [...prev, eventId]);
    setFeed((prev) =>
      prev.map((ev) => (ev.id === eventId ? { ...ev, cheers: (ev.cheers || 0) + 1 } : ev))
    );
    try {
      await fetch('/api/community/cheer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId }),
      });
    } catch {
      // ignore transient network error
    }
  };

  // Merge current user's live progress into the ranking display even if not yet logged in as a preview
  const effectiveMembers: PublicCommunityMember[] = React.useMemo(() => {
    const list = [...members];
    if (currentUser) {
      const idx = list.findIndex((m) => m.id === currentUser.id);
      const updatedSelf: PublicCommunityMember = {
        ...currentUser,
        ...localProgress,
      };
      if (idx >= 0) {
        list[idx] = updatedSelf;
      } else {
        list.push(updatedSelf);
      }
    }
    return list.sort((a, b) => {
      if (b.completedLessonsCount !== a.completedLessonsCount) {
        return b.completedLessonsCount - a.completedLessonsCount;
      }
      return b.resilienceXP - a.resilienceXP;
    });
  }, [members, currentUser, localProgress]);

  const totalCommunityLessons = effectiveMembers.reduce(
    (acc, m) => acc + m.completedLessonsCount,
    0
  );
  const totalCommunityProtectedMXN = effectiveMembers.reduce(
    (acc, m) => acc + m.protectedCapitalMXN,
    0
  );

  // Motivational next rival to surpass
  const myRankIndex = currentUser
    ? effectiveMembers.findIndex((m) => m.id === currentUser.id)
    : -1;
  const nextExplorerToSurpass =
    myRankIndex > 0
      ? effectiveMembers[myRankIndex - 1]
      : effectiveMembers.find(
          (m) => m.completedLessonsCount > localProgress.completedLessonsCount
        ) || null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A3323]/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="online-community-modal-title"
    >
      <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-gradient-to-br from-[#F8FBCA] via-[#F9D6D5] to-[#F1D7FF] rounded-3xl border-3 border-[#0A3323] border-b-8 p-5 sm:p-6 shadow-2xl space-y-5 my-auto">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 pb-3 border-b-2 border-[#0A3323]/20">
          <div className="flex items-center gap-3">
            <BloomMascot
              size="md"
              plumage={localProgress.plumage}
              previewSkin={localProgress.equippedSkin}
              shirtColor={localProgress.shirtColor}
              hoodieVariant={localProgress.hoodieVariant}
              jacketVariant={localProgress.jacketVariant}
              armorVariant={localProgress.armorVariant}
              emote={localProgress.activeEmote}
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#145A3A] text-[#F8FBCA] text-[10px] font-mono font-extrabold">
                  <Globe className="w-3 h-3 text-[#34D399]" />
                  <span>COMUNIDAD EN LÍNEA · TIEMPO REAL</span>
                </span>
                {currentUser && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0A3323] text-[#34D399] text-[10px] font-mono font-extrabold">
                    <span>● Sesión activa: {currentUser.displayName}</span>
                  </span>
                )}
              </div>
              <h3
                id="online-community-modal-title"
                className="text-lg sm:text-xl font-semibold text-[#0A3323] font-display mt-0.5"
              >
                Iniciar Sesión y Progreso en Línea de Exploradores
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-[#F8FBCA] border-2 border-[#0A3323] flex items-center justify-center text-[#0A3323] hover:bg-[#F6C8C7] cursor-pointer shrink-0"
            aria-label="Cerrar comunidad en línea"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GLOBAL COMMUNITY STATS BANNER */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#0F172A] border-2 border-[#0A3323] border-b-4 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#145A3A] text-[#34D399] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-extrabold text-[#34D399] uppercase">
                EXPLORADORES EN LÍNEA
              </p>
              <p className="text-base font-extrabold text-white tabular-nums">
                {effectiveMembers.length} usuarios activos
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0F172A] border-2 border-[#0A3323] border-b-4 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#734A91] text-[#F1D7FF] flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-extrabold text-[#E0B0FF] uppercase">
                LECCIONES COMUNITARIAS
              </p>
              <p className="text-base font-extrabold text-white tabular-nums">
                {totalCommunityLessons} lecciones superadas
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0F172A] border-2 border-[#0A3323] border-b-4 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8F6277] text-[#F9D6D5] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-extrabold text-[#F6C8C7] uppercase">
                CAPITAL PROTEGIDO EN CONJUNTO
              </p>
              <p className="text-base font-extrabold text-[#FFD166] tabular-nums">
                ${totalCommunityProtectedMXN.toLocaleString('es-MX')} MXN
              </p>
            </div>
          </div>
        </div>

        {/* MAIN 2-COLUMN GRID INSIDE MODAL: LEFT = USER LOGIN / PROFILE, RIGHT = ONLINE PROGRESS & MOTIVATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT COLUMN (5 cols): INICIAR SESIÓN / PERFIL EN LÍNEA */}
          <div className="lg:col-span-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#0A3323] via-[#145A3A] to-[#0F172A] border-2 border-[#0A3323] border-b-6 text-white space-y-4 shadow-lg">
            {!currentUser ? (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-extrabold text-[#FFD166] uppercase">
                    TU CUENTA DE EXPLORADOR EN LÍNEA
                  </span>
                  <h4 className="text-base sm:text-lg font-semibold text-white font-display">
                    {authMode === 'register'
                      ? 'Crear Cuenta y Sincronizar Progreso'
                      : 'Iniciar Sesión con tu Usuario'}
                  </h4>
                  <p className="text-xs text-[#F8FBCA]/90 leading-relaxed">
                    Inicia sesión para guardar tu avance en línea ({localProgress.completedLessonsCount}/84 lecciones), mostrar a tu Colibrí Bloom con su ropa y emotes desbloqueados, y motivarte avanzando junto a los demás usuarios.
                  </p>
                </div>

                {/* Mode Switcher Tabs: Crear Cuenta / Iniciar Sesión */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-black/35 border border-white/20">
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playTap();
                      setAuthMode('register');
                      setAuthError(null);
                    }}
                    className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      authMode === 'register'
                        ? 'bg-[#F8FBCA] text-[#0A3323]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Crear Cuenta</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playTap();
                      setAuthMode('login');
                      setAuthError(null);
                    }}
                    className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      authMode === 'login'
                        ? 'bg-[#F8FBCA] text-[#0A3323]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Iniciar Sesión</span>
                  </button>
                </div>

                <form onSubmit={handleAuthSubmit} className="space-y-3">
                  {authMode === 'register' && (
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono font-extrabold text-[#F8FBCA]">
                        NOMBRE O APODO VISIBLE EN EL RANKING:
                      </label>
                      <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Ej. Valeria Bloom"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#0A3323] border-2 border-[#839958] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono font-extrabold text-[#F8FBCA]">
                      USUARIO O CORREO ELECTRÓNICO:
                    </label>
                    <input
                      type="text"
                      required
                      value={emailOrUsername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                      placeholder="Ej. valeria@ejemplo.mx o valeria_bloom"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#0A3323] border-2 border-[#839958] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono font-extrabold text-[#F8FBCA]">
                      CONTRASEÑA:
                    </label>
                    <input
                      type="password"
                      required
                      minLength={3}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 3 caracteres"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#0A3323] border-2 border-[#839958] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                    />
                  </div>

                  {authMode === 'register' && (
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono font-extrabold text-[#F8FBCA]">
                        TU META FINANCIERA (VISIBLE PARA MOTIVAR A LA COMUNIDAD):
                      </label>
                      <input
                        type="text"
                        value={financialGoal}
                        onChange={(e) => setFinancialGoal(e.target.value)}
                        placeholder="Ej. Ahorrar mi fondo de emergencia en CETES"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#0A3323] border-2 border-[#839958] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                      />
                    </div>
                  )}

                  {authError && (
                    <div className="p-2.5 rounded-xl bg-[#8F6277] border border-[#F6C8C7] text-white text-xs font-bold">
                      {authError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-2xl bg-[#34D399] hover:bg-[#10B981] text-[#0A3323] border-2 border-[#F8FBCA] border-b-4 text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-transform active:translate-y-0.5"
                  >
                    {authMode === 'register' ? (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>
                          {isSubmitting
                            ? 'Sincronizando...'
                            : 'Crear Cuenta y Unirme al Progreso en Línea'}
                        </span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>
                          {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión y Sincronizar'}
                        </span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* LOGGED-IN USER PROFILE CARD */
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#34D399]/20 border border-[#34D399] text-[#34D399] text-[10px] font-mono font-extrabold">
                    ● PERFIL EN LÍNEA SINCRONIZADO
                  </span>
                  <button
                    onClick={() => {
                      soundFX.playTap();
                      onLogout();
                    }}
                    className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-[#F6C8C7] text-[11px] font-extrabold flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/35 border border-white/15 flex items-center gap-3.5">
                  <BloomMascot
                    size="md"
                    plumage={localProgress.plumage}
                    previewSkin={localProgress.equippedSkin}
                    shirtColor={localProgress.shirtColor}
                    hoodieVariant={localProgress.hoodieVariant}
                    jacketVariant={localProgress.jacketVariant}
                    armorVariant={localProgress.armorVariant}
                    emote={localProgress.activeEmote}
                  />
                  <div className="min-w-0">
                    <h4 className="text-base font-extrabold text-white truncate">
                      {currentUser.displayName}
                    </h4>
                    <p className="text-[11px] font-mono text-[#F8FBCA]/80 truncate">
                      @{currentUser.username} · Posición #{myRankIndex + 1} en línea
                    </p>
                    <p className="text-[11px] text-[#34D399] font-bold mt-1">
                      “{currentUser.financialGoal}”
                    </p>
                  </div>
                </div>

                {/* User's Live Online Telemetry */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                    <p className="text-base font-mono font-extrabold text-[#FFD166]">
                      {localProgress.completedLessonsCount} / 84
                    </p>
                    <p className="text-[10px] font-extrabold text-[#F8FBCA]">
                      LECCIONES EN LÍNEA
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                    <p className="text-base font-mono font-extrabold text-[#34D399]">
                      {localProgress.achievementsCount} / 12
                    </p>
                    <p className="text-[10px] font-extrabold text-[#F8FBCA]">
                      LOGROS OBTENIDOS
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                    <p className="text-base font-mono font-extrabold text-[#F6C8C7]">
                      {localProgress.streakDays} días
                    </p>
                    <p className="text-[10px] font-extrabold text-[#F8FBCA]">
                      RACHA ACTIVA
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                    <p className="text-base font-mono font-extrabold text-[#E0B0FF]">
                      {currentUser.cheersReceived || 0} 👏
                    </p>
                    <p className="text-[10px] font-extrabold text-[#F8FBCA]">
                      IMPULSOS RECIBIDOS
                    </p>
                  </div>
                </div>

                {/* Outfit & Emote Currently Visible to Other Users */}
                <div className="p-3 rounded-2xl bg-white/10 border border-white/15 space-y-1 text-xs">
                  <p className="text-[10px] font-mono font-extrabold text-[#FFD166] uppercase">
                    TU ASPECTO VISIBLE PARA LA COMUNIDAD:
                  </p>
                  <p className="font-bold text-white">
                    Ropa: {SKIN_BADGE_LABELS[localProgress.equippedSkin]}
                  </p>
                  <p className="font-bold text-[#38BDF8]">
                    Emote:{' '}
                    {localProgress.activeEmote === 'none'
                      ? 'Vuelo natural'
                      : EMOTE_META[localProgress.activeEmote].title}
                  </p>
                </div>
              </div>
            )}

            {/* Motivational Next Milestone Callout */}
            {nextExplorerToSurpass && (
              <div className="p-3.5 rounded-2xl bg-[#F8FBCA] border-2 border-[#0A3323] text-[#0A3323] space-y-2">
                <p className="text-[10px] font-mono font-extrabold text-[#734A91] uppercase">
                  🎯 META MOTIVACIONAL EN LÍNEA
                </p>
                <p className="text-xs font-extrabold leading-snug">
                  ¡Completa{' '}
                  {Math.max(
                    1,
                    nextExplorerToSurpass.completedLessonsCount -
                      localProgress.completedLessonsCount +
                      1
                  )}{' '}
                  {Math.max(
                    1,
                    nextExplorerToSurpass.completedLessonsCount -
                      localProgress.completedLessonsCount +
                      1
                  ) === 1
                    ? 'lección más'
                    : 'lecciones más'}{' '}
                  para superar a {nextExplorerToSurpass.displayName} (
                  {nextExplorerToSurpass.completedLessonsCount}/84 lecciones)!
                </p>
                <button
                  onClick={() => {
                    soundFX.playTap();
                    onGoToNextLesson();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-[#145A3A] hover:bg-[#0A3323] text-[#F8FBCA] text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Ir a mi siguiente lección ahora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (7 cols): TABLA DE PROGRESO EN LÍNEA & MURO DE AVANCES */}
          <div className="lg:col-span-7 space-y-4">
            {/* Sub-navigation between Leaderboard Ranking and Live Activity Feed */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFX.playTap();
                    setActiveTab('ranking');
                  }}
                  className={`min-h-[40px] px-4 py-2 rounded-2xl border-2 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                    activeTab === 'ranking'
                      ? 'bg-[#0A3323] text-[#F8FBCA] border-[#0A3323] border-b-4'
                      : 'bg-white/80 text-[#0A3323] border-[#0A3323]/40 hover:bg-white'
                  }`}
                >
                  <Trophy className="w-4 h-4 text-[#FFD166]" />
                  <span>Avance de Usuarios ({effectiveMembers.length})</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playTap();
                    setActiveTab('feed');
                  }}
                  className={`min-h-[40px] px-4 py-2 rounded-2xl border-2 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                    activeTab === 'feed'
                      ? 'bg-[#734A91] text-white border-[#1D2951] border-b-4'
                      : 'bg-white/80 text-[#1D2951] border-[#734A91]/40 hover:bg-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#FFD166]" />
                  <span>Actividad en Vivo ({feed.length})</span>
                </button>
              </div>

              <button
                onClick={() => {
                  soundFX.playTap();
                  fetchCommunityOverview();
                }}
                className="px-3 py-1.5 rounded-xl bg-white/90 border-2 border-[#0A3323] text-[#0A3323] text-xs font-extrabold flex items-center gap-1.5 hover:bg-[#F8FBCA] cursor-pointer"
                title="Actualizar progreso en línea"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isLoadingOverview ? 'animate-spin' : ''}`}
                />
                <span>Actualizar</span>
              </button>
            </div>

            {activeTab === 'ranking' ? (
              <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
                {effectiveMembers.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-white/95 border-2 border-[#0A3323] border-b-4 text-center space-y-2">
                    <Users className="w-8 h-8 text-[#145A3A] mx-auto" />
                    <h5 className="text-sm font-extrabold text-[#0A3323]">
                      Aún no hay sesiones iniciadas en la aplicación
                    </h5>
                    <p className="text-xs text-[#0A3323]/80 max-w-md mx-auto leading-relaxed">
                      Crea tu cuenta o inicia sesión en el formulario de la izquierda para activar tu perfil en línea y guardar tu progreso de lecciones, logros, ropa y emotes.
                    </p>
                  </div>
                ) : (
                  effectiveMembers.map((member, idx) => {
                  const isSelf = currentUser?.id === member.id;
                  const rankNumber = idx + 1;
                  const progressPct = Math.min(
                    100,
                    Math.round((member.completedLessonsCount / 84) * 100)
                  );
                  const hasCheered = cheeredIds.includes(member.id);

                  return (
                    <div
                      key={member.id}
                      className={`p-4 rounded-2xl border-2 border-b-4 transition-all ${
                        isSelf
                          ? 'bg-gradient-to-r from-[#F8FBCA] via-[#D9F99D] to-[#F8FBCA] border-[#145A3A] ring-2 ring-[#145A3A]'
                          : 'bg-white/95 border-[#0A3323]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Rank Medal */}
                          <div
                            className={`w-9 h-9 rounded-xl font-mono font-extrabold text-xs flex items-center justify-center shrink-0 border-2 ${
                              rankNumber === 1
                                ? 'bg-[#FFD166] text-[#0A3323] border-[#0A3323]'
                                : rankNumber === 2
                                ? 'bg-[#E2E8F0] text-[#0A3323] border-[#0A3323]'
                                : rankNumber === 3
                                ? 'bg-[#FDBA74] text-[#0A3323] border-[#0A3323]'
                                : 'bg-[#0A3323] text-[#F8FBCA] border-[#0A3323]'
                            }`}
                          >
                            #{rankNumber}
                          </div>

                          {/* Member's Live Bloom Avatar with their unlocked Outfit & Emote */}
                          <BloomMascot
                            size="sm"
                            plumage={member.plumage}
                            previewSkin={member.equippedSkin}
                            shirtColor={member.shirtColor}
                            hoodieVariant={member.hoodieVariant}
                            jacketVariant={member.jacketVariant}
                            armorVariant={member.armorVariant}
                            emote={member.activeEmote}
                          />

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <h5 className="text-sm font-extrabold text-[#0A3323] truncate">
                                {member.displayName}
                              </h5>
                              {isSelf && (
                                <span className="px-2 py-0.5 rounded-full bg-[#145A3A] text-[#F8FBCA] text-[10px] font-mono font-extrabold">
                                  TÚ
                                </span>
                              )}
                              <span className="text-[10px] font-mono text-[#145A3A] font-bold">
                                ● {formatRelativeMinutes(member.lastActiveISO)}
                              </span>
                            </div>

                            <p className="text-[11px] text-[#0A3323]/80 font-bold truncate mt-0.5">
                              Meta: “{member.financialGoal}”
                            </p>

                            <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] font-mono font-extrabold">
                              <span className="px-2 py-0.5 rounded-md bg-[#F1D7FF] text-[#1D2951] border border-[#734A91]/40">
                                {SKIN_BADGE_LABELS[member.equippedSkin]}
                              </span>
                              {member.activeEmote !== 'none' && (
                                <span className="px-2 py-0.5 rounded-md bg-[#E0F2FE] text-[#0369A1] border border-[#0284C7]/40">
                                  Emote: {EMOTE_META[member.activeEmote].title}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Stats & Cheer Button */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                          <div className="flex items-center gap-2 text-xs font-mono font-extrabold">
                            <span className="px-2 py-1 rounded-lg bg-[#F9D6D5] text-[#8F6277] border border-[#8F6277]/40 flex items-center gap-1">
                              <Flame className="w-3.5 h-3.5 fill-[#8F6277]" />
                              <span>{member.streakDays}d</span>
                            </span>
                            <span className="px-2 py-1 rounded-lg bg-[#F8FBCA] text-[#145A3A] border border-[#145A3A]/40">
                              {member.resilienceXP} XP
                            </span>
                          </div>

                          {!isSelf && (
                            <button
                              onClick={() => handleCheerMember(member.id)}
                              className={`px-3 py-1 rounded-xl border text-[11px] font-extrabold flex items-center gap-1 cursor-pointer transition-all ${
                                hasCheered
                                  ? 'bg-[#145A3A] text-[#F8FBCA] border-[#0A3323]'
                                  : 'bg-[#F8FBCA] hover:bg-[#FFD166] text-[#0A3323] border-[#0A3323]'
                              }`}
                            >
                              <HeartHandshake className="w-3.5 h-3.5" />
                              <span>
                                {hasCheered ? '¡Motivado!' : 'Impulsar'} ({member.cheersReceived})
                              </span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Member Lesson Progress Bar & Current Biome */}
                      <div className="mt-3 pt-2.5 border-t border-[#0A3323]/15 space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-extrabold text-[#0A3323]">
                          <span className="flex items-center gap-1 text-[#145A3A]">
                            <Trees className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              Bioma {String(member.currentBiomeId).padStart(2, '0')}:{' '}
                              {member.currentBiomeName}
                            </span>
                          </span>
                          <span className="font-mono tabular-nums text-[#734A91]">
                            {member.completedLessonsCount} / 84 Lecciones ({progressPct}%)
                          </span>
                        </div>

                        <div className="h-3 rounded-full bg-[#E2E8F0] border border-[#0A3323] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#145A3A] via-[#2F7D5B] to-[#734A91] rounded-full transition-all duration-500"
                            style={{ width: `${ Math.max(4, progressPct) }%` }}
                          />
                        </div>

                        <p className="text-[11px] text-[#0A3323]/85 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#145A3A] shrink-0" />
                          <span>Último logro: {member.recentMilestone}</span>
                        </p>
                      </div>
                    </div>
                  );
                })
                )}
              </div>
            ) : (
              /* LIVE ACTIVITY FEED TAB */
              <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
                {feed.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-white/95 border-2 border-[#0A3323] border-b-4 text-center space-y-2">
                    <Sparkles className="w-8 h-8 text-[#734A91] mx-auto" />
                    <h5 className="text-sm font-extrabold text-[#0A3323]">
                      Sin actividad registrada todavía
                    </h5>
                    <p className="text-xs text-[#0A3323]/80 max-w-md mx-auto leading-relaxed">
                      Cuando inicies sesión y avances en tus lecciones o desbloquees recompensas, tus hitos aparecerán aquí.
                    </p>
                  </div>
                ) : (
                  feed.map((ev) => {
                    const hasCheered = cheeredIds.includes(ev.id);
                    return (
                      <div
                        key={ev.id}
                        className="p-3.5 rounded-2xl bg-white/95 border-2 border-[#0A3323] border-b-4 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <BloomMascot
                            size="sm"
                            plumage={ev.plumage}
                            previewSkin={ev.equippedSkin}
                            emote={ev.activeEmote}
                          />
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm text-[#0A3323] font-medium leading-snug">
                              <span className="font-extrabold">{ev.displayName}</span>{' '}
                              {ev.actionText}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] font-mono font-extrabold">
                              <span className="px-2 py-0.5 rounded-md bg-[#F8FBCA] text-[#0A3323] border border-[#0A3323]/30">
                                {ev.biomeBadge}
                              </span>
                              <span className="text-[#145A3A]">
                                {formatRelativeMinutes(ev.timestampISO)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCheerFeedEvent(ev.id)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold shrink-0 cursor-pointer transition-all ${
                            hasCheered
                              ? 'bg-[#145A3A] text-[#F8FBCA] border-[#0A3323]'
                              : 'bg-[#F8FBCA] hover:bg-[#FFD166] text-[#0A3323] border-[#0A3323]'
                          }`}
                        >
                          👏 {ev.cheers}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-2 border-t-2 border-[#0A3323]/15 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-extrabold text-[#0A3323]">
            Cada lección que terminas actualiza tu posición, tus logros y el aspecto de tu Colibrí Bloom en línea.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playTap();
                onGoToNextLesson();
              }}
              className="min-h-[42px] px-4 py-2 rounded-xl bg-[#145A3A] text-[#F8FBCA] hover:bg-[#0A3323] text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Avanzar en mi siguiente lección</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="min-h-[42px] px-5 py-2 rounded-xl bg-[#F8FBCA] border-2 border-[#0A3323] text-[#0A3323] text-xs font-extrabold cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
