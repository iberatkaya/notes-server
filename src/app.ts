import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import noteRouter from "./routes/note";
import { connectionString } from "./constants/db";
import passport from "passport";
import { basicStrategy } from "./middlewares/passport";
import rateLimit from "express-rate-limit";

const app = express();

app.use(passport.initialize());

passport.use("basic", basicStrategy);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(
  "/docs",
  swaggerUi.serve,
  async (_req: express.Request, res: express.Response) => {
    return res.send(
      swaggerUi.generateHTML(await import("../public/swagger.json"), {
        customSiteTitle: "Note API",
      })
    );
  }
);

app.use("/", indexRouter);
app.use("/auth/", authRouter);
app.use("/note/", noteRouter);

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default app;
