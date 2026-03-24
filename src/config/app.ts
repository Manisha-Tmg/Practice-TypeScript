import express from "express";
import cors from "cors";

export class App {
  public app = express();

  constructor() {
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware() {
    this.app.use(
      cors({
        origin: "",
        credentials: true,
      }),
    );
  }
  private initializeRoutes() {
    // define routes
  }
}
