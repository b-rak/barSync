import { InventoryItem } from "../../../interfaces/Inventory";
import Ingredient from "./ingredient";
interface InventoryProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  getInventory: () => Promise<void>;
}

function Inventory({ inventory, setInventory, getInventory }: InventoryProps) {
  return (
    <>
      <h2 className="subtitle">Inventory:</h2>
      {inventory.length ? (
        inventory.map((ingredient) => {
          return (
            <Ingredient
              key={ingredient.strIngredient1}
              ingredient={ingredient}
              inventory={inventory}
              getInventory={getInventory}
            ></Ingredient>
          );
        })
      ) : (
        <p>No ingredients! Select Add Ingredient above to begin!</p>
      )}
    </>
  );
}

export default Inventory;
