import { Router } from "express";
import {
  createUser,
  loginUser,
  readAllUser,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.route("/registers").post(createUser);
userRouter.route("/").get(readAllUser);
userRouter.route("/login").get(loginUser);
// userRouter.route("/register").post(createUser);

export default userRouter;
