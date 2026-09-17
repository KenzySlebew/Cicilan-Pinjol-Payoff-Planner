import { Debt } from "@/types/debt";
import { calculatePayoffStrategy } from "./payoffEngine";
import { PayoffStrategyResult } from "./types";

/**
 * Menghitung pelunasan utang dengan strategi Avalanche
 * Prioritas: Bunga per bulan tertinggi terlebih dahulu untuk meminimalisir total bunga
 */
export function calculateAvalanche(
  debts: Debt[],
  extraMonthlyBudget: number = 0,
  startDate: Date = new Date()
): PayoffStrategyResult {
  return calculatePayoffStrategy(debts, "avalanche", extraMonthlyBudget, startDate);
}
