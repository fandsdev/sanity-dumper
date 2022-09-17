require('dotenv').config();

const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');
const createSanityClient = require('@sanity/client');
const exportDataset = require('@sanity/export');

const tempDir = join(__dirname, '.tmp');
const fileName = `${new Date().toJSON().slice(0, 10)}.tar.gz`;

async function makeDirectory() {
  return await mkdir(tempDir);
}

makeDirectory().catch(console.error);

const client = createSanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '1',
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
});

exportDataset({
  client,
  dataset: 'production',
  outputPath: join(tempDir, fileName),
  assets: true,
  raw: false,
  drafts: true,
});
