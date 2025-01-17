"use strict";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();
const url = process.env.API_URL || "http://www.thecocktaildb.com/api/json/v2/";
const api_key = process.env.API_KEY || "ANOTHER_KEY";

const getIngredientList = async (req: Request, res: Response) => {
  const ingredientListUrl = url + api_key + "/list.php?i=list";
  console.log("URLRU", ingredientListUrl)

  try {
    const response = await fetch(ingredientListUrl);
    const fetchResponse = await response.json();
    res.status(201);
    res.send(fetchResponse);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const getFilteredRecipes = async (req: Request, res: Response) => {
  const convertedFilter = req.params.filter.replace(/9/g, ",");

  const recipeListUrl = url + api_key + "/filter.php?i=" + convertedFilter;
  try {
    const response = await fetch(recipeListUrl);
    const fetchResponse = await response.json();
    res.status(201);
    res.send(fetchResponse);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const getRecipeDetails = async (req: Request, res: Response) => {
  const recipeDetailUrl = url + api_key + "/lookup.php?i=" + req.params.drinkId;
  try {
    const response = await fetch(recipeDetailUrl);
    const fetchResponse = await response.json();
    res.status(201);
    res.send(fetchResponse);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export default { getIngredientList, getFilteredRecipes, getRecipeDetails };
