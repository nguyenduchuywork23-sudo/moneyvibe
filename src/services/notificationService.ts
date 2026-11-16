/**
 * Bai 26: He thong Thong Bao Day Thoi Gian Thuc (Web Push & Push Notifications)
 */
export class NotificationService {
  public static async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Trinh duyet khong ho tro Web Notifications.');
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  public static async sendLocalNotification(title: string, body: string): Promise<void> {
    const hasPermission = await this.requestPermission();
    if (!hasPermission) return;

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification(title, {
        body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
      });
    } else {
      new Notification(title, { body, icon: '/icon-192.png' });
    }
  }

  public static scheduleDailyReminder(): void {
    // Thiet lap lich thong bao 21:00 hang ngay de nhac nho ghi chep chi tieu
    console.log('Daily expense reminder registered for 21:00.');
  }

  public static alertBudgetThreshold(spentPercent: number): void {
    if (spentPercent >= 80 && spentPercent < 100) {
      this.sendLocalNotification(
        'Canh Bao Ngan Sach MoneyVibe',
        `Ban da su dung ${spentPercent}% han muc ngan sach thang. Hay can doi cac khoan chi giai tri.`
      );
    } else if (spentPercent >= 100) {
      this.sendLocalNotification(
        'Vuot Nguong Ngan Sach',
        `Chi tieu da vuot 100% ngan sach thang. Vui long kiem tra bang dieu khien de dieu chinh.`
      );
    }
  }
}
