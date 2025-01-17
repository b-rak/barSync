import { useEffect, useState } from "react";
import { IngredientItem } from "../../../interfaces/Ingredient";
import { InventoryItem } from "../../../interfaces/Inventory";
import { addIngredient, removeIngredient } from "../../../services/apiService";

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

  async function handleClick () {
    if (added) {
      await removeIngredient(ingredient);
    } else {
      await addIngredient(ingredient);
    }
    getInventory();
  }

  return (
    <>
      <div className="ingredient-container">
        <p>{ingredient.strIngredient1}</p>
        <button
          className="ingredient-button"
          onClick={handleClick}
        >
          {added
            ? String.fromCodePoint("0x1F5D1")
            : String.fromCodePoint("0x1F378")}
        </button>
      </div>
    </>
  );
}

export default Ingredient;
