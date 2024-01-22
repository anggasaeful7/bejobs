import axios from "axios";
import Berkas from "../models/BerkasModel.js";

export const getBerkas = async (req, res) => {
  try {
    const berkas = await Berkas.findAll();
    if (berkas) {
      res.json(berkas);
    } else {
      res.json({ message: "Berkas not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getBerkasById = async (req, res) => {
  try {
    const berkas = await Berkas.findOne({
      where: { id_berkas: req.params.id },
    });
    if (berkas) {
      res.json(berkas);
    } else {
      res.json({ message: "Berkas not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createBerkas = async (req, res) => {
  try {
    const { id_aply, jenis_berkas } = req.body;
    const uploadedFileName = req.file.filename;
    const berkas = await Berkas.create({
      id_aply,
      jenis_berkas,
      nama_berkas: uploadedFileName,
    });
    if (berkas) {
      res.json(berkas);
    } else {
      res.json({ message: "Berkas not found" });
    }
  } catch (error) {}
};

export const verifyBerkas = async (req, res) => {
  try {
    const { id } = req.params;
    const { tanggal_interview, metode_interview, hasilWawancara } = req.body;
    const aply = await Berkas.findOne({
      where: {
        id: id,
      },
    });
    if (aply) {
      const aply = await Berkas.update(
        {
          status: "Verified",
        },
        {
          where: {
            id: id,
          },
        }
      );

      //   consume api post interview
      const data = await axios.post("http://localhost:5001/interview", {
        id_aply: id,
        tanggal_interview: tanggal_interview,
        metode_interview: metode_interview,
        hasilWawancara: hasilWawancara,
      });
      const reqmsg = {
        target: "082118161569",
        message: `Anda dipanggil untuk interview pada tanggal ${tanggal_interview} dengan metode ${metode_interview}`,
      };

      const result = await axios.post("https://api.fonnte.com/send", reqmsg, {
        headers: {
          Authorization: "xaL@fa!LhsLkwxXtn!Zv",
        },
      });
      res.json({ message: "Verified" });
    } else {
      res.json({ message: "Aply not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
