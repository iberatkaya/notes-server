import { AuthController } from "../controllers/auth/auth_controller";
import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";
import { Res } from "../interfaces/responses/response";
import { ParamsDictionary } from "express-serve-static-core";
import { SignUpReqBody } from "../interfaces/requests/signup_request_body/signup_request_body";

const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("name").notEmpty(),
  async (
    req: Request<ParamsDictionary, never, SignUpReqBody>,
    res: Response<Res>
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, message: JSON.stringify(errors.array()) });
      }

      const signupController = new AuthController();
      const response = await signupController.signUp({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      });
      res.send(response);
    } catch (e) {
      res.status(500).send({ success: false, message: JSON.stringify(e) });
    }
  }
);

router.get(
  "/verifyemail",
  async (
    req: Request<ParamsDictionary, never, never, { token: string }>,
    res: Response<Res>
  ) => {
    try {
      const signupController = new AuthController();
      const response = await signupController.verifyEmail(req.query.token);
      res.send(response);
    } catch (e) {
      res.status(500).send({ success: false, message: JSON.stringify(e) });
    }
  }
);

export default router;
