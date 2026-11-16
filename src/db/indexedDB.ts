import Dexie, { Table } from 'dexie';
import { Transaction } from '../types';

export interface SyncQueueItem {
  id?: number;
  transactionId: string;
  action: 'insert' | 'update' | 'delete';
  payload: Transaction;
  timestamp: number;
  retryCount: number;
}

export class MoneyVibeDatabase extends Dexie {
  transactions!: Table<Transaction, string>;
  syncQueue!: Table<SyncQueueItem, number>;

  constructor() {
    super('MoneyVibeLocalDB');
    this.version(1).stores({
      transactions: 'id, date, category, type, syncStatus, createdAt',
      syncQueue: '++id, transactionId, action, timestamp, retryCount',
    });
  }
}

export const localDb = new MoneyVibeDatabase();
