"use client";

import React from "react";
import { motion } from "framer-motion";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { StrategyType } from "@/types/debt";
import { Zap, TrendingDown, Sparkles } from "lucide-react";

export function StrategySelector(): JSX.Element {
  const { selectedStrategy, setStrategy, debts } = useDebtStore();

  if (debts.length === 0) return <></>;

  return (
    <section className="space-y-3" aria-labelledby="strategy-selector-heading">
      <div className="flex items-center justify-between">
        <div>
          <h2
            id="strategy-selector-heading"
            className="text-lg sm:text-xl font-bold tracking-tight text-foreground"
          >
            Pilih Metode Pelunasan
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Bandingkan efisiensi matematika dan kenyamanan mental
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-pelunas-500/10 text-pelunas-300 border border-pelunas-500/30">
          <Sparkles className="w-3.5 h-3.5 text-pelunas-400" aria-hidden="true" />
          Kalkulasi Real-time
        </span>
      </div>

      {/* Pill Toggle with Sliding Spring Animation (Apple Style) */}
      <div
        role="tablist"
        aria-label="Pilihan Strategi Pelunasan"
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 rounded-2xl bg-surface-subtle border border-surface-border"
      >
        {/* Snowball Tab */}
        <button
          type="button"
          role="tab"
          aria-selected={selectedStrategy === "snowball"}
          onClick={() => setStrategy("snowball")}
          className={`relative apple-pressable p-3.5 sm:p-4 rounded-xl text-left transition-colors min-h-[56px] focus-visible:ring-2 focus-visible:ring-pelunas-400 ${
            selectedStrategy === "snowball"
              ? "text-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {selectedStrategy === "snowball" && (
            <motion.div
              layoutId="active-strategy-pill"
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="absolute inset-0 rounded-xl bg-card border border-pelunas-500/40 shadow-lg shadow-black/20"
              style={{ zIndex: 0 }}
            />
          )}

          <div className="relative z-10 flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                selectedStrategy === "snowball"
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                  : "bg-surface-subtle border-surface-border text-muted-foreground"
              }`}
            >
              <Zap className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-foreground">
                  Metode Snowball
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Kemenangan Cepat
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Prioritaskan <strong>saldo terkecil</strong> dulu untuk segera mencoret satu utang dan membangun dorongan semangat.
              </p>
            </div>
          </div>
        </button>

        {/* Avalanche Tab */}
        <button
          type="button"
          role="tab"
          aria-selected={selectedStrategy === "avalanche"}
          onClick={() => setStrategy("avalanche")}
          className={`relative apple-pressable p-3.5 sm:p-4 rounded-xl text-left transition-colors min-h-[56px] focus-visible:ring-2 focus-visible:ring-pelunas-400 ${
            selectedStrategy === "avalanche"
              ? "text-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {selectedStrategy === "avalanche" && (
            <motion.div
              layoutId="active-strategy-pill"
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="absolute inset-0 rounded-xl bg-card border border-pelunas-500/40 shadow-lg shadow-black/20"
              style={{ zIndex: 0 }}
            />
          )}

          <div className="relative z-10 flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                selectedStrategy === "avalanche"
                  ? "bg-pelunas-500/15 border-pelunas-500/30 text-pelunas-300"
                  : "bg-surface-subtle border-surface-border text-muted-foreground"
              }`}
            >
              <TrendingDown className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-foreground">
                  Metode Avalanche
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-pelunas-500/15 text-pelunas-300 border border-pelunas-500/30">
                  Paling Hemat
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Prioritaskan <strong>bunga tertinggi</strong> dulu untuk menghemat total uang yang keluar dari dompetmu.
              </p>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
