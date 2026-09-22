"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import { calculatePayoffStrategy } from "@/lib/calculations/payoffEngine";
import { Debt, StrategyType } from "@/types/debt";
import { Sparkles, ArrowRight, Zap, TrendingDown, Clock } from "lucide-react";
import Link from "next/link";

const SAMPLE_PREVIEW_DEBTS: Debt[] = [
  {
    id: "demo-1",
    name: "Spaylater (Paylater)",
    balance: 1800000,
    interestRatePerMonth: 2.95,
    minimumPayment: 350000,
    dueDay: 25,
    category: "paylater",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "demo-2",
    name: "Kartu Kredit Bank",
    balance: 5200000,
    interestRatePerMonth: 1.75,
    minimumPayment: 400000,
    dueDay: 10,
    category: "kartu_kredit",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "demo-3",
    name: "Pinjaman Kredivo",
    balance: 2600000,
    interestRatePerMonth: 2.6,
    minimumPayment: 380000,
    dueDay: 5,
    category: "pinjol",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

export function InteractiveDemoPreview(): JSX.Element {
  const [strategy, setStrategy] = useState<StrategyType>("snowball");
  const [extraBudget, setExtraBudget] = useState<number>(200000);

  const plan = useMemo(() => {
    return calculatePayoffStrategy(SAMPLE_PREVIEW_DEBTS, strategy, extraBudget);
  }, [strategy, extraBudget]);

  const baselinePlan = useMemo(() => {
    return calculatePayoffStrategy(SAMPLE_PREVIEW_DEBTS, strategy, 0);
  }, [strategy]);

  const monthsSaved = Math.max(0, baselinePlan.totalMonths - plan.totalMonths);
  const interestSaved = Math.max(0, baselinePlan.totalInterestPaid - plan.totalInterestPaid);

  return (
    <section id="preview" className="space-y-4 pt-6 scroll-mt-24" aria-labelledby="preview-heading">
      <div className="space-y-1 text-left">
        <h2
          id="preview-heading"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground heading-display"
        >
          Coba Simulasi Pelunasan
        </h2>
        <p className="text-xs sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Geser alokasi dana ekstra di bawah dan lihat proyeksi waktu serta bunga yang dapat kamu hemat.
        </p>
      </div>

      <div className="apple-card p-5 sm:p-7 rounded-3xl border border-surface-border shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pelunas-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-5">
            {/* Strategy Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">
                Pilih Pendekatan Strategi:
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-surface-subtle border border-surface-border">
                <button
                  type="button"
                  onClick={() => setStrategy("snowball")}
                  className={`apple-pressable py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    strategy === "snowball"
                      ? "bg-pelunas-500 text-pelunas-950 shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Bola Salju (Snowball)
                </button>
                <button
                  type="button"
                  onClick={() => setStrategy("avalanche")}
                  className={`apple-pressable py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    strategy === "avalanche"
                      ? "bg-pelunas-500 text-pelunas-950 shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Longsoran (Avalanche)
                </button>
              </div>
            </div>

            {/* Extra Budget Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Simulasi Dana Ekstra Bulanan:</span>
                <span className="font-extrabold text-pelunas-400 text-sm finance-amount">
                  {formatRupiah(extraBudget)} / bln
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1000000"
                step="50000"
                value={extraBudget}
                onChange={(e) => setExtraBudget(Number(e.target.value))}
                aria-label="Simulasi dana ekstra bulanan"
                className="w-full accent-pelunas-400 h-2 bg-surface-subtle rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>Rp 0</span>
                <span>Rp 500.000</span>
                <span>Rp 1.000.000</span>
              </div>
            </div>

            {/* Sample debts mini display */}
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-muted-foreground block mb-2">
                Skenario 3 Cicilan Contoh:
              </span>
              <div className="space-y-1.5">
                {SAMPLE_PREVIEW_DEBTS.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-surface-subtle/60 border border-surface-border text-xs"
                  >
                    <span className="text-foreground font-medium">{d.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-[11px]">
                        {d.interestRatePerMonth}%/bln
                      </span>
                      <span className="font-bold text-foreground finance-amount">
                        {formatRupiah(d.balance)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 flex flex-col justify-between p-5 rounded-2xl bg-surface-subtle/80 border border-surface-border">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Hasil Proyeksi Real-time
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {strategy === "snowball" ? "Motivasi Tercepat" : "Bunga Terendah"}
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-card border border-surface-border space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-pelunas-400" aria-hidden="true" />
                    <span>Perkiraan Waktu Bebas Utang:</span>
                  </div>
                  <div className="text-2xl font-black text-foreground">
                    {plan.totalMonths} Bulan{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      ({plan.payoffDateLabel})
                    </span>
                  </div>
                  {monthsSaved > 0 && (
                    <p className="text-xs font-bold text-emerald-400 flex items-center gap-1 pt-1">
                      <Sparkles className="w-3 h-3" aria-hidden="true" />
                      Lebih cepat {monthsSaved} bulan berkat dana ekstra!
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-card border border-surface-border space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <TrendingDown className="w-3.5 h-3.5 text-pelunas-400" aria-hidden="true" />
                    <span>Total Bunga yang Dikeluarkan:</span>
                  </div>
                  <div className="text-xl font-bold finance-amount text-foreground">
                    {formatRupiah(plan.totalInterestPaid)}
                  </div>
                  {interestSaved > 0 && (
                    <p className="text-xs font-bold text-emerald-400 flex items-center gap-1 pt-1">
                      <Sparkles className="w-3 h-3" aria-hidden="true" />
                      Hemat {formatRupiah(interestSaved)} dari bunga sia-sia!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* CTA directly to workspace */}
            <div className="pt-5 mt-4 border-t border-surface-border">
              <Link
                href="/app"
                className="apple-pressable w-full py-3 px-4 rounded-2xl bg-pelunas-500 hover:bg-pelunas-400 text-pelunas-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pelunas-500/25 transition-all touch-target"
              >
                <span>Hitung Cicilanmu Sekarang</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <p className="text-[11px] text-center text-muted-foreground mt-2">
                Gratis • Tanpa Perlu Daftar Akun • Data 100% di HP-mu
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
