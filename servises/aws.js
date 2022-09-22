require('dotenv').config();

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { fromEnv } = require('@aws-sdk/credential-providers');
const { readFileSync } = require('node:fs');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
});

async function uploadFileToS3({ fileName, filePath }) {
  const fileContent = readFileSync(filePath);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
  };

  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    console.log(
      `Successfully created ${params.Key} and uploaded it to ${params.Bucket}/${params.Key}`
    );
    return results;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  uploadFileToS3,
};
