const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  console.log(req.url);
  res.status(200).json({
    message: "Running",
  });
});

app.listen(port, () => {
  console.log("Server listening on port "+ port);
});
