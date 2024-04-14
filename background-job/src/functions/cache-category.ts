import { GoogleSpreadsheet } from 'google-spreadsheet';
import { func } from '../nammatham';
import { sheetClient, sheetDoc, transactionCacheTable, transactionTableCache } from '../bootstrap';
import dayjs from 'dayjs';

export default func
  .httpGet('cacheCategory', {
    authLevel: 'function',
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
      const tempStats = await transactionTableCache.updateWhenExpired(
        {
          partitionKey,
          rowKey: rowSheet.Id ?? '',
        },
        {
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

    return c.json({
      stats,
      message: 'OK',
    });
  });
