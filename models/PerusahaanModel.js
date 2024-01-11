import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Perusahaan = db.define(
  "perusahaans",
  {
    nama_perusahaan: {
      type: DataTypes.STRING,
    },
    alamat_perusahaan: {
      type: DataTypes.STRING,
    },
    telepon_perusahaan: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    youtube: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Perusahaan;
