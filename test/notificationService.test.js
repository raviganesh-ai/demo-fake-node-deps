const nock = require('nock');
const notificationService = require('../src/services/notificationService');

describe('notificationService', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('sendNotification posts payload to given URL and returns status/body', async () => {
    const url = 'https://api.example.com/notify';
    const payload = { message: 'Hello' };

    const responseBody = { success: true };

    nock('https://api.example.com')
      .post('/notify', payload)
      .reply(200, responseBody);

    const result = await notificationService.sendNotification(url, payload);
    expect(result.status).toBe(200);
    expect(result.body).toEqual(responseBody);
  });

  test('sendNotification throws when URL is missing', async () => {
    await expect(notificationService.sendNotification('', { message: 'Hi' }))
      .rejects.toThrow('Notification URL is required');
  });

  test('sendNotification throws error with status on failure', async () => {
    const url = 'https://api.example.com/notify';

    nock('https://api.example.com')
      .post('/notify')
      .reply(500, { error: 'server error' });

    await expect(notificationService.sendNotification(url, { message: 'Hi' }))
      .rejects.toMatchObject({ status: 500 });
  });
});
