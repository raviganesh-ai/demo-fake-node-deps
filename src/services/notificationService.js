'use strict';

// Notification service that sends HTTP POST requests to an external endpoint.
// Originally implemented with request; now uses built-in fetch.

/**
 * Send a notification payload to the configured endpoint.
 * @param {string} url - Target notification URL.
 * @param {object} payload - JSON-serializable payload.
 * @returns {Promise<{status: number, body: any}>}
 */
async function sendNotification(url, payload) {
  if (!url) {
    throw new Error('Notification URL is required');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload || {})
  });

  const text = await response.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch (e) {
    body = text;
  }

  if (!response.ok) {
    const error = new Error(`Failed to send notification: ${response.status} ${response.statusText}`);
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return { status: response.status, body };
}

module.exports = {
  sendNotification
};
