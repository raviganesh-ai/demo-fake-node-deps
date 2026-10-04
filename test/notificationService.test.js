"use strict";

const nock = require("nock");
const { sendNotificationAsync } = require("../src/services/notificationService");

afterEach(() => {
  nock.cleanAll();
});

describe("notificationService", () => {
  test("sendNotificationAsync resolves with the webhook response body", async () => {
    nock("https://hooks.example.com").post("/webhook", { message: "hello" }).reply(200, { received: true });

    const result = await sendNotificationAsync("https://hooks.example.com/webhook", { message: "hello" });

    expect(result).toEqual({ received: true });
  });

  test("sendNotificationAsync rejects when the webhook responds with an error status", async () => {
    nock("https://hooks.example.com").post("/webhook").reply(500, { error: "boom" });

    await expect(
      sendNotificationAsync("https://hooks.example.com/webhook", { message: "hello" })
    ).rejects.toThrow("Webhook responded with status 500");
  });
});
