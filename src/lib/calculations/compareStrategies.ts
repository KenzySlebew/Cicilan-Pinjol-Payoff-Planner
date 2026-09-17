import { Debt } from "@/types/debt";
import { calculateSnowball } from "./snowball";
import { calculateAvalanche } from "./avalanche";
import { StrategyComparisonResult } from "./types";

export function compareStrategies(
  debts: Debt[],
  extraMonthlyBudget: number = 0,
  startDate: Date = new Date()
): StrategyComparisonResult {
  const snowball = calculateSnowball(debts, extraMonthlyBudget, startDate);
  const avalanche = calculateAvalanche(debts, extraMonthlyBudget, startDate);

  const interestDiff = snowball.totalInterestPaid - avalanche.totalInterestPaid;
  const interestSavedByAvalanche = Math.max(0, Math.round(interestDiff));
  const monthsDifference = snowball.totalMonths - avalanche.totalMonths;

  let fasterStrategy: "snowball" | "avalanche" | "same" = "same";
  if (avalanche.totalMonths < snowball.totalMonths) {
    fasterStrategy = "avalanche";
  } else if (snowball.totalMonths < avalanche.totalMonths) {
    fasterStrategy = "snowball";
  }

  let cheaperStrategy: "snowball" | "avalanche" | "same" = "same";
  if (avalanche.totalInterestPaid < snowball.totalInterestPaid) {
    cheaperStrategy = "avalanche";
  } else if (snowball.totalInterestPaid < avalanche.totalInterestPaid) {
    cheaperStrategy = "snowball";
  }

  return {
    snowball,
    avalanche,
    interestSavedByAvalanche,
    monthsDifference,
    fasterStrategy,
    cheaperStrategy,
  };
}
