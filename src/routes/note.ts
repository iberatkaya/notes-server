import express, { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { body, validationResult } from "express-validator";
import passport from "passport";
import { NoteController } from "../controllers/note/note_controller";
import { AddNoteReqBody } from "../interfaces/requests/add_note_request_body/add_note_request_body";
import { DeleteNoteReqBody } from "../interfaces/requests/delete_note_request_body/delete_note_request_body";
import { EditNoteReqBody } from "../interfaces/requests/edit_note_request_body/edit_note_request_body";
import { GetNotesRes } from "../interfaces/responses/get_notes_response/get_notes_response";
import { Res } from "../interfaces/responses/response";

const router = express.Router();

router.get(
  "/getnotes",
  passport.authenticate("basic", { session: false }),
  async (
    req: Request<ParamsDictionary, never, EditNoteReqBody, { page: string }>,
    res: Response<GetNotesRes>
  ) => {
    try {
      const noteController = new NoteController(req.user?._id);
      const response = await noteController.getNotes(req.query.page);
      res.status(200).send(response);
    } catch (e) {
      res.status(500).send({ success: false, message: JSON.stringify(e) });
    }
  }
);

router.post(
  "/addnote",
  passport.authenticate("basic", { session: false }),
  body("title").notEmpty(),
  body("body").notEmpty(),
  async (
    req: Request<ParamsDictionary, never, AddNoteReqBody>,
    res: Response<Res>
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, message: JSON.stringify(errors.array()) });
      }

      const noteController = new NoteController(req.user?._id);
      const response = await noteController.addNote(req.body);
      res.status(200).send(response);
    } catch (e) {
      res.status(500).send({ success: false, message: JSON.stringify(e) });
    }
  }
);

router.post(
  "/editnote",
  passport.authenticate("basic", { session: false }),
  async (
    req: Request<ParamsDictionary, never, EditNoteReqBody>,
    res: Response<Res>
  ) => {
    try {
      const noteController = new NoteController(req.user?._id);
      const response = await noteController.editNote(req.body);
      res.status(200).send(response);
    } catch (e) {
      res.status(500).send({ success: false, message: JSON.stringify(e) });
    }
  }
);

router.post(
  "/deletenote",
  passport.authenticate("basic", { session: false }),
  async (
    req: Request<ParamsDictionary, never, DeleteNoteReqBody>,
    res: Response<Res>
  ) => {
    try {
      const noteController = new NoteController(req.user?._id);
      const response = await noteController.deleteNote(req.body);
      res.status(200).send(response);
    } catch (e) {
      res.status(500).send({ success: false, message: JSON.stringify(e) });
    }
  }
);

export default router;
