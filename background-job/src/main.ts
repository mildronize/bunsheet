import 'dotenv/config';
import { expressPlugin } from 'nammatham';
import { app, func } from './nammatham';
import addTransactionQueue from './functions/handle-transaction-queue';
import cacheFunction from './functions/cache';
import resetCache from './functions/reset-cache';
import negotiateSignalr from './functions/negotiate-signalr';

app.addFunctions(
  addTransactionQueue,
  cacheFunction,
  resetCache,
  negotiateSignalr,
  func.httpGet('test').handler(c => c.text('Hello World'+ ' ' ))
);

const dev = process.env.NODE_ENV === 'development';
app.register(
  expressPlugin({
    port: 4000,
    dev,
    allowAllFunctionsAccessByHttp: true,
  })
);
app.start();
