import React from 'react';
import { motion } from 'motion/react';
import { BIOME_MODULES } from '../data/biomesData';

export interface BiomeScenicBackgroundProps {
  topicId: number;
  variant?: 'banner' | 'path' | 'page' | 'modal';
  className?: string;
}

interface BiomeAtmosphereConfig {
  skyOverlay: string;
  glowColor: string;
  secondaryGlow: string;
  rayColor: string;
  particleColor: string;
  particleType: 'leaves' | 'mist' | 'monarch' | 'sparks' | 'stars' | 'aurora';
  badgeText: string;
  accentBorder: string;
}

const BIOME_ATMOSPHERE: Record<number, BiomeAtmosphereConfig> = {
  1: {
    skyOverlay: 'from-[#2B1608]/55 via-[#5C3416]/25 to-[#2B1608]/75',
    glowColor: 'rgba(245, 158, 11, 0.32)',
    secondaryGlow: 'rgba(131, 153, 88, 0.25)',
    rayColor: 'rgba(254, 243, 199, 0.16)',
    particleColor: '#FDE68A',
    particleType: 'leaves',
    badgeText: '🍂 BIOMA 01 · SELVA TROPICAL SECA · CEIBAS Y CACAO PREHISPÁNICO',
    accentBorder: 'border-[#F59E0B]/60',
  },
  2: {
    skyOverlay: 'from-[#031F16]/55 via-[#0A4B35]/20 to-[#031F16]/75',
    glowColor: 'rgba(45, 212, 191, 0.30)',
    secondaryGlow: 'rgba(16, 185, 129, 0.26)',
    rayColor: 'rgba(167, 243, 208, 0.16)',
    particleColor: '#A7F3D0',
    particleType: 'sparks',
    badgeText: '🌴 BIOMA 02 · SELVA TROPICAL HÚMEDA · CASCADAS TURQUESA Y MONSTERAS',
    accentBorder: 'border-[#2DD4BF]/60',
  },
  3: {
    skyOverlay: 'from-[#07222B]/55 via-[#104C5E]/20 to-[#07222B]/75',
    glowColor: 'rgba(125, 211, 252, 0.28)',
    secondaryGlow: 'rgba(247, 250, 213, 0.22)',
    rayColor: 'rgba(247, 250, 213, 0.18)',
    particleColor: '#E0F2FE',
    particleType: 'mist',
    badgeText: '🌲 BIOMA 03 · BOSQUE TEMPLADO DE PINO · AGUJAS AZULES Y HACES DE SOL',
    accentBorder: 'border-[#7DD3FC]/60',
  },
  4: {
    skyOverlay: 'from-[#1E2B18]/55 via-[#6E4726]/20 to-[#2B1E14]/75',
    glowColor: 'rgba(217, 119, 6, 0.30)',
    secondaryGlow: 'rgba(131, 153, 88, 0.25)',
    rayColor: 'rgba(254, 243, 199, 0.15)',
    particleColor: '#FCD34D',
    particleType: 'leaves',
    badgeText: '🍂 BIOMA 04 · BOSQUE TEMPLADO DE ENCINO · ROBLEDAL ÁMBAR Y BELLOTAS',
    accentBorder: 'border-[#F59E0B]/60',
  },
  5: {
    skyOverlay: 'from-[#140E26]/55 via-[#3E255B]/20 to-[#123528]/75',
    glowColor: 'rgba(249, 115, 22, 0.32)',
    secondaryGlow: 'rgba(168, 85, 247, 0.25)',
    rayColor: 'rgba(254, 215, 170, 0.16)',
    particleColor: '#FB923C',
    particleType: 'monarch',
    badgeText: '🦋 BIOMA 05 · BOSQUE DE OYAMEL · SANTUARIO DE LA MARIPOSA MONARCA',
    accentBorder: 'border-[#FB923C]/65',
  },
  6: {
    skyOverlay: 'from-[#05232E]/55 via-[#0D5263]/20 to-[#06332C]/75',
    glowColor: 'rgba(45, 212, 191, 0.30)',
    secondaryGlow: 'rgba(56, 189, 248, 0.24)',
    rayColor: 'rgba(204, 251, 241, 0.15)',
    particleColor: '#99F6E4',
    particleType: 'sparks',
    badgeText: '🏞️ BIOMA 06 · BOSQUE DE CONÍFERAS · RÍO TURQUESA Y CANTOS RODADOS',
    accentBorder: 'border-[#2DD4BF]/60',
  },
  7: {
    skyOverlay: 'from-[#0E1829]/55 via-[#24424D]/20 to-[#112626]/75',
    glowColor: 'rgba(192, 132, 252, 0.28)',
    secondaryGlow: 'rgba(52, 211, 153, 0.24)',
    rayColor: 'rgba(241, 215, 255, 0.15)',
    particleColor: '#E9D5FF',
    particleType: 'mist',
    badgeText: '🌿 BIOMA 07 · BOSQUE MESÓFILO · HELECHOS ARBORESCENTES Y NIEBLA',
    accentBorder: 'border-[#C084FC]/60',
  },
  8: {
    skyOverlay: 'from-[#2D162B]/50 via-[#6E3B5E]/20 to-[#2D162B]/75',
    glowColor: 'rgba(244, 114, 182, 0.30)',
    secondaryGlow: 'rgba(253, 230, 138, 0.24)',
    rayColor: 'rgba(252, 231, 243, 0.16)',
    particleColor: '#FBCFE8',
    particleType: 'stars',
    badgeText: '💎 BIOMA 08 · DESIERTO DE SALARES · COSTAS HEXAGONALES Y ESPEJO DE AGUA',
    accentBorder: 'border-[#F472B6]/60',
  },
  9: {
    skyOverlay: 'from-[#3B1510]/55 via-[#8F3929]/20 to-[#3B1510]/75',
    glowColor: 'rgba(249, 115, 22, 0.32)',
    secondaryGlow: 'rgba(239, 68, 68, 0.25)',
    rayColor: 'rgba(254, 215, 170, 0.16)',
    particleColor: '#FDBA74',
    particleType: 'sparks',
    badgeText: '🏜️ BIOMA 09 · DESIERTO ROCOSO HAMADA · CAÑÓN ROJO Y ARCO DE PIEDRA',
    accentBorder: 'border-[#FB923C]/60',
  },
  10: {
    skyOverlay: 'from-[#082E36]/55 via-[#136B73]/20 to-[#422814]/75',
    glowColor: 'rgba(45, 212, 191, 0.32)',
    secondaryGlow: 'rgba(251, 191, 36, 0.28)',
    rayColor: 'rgba(254, 243, 199, 0.16)',
    particleColor: '#FDE68A',
    particleType: 'sparks',
    badgeText: '🌴 BIOMA 10 · DESIERTO CON OASIS · MANANTIAL TURQUESA Y PALMAS',
    accentBorder: 'border-[#2DD4BF]/65',
  },
  11: {
    skyOverlay: 'from-[#081038]/55 via-[#1D2E6E]/20 to-[#0B144A]/75',
    glowColor: 'rgba(96, 165, 250, 0.30)',
    secondaryGlow: 'rgba(253, 224, 71, 0.22)',
    rayColor: 'rgba(219, 234, 254, 0.15)',
    particleColor: '#BAE6FD',
    particleType: 'stars',
    badgeText: '🦅 BIOMA 11 · CORDILLERA · PASO DE ALTA MONTAÑA Y ÁGUILA REAL',
    accentBorder: 'border-[#60A5FA]/60',
  },
  12: {
    skyOverlay: 'from-[#1D0E2E]/55 via-[#5A2E7A]/20 to-[#1B102E]/75',
    glowColor: 'rgba(251, 113, 133, 0.32)',
    secondaryGlow: 'rgba(56, 189, 248, 0.26)',
    rayColor: 'rgba(255, 228, 230, 0.16)',
    particleColor: '#FDA4AF',
    particleType: 'stars',
    badgeText: '⛰️ BIOMA 12 · ALTA CUMBRE · AGUJAS ALPENGLOW Y GLACIAR ALPINO',
    accentBorder: 'border-[#FB7185]/60',
  },
  13: {
    skyOverlay: 'from-[#0A2129]/55 via-[#174E5B]/20 to-[#0D242C]/75',
    glowColor: 'rgba(52, 211, 153, 0.30)',
    secondaryGlow: 'rgba(250, 204, 21, 0.24)',
    rayColor: 'rgba(209, 250, 229, 0.15)',
    particleColor: '#A7F3D0',
    particleType: 'mist',
    badgeText: '🌼 BIOMA 13 · PÁRAMO ANDINO · VALLE DE FRAILEJONES Y LAGUNAS',
    accentBorder: 'border-[#34D399]/60',
  },
  14: {
    skyOverlay: 'from-[#05081C]/55 via-[#1B1648]/20 to-[#080D24]/80',
    glowColor: 'rgba(232, 121, 249, 0.35)',
    secondaryGlow: 'rgba(45, 212, 191, 0.30)',
    rayColor: 'rgba(245, 208, 254, 0.16)',
    particleColor: '#F0ABFC',
    particleType: 'aurora',
    badgeText: '🌌 BIOMA 14 · SUPERPÁRAMO VOLCÁNICO · CUMBRE DE OBSIDIANA Y AURORA',
    accentBorder: 'border-[#E879F9]/65',
  },
};

