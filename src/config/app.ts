import express from "express";
import cors from "cors";
import userRouter from "../routes/user.routes";

export class App {
  public app = express();

  constructor() {
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware() {
    this.app.use(
      cors({
        origin: "http://localhost/5135",
        credentials: true,
      }),
    );
    this.app.use(express.json());
  }
  private initializeRoutes() {
    // define routes
    this.app.use("/user", userRouter);
  }
}
