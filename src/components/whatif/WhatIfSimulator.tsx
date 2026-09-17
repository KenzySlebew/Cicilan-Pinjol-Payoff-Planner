"use client";

import React from "react";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { WhatIfSlider } from "./WhatIfSlider";
import { ImpactPreview } from "./ImpactPreview";
import { Calculator } from "lucide-react";

export function WhatIfSimulator(): JSX.Element {
  const { debts } = useDebtStore();

  if (debts.length === 0) return <></>;

  return (
    <section className="space-y-4" aria-labelledby="what-if-heading">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2
              id="what-if-heading"
              className="text-lg sm:text-xl font-bold tracking-tight text-foreground"
            >
              Simulasi Akselerasi (What-If)
            </h2>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pelunas-500/15 text-pelunas-300 border border-pelunas-500/30">
              Interaktif
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Uji dampak jika kamu mengalokasikan sedikit dana tambahan per bulan
          </p>
        </div>
      </div>

      <div className="apple-card p-5 sm:p-7 rounded-3xl space-y-5 border border-pelunas-500/30 bg-card/95 shadow-xl shadow-pelunas-500/5">
        {/* Slider Section */}
        <WhatIfSlider />

        {/* Real-time Impact Preview */}
        <ImpactPreview />
      </div>
    </section>
  );
}
