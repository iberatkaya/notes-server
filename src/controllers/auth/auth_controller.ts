import express, { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { Res } from "../../interfaces/responses/response";
import { User } from "../../models/user/user";
import { SignUpReqBody } from "../../interfaces/requests/signup_request_body/signup_request_body";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { Body, Controller, Post, Route } from "tsoa";

@Route("auth/signup")
export class AuthController extends Controller {
  /**
   * Sign up a user.
   */
  @Post()
  public async signUp(
    @Body()
    body: SignUpReqBody
  ): Promise<void> {
    const user = new User();
    user.email = body.email;
    user.name = body.name;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(body.password, salt);

    await user.save();
  }
}
