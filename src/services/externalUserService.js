const axios = require('axios');

const JSON_PLACEHOLDER_BASE_URL = 'https://jsonplaceholder.typicode.com';

async function getExternalUser(userId) {
  // Preserve existing behavior of returning the parsed JSON user object
  // and propagating errors if the upstream call fails.
  const url = `${JSON_PLACEHOLDER_BASE_URL}/users/${encodeURIComponent(userId)}`;

  try {
    const response = await axios.get(url, {
      // Align with typical JSON APIs; axios parses JSON automatically.
      headers: {
        'Accept': 'application/json'
      },
      validateStatus: () => true // handle non-2xx statuses manually if needed
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    const error = new Error(`Failed to fetch external user. Status: ${response.status}`);
    error.statusCode = response.status;
    throw error;
  } catch (err) {
    // Re-throw to let callers/tests handle errors as before.
    throw err;
  }
}

module.exports = {
  getExternalUser
};
