import React from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import { ArrowUpRight, ArrowDownRight, Wallet, Activity, Calendar, ShieldCheck } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { getFinancialMetrics, monthlyBudget } = useTransactionStore();
  const metrics = getFinancialMetrics();

  const budgetProgress = Math.min(100, Math.round((metrics.totalExpense / monthlyBudget) * 100));

  return (
    <div className="space-y-6">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tong Thu */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-medium">Tong thu nhap</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {metrics.totalIncome.toLocaleString('vi-VN')} VND
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">
            Dong tien on dinh
          </div>
        </div>

        {/* Tong Chi */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-medium">Tong chi tieu</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {metrics.totalExpense.toLocaleString('vi-VN')} VND
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {budgetProgress}% ngan sach thang
          </div>
        </div>

        {/* So Du Rong */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-medium">So du hien tai</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className={`text-2xl font-bold ${metrics.netBalance >= 0 ? 'text-slate-800' : 'text-rose-600'}`}>
            {metrics.netBalance.toLocaleString('vi-VN')} VND
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Uoc tinh duy tri: {metrics.runwayDays} ngay
          </div>
        </div>

        {/* Diem Suc Khoe Tai Chinh */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-medium">Diem suc khoe tai chinh</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {metrics.financialHealthScore} / 100
          </div>
          <div className="text-xs text-purple-600 font-medium mt-1">
            Xep loai: {metrics.financialHealthScore >= 80 ? 'Tot' : metrics.financialHealthScore >= 60 ? 'Kha' : 'Can chu y'}
          </div>
        </div>
      </div>

      {/* Progress Bar Ngan Sach */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-semibold text-slate-800">Han Muc Ngan Sach Thang</h3>
            <p className="text-xs text-slate-500">Kiem soat ty le chi tieu chu dong theo thoi gian thuc</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-slate-800">{metrics.totalExpense.toLocaleString('vi-VN')} VND</span>
            <span className="text-xs text-slate-400"> / {monthlyBudget.toLocaleString('vi-VN')} VND</span>
          </div>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              budgetProgress >= 100
                ? 'bg-rose-500'
                : budgetProgress >= 80
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, budgetProgress)}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
          <span>0%</span>
          <span>{budgetProgress}% da su dung</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
