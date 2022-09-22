require('dotenv').config();

const createSanityClient = require('@sanity/client');
const exportDataset = require('@sanity/export');

const client = createSanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET_NAME,
  apiVersion: process.env.SANTITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
});

async function exportDatasetFromSanity({ filePath }) {
  try {
    await exportDataset({
      client,
      dataset: process.env.SANITY_DATASET_NAME,
      outputPath: filePath,
      assets: false,
      raw: false,
      drafts: true,
      onProgress: (progressLog) => console.log(progressLog),
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  exportDatasetFromSanity,
};
