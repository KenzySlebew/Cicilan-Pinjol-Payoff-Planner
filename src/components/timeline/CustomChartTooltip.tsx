"use client";

import React from "react";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import { Trophy, Calendar } from "lucide-react";

interface CustomChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      dateLabel: string;
      totalRemainingBalance: number;
      totalPaymentThisMonth: number;
      totalInterestThisMonth: number;
      debtsPaidOffThisMonth: string[];
    };
  }>;
  label?: string;
}

export function CustomChartTooltip({
  active,
  payload,
}: CustomChartTooltipProps): JSX.Element | null {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div className="apple-card p-3.5 sm:p-4 rounded-2xl shadow-xl border border-surface-border bg-card/95 text-foreground space-y-2 min-w-[200px]">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold border-b border-border/50 pb-1.5">
        <Calendar className="w-3.5 h-3.5 text-pelunas-400" aria-hidden="true" />
        <span>{data.dateLabel}</span>
      </div>

      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Sisa Pokok:</span>
          <span className="font-extrabold finance-amount text-foreground text-sm">
            {formatRupiah(data.totalRemainingBalance)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Pembayaran:</span>
          <span className="font-bold finance-amount text-pelunas-400">
            {formatRupiah(data.totalPaymentThisMonth)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Bunga Bulan Ini:</span>
          <span className="font-medium finance-amount text-amber-300">
            {formatRupiah(data.totalInterestThisMonth)}
          </span>
        </div>
      </div>

      {data.debtsPaidOffThisMonth && data.debtsPaidOffThisMonth.length > 0 && (
        <div className="pt-2 border-t border-border/50">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-pelunas-300 bg-pelunas-500/15 px-2 py-0.5 rounded-lg border border-pelunas-500/30">
            <Trophy className="w-3 h-3 text-pelunas-400" aria-hidden="true" />
            <span>Lunas: {data.debtsPaidOffThisMonth.join(", ")}</span>
          </div>
        </div>
      )}
    </div>
  );
}
