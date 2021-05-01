import { IUserData } from "../../user/user";
import { Res } from "../response";

export interface LoginRes extends Res {
  data?: Pick<IUserData, "_id" | "active" | "email" | "name">;
}
