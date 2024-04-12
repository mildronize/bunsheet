import 'dotenv/config';
import { expressPlugin } from 'nammatham';
import { app } from './nammatham';
import addTransactionQueue from './functions/add-transaction-queue';
import cacheCategory from './functions/cache-category';

app.addFunctions(addTransactionQueue, cacheCategory);

const dev = process.env.NODE_ENV === 'development';
app.register(
  expressPlugin({
    dev,
    allowAllFunctionsAccessByHttp: true,
  })
);
app.start();
