import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/nav-bar/nav-bar";
import Profile from "./components/profile/profile";
import { FavoriteItem } from "./interfaces/Favorite";
import { InventoryItem } from "./interfaces/Inventory";
import "./interfaces/InventoryItem";
 

function App() {

  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  async function getInventory(): Promise<void> {
    const url = "http://localhost:3000/inventory";
    try {
      const response = await fetch(url);
      const fetchInventory: InventoryItem[] = await response.json();
      if (fetchInventory.length) {
        setInventory(fetchInventory);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getFavorites(): Promise<void> {
    const url = "http://localhost:3000/favorites";
    try {
      const response = await fetch(url);
      const fetchFavorites : FavoriteItem[]= await response.json();
      if (fetchFavorites.length) {
        setFavorites(fetchFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getInventory();
    getFavorites();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Profile
        inventory={inventory}
        setInventory={setInventory}
        getInventory={getInventory}
        favorites={favorites}
      ></Profile>
    </>
  );
}

export default App;
