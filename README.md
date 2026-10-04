# demo-fake-node-deps

A small, intentionally fictitious Node.js/Express task-notification service used as a test
fixture for Genie's "Dependency upgrade or replacement" modernization capability.

## What it does

A task-notification service that fetches users/to-dos from an external placeholder API
(`jsonplaceholder.typicode.com`) and delivers notifications to a webhook URL.

## The evidenced dependency to upgrade/replace

This repository deliberately depends on **`request`** (`^2.88.2`) and **`request-promise`**
(`^4.2.6`) - both have been **deprecated since 2020**
(see https://github.com/request/request/issues/3142) and are no longer maintained. A real
`npm install` against this repository reports dozens of transitive vulnerabilities inherited
from `request`'s own ancient dependency tree (`har-validator`, old `uuid`, etc.).

The officially recommended replacements are `node-fetch`, `axios`, `got`, or - since Node
18+ - the built-in global `fetch`. A "Dependency upgrade or replacement" plan targeting one of
these should only need to change the directly affected integration points:

- `src/services/externalUserService.js` and `src/services/todoService.js` - both use the
  promise-style `request-promise` (`rp(options)`).
- `src/services/notificationService.js` - uses the callback-style `request` package directly
  (not `request-promise`), to exercise both styles this legacy codebase actually uses.
- `package.json` - the dependency itself.

Everything else (the Express app, routes, and all tests) should keep working unmodified, since
they only depend on each service module's existing exported function signatures
(`getUserById`, `listUsers`, `listTodosForUser`, `getTodoById`, `sendNotification`,
`sendNotificationAsync`), not on `request`/`request-promise` directly.

## Layout

- `src/app.js` / `src/server.js` - Express app wiring and entry point
- `src/routes/` - `userRoutes.js`, `notificationRoutes.js`
- `src/services/` - `externalUserService.js`, `todoService.js` (request-promise),
  `notificationService.js` (request)
- `test/` - Jest + Supertest + Nock tests (10 tests, all passing; HTTP calls are mocked, no
  real network access needed to run them)

Verified locally before pushing: `npm install` (403 packages, several expected deprecation
warnings for `request`/`request-promise` themselves) and `npm test` (4 suites, 10/10 tests
passing) both succeed on Node.js 24.
