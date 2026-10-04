const nock = require('nock');
const externalUserService = require('../src/services/externalUserService');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('externalUserService', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('getUsers returns list of users from external API', async () => {
    const usersMock = [
      { id: 1, name: 'User One' },
      { id: 2, name: 'User Two' }
    ];

    nock(BASE_URL)
      .get('/users')
      .reply(200, usersMock);

    const users = await externalUserService.getUsers();
    expect(users).toEqual(usersMock);
  });

  test('getUserById returns single user when found', async () => {
    const userMock = { id: 1, name: 'User One' };

    nock(BASE_URL)
      .get('/users/1')
      .reply(200, userMock);

    const user = await externalUserService.getUserById(1);
    expect(user).toEqual(userMock);
  });

  test('getUserById returns null when user not found (404)', async () => {
    nock(BASE_URL)
      .get('/users/999')
      .reply(404);

    const user = await externalUserService.getUserById(999);
    expect(user).toBeNull();
  });

  test('getUsers throws on non-2xx status', async () => {
    nock(BASE_URL)
      .get('/users')
      .reply(500, { error: 'server error' });

    await expect(externalUserService.getUsers()).rejects.toThrow('Failed to fetch users');
  });
});
