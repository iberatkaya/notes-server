import mongoose from "mongoose";
import validator from "validator";
import { IUserEmailVerification } from "../../interfaces/user_email_verification/user_email_verification";

export const UserEmailVerificationScheme = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
    },
  },
  token: { type: String, required: true },
});

export const UserEmailVerification = mongoose.model<IUserEmailVerification>(
  "UserEmailVerification",
  UserEmailVerificationScheme
);
