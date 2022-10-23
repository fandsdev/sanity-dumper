const { ping } = require('./health-check');
const { schedule } = require('node-cron');
const { executeBackup } = require('./execute-backup');
require('dotenv').config();

function run(cronExpression = '0 0 * * *') {
  schedule(cronExpression, async () => {
    try {
      const pingUrl = process.env.HEALTHCHECKS_URL;

      await executeBackup();
      await ping(pingUrl);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }).start();
}

module.exports = {
  run,
};
