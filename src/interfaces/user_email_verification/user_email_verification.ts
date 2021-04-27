import mongoose from "mongoose";

export interface IUserEmailVerification extends mongoose.Document {
  email: string;
  token: string;
}
