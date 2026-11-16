import React, { useState } from 'react';
import { Camera, Check } from 'lucide-react';
import { OCRScannerService } from '../services/ocrScanner';
import { useTransactionStore } from '../store/useTransactionStore';

export const OCRBillScanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [scannedBill, setScannedBill] = useState<any>(null);
  const { addTransaction } = useTransactionStore();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const result = await OCRScannerService.scanReceiptImage(file);
      setScannedBill(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAdd = async () => {
    if (!scannedBill) return;
    await addTransaction({
      amount: scannedBill.totalAmount,
      type: 'expense',
      category: scannedBill.suggestedCategory,
      note: `OCR Hoa Don: ${scannedBill.merchantName}`,
      date: scannedBill.date,
    });
    setScannedBill(null);
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <Camera className="w-4 h-4 text-emerald-600" />
          Mat Than OCR: Quet Hoa Don Tu Dong (Bai 7)
        </h4>
        <label className="cursor-pointer px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition">
          {loading ? 'Dang quet anh...' : 'Tai Anh Hoa Don'}
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {scannedBill && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">{scannedBill.merchantName}</span>
            <span className="font-bold text-emerald-700 text-sm">
              {scannedBill.totalAmount.toLocaleString('vi-VN')} VND
            </span>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            {scannedBill.items.map((item: any, i: number) => (
              <div key={i} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price.toLocaleString('vi-VN')} VND</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleConfirmAdd}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" /> Xac Nhan Ghi So Tu Dong
          </button>
        </div>
      )}
    </div>
  );
};
