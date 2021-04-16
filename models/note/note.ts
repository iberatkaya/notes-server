import mongoose from "mongoose";
import { INote } from "../../interfaces/note/note";

export const NoteScheme = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, required: true },
  ownerId: { type: String, required: true },
});

export const Note = mongoose.model<INote>("Note", NoteScheme);
