import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import IngredientSearch from "./components/profile/inventory/ingredientSearch";
import RecipeDetail from "./components/profile/recipes/recipe-detail";
import RecipeList from "./components/profile/recipes/recipe-list";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ingredientsearch" element={<IngredientSearch />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
