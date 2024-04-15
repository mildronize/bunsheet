import { z } from 'zod';
import { func } from '../nammatham';
import { dateString, dateStringTimezone, dateTimeString, dateTimeStringTimezone } from '../libs/dayjs';
import { sheetClient, transactionTableCache } from '../bootstrap';
import { v4 as uuid } from 'uuid';
import { CacheService } from '../services/cache.service';

const transactionPostSchema = z.object({
  type: z.enum(['add_transaction_queue']),
  id: z.string().optional().nullable(),
  amount: z.number().optional().nullable(),
  payee: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  account: z.string().optional().nullable(),
  date: z.string().datetime().optional().nullable(),
  memo: z.string().optional().nullable(),
});

export interface GsheetTransactionModel {
  Id: string;
  Amount: number;
  Payee: string;
  Category: string;
  Account: string;
  Date: string;
  Memo: string;
  UpdatedAt: string;
}

function parseTransactionToGoogleSheet(data: z.infer<typeof transactionPostSchema>): GsheetTransactionModel {
  return {
    /**
     * Transaction amount is negative, however,
     * we need to store it as positive for better experience while using only google sheet
     */
    Id: data.id ? data.id : uuid(),
    Amount: data.amount ? parseFloat(data.amount.toFixed(2)) * -1 : 0,
    Payee: data.payee ?? '',
    Category: data.category ?? '',
    Account: data.account ?? '',
    Date: data.date ? dateStringTimezone(data.date) : '',
    Memo: data.memo ?? '',
    UpdatedAt: dateTimeStringTimezone(new Date()),
  };
}

export default func
  .storageQueue('addTransactionQueue', {
    connection: 'AzureWebJobsStorage',
    queueName: 'budgetqueue',
  })
  .handler(async c => {
    const context = c.context;
    context.log('Storage queue function processed work item:', c.trigger);
    const triggerMetadata = c.context.triggerMetadata;
    context.log('Queue metadata (dequeueCount):', triggerMetadata?.dequeueCount);
    const data = transactionPostSchema.parse(c.trigger);
    const googleSheetData = parseTransactionToGoogleSheet(data);
    context.log('Parsed data:', googleSheetData);
    await sheetClient.transaction.append(googleSheetData);
    context.log('Transaction added to google sheet');
    await new CacheService(c.context, sheetClient, transactionTableCache).updateWhenExpired('insertOnly');
    context.log('Cache updated');
  });
