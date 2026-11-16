import React from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import { Trash2, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export const TransactionList: React.FC = () => {
  const { transactions, deleteTransaction, activeFilterCategory, searchKeyword } = useTransactionStore();

  const filtered = transactions.filter((t) => {
    if (activeFilterCategory !== 'Tat ca' && t.category !== activeFilterCategory) return false;
    if (searchKeyword && !t.note.toLowerCase().includes(searchKeyword.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">Lich Su Giao Dich ({filtered.length})</h3>
        <span className="text-xs text-slate-400">Offline-first IndexedDB cache</span>
      </div>

      {filtered.length === 0 ? (
        <div className="p-8 text-center text-slate-400 text-sm">
          Chua co ban ghi giao dich nao phu hop.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {filtered.map((t) => (
            <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                    t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {t.type === 'income' ? 'THU' : 'CHI'}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{t.note || t.category}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>{t.date}</span>
                    <span>•</span>
                    <span>{t.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div
                    className={`text-sm font-bold ${
                      t.type === 'income' ? 'text-emerald-600' : 'text-slate-800'
                    }`}
                  >
                    {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('vi-VN')} VND
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[11px] text-slate-400">
                    {t.syncStatus === 'synced' && (
                      <span className="text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Dong bo
                      </span>
                    )}
                    {t.syncStatus === 'pending' && (
                      <span className="text-amber-500 flex items-center gap-0.5">
                        <Clock className="w-3 h-3" /> Cho dong bo
                      </span>
                    )}
                    {t.syncStatus === 'failed' && (
                      <span className="text-rose-500 flex items-center gap-0.5">
                        <AlertTriangle className="w-3 h-3" /> Loi
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition"
                  title="Xoa giao dich"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
