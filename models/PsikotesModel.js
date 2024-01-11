import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Test from "./TestModel.js";

const { DataTypes } = Sequelize;

const Psikotes = db.define(
  "psikotes",
  {
    id_interview: {
      type: DataTypes.INTEGER,
    },
    id_test: {
      type: DataTypes.INTEGER,
    },
    jawaban: {
      type: DataTypes.STRING,
    },
    hasil: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Psikotes.hasOne(Test, { foreignKey: "id_test" });
Test.belongsTo(Psikotes, { foreignKey: "id_test" });

export default Psikotes;
