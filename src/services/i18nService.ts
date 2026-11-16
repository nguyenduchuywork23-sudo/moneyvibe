/**
 * Bai 27: Quoc te hoa san pham (i18n) & Ty gia hoi doai da tien te
 */
export type SupportedLanguage = 'vi' | 'en' | 'ja';
export type SupportedCurrency = 'VND' | 'USD' | 'JPY';

export interface CurrencyRate {
  [currency: string]: number; // Ty gia quy doi ve VND
}

export const EXCHANGE_RATES: CurrencyRate = {
  VND: 1,
  USD: 25400,
  JPY: 165,
};

export class I18nService {
  private static currentLang: SupportedLanguage = 'vi';
  private static currentCurrency: SupportedCurrency = 'VND';

  public static setLanguage(lang: SupportedLanguage) {
    this.currentLang = lang;
  }

  public static setCurrency(cur: SupportedCurrency) {
    this.currentCurrency = cur;
  }

  public static formatMoney(amountVND: number, targetCurrency: SupportedCurrency = this.currentCurrency): string {
    const rate = EXCHANGE_RATES[targetCurrency] || 1;
    const converted = amountVND / rate;

    return new Intl.NumberFormat(this.currentLang === 'vi' ? 'vi-VN' : this.currentLang === 'ja' ? 'ja-JP' : 'en-US', {
      style: 'currency',
      currency: targetCurrency,
      maximumFractionDigits: targetCurrency === 'VND' || targetCurrency === 'JPY' ? 0 : 2,
    }).format(converted);
  }

  public static formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat(this.currentLang === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d);
  }
}
