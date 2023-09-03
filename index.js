const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const ussd = require("./controllers/ussd");
const router = require("./routes/index");

const main = async () => {
  const app = express();
  const port = process.env.PORT;
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Hello Its up and running");
  });

  app.use("/ussd", ussd);
  app.use("/api", router);

  app.use("*", (req, res) => res.status(404).send("404 Not Found"));
  app.listen(port || 5090, async () => {
    console.log(`Server Running ${port}`);
  });
};

main();
