import Loker from "../models/LokerModel.js";

export const getLoker = async (req, res) => {
  try {
    const loker = await Loker.findAll();
    if (loker) {
      res.json(loker);
    } else {
      res.json({ message: "Loker not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLokerById = async (req, res) => {
  try {
    const { id } = req.params;
    const loker = await Loker.findOne({
      where: {
        id: id,
      },
    });
    if (loker) {
      res.json(loker);
    } else {
      res.json({ message: "Loker not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createLoker = async (req, res) => {
  try {
    const {
      nama,
      id_perusahaan,
      gaji,
      kategori,
      tipe,
      tags,
      deskripsi,
      syarat,
      lokasi,
    } = req.body;
    const loker = await Loker.create({
      nama,
      id_perusahaan,
      gaji,
      kategori,
      tipe,
      tags,
      deskripsi,
      syarat,
      lokasi,
    });
    if (loker) {
      res.json(loker);
    } else {
      res.json({ message: "Loker not created" });
    }
  } catch (error) {
    console.log(error);
  }
};
