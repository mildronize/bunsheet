import { sheetClient, transactionTableCache } from '../bootstrap';
import { func } from '../nammatham';
import { TransactionCacheService } from '../services/transaction-cache.service';

export default func
  .timer('updateCache', {
    /**
     * Every 6 hours update the cache
     */
    schedule: '0 0 */6 * * *',
  })
  .handler(async c => {
    await new TransactionCacheService(c.context, sheetClient, transactionTableCache).updateWhenExpired();
    await new TransactionCacheService(c.context, sheetClient, transactionTableCache).deleteNonExistentRows();
  });
