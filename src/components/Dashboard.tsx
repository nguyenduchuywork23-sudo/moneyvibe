import React from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import { ArrowUpRight, ArrowDownRight, Wallet, ShieldCheck } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { getFinancialMetrics, monthlyBudget } = useTransactionStore();
  const metrics = getFinancialMetrics();

  const budgetProgress = Math.min(100, Math.round((metrics.totalExpense / monthlyBudget) * 100));

  return (
    <div className="space-y-6">
      {/* Lưới các thẻ chỉ số tài chính */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tổng Thu */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-medium">Tổng thu nhập</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {metrics.totalIncome.toLocaleString('vi-VN')} VND
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">
            Dòng tiền ổn định
          </div>
        </div>

        {/* Tổng Chi */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-medium">Tổng chi tiêu</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {metrics.totalExpense.toLocaleString('vi-VN')} VND
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {budgetProgress}% ngân sách tháng
          </div>
        </div>

        {/* Số Dư Ròng */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-medium">Số dư hiện tại</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className={`text-2xl font-bold ${metrics.netBalance >= 0 ? 'text-slate-800' : 'text-rose-600'}`}>
            {metrics.netBalance.toLocaleString('vi-VN')} VND
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Ước tính duy trì an toàn: {metrics.runwayDays} ngày
          </div>
        </div>

        {/* Điểm Sức Khỏe Tài Chính */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-medium">Điểm sức khỏe tài chính</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {metrics.financialHealthScore} / 100
          </div>
          <div className="text-xs text-purple-600 font-medium mt-1">
            Xếp loại: {metrics.financialHealthScore >= 80 ? 'Tốt' : metrics.financialHealthScore >= 60 ? 'Khá' : 'Cần chú ý'}
          </div>
        </div>
      </div>

      {/* Thanh Tiến Độ Ngân Sách */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-semibold text-slate-800">Hạn Mức Ngân Sách Tháng</h3>
            <p className="text-xs text-slate-500">Kiểm soát tỷ lệ chi tiêu chủ động theo thời gian thực</p>
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
          <span>{budgetProgress}% đã sử dụng</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
