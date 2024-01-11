import Psikotes from "../models/PsikotesModel.js";
import Test from "../models/TestModel.js";

export const getTest = async (req, res) => {
  try {
    const test = await Test.findAll();
    if (test) {
      res.json(test);
    } else {
      res.json({ message: "Test not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createPsikotes = async (req, res) => {
  try {
    const { id_interview, id_test, jawaban, hasil } = req.body;
    const psikotes = await Psikotes.create({
      id_interview,
      id_test,
      jawaban,
      hasil,
    });
    if (psikotes) {
      res.json(psikotes);
    } else {
      res.json({ message: "Psikotes not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
