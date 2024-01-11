import Admin from "../models/AdminModels.js";
import bcrypt from "bcrypt";

export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findAll();
    res.json(admin);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findAll({
      where: {
        id: id,
      },
    });
    res.json(admin);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { nama, email, alamat, nomor, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({
      nama,
      email,
      alamat,
      nomor,
      password: hashPassword,
    });
    res.json(admin);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, alamat, nomor, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.update(
      {
        nama,
        email,
        alamat,
        nomor,
        password: hashPassword,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json(admin);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.destroy({
      where: {
        id: id,
      },
    });
    res.json(admin);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export const LoginAdmin = async (req, res) => {
  try {
    const user = await Admin.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const name = user[0].nama;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Admin.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshTokenAdmin", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

export const LogoutAdmin = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Admin.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Admin.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
