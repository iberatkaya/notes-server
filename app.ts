import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import http from "http";

import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import noteRouter from "./routes/note";
import { connectionString } from "./constants/secret";
import passport from "passport";
import { basicStrategy } from "./passport/passport";

var app = express();

app.use(passport.initialize());

passport.use("basic", basicStrategy);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth/", authRouter);
app.use("/note/", noteRouter);

mongoose.connect(connectionString, { useNewUrlParser: true }, (err) => {
  console.log("err", err);
});

var server = http.createServer(app);

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

server.listen(port);
