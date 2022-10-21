const { resolve } = require('node:path');
const { unlink } = require('node:fs/promises');
const { exportDatasetFromSanity } = require('./services/sanity');
const {
  uploadFile,
} = require('./services/storage-providers/google-cloud-storage');

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

module.exports = {
  executeBackup,
};
