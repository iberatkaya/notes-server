import { AddNoteReqBody } from "../../interfaces/requests/add_note_request_body/add_note_request_body";
import { Note } from "../../models/note/note";
import { Body, Controller, Post, Route } from "tsoa";
import { EditNoteReqBody } from "../../interfaces/requests/edit_note_request_body/edit_note_request_body";
import { INote } from "../../interfaces/note/note";
import { Optional } from "utility-types";

@Route("note/addnote")
export class NoteController extends Controller {
  constructor(userId: string) {
    super();
    this.userId = userId;
  }

  /**
   * The user's ID.
   */
  userId: string;

  /**
   * Add a note for the user.
   */
  @Post()
  public async addNote(
    @Body()
    body: AddNoteReqBody
  ): Promise<void> {
    const note = new Note();
    note.body = body.body;
    note.title = body.title;
    note.date = new Date();
    note.ownerId = this.userId;
    await note.save();
  }
}
