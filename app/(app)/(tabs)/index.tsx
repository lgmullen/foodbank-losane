import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ItemData } from "@/api/items";
import { useAuth } from "@/auth/AuthContext";
import {
  useAddItem,
  useDeleteItem,
  useGetItems,
  useQueryItems,
} from "../../../hooks/useItems";
import { ItemInput } from "@/components/InventoryPage/ItemInput";

export default function HomePage() {
  const { logout } = useAuth();

  const { data: items, isLoading } = useGetItems();
  const { data: searchItems } = useQueryItems("");

  const { mutate: addItem, error } = useAddItem();
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteItem();

  const [itemName, setItemName] = useState("");
  const [foodItems, setFoodItems] = useState<any[]>(items);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    if (items) {
      setFoodItems(items);
    }
  }, [items]);

  const handleAddItem = () => {
    const newItem: ItemData = {
      item: itemName,
      quantity: 1,
    };

    addItem(newItem);
    setItemName("");
  };

  const handleDeleteItem = (itemId: string) => {
    setFoodItems((prev) => prev.filter((item) => item.id !== itemId));
    deleteItem(itemId);
  };

  if (isLoading)
    return <ActivityIndicator size="large" style={styles.centered} />;
  if (error)
    return <Text style={styles.error}>Error: {(error as Error).message}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Items</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={foodItems}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ItemCard item={item} handleDeleteItem={handleDeleteItem} />
        )}
        ListFooterComponent={
          <ItemInput
            handleAddItem={handleAddItem}
            itemName={itemName}
            setItemName={setItemName}
          />
        }
      />
    </View>
  );
}

function ItemCard({
  item,
  handleDeleteItem,
}: {
  item: any;
  handleDeleteItem: (id: string) => void;
}) {
  const scale = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.04,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.cardWrapper}
    >
      <Animated.View style={[styles.itemCard, { transform: [{ scale }] }]}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemText}>Qty: {item.quantity}</Text>
        <Text style={styles.itemText}>
          Exp: {new Date(item.expirationDate).toLocaleDateString()}
        </Text>
        <TouchableOpacity
          onPress={() => handleDeleteItem(item.id)}
          style={{
            marginTop: 6,
            backgroundColor: "#FF6B6B",
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 2,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 10 }}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  error: {
    color: "#FF6B6B",
    textAlign: "center",
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
  logoutButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#282828",
  },
  logoutText: {
    color: "#ccc",
    fontSize: 14,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  cardWrapper: {
    flex: 1,
    padding: 4,
  },
  itemCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 16,
    padding: 10,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  itemText: {
    color: "#aaa",
    fontSize: 10,
  },
});
