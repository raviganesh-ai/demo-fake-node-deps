const axios = require('axios');

/**
 * Sends a notification to the specified endpoint. Previously implemented with
 * callback-style `request`; now implemented with axios while preserving the
 * exported API shape and callback usage.
 *
 * @param {string} url - Notification target URL.
 * @param {object} payload - Notification payload to POST as JSON.
 * @param {function} callback - Node-style callback (err, result).
 */
function sendNotification(url, payload, callback) {
  axios
    .post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      validateStatus: () => true
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        // Preserve behavior of passing the parsed body as the result.
        return callback(null, response.data);
      }

      const error = new Error(`Failed to send notification. Status: ${response.status}`);
      error.statusCode = response.status;
      callback(error);
    })
    .catch((err) => {
      callback(err);
    });
}

module.exports = {
  sendNotification
};
