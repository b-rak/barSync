"use strict";

import { Router } from "express";
import inventoryController from "./controllers/inventoryController";
import apiController from "./controllers/apiController";
import favoriteController from "./controllers/favoritesController";

const router = Router();

router.get("/inventory", inventoryController.getInventory);
router.post("/inventory", inventoryController.addIngredient);
router.delete("/inventory", inventoryController.removeIngredient);

router.get("/favorites", favoriteController.getFavorites);
router.post("/favorites", favoriteController.addFavorite);
router.delete("/favorites", favoriteController.removeFavorite);

router.get("/ingredient_list", apiController.getIngredientList);
router.get("/recipedetail/:drinkId", apiController.getRecipeDetails);
router.get("/filtered_recipes/:filter", apiController.getFilteredRecipes);

export { router };
