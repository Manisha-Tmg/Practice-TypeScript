import { NextFunction, Request, Response } from "express";

const pageNotFound = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({
    sucess: false,
    message: "Page Not Found",
  });
};
export default pageNotFound;
