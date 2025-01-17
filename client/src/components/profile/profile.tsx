import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FavoriteItem } from "../../interfaces/Favorite";
import { InventoryItem } from "../../interfaces/Inventory";
import { getFavorites } from "../../services/apiService";
import Inventory from "./inventory/inventory";

interface ProfileProps {
  inventory: InventoryItem[];
  getInventory: () => Promise<void>;
}

function Profile ({
  inventory,
  getInventory,//TODO remove from here
}: ProfileProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  async function getFavorite(): Promise<void> {
    const favorites = await getFavorites();
    setFavorites(favorites);
  }
    
  useEffect(() => {
    getFavorite();

  }, []);

  return (
    <>
      <div className="profile-container">
        <div className="profile-section-1">
          <div className="welcome-text">
            <h2 className="subtitle">Welcome to barSync!</h2>
            <p>
              To the right you will see your ingredient inventory where you can
              store ingredients you already own.
            </p>
            <p>
              If you wish to add a new ingredient select the button in the bar
              above.
            </p>
            <p>Want to make something? Select the button in the bar above.</p>
          </div>
          <div className="inventory-container">
            <Inventory
              inventory={inventory}
              getInventory={getInventory}
            ></Inventory>
          </div>
        </div>
        <div className="profile-section-2">
          <h2 className="subtitle favorite-text">Favorites:</h2>
          <div className="recipe-favorites-container">
            {favorites.length ? (
              favorites.map((favorite) => {
                return (
                  <div className="recipe-tile" key={favorite.idDrink}>
                    <Link to={"/recipe/" + favorite.idDrink}>
                      <img
                        className="recipe-tile-img"
                        src={favorite.strDrinkThumb}
                      ></img>
                    </Link>
                    <p className="recipe-tile-text">{favorite.strDrink}</p>
                  </div>
                );
              })
            ) : (
              <p className="recipe-tile-default-text subtitle">
                No favorites to display! Take a look at some recipes to add
                some!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
