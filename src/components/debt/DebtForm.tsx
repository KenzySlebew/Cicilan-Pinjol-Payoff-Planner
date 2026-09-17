"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { debtFormSchema, DebtFormData } from "@/lib/validations/debtSchema";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import { DebtCategory } from "@/types/debt";
import {
  ShoppingBag,
  CreditCard,
  Smartphone,
  Home,
  CircleDollarSign,
  Info,
  Check,
} from "lucide-react";

interface CategoryOption {
  id: DebtCategory;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}

const CATEGORIES: CategoryOption[] = [
  { id: "paylater", label: "PayLater", icon: ShoppingBag },
  { id: "kartu_kredit", label: "Kartu Kredit", icon: CreditCard },
  { id: "pinjol", label: "Pinjaman Online", icon: Smartphone },
  { id: "kpr_kendaraan", label: "KPR / Kendaraan", icon: Home },
  { id: "lainnya", label: "Lainnya", icon: CircleDollarSign },
];

export function DebtForm(): JSX.Element | null {
  const { isFormOpen, editingDebt, closeForm, addDebt, updateDebt } = useDebtStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DebtFormData>({
    resolver: zodResolver(debtFormSchema),
    defaultValues: {
      name: "",
      category: "paylater",
      balance: 1000000,
      interestRatePerMonth: 2.95,
      minimumPayment: 250000,
      dueDay: 10,
    },
  });

  const selectedCategory = watch("category");
  const watchBalance = watch("balance");
  const watchMinimumPayment = watch("minimumPayment");

  useEffect(() => {
    if (isFormOpen) {
      if (editingDebt) {
        reset({
          name: editingDebt.name,
          category: editingDebt.category,
          balance: editingDebt.balance,
          interestRatePerMonth: editingDebt.interestRatePerMonth,
          minimumPayment: editingDebt.minimumPayment,
          dueDay: editingDebt.dueDay,
        });
      } else {
        reset({
          name: "",
          category: "paylater",
          balance: 1000000,
          interestRatePerMonth: 2.95,
          minimumPayment: 250000,
          dueDay: 10,
        });
      }
    }
  }, [isFormOpen, editingDebt, reset]);

  const onSubmit = (data: DebtFormData) => {
    if (editingDebt) {
      updateDebt(editingDebt.id, data);
    } else {
      addDebt(data);
    }
  };

  if (!isFormOpen) return null;

  const isEditing = !!editingDebt;

  return (
    <Modal
      isOpen={isFormOpen}
      onClose={closeForm}
      title={isEditing ? "Edit Rincian Cicilan" : "Tambah Cicilan Baru"}
      description={
        isEditing
          ? "Perbarui saldo pokok, bunga, atau tanggal jatuh tempo cicilan ini secara aman."
          : "Catat cicilan paylater, kartu kredit, atau pinjaman pribadimu agar strategi pelunasan dapat dihitung dengan optimal."
      }
      maxWidthClass="max-w-xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Nama Cicilan */}
        <div className="space-y-1.5">
          <label
            htmlFor="debt-name"
            className="text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between"
          >
            <span>Nama Cicilan</span>
            <span className="text-[11px] text-muted-foreground font-normal">Wajib diisi</span>
          </label>
          <input
            id="debt-name"
            type="text"
            placeholder="Contoh: Shopee PayLater, Kredivo, KK BCA"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "error-name" : undefined}
            {...register("name")}
            className="w-full h-11 px-3.5 rounded-xl text-base sm:text-sm bg-surface-subtle border border-surface-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pelunas-400/60 transition-all"
          />
          {errors.name && (
            <p id="error-name" role="alert" className="text-xs text-rose-400 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Pilihan Kategori Berikon (Accessible RadioGroup) */}
        <div className="space-y-1.5">
          <span id="category-label" className="text-xs sm:text-sm font-semibold text-foreground block">
            Kategori Pinjaman
          </span>
          <div
            role="radiogroup"
            aria-labelledby="category-label"
            className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          >
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setValue("category", cat.id, { shouldValidate: true })}
                  className={`apple-pressable flex items-center justify-between p-3 rounded-xl text-xs font-semibold border text-left transition-all min-h-[44px] ${
                    isSelected
                      ? "bg-pelunas-500/20 border-pelunas-500/60 text-pelunas-200 shadow-md shadow-pelunas-500/10"
                      : "bg-surface-subtle border-surface-border text-muted-foreground hover:text-foreground hover:bg-surface-subtle/80"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? "text-pelunas-400" : "text-muted-foreground"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="truncate">{cat.label}</span>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-pelunas-400 shrink-0 ml-1" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
          {errors.category && (
            <p role="alert" className="text-xs text-rose-400 font-medium">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Saldo Pokok & Cicilan Minimal (Grid 2 Kolom) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Saldo Pokok */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label htmlFor="debt-balance" className="font-semibold text-foreground">
                Sisa Pokok Utang
              </label>
              <span className="text-xs font-bold text-pelunas-400 finance-amount">
                {formatRupiah(Number(watchBalance) || 0)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium pointer-events-none" aria-hidden="true">
                Rp
              </span>
              <input
                id="debt-balance"
                type="number"
                step="1000"
                placeholder="1000000"
                aria-invalid={!!errors.balance}
                aria-describedby={errors.balance ? "error-balance" : undefined}
                {...register("balance", { valueAsNumber: true })}
                className="w-full h-11 pl-10 pr-3.5 rounded-xl text-base sm:text-sm font-mono bg-surface-subtle border border-surface-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pelunas-400/60 transition-all"
              />
            </div>
            {errors.balance && (
              <p id="error-balance" role="alert" className="text-xs text-rose-400 font-medium">
                {errors.balance.message}
              </p>
            )}
          </div>

          {/* Cicilan Minimal / Wajib */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label htmlFor="debt-min-payment" className="font-semibold text-foreground">
                Cicilan Bulanan Wajib
              </label>
              <span className="text-xs font-bold text-pelunas-400 finance-amount">
                {formatRupiah(Number(watchMinimumPayment) || 0)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium pointer-events-none" aria-hidden="true">
                Rp
              </span>
              <input
                id="debt-min-payment"
                type="number"
                step="1000"
                placeholder="250000"
                aria-invalid={!!errors.minimumPayment}
                aria-describedby={errors.minimumPayment ? "error-min-payment" : undefined}
                {...register("minimumPayment", { valueAsNumber: true })}
                className="w-full h-11 pl-10 pr-3.5 rounded-xl text-base sm:text-sm font-mono bg-surface-subtle border border-surface-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pelunas-400/60 transition-all"
              />
            </div>
            {errors.minimumPayment && (
              <p id="error-min-payment" role="alert" className="text-xs text-rose-400 font-medium">
                {errors.minimumPayment.message}
              </p>
            )}
          </div>
        </div>

        {/* Bunga per Bulan & Tanggal Jatuh Tempo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Bunga per Bulan */}
          <div className="space-y-1.5">
            <label htmlFor="debt-interest" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1">
              <span>Bunga Bulanan</span>
              <span className="text-xs text-muted-foreground font-normal">(% / bulan)</span>
            </label>
            <div className="relative">
              <input
                id="debt-interest"
                type="number"
                step="0.01"
                placeholder="2.95"
                aria-invalid={!!errors.interestRatePerMonth}
                aria-describedby={errors.interestRatePerMonth ? "error-interest" : undefined}
                {...register("interestRatePerMonth", { valueAsNumber: true })}
                className="w-full h-11 px-3.5 rounded-xl text-base sm:text-sm font-mono bg-surface-subtle border border-surface-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pelunas-400/60 transition-all"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium pointer-events-none" aria-hidden="true">
                % / bln
              </span>
            </div>
            {errors.interestRatePerMonth && (
              <p id="error-interest" role="alert" className="text-xs text-rose-400 font-medium">
                {errors.interestRatePerMonth.message}
              </p>
            )}
          </div>

          {/* Tanggal Jatuh Tempo */}
          <div className="space-y-1.5">
            <label htmlFor="debt-due-day" className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1">
              <span>Jatuh Tempo Tiap Tanggal</span>
              <span className="text-xs text-muted-foreground font-normal">(1 - 31)</span>
            </label>
            <input
              id="debt-due-day"
              type="number"
              min="1"
              max="31"
              placeholder="10"
              aria-invalid={!!errors.dueDay}
              aria-describedby={errors.dueDay ? "error-due-day" : undefined}
              {...register("dueDay", { valueAsNumber: true })}
              className="w-full h-11 px-3.5 rounded-xl text-base sm:text-sm font-mono bg-surface-subtle border border-surface-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pelunas-400/60 transition-all"
            />
            {errors.dueDay && (
              <p id="error-due-day" role="alert" className="text-xs text-rose-400 font-medium">
                {errors.dueDay.message}
              </p>
            )}
          </div>
        </div>

        {/* Tip Finansial Ringkas */}
        <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border flex items-start gap-2.5 text-xs text-muted-foreground">
          <Info className="w-4 h-4 text-pelunas-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            Rata-rata paylater di Indonesia mengenakan bunga 2.6% - 2.95% per bulan. Jika kartu kredit kamu sedang promo 0%, kamu bisa isi 0%.
          </p>
        </div>

        {/* Action Buttons (Touch Target >= 44px) */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/50">
          <button
            type="button"
            onClick={closeForm}
            className="apple-pressable h-11 px-5 text-xs sm:text-sm font-semibold rounded-xl bg-surface-subtle hover:bg-surface-subtle/80 text-muted-foreground hover:text-foreground border border-surface-border transition-colors touch-target"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="apple-pressable h-11 px-6 text-xs sm:text-sm font-bold rounded-xl bg-pelunas-500 hover:bg-pelunas-400 text-pelunas-950 shadow-lg shadow-pelunas-500/20 transition-all disabled:opacity-50 touch-target"
          >
            {isEditing ? "Simpan Perubahan" : "Tambahkan ke Rencana"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
