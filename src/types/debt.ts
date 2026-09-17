/**
 * Tipe domain untuk Pelunas (Perencana Pelunasan Utang)
 */

export type DebtCategory =
  | 'paylater'
  | 'kartu_kredit'
  | 'pinjol'
  | 'kpr_kendaraan'
  | 'lainnya';

export type StrategyType = 'snowball' | 'avalanche';

export interface Debt {
  id: string;
  name: string; // contoh: "Shopee PayLater", "Kartu Kredit BCA"
  category: DebtCategory;
  balance: number; // sisa pokok utang saat ini (IDR)
  interestRatePerMonth: number; // bunga per bulan (persen nominal, misal 2.95% atau 0% untuk cicilan 0%)
  minimumPayment: number; // cicilan bulanan wajib / minimum payment
  dueDay: number; // tanggal jatuh tempo tiap bulan (1 - 31)
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface PayoffScheduleMonth {
  monthIndex: number;
  dateString: string; // contoh: "Nov 2024"
  debtId: string;
  debtName: string;
  startingBalance: number;
  payment: number;
  interestCharged: number;
  principalPaid: number;
  endingBalance: number;
  isPaidOff: boolean;
}

export interface PayoffSummary {
  strategy: StrategyType;
  totalMonths: number;
  payoffDate: string; // contoh: "Maret 2026"
  totalInterestPaid: number;
  totalPaid: number;
  interestSavedComparedToOther: number;
}
