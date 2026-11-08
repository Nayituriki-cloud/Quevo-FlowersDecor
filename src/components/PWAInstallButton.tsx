import React, { useState } from 'react';
import { Download, Smartphone, X, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  if (isInstalled || justInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setJustInstalled(true);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // General prompt or info
      setShowIOSGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        title="Install Quevo Flowers Mobile App"
        className={`flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-50/80 px-3 py-1.5 text-xs font-medium text-rose-900 transition-all hover:bg-rose-100 hover:border-rose-400 active:scale-95 shadow-xs shrink-0 whitespace-nowrap`}
      >
        <Smartphone className="w-3.5 h-3.5 text-rose-700" />
        <span>{compact ? 'Install App' : 'Get Mobile App'}</span>
      </button>

      {/* Guide Modal for iOS & Android without prompt */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-rose-100 text-left">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-rose-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-800 to-pink-700 flex items-center justify-center shadow-md">
                <span className="font-serif text-white text-xl font-bold">Q</span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Quevo Flowers &amp; Decor</h3>
                <p className="text-xs text-rose-700 font-medium">Install on your Phone / Tablet</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-600 mb-6 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-200 text-xs font-bold text-rose-800">1</span>
                <p className="text-xs">
                  Tap the <strong className="text-slate-800">Share</strong> icon (on iOS Safari) or the <strong className="text-slate-800">three dots menu ⋮</strong> (on Chrome/Android).
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-200 text-xs font-bold text-rose-800">2</span>
                <p className="text-xs">
                  Scroll down and tap <strong className="text-slate-800">"Add to Home Screen"</strong> or <strong className="text-slate-800">"Install App"</strong>.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-200 text-xs font-bold text-rose-800">3</span>
                <p className="text-xs">
                  Launch Quevo Flowers instantly from your home screen anytime with offline support!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full rounded-xl bg-gradient-to-r from-rose-700 to-pink-700 py-2.5 text-sm font-semibold text-white shadow-md hover:from-rose-800 hover:to-pink-800 transition-all"
            >
              Got it, thank you!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
