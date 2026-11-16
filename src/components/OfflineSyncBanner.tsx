import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

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
        <span>Ban dang o che do Ngoai tuyen (Offline). Du lieu duoc luu tai Dexie IndexedDB va se tu dong dong bo khi co mang.</span>
      </div>
      <span className="text-[11px] underline">Bai 16: Offline-First</span>
    </div>
  );
};
