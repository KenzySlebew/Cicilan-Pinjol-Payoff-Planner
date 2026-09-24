"use client";

import React, { useMemo } from "react";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { getDaysUntilDue } from "@/lib/utils/dateUtils";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import { exportDebtsToCalendar } from "@/lib/utils/calendarExport";
import { Calendar, Download, AlertCircle, Clock, ChevronRight, CheckCircle2 } from "lucide-react";

interface UpcomingDueWidgetProps {
  onViewAllClick: () => void;
}

export function UpcomingDueWidget({ onViewAllClick }: UpcomingDueWidgetProps): JSX.Element | null {
  const { debts } = useDebtStore();

  const dueItems = useMemo(() => {
    return debts
      .map((debt) => ({
        ...debt,
        daysUntil: getDaysUntilDue(debt.dueDay),
      }))
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [debts]);

  if (debts.length === 0) return null;

  const nextUrgentDebt = dueItems[0];
  const urgentCount = dueItems.filter((d) => d.daysUntil <= 3).length;

  return (
    <div className="apple-card p-5 rounded-3xl border border-surface-border shadow-lg space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-pelunas-500/15 border border-pelunas-500/30 flex items-center justify-center text-pelunas-400">
            <Calendar className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-foreground">
              Jatuh Tempo Terdekat
            </h3>
            <span className="text-[10px] text-muted-foreground">In-app & Kalender HP</span>
          </div>
        </div>

        {urgentCount > 0 ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse">
            {urgentCount} Mendesak
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Aman
          </span>
        )}
      </div>

      {/* Target nearest debt card */}
      {nextUrgentDebt && (
        <div className="p-3.5 rounded-2xl bg-surface-subtle border border-surface-border space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-foreground truncate max-w-[140px]">
              {nextUrgentDebt.name}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                nextUrgentDebt.daysUntil === 0
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse"
                  : nextUrgentDebt.daysUntil <= 3
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "bg-surface-subtle text-muted-foreground border border-surface-border"
              }`}
            >
              {nextUrgentDebt.daysUntil === 0
                ? "Hari Ini!"
                : `H-${nextUrgentDebt.daysUntil} (${nextUrgentDebt.daysUntil} hari)`}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] text-muted-foreground">
              Tgl {nextUrgentDebt.dueDay} setiap bulan
            </span>
            <span className="font-bold text-pelunas-400 finance-amount">
              {formatRupiah(nextUrgentDebt.minimumPayment)}
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-surface-border/60 text-xs">
        <button
          type="button"
          onClick={() => exportDebtsToCalendar(debts)}
          className="apple-pressable inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors touch-target"
          title="Ekspor file .ics ke Google Calendar / Apple Calendar"
        >
          <Download className="w-3.5 h-3.5 text-pelunas-400" aria-hidden="true" />
          <span>Ekspor .ics</span>
        </button>

        <button
          type="button"
          onClick={onViewAllClick}
          className="apple-pressable inline-flex items-center gap-1 text-[11px] font-bold text-pelunas-400 hover:text-pelunas-300 transition-colors touch-target"
        >
          <span>Lihat Semua ({dueItems.length})</span>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
