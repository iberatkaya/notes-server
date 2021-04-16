import express from "express";
import passport from "passport";
import { addNoteController } from "../controllers/add_note/add_note";

let router = express.Router();

router.post(
  "/addnote",
  passport.authenticate("basic", { session: false }),
  addNoteController
);

export default router;
