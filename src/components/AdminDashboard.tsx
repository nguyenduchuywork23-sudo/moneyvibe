import React from 'react';
import { Server } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-1">
          <Server className="w-5 h-5 text-indigo-600" />
          Bang Dieu Khien He Thong & Quan Tri (Bai 15)
        </h3>
        <p className="text-xs text-slate-500">Giam sat luu luong, rate limit va telemetry thoi gian thuc</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">He Thong Fallback LLM</div>
            <div className="text-xl font-bold text-slate-800 mt-1">99.98% Uptime</div>
            <div className="text-xs text-emerald-600 mt-1">Primary: Gemini 1.5 Flash</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Bao Ve Prompt Injection</div>
            <div className="text-xl font-bold text-slate-800 mt-1">0 Vi Pham</div>
            <div className="text-xs text-slate-500 mt-1">XML Delimiter active</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Hieu Qua Semantic Cache</div>
            <div className="text-xl font-bold text-slate-800 mt-1">72.4% Hit Rate</div>
            <div className="text-xs text-indigo-600 mt-1">Giam thieu chi phi token</div>
          </div>
        </div>
      </div>
    </div>
  );
};
