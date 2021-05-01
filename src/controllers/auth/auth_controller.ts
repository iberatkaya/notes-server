import { User } from "../../models/user/user";
import { SignUpReqBody } from "../../interfaces/requests/signup_request_body/signup_request_body";
import bcrypt from "bcryptjs";
import {
  Body,
  Controller,
  Post,
  Route,
  SuccessResponse,
  Get,
  Query,
} from "tsoa";
import { SignUpRes } from "../../interfaces/responses/signup_response/signup_response";
import nodemailer from "nodemailer";
import { nanoid } from "nanoid";
import { UserEmailVerification } from "../../models/user_email_verification/user_email_verification";
import { baseUrlString, emailPasswordString } from "../../constants/db";
import { Res } from "../../interfaces/responses/response";
import { LoginReqBody } from "../../interfaces/requests/login_request_body/login_request_body";
import { LoginRes } from "../../interfaces/responses/login_response/login_response";

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

    try {
      await transporter.sendMail({
        from: "Notes App",
        to: body.email,
        subject: "Verify your email",
        text: "Verify your email by clicking this link: " + verifyUrl,
      });
    } catch (e) {
      console.log(e);
    }

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

  /**
   * Check if a user exists.
   */
  @Post("login")
  @SuccessResponse("200", "Success")
  public async login(
    @Body()
    body: LoginReqBody
  ): Promise<LoginRes> {
    const user = await User.findOne({ email: body.email }).exec();

    if (!user) {
      return {
        message: "User not found!",
        success: false,
      };
    }

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
      return {
        message: "Incorrect email or password!",
        success: false,
      };
    }
    return {
      message: "User found!",
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
        //Set the user to active and save the document.
        user.active = true;
        await user.save();

        //Delete the document.
        await userEmailVerification.delete();

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
