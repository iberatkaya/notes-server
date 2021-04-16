import { signupController } from "../controllers/auth/signup_controller";
import express from "express";

let router = express.Router();

router.post("/signup", signupController);

export default router;
