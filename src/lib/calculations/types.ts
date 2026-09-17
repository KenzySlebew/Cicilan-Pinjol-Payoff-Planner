import { Debt, StrategyType } from "@/types/debt";

export interface DebtMonthlyRecord {
  debtId: string;
  debtName: string;
  startingBalance: number;
  interestCharged: number;
  payment: number;
  principalPaid: number;
  endingBalance: number;
  isPaidOff: boolean;
}

export interface MonthlySimulationStep {
  monthIndex: number; // 1, 2, 3, ...
  date: Date;
  dateLabel: string; // "November 2024"
  records: DebtMonthlyRecord[];
  totalPaymentThisMonth: number;
  totalInterestThisMonth: number;
  totalRemainingBalance: number;
  debtsPaidOffThisMonth: string[]; // nama-nama utang yang lunas di bulan ini
}

export interface DebtPayoffMilestone {
  debtId: string;
  debtName: string;
  category: Debt["category"];
  orderIndex: number; // 1 = pertama kali ditargetkan
  initialBalance: number;
  interestRatePerMonth: number;
  minimumPayment: number;
  monthsToPayoff: number;
  payoffDateLabel: string; // "Februari 2025"
  totalInterestPaid: number;
  totalPaid: number;
}

export interface PayoffStrategyResult {
  strategy: StrategyType;
  totalMonths: number;
  payoffDate: Date;
  payoffDateLabel: string; // "Agustus 2026"
  totalPrincipal: number;
  totalInterestPaid: number;
  totalPaid: number;
  firstDebtPaidMonths: number;
  firstDebtPaidName: string;
  milestones: DebtPayoffMilestone[];
  monthlySchedule: MonthlySimulationStep[];
}

export interface StrategyComparisonResult {
  snowball: PayoffStrategyResult;
  avalanche: PayoffStrategyResult;
  interestSavedByAvalanche: number; // avalanche vs snowball
  monthsDifference: number; // selisih bulan (snowball - avalanche)
  fasterStrategy: StrategyType | "same";
  cheaperStrategy: StrategyType | "same";
}
