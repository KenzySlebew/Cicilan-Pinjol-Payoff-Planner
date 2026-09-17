"use client";

import React from "react";
import { ShieldCheck, Heart, Sparkles } from "lucide-react";

/**
 * Footer Component
 * Styled with the reassuring, clean aesthetic of thebudgeting.app
 */
export function Footer(): JSX.Element {
  return (
    <footer className="mt-14 pt-8 border-t border-white/[0.08] text-xs text-muted-foreground space-y-6">
      <div className="apple-card p-6 sm:p-7 rounded-3xl space-y-4 border border-white/[0.08] shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pelunas-500/15 border border-pelunas-500/30 flex items-center justify-center text-pelunas-400 shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                Jaminan Privasi Penuh & Bebas Iklan
              </h4>
              <p className="text-xs text-muted-foreground">
                Pelunas bekerja 100% offline di perangkatmu. Tidak ada pelacak, tidak ada iklan, dan tidak ada server database eksternal.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-semibold px-3.5 py-1.5 rounded-full bg-surface-subtle border border-surface-border text-foreground">
              Offline First
            </span>
            <span className="text-[11px] font-semibold px-3.5 py-1.5 rounded-full bg-pelunas-500/15 border border-pelunas-500/30 text-pelunas-300">
              Zero Analytics
            </span>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed pt-2 border-t border-white/[0.06]">
          <strong>Disclaimer Edukasi:</strong> Pelunas adalah alat bantu simulasi matematika independen untuk tujuan perencanaan dan edukasi pribadi. Pelunas bukan lembaga jasa keuangan, pinjaman online, atau perantara kredit resmi.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 font-medium">
          <span>Dibuat dengan empati untuk kebebasan finansial kita bersama.</span>
        </div>
        <span className="text-[11px] font-mono">Pelunas • Terinspirasi dari Kesederhanaan</span>
      </div>
    </footer>
  );
}
