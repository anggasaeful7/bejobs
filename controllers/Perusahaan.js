import Perusahaan from "../models/PerusahaanModel.js";

export const getPerusahaan = async (req, res) => {
  try {
    const perusahaan = await Perusahaan.findAll();
    if (perusahaan) {
      res.json(perusahaan);
    } else {
      res.json({ message: "Perusahaan not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPerusahaanById = async (req, res) => {
  try {
    const { id } = req.params;
    const perusahaan = await Perusahaan.findOne({
      where: {
        id: id,
      },
    });
    if (perusahaan) {
      res.json(perusahaan);
    } else {
      res.json({ message: "Perusahaan not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createPerusahaan = async (req, res) => {
  try {
    const {
      nama_perusahaan,
      alamat_perusahaan,
      telepon_perusahaan,
      deskripsi,
      //   email,
      //   youtube,
      //   instagram,
      //   foto,
    } = req.body;
    const perusahaan = await Perusahaan.create({
      nama_perusahaan,
      alamat_perusahaan,
      telepon_perusahaan,
      deskripsi,
      //   email,
      //   youtube,
      //   instagram,
      //   foto,
    });
    if (perusahaan) {
      res.json(perusahaan);
    } else {
      res.json({ message: "Perusahaan not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
