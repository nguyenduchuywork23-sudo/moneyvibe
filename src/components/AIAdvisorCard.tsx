import React, { useState } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import { MultiLLMFallbackService } from '../services/multiLlmFallback';
import { AIAdviceResult } from '../types';
import { Bot, RefreshCw, CheckCircle, AlertOctagon } from 'lucide-react';

export const AIAdvisorCard: React.FC = () => {
  const { transactions, monthlyBudget } = useTransactionStore();
  const [advice, setAdvice] = useState<AIAdviceResult | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const res = await MultiLLMFallbackService.analyzeFinances(transactions, monthlyBudget);
      setAdvice(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800">Co Van Tai Chinh Thong Minh (AI Advisor)</h3>
            <p className="text-xs text-slate-500">He thong Multi-LLM tu dong chuyen mach: Gemini / Claude / GPT</p>
          </div>
        </div>

        <button
          onClick={fetchAdvice}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Dang phan tich...' : 'Chay Phan Tich'}
        </button>
      </div>

      {advice ? (
        <div className="space-y-3 pt-2">
          {advice.riskAlert && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-rose-800 text-xs">
              <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Canh bao rui ro: </span>
                {advice.riskAlert}
              </div>
            </div>
          )}

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-xs font-medium text-slate-500 mb-1">Tong quan nhan dinh:</div>
            <p className="text-sm text-slate-800">{advice.summary}</p>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2">Khuyen nghi hanh dong:</div>
            <ul className="space-y-1.5">
              {advice.actionableTips.map((tip, idx) => (
                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            <span>Provider: {advice.provider.toUpperCase()}</span>
            <span>Cap nhat luc: {new Date(advice.generatedAt).toLocaleTimeString('vi-VN')}</span>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-lg border border-dashed border-slate-200">
          Nhan "Chay Phan Tich" de nhan bao cao suc khoe tai chinh chuyen sau tu AI.
        </div>
      )}
    </div>
  );
};
