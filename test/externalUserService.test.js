"use strict";

const nock = require("nock");
const { getUserById, listUsers } = require("../src/services/externalUserService");

const BASE_URL = "https://jsonplaceholder.typicode.com";

afterEach(() => {
  nock.cleanAll();
});

describe("externalUserService", () => {
  test("getUserById returns the user from the external API", async () => {
    const fakeUser = { id: 1, name: "Ada Lovelace" };
    nock(BASE_URL).get("/users/1").reply(200, fakeUser);

    const user = await getUserById(1);

    expect(user).toEqual(fakeUser);
  });

  test("listUsers returns every user from the external API", async () => {
    const fakeUsers = [
      { id: 1, name: "Ada" },
      { id: 2, name: "Grace" },
    ];
    nock(BASE_URL).get("/users").reply(200, fakeUsers);

    const users = await listUsers();

    expect(users).toHaveLength(2);
  });
});
