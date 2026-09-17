"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { DebtCard } from "./DebtCard";
import { Plus, CreditCard, Sparkles, RotateCcw, ArrowUpDown, Filter } from "lucide-react";
import { DebtCategory } from "@/types/debt";

type SortOption = "default" | "balance_asc" | "balance_desc" | "interest_desc";

export function DebtList(): JSX.Element {
  const { debts, openAddForm, loadDummyData } = useDebtStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const filteredAndSortedDebts = useMemo(() => {
    let result = [...debts];

    if (selectedCategory !== "all") {
      result = result.filter((d) => d.category === selectedCategory);
    }

    if (sortBy === "balance_asc") {
      result.sort((a, b) => a.balance - b.balance);
    } else if (sortBy === "balance_desc") {
      result.sort((a, b) => b.balance - a.balance);
    } else if (sortBy === "interest_desc") {
      result.sort((a, b) => b.interestRatePerMonth - a.interestRatePerMonth);
    }

    return result;
  }, [debts, selectedCategory, sortBy]);

  return (
    <section className="space-y-4" aria-labelledby="debt-list-heading">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h2
              id="debt-list-heading"
              className="text-lg sm:text-xl font-bold tracking-tight text-foreground"
            >
              Daftar Cicilan Aktif
            </h2>
            <span
              className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-pelunas-500/15 text-pelunas-300 border border-pelunas-500/30"
              aria-label={`${debts.length} cicilan aktif terdaftar`}
            >
              {debts.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Kelola cicilanmu untuk memetakan simulasi pelunasan terbaik
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {debts.length === 0 && (
            <button
              type="button"
              onClick={loadDummyData}
              className="apple-pressable h-10 px-3.5 rounded-xl bg-surface-subtle text-muted-foreground hover:text-foreground border border-surface-border text-xs font-semibold inline-flex items-center gap-2 transition-colors touch-target"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Contoh Data
            </button>
          )}

          <button
            type="button"
            onClick={openAddForm}
            className="apple-pressable h-11 px-4.5 rounded-xl bg-pelunas-500 hover:bg-pelunas-400 text-pelunas-950 text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-md shadow-pelunas-500/20 transition-all touch-target"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Tambah Cicilan
          </button>
        </div>
      </div>

      {/* Filter & Sort Chips when debts > 1 */}
      {debts.length > 1 && (
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 shrink-0" role="tablist" aria-label="Filter kategori cicilan">
            {[
              { id: "all", label: "Semua" },
              { id: "paylater", label: "PayLater" },
              { id: "kartu_kredit", label: "Kartu Kredit" },
              { id: "pinjol", label: "Pinjol" },
            ].map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`apple-pressable px-3 py-1.5 rounded-full font-medium transition-all ${
                    isActive
                      ? "bg-pelunas-500/20 text-pelunas-200 border border-pelunas-500/40 shadow-sm"
                      : "bg-surface-subtle text-muted-foreground hover:text-foreground border border-surface-border"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Quick Sort Select */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
              Urutkan:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Urutkan daftar cicilan"
              className="bg-surface-subtle border border-surface-border rounded-lg px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-pelunas-400"
            >
              <option value="default" className="bg-slate-900">Terbaru</option>
              <option value="balance_asc" className="bg-slate-900">Saldo Terkecil</option>
              <option value="balance_desc" className="bg-slate-900">Saldo Terbesar</option>
              <option value="interest_desc" className="bg-slate-900">Bunga Tertinggi</option>
            </select>
          </div>
        </div>
      )}

      {/* List / Empty State with AnimatePresence */}
      {debts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          className="apple-card p-8 sm:p-12 rounded-3xl text-center space-y-4 border border-dashed border-border/80"
        >
          <div className="w-14 h-14 mx-auto rounded-2xl bg-pelunas-500/10 border border-pelunas-500/25 flex items-center justify-center text-pelunas-400 shadow-inner">
            <CreditCard className="w-7 h-7" aria-hidden="true" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Belum ada cicilan yang dicatat
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Mulai masukkan cicilan paylater, kartu kredit, atau pinjaman pribadimu. Data tersimpan sepenuhnya aman di perangkat ini tanpa login dan tanpa server pihak ketiga.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={openAddForm}
              className="apple-pressable h-11 px-5 rounded-xl bg-pelunas-500 text-pelunas-950 font-bold text-xs sm:text-sm hover:bg-pelunas-400 transition-colors shadow-md shadow-pelunas-500/20 inline-flex items-center gap-2 touch-target"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Catat Cicilan Pertama
            </button>
            <button
              type="button"
              onClick={loadDummyData}
              className="apple-pressable h-11 px-5 rounded-xl bg-surface-subtle text-foreground border border-surface-border text-xs sm:text-sm font-semibold hover:bg-surface-subtle/80 transition-colors inline-flex items-center gap-2 touch-target"
            >
              <Sparkles className="w-4 h-4 text-pelunas-400" aria-hidden="true" />
              Gunakan Contoh Data Realistis
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div layout className="grid gap-3.5">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedDebts.map((debt) => (
              <DebtCard key={debt.id} debt={debt} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
