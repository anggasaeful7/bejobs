import Test from "../models/TestModel.js";

export const createTest = async (req, res) => {
  try {
    const { pertanyaan, score } = req.body;
    const test = await Test.create({
      pertanyaan,
      score,
    });
    if (test) {
      res.json(test);
    } else {
      res.json({ message: "Test not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
