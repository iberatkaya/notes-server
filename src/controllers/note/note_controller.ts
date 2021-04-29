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
import { INote } from "../../interfaces/note/note";
import { Optional } from "utility-types";
import { docLimit } from "../../constants/db";
import { removeUndefinedFromObject } from "../../utils/utils";
import { GetNotesRes } from "../../interfaces/responses/get_notes_response/get_notes_response";
import { Res } from "../../interfaces/responses/response";
import { DeleteNoteReqBody } from "../../interfaces/requests/delete_note_request_body/delete_note_request_body";
import { AddNotesRes } from "../../interfaces/responses/add_notes_response/add_notes_response";

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
  public async getNotes(@Query() page: string): Promise<GetNotesRes> {
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

    return {
      data: notes,
      message: "Success",
      success: true,
    };
  }

  /**
   * Add a note for the user.
   */
  @Post("addnote")
  @SuccessResponse("200", "Success")
  public async addNote(
    @Body()
    body: AddNoteReqBody
  ): Promise<AddNotesRes> {
    const note = new Note();
    note.body = body.body;
    note.title = body.title;
    note.date = new Date();
    note.ownerId = this.userId;
    await note.save();

    return {
      message: "Success",
      success: true,
      data: {
        body: note.body,
        date: note.date,
        ownerId: note.ownerId,
        title: note.title,
        _id: note.id,
      },
    };
  }

  /**
   * Add a note for the user.
   */
  @Post("editnote")
  @SuccessResponse("200", "Success")
  public async editNote(
    @Body()
    body: EditNoteReqBody
  ): Promise<Res> {
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

    return { message: "Success", success: true };
  }

  /**
   * Delete a note for the user.
   */
  @Post("deletenote")
  @SuccessResponse("200", "Success")
  public async deleteNote(
    @Body()
    body: DeleteNoteReqBody
  ): Promise<Res> {
    const id = body.noteId;
    if (!id) {
      throw "ID must be given!";
    }

    const note = await Note.findById(id).exec();

    if (!note) {
      throw "Could not find the note!";
    }

    await note.delete();

    return { message: "Success", success: true };
  }
}
