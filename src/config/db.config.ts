import { Sequelize } from "sequelize";
// export const db = new Sequelize(process.env.DATABASE_NAME as string, process.env.DATABASE_USERNAME as string, process.env.DATABASE_PASSWORD as string, {
export const db = new Sequelize(
  process.env.DATABASE_NAME!,
  process.env.DATABASE_USERNAME!,
  process.env.DATABASE_PASSWORD!,
  {
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
    // operatorsAliases: false,
  }
);
