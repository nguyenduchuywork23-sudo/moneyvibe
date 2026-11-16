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
            <h3 className="text-base font-semibold text-slate-800">Cố Vấn Tài Chính Thông Minh (AI Advisor)</h3>
            <p className="text-xs text-slate-500">Hệ thống Multi-LLM tự động chuyển mạch: Gemini / Claude / GPT</p>
          </div>
        </div>

        <button
          onClick={fetchAdvice}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Đang phân tích...' : 'Chạy Phân Tích'}
        </button>
      </div>

      {advice ? (
        <div className="space-y-3 pt-2">
          {advice.riskAlert && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-rose-800 text-xs">
              <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Cảnh báo rủi ro: </span>
                {advice.riskAlert}
              </div>
            </div>
          )}

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-xs font-medium text-slate-500 mb-1">Tổng quan nhận định:</div>
            <p className="text-sm text-slate-800">{advice.summary}</p>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2">Khuyến nghị hành động:</div>
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
            <span>Nhà cung cấp: {advice.provider.toUpperCase()}</span>
            <span>Cập nhật lúc: {new Date(advice.generatedAt).toLocaleTimeString('vi-VN')}</span>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-lg border border-dashed border-slate-200">
          Nhấn "Chạy Phân Tích" để nhận báo cáo sức khỏe tài chính chuyên sâu từ AI.
        </div>
      )}
    </div>
  );
};
