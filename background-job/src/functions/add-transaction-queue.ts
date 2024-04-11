import { func } from '../nammatham';

export default func
  .storageQueue('addTransactionQueue', {
    connection: 'AzureWebJobsStorage',
    queueName: 'devqueue',
  })
  .handler(async c => {
    console.log('Storage queue function processed work item:', c.trigger);
    const triggerMetadata = c.context.triggerMetadata;
    console.log('Queue metadata:', triggerMetadata);

    // return c.text('Triggered');
  });
