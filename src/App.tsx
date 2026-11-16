import React, { useEffect, useState } from 'react';
import { useTransactionStore } from './store/useTransactionStore';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { AIAdvisorCard } from './components/AIAdvisorCard';
import { VoiceExpenseInput } from './components/VoiceExpenseInput';
import { OCRBillScanner } from './components/OCRBillScanner';
import { AdminDashboard } from './components/AdminDashboard';
import { OfflineSyncBanner } from './components/OfflineSyncBanner';
import { ExportService } from './services/exportService';
import { LayoutDashboard, Receipt, Bot, Shield, FileDown } from 'lucide-react';

export const App: React.FC = () => {
  const { loadTransactions, transactions } = useTransactionStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'ai' | 'admin'>('dashboard');

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <OfflineSyncBanner />

      {/* Đầu trang (Header) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-lg">
              M
            </div>
            <div>
              <div className="font-bold text-slate-800 text-lg leading-tight">MoneyVibe</div>
              <div className="text-[11px] text-slate-400">Chuỗi Bài Giảng Vibe Coding Từ Con Số 0</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => ExportService.exportToExcel(transactions)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-600" />
              Xuất Excel
            </button>
            <button
              onClick={() => ExportService.exportToPDF(transactions)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition"
            >
              <FileDown className="w-3.5 h-3.5 text-rose-600" />
              Xuất PDF
            </button>
          </div>
        </div>

        {/* Thanh Điều Hướng Tab */}
        <div className="max-w-6xl mx-auto px-4 flex gap-6 text-xs font-semibold border-t border-slate-100">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'dashboard'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Tổng Quan
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'transactions'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Receipt className="w-4 h-4" />
            Giao Dịch & Nhập Liệu
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'ai'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            Cố Vấn AI (Multi-LLM)
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'admin'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            Quản Trị & Hệ Thống
          </button>
        </div>
      </header>

      {/* Nội Dung Chính */}
      <main className="max-w-6xl mx-auto px-4 py-6 flex-1 w-full space-y-6">
        {activeTab === 'dashboard' && (
          <>
            <Dashboard />
            <AIAdvisorCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VoiceExpenseInput />
              <OCRBillScanner />
            </div>
            <TransactionList />
          </>
        )}

        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <TransactionForm />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VoiceExpenseInput />
              <OCRBillScanner />
            </div>
            <TransactionList />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-6">
            <AIAdvisorCard />
            <Dashboard />
          </div>
        )}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Chân trang (Footer) */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-700">MoneyVibe — Dự Án Thực Hành Series "Vibe Coding Từ Con Số 0"</p>
        <p className="mt-1">Tác giả: Nguyễn Đức Huy | Kênh Substack: nguynchuy1.substack.com</p>
      </footer>
    </div>
  );
};
