import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Transaction } from '../types';

/**
 * Bai 8: Xuat bao cao chuyen nghiep Excel va PDF
 */
export class ExportService {
  public static exportToExcel(transactions: Transaction[], filename = 'Bao_Cao_Tai_Chinh_MoneyVibe.xlsx') {
    const data = transactions.map((t, idx) => ({
      STT: idx + 1,
      'Ngay Giao Dich': t.date,
      'Loai': t.type === 'income' ? 'Thu nhap' : 'Chi phi',
      'Danh Muc': t.category,
      'So Tien (VND)': t.amount,
      'Ghi Chu': t.note,
      'Trang Thai Dong Bo': t.syncStatus,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'GiaoDich');
    XLSX.writeFile(workbook, filename);
  }

  public static exportToPDF(transactions: Transaction[], filename = 'Bao_Cao_Tai_Chinh_MoneyVibe.pdf') {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('BAO CAO QUAN LY CHI TIEU - MONEYVIBE', 14, 20);

    doc.setFontSize(10);
    doc.text(`Ngay xuat: ${new Date().toLocaleDateString('vi-VN')}`, 14, 28);

    const rows = transactions.map((t, idx) => [
      idx + 1,
      t.date,
      t.type === 'income' ? 'Thu' : 'Chi',
      t.category,
      t.amount.toLocaleString('vi-VN') + ' d',
      t.note || '-',
    ]);

    autoTable(doc, {
      startY: 34,
      head: [['STT', 'Ngay', 'Loai', 'Danh Muc', 'So Tien', 'Ghi Chu']],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [22, 163, 74] },
      styles: { fontSize: 9 },
    });

    doc.save(filename);
  }
}
