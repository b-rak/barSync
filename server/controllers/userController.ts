import bcrypt from "bcrypt";
import { db } from "../models/index";
import { Request, Response } from "express";

const rounds = process.env.SALTROUNDS || 10;

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });
    if (user) {
      res.status(409).send({ error: "409", message: "User already exists!" });
    }
    if (password === "") throw new Error();
    const hash = await bcrypt.hash(password, rounds);
    const newUser = await db.user.create({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: hash,
    });
    req.session.id = newUser.id.toString();
    res.status(201).send(user);
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
    req.session.id = user.id.toString();
    res.status(200).send(user);
  } catch (error) {
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

const logout = async (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: "Could not log out, please try again" });
    } else {
      res.clearCookie("sid");
      res.status(200).send({ message: "Logout successful" });
    }
  });
};

export default { createUser, login, logout };