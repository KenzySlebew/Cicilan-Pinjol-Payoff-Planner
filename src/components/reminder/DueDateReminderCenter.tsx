"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { getDaysUntilDue } from "@/lib/utils/dateUtils";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import { exportDebtsToCalendar } from "@/lib/utils/calendarExport";
import {
  Calendar,
  Download,
  ShieldCheck,
  AlertCircle,
  Clock,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export function DueDateReminderCenter(): JSX.Element | null {
  const { debts } = useDebtStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasExported, setHasExported] = useState(false);

  const dueItems = useMemo(() => {
    return debts
      .map((debt) => {
        const daysUntil = getDaysUntilDue(debt.dueDay);
        return {
          ...debt,
          daysUntil,
        };
      })
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [debts]);

  if (debts.length === 0) return null;

  const urgentCount = dueItems.filter((d) => d.daysUntil <= 3).length;
  const nextUrgentDebt = dueItems[0];

  const handleExport = () => {
    exportDebtsToCalendar(debts);
    setHasExported(true);
    setTimeout(() => setHasExported(false), 3500);
  };

  return (
    <section
      aria-label="Pusat Pengingat Jatuh Tempo"
      className="apple-card rounded-3xl p-5 sm:p-6 border border-surface-border relative overflow-hidden transition-all shadow-lg"
    >
      {/* Background soft glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-pelunas-500/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-pelunas-500/15 border border-pelunas-500/30 flex items-center justify-center text-pelunas-400 shrink-0 mt-0.5 shadow-inner">
            <Calendar className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                Pusat Pengingat Jatuh Tempo
              </h2>
              {urgentCount > 0 ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse">
                  <AlertCircle className="w-3 h-3" aria-hidden="true" />
                  {urgentCount} Segera Jatuh Tempo
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                  Jadwal Aman
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-relaxed">
              <strong className="text-foreground font-semibold">100% In-App & Privat:</strong> Kami tidak meminta alamat email atau nomor HP Anda. Pengingat berjalan langsung di aplikasi ini atau bisa Anda sinkronkan ke kalender bawaan HP.
            </p>
          </div>
        </div>

        {/* Action Button: Calendar Export (.ics) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleExport}
            className="apple-pressable inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface-subtle hover:bg-surface-subtle/80 text-foreground text-xs font-bold border border-surface-border shadow-sm transition-all touch-target"
            title="Ekspor jadwal jatuh tempo ke kalender HP (Google Calendar, Apple Calendar, Outlook)"
          >
            {hasExported ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span className="text-emerald-400">Tersimpan ke .ics!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-pelunas-400" aria-hidden="true" />
                <span>Ekspor ke Kalender HP (.ics)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Status Highlight Bar */}
      {nextUrgentDebt && (
        <div className="mt-4 pt-4 border-t border-surface-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
            <span className="text-muted-foreground">Jatuh tempo terdekat:</span>
            <span className="font-bold text-foreground">
              {nextUrgentDebt.name} (Tgl {nextUrgentDebt.dueDay})
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                nextUrgentDebt.daysUntil === 0
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  : nextUrgentDebt.daysUntil <= 3
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "bg-surface-subtle text-muted-foreground border border-surface-border"
              }`}
            >
              {nextUrgentDebt.daysUntil === 0
                ? "Hari Ini"
                : `${nextUrgentDebt.daysUntil} hari lagi`}
            </span>
            <span className="font-semibold text-pelunas-300 finance-amount">
              {formatRupiah(nextUrgentDebt.minimumPayment)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="apple-pressable inline-flex items-center gap-1 text-xs font-semibold text-pelunas-400 hover:text-pelunas-300 transition-colors self-start sm:self-auto touch-target"
          >
            <span>{isExpanded ? "Tutup Rincian" : `Lihat Semua Jadwal (${dueItems.length})`}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      )}

      {/* Expanded Grid of All Due Dates */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mt-4 pt-4 border-t border-surface-border/50 overflow-hidden relative z-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {dueItems.map((item) => {
                const isUrgent = item.daysUntil <= 3;
                const isToday = item.daysUntil === 0;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isToday
                        ? "bg-rose-500/10 border-rose-500/30"
                        : isUrgent
                        ? "bg-amber-500/10 border-amber-500/30"
                        : "bg-surface-subtle/50 border-surface-border"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-xs text-foreground truncate">
                        {item.name}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isToday
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse"
                            : isUrgent
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            : "bg-surface-subtle text-muted-foreground border border-surface-border"
                        }`}
                      >
                        {isToday ? "Hari Ini" : `${item.daysUntil} hari lagi`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                      <span>Tgl {item.dueDay} setiap bulan</span>
                      <span className="font-bold text-foreground finance-amount">
                        {formatRupiah(item.minimumPayment)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3.5 space-y-2 pt-2 border-t border-surface-border/40 text-[11px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-pelunas-400" aria-hidden="true" />
                  Privasi terjamin: Jadwal tersimpan lokal di browser & kalender pribadi Anda.
                </span>
                <span className="flex items-center gap-1 text-pelunas-400 font-medium">
                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                  Bebas Denda Keterlambatan
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-pelunas-500/10 border border-pelunas-500/20 text-foreground flex items-center gap-2 text-[11px]">
                <span>💡</span>
                <span>
                  <strong>Cara pakai Kalender:</strong> Setelah klik &ldquo;Ekspor ke Kalender HP (.ics)&rdquo;, buka file tersebut di HP kamu. Google Calendar (Android) atau Apple Calendar (iPhone) akan langsung menambahkan alarm rutin tiap tanggal jatuh tempo!
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
