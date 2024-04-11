import { func } from '../nammatham';

export default func
  .httpGet('manual', {
    authLevel: 'function',
  })
  .handler(async c => {
    return c.text('Triggered');
  });
