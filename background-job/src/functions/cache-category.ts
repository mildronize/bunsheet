import { GoogleSpreadsheet } from 'google-spreadsheet';
import { func } from '../nammatham';
import { sheetClient, sheetDoc } from '../bootstrap';

export default func.httpGet('cacheCategory').handler(async c => {
  const context = c.context;

  const data = await sheetClient.transaction.readAll();

  for(const item of data) {
    console.log(item);
  }
  // const data = await readRows(sheetDoc, 681580727);
  return c.json({
    data,
    length: data.length,
    message: 'OK',
  });
});
