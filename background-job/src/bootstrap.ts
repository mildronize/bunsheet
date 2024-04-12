import { env } from './env';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { GoogleSheetRowClient } from './libs/google-sheet';

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
