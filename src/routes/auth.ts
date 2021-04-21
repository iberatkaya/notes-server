import { AuthController } from "../controllers/auth/auth_controller";
import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";
import { Res } from "../interfaces/responses/response";
import { ParamsDictionary } from "express-serve-static-core";
import { SignUpReqBody } from "../interfaces/requests/signup_request_body/signup_request_body";

let router = express.Router();

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("name").notEmpty(),
  async (
    req: Request<ParamsDictionary, {}, SignUpReqBody>,
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
      const user = await signupController.signUp({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      });
      res.send({ message: "Success", success: true });
    } catch (e) {
      res.status(500).send({ success: false, message: JSON.stringify(e) });
    }
  }
);

export default router;
