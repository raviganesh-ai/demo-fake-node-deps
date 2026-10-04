"use strict";

const request = require("request");

/**
 * Sends a notification payload to a webhook URL using the deprecated,
 * callback-style `request` package directly (not request-promise), to
 * exercise both styles this legacy codebase actually uses.
 */
function sendNotification(webhookUrl, payload, callback) {
  request(
    {
      method: "POST",
      url: webhookUrl,
      json: true,
      body: payload,
      timeout: 5000,
    },
    (error, response, body) => {
      if (error) {
        return callback(error);
      }
      if (response.statusCode >= 400) {
        return callback(new Error(`Webhook responded with status ${response.statusCode}`));
      }
      return callback(null, body);
    }
  );
}

/**
 * Promise-wrapping convenience around sendNotification for callers that
 * prefer async/await over the raw callback style above.
 */
function sendNotificationAsync(webhookUrl, payload) {
  return new Promise((resolve, reject) => {
    sendNotification(webhookUrl, payload, (error, body) => {
      if (error) {
        return reject(error);
      }
      return resolve(body);
    });
  });
}

module.exports = { sendNotification, sendNotificationAsync };
