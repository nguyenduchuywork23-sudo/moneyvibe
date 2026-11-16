import { create } from 'zustand';
import { Transaction, Category, FinancialMetric } from '../types';
import { localDb } from '../db/indexedDB';

interface State {
  transactions: Transaction[];
  monthlyBudget: number;
  isOffline: boolean;
  activeFilterCategory: Category | 'Tat ca';
  searchKeyword: string;
  loadTransactions: () => Promise<void>;
  addTransaction: (data: Omit<Transaction, 'id' | 'createdAt' | 'syncStatus'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  setMonthlyBudget: (amount: number) => void;
  setFilterCategory: (cat: Category | 'Tat ca') => void;
  setSearchKeyword: (keyword: string) => void;
  getFinancialMetrics: () => FinancialMetric;
}

export const useTransactionStore = create<State>((set, get) => ({
  transactions: [],
  monthlyBudget: 15000000,
  isOffline: !navigator.onLine,
  activeFilterCategory: 'Tat ca',
  searchKeyword: '',

  loadTransactions: async () => {
    const list = await localDb.transactions.reverse().sortBy('date');
    if (list.length === 0) {
      // Du lieu mac dinh khoi tao
      const samples: Transaction[] = [
        {
          id: 'sample-1',
          amount: 25000000,
          type: 'income',
          category: 'Luong thuong',
          note: 'Thu nhap thang',
          date: '2026-11-01',
          syncStatus: 'synced',
          createdAt: Date.now() - 15 * 86400000,
        },
        {
          id: 'sample-2',
          amount: 4500000,
          type: 'expense',
          category: 'Nha o',
          note: 'Tien thue phong',
          date: '2026-11-03',
          syncStatus: 'synced',
          createdAt: Date.now() - 13 * 86400000,
        },
        {
          id: 'sample-3',
          amount: 850000,
          type: 'expense',
          category: 'Hoa don & Tien ich',
          note: 'Dien, nuoc va internet',
          date: '2026-11-05',
          syncStatus: 'synced',
          createdAt: Date.now() - 11 * 86400000,
        },
        {
          id: 'sample-4',
          amount: 3200000,
          type: 'expense',
          category: 'An uong',
          note: 'Di sieu thi tuan 1 & 2',
          date: '2026-11-08',
          syncStatus: 'synced',
          createdAt: Date.now() - 8 * 86400000,
        },
        {
          id: 'sample-5',
          amount: 1500000,
          type: 'expense',
          category: 'Giai tri',
          note: 'Xem phim va cafe cuoi tuan',
          date: '2026-11-12',
          syncStatus: 'synced',
          createdAt: Date.now() - 4 * 86400000,
        },
      ];
      await localDb.transactions.bulkAdd(samples);
      set({ transactions: samples });
    } else {
      set({ transactions: list });
    }
  },

  addTransaction: async (data) => {
    const newItem: Transaction = {
      ...data,
      id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      syncStatus: navigator.onLine ? 'synced' : 'pending',
      createdAt: Date.now(),
    };

    await localDb.transactions.add(newItem);

    if (!navigator.onLine) {
      await localDb.syncQueue.add({
        transactionId: newItem.id,
        action: 'insert',
        payload: newItem,
        timestamp: Date.now(),
        retryCount: 0,
      });
    }

    set((state) => ({
      transactions: [newItem, ...state.transactions],
    }));
  },

  deleteTransaction: async (id: string) => {
    await localDb.transactions.delete(id);
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
  },

  setMonthlyBudget: (amount: number) => set({ monthlyBudget: amount }),
  setFilterCategory: (cat) => set({ activeFilterCategory: cat }),
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),

  getFinancialMetrics: () => {
    const { transactions, monthlyBudget } = get();
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const netBalance = totalIncome - totalExpense;
    const daysInMonth = 30;
    const burnRatePerDay = totalExpense / Math.max(1, new Date().getDate());
    const runwayDays = burnRatePerDay > 0 ? Math.floor(Math.max(0, netBalance) / burnRatePerDay) : 999;

    const budgetRatio = monthlyBudget > 0 ? totalExpense / monthlyBudget : 0;
    const financialHealthScore = Math.max(0, Math.min(100, Math.round(100 - budgetRatio * 60)));

    return {
      totalIncome,
      totalExpense,
      netBalance,
      burnRatePerDay,
      runwayDays,
      financialHealthScore,
    };
  },
}));
