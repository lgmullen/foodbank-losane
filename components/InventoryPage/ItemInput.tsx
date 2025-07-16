import React, { FunctionComponent } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ItemInputProps = {
  itemName: string;
  setItemName: (text: string) => void;
  handleAddItem: () => void;
};

export const ItemInput: FunctionComponent<ItemInputProps> = ({
  itemName,
  setItemName,
  handleAddItem,
}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  addItemCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    padding: 12,
    margin: 12,
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
    padding: 8,
    color: "#fff",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
