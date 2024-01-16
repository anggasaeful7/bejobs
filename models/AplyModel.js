import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Aply = db.define(
  "aplys",
  {
    id_loker: {
      type: DataTypes.INTEGER,
    },
    nama: {
      type: DataTypes.STRING,
    },
    nik: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.STRING,
    },
    pendidikan: {
      type: DataTypes.STRING,
    },
    pengalaman: {
      type: DataTypes.STRING,
    },
    ktp: {
      type: DataTypes.STRING,
    },
    cv: {
      type: DataTypes.STRING,
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
