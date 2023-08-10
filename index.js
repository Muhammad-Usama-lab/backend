require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
// const { uploadImages } = require("./middlewares/uploadImage");
// const { verify_token } = require("./middlewares/authorization");
// const customer = require("./routes/customers");
const app = express();

const port = process.env.PORT || 3000;
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(multer().array("file"));

// app.post("/api/upload", uploadImages, (req, res) => {
//   console.log(req?.baseUrl);
//   res.status(200).json({
//     message: "Running",
//   });
// });

app.get("/",(req,res)=>{
  res.send("<h2>E-commerce backend</h2>")
})

app.post("/auth/token", require("./controllers/auth").login);
app.use("/customer", require("./routes/customers"));
app.use("/product", require("./routes/products"));
app.use("/order", require("./routes/orders"));
app.use("/user", require("./routes/users"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db"))
  .catch((err) => console.log(err))
  .then((result) => {
    app.listen(port);
    console.log(`Connected to PORT ${port} `);
  })
  .catch((err) => {
    console.log(err);
  });
