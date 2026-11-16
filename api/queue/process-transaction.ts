// Bai 19: Serverless Queue Handler (Upstash Redis & QStash)

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { transactionId, payload } = req.body;

  try {
    console.log(`Processing asynchronous queue job for transaction: ${transactionId}`);
    // Xu ly tac vu nang: Phan tich OCR, thong bao Telegram, trigger AI phan tich
    return res.status(200).json({ success: true, processedId: transactionId });
  } catch (error) {
    console.error('Queue job failed:', error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
