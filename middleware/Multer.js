import multer from "multer";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/berkas");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const fileName = file.originalname;
    const fileNameCrypted = crypto.randomBytes(16).toString("hex");
    const ext = fileName.split(".").pop();

    cb(null, `${timestamp}-${fileNameCrypted}.${ext}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
