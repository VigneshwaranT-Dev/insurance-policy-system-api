const express = require("express");

const app = express();

app.use(express.json()); // register Express middleware tells how to read incoming request JSON data.

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/test", require("./routes/test.routes"));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Insurance Policy Management API is running",
  });
});

module.exports = app;
