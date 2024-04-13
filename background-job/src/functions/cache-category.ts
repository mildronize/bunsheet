import { GoogleSpreadsheet } from 'google-spreadsheet';
import { func } from '../nammatham';
import { sheetClient, sheetDoc } from '../bootstrap';
import { dateStringTimezone, dateTimeString, dateTimeStringTimezone } from '../libs/dayjs';

export default func
  .httpGet('cacheCategory', {
    authLevel: 'function',
  })
  .handler(async c => {
    const context = c.context;

    // const asyncData = sheetClient.transaction.readAll();

    // const data = [];
    // for await (const item of asyncData) {
    //   data.push(item);
    // }
    // const data = await readRows(sheetDoc, 681580727);
    return c.json({
      // data,
      // length: data.length,
      date: dateStringTimezone(new Date()),
      dateTimezone: dateTimeStringTimezone(new Date()),
      message: 'OK',
    });
  });
