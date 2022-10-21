const { schedule } = require('node-cron');
const { executeBackup } = require('./execute-backup');
require('dotenv').config();

function run(cronExpression = '0 0 * * *') {
  schedule(cronExpression, () => {
    executeBackup().catch((error) => {
      console.error(error);
      process.exit(1);
    });
  }).start();
}

module.exports = {
  run,
};
