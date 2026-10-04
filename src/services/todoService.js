'use strict';

// Todo service that fetches todo items from jsonplaceholder.typicode.com
// Originally implemented with request-promise; now uses built-in fetch.

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch all todos.
 * @returns {Promise<Array<object>>}
 */
async function getTodos() {
  const response = await fetch(`${BASE_URL}/todos`);

  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch todos for a specific user.
 * @param {number|string} userId
 * @returns {Promise<Array<object>>}
 */
async function getTodosByUser(userId) {
  const response = await fetch(`${BASE_URL}/todos?userId=${encodeURIComponent(userId)}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch todos for user ${userId}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

module.exports = {
  getTodos,
  getTodosByUser
};
