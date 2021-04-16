import { IUser } from "./interfaces/user/user";

export {};

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
