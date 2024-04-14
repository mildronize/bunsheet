import { AzureTableEntityBase } from "../libs/azure-table";

export interface TransactionCacheEntity extends AzureTableEntityBase {
  /**
   * Rowkey is same value of `id`
   */
  id: string;
  amount: number;
  payee: string;
  category: string;
  account: string;
  date: Date;
  memo: string;
  updatedAt: Date;
}
