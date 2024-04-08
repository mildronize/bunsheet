import type { GoogleSpreadsheet } from "google-spreadsheet";

export interface GoogleSheetDatabaseOption {
  /**
   * The header of the sheet,
   * this will be used to generate the header of the sheet
   */
  headers: readonly string[];
  /**
   * The prefix of the sheet name
   */
  sheetPrefix: string;
}

/**
 * Google Sheet has the following limitations:
 *
 * Up to 10 million cells for spreadsheets that are created in or converted to Google Sheets.
 * 40,000 new rows at a time. Maximum number of columns of 18,278 columns.
 * Number of Tabs: 200 sheets per workbook.
 * Ref: https://workspacetips.io/tips/sheets/google-spreadsheet-limitations/#:~:text=Up%20to%2010%20million%20cells,Tabs%3A%20200%20sheets%20per%20workbook
 *
 * It should be auto neew sheet reach the rows limit per sheet
 *
 */

export class GoogleSheetDatabase {
  constructor(
    protected readonly gsheetService: GoogleSheet,
    protected readonly option: GoogleSheetDatabaseOption
  ) {}

  async appendRows(rows: string[][]) {
    console.log(rows);
    await this.gsheetService.prepareDoc();
  }
}

export class GoogleSheet {
  constructor(public readonly doc: GoogleSpreadsheet) {}

  async prepareDoc(isResetCache = true) {
    await this.doc.loadInfo();
    if (isResetCache) {
      /**
       * Clear local cache to prevent column order change in Google Sheet (Side-effect)
       */
      this.doc.resetLocalCache();
    }
  }
}

export async function createNewSheet(
  doc: GoogleSpreadsheet,
  option: {
    headerValues: string[];
    sheetTitle: string;
  }
) {
  const { headerValues, sheetTitle } = option;
  await doc.loadInfo();
  const sheet = await doc.addSheet({ headerValues, title: sheetTitle });
  doc.resetLocalCache(); // Clear local cache to prevent column order change in Google Sheet (Side-effect)
  await sheet.addRow({
    email: "larry@google.com",
    age: 123,
    name: "Larry Page",
  });
  return {
    sheetIndex: sheet.sheetId,
  };
}

export async function updateExistingSheet(
  doc: GoogleSpreadsheet,
  sheetId: number
) {
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetId];
  doc.resetLocalCache();
  const rows = await sheet.getRows();
  await sheet.addRow({
    email: "larry@google.com",
    age: 123,
    name: "Larry Page",
  });
  return {
    sheetIndex: sheet.sheetId,
    rowCount: rows.length,
  };
}
