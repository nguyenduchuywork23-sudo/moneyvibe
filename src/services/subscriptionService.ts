/**
 * Bai 28: Quan ly Goi Thu Phi Dinh Ky (Subscriptions: Free / Pro / Family)
 */
export type SubscriptionTier = 'free' | 'pro' | 'family';

export interface PlanFeature {
  tier: SubscriptionTier;
  title: string;
  priceMonthly: number;
  currency: string;
  features: string[];
}

export const SUBSCRIPTION_PLANS: PlanFeature[] = [
  {
    tier: 'free',
    title: 'Goi Co Ban (Free)',
    priceMonthly: 0,
    currency: 'VND',
    features: [
      'Toi da 50 giao dich moi thang',
      'Luu tru Offline-first IndexedDB',
      'Xuat bao cao co ban Excel',
      '10 luot co van AI moi thang',
    ],
  },
  {
    tier: 'pro',
    title: 'Goi Chuyen Nghiep (Pro)',
    priceMonthly: 79000,
    currency: 'VND',
    features: [
      'Khong gioi han so luong giao dich',
      'He thong Multi-LLM khong gioi han (Gemini, Claude, GPT)',
      'Quet hoa don OCR bang camera',
      'Dong bo Bot Telegram khong gioi han',
      'Bao cao chuyen sau PDF & Excel',
    ],
  },
  {
    tier: 'family',
    title: 'Goi Gia Dinh (Family Vault)',
    priceMonthly: 149000,
    currency: 'VND',
    features: [
      'Day du tinh nang cua goi Pro',
      'Ho tro toi da 5 thanh vien cung quan ly vi tien',
      'Phan quyen Row Level Security (RLS) theo nhom',
      'Thong bao thoi gian thuc khi co thanh vien phat sinh chi tieu',
    ],
  },
];

export class SubscriptionService {
  public static async redirectToCheckout(tier: SubscriptionTier): Promise<void> {
    if (tier === 'free') {
      alert('Ban dang su dung goi mien phi.');
      return;
    }
    console.log(`Initiating Stripe / Lemon Squeezy checkout session for tier: ${tier}`);
    // Xu ly tao Checkout Session qua Supabase Edge Function
  }
}
