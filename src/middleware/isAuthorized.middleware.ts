import { NextFunction, Request, Response } from "express";
import User from "../database/model/user.model";

const isAuthorized = async (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let userId = (req as any).id;

      let user = await User.findByPk(userId);

      if (!user) {
        return console.log("User not fpund");
      }
      const role = user.role;

      if (roles?.includes(role)) {
      }
    } catch (error: any) {
      return res.status(403).json({
        success: false,
        message: "User not authorized",
      });
    }
  };
};
export default isAuthorized;
