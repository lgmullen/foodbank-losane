import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchItems = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(
    "https://foodbank-1091070284572.us-central1.run.app/getItems/5",
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
  return data.items || [];
};

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });
}
