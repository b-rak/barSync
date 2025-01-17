"use strict";
import { Request, Response } from "express";
import { db } from "../models/index";

const getInventory = async (req: Request, res: Response) => {
  try {
    const inventory = await db.inventory.findAll();
    res.status(201).json(inventory);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const addIngredient = async (req: Request, res: Response) => {
  try {
    const ingredient = req.body.strIngredient1;
    await db.inventory.create({ strIngredient1: ingredient });
    res.status(201).json({message : "Added to Ingredient"});

  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const removeIngredient = async (req: Request, res: Response) => {
  try {
    const ingredient = req.body.strIngredient1;
    await db.inventory.destroy({
      where: {
        strIngredient1: ingredient,
      },
    });
    res.status(201).json({message: "ingredient removed"});
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export default { getInventory, addIngredient, removeIngredient };
