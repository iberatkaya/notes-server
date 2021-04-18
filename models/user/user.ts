import mongoose from "mongoose";
import validator from "validator";
import { IUser } from "../../interfaces/user/user";

export const UserScheme = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,

    validate: {
      validator: validator.isEmail,
    },
  },
  name: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
});

export const User = mongoose.model<IUser>("User", UserScheme);
