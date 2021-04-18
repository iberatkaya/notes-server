import { BasicStrategy } from "passport-http";
import { User } from "../models/user/user";
import bcrypt from "bcrypt";

export const basicStrategy = new BasicStrategy(
  async (username, password, done) => {
    const user = await User.findOne({ email: username }).exec();

    if (!user) {
      return done(null, false);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return done(null, false);
    }
    return done(null, user);
  }
);