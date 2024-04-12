import { GoogleSpreadsheet } from 'google-spreadsheet';
import { func } from '../nammatham';
import { sheetClient, sheetDoc } from '../bootstrap';

// export async function readRows(doc: GoogleSpreadsheet, sheetId: number) {
//   await doc.loadInfo();
//   const sheet = doc.sheetsById[sheetId];
//   doc.resetLocalCache();
//   const rows = await sheet.getRows();
//   const data = [];
//   const headers = [
//     'TableName',
//     'SheetId',
//     'RequiredField',
//     'RowStart',
//     'ColumnLetterStart',
//     'ColumnLetterEnd',
//     'RowCount',
//     'Boolean'
//   ];
//   for (const row of rows) {
//     const obj: Record<string, unknown> = {};
//     for (const header of headers) {
//       obj[header] = row.get(header);
//     }
//     data.push(obj);
//   }
//   return data;
// }

export default func.httpGet('cacheCategory').handler(async c => {
  const context = c.context;

  const data = await sheetClient.transaction.readAll();

  for(const item of data) {
    console.log(item.Memo);
  }
  // const data = await readRows(sheetDoc, 681580727);
  return c.json({
    data,
    length: data.length,
    message: 'OK',
  });
});
