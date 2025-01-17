import { useEffect, useState } from "react";
import { IngredientItem } from "../../../interfaces/Ingredient";
import { InventoryItem } from "../../../interfaces/Inventory";

interface IngredientProps {
  ingredient: IngredientItem;
  inventory: InventoryItem[];
  getInventory: () => Promise<void>;
}

function Ingredient({ ingredient, inventory, getInventory }: IngredientProps )  {
  const [added, setAdded] = useState(false);

  const plainTextInventory = inventory.map((el) => el.strIngredient1);

  useEffect(() => {
    if (
      inventory.length &&
      plainTextInventory.includes(ingredient.strIngredient1)
    ) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, [inventory]);

  async function addIngredient() {
    try {
      await fetch("http://localhost:3000/inventory", {
        method: "POST",
        body: JSON.stringify({ strIngredient1: ingredient.strIngredient1 }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      getInventory();
    } catch (error) {
      console.log(error);
    }
  }

  async function removeIngredient() {
    try {
      await fetch("http://localhost:3000/inventory", {
        method: "DELETE",
        body: JSON.stringify({ strIngredient1: ingredient.strIngredient1 }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      getInventory();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="ingredient-container">
        <p>{ingredient.strIngredient1}</p>
        <button
          className="ingredient-button"
          onClick={added ? removeIngredient : addIngredient}
        >
          {added
            ? String.fromCodePoint(parseInt("0x1F5D1", 16))
            : String.fromCodePoint(parseInt("0x1F378", 16))}
        </button>
      </div>
    </>
  );
}

export default Ingredient;
