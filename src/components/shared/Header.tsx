"use client";

import React, { useEffect } from "react";
import { Sparkles, ShieldCheck, Plus, Sun, Moon } from "lucide-react";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Floating Glass Navigation Bar
 * Features:
 * - Floating rounded-full pill bar (inspired by thebudgeting.app)
 * - Light / Dark Mode Toggle with smooth spring rotation
 * - Live offline status badge
 * - Tactile quick add button
 */
export function Header(): JSX.Element {
  const { openAddForm, debts, theme, toggleTheme } = useDebtStore();

  // Ensure DOM class is synchronized on client mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <header className="sticky top-3.5 z-40 w-full px-3.5 sm:px-4 pointer-events-none">
      <nav
        aria-label="Navigasi Utama"
        className="max-w-4xl mx-auto apple-glass rounded-full px-4 sm:px-6 h-14 sm:h-15 flex items-center justify-between gap-3 shadow-2xl backdrop-blur-2xl border border-white/[0.09] pointer-events-auto transition-all"
      >
        {/* Brand Logo & Live Status */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="relative w-8 h-8 rounded-full bg-pelunas-500/20 border border-pelunas-500/40 flex items-center justify-center text-pelunas-400 shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-pelunas-400" aria-hidden="true" />
            <div className="absolute inset-0 rounded-full bg-pelunas-400/20 blur-sm pointer-events-none" />
          </motion.div>

          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-foreground font-sans">
              Pelunas
            </span>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-subtle border border-surface-border text-[11px] text-muted-foreground font-medium">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>100% Offline • Bebas Iklan</span>
            </div>
          </div>
        </div>

        {/* Right Action Items: Active count + Theme Toggle + Quick Add */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {debts.length > 0 && (
            <span className="hidden xs:inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground px-3 py-1 rounded-full bg-surface-subtle border border-surface-border">
              <span>{debts.length} Cicilan</span>
            </span>
          )}

          <div className="hidden md:flex items-center gap-1 text-[11px] text-muted-foreground px-2.5 py-1 rounded-full bg-surface-subtle border border-surface-border">
            <ShieldCheck className="w-3.5 h-3.5 text-pelunas-400" aria-hidden="true" />
            <span>Privat</span>
          </div>

          {/* Smooth Light / Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
            title={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
            className="apple-pressable w-9 h-9 rounded-full bg-surface-subtle hover:bg-surface-subtle/80 text-foreground border border-surface-border flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-pelunas-400 touch-target overflow-hidden relative"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ y: -16, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 16, opacity: 0, rotate: 45 }}
                transition={{ type: "spring", damping: 20, stiffness: 350 }}
                className="flex items-center justify-center"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" aria-hidden="true" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Add Button */}
          <button
            type="button"
            onClick={openAddForm}
            className="apple-pressable inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-pelunas-500 hover:bg-pelunas-400 text-pelunas-950 text-xs font-bold shadow-lg shadow-pelunas-500/25 transition-all touch-target"
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Tambah</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
