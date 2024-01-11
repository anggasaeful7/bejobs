import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Aply = db.define(
  "aplys",
  {
    id_loker: {
      type: DataTypes.INTEGER,
    },
    id_user: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
  },
  {
    freezeTableName: true,
  }
);

export default Aply;
