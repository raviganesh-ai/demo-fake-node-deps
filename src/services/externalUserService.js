"use strict";

const rp = require("request-promise");

const BASE_URL = process.env.EXTERNAL_API_BASE_URL || "https://jsonplaceholder.typicode.com";

/**
 * Fetches a single user from the external placeholder API.
 *
 * Uses `request-promise`, which wraps the deprecated `request` package in a
 * Promise interface. Both `request` and `request-promise` have been
 * deprecated since 2020 (see https://github.com/request/request/issues/3142)
 * and recommend migrating to `node-fetch`, `axios`, `got`, or the built-in
 * `fetch` (available natively from Node 18+).
 */
async function getUserById(userId) {
  const options = {
    uri: `${BASE_URL}/users/${userId}`,
    json: true,
    timeout: 5000,
  };
  return rp(options);
}

/**
 * Fetches every user from the external placeholder API.
 */
async function listUsers() {
  const options = {
    uri: `${BASE_URL}/users`,
    json: true,
    timeout: 5000,
  };
  return rp(options);
}

module.exports = { getUserById, listUsers };
