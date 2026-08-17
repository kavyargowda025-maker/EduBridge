import React, { useState, useEffect } from 'react';
import { Download, Smartphone, CheckCircle2, X, Share, Link as LinkIcon, Copy } from 'lucide-react';

export const InstallPwaPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setIsIOS(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowInstructionsModal(true);
    }
  };

  const handleCopyLink = () => {
    const fullUrl = window.location.href;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (isInstalled) return null;

  return (
    <>
      {/* Top Banner on Mobile / Desktop */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-4 py-3 border-b border-blue-800 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          
          <div className="flex items-center space-x-3 text-xs">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold shadow shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">Download EduBridge Mobile App</p>
              <p className="text-blue-200 text-[11px]">Install on Android / iPhone for fast access & diary updates</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={handleInstallClick}
              className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-amber-400 text-slate-900 font-extrabold text-xs shadow hover:bg-amber-300 transition-all flex items-center justify-center space-x-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Install App</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="py-2 px-3.5 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/20 transition-colors flex items-center space-x-1.5"
              title="Copy link to open in browser"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            <button
              onClick={() => setShowInstructionsModal(true)}
              className="py-2 px-3 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/20 transition-colors"
            >
              Help
            </button>
          </div>

        </div>
      </div>

      {/* Instructions Modal */}
      {showInstructionsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-slate-100 relative">
            
            <button
              onClick={() => setShowInstructionsModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl school-gradient flex items-center justify-center text-amber-300 mx-auto shadow-md">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Install EduBridge on Mobile</h3>
              <p className="text-xs text-slate-500">Add EduBridge to your mobile home screen in seconds</p>
            </div>

            {/* Android Chrome Instructions */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 space-y-2 text-xs text-blue-950">
              <p className="font-bold text-sm text-blue-900 flex items-center space-x-1.5">
                <span>🤖 Android (Google Chrome / Edge)</span>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-slate-700">
                <li>Tap the <strong>"Install App Now"</strong> button above, OR</li>
                <li>Tap the 3 dots menu (⋮) in Chrome address bar</li>
                <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></li>
              </ol>
            </div>

            {/* iOS Safari Instructions */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-2 text-xs text-amber-950">
              <p className="font-bold text-sm text-amber-900 flex items-center space-x-1.5">
                <span>🍎 iPhone / iPad (Safari)</span>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-slate-700">
                <li>Tap the <strong>Share button</strong> <Share className="w-3.5 h-3.5 inline text-blue-600" /> at bottom of Safari</li>
                <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                <li>Tap <strong>Add</strong> in top right corner</li>
              </ol>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowInstructionsModal(false)}
                className="w-full py-3 rounded-xl school-gradient text-white font-bold text-xs shadow hover:brightness-110"
              >
                Got It!
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
