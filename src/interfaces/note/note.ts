import mongoose from "mongoose";

export interface INote extends mongoose.Document {
  title: string;
  body: string;
  date: Date;
  ownerId: string;
}
