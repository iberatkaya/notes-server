import express, { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { Res } from "../../interfaces/responses/response";
import { User } from "../../models/user/user";
import { SignUpReqBody } from "../../interfaces/requests/signup_request_body/signup_request_body";
import bcrypt from "bcrypt";

export const signupController = async (
  req: Request<ParamsDictionary, {}, SignUpReqBody>,
  res: Response<Res>,
  next: NextFunction
) => {
  try {
    const user = new User();
    user.email = req.body.email;
    user.name = req.body.name;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();
    res.send({ message: "Success", success: true });
  } catch (e) {
    console.log(e);
    res.send({ success: false, message: JSON.stringify(e) });
  }
};
