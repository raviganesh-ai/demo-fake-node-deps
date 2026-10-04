"use strict";

const rp = require("request-promise");

const BASE_URL = process.env.EXTERNAL_API_BASE_URL || "https://jsonplaceholder.typicode.com";

/**
 * Fetches every to-do item belonging to a user from the external
 * placeholder API. Uses the deprecated request-promise package, same as
 * externalUserService.
 */
async function listTodosForUser(userId) {
  const options = {
    uri: `${BASE_URL}/todos`,
    qs: { userId },
    json: true,
    timeout: 5000,
  };
  return rp(options);
}

/**
 * Fetches a single to-do item by id.
 */
async function getTodoById(todoId) {
  const options = {
    uri: `${BASE_URL}/todos/${todoId}`,
    json: true,
    timeout: 5000,
  };
  return rp(options);
}

module.exports = { listTodosForUser, getTodoById };
