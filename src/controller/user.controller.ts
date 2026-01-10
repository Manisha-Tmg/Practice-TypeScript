import { Request, Response } from "express";
import {
  createUserService,
  forgotPasswordService,
  loginUserService,
  myProfileService,
  readAllUserService,
  readUserByIdService,
  resetPasswordService,
} from "../services/user.services";
import { sendErrorMessage, sendSuccessMessage } from "../utils/responseHelper";

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await createUserService(name, email, password, address, phone);

    return sendSuccessMessage(res, "User created successfully", 200, {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      address: user?.address,
      role: user?.role,
    });
  } catch (err: any) {
    if (
      err.message === "USER_EXIST" ||
      err.message === "USER_CREATION_FAILED"
    ) {
      return sendErrorMessage(res, "Error occurred during creation", 400);
    }
    return sendErrorMessage(res, "Internal server error", 500);
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await loginUserService(email, password);

    return sendSuccessMessage(res, "Login  successfull", 200, user);
  } catch (err: any) {
    if (
      err.message === "INCORRECT_PASSWORD" ||
      err.message === "USER_DOESNOT_EXIST"
    ) {
      return sendErrorMessage(res, "Invalid Credentials", 400);
    }
    return sendErrorMessage(res, "Internal server error", 500);
  }
};

export const readAllUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await readAllUserService();

    return sendSuccessMessage(res, "User read successfully", 200, user);
  } catch (err: any) {
    if (err.message === "USER_LOAD_FAILED") {
      return sendErrorMessage(res, "Error occurred during loadings", 400);
    }
    return sendErrorMessage(res, "Internal server error", 500);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await forgotPasswordService(req.body.email);
    sendSuccessMessage(
      res,
      `Reset Password link send to ${req.body.email}`,
      200,
      null,
    );
  } catch (err: any) {
    if (err.message === "Invalid_EMAIL") {
      sendErrorMessage(res, "Email not registered", 400);
    }
    sendErrorMessage(res, "User Not found", 400);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let token: any;
    token = req.headers.authorization?.split(" ")[1];

    const newPassword = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const user = await resetPasswordService(
      newPassword,
      confirmPassword,
      token,
    );
    sendSuccessMessage(res, "Password reset was successful", 200, user as any);
  } catch (err: any) {
    if (err.message === "INVALID NEW_PASSWORD & CONFIRM_PASSWORD") {
      sendErrorMessage(
        res,
        "NewPassword and ConfirmPassowrd Didnot match",
        400,
      );
    }
    if (err.message === "INVALID_TOKEN") {
      sendErrorMessage(res, "Token expired", 400);
    }
    if (err.message === "USER_NOT_FOUND") {
      sendErrorMessage(res, "User not found", 400);
    }
    sendErrorMessage(res, "Error reseting password .Try again later", 400);
  }
};

export const readUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let userId = req.params.id as string;
    const user = await readUserByIdService(userId);
    sendSuccessMessage(res, "Profile fetched successfully", 200, user as any);
  } catch (err: any) {
    if (err.message === "ID_NOT_FOUND" || err.message === "USER_NOT_FOUND") {
      sendErrorMessage(res, "Error fetching profile", 400);
    }
  }
};

export const myProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    let userId = (req as any).id;
    const user = await myProfileService(userId);
    sendSuccessMessage(res, "Profile fetched successfully", 200, user as any);
  } catch (err: any) {
    if (err.message === "ID_NOT_FOUND" || err.message === "USER_NOT_FOUND") {
      sendErrorMessage(res, "Error fetching profile", 400);
    }
  }
};
