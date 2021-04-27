import { isProduction } from "../utils/utils";
import { emailPassword } from "./secret";

export const connectionString = isProduction()
  ? process.env.DATABASE_URL ?? ""
  : "mongodb://localhost:27017/db";

export const emailPasswordString = isProduction()
  ? process.env.EMAIL_PASSWORD ?? ""
  : emailPassword;

export const baseUrlString = isProduction()
  ? process.env.BASE_URL ?? ""
  : "http://localhost:3000";

export const docLimit = 10;
