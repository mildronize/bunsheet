import 'dotenv/config';
import { expressPlugin } from 'nammatham';
import { app } from './nammatham';
import addTransactionQueue from './functions/handle-transaction-queue';
import cacheFunction from './functions/cache';

app.addFunctions(addTransactionQueue, cacheFunction);

const dev = process.env.NODE_ENV === 'development';
app.register(
  expressPlugin({
    port: 4000,
    dev,
    allowAllFunctionsAccessByHttp: true,
  })
);
app.start();
