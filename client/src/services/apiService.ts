import { IngredientItem } from "../interfaces/Ingredient";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

async function makeServerRequest (endpoint: string, options?: RequestInit) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error("error fetching data");
    }
    return await response.json();
  } catch (e) {
    throw new Error(`API Error: ${e}`);
  }
}

async function addIngredient(ingredient: IngredientItem) {
  try {
    await makeServerRequest("inventory", {
      method: "POST",
      body: JSON.stringify({ strIngredient1: ingredient.strIngredient1 }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.log(error);
  }
}

async function removeIngredient(ingredient: IngredientItem) {
  try {
    await fetch("inventory", {
      method: "DELETE",
      body: JSON.stringify({ strIngredient1: ingredient.strIngredient1 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export { addIngredient, removeIngredient }
