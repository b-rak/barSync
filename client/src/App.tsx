import { useEffect, useState } from "react";
import { getInventories } from "../src/services/apiService";
import "./App.css";
import Navbar from "./components/nav-bar/nav-bar";
import Profile from "./components/profile/profile";
// import { FavoriteItem } from "./interfaces/Favorite";
import { InventoryItem } from "./interfaces/Inventory";
 
function App() {

  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  async function getInventory() {
    const inventories = await getInventories();
    setInventory(inventories);
  }

  
  useEffect(() => {
    getInventory();
  }, []);


  return (
    <>
      <Navbar></Navbar>
      <Profile
        inventory={inventory}
        getInventory={getInventory}//TODO remove from here
      ></Profile>
    </>
  );
}

export default App;
