import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "db-user", "db-p4ss", {
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

export default sequelize;
