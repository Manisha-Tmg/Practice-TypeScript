import { Request, Response } from "express";

export const sendSuccessMessage = async (
  res: Response,
  message: string,
  statusCode: number,
  user: any,
) => {
  res.status(statusCode).json({ message, user });
};
export const sendErrorMessage = async (
  res: Response,
  message: string,
  statusCode: number,
) => {
  res.status(statusCode).json(message);
};
