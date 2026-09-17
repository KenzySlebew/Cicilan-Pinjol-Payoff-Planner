"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { calculatePayoffStrategy } from "@/lib/calculations/payoffEngine";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import { CustomChartTooltip } from "./CustomChartTooltip";
import { Calendar, TrendingDown, Clock, Sparkles } from "lucide-react";

export function PayoffTimeline(): JSX.Element {
  const { debts, selectedStrategy, extraMonthlyBudget } = useDebtStore();

  const plan = useMemo(() => {
    return calculatePayoffStrategy(debts, selectedStrategy, extraMonthlyBudget);
  }, [debts, selectedStrategy, extraMonthlyBudget]);

  const chartData = useMemo(() => {
    if (!plan || debts.length === 0) return [];

    const initialTotalDebt = debts.reduce((sum, d) => sum + d.balance, 0);

    // Titik awal (Bulan 0 - sekarang)
    const initialPoint = {
      monthIndex: 0,
      shortDate: "Sekarang",
      dateLabel: "Posisi Saat Ini",
      totalRemainingBalance: initialTotalDebt,
      totalPaymentThisMonth: 0,
      totalInterestThisMonth: 0,
      debtsPaidOffThisMonth: [] as string[],
    };

    const points = plan.monthlySchedule.map((step) => {
      // Singkatkan label sumbu X agar rapi di layar ponsel
      const parts = step.dateLabel.split(" ");
      const monthShort = parts[0]?.substring(0, 3) || "";
      const yearShort = parts[1]?.substring(2) || "";
      const shortDate = `${monthShort}'${yearShort}`;

      return {
        monthIndex: step.monthIndex,
        shortDate,
        dateLabel: step.dateLabel,
        totalRemainingBalance: Math.max(0, Math.round(step.totalRemainingBalance)),
        totalPaymentThisMonth: Math.round(step.totalPaymentThisMonth),
        totalInterestThisMonth: Math.round(step.totalInterestThisMonth),
        debtsPaidOffThisMonth: step.debtsPaidOffThisMonth,
      };
    });

    return [initialPoint, ...points];
  }, [plan, debts]);

  if (debts.length === 0) return <></>;

  return (
    <section className="space-y-4" aria-labelledby="timeline-heading">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2
              id="timeline-heading"
              className="text-lg sm:text-xl font-bold tracking-tight text-foreground"
            >
              Kurva Timeline Bebas Utang
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pelunas-500/15 text-pelunas-300 border border-pelunas-500/30">
              Proyeksi {plan.totalMonths} Bulan
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Grafik proyeksi penurunan saldo pinjaman dari waktu ke waktu
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground self-start sm:self-auto">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-pelunas-500" aria-hidden="true" />
          <span>Saldo Pokok (Rp)</span>
        </div>
      </div>

      {/* Chart Surface - Apple Card Elevation */}
      <div className="apple-card p-4 sm:p-6 rounded-3xl space-y-5 overflow-hidden">
        {/* Metric Header Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-4 border-b border-border/50 text-xs">
          <div>
            <span className="text-muted-foreground block">Posisi Mulai</span>
            <span className="text-sm sm:text-base font-extrabold finance-amount text-foreground block">
              {formatRupiah(plan.totalPrincipal)}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block">Total Bunga Berjalan</span>
            <span className="text-sm sm:text-base font-extrabold finance-amount text-amber-300 block">
              {formatRupiah(plan.totalInterestPaid)}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block">Target Tanggal Lunas</span>
            <span className="text-sm sm:text-base font-extrabold text-pelunas-300 block">
              {plan.payoffDateLabel}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block">Total Durasi</span>
            <span className="text-sm sm:text-base font-extrabold text-foreground block">
              {plan.totalMonths} Bulan
            </span>
          </div>
        </div>

        {/* Recharts Area Chart Container */}
        <div className="w-full h-[260px] sm:h-[300px] pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="emeraldAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="60%" stopColor="#10b981" stopOpacity={0.08} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(128, 128, 128, 0.15)"
                vertical={false}
              />

              <XAxis
                dataKey="shortDate"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                dy={8}
              />

              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => formatRupiah(value, { compact: true })}
                width={65}
                dx={-4}
              />

              <Tooltip content={<CustomChartTooltip />} />

              <Area
                type="monotone"
                dataKey="totalRemainingBalance"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#emeraldAreaGradient)"
                activeDot={{
                  r: 6,
                  fill: "#10b981",
                  stroke: "hsl(var(--card))",
                  strokeWidth: 2.5,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Legend & Insight */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-border/40 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pelunas-400 shrink-0" aria-hidden="true" />
            <span>
              Sentuh atau arahkan kursor ke grafik untuk melihat rincian pembayaran pada bulan terkait.
            </span>
          </div>
          <span className="font-semibold text-foreground">
            Metode: {selectedStrategy === "snowball" ? "Snowball (Saldo)" : "Avalanche (Bunga)"}
          </span>
        </div>
      </div>
    </section>
  );
}
