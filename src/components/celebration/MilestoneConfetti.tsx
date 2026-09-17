"use client";

import React, { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { Sparkles, Trophy, X, PartyPopper } from "lucide-react";

export function MilestoneConfetti(): JSX.Element | null {
  const { celebratingDebtName, clearCelebration } = useDebtStore();

  const fireConfetti = useCallback(() => {
    // Cek preferensi reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Elegant emerald & gold confetti burst
    const count = 180;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#10b981", "#34d399", "#6ee7b7", "#f59e0b", "#ffffff"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  useEffect(() => {
    if (celebratingDebtName) {
      fireConfetti();
      const timer = setTimeout(() => {
        clearCelebration();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [celebratingDebtName, fireConfetti, clearCelebration]);

  return (
    <AnimatePresence>
      {celebratingDebtName && (
        <aside
          aria-live="polite"
          aria-atomic="true"
          className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="apple-card p-5 rounded-3xl border border-pelunas-500/50 bg-card/95 shadow-2xl shadow-pelunas-500/20 relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-pelunas-500/20 blur-2xl pointer-events-none" />

            <div className="flex items-start gap-3.5 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-pelunas-500/20 border border-pelunas-500/40 flex items-center justify-center text-pelunas-300 shrink-0 shadow-md">
                <Trophy className="w-6 h-6 text-pelunas-400" aria-hidden="true" />
              </div>

              <div className="space-y-1 pr-6 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-pelunas-400">
                    Satu Langkah Lebih Bebas!
                  </span>
                  <PartyPopper className="w-3.5 h-3.5 text-pelunas-400" aria-hidden="true" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-foreground tracking-tight">
                  {celebratingDebtName} Lunas!
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Selamat! Satu cicilan telah terhapus dari pundakmu. Alokasikan cicilan ini untuk melunasi prioritas berikutnya lebih cepat.
                </p>
              </div>

              <button
                type="button"
                onClick={clearCelebration}
                aria-label="Tutup notifikasi perayaan"
                className="apple-pressable p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors -mr-1 -mt-1"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </aside>
      )}
    </AnimatePresence>
  );
}
