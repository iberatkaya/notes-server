import { isProduction } from "../utils/utils";

export const connectionString = isProduction()
  ? process.env.DATABASE_URL ?? ""
  : "mongodb://localhost:27017/db";

export const docLimit = 10;
