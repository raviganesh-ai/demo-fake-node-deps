"use strict";

const express = require("express");
const notificationService = require("../services/notificationService");

const router = express.Router();

router.post("/notifications", async (req, res, next) => {
  const { webhookUrl, message } = req.body;
  if (!webhookUrl || !message) {
    return res.status(400).json({ error: "webhookUrl and message are required" });
  }
  try {
    const result = await notificationService.sendNotificationAsync(webhookUrl, { message });
    res.status(201).json({ delivered: true, result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
