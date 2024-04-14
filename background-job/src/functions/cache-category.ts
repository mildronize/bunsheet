import { func } from '../nammatham';
import { sheetClient, transactionCacheTable, transactionTableCache } from '../bootstrap';
import dayjs from 'dayjs';

export default func
  .timer('cacheTransaction', {
    /**
     * Every day at midnight UTC+0
     */
    schedule: '0 0 * * *'
  })
  .handler(async c => {
    const context = c.context;

    const sheetGenerator = sheetClient.transaction.readAll();
    await transactionCacheTable.createTable();
    const stats = {
      inserted: 0,
      updated: 0,
      skipped: 0,
    };

    for await (const rowSheet of sheetGenerator) {
      const partitionKey = dayjs(rowSheet.Date).format('YYYY');
      if(!rowSheet.Id) {
        stats.skipped++;
        context.log('Skipping row without Id: ' + JSON.stringify(rowSheet));
        continue;
      }
      const tempStats = await transactionTableCache.updateWhenExpired(
        {
          partitionKey,
          rowKey: rowSheet.Id,
        },
        {
          id: rowSheet.Id,
          amount: rowSheet.Amount,
          payee: rowSheet.Payee,
          category: rowSheet.Category,
          account: rowSheet.Account,
          date: rowSheet.Date,
          memo: rowSheet.Memo,
          updatedAt: rowSheet.UpdatedAt,
        }
      );
      stats.inserted += tempStats.inserted;
      stats.updated += tempStats.updated;
      stats.skipped += tempStats.skipped;
    }

    context.log('Stats: ' + JSON.stringify(stats));
  });
