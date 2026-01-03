import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const secretKey = process.env.SECRET_KEY;

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("TOKEN_NOT_FOUND");
    }
    let token: any;
    let decoded: any;
    token = req.headers.authorization?.split(" ")[1];
    decoded = jwt.verify(token, secretKey as any);
    (req as any).id = decoded.id;
    next();
  } catch (error) {
    return res.status(404).json({ message: "UNAUTHORIZED!!" });
  }
};

export default isAuthenticated;