/**
 * Fondo escénico de alta estética para los 14 Biomas de Capital Bloom.
 * Combina la ilustración pictórica dedicada de cada bioma (1 a 14) con
 * iluminación volumétrica suave, bruma atmosférica y partículas orgánicas,
 * sin deformaciones geométricas ni recortes bruscos.
 */
export const BiomeScenicBackground: React.FC<BiomeScenicBackgroundProps> = React.memo(({
  topicId,
  variant = 'path',
  className = '',
}) => {
  const biomeModule = BIOME_MODULES.find((b) => b.id === topicId) || BIOME_MODULES[0];
  const atm = BIOME_ATMOSPHERE[topicId] || BIOME_ATMOSPHERE[1];

  const containerOpacity =
    variant === 'page'
      ? 'opacity-50'
      : variant === 'modal'
      ? 'opacity-30'
      : 'opacity-100';

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${containerOpacity} ${className}`}
      aria-hidden="true"
    >
      {/* 1. UNA SOLA IMAGEN DE FONDO PICTÓRICA EXCLUSIVA DE CADA UNO DE LOS 14 BIOMAS (SIN DUPLICAR) */}
      <img
        src={biomeModule.imageUrl}
        alt={biomeModule.biomeName}
        loading={topicId <= 2 || variant === 'modal' ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* 2. VELO ATMOSFÉRICO CROMÁTICO PROPIO DEL BIOMA */}
      <div className={`absolute inset-0 bg-gradient-to-b ${atm.skyOverlay}`} />

      {/* 3. ILUMINACIÓN VOLUMÉTRICA Y RESPLANDOR ORGÁNICO LIGERO (CERO BLOQUEO DE GPU) */}
      <div
        className="absolute inset-0 opacity-85"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 15%, ${atm.glowColor} 0%, transparent 55%), radial-gradient(circle at 75% 85%, ${atm.secondaryGlow} 0%, transparent 55%)`,
        }}
      />

      {/* Haces de luz solar / lunar diagonales suaves */}
      <div
        className="absolute inset-0 opacity-75"
        style={{
          backgroundImage: `linear-gradient(125deg, transparent 20%, ${atm.rayColor} 32%, transparent 45%, ${atm.rayColor} 62%, transparent 76%)`,
        }}
      />

      {/* 4. EFECTOS AMBIENTALES SUTILES (AURORA / NIEBLA / DESTELLOS SIN BUCLES PESADOS) */}
      {atm.particleType === 'aurora' && (
        <div
          className="absolute inset-x-0 top-0 h-56 opacity-65"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 0%, rgba(52, 211, 153, 0.35), rgba(217, 70, 239, 0.28), transparent 70%)',
          }}
        />
      )}

      {atm.particleType === 'mist' && (
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(180deg, transparent 22%, rgba(255,255,255,0.14) 38%, transparent 54%, rgba(255,255,255,0.1) 74%, transparent 90%)',
          }}
        />
      )}

      {/* Destellos ambientales propios del bioma */}
      <div className="absolute inset-0">
        {[
          { left: '14%', top: '22%', size: 6 },
          { left: '82%', top: '18%', size: 7 },
          { left: '22%', top: '54%', size: 5 },
          { left: '76%', top: '48%', size: 6 },
          { left: '18%', top: '80%', size: 6 },
          { left: '84%', top: '76%', size: 7 },
        ].map((p, idx) => (
          <div
            key={idx}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: atm.particleColor,
              boxShadow: `0 0 10px 2px ${atm.particleColor}`,
            }}
            className="absolute rounded-full opacity-75"
          />
        ))}
      </div>

      {/* 5. VIÑETA PERIMETRAL SUAVE PARA INTEGRAR LAS TARJETAS DE INTERFAZ */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/45" />
    </div>
  );
});

/**
 * Divisor ambiental limpio y elegante para el inicio y cierre de cada hábitat
 * (reemplaza los bordes dentados deformados por una franja vítrea de alta estética).
 */
export const BiomeSculptedCrest: React.FC<{
  topicId: number;
  position: 'top' | 'bottom';
}> = React.memo(({ topicId, position }) => {
  const atm = BIOME_ATMOSPHERE[topicId] || BIOME_ATMOSPHERE[1];
  const isTop = position === 'top';

  if (!isTop) {
    return (
      <div
        className="w-full pt-2 flex justify-center select-none pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-40 h-1.5 rounded-full bg-white/30" />
      </div>
    );
  }

  return (
    <div
      className="w-full py-1.5 flex justify-center select-none pointer-events-none relative z-10"
      aria-hidden="true"
    >
      <span
        className={`px-4 py-1 rounded-full bg-black/75 border ${atm.accentBorder} text-[#F8FBCA] text-[10px] sm:text-[11px] font-mono font-extrabold shadow-md tracking-wide`}
      >
        {atm.badgeText}
      </span>
    </div>
  );
});
