const { resolve } = require('node:path');
const { unlink } = require('node:fs/promises');
const { exportDatasetFromSanity } = require('./servises/sanity');
const {
  uploadFile,
} = require('./servises/storage-providers/google-cloud-storage');
const { schedule } = require('node-cron');
require('dotenv').config();

const generateFileName = () => `${new Date().toJSON()}.tar.gz`;

async function executeBackup() {
  const fileName = generateFileName();
  const filePath = resolve(__dirname, fileName);

  try {
    await exportDatasetFromSanity({ filePath });
    await uploadFile({ fileName, filePath });
  } finally {
    unlink(filePath).catch((error) => console.error(error));
  }
}

let currentRetryNumber = 1;
const maxRetryNumber = Number(process.env.MAX_RETRY_NUMBER) || 5;

const task = schedule(
  process.env.CRON_SCHEDULE_EXPRESSION || '0 0 * * *',
  () => {
    executeBackup().catch((error) => {
      console.error('currentRetryNumber:', currentRetryNumber, '\n', error);
      currentRetryNumber += 1;
      if (currentRetryNumber > maxRetryNumber) process.exit(1);
    });
  }
);

task.start();
