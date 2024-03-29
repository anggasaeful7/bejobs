import axios from "axios";
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findAll({
      where: {
        id: id,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const createUsers = async (req, res) => {
  try {
    const { nama, email, alamat, nomor, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const users = await Users.create({
      nama,
      email,
      alamat,
      nomor,
      password: hashPassword,
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, alamat, nomor, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const users = await Users.update(
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
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await Users.destroy({
      where: {
        id: id,
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { nomor } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const waktu = Math.floor(Date.now() / 1000);
  try {
    await Users.destroy({
      where: {
        nomor: nomor,
      },
    });

    await Users.create({
      nomor: nomor,
      otp: otp,
      waktu: waktu,
    });

    const data = {
      target: nomor,
      message: `Your OTP: ${otp}`,
    };

    const result = await axios.post("https://api.fonnte.com/send", data, {
      headers: {
        Authorization: "xaL@fa!LhsLkwxXtn!Zv",
      },
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const Verify = async (req, res) => {
  const { nomor, otp } = req.body;
  try {
    const user = await Users.findOne({
      where: {
        nomor: nomor,
        otp: otp,
      },
    });
    if (user) {
      const waktuOtp = user.waktu;
      const currentTime = Math.floor(Date.now() / 1000);
      const otpExpired = currentTime - waktuOtp > 300;

      if (!otpExpired) {
        await Users.update(
          { aktif: "ya" },
          {
            where: {
              nomor: nomor,
            },
          }
        );
        res.json({ message: "OTP is correct" });
      } else {
        res.status(400).json({ error: "OTP expired" });
      }
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const waktu = Math.floor(Date.now() / 1000);
    const user = await Users.findAll({
      where: {
        nomor: req.body.nomor,
      },
    });
    const userId = user[0].id;
    const nomor = user[0].nomor;
    const accessToken = jwt.sign(
      { userId, nomor },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userId, nomor },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const data = {
      target: nomor,
      message: `Your OTP: ${otp}`,
    };

    const result = await axios.post("https://api.fonnte.com/send", data, {
      headers: {
        Authorization: "xaL@fa!LhsLkwxXtn!Zv",
      },
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
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
