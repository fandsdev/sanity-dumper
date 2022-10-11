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
  await exportDataset({
    client,
    dataset: process.env.SANITY_DATASET_NAME,
    outputPath: filePath,
    assets: Boolean(process.env.SANITY_NEED_EXPORT_ASSETS),
    raw: false,
    drafts: Boolean(process.env.SANITY_NEED_EXPORT_DRAFTS),
    onProgress: process.env.SANITY_NEED_PROCESS_LOGING
      ? (progressLog) => console.log(progressLog)
      : '',
  });
}

module.exports = {
  exportDatasetFromSanity,
};
