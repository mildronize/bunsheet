import { z } from 'zod';
import { func } from '../nammatham';
import { dateString, dateStringTimezone, dateTimeString, dateTimeStringTimezone } from '../libs/dayjs';
import { sheetClient } from '../bootstrap';

const transactionPostSchema = z.object({
  type: z.enum(['add_transaction_queue']),
  amount: z.number(),
  payee: z.string().nullable(),
  category: z.string().nullable(),
  account: z.string().nullable(),
  date: z.string().datetime().nullable(),
  memo: z.string().nullable(),
});

export interface GsheetTransactionModel {
  Amount: number;
  Payee: string;
  Category: string;
  Account: string;
  Date: string;
  Memo: string;
  CreatedAt: string;
}

function parseTransactionToGoogleSheet(data: z.infer<typeof transactionPostSchema>): GsheetTransactionModel {
  return {
    /**
     * Transaction amount is negative, however,
     * we need to store it as positive for better experience while using only google sheet
     */
    Amount: parseFloat(data.amount.toFixed(2)) * -1,
    Payee: data.payee ?? '',
    Category: data.category ?? '',
    Account: data.account ?? '',
    Date: data.date ? dateString(data.date) : '',
    Memo: data.memo ?? '',
    CreatedAt: dateTimeString(new Date()),
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
  });
