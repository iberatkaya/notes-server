import { IUserData } from "../../user/user";
import { Res } from "../response";

export interface SignUpRes extends Res {
  data?: IUserData;
}
