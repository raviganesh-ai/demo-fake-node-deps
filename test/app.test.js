"use strict";

const request = require("supertest");
const nock = require("nock");
const createApp = require("../src/app");

const BASE_URL = "https://jsonplaceholder.typicode.com";
const app = createApp();

afterEach(() => {
  nock.cleanAll();
});

describe("GET /health", () => {
  test("returns ok status", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});

describe("GET /api/users/:id", () => {
  test("proxies the external user API", async () => {
    nock(BASE_URL).get("/users/1").reply(200, { id: 1, name: "Ada Lovelace" });

    const response = await request(app).get("/api/users/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "Ada Lovelace" });
  });
});

describe("POST /api/notifications", () => {
  test("requires webhookUrl and message", async () => {
    const response = await request(app).post("/api/notifications").send({});
    expect(response.status).toBe(400);
  });

  test("delivers the notification and returns 201", async () => {
    nock("https://hooks.example.com").post("/webhook").reply(200, { received: true });

    const response = await request(app)
      .post("/api/notifications")
      .send({ webhookUrl: "https://hooks.example.com/webhook", message: "hello" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ delivered: true, result: { received: true } });
  });
});
