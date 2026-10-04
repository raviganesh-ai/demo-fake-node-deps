"use strict";

const nock = require("nock");
const { listTodosForUser, getTodoById } = require("../src/services/todoService");

const BASE_URL = "https://jsonplaceholder.typicode.com";

afterEach(() => {
  nock.cleanAll();
});

describe("todoService", () => {
  test("listTodosForUser returns todos filtered by userId", async () => {
    const fakeTodos = [{ id: 1, userId: 1, title: "Buy milk", completed: false }];
    nock(BASE_URL).get("/todos").query({ userId: "1" }).reply(200, fakeTodos);

    const todos = await listTodosForUser(1);

    expect(todos).toEqual(fakeTodos);
  });

  test("getTodoById returns a single todo", async () => {
    const fakeTodo = { id: 5, userId: 1, title: "Walk the dog", completed: true };
    nock(BASE_URL).get("/todos/5").reply(200, fakeTodo);

    const todo = await getTodoById(5);

    expect(todo).toEqual(fakeTodo);
  });
});
