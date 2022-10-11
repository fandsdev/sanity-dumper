const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const storage = new Storage({
  projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_STORAGE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY,
  },
});

const bucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME;

async function uploadFile({ fileName, filePath }) {
  await storage.bucket(bucketName).upload(filePath, {
    destination: fileName,
  });
  console.log(`${filePath} uploaded to ${bucketName}`);
}

module.exports = {
  uploadFile,
};
