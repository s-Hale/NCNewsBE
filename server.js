if (!process.env.NODE_ENV) process.env.NODE_ENV = "dev";

const CORS = require("cors");
const express = require("express");
const app = express();
const apiRouter = require("./routes/index");
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== 'production') {
  const config = require("./config");
  }
const bodyParser = require("body-parser");

let db = process.env.DB || config.DB[process.env.NODE_ENV];

mongoose.Promise = Promise;

mongoose
  .connect(db)
  .then(() => console.log(`successfully connected to...${db}`))
  .catch(err => console.log("connection failed", err));

app.use(CORS());

app.use(bodyParser.json());

app.use("/api", apiRouter);

app.use("/*", (req, res, next) =>
  res.status(404).send({ status: 404, msg: "Page not found" })
);

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ status: 404, msg: "Page not found" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 400)
    res.status(400).send({ status: 400, msg: "Bad request" });
  else next(err);
});

app.use((err, req, res, next) => res.status(500).send(err));

module.exports = app;
