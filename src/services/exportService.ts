import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Transaction } from '../types';

/**
 * Bài 8: Xuất báo cáo chuyên nghiệp sang định dạng Excel và PDF
 */
export class ExportService {
  public static exportToExcel(transactions: Transaction[], filename = 'Bao_Cao_Tai_Chinh_MoneyVibe.xlsx') {
    const data = transactions.map((t, idx) => ({
      STT: idx + 1,
      'Ngày Giao Dịch': t.date,
      'Loại': t.type === 'income' ? 'Thu nhập' : 'Chi phí',
      'Danh Mục': t.category,
      'Số Tiền (VND)': t.amount,
      'Ghi Chú': t.note,
      'Trạng Thái Đồng Bộ': t.syncStatus === 'synced' ? 'Đã đồng bộ' : t.syncStatus === 'pending' ? 'Chờ đồng bộ' : 'Lỗi',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'GiaoDịch');
    XLSX.writeFile(workbook, filename);
  }

  public static exportToPDF(transactions: Transaction[], filename = 'Bao_Cao_Tai_Chinh_MoneyVibe.pdf') {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('BÁO CÁO QUẢN LÝ CHI TIÊU - MONEYVIBE', 14, 20);

    doc.setFontSize(10);
    doc.text(`Ngày xuất báo cáo: ${new Date().toLocaleDateString('vi-VN')}`, 14, 28);

    const rows = transactions.map((t, idx) => [
      idx + 1,
      t.date,
      t.type === 'income' ? 'Thu' : 'Chi',
      t.category,
      t.amount.toLocaleString('vi-VN') + ' đ',
      t.note || '-',
    ]);

    autoTable(doc, {
      startY: 34,
      head: [['STT', 'Ngày', 'Loại', 'Danh Mục', 'Số Tiền', 'Ghi Chú']],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [22, 163, 74] },
      styles: { fontSize: 9 },
    });

    doc.save(filename);
  }
}
