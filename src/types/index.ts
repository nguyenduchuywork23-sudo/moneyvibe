export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'An uong'
  | 'Di lai'
  | 'Nha o'
  | 'Hoa don & Tien ich'
  | 'Giai tri'
  | 'Suc khoe'
  | 'Mua sam'
  | 'Dau tu'
  | 'Luong thuong'
  | 'Khac';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: Category;
  note: string;
  date: string;
  syncStatus: 'synced' | 'pending' | 'failed';
  userId?: string;
  receiptUrl?: string;
  createdAt: number;
}

export interface FinancialMetric {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  burnRatePerDay: number;
  runwayDays: number;
  financialHealthScore: number;
}

export interface AIAdviceResult {
  provider: 'gemini' | 'anthropic' | 'openai';
  score: number;
  summary: string;
  actionableTips: string[];
  riskAlert: string | null;
  generatedAt: string;
}

export interface OCRBillResult {
  merchantName: string;
  totalAmount: number;
  date: string;
  suggestedCategory: Category;
  items: Array<{ name: string; price: number }>;
}
