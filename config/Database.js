import { Sequelize } from "sequelize";

// const db = new Sequelize("indodaya", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

const db = new Sequelize("job", "admin", "adminCloud07", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
