const nock = require('nock');
const todoService = require('../src/services/todoService');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('todoService', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('getTodos returns list of todos from external API', async () => {
    const todosMock = [
      { id: 1, title: 'Todo 1' },
      { id: 2, title: 'Todo 2' }
    ];

    nock(BASE_URL)
      .get('/todos')
      .reply(200, todosMock);

    const todos = await todoService.getTodos();
    expect(todos).toEqual(todosMock);
  });

  test('getTodosByUser returns todos for specific user', async () => {
    const todosMock = [
      { id: 1, userId: 5, title: 'Todo 1' }
    ];

    nock(BASE_URL)
      .get('/todos')
      .query({ userId: 5 })
      .reply(200, todosMock);

    const todos = await todoService.getTodosByUser(5);
    expect(todos).toEqual(todosMock);
  });

  test('getTodos throws on non-2xx response', async () => {
    nock(BASE_URL)
      .get('/todos')
      .reply(500, { error: 'server error' });

    await expect(todoService.getTodos()).rejects.toThrow('Failed to fetch todos');
  });
});
