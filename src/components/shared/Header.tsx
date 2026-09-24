"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Plus, Sun, Moon, ArrowRight, ArrowLeft } from "lucide-react";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Responsive Floating Navigation Bar
 * Adapts dynamically between:
 * - Landing Page (`/`): Marketing links, value props, and "Buka Aplikasi" CTA.
 * - Application Page (`/app`): Workspace controls, active debt counter, theme toggle, and "+ Tambah".
 */
export function Header(): JSX.Element {
  const pathname = usePathname();
  const isAppPage = pathname === "/app";
  const { openAddForm, debts, theme, toggleTheme } = useDebtStore();

  // Synchronize dark class on <html>
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
        className="max-w-6xl xl:max-w-7xl mx-auto apple-glass rounded-full px-4 sm:px-6 h-14 sm:h-15 flex items-center justify-between gap-3 shadow-2xl backdrop-blur-2xl border border-white/[0.09] pointer-events-auto transition-all"
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Kembali ke Beranda Pelunas"
            className="flex items-center gap-2.5 group"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative w-8 h-8 rounded-full bg-pelunas-500/20 border border-pelunas-500/40 flex items-center justify-center text-pelunas-400 shadow-inner"
            >
              <Sparkles className="w-4 h-4 text-pelunas-400" aria-hidden="true" />
              <div className="absolute inset-0 rounded-full bg-pelunas-400/20 blur-sm pointer-events-none" />
            </motion.div>

            <span className="font-extrabold text-base sm:text-lg tracking-tight text-foreground font-sans group-hover:text-pelunas-300 transition-colors">
              Pelunas
            </span>
          </Link>

          {!isAppPage && (
            <div className="hidden lg:flex items-center gap-4 ml-4 text-xs text-muted-foreground font-medium">
              <a href="#masalah" className="hover:text-foreground transition-colors">
                Solusi
              </a>
              <a href="#cara-kerja" className="hover:text-foreground transition-colors">
                Cara Kerja
              </a>
              <a href="#pengingat" className="hover:text-foreground transition-colors">
                Pengingat
              </a>
              <a href="#faq" className="hover:text-foreground transition-colors">
                FAQ
              </a>
            </div>
          )}

          {isAppPage && (
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-full bg-surface-subtle border border-surface-border transition-colors font-medium ml-1"
            >
              <ArrowLeft className="w-3 h-3" aria-hidden="true" />
              <span>Beranda</span>
            </Link>
          )}
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {isAppPage && debts.length > 0 && (
            <span className="hidden xs:inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground px-3 py-1 rounded-full bg-surface-subtle border border-surface-border">
              <span>{debts.length} Cicilan</span>
            </span>
          )}

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

          {/* Contextual Action Button */}
          {isAppPage ? (
            <button
              type="button"
              onClick={openAddForm}
              className="apple-pressable inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-pelunas-500 hover:bg-pelunas-400 text-pelunas-950 text-xs font-bold shadow-lg shadow-pelunas-500/25 transition-all touch-target"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Tambah</span>
            </button>
          ) : (
            <Link
              href="/app"
              className="apple-pressable inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-pelunas-500 hover:bg-pelunas-400 text-pelunas-950 text-xs font-bold shadow-lg shadow-pelunas-500/25 transition-all touch-target"
            >
              <span>Buka Aplikasi</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
