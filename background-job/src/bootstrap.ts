import { env } from './env';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { GoogleSheetRowClient } from './libs/google-sheet';
import { TableClient } from '@azure/data-tables';
import { AzureTable } from './libs/azure-table';
import { TransactionCacheEntity } from './entities/transaction.entity';
import { TableCache } from './libs/table-cache';
import { AzureTableCache } from './libs/azure-table-cache';

/**
 * Google Sheet Service
 */

const serviceAccountAuth = new JWT({
  email: env.GSHEET_CLIENT_EMAIL,
  key: env.GSHEET_PRIVATE_KEY,
  /**
   * Authentication Scope, read more: https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=auth-scopes
   */
  scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'],
});

export const sheetDoc = new GoogleSpreadsheet(env.GSHEET_SPREADSHEET_ID, serviceAccountAuth);

const commonOptions = {
  pageSize: env.GSHEET_PAGE_SIZE,
  skipRowKeyword: env.GSHEET_SKIP_ROW_KEYWORD,
};

export const sheetClient = {
  transaction: new GoogleSheetRowClient(sheetDoc, env.GSHEET_SHEET_TRANSACTION_SHEET_ID, {
    ...commonOptions,
    headers: {
      Id: 'string',
      Amount: 'number',
      Payee: 'string',
      Category: 'string',
      Account: 'string',
      Date: 'date',
      Memo: 'string',
      UpdatedAt: 'date',
    },
  }),
};

/**
 * Azure Table Service
 */
const transactionCacheTableClient = TableClient.fromConnectionString(env.AzureWebJobsStorage, env.AZURE_STORAGE_TABLE_TRANSACTION_CACHE_TABLE_NAME);
export const transactionCacheTable = new AzureTable<TransactionCacheEntity>(transactionCacheTableClient);

export const transactionTableCache = new TableCache(new AzureTableCache(transactionCacheTable), {
  /**
   * Default field in Azure Table
   */
  lastUpdatedField: 'timestamp',
});
