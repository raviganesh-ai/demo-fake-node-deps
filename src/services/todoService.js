const axios = require('axios');

const JSON_PLACEHOLDER_BASE_URL = 'https://jsonplaceholder.typicode.com';

async function getTodos() {
  const url = `${JSON_PLACEHOLDER_BASE_URL}/todos`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json'
      },
      validateStatus: () => true
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    const error = new Error(`Failed to fetch todos. Status: ${response.status}`);
    error.statusCode = response.status;
    throw error;
  } catch (err) {
    throw err;
  }
}

async function createTodo(todo) {
  const url = `${JSON_PLACEHOLDER_BASE_URL}/todos`;

  try {
    const response = await axios.post(url, todo, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      validateStatus: () => true
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    const error = new Error(`Failed to create todo. Status: ${response.status}`);
    error.statusCode = response.status;
    throw error;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getTodos,
  createTodo
};
