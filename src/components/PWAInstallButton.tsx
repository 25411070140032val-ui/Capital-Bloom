import React, { useState } from 'react';
import { Download, Smartphone, CheckCircle2, X, Share } from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';
import { soundFX } from '../utils/soundEffects';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android' | 'desktop'>(
    isIOS ? 'ios' : isAndroid ? 'android' : 'ios'
  );

  if (isInstalled) {
    return null;
  }

  const handleTrigger = async () => {
    soundFX.playTap();
    if (isInstallable) {
      await install();
    } else {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleTrigger}
        className="min-h-[44px] px-4 py-2 rounded-xl duo-btn-primary text-xs font-bold flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
        title="Instalar Capital Bloom en iOS, Android o Escritorio"
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>{isIOS ? 'Instalar en iOS' : 'App iOS / Android'}</span>
      </button>

      {showGuideModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A3323]/70 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-modal-title"
        >
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border-2 border-[#BEC092] border-b-6 text-[#0A3323]">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#BEC092]/50">
              <div>
                <p className="text-xs text-[#2F7D5B] font-bold">
                  Acceso Multiplataforma · Modo Sin Conexión
                </p>
                <h3 id="pwa-modal-title" className="text-xl font-semibold text-[#0A3323] mt-0.5 font-display">
                  Lleva Capital Bloom Contigo
                </h3>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#0A3323]/60 hover:bg-[#F7FAD5] hover:text-[#0A3323] transition-colors cursor-pointer"
                aria-label="Cerrar ventana de instalación"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Platform Selector */}
            <div className="flex items-center gap-1 p-1 bg-[#F7FAD5] border border-[#BEC092] rounded-xl mt-4">
              <button
                onClick={() => {
                  soundFX.playTap();
                  setSelectedPlatform('ios');
                }}
                className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedPlatform === 'ios'
                    ? 'bg-[#0A3323] text-white'
                    : 'text-[#0A3323]/70 hover:text-[#0A3323]'
                }`}
              >
                iPhone / iPad
              </button>
              <button
                onClick={() => {
                  soundFX.playTap();
                  setSelectedPlatform('android');
                }}
                className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedPlatform === 'android'
                    ? 'bg-[#0A3323] text-white'
                    : 'text-[#0A3323]/70 hover:text-[#0A3323]'
                }`}
              >
                Android
              </button>
              <button
                onClick={() => {
                  soundFX.playTap();
                  setSelectedPlatform('desktop');
                }}
                className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedPlatform === 'desktop'
                    ? 'bg-[#0A3323] text-white'
                    : 'text-[#0A3323]/70 hover:text-[#0A3323]'
                }`}
              >
                Web / PC
              </button>
            </div>

            <div className="mt-5 space-y-3 text-sm text-[#0A3323]">
              {selectedPlatform === 'ios' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#0A3323]/75">
                    Agrégala a la pantalla de inicio de tu iPhone o iPad en segundos:
                  </p>
                  <div className="p-4 rounded-2xl bg-[#F7FAD5]/60 border-2 border-[#BEC092] space-y-2.5">
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-[#145A3A]">01.</span>
                      <p>
                        En <strong>Safari</strong>, toca el botón <strong>Compartir</strong>{' '}
                        <Share className="w-3.5 h-3.5 inline text-[#145A3A]" /> en la barra inferior.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-[#145A3A]">02.</span>
                      <p>
                        Desliza y elige <strong>Agregar a inicio</strong> (Add to Home Screen).
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-[#145A3A]">03.</span>
                      <p>
                        Toca <strong>Agregar</strong>. Se abrirá a pantalla completa y guardará tu racha incluso sin conexión.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedPlatform === 'android' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#0A3323]/75">
                    Instálala directamente desde Chrome, Edge o Samsung Internet:
                  </p>
                  <div className="p-4 rounded-2xl bg-[#F7FAD5]/60 border-2 border-[#BEC092] space-y-2.5">
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-[#145A3A]">01.</span>
                      <p>
                        Toca el menú de tres puntos <strong>(⋮)</strong> arriba a la derecha.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-[#145A3A]">02.</span>
                      <p>
                        Elige <strong>Instalar aplicación</strong> o <strong>Agregar a la pantalla principal</strong>.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-[#145A3A]">03.</span>
                      <p>
                        ¡Listo! Tendrás el ícono de <strong>Capital Bloom</strong> con acceso offline.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedPlatform === 'desktop' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#0A3323]/75">
                    Úsala como aplicación independiente en tu computadora:
                  </p>
                  <div className="p-4 rounded-2xl bg-[#F7FAD5]/60 border-2 border-[#BEC092] space-y-2.5">
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-[#145A3A]">01.</span>
                      <p>
                        Haz clic en el ícono de <strong>Instalar Capital Bloom</strong> en la barra de direcciones de tu navegador.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-[#145A3A]">02.</span>
                      <p>
                        Si estás en vista previa, abre la app en una pestaña nueva para activar el instalador directo.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-[#BEC092]/50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#145A3A] font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Lecciones disponibles sin internet</span>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="min-h-[44px] px-5 py-2 rounded-xl duo-btn-primary text-xs font-bold cursor-pointer"
              >
                ¡Listo!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 z-50 flex items-center gap-2 rounded-2xl bg-[#8F6277] border-b-4 border-[#0A3323] px-4 py-2.5 text-xs font-bold text-white shadow-lg">
      <Smartphone className="w-4 h-4 shrink-0" />
      <span>Modo sin conexión · Tu progreso se guarda automáticamente</span>
    </div>
  );
};
