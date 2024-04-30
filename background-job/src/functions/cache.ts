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
    // await new TransactionCacheService(c.context, sheetClient.transaction, transactionTableCache).updateWhenExpired();
    // await new TransactionCacheService(
    //   c.context,
    //   sheetClient.transaction,
    //   transactionTableCache
    // ).deleteNonExistentRows();

    // await new MonthlyBudgetSummaryCacheService(
    //   c.context,
    //   sheetClient.monthlyBudgetSummary,
    //   monthlyBudgetSummaryTableCache
    // ).forceUpdate();

    await new MonthlyBudgetCacheService(c.context, sheetClient.monthlyBudget, monthlyBudgetTableCache).forceUpdate();
  });
