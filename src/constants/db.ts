export const connectionString =
  process.env.DATABASE_URL ?? "mongodb://localhost:27017/db";

export const emailPasswordString = process.env.EMAIL_PASSWORD!;

export const baseUrlString = process.env.BASE_URL ?? "http://localhost:3000";

export const docLimit = 10;
