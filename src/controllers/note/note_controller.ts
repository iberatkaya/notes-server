import { AddNoteReqBody } from "../../interfaces/requests/add_note_request_body/add_note_request_body";
import { Note } from "../../models/note/note";
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { EditNoteReqBody } from "../../interfaces/requests/edit_note_request_body/edit_note_request_body";
import { INote, INoteData } from "../../interfaces/note/note";
import { Optional } from "utility-types";
import { docLimit } from "../../constants/db";
import { removeUndefinedFromObject } from "../../utils/utils";

@Route("note")
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
  @Get("getnotes")
  @SuccessResponse("200", "Success")
  public async getNotes(@Query() page: string): Promise<INoteData[]> {
    const pageNumber = parseInt(page) || 0;
    if (pageNumber < 0) {
      throw "Page number must be larger than 0!";
    }

    const notes = await Note.find({
      ownerId: this.userId,
    })
      .skip(pageNumber * docLimit)
      .limit(docLimit)
      .sort({
        date: -1,
      })
      .exec();

    return notes;
  }

  /**
   * Add a note for the user.
   */
  @Post("addnote")
  @SuccessResponse("200", "Success")
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

  /**
   * Add a note for the user.
   */
  @Post("editnote")
  @SuccessResponse("200", "Success")
  public async editNote(
    @Body()
    body: EditNoteReqBody
  ): Promise<void> {
    const id = body.id;
    const title = body.title;
    const noteBody = body.body;
    if (!id) {
      throw "ID must be given!";
    }
    if (!title && !noteBody) {
      throw "Neither title nor body were sent!";
    }

    const updatedObj: Optional<INote> = {
      title: title,
      body: noteBody,
    };

    removeUndefinedFromObject(updatedObj);

    await Note.findByIdAndUpdate(id, updatedObj).exec();
  }
}
