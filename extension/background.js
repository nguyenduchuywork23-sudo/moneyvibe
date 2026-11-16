// Bai 25: Extension Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  console.log('MoneyVibe Extension installed successfully.');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'RECORD_PURCHASE') {
    console.log('Recording purchase to MoneyVibe API:', request.data);
    // Goi API dong bo giao dich ve Supabase
    sendResponse({ success: true, message: 'Giao dich mua sam da duoc ghi nhan.' });
  }
  return true;
});
