"use client";

import React from "react";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { AnimatedNumber } from "./AnimatedNumber";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import { RotateCcw, Plus, Sparkles } from "lucide-react";

const MAX_BUDGET = 3000000;
const STEP = 50000;

const PRESETS = [
  { label: "+100rb", value: 100000 },
  { label: "+250rb", value: 250000 },
  { label: "+500rb", value: 500000 },
  { label: "+1jt", value: 1000000 },
  { label: "+2jt", value: 2000000 },
];

export function WhatIfSlider(): JSX.Element {
  const { extraMonthlyBudget, setExtraMonthlyBudget } = useDebtStore();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setExtraMonthlyBudget(val);
  };

  const fillPercentage = Math.min(100, Math.max(0, (extraMonthlyBudget / MAX_BUDGET) * 100));

  return (
    <div className="space-y-4">
      {/* Top Header: Label & Live Number with Animated Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-0.5">
          <label htmlFor="what-if-range" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pelunas-400" aria-hidden="true" />
            <span>Alokasi Dana Ekstra Bulanan</span>
          </label>
          <p className="text-xs text-muted-foreground">
            Geser slider untuk melihat percepatan pelunasan utang
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3.5 py-1.5 rounded-xl bg-pelunas-500/15 border border-pelunas-500/35 text-pelunas-300 flex items-center gap-1.5 shadow-sm">
            <span className="text-xs font-semibold text-muted-foreground">+</span>
            <AnimatedNumber
              value={extraMonthlyBudget}
              formatAsRupiah={true}
              className="text-base sm:text-lg font-black text-pelunas-300"
            />
            <span className="text-[11px] text-muted-foreground">/ bln</span>
          </div>

          {extraMonthlyBudget > 0 && (
            <button
              type="button"
              onClick={() => setExtraMonthlyBudget(0)}
              aria-label="Reset dana ekstra ke Rp0"
              className="apple-pressable p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors"
              title="Reset tambahan dana"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Apple-Style Slider */}
      <div className="space-y-2">
        <div className="relative flex items-center h-10 touch-target">
          <input
            id="what-if-range"
            type="range"
            min={0}
            max={MAX_BUDGET}
            step={STEP}
            value={extraMonthlyBudget}
            onChange={handleSliderChange}
            aria-label="Atur dana ekstra per bulan"
            aria-valuemin={0}
            aria-valuemax={MAX_BUDGET}
            aria-valuenow={extraMonthlyBudget}
            className="w-full h-2.5 rounded-full appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pelunas-400 bg-surface-subtle border border-surface-border"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${fillPercentage}%, rgba(255, 255, 255, 0.08) ${fillPercentage}%, rgba(255, 255, 255, 0.08) 100%)`,
            }}
          />
        </div>

        {/* Range boundary ticks */}
        <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
          <span>Rp0</span>
          <span>{formatRupiah(MAX_BUDGET / 2)}</span>
          <span>{formatRupiah(MAX_BUDGET)}</span>
        </div>
      </div>

      {/* Quick Preset Chips (Direct Tap Ergonomics) */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] text-muted-foreground font-medium block">
          Pilihan Cepat:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((preset) => {
            const isExactMatch = extraMonthlyBudget === preset.value;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => setExtraMonthlyBudget(preset.value)}
                className={`apple-pressable h-9 px-3 rounded-xl text-xs font-semibold border transition-all touch-target ${
                  isExactMatch
                    ? "bg-pelunas-500/25 border-pelunas-500/60 text-pelunas-200 shadow-sm"
                    : "bg-surface-subtle border-surface-border text-muted-foreground hover:text-foreground hover:bg-surface-subtle/80"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
