import {
  monthlyBudgetSummaryTableCache,
  monthlyBudgetTableCache,
  sheetClient,
  transactionTableCache,
} from '../bootstrap';
import { func } from '../nammatham';
import { MonthlyBudgetCacheService, MonthlyBudgetSummaryCacheService } from '../services/monthly-budget-cache.service';
import { TransactionCacheService } from '../services/transaction-cache.service';

export default func
  .timer('updateCache', {
    /**
     * Every 6 hours update the cache
     */
    schedule: '0 0 */6 * * *',
  })
  .handler(async c => {
    const workers: Promise<void>[] = [];

    workers.push(
      new TransactionCacheService(c.context, sheetClient.transaction, transactionTableCache).updateWhenExpired()
    );
    workers.push(
      new TransactionCacheService(c.context, sheetClient.transaction, transactionTableCache).deleteNonExistentRows()
    );

    workers.push(
      new MonthlyBudgetSummaryCacheService(
        c.context,
        sheetClient.monthlyBudgetSummary,
        monthlyBudgetSummaryTableCache
      ).forceUpdate()
    );

    workers.push(
      new MonthlyBudgetCacheService(c.context, sheetClient.monthlyBudget, monthlyBudgetTableCache).forceUpdate()
    );

    const result = await Promise.allSettled(workers);
    let isError = false;
    const errors: string[] = [];
    for (const res of result) {
      if (res.status === 'rejected') {
        isError = true;
        errors.push(res.reason);
      }
    }
    if (isError) {
      throw new Error(errors.join('\n'));
    }
  });
