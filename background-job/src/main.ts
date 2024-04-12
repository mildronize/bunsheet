import 'dotenv/config';
import { expressPlugin } from 'nammatham';
import { app } from './nammatham';
import addTransactionQueue from './functions/add-transaction-queue';

app.addFunctions(addTransactionQueue);

const dev = process.env.NODE_ENV === 'development';
app.register(
  expressPlugin({
    dev,
    allowAllFunctionsAccessByHttp: true,
  })
);
app.start();
