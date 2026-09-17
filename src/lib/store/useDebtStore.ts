"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Debt, StrategyType } from "@/types/debt";

export const DEFAULT_SAMPLE_DEBTS: Debt[] = [
  {
    id: "debt-1",
    name: "Spaylater iPhone 15",
    category: "paylater",
    balance: 3500000,
    interestRatePerMonth: 2.95,
    minimumPayment: 450000,
    dueDay: 15,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "debt-2",
    name: "Kartu Kredit BCA",
    category: "kartu_kredit",
    balance: 8500000,
    interestRatePerMonth: 1.75,
    minimumPayment: 850000,
    dueDay: 25,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "debt-3",
    name: "Kredivo Laptop",
    category: "paylater",
    balance: 2200000,
    interestRatePerMonth: 2.6,
    minimumPayment: 380000,
    dueDay: 5,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "debt-4",
    name: "AdaKami Modal Usaha",
    category: "pinjol",
    balance: 1500000,
    interestRatePerMonth: 2.8,
    minimumPayment: 300000,
    dueDay: 10,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
];

export interface DebtState {
  debts: Debt[];
  selectedStrategy: StrategyType;
  extraMonthlyBudget: number;
  isFormOpen: boolean;
  editingDebt: Debt | null;
  deletingDebt: Debt | null;
  hasHydrated: boolean;
  celebratingDebtName: string | null;
  dismissedReminderIds: string[];
  theme: "light" | "dark";

  // Actions
  addDebt: (debt: Omit<Debt, "id" | "createdAt" | "updatedAt">) => void;
  updateDebt: (id: string, updated: Partial<Debt>) => void;
  deleteDebt: (id: string) => void;
  markAsPaid: (id: string) => void;
  clearCelebration: () => void;
  setStrategy: (strategy: StrategyType) => void;
  setSelectedStrategy: (strategy: StrategyType) => void;
  setExtraMonthlyBudget: (amount: number) => void;
  openAddForm: () => void;
  openEditForm: (debt: Debt) => void;
  closeForm: () => void;
  openDeleteDialog: (debt: Debt) => void;
  closeDeleteDialog: () => void;
  setHasHydrated: (status: boolean) => void;
  dismissReminder: (id: string) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  loadDummyData: () => void;
  resetToSampleData: () => void;
}

export const useDebtStore = create<DebtState>()(
  persist(
    (set, get) => ({
      debts: DEFAULT_SAMPLE_DEBTS,
      selectedStrategy: "snowball",
      extraMonthlyBudget: 0,
      isFormOpen: false,
      editingDebt: null,
      deletingDebt: null,
      hasHydrated: false,
      celebratingDebtName: null,
      dismissedReminderIds: [],
      theme: "light",

      addDebt: (newDebtData) => {
        const now = new Date().toISOString();
        const newDebt: Debt = {
          ...newDebtData,
          id: `debt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          debts: [...state.debts, newDebt],
          isFormOpen: false,
        }));
      },

      updateDebt: (id, updated) => {
        const now = new Date().toISOString();
        set((state) => ({
          debts: state.debts.map((d) =>
            d.id === id ? { ...d, ...updated, updatedAt: now } : d
          ),
          editingDebt: null,
          isFormOpen: false,
        }));
      },

      deleteDebt: (id) => {
        set((state) => ({
          debts: state.debts.filter((d) => d.id !== id),
          deletingDebt: null,
        }));
      },

      markAsPaid: (id) => {
        const debt = get().debts.find((d) => d.id === id);
        const debtName = debt ? debt.name : "Cicilan";

        set((state) => ({
          debts: state.debts.filter((d) => d.id !== id),
          celebratingDebtName: debtName,
        }));
      },

      clearCelebration: () => {
        set({ celebratingDebtName: null });
      },

      setStrategy: (strategy) => {
        set({ selectedStrategy: strategy });
      },

      setSelectedStrategy: (strategy) => {
        set({ selectedStrategy: strategy });
      },

      setExtraMonthlyBudget: (amount) => {
        set({ extraMonthlyBudget: Math.max(0, amount) });
      },

      openAddForm: () => {
        set({ isFormOpen: true, editingDebt: null });
      },

      openEditForm: (debt) => {
        set({ isFormOpen: true, editingDebt: debt });
      },

      closeForm: () => {
        set({ isFormOpen: false, editingDebt: null });
      },

      openDeleteDialog: (debt) => {
        set({ deletingDebt: debt });
      },

      closeDeleteDialog: () => {
        set({ deletingDebt: null });
      },

      setHasHydrated: (status) => {
        set({ hasHydrated: status });
      },

      dismissReminder: (id) => {
        set((state) => ({
          dismissedReminderIds: [...state.dismissedReminderIds, id],
        }));
      },

      toggleTheme: () => {
        const nextTheme = get().theme === "dark" ? "light" : "dark";
        if (typeof document !== "undefined") {
          if (nextTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
        set({ theme: nextTheme });
      },

      setTheme: (theme) => {
        if (typeof document !== "undefined") {
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
        set({ theme });
      },

      loadDummyData: () => {
        set({
          debts: DEFAULT_SAMPLE_DEBTS,
          extraMonthlyBudget: 0,
          dismissedReminderIds: [],
        });
      },

      resetToSampleData: () => {
        set({
          debts: DEFAULT_SAMPLE_DEBTS,
          extraMonthlyBudget: 0,
          dismissedReminderIds: [],
        });
      },
    }),
    {
      name: "pelunas-debt-storage-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        debts: state.debts,
        selectedStrategy: state.selectedStrategy,
        extraMonthlyBudget: state.extraMonthlyBudget,
        dismissedReminderIds: state.dismissedReminderIds,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
          if (typeof document !== "undefined") {
            if (state.theme === "dark") {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }
        }
      },
    }
  )
);
