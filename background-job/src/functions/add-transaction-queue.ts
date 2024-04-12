import { z } from 'zod';
import { func } from '../nammatham';
import { dateStringTimezone, dateTimeStringTimezone } from '../libs/dayjs';
import { updateExistingSheet } from '../libs/google-sheet';
import { sheetDoc } from '../bootstrap';
import { env } from '../env';

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
    Date: data.date ? dateStringTimezone(data.date) : '',
    Memo: data.memo ?? '',
    CreatedAt: dateTimeStringTimezone(new Date()),
  };
}

export default func
  .storageQueue('addTransactionQueue', {
    connection: 'AzureWebJobsStorage',
    queueName: 'budgetqueue',
  })
  .handler(async c => {
    const contex = c.context;
    contex.log('Storage queue function processed work item:', c.trigger);
    const triggerMetadata = c.context.triggerMetadata;
    contex.log('Queue metadata (dequeueCount):', triggerMetadata?.dequeueCount);
    contex.log('Queue metadata (insertionTime):', triggerMetadata?.insertionTime);
    contex.log('Queue metadata (expirationTime):', triggerMetadata?.expirationTime);
    const data = transactionPostSchema.parse(c.trigger);
    const googleSheetData = parseTransactionToGoogleSheet(data);
    contex.log('Parsed data:', googleSheetData);
    await updateExistingSheet(sheetDoc, env.GSHEET_SHEET_TRANSACTION_SHEET_ID, googleSheetData as any);
  });
