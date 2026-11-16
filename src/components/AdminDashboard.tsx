import React from 'react';
import { Server } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-1">
          <Server className="w-5 h-5 text-indigo-600" />
          Bảng Điều Khiển Hệ Thống & Quản Trị (Bài 15)
        </h3>
        <p className="text-xs text-slate-500">Giám sát lưu lượng, rate limit và telemetry thời gian thực</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Hệ Thống Fallback LLM</div>
            <div className="text-xl font-bold text-slate-800 mt-1">99.98% Uptime</div>
            <div className="text-xs text-emerald-600 mt-1">Chính: Gemini 1.5 Flash</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Bảo Vệ Prompt Injection</div>
            <div className="text-xl font-bold text-slate-800 mt-1">0 Vi Phạm</div>
            <div className="text-xs text-slate-500 mt-1">Bộ lọc XML Delimiter đang hoạt động</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Hiệu Quả Semantic Cache</div>
            <div className="text-xl font-bold text-slate-800 mt-1">72.4% Hit Rate</div>
            <div className="text-xs text-indigo-600 mt-1">Cắt giảm 70% chi phí API Token</div>
          </div>
        </div>
      </div>
    </div>
  );
};
