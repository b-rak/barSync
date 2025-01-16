import { db } from "../models";
import { Request, Response, NextFunction } from "express";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.session;
    const user = await db.user.findOne({where: { id: id }});
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

export default authMiddleware;
