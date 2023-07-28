import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "sam", "test", {
  dialect: "sqlite",
  storage: "../../database.sqlite",
  logging: false,
});

export default sequelize;
