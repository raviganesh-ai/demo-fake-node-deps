"use strict";

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

function createApp() {
  const app = express();
  app.use(express.json());

  app.use("/api", userRoutes);
  app.use("/api", notificationRoutes);

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Centralized error handler - keeps the error response shape consistent
  // across every route instead of each one formatting its own.
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(502).json({ error: err.message || "Upstream request failed" });
  });

  return app;
}

module.exports = createApp;
