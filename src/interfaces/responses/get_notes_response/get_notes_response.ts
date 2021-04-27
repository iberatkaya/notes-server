import { INoteData } from "../../note/note";
import { Res } from "../response";

export interface GetNotesRes extends Res {
  data?: INoteData[];
}
