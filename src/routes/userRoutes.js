"use strict";

const express = require("express");
const externalUserService = require("../services/externalUserService");
const todoService = require("../services/todoService");

const router = express.Router();

router.get("/users", async (req, res, next) => {
  try {
    const users = await externalUserService.listUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await externalUserService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/users/:id/todos", async (req, res, next) => {
  try {
    const todos = await todoService.listTodosForUser(req.params.id);
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
