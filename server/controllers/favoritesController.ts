"use strict";
import { Request, Response } from "express";
import { db } from "../models/index";

const getFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await db.favoritesModel.findAll();
    res.status(201);
    res.send(favorites);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const addFavorite = async (req: Request, res: Response) => {
  try {
    const favoriteId = req.body.idDrink;
    const favoriteThumb = req.body.strDrinkThumb;
    const favoriteTitle = req.body.strDrink;
    await db.favoritesModel.create({
      idDrink: favoriteId,
      strDrinkThumb: favoriteThumb,
      strDrink: favoriteTitle,
    });
    res.status(201);
    res.send("added to favorites");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const removeFavorite = async (req: Request, res: Response) => {
  try {
    const favorite = req.body.idDrink;
    await db.favoritesModel.destroy({
      where: {
        idDrink: favorite,
      },
    });
    res.status(201);
    res.send("removed from db");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export default { getFavorites, addFavorite, removeFavorite };