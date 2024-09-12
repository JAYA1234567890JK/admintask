const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/route");
const superAdmin = require("./admin/createAdmin")
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
dotEnv.config();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

mongoose
  .connect(process.env.MANOGO_URL)
  .then(async() => {
     await superAdmin.createDefaultSuperadmin()
    console.log("mongooses sucessfully");
  })
  .catch((err) => {
    console.log(err, "error");
  });

app.use("/task", routes);
app.listen(PORT, async () => {
  try {
    console.log(`server started at ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
