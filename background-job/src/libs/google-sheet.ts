import { GoogleSpreadsheet } from "google-spreadsheet";

/**
 * Type from google-spreadsheet package
 */
type RowCellData = string | number | boolean | Date;
type RawRowData = RowCellData[] | Record<string, RowCellData>;

export async function updateExistingSheet(
  doc: GoogleSpreadsheet,
  sheetId: number,
  row: RawRowData,
) {
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetId];
  doc.resetLocalCache();
  const rows = await sheet.getRows();
  await sheet.addRow(row);
  return {
    rowCount: rows.length,
  };
}
