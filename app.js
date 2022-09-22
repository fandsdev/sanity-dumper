const { resolve } = require('node:path');
const { unlink } = require('node:fs/promises');
const { exportDatasetFromSanity } = require('./servises/sanity');
const { uploadFileToS3 } = require('./servises/aws');
const { schedule } = require('node-cron');

const fileName = `${new Date().toJSON().slice(0, 10)}.tar.gz`;
const filePath = resolve(__dirname, fileName);

async function executeBackup() {
  try {
    await exportDatasetFromSanity({ filePath });
    await uploadFileToS3({ fileName, filePath });
  } finally {
    unlink(filePath).catch((error) => console.error(error));
  }
}

const task = schedule('* * * * *', () => {
  executeBackup().catch((error) => {
    console.log('error ---> ', error);
  });
});

task.start();
