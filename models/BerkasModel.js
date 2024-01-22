import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Berkas = db.define(
  "berkas",
  {
    id_aply: {
      type: DataTypes.INTEGER,
    },
    jenis_berkas: {
      type: DataTypes.STRING,
    },
    nama_berkas: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Berkas;
