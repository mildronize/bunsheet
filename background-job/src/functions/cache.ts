import { sheetClient, transactionTableCache } from '../bootstrap';
import { func } from '../nammatham';
import { CacheService } from '../services/cache.service';

export default func
  .timer('updateCache', {
    /**
     * Every day at 00:00
     */
    schedule: '0 0 * * *',
  })
  .handler(async c => {
    await new CacheService(c.context, sheetClient, transactionTableCache).updateWhenExpired();
    await new CacheService(c.context, sheetClient, transactionTableCache).deleteNonExistentRows();
  });
