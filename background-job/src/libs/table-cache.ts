import { TableServiceClient } from '@azure/data-tables';
import { AzureTableEntityBase } from './azure-table';
import { AzureTableCache } from './azure-table-cache';
import { transactionCacheTable } from '../bootstrap';

export abstract class TableCacheDataStore {
  abstract update(id: string, data: Record<string, unknown>): Promise<void>;
  abstract update(id: AzureTableEntityBase, data: Record<string, unknown>): Promise<void>;

  abstract insert(data: Record<string, unknown>): Promise<void>;
  abstract insert(data: AzureTableEntityBase): Promise<void>;

  abstract getRow(id: string): Promise<Record<string, unknown> | undefined>;
  abstract getRow(id: AzureTableEntityBase): Promise<Record<string, unknown> | undefined>;

  async *listAllExpiredRows(
    cacheDuration: number,
    lastUpdatedField: string
  ): AsyncGenerator<Record<string, unknown>, void, unknown> {
    yield {};
  }
}

export interface TableCacheOptions {
  lastUpdatedField?: string;
  /**
   * Cache duration in seconds
   *
   * @default 86400 (Or 1 day)
   */
  cacheDuration?: number;
}

/**
 * Use for store the any table store as a cache store
 *
 * Update the row in the cache store, if the row is not exists then it will create a new row
 * Otherwise it will update the row when the cache is expired.
 */

export class TableCache implements Required<TableCacheOptions> {
  public readonly lastUpdatedField: string;
  public readonly cacheDuration: number;

  constructor(private store: TableCacheDataStore, options?: TableCacheOptions) {
    options = options ?? {};
    this.lastUpdatedField = options.lastUpdatedField ?? 'updatedAt';
    this.cacheDuration = options.cacheDuration ?? 86400;
  }

  async update(id: string, data: Record<string, unknown>): Promise<void>;
  async update(id: AzureTableEntityBase, data: Record<string, unknown>): Promise<void>;
  async update(id: string | AzureTableEntityBase, data: Record<string, unknown>): Promise<void> {
    if (typeof id === 'string') {
      return await this.store.update(id, data);
    }
    return await this.store.update(id, data);
  }

  async insert(data: Record<string, unknown>): Promise<void>;
  async insert(data: AzureTableEntityBase): Promise<void>;
  async insert(data: Record<string, unknown> | AzureTableEntityBase): Promise<void> {
    return this.store.insert(data as Record<string, unknown>);
  }

  async getRow(id: AzureTableEntityBase): Promise<Record<string, unknown> | undefined>;
  async getRow(id: string): Promise<Record<string, unknown> | undefined>;
  async getRow(id: string | AzureTableEntityBase): Promise<Record<string, unknown> | undefined> {
    if (typeof id === 'string') {
      return this.store.getRow(id);
    }
    return this.store.getRow(id);
  }

  listAllExpiredRows() {
    return this.store.listAllExpiredRows(this.cacheDuration, this.lastUpdatedField);
  }
}
