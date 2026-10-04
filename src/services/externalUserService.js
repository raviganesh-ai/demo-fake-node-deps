'use strict';

// External user service that fetches users from jsonplaceholder.typicode.com
// Originally implemented with request-promise; now uses built-in fetch.

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch all users from the external API.
 * Returns a Promise resolving to an array of user objects.
 */
async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    // Preserve a clear error surface while using fetch semantics
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a single user by ID from the external API.
 * @param {number|string} id
 * @returns {Promise<object>}
 */
async function getUserById(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch user ${id}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

module.exports = {
  getUsers,
  getUserById
};
