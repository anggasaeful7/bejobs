import Interview from "../models/InterviewModel.js";

export const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findAll();
    if (interview) {
      res.json(interview);
    } else {
      res.json({ message: "Interview not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findOne({
      where: {
        id: id,
      },
    });
    if (interview) {
      res.json(interview);
    } else {
      res.json({ message: "Interview not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createInterview = async (req, res) => {
  try {
    const { id_aply, tanggal_interview, metode_interview, hasilWawancara } =
      req.body;
    const interview = await Interview.create({
      id_aply,
      tanggal_interview,
      metode_interview,
      hasilWawancara,
    });
    if (interview) {
      res.json(interview);
    } else {
      res.json({ message: "Interview not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
