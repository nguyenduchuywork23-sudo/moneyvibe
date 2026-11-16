import React, { useState } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import { Category, TransactionType } from '../types';
import { PlusCircle } from 'lucide-react';

const CATEGORIES: Category[] = [
  'Ăn uống',
  'Đi lại',
  'Nhà ở',
  'Hóa đơn & Tiện ích',
  'Giải trí',
  'Sức khỏe',
  'Mua sắm',
  'Đầu tư',
  'Lương thưởng',
  'Khác',
];

export const TransactionForm: React.FC = () => {
  const { addTransaction } = useTransactionStore();
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<Category>('Ăn uống');
  const [note, setNote] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount.replace(/[^0-9]/g, ''));
    if (!numAmount || numAmount <= 0) return;

    await addTransaction({
      amount: numAmount,
      type,
      category,
      note,
      date,
    });

    setAmount('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-emerald-600" />
        Thêm Giao Dịch Nhanh
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Loại giao dịch */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Loại giao dịch</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`py-2 text-xs font-semibold rounded-lg border transition ${
                type === 'expense'
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Chi phí
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`py-2 text-xs font-semibold rounded-lg border transition ${
                type === 'income'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Thu nhập
            </button>
          </div>
        </div>

        {/* Số tiền */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Số tiền (VND)</label>
          <input
            type="number"
            required
            placeholder="Ví dụ: 50000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Danh mục */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Danh mục</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Ngày */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Ngày thực hiện</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Ghi chú */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Ghi chú chi tiết</label>
        <input
          type="text"
          placeholder="Ví dụ: Ăn trưa cùng đối tác kinh doanh"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition"
      >
        Lưu Giao Dịch
      </button>
    </form>
  );
};
