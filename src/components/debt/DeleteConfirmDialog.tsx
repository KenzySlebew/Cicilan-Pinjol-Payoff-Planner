"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { useDebtStore } from "@/lib/store/useDebtStore";
import { formatRupiah } from "@/lib/utils/formatRupiah";
import { AlertTriangle, Trash2 } from "lucide-react";

export function DeleteConfirmDialog(): JSX.Element | null {
  const { deletingDebt, closeDeleteDialog, deleteDebt } = useDebtStore();

  if (!deletingDebt) return null;

  const handleConfirmDelete = () => {
    deleteDebt(deletingDebt.id);
  };

  return (
    <Modal
      isOpen={!!deletingDebt}
      onClose={closeDeleteDialog}
      title="Hapus Cicilan dari Rencana?"
      maxWidthClass="max-w-md"
    >
      <div className="space-y-5">
        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-200">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs sm:text-sm space-y-1.5 leading-relaxed">
            <p className="font-semibold text-foreground">
              Apakah kamu yakin ingin mengeluarkan cicilan ini?
            </p>
            <p className="text-muted-foreground">
              Cicilan <strong className="text-foreground">{deletingDebt.name}</strong> dengan sisa saldo{" "}
              <strong className="text-foreground">{formatRupiah(deletingDebt.balance)}</strong> akan dihapus dari perhitungan simulasi. Data ini selalu dapat kamu tambahkan kembali kapan saja.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={closeDeleteDialog}
            className="apple-pressable h-11 px-5 text-xs sm:text-sm font-semibold rounded-xl bg-surface-subtle hover:bg-surface-subtle/80 text-muted-foreground hover:text-foreground border border-surface-border transition-colors touch-target"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="apple-pressable h-11 px-5 inline-flex items-center gap-2 text-xs sm:text-sm font-bold rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 transition-all touch-target"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            Hapus Cicilan
          </button>
        </div>
      </div>
    </Modal>
  );
}
