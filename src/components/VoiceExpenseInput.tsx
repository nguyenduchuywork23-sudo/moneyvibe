import React, { useState } from 'react';
import { Mic, MicOff, Sparkles } from 'lucide-react';
import { useTransactionStore } from '../store/useTransactionStore';
import { Category } from '../types';

/**
 * Bài 5: Ghi chép chi tiêu bằng giọng nói (Web Speech API)
 */
export const VoiceExpenseInput: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { addTransaction } = useTransactionStore();

  const handleStartListening = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      await parseAndSaveVoiceInput(text);
    };

    recognition.start();
  };

  const parseAndSaveVoiceInput = async (rawText: string) => {
    const match = rawText.match(/(\d+)\s*(k|nghìn|ngàn|triệu)?/i);
    let amount = 50000;
    if (match) {
      let num = parseInt(match[1]);
      const unit = (match[2] || '').toLowerCase();
      if (unit === 'k' || unit === 'nghìn' || unit === 'ngàn') num *= 1000;
      if (unit === 'triệu') num *= 1000000;
      amount = num;
    }

    let category: Category = 'Ăn uống';
    if (rawText.toLowerCase().includes('xăng') || rawText.toLowerCase().includes('xe')) category = 'Đi lại';
    if (rawText.toLowerCase().includes('thuốc') || rawText.toLowerCase().includes('khám')) category = 'Sức khỏe';

    await addTransaction({
      amount,
      type: 'expense',
      category,
      note: `Ghi âm: "${rawText}"`,
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Ghi Chép Giao Dịch Bằng Giọng Nói (Bài 5)
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          {transcript ? `Đã nhận diện: "${transcript}"` : 'Nhấn để nói: "Chi 45 nghìn ăn phở trưa"'}
        </p>
      </div>

      <button
        onClick={handleStartListening}
        className={`p-3 rounded-full transition ${
          isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-600 text-white hover:bg-emerald-700'
        }`}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>
    </div>
  );
};
