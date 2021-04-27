import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  active: boolean;
}

export interface IUserData {
  email: string;
  password: string;
  name: string;
  _id: string;
  active: boolean;
}
