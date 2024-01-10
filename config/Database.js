import { Sequelize } from "sequelize";

const db = new Sequelize("indodaya", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
