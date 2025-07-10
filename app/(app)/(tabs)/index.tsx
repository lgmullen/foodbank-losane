import React, { useEffect, useState } from "react";
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
import { useAddItem, useGetItems, useDeleteItem } from "../../../hooks/useItems";
import { ItemData } from "@/api/items";

export default function HomePage() {
  const { logout } = useAuth();

  const { data: items, isLoading } = useGetItems();
  console.log(items);
  const { mutate: addItem, isPending, error } = useAddItem();
  const { mutate: deleteItem, isPending: isDeleting, error: deleteError } = useDeleteItem();
  const [itemName, setItemName] = useState("");
  

  const handleAddItem = () => {
    const newItem: ItemData = {
      item: itemName,
      quantity: 1,
    };
    addItem(newItem);
    setItemName("");
  };

  const handleDeleteItem = (itemId: string) => {  
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
        data={items}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => <ItemCard item={item} handleDeleteItem={handleDeleteItem} />}
        ListFooterComponent={
          <View style={styles.addItemCard}>
            <Text style={styles.sectionTitle}>Add New Item</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Apples"
              placeholderTextColor="#888"
              value={itemName}
              onChangeText={setItemName}
              onSubmitEditing={handleAddItem}
              returnKeyType="done"
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

function ItemCard({ item, handleDeleteItem }: { item: any, handleDeleteItem: (id: string) => void }) {
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
          style={{ marginTop: 6, backgroundColor: '#FF6B6B', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 }}
        >
          <Text style={{ color: '#fff', fontSize: 10 }}>Delete</Text>
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
    padding: 4, // reduced padding between cards
  },
  itemCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 16, // slightly smaller rounding
    padding: 10, // less padding inside card
    height: 90, // smaller height (was 140)
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: 12, // smaller font size (was 16)
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4, // less margin (was 6)
  },
  itemText: {
    color: "#aaa",
    fontSize: 10, // smaller font (was 13)
  },
  addItemCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    padding: 12, // less padding (was 20)
    margin: 12, // less margin (was 20)
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
    padding: 8, // less padding (was 12)
    color: "#fff",
    marginBottom: 8, // less margin (was 10)
  },
  addButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 8, // smaller height (was 12)
    borderRadius: 999,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14, // smaller font (was 16)
  },
});
