"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Pengingat jatuh tempo dikirim ke mana? Apakah ke email atau WhatsApp?",
    answer:
      "Tidak ke email maupun WhatsApp! Pelunas 100% offline-first dan zero-knowledge. Kami tidak pernah meminta email atau nomor HP Anda. Pengingat jatuh tempo ditampilkan secara in-app di dalam aplikasi saat Anda membukanya, dan Anda bisa mengekspor jadwal (.ics) langsung ke aplikasi kalender bawaan HP (Google Calendar atau Apple Calendar) dengan satu klik agar alarm ponsel Anda otomatis berbunyi.",
  },
  {
    question: "Kenapa data utang saya tidak disimpan di server / cloud?",
    answer:
      "Privasi finansial adalah prioritas mutlak. Pelunas dirancang bekerja 100% di browser kamu (menggunakan teknologi localStorage). Kami tidak meminta KTP, nama rekening, atau email. Data tidak pernah meninggalkan ponsel atau komputermu.",
  },
  {
    question: "Kapan saya sebaiknya memilih metode Snowball vs Avalanche?",
    answer:
      "Pilih Snowball jika kamu merasa terbebani secara psikologis dan membutuhkan suntikan motivasi cepat dengan melihat satu per satu cicilan tercoret dari daftar. Pilih Avalanche jika kamu ingin meminimalkan total nominal bunga yang keluar dari dompetmu.",
  },
  {
    question: "Bagaimana jika kartu kredit atau paylater saya menggunakan promo cicilan 0%?",
    answer:
      "Kamu cukup mengisi kolom bunga dengan angka 0%. Utang dengan bunga 0% akan otomatis diprioritaskan di urutan paling akhir pada metode Avalanche, sehingga uangmu bisa difokuskan melunasi pinjaman berbunga tinggi terlebih dahulu.",
  },
  {
    question: "Apa beda bunga bulanan paylater (misal 2.95%) dengan bunga tahunan kartu kredit?",
    answer:
      "Bunga paylater umumnya ditulis per bulan (flat atau anuitas 2.6% - 2.95%), yang jika dikalikan 12 bulan setara dengan 31% - 35% per tahun. Sedangkan kartu kredit bank di Indonesia umumnya dibatasi aturan Bank Indonesia maksimal 1.75% per bulan (21% per tahun).",
  },
];

export function FAQSection(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="space-y-4 pt-4 scroll-mt-24" aria-labelledby="faq-heading">
      <div className="space-y-1">
        <h2
          id="faq-heading"
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground"
        >
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Penjelasan ringkas seputar strategi pelunasan dan keamanan datamu
        </p>
      </div>

      <div className="space-y-2.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className="apple-card rounded-2xl border border-border/60 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-pelunas-400 touch-target"
              >
                <span className="font-bold text-xs sm:text-sm text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-pelunas-400" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
