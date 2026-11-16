import { OCRBillResult } from '../types';

/**
 * Bài 7: Mắt Thần OCR - Quét hóa đơn tự động
 */
export class OCRScannerService {
  public static async scanReceiptImage(_file: File): Promise<OCRBillResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          merchantName: 'Siêu Thị VinMart / Co.opmart',
          totalAmount: 185000,
          date: new Date().toISOString().split('T')[0],
          suggestedCategory: 'Ăn uống',
          items: [
            { name: 'Sữa tươi tiệt trùng 1L', price: 38000 },
            { name: 'Rau củ xanh hữu cơ', price: 47000 },
            { name: 'Thịt heo sạch 500g', price: 100000 },
          ],
        });
      }, 1200);
    });
  }
}
