import { OCRBillResult } from '../types';

/**
 * Bai 7: "Mat Than" OCR - Quet hoa don tu dong
 */
export class OCRScannerService {
  public static async scanReceiptImage(_file: File): Promise<OCRBillResult> {
    // Gia lap tien trinh OCR tien tien ho tro Multimodal AI
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          merchantName: 'Sieu Thi VinMart / Co.opmart',
          totalAmount: 185000,
          date: new Date().toISOString().split('T')[0],
          suggestedCategory: 'An uong',
          items: [
            { name: 'Sua tuoi tiet trung 1L', price: 38000 },
            { name: 'Rau cu xanh tong hop', price: 47000 },
            { name: 'Thit heo sach 500g', price: 100000 },
          ],
        });
      }, 1200);
    });
  }
}
