import { db } from "../models";
import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'default';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) return res.sendStatus(403);
    const token = authHeaders.split(' ')[1];

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      
      const user = await db.user.findOne({where: { id: id }});
      if (!user) return res.sendStatus(401);
      req.user = user;
  
      next();
    } catch (error) {
      res.sendStatus(401);
    }
  }
}

export default authMiddleware;
