//TODO: when removing last ingredient from inventory doesn't remove it.
import { Link } from "react-router";
import Ingredient from "./ingredient";

function Inventory({ inventory, setInventory, getInventory }) {
  return (
    <>
      <h2>Inventory</h2>
      {inventory.length ? (
        inventory.map((ingredient) => {
          return (
            <Ingredient
              key={ingredient.strIngredient1}
              ingredient={ingredient}
              inventory={inventory}
              setInventory={setInventory}
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
