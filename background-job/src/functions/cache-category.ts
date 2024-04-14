import { GoogleSpreadsheet } from 'google-spreadsheet';
import { func } from '../nammatham';
import { sheetClient, sheetDoc, transactionCacheTable, transactionTableCache } from '../bootstrap';
import { dateStringTimezone, dateTimeString, dateTimeStringTimezone } from '../libs/dayjs';
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
    }
    for await (const rowSheet of sheetGenerator) {
      const partitionKey = dayjs(rowSheet.Date).format('YYYY');

      context.log('before');
      const rowTable = await transactionTableCache.getRow({
        partitionKey,
        rowKey: rowSheet.Id ?? '',
      });
      if (!rowTable) {
        await transactionTableCache.insert({
          partitionKey,
          rowKey: rowSheet.Id ?? '',
          amount: rowSheet.Amount,
          payee: rowSheet.Payee,
          category: rowSheet.Category,
          account: rowSheet.Account,
          date: rowSheet.Date,
          memo: rowSheet.Memo,
          updatedAt: rowSheet.UpdatedAt,
        });
        stats.inserted++;
      } else {
        const cacheDuration = transactionTableCache.cacheDuration;
        const lastUpdatedField = transactionTableCache.lastUpdatedField;
        let isExipred = false;
        if (rowTable[lastUpdatedField] === undefined) {
          isExipred = true;
        } else if (rowSheet.UpdatedAt === undefined || rowSheet.UpdatedAt === null) {
          isExipred = dayjs(String(rowTable[lastUpdatedField])).isBefore(dayjs().subtract(cacheDuration, 'second'));
        } else {
          isExipred = dayjs(String(rowTable[lastUpdatedField])).isBefore(
            dayjs(rowSheet.UpdatedAt).subtract(cacheDuration, 'second')
          );
        }
        if (isExipred) {
          await transactionTableCache.update(
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
          stats.updated++;
        } else {
          stats.skipped++;
        }
      }
    }
    // }

    return c.json({
      // data,
      // length: data.length,
      // date: dateStringTimezone(new Date()),
      // dateTimezone: dateTimeStringTimezone(new Date()),
      stats,
      message: 'OK',
    });
  });
