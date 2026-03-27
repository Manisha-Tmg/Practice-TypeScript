import { Request, Response } from "express";
import {
  createUserService,
  loginUserService,
  readAllUserService,
} from "../services/user.services";
import { sendErrorMessage, sendSuccessMessage } from "../utils/responseHelper";

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await createUserService(name, email, password, address, phone);

    return sendSuccessMessage(res, "User created successfully", 200, user);
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
