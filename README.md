# MoneyVibe - He Thong Quan Ly Tai Chinh & Chi Tieu Thong Minh

> Ma nguon du an thuc chien xuyen suot chuoi bai viet **"Vibe Coding Tu Con So 0"**  
> Tac gia: **Nguyen Duc Huy**  
> Kenh xuat ban: [nguynchuy1.substack.com](https://nguynchuy1.substack.com)

---

## 1. Gioi Thieu Du An

**MoneyVibe** la ung dung quan ly tai chinh ca nhan toan dien duoc xay dung hoan toan theo triet ly **Vibe Coding** — phuong thuc lap trinh hien dai ket hop chat che giua tu duy nguoi dieu hanh va nang luc cua cac mo hinh tri tue nhan tao (Gemini, Claude, GPT).

Ung dung duoc phat trien tu con so 0, nang cap lien tuc qua tung bai viet de giai quyet cac bai toan thuc te:
- Nhap lieu sieu toc: Ho tro ghi am giong noi tieng Viet va quet hoa don thong minh OCR.
- Offline-First Architecture: Su dung Dexie.js (IndexedDB) giup luu tru ngay ca khi mat mang va tu dong dong bo hai chieu khi co ket noi internet.
- Multi-LLM Fallback Engine: He thong co van tai chinh tu dong chuyen mach du phong 3 tang (Gemini 1.5 -> Claude 3.5 Sonnet -> GPT-4o-mini), dam bao he thong khong bao gio bi gian doan.
- An ninh da lop: Co che phong ve Prompt Injection bang the phan tach XML Delimiter va Rate Limiting.
- Tich hop tu dong hoa: Webhook ket noi Bot Telegram (@BotFather) ghi so truc tiep tu tin nhan dien thoai.
- Bao cao da kenh: Xuat du lieu linh hoat sang dinh dang Excel (SheetJS) va PDF (jsPDF).

---

## 2. Bang Anh Xa Ma Nguon Theo Tung Bai Viet Trong Series

Chuoi series gom 35 bai viet chuyen sau. Duoi day la danh muc doi chieu chi tiet giua cac bai viet da xuat ban va module ma nguon tuong ung:

| Bai viet | Chu de chuyen mon | File ma nguon / Module thuc thi |
|:---|:---|:---|
| **Bai 1** | Tu duy nguoi dieu hanh & Prompt Engineering | `README.md`, `src/types/index.ts` |
| **Bai 2** | Thiet lap phong thi nghiem local (VS Code & IDE) | `vite.config.ts`, `tailwind.config.js`, `tsconfig.json` |
| **Bai 3** | Logic tuong tac du lieu & Debug F12 DevTools | `src/store/useTransactionStore.ts` |
| **Bai 4** | Deploy Vercel & Supabase Cloud PostgreSQL | `src/lib/supabaseClient.ts`, `supabase/schema.sql` |
| **Bai 5** | PWA Mobile & Web Speech API Tieng Viet | `public/manifest.json`, `src/components/VoiceExpenseInput.tsx` |
| **Bai 6** | Co van tai chinh AI voi Gemini Structured JSON | `src/services/aiAdvisor.ts`, `src/components/AIAdvisorCard.tsx` |
| **Bai 7** | Mat than OCR: Quet hoa don camera | `src/services/ocrScanner.ts`, `src/components/OCRBillScanner.tsx` |
| **Bai 8** | Xuat bao cao Excel (SheetJS) & PDF (jsPDF) | `src/services/exportService.ts` |
| **Bai 9** | Supabase Auth & Vi tien gia dinh (RLS) | `supabase/schema.sql` |
| **Bai 10** | Refactoring sach se & Lazy Loading duoi 0.5s | `src/App.tsx`, `src/main.tsx` |
| **Bai 11** | Hoat hoa Framer Motion & Gamification | `src/components/Dashboard.tsx` |
| **Bai 12** | Tu dong hoa Webhook & Bot Telegram | `supabase/functions/telegram-webhook/index.ts` |
| **Bai 13** | Dong goi SaaS, ten mien rieng & VietQR | `src/types/index.ts`, `src/components/Dashboard.tsx` |
| **Bai 14** | Ambient AI: Du bao toc do dot tien & ngay can tien | `src/store/useTransactionStore.ts` |
| **Bai 15** | Admin Dashboard & Hop den bat loi (Audit Logs) | `src/components/AdminDashboard.tsx`, `supabase/schema.sql` |
| **Bai 16** | Offline-First Dexie.js & Sync Queue 0.01s | `src/db/indexedDB.ts`, `src/components/OfflineSyncBanner.tsx` |
| **Bai 17** | Playwright E2E Testing & GitHub Actions CI/CD | `playwright.config.ts`, `tests/e2e/moneyvibe.spec.ts`, `.github/workflows/ci.yml` |
| **Bai 18** | Chien luoc Launch Product Hunt & Landing Page | `public/manifest.json`, `index.html` |
| **Bai 19** | Xu ly bat dong bo voi Upstash Redis & QStash Queue | `api/queue/process-transaction.ts` |
| **Bai 20** | Semantic Cache & Prompt Caching tiet kiem 70% token | `src/services/semanticCache.ts` |
| **Bai 21** | An ninh Prompt Injection & XML Delimiter Defense | `src/services/securitySanitizer.ts` |
| **Bai 22** | Quan tri State ben vung voi Zustand & TanStack Query | `src/store/useTransactionStore.ts` |
| **Bai 23** | Multi-LLM Fallback Engine (Gemini, Claude, GPT) | `src/services/multiLlmFallback.ts`, `src/components/AIAdvisorCard.tsx` |

*Ghi chu: Cac bai tiep theo tu Bai 24 den Bai 35 (Capacitor Mobile, Extension, Autonomous Agents, RAG, AIOps) se tiep tuc duoc cap nhat vao repository nay theo tien do xuat ban.*

---

## 3. Cong Nghe Su Dung (Tech Stack)

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons.
- **State Management:** Zustand (Client State), TanStack Query (Server State).
- **Offline Storage:** Dexie.js (IndexedDB wrapper).
- **Backend & Database:** Supabase (PostgreSQL, Row Level Security, Edge Functions).
- **AI Core:** Google Gemini 1.5 API, Anthropic Claude API, OpenAI API via Multi-LLM Switcher.
- **Caching & Queue:** Upstash Redis, Upstash QStash.
- **Reporting:** SheetJS (XLSX), jsPDF, jsPDF-AutoTable.
- **Testing & CI/CD:** Playwright E2E, GitHub Actions.

---

## 4. Huong Dan Cai Dat & Chay Du An

### Buoc 1: Clone Repository
```bash
git clone https://github.com/nguyenduchuywork23-sudo/moneyvibe.git
cd moneyvibe
```

### Buoc 2: Cai dat thu vien phu thuoc
```bash
npm install
```

### Buoc 3: Cau hinh bien moi truong
Tao file `.env` tu file mau `.env.example`:
```bash
cp .env.example .env
```
Dien cac khoa API tuong ung (Supabase URL, Gemini API Key,...).

### Buoc 4: Khoi chay may chu phat trien (Local Dev Server)
```bash
npm run dev
```
Truy cap trinh duyet tai dia chi: `http://localhost:3000`

### Buoc 5: Chay kiem thu tu dong (Playwright E2E)
```bash
npm run test:e2e
```

---

## 5. Giay Phep (License)
Du an phat hanh duoi giay phep MIT License. Tu do su dung cho muc dich hoc tap, nghien cuu va phat trien san pham ca nhan.
