import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { db } from "../models/index";
const jwt = require('jsonwebtoken');

const rounds = process.env.SALTROUNDS || 10;
const SECRET_KEY = process.env.SECRET_KEY || 'default';

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });
    if (user) {
      res.status(409).send({ error: "409", message: "User already exists!" });
    }
    if (password.length < 6 ) throw new Error('password is too short');
    const hash = await bcrypt.hash(password, rounds);
    const newUser = await db.user.create({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: hash,
    });

    // req.session.id = newUser.id.toString();
    res.status(201).send({ message: 'user register successfully' });
  } catch (error) {
    res.status(400).send({ error, message: "Could not create user" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).send({ error: 'Wrong credentials' });
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) throw new Error();

    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    res.status(200).send({ accessToken });

  } catch (error) {
    res.status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

const logout = async (req: Request, res: Response) => {
  // in JWT logout will be handle from clent side
  // req.session.destroy((error) => {
  //   if (error) {
  //     res
  //       .status(500)
  //       .send({ error, message: "Could not log out, please try again" });
  //   } else {
  //     res.clearCookie("sid");
  //     res.status(200).send({ message: "Logout successful" });
  //   }
  // });
};

export default { createUser, login, logout };