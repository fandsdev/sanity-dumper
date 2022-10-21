const axios = require('axios');

async function ping(url) {
  try {
    await axios.get(url, { timeout: 5000 });
    console.log('Healthcheck ping successful');
  } catch (error) {
    console.error('Healthcheck ping failed: ' + error);
  }
}

module.exports = {
  ping,
};
