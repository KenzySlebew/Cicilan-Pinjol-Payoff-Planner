import { Debt, StrategyType } from "@/types/debt";
import { formatBulanTahun, tambahBulan } from "@/lib/utils/dateUtils";
import {
  PayoffStrategyResult,
  MonthlySimulationStep,
  DebtMonthlyRecord,
  DebtPayoffMilestone,
} from "./types";

interface ActiveDebtState {
  id: string;
  name: string;
  category: Debt["category"];
  initialBalance: number;
  currentBalance: number;
  interestRatePerMonth: number;
  minimumPayment: number;
  totalInterestPaid: number;
  totalPaid: number;
  isPaid: boolean;
  payoffMonth: number;
}

const MAX_SIMULATION_MONTHS = 360; // Batas aman 30 tahun

export function calculatePayoffStrategy(
  debts: Debt[],
  strategy: StrategyType,
  extraMonthlyBudget: number = 0,
  startDate: Date = new Date()
): PayoffStrategyResult {
  if (!debts || debts.length === 0) {
    const defaultDate = new Date(startDate);
    return {
      strategy,
      totalMonths: 0,
      payoffDate: defaultDate,
      payoffDateLabel: formatBulanTahun(defaultDate),
      totalPrincipal: 0,
      totalInterestPaid: 0,
      totalPaid: 0,
      firstDebtPaidMonths: 0,
      firstDebtPaidName: "-",
      milestones: [],
      monthlySchedule: [],
    };
  }

  // 1. Urutkan prioritas berdasarkan strategi
  const prioritizedDebts = [...debts].sort((a, b) => {
    if (strategy === "snowball") {
      // Snowball: Saldo terkecil dulu, jika sama baru bunga tertinggi
      if (a.balance !== b.balance) {
        return a.balance - b.balance;
      }
      return b.interestRatePerMonth - a.interestRatePerMonth;
    } else {
      // Avalanche: Bunga tertinggi dulu, jika sama baru saldo terkecil
      if (b.interestRatePerMonth !== a.interestRatePerMonth) {
        return b.interestRatePerMonth - a.interestRatePerMonth;
      }
      return a.balance - b.balance;
    }
  });

  // Total anggaran cicilan bulanan gabungan (semua cicilan wajib + anggaran ekstra)
  const initialTotalMinimumPayment = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
  const totalMonthlyBudgetCommitment = initialTotalMinimumPayment + Math.max(0, extraMonthlyBudget);

  // Inisialisasi state aktif setiap utang
  const activeDebts: ActiveDebtState[] = prioritizedDebts.map((d) => ({
    id: d.id,
    name: d.name,
    category: d.category,
    initialBalance: d.balance,
    currentBalance: d.balance,
    interestRatePerMonth: d.interestRatePerMonth,
    minimumPayment: d.minimumPayment,
    totalInterestPaid: 0,
    totalPaid: 0,
    isPaid: d.balance <= 0,
    payoffMonth: d.balance <= 0 ? 0 : 0,
  }));

  const monthlySchedule: MonthlySimulationStep[] = [];
  let monthIndex = 0;
  let firstPaidDebtMonths = 0;
  let firstPaidDebtName = "";

  // 2. Loop simulasi bulan demi bulan
  while (monthIndex < MAX_SIMULATION_MONTHS) {
    const unpaidDebts = activeDebts.filter((d) => !d.isPaid && d.currentBalance > 0.01);
    if (unpaidDebts.length === 0) {
      break;
    }

    monthIndex++;
    const currentMonthDate = tambahBulan(startDate, monthIndex);
    const dateLabel = formatBulanTahun(currentMonthDate);

    // Langkah A: Hitung bunga berjalan bulan ini untuk setiap utang aktif
    const monthlyRecords: DebtMonthlyRecord[] = [];
    const debtsPaidThisMonth: string[] = [];

    for (const debt of activeDebts) {
      if (debt.isPaid || debt.currentBalance <= 0.01) {
        continue;
      }

      const startingBalance = debt.currentBalance;
      // Bunga per bulan = saldo berjalan * (rate / 100)
      const interestCharged = startingBalance * (debt.interestRatePerMonth / 100);
      debt.currentBalance += interestCharged;
      debt.totalInterestPaid += interestCharged;

      monthlyRecords.push({
        debtId: debt.id,
        debtName: debt.name,
        startingBalance,
        interestCharged,
        payment: 0,
        principalPaid: 0,
        endingBalance: debt.currentBalance,
        isPaidOff: false,
      });
    }

    // Langkah B: Bayar cicilan minimum wajib untuk setiap utang aktif
    let remainingBudgetForExtra = totalMonthlyBudgetCommitment;

    for (const record of monthlyRecords) {
      const debt = activeDebts.find((d) => d.id === record.debtId);
      if (!debt || debt.currentBalance <= 0) continue;

      // Bayar minimum atau sisa saldo jika saldo lebih kecil dari minimum payment
      const minPay = Math.min(debt.currentBalance, debt.minimumPayment);
      debt.currentBalance -= minPay;
      debt.totalPaid += minPay;
      record.payment += minPay;
      remainingBudgetForExtra -= minPay;

      if (debt.currentBalance <= 0.01) {
        debt.currentBalance = 0;
        debt.isPaid = true;
        debt.payoffMonth = monthIndex;
        record.isPaidOff = true;
        debtsPaidThisMonth.push(debt.name);

        if (!firstPaidDebtName) {
          firstPaidDebtName = debt.name;
          firstPaidDebtMonths = monthIndex;
        }
      }
    }

    // Langkah C: Alokasikan rollover payment & extra budget ke utang prioritas pertama yang masih aktif
    if (remainingBudgetForExtra > 0) {
      for (const debt of activeDebts) {
        if (remainingBudgetForExtra <= 0.01) break;
        if (debt.isPaid || debt.currentBalance <= 0.01) continue;

        const record = monthlyRecords.find((r) => r.debtId === debt.id);
        const extraPay = Math.min(debt.currentBalance, remainingBudgetForExtra);

        debt.currentBalance -= extraPay;
        debt.totalPaid += extraPay;
        remainingBudgetForExtra -= extraPay;

        if (record) {
          record.payment += extraPay;
        }

        if (debt.currentBalance <= 0.01) {
          debt.currentBalance = 0;
          debt.isPaid = true;
          debt.payoffMonth = monthIndex;
          if (record) record.isPaidOff = true;
          if (!debtsPaidThisMonth.includes(debt.name)) {
            debtsPaidThisMonth.push(debt.name);
          }

          if (!firstPaidDebtName) {
            firstPaidDebtName = debt.name;
            firstPaidDebtMonths = monthIndex;
          }
        }
      }
    }

    // Perbarui principalPaid dan endingBalance pada setiap record
    let monthTotalPayment = 0;
    let monthTotalInterest = 0;
    let monthRemainingBalance = 0;

    for (const record of monthlyRecords) {
      record.principalPaid = Math.max(0, record.payment - record.interestCharged);
      const debt = activeDebts.find((d) => d.id === record.debtId);
      record.endingBalance = debt ? debt.currentBalance : 0;

      monthTotalPayment += record.payment;
      monthTotalInterest += record.interestCharged;
      monthRemainingBalance += record.endingBalance;
    }

    monthlySchedule.push({
      monthIndex,
      date: currentMonthDate,
      dateLabel,
      records: monthlyRecords,
      totalPaymentThisMonth: monthTotalPayment,
      totalInterestThisMonth: monthTotalInterest,
      totalRemainingBalance: monthRemainingBalance,
      debtsPaidOffThisMonth: debtsPaidThisMonth,
    });
  }

  // 3. Rekapitulasi milestone per utang
  const milestones: DebtPayoffMilestone[] = activeDebts.map((d, idx) => {
    const payoffDateObj = tambahBulan(startDate, d.payoffMonth || monthIndex);
    return {
      debtId: d.id,
      debtName: d.name,
      category: d.category,
      orderIndex: idx + 1,
      initialBalance: d.initialBalance,
      interestRatePerMonth: d.interestRatePerMonth,
      minimumPayment: d.minimumPayment,
      monthsToPayoff: d.payoffMonth || monthIndex,
      payoffDateLabel: formatBulanTahun(payoffDateObj),
      totalInterestPaid: d.totalInterestPaid,
      totalPaid: d.totalPaid,
    };
  });

  const finalPayoffDate = tambahBulan(startDate, monthIndex);
  const totalPrincipal = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalInterestPaid = activeDebts.reduce((sum, d) => sum + d.totalInterestPaid, 0);
  const totalPaid = totalPrincipal + totalInterestPaid;

  return {
    strategy,
    totalMonths: monthIndex,
    payoffDate: finalPayoffDate,
    payoffDateLabel: formatBulanTahun(finalPayoffDate),
    totalPrincipal,
    totalInterestPaid,
    totalPaid,
    firstDebtPaidMonths: firstPaidDebtMonths || monthIndex,
    firstDebtPaidName: firstPaidDebtName || (debts[0]?.name ?? "-"),
    milestones,
    monthlySchedule,
  };
}
