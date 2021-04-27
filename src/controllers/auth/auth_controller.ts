import { User } from "../../models/user/user";
import { SignUpReqBody } from "../../interfaces/requests/signup_request_body/signup_request_body";
import bcrypt from "bcrypt";
import {
  Body,
  Controller,
  Post,
  Route,
  SuccessResponse,
  Get,
  Query,
} from "tsoa";
import { SignUpRes } from "../../interfaces/responses/sign_up_response/sign_up_response";
import nodemailer from "nodemailer";
import { nanoid } from "nanoid";
import { UserEmailVerification } from "../../models/user_email_verification/user_email_verification";
import { baseUrlString, emailPasswordString } from "../../constants/db";
import { Res } from "../../interfaces/responses/response";

@Route("auth")
export class AuthController extends Controller {
  /**
   * Sign up a user.
   */
  @Post("signup")
  @SuccessResponse("200", "Success")
  public async signUp(
    @Body()
    body: SignUpReqBody
  ): Promise<SignUpRes> {
    const user = new User();
    user.email = body.email;
    user.name = body.name;
    user.active = false;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(body.password, salt);

    const token = nanoid(128);

    const userEmailVerification = new UserEmailVerification();

    userEmailVerification.email = body.email;
    userEmailVerification.token = token;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "notesappibk@gmail.com",
        pass: emailPasswordString,
      },
    });

    const verifyUrl = baseUrlString + "/auth/verifyemail?token=" + token;

    // send mail with defined transport object
    await transporter.sendMail({
      from: "Notes App", // sender address
      to: body.email, // list of receivers
      subject: "Verify your email", // Subject line
      text: "Verify your email: " + verifyUrl, // plain text body
    });

    await user.save();
    await userEmailVerification.save();

    return {
      message: "Success",
      success: true,
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        active: user.active,
      },
    };
  }

  @Get("verifyemail")
  @SuccessResponse("200", "Success")
  public async verifyEmail(@Query() token: string): Promise<Res> {
    const userEmailVerification = await UserEmailVerification.findOne({
      token: token,
    }).exec();
    if (userEmailVerification) {
      const user = await User.findOne({
        email: userEmailVerification.email,
      }).exec();
      if (user) {
        user.active = true;
        await user.save();

        return {
          message: "Verified email!",
          success: true,
        };
      } else {
        return {
          message: "Could not find user!",
          success: false,
        };
      }
    } else {
      return {
        message: "Could not find token!",
        success: false,
      };
    }
  }
}
