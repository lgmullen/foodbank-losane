import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ItemData {
  userId?: number;
  item: string;
  quantity: number;
}
export const fetchItems = async () => {
  console.log("fetching");
  const token = await AsyncStorage.getItem("token");
  const userData = await AsyncStorage.getItem("user");
  
  if (!userData) {
    throw new Error("User not found");
  }
  
  const user = JSON.parse(userData);
  const response = await fetch(
    `https://foodbank-1091070284572.us-central1.run.app/getItems/${user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  const data = await response.json();
  console.log(data);
  return data.items || [];
};

export const deleteItem = async (itemId: string) => {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(
    `https://foodbank-1091070284572.us-central1.run.app/deleteItem/${itemId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("📥 Response status:", response.status);

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }

  return response.json();
};

export const addItem = async (itemData: ItemData) => {
  const token = await AsyncStorage.getItem("token");
  const userData = await AsyncStorage.getItem("user");
  
  if (!userData) {
    throw new Error("User not found");
  }
  
  const user = JSON.parse(userData);
  const response = await fetch(
    "https://foodbank-1091070284572.us-central1.run.app/addItem",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...itemData,
        userId: user.id,
      }),
    }
  );

  console.log("📥 Response status:", response.status);

  if (!response.ok) {
    throw new Error("Failed to add item");
  }

  return response.json();
};
