import dotenv from "dotenv";
dotenv.config();

import { connectToDb } from "./database/connection";
import { App } from "./config/app";
import adminSeed from "./seed/superAdmin.seed";

const Port = process.env.PORT || 5050;
async function start() {
  await connectToDb();
  await adminSeed();

  const appInstance = new App();

  appInstance.app.listen(Port, () => {
    console.log(`App is listening at ${Port}`);
  });
}

start();
