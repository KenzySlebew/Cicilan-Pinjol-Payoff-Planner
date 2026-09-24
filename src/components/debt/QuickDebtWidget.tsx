"use client";

import React from "react";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import { CreditCard, Plus, ChevronRight, Sparkles } from "lucide-react";

interface QuickDebtWidgetProps {
  onManageClick: () => void;
}

export function QuickDebtWidget({ onManageClick }: QuickDebtWidgetProps): JSX.Element | null {
  const { debts, openAddForm } = useDebtStore();

  if (debts.length === 0) return null;

  const topDebts = debts.slice(0, 3);

  return (
    <div className="apple-card p-5 rounded-3xl border border-surface-border shadow-lg space-y-3.5 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <CreditCard className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-foreground">
              Daftar Cicilan ({debts.length})
            </h3>
            <span className="text-[10px] text-muted-foreground">Akses Cepat</span>
          </div>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="apple-pressable inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-pelunas-500 text-pelunas-950 font-bold text-[11px] hover:bg-pelunas-400 transition-colors shadow-sm touch-target"
        >
          <Plus className="w-3 h-3" aria-hidden="true" />
          <span>Tambah</span>
        </button>
      </div>

      <div className="space-y-2">
        {topDebts.map((debt) => (
          <div
            key={debt.id}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-surface-subtle/80 border border-surface-border text-xs"
          >
            <div className="truncate pr-2">
              <span className="font-bold text-foreground block truncate">
                {debt.name}
              </span>
              <span className="text-[10px] text-muted-foreground">
                Cicilan: {formatRupiah(debt.minimumPayment)}/bln
              </span>
            </div>
            <div className="text-right shrink-0">
              <span className="font-bold text-foreground finance-amount block">
                {formatRupiah(debt.balance)}
              </span>
              <span className="text-[10px] text-pelunas-400 font-medium">
                {debt.interestRatePerMonth}%/bln
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onManageClick}
        className="apple-pressable w-full py-2.5 rounded-2xl bg-surface-subtle hover:bg-surface-subtle/80 text-foreground font-bold text-xs border border-surface-border flex items-center justify-center gap-1.5 transition-colors touch-target"
      >
        <span>Kelola & Lihat Rincian Semua Cicilan</span>
        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
      </button>
    </div>
  );
}
