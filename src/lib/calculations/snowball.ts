import { Debt } from "@/types/debt";
import { calculatePayoffStrategy } from "./payoffEngine";
import { PayoffStrategyResult } from "./types";

/**
 * Menghitung pelunasan utang dengan strategi Snowball
 * Prioritas: Saldo terkecil terlebih dahulu untuk membangun momentum psikologis
 */
export function calculateSnowball(
  debts: Debt[],
  extraMonthlyBudget: number = 0,
  startDate: Date = new Date()
): PayoffStrategyResult {
  return calculatePayoffStrategy(debts, "snowball", extraMonthlyBudget, startDate);
}
