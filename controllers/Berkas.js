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
