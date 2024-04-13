
/**
 * Use for store the any table store as a cache store
 */

export class TableCache {
  constructor(private store: TableCacheDataStore) {}

  async update(id: string, data: Record<string, unknown>) {
    return this.store.update(id, data);
  }
}

export interface TableCacheDataStore {
  update(id: string, data: Record<string, unknown>): Promise<void>;
}
