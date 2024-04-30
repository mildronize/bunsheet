import { InvocationContext } from '@azure/functions';
import type { sheetClient } from '../bootstrap';
import { AzureTableCache } from '../libs/azure-table-cache';
import { MonthlyBudgetCacheEntity, MonthlyBudgetSummaryCacheEntity } from '../entities/monthly-budget.entity';
import dayjs from 'dayjs';

export class MonthlyBudgetCacheService {
  constructor(
    public readonly context: InvocationContext,
    public readonly sheet: typeof sheetClient.monthlyBudget,
    public readonly tableCache: AzureTableCache<MonthlyBudgetCacheEntity>
  ) {}
}

export class MonthlyBudgetSummaryCacheService {
  constructor(
    public readonly context: InvocationContext,
    public readonly sheet: typeof sheetClient.monthlyBudgetSummary,
    public readonly tableCache: AzureTableCache<MonthlyBudgetSummaryCacheEntity>
  ) {}

  /**
   * Force update monthly budget summary cache
   *
   * Azure Table will be updated with the latest data from Google Sheet
   * Only 1 row per month will be updated
   *
   * @param monthDate Any date in a month to force update
   */
  async forceUpdate() {
    await this.tableCache.init();
    const sheetDataArray = await this.sheet.readAllArray();
    if (sheetDataArray.length > 1 || sheetDataArray.length === 0) {
      this.context.log('Invalid data found in sheet, expected 1 row, found: ' + sheetDataArray.length);
      return;
    }
    const sheetData = sheetDataArray[0];
    const partitionKey = dayjs(sheetData.FilterMonth).format('YYYY');
    const rowKey = dayjs(sheetData.FilterMonth).format('YYYY-MM');

    const entity: Omit<MonthlyBudgetSummaryCacheEntity, 'partitionKey' | 'rowKey'> = {
      latestUpdate: dayjs(sheetData.LatestUpdate).toDate(),
      startBudgetDate: dayjs(sheetData.StartBudgetDate).toDate(),
      filterMonth: dayjs(sheetData.FilterMonth).toDate(),
      startDate: dayjs(sheetData.StartDate).toDate(),
      endDate: dayjs(sheetData.EndDate).toDate(),
      readyToAssign: sheetData.ReadyToAssign ?? 0,
      totalIncome: sheetData.TotalIncome ?? 0,
      totalAssigned: sheetData.TotalAssigned ?? 0,
      totalActivity: sheetData.TotalActivity ?? 0,
      totalAvailable: sheetData.TotalAvailable ?? 0,
    };
    if (await this.tableCache.getRow({ partitionKey, rowKey })) {
      this.context.log('Updating monthly budget summary cache for month: ' + rowKey);
      await this.tableCache.update(
        {
          partitionKey,
          rowKey,
        },
        entity
      );
    } else {
      this.context.log('Inserting monthly budget summary cache for month: ' + rowKey);
      await this.tableCache.insert({
        partitionKey,
        rowKey,
        ...entity,
      });
    }
    this.context.log('Updated monthly budget summary cache for month: ' + rowKey);
    this.context.debug('Data: ' + JSON.stringify(entity));
  }
}
