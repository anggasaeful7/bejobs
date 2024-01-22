import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import Users from "./models/UserModel.js";
import Admin from "./models/AdminModels.js";
import Perusahaan from "./models/PerusahaanModel.js";
import Loker from "./models/LokerModel.js";
import Aply from "./models/AplyModel.js";
import Berkas from "./models/BerkasModel.js";
import Interview from "./models/InterviewModel.js";
import Psikotes from "./models/PsikotesModel.js";
import Test from "./models/TestModel.js";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
} catch (error) {
  console.error(error);
}

Perusahaan.hasMany(Loker, { foreignKey: "id_perusahaan" });
Loker.belongsTo(Perusahaan, { foreignKey: "id_perusahaan" });
Users.hasMany(Aply, { foreignKey: "id_user" });
Aply.belongsTo(Users, { foreignKey: "id_user" });
Loker.hasOne(Aply, { foreignKey: "id_loker" });
Aply.belongsTo(Loker, { foreignKey: "id_loker" });
Aply.hasMany(Berkas, { foreignKey: "id_aply" });
Berkas.belongsTo(Aply, { foreignKey: "id_aply" });
Aply.hasOne(Interview, { foreignKey: "id_aply" });
Interview.belongsTo(Aply, { foreignKey: "id_aply" });
Interview.hasOne(Psikotes, { foreignKey: "id_interview" });
Psikotes.belongsTo(Interview, { foreignKey: "id_interview" });
// Test.hasOne(Psikotes, { foreignKey: "id_test" });
// Psikotes.belongsTo(Test, { foreignKey: "id_test" });

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use("/dokumen", express.static("public/berkas"));

Users.sync();
Admin.sync();
Perusahaan.sync();
Loker.sync();
Aply.sync();
Berkas.sync();
Interview.sync();
Psikotes.sync();
Test.sync();

app.listen(5000, () => console.log("Server running at port 5000"));
