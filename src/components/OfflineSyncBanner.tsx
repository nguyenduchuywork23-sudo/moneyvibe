import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineSyncBanner: React.FC = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div className="bg-amber-500 text-white px-4 py-2 text-xs font-medium flex items-center justify-between">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4" />
        <span>Bạn đang ở chế độ Ngoại tuyến (Offline). Dữ liệu được lưu tại Dexie IndexedDB và sẽ tự động đồng bộ khi có mạng.</span>
      </div>
      <span className="text-[11px] underline">Bài 16: Offline-First</span>
    </div>
  );
};
