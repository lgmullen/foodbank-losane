import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  Animated,
} from "react-native";

import { useAuth } from "@/auth/AuthContext";
import { useItems } from "../../../hooks/useItems";

export default function HomePage() {
  const { logout } = useAuth();
  const { data: items, isLoading, error } = useItems();

  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    console.log("Add item:", newItem);
    setNewItem("");
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
        data={items}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => <ItemCard item={item} />}
        ListFooterComponent={
          <View style={styles.addItemCard}>
            <Text style={styles.sectionTitle}>Add New Item</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Apples"
              placeholderTextColor="#888"
              value={newItem}
              onChangeText={setNewItem}
            />
            <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

function ItemCard({ item }: { item: any }) {
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
    padding: 8,
  },
  itemCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    padding: 16,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  itemText: {
    color: "#aaa",
    fontSize: 13,
  },
  addItemCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    padding: 20,
    margin: 20,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 12,
    color: "#fff",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
