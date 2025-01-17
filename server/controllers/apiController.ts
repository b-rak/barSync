"use strict";
import { Request, Response } from "express";

const url = process.env.API_URL || "http://www.thecocktaildb.com/api/json/v2/";
const api_key = process.env.API_KEY || "ANOTHER_KEY";

const getIngredientList = async (req: Request, res: Response) => {
  const ingredientListUrl = url + api_key + "/list.php?i=list";

  try {
    const response = await fetch(ingredientListUrl);
    const data = await response.json();
    res.status(201).json(data);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const getFilteredRecipes = async (req: Request, res: Response) => {
  const convertedFilter = req.params.filter.replace(/9/g, ",");

  const recipeListUrl = url + api_key + "/filter.php?i=" + convertedFilter;
  try {
    const response = await fetch(recipeListUrl);
    const data = await response.json();
    res.status(201).json(data);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const getRecipeDetails = async (req: Request, res: Response) => {
  const recipeDetailUrl = url + api_key + "/lookup.php?i=" + req.params.drinkId;
  try {
    const response = await fetch(recipeDetailUrl);
    const data = await response.json();
    res.status(201).json(data);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export default { getIngredientList, getFilteredRecipes, getRecipeDetails };
