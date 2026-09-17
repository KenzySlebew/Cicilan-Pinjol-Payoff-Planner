"use client";

import React from "react";
import { motion } from "framer-motion";
import { Debt, DebtCategory } from "@/types/debt";
import { formatRupiah, formatPersen } from "@/lib/utils/formatRupiah";
import { getDaysUntilDue } from "@/lib/utils/dateUtils";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { ProgressRing } from "@/components/progress/ProgressRing";
import {
  ShoppingBag,
  CreditCard,
  Smartphone,
  Home,
  CircleDollarSign,
  Calendar,
  Percent,
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface DebtCardProps {
  debt: Debt;
}

const CATEGORY_STYLES: Record<
  DebtCategory,
  {
    label: string;
    icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
    badgeBg: string;
    badgeText: string;
    border: string;
    glow: string;
  }
> = {
  paylater: {
    label: "PayLater",
    icon: ShoppingBag,
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-300",
    border: "border-amber-500/30",
    glow: "group-hover:border-amber-500/40",
  },
  kartu_kredit: {
    label: "Kartu Kredit",
    icon: CreditCard,
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-300",
    border: "border-violet-500/30",
    glow: "group-hover:border-violet-500/40",
  },
  pinjol: {
    label: "Pinjaman Online",
    icon: Smartphone,
    badgeBg: "bg-rose-500/10",
    badgeText: "text-rose-300",
    border: "border-rose-500/30",
    glow: "group-hover:border-rose-500/40",
  },
  kpr_kendaraan: {
    label: "KPR / Kendaraan",
    icon: Home,
    badgeBg: "bg-sky-500/10",
    badgeText: "text-sky-300",
    border: "border-sky-500/30",
    glow: "group-hover:border-sky-500/40",
  },
  lainnya: {
    label: "Lainnya",
    icon: CircleDollarSign,
    badgeBg: "bg-teal-500/10",
    badgeText: "text-teal-300",
    border: "border-teal-500/30",
    glow: "group-hover:border-teal-500/40",
  },
};

export function DebtCard({ debt }: DebtCardProps): JSX.Element {
  const { openEditForm, openDeleteDialog, markAsPaid } = useDebtStore();

  const catConfig = CATEGORY_STYLES[debt.category] || CATEGORY_STYLES.lainnya;
  const CategoryIcon = catConfig.icon;

  const daysUntilDue = getDaysUntilDue(debt.dueDay);

  // Estimasi rasio kecepatan cicilan per bulan terhadap saldo
  const monthlyPayoffRatio = Math.min(
    100,
    Math.max(1, Math.round((debt.minimumPayment / debt.balance) * 100))
  );

  const getDueBadge = () => {
    if (daysUntilDue === 0) {
      return (
        <span
          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse"
          role="status"
          aria-label="Jatuh tempo hari ini"
        >
          <Clock className="w-3 h-3" aria-hidden="true" />
          Jatuh Tempo Hari Ini
        </span>
      );
    }
    if (daysUntilDue > 0 && daysUntilDue <= 3) {
      return (
        <span
          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40"
          role="status"
          aria-label={`Jatuh tempo dalam ${daysUntilDue} hari`}
        >
          <Clock className="w-3 h-3" aria-hidden="true" />
          H-{daysUntilDue} ({daysUntilDue} hari lagi)
        </span>
      );
    }
    return (
      <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
        <Clock className="w-3 h-3" aria-hidden="true" />
        {daysUntilDue} hari lagi
      </span>
    );
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: "spring", damping: 26, stiffness: 320 }}
      whileHover={{ y: -3 }}
      className={`group relative apple-card p-5 sm:p-6 rounded-3xl transition-all duration-200 ${catConfig.glow} hover:shadow-xl hover:shadow-pelunas-500/5`}
    >
      {/* Top row: Category, Name, Due date, Progress Ring, and Actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-11 h-11 rounded-2xl ${catConfig.badgeBg} ${catConfig.border} border flex items-center justify-center ${catConfig.badgeText} shadow-sm shrink-0`}
          >
            <CategoryIcon className="w-5 h-5" aria-hidden="true" />
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-base sm:text-lg text-foreground tracking-tight truncate">
                {debt.name}
              </h3>
              <span
                className={`text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full ${catConfig.badgeBg} ${catConfig.badgeText} border ${catConfig.border}`}
              >
                {catConfig.label}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                Jatuh tempo tiap tgl {debt.dueDay}
              </span>
              <span className="text-border" aria-hidden="true">•</span>
              {getDueBadge()}
            </div>
          </div>
        </div>

        {/* Right Action Icons + Progress Ring (Fase 3) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Progress Ring visual status */}
          <div className="hidden xs:flex items-center gap-1.5 pr-1" title={`${monthlyPayoffRatio}% cicilan per bulan terhadap sisa saldo`}>
            <ProgressRing
              percentage={monthlyPayoffRatio}
              size={36}
              strokeWidth={3}
              label={`Rasio cicilan ${debt.name}`}
            />
          </div>

          {/* Tandai Lunas (Celebration trigger) */}
          <button
            type="button"
            onClick={() => markAsPaid(debt.id)}
            aria-label={`Tandai cicilan ${debt.name} sudah lunas`}
            title="Tandai cicilan ini lunas!"
            className="apple-pressable touch-target rounded-xl text-muted-foreground hover:text-pelunas-400 hover:bg-pelunas-500/15 transition-colors focus-visible:ring-2 focus-visible:ring-pelunas-400"
          >
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => openEditForm(debt)}
            aria-label={`Ubah rincian cicilan ${debt.name}`}
            className="apple-pressable touch-target rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors focus-visible:ring-2 focus-visible:ring-pelunas-400"
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => openDeleteDialog(debt)}
            aria-label={`Hapus cicilan ${debt.name} dari rencana`}
            className="apple-pressable touch-target rounded-xl text-muted-foreground hover:text-red-400 hover:bg-red-500/15 transition-colors focus-visible:ring-2 focus-visible:ring-red-400"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Financial Metrics Grid - Tabular & High Contrast */}
      <div className="grid grid-cols-3 gap-3 pt-4 mt-4 border-t border-border/50">
        <div className="space-y-0.5">
          <span className="text-xs text-muted-foreground block font-medium">
            Sisa Pokok Utang
          </span>
          <span className="text-base sm:text-xl font-extrabold finance-amount text-foreground block truncate">
            {formatRupiah(debt.balance)}
          </span>
        </div>

        <div className="space-y-0.5">
          <span className="text-xs text-muted-foreground block font-medium">
            Cicilan Wajib / Bln
          </span>
          <span className="text-base sm:text-xl font-extrabold finance-amount text-foreground block truncate">
            {formatRupiah(debt.minimumPayment)}
          </span>
        </div>

        <div className="space-y-0.5">
          <span className="text-xs text-muted-foreground block font-medium">
            Bunga per Bulan
          </span>
          <span className="text-base sm:text-xl font-extrabold finance-amount text-pelunas-400 flex items-center gap-0.5 truncate">
            <Percent className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {formatPersen(debt.interestRatePerMonth)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
