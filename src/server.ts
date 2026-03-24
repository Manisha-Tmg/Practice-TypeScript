import { configDotenv } from "dotenv";
import { connectToDb } from "./database/connection";
import { App } from "./config/app";

configDotenv();

const Port = process.env.PORT;
async function start() {
  await connectToDb();

  const appInstance = new App();

  appInstance.app.listen(Port, () => {
    console.log(`App is listening at ${Port}`);
  });
}

start();
