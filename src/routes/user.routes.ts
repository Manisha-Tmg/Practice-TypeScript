import { Router } from "express";
import {
  createUser,
  forgotPassword,
  loginUser,
  myProfile,
  readAllUser,
  resetPassword,
  updateMyProfile,
  updatePassword,
} from "../controller/user.controller";
import isAuthenticated from "../middleware/isAuthenticated.middleware";

const userRouter = Router();

userRouter.route("/registers").post(createUser);
userRouter.route("/").get(readAllUser);
userRouter.route("/login").get(loginUser);

userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/reset-password").patch(resetPassword);

// userRouter.route("/:id").get(myProfileService);

userRouter.route("/my-profile").get(isAuthenticated, myProfile);
userRouter.route("/update-profile").patch(isAuthenticated, updateMyProfile);
userRouter.route("/update-password").patch(isAuthenticated, updatePassword);

// userRouter.route("/register").post(createUser);

export default userRouter;
