import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Test = db.define(
  "tests",
  {
    pertanyaan: {
      type: DataTypes.STRING,
    },
    score: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Test;
