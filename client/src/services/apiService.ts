import { FavoriteItem } from "../interfaces/Favorite";
import { InventoryItem } from "../interfaces/Inventory";

export async function getInventories(): Promise<InventoryItem[]> {
  const url = "http://localhost:3000/inventory";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch inventory, status: ${response.status}`);
    }

    const inventories: InventoryItem[] = await response.json();

    return inventories;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return []; 
  }
}

export async function getFavorites(): Promise<FavoriteItem[]> {
  const url = "http://localhost:3000/favorites";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch inventory, status: ${response.status}`);
    }

    const favorites: FavoriteItem[] = await response.json();

    return favorites;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return []; 
  }
}
