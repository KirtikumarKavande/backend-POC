
const express = require("express");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Service is healthy",
  });
});

app.get("/hello", (req, res) => {
  return res.status(200).json({
    message: "Hello from Express on Lambda 🚀",
  });
});

app.post("/data", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Name is required",
    });
  }

  return res.status(200).json({
    message: `Hello ${name}`,
  });
});

module.exports = app;