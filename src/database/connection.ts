import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: process.env.DB_NAME!,
  dialect: "mysql",
  username: process.env.DB_USERNAME!,
  password: String(process.env.DB_PASSWORD)!,
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  logging: false,
  models: [__dirname + "/model"],
});

console.log("DB Password:", process.env.DB_PASSWORD);
export const connectToDb = async (): Promise<void> => {
  // connect to database
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (err) {
    console.error(" Unable to connect to the database:", err);
    throw err;
  }

  // sync database
  try {
    await sequelize.sync({ alter: false });
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("An error occurred while synchronizing the models:", err);
    throw err;
  }
};

export default sequelize;
