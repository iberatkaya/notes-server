import { isProduction } from "../utils/utils";

export const connectionString = isProduction()
  ? process.env.DATABASE_URL ?? ""
  : "mongodb://localhost:27017/db";

export const emailPasswordString = process.env.EMAIL_PASSWORD!;

export const baseUrlString = isProduction()
  ? process.env.BASE_URL ?? ""
  : "http://localhost:3000";

export const docLimit = 10;
