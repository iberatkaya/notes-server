import { INoteData } from "../../note/note";
import { Res } from "../response";

export interface AddNotesRes extends Res {
  data?: INoteData;
}
