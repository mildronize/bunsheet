import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';

/**
 * Type from google-spreadsheet package
 */
type RowCellData = string | number | boolean | Date;
type RawRowData = RowCellData[] | Record<string, RowCellData>;

// export async function updateExistingSheet(doc: GoogleSpreadsheet, sheetId: number, row: RawRowData) {
//   await doc.loadInfo();
//   const sheet = doc.sheetsById[sheetId];
//   doc.resetLocalCache();
//   const rows = await sheet.getRows();
//   await sheet.addRow(row);
//   return {
//     rowCount: rows.length,
//   };
// }

export interface GoogleSheetRowClientOptions<Headers extends string> {
  pageSize: number;
  headers: Headers[];
  skipRowKeyword?: string;
}

/**
 * Google Sheet Row Client
 *
 * TODO: Type-safe Later
 */
export class GoogleSheetRowClient<Headers extends string> {
  private sheet!: GoogleSpreadsheetWorksheet;
  constructor(private doc: GoogleSpreadsheet, private sheetId: number, private options: GoogleSheetRowClientOptions<Headers>) {}

  async prepare() {
    await this.doc.loadInfo();
    this.sheet = this.doc.sheetsById[this.sheetId];
    if (this.sheet === undefined || this.sheet === null) {
      throw new Error(`Sheet with id ${this.sheetId} not found`);
    }
    this.doc.resetLocalCache();
  }

  async append(row: Record<Headers, unknown>) {
    await this.prepare();
    const rows = await this.sheet.getRows();
    await this.sheet.addRow(row as RawRowData);
    return {
      rowCount: rows.length,
    };
  }

  // TODO: Refactor to AsyncGenerator later

  async readAll() {
    await this.prepare();
    const data = [];
    let isLoop = true;
    let offset = 0;
    while (isLoop) {
      const rows = await this.sheet.getRows({
        offset,
        limit: this.options.pageSize,
      });
      for (const row of rows) {
        const obj: Record<string, unknown> = {};
        let isSkip = false;
        for (const header of this.options.headers) {
          const cellValue = row.get(header);
          if (cellValue === this.options.skipRowKeyword) {
            isSkip = true;
            break;
          }
          obj[header] = cellValue;
        }
        if (isSkip) {
          continue;
        }
        data.push(obj);
      }
      offset += this.options.pageSize;
      if (rows.length < this.options.pageSize) {
        isLoop = false;
      }
    }
    return data as Record<Headers, string>[];
  }
}
