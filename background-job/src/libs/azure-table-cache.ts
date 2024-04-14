import { TableEntityQueryOptions } from '@azure/data-tables';
import { AzureTable, AzureTableEntityBase } from './azure-table';
import { TableCacheDataStore, TableCacheOptions, UpdatedStats } from './table-cache';
import dayjs from 'dayjs';

/**
 * Generic Azure Table Cache class
 */
export class AzureTableCache<TEntity extends AzureTableEntityBase> extends TableCacheDataStore {
  constructor(private table: AzureTable<TEntity>, options?: TableCacheOptions) {
    super(options);
  }
/**
 * Update the row in the cache store, if the row is not exists then it will create a new row
 * Otherwise it will update the row when the cache is expired.
 *
 * @param id
 * @param data
 * @returns
 */
  async updateWhenExpired(id: string | AzureTableEntityBase, data: Record<string, unknown>): Promise<UpdatedStats> {
    if (typeof id === 'string') throw new Error('AzureTableCache: id must be an object of AzureTableEntityBase');
    const stats: UpdatedStats = {
      inserted: 0,
      updated: 0,
      skipped: 0,
    };
    const rowTable = await this.getRow(id);
    if (!rowTable) {
      await this.insert({
        ...data,
        ...id,
      });
      stats.inserted++;
    } else {
      const cacheDuration = this.cacheDuration;
      const lastUpdatedField = this.lastUpdatedField;
      let isExipred = false;
      if (rowTable[lastUpdatedField] === undefined) {
        isExipred = true;
      } else {
        isExipred = dayjs(String(rowTable[lastUpdatedField])).isBefore(dayjs().subtract(cacheDuration, 'second'));
      }
      // else if (rowSheet.UpdatedAt === undefined || rowSheet.UpdatedAt === null) {
      //   isExipred = dayjs(String(rowTable[lastUpdatedField])).isBefore(dayjs().subtract(cacheDuration, 'second'));
      // } else {
      //   isExipred = dayjs(String(rowTable[lastUpdatedField])).isBefore(
      //     dayjs(rowSheet.UpdatedAt).subtract(cacheDuration, 'second')
      //   );
      // }
      if (isExipred) {
        await this.update(id, data);
        stats.updated++;
      } else {
        stats.skipped++;
      }
    }
    return stats;
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

  listAllExpiredRows(): AsyncGenerator<Record<string, unknown>, void, unknown> {
    return this.listAllRows({
      filter: `(${this.lastUpdatedField} le datetime'${new Date(
        Date.now() - this.cacheDuration * 1000
      ).toISOString()}')`,
    });
  }

  async *listAllRows(queryOptions?: TableEntityQueryOptions): AsyncGenerator<Record<string, unknown>, void, unknown> {
    const entities = this.table.list(queryOptions);

    for await (const entity of entities) {
      yield entity as unknown as Record<string, unknown>;
    }
  }
}
