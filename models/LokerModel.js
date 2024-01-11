import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Loker = db.define(
  "lokers",
  {
    nama: {
      type: DataTypes.STRING,
    },
    id_perusahaan: {
      type: DataTypes.INTEGER,
    },
    gaji: {
      type: DataTypes.STRING,
    },
    kategori: {
      type: DataTypes.STRING,
    },
    tipe: {
      type: DataTypes.STRING,
    },
    akademik: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pengalaman: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tags: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.TEXT("long"),
    },
    lokasi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    syarat: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    syarat_tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    benefit: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skill: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Loker;
