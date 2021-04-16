import express, { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { AddNoteReqBody } from "../../interfaces/requests/add_note_request_body/add_note_request_body";
import { Res } from "../../interfaces/responses/response";
import { Note } from "../../models/note/note";

export const addNoteController = async (
  req: Request<ParamsDictionary, {}, AddNoteReqBody>,
  res: Response<Res>,
  next: NextFunction
) => {
  try {
    const note = new Note();
    note.body = req.body.body;
    note.title = req.body.title;
    note.date = new Date();
    console.log(req.user);
    note.ownerId = req.user?._id;
    await note.save();
    res.send({ message: "Success", success: true });
  } catch (e) {
    console.log(e);
    res.send({ success: false, message: JSON.stringify(e) });
  }
};
