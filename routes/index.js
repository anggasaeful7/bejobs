import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  Verify,
  createUsers,
  getUserById,
  updateUsers,
  deleteUsers,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  LoginAdmin,
  LogoutAdmin,
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
} from "../controllers/Admins.js";
import { createPerusahaan, getPerusahaan } from "../controllers/Perusahaan.js";
import { createLoker, getLoker, getLokerById } from "../controllers/Loker.js";
import {
  createAply,
  getAply,
  getAplyById,
  getAplyByIdInclude,
  verifyAply,
} from "../controllers/Aply.js";
import {
  createInterview,
  getInterview,
  getInterviewById,
} from "../controllers/Interview.js";
import { createBerkas, getBerkas } from "../controllers/Berkas.js";
import upload from "../middleware/Multer.js";
import { createPsikotes, getTest } from "../controllers/Psikotes.js";

const router = express.Router();

// Menu Admin Authentikasi
router.post("/admin/login", LoginAdmin);
router.post("/admin/logout", LogoutAdmin);

// Menu Admin Kelola Admin
router.get("/admin", verifyToken, getAdmin);
router.post("/admin", verifyToken, createAdmin);
router.get("/admin/:id", verifyToken, getAdminById);
router.put("/admin/:id", verifyToken, updateAdmin);
router.delete("/admin/:id", deleteAdmin);

// Menu Admin Kelola Users
router.get("/users", verifyToken, getUsers);
router.post("/users/create", verifyToken, createUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/users/:id", verifyToken, updateUsers);
router.delete("/users/:id", deleteUsers);

router.post("/users", Register);
router.post("/verify", Verify);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

// Menu Admin Kelola Perusahaan
router.get("/perusahaan", getPerusahaan);
router.post("/perusahaan", createPerusahaan);

// Menu Admin Kelola Loker
router.get("/loker", getLoker);
router.get("/loker/:id", getLokerById);
router.post(
  "/loker",
  upload.fields([
    { name: "ktp", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  createLoker
);

// Menu Admin Kelola Aply
router.get("/aply", getAply);
router.get("/aply/:id", getAplyById);
router.post("/aply/:id/verif", verifyAply);

// Menu USer Aply Loker
router.post(
  "/aply",
  upload.fields([
    { name: "ktp", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  createAply
);
router.get("/aply/show/:id", getAplyByIdInclude);

// Menu Admin Kelola Interview
router.get("/interview", getInterview);
router.get("/interview/:id", getInterviewById);
router.post("/interview", createInterview);

// Berkas
router.get("/berkas", getBerkas);
router.post("/berkas", upload.single("nama_berkas"), createBerkas);

router.get("/test", getTest);
router.post("/psikotes", createPsikotes);

export default router;
