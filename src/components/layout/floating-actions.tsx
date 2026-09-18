"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Smartphone, X, Download, Share2, CheckCircle2 } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/data";

export function FloatingActions() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running as standalone PWA
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsStandalone(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      setIsInstallModalOpen(true);
    }
  };

  return (
    <>
      {/* Floating Action Circles (Fixed Bottom-Right, Stacked Cleanly) */}
      <div className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2.5 print:hidden">
        {/* Install / Download App Circular Button */}
        {!isStandalone && (
          <button
            onClick={handleInstallClick}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0b1e36] text-white shadow-lg hover:bg-[#163b65] transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center border border-teal-400/40 group relative"
            title="Download & Install Web App"
            aria-label="Install App"
          >
            <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 group-hover:scale-110 transition-transform" />
            <span className="hidden md:group-hover:inline-block absolute right-full mr-2 px-2.5 py-1 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-lg shadow-md whitespace-nowrap pointer-events-none">
              Install App
            </span>
          </button>
        )}

        {/* WhatsApp Circular Button */}
        <a
          href={COMPANY_DETAILS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center group relative ring-4 ring-[#25D366]/20 animate-pulse hover:animate-none"
          title="Direct WhatsApp Order with Santosh Kumar"
          aria-label="Order on WhatsApp"
        >
          {/* WhatsApp SVG Icon */}
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.56 0 8.25 3.69 8.25 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.83 2.42-1.45 0-2.87-.38-4.12-1.12l-.3-.18-3.07.81.82-2.99-.19-.31a8.17 8.17 0 0 1-1.26-4.47c0-4.55 3.7-8.24 8.25-8.24m4.52 11.5c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.13.17 1.73 2.64 4.19 3.7 1.15.5 2.05.69 2.76.84.58.12 1.34.05 1.84-.03.56-.08 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z"/>
          </svg>
          <span className="hidden md:group-hover:inline-block absolute right-full mr-2 px-2.5 py-1 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-lg shadow-md whitespace-nowrap pointer-events-none">
            WhatsApp Order
          </span>
        </a>
      </div>

      {/* PWA Installation Instructions Modal */}
      {isInstallModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b1e36]/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 sm:p-6 shadow-2xl border border-slate-200 relative animate-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => setIsInstallModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#0b1e36] text-white flex items-center justify-center font-extrabold text-base shadow-sm border border-teal-500/30">
                SM
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#0b1e36] leading-tight">
                  Install Saurav Medical Agency App
                </h3>
                <p className="text-xs text-teal-700 font-semibold">
                  Fast 1-Tap Ordering & Offline Invoices
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  1
                </div>
                <p>
                  Tap the <strong className="text-slate-900">Share icon</strong> (Safari iOS) or the <strong className="text-slate-900">Three Dots Menu</strong> (Chrome Android) in your browser.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  2
                </div>
                <p>
                  Scroll down and tap <strong className="text-slate-900">&ldquo;Add to Home screen&rdquo;</strong> (होम स्क्रीन पर जोड़ें).
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  3
                </div>
                <p>
                  Access the wholesale medicine store directly from your mobile home screen anytime with instant booking!
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                onClick={() => setIsInstallModalOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0b1e36] hover:bg-[#163b65] text-white font-bold text-xs shadow-sm transition-colors text-center"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
