import { TableEntityQueryOptions } from '@azure/data-tables';
import { AzureTable, AzureTableEntityBase } from './azure-table';
import { TableCacheDataStore } from './table-cache';

/**
 * Generic Azure Table Cache class
 */
export class AzureTableCache<TEntity extends AzureTableEntityBase> extends TableCacheDataStore {
  constructor(private table: AzureTable<TEntity>) {
    super();
  }

  async update(id: string | AzureTableEntityBase, data: Record<string, unknown>) {
    if (typeof id === 'string') throw new Error('AzureTableCache: id must be an object of AzureTableEntityBase');
    this.table.update({
      partitionKey: id.partitionKey,
      rowKey: id.rowKey,
      ...data,
    } as TEntity);
  }

  async insert(data: Record<string, unknown> | AzureTableEntityBase) {
    this.table.insert(data as TEntity);
  }

  async getRow(id: string | AzureTableEntityBase) {
    // Somehow this code is always throw error even I use try catch
    // return this.table.client.getEntity<TEntity>(id.partitionKey, id.rowKey) as unknown as Record<string, unknown>;
    if (typeof id === 'string') throw new Error('AzureTableCache: id must be an object of AzureTableEntityBase');
    // Using this code instead might be lower performance, but keep the code running
    const result = await this.table.listAll({
      filter: `PartitionKey eq '${id.partitionKey}' and RowKey eq '${id.rowKey}'`,
    });
    if (result.length === 0) return undefined;
    return result[0] as unknown as Record<string, unknown>;
  }

  listAllExpiredRows(cacheDuration: number, lastUpdatedField: string): AsyncGenerator<Record<string, unknown>, void, unknown> {
    return this.listAllRows({
      filter: `(${lastUpdatedField} le datetime'${new Date(Date.now() - cacheDuration * 1000).toISOString()}')`,
    });
  }

  async *listAllRows(queryOptions?: TableEntityQueryOptions): AsyncGenerator<Record<string, unknown>, void, unknown> {
    const entities = await this.table.listAll(queryOptions);

    for await (const entity of entities) {
      yield entity as unknown as Record<string, unknown>;
    }
  }
}
