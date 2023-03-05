const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  console.log(req.url)
  res.status(200).json({
    message: "Running",
  });
});

app.listen();
