import axios from "axios";
import Aply from "../models/AplyModel.js";
import Loker from "../models/LokerModel.js";
import Users from "../models/UserModel.js";
import Interview from "../models/InterviewModel.js";
import Berkas from "../models/BerkasModel.js";
import Psikotes from "../models/PsikotesModel.js";

export const getAply = async (req, res) => {
  try {
    const aply = await Aply.findAll();
    if (aply) {
      res.json(aply);
    } else {
      res.json({ message: "Aply not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAplyById = async (req, res) => {
  try {
    const { id } = req.params;
    const aply = await Aply.findOne({
      where: {
        id: id,
      },
    });
    if (aply) {
      res.json(aply);
    } else {
      res.json({ message: "Aply not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createAply = async (req, res) => {
  try {
    const { id_loker, id_user } = req.body;
    const aply = await Aply.create({
      id_loker,
      id_user,
    });
    if (aply) {
      res.json(aply);
    } else {
      res.json({ message: "Aply not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAplyByIdInclude = async (req, res) => {
  try {
    const { id } = req.params;
    const aply = await Aply.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Loker,
          as: "loker",
        },
        {
          model: Users,
          as: "user",
        },
        {
          model: Interview,
          as: "interview",
          include: [
            {
              model: Psikotes,
            },
          ],
        },
        {
          model: Berkas,
          as: "berkas",
        },
      ],
    });
    if (aply) {
      res.json(aply);
    } else {
      res.json({ message: "Aply not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyAply = async (req, res) => {
  try {
    const { id } = req.params;
    const { tanggal_interview, metode_interview, hasilWawancara } = req.body;
    const aply = await Aply.findOne({
      where: {
        id: id,
      },
    });
    if (aply) {
      const aply = await Aply.update(
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
      const data = await axios.post("http://localhost:5000/interview", {
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
