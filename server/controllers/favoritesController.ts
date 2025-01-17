"use strict";
import { Request, Response } from "express";
import { db } from "../models/index";

const getFavorites = async (req: Request, res: Response) => {
  try {
    const data = await db.favoritesModel.findAll();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const addFavorite = async (req: Request, res: Response) => {
  try {
    const {idDrink, strDrinkThumb, strDrink } = req.body;
    
    await db.favoritesModel.create({
      idDrink: idDrink,
      strDrinkThumb: strDrinkThumb,
      strDrink: strDrink,
    });
    res.status(201).json({ message: 'Added to favorites'});

  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const removeFavorite = async (req: Request, res: Response) => {
  try {
    const {idDrink} = req.body;

    if (!idDrink) {
      return res.status(400).json({ error: "Missing required field: idDrink." });
    }

    await db.favoritesModel.destroy({
      where: { idDrink: idDrink },
    });
    
    res.status(201).json({message: "Removed from favorites."});
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export default { getFavorites, addFavorite, removeFavorite };