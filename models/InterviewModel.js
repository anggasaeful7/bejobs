import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Interview = db.define(
  "interviews",
  {
    id_aply: {
      type: DataTypes.INTEGER,
    },
    tanggal_interview: {
      type: DataTypes.DATE,
    },
    metode_interview: {
      type: DataTypes.STRING,
    },
    hasilWawancara: {
      type: DataTypes.TEXT("long"),
    },
  },
  {
    freezeTableName: true,
  }
);

export default Interview;
