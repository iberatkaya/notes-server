import express, { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { body, validationResult } from "express-validator";
import passport from "passport";
import { NoteController } from "../controllers/note/note_controller";
import { AddNoteReqBody } from "../interfaces/requests/add_note_request_body/add_note_request_body";
import { EditNoteReqBody } from "../interfaces/requests/edit_note_request_body/edit_note_request_body";
import { Res } from "../interfaces/responses/response";

let router = express.Router();

router.get(
  "/getnotes",
  passport.authenticate("basic", { session: false }),
  async (
    req: Request<ParamsDictionary, {}, EditNoteReqBody, { page: string }>,
    res: Response<Res>
  ) => {
    try {
      const noteController = new NoteController(req.user?._id);
      const notes = await noteController.getNotes(req.query.page);
      res.send({
        message: "Success",
        success: true,
        data: JSON.stringify(notes),
      });
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
    req: Request<ParamsDictionary, {}, AddNoteReqBody>,
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
      await noteController.addNote(req.body);
      res.send({ message: "Success", success: true });
    } catch (e) {
      res.status(500).send({ success: false, message: JSON.stringify(e) });
    }
  }
);

router.post(
  "/editnote",
  passport.authenticate("basic", { session: false }),
  async (
    req: Request<ParamsDictionary, {}, EditNoteReqBody>,
    res: Response<Res>
  ) => {
    try {
      const noteController = new NoteController(req.user?._id);
      await noteController.editNote(req.body);
      res.send({ message: "Success", success: true });
    } catch (e) {
      res.status(500).send({ success: false, message: JSON.stringify(e) });
    }
  }
);

export default router;
