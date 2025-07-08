import { PantryItem } from "@/app/(tabs)/upload";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FunctionComponent, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { TextInput, Button, Card, Title, IconButton } from "react-native-paper";

interface PantryListProps {
  UploadData: PantryItem[];
  SetUploadData: React.Dispatch<React.SetStateAction<PantryItem[]>>;
}

const PantryList: FunctionComponent<PantryListProps> = ({
  UploadData,
  SetUploadData,
}) => {
  const [editingItem, setEditingItem] = useState<null | string>(null);
  const [newName, setNewName] = useState<string>("");
  const [newAmount, setNewAmount] = useState<string>("");

  const startEditing = (item: PantryItem) => {
    setEditingItem(item.id);
    setNewName(item.name);
    setNewAmount(item.amount);
  };

  const saveChanges = (id: string) => {
    SetUploadData((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: newName, amount: newAmount } : item
      )
    );
    setEditingItem(null);
  };
  console.log(UploadData);
  const renderItem = ({ item }: { item: PantryItem }) => {
    return (
      <Card style={styles.card} key={item.id}>
        {editingItem === item.id ? (
          <View>
            <TextInput
              label="Item Name"
              value={newName}
              onChangeText={setNewName}
              style={styles.input}
            />

            <TextInput
              label="Amount"
              value={newAmount}
              onChangeText={setNewAmount}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button mode="contained" onPress={() => saveChanges(item.id)}>
              Save
            </Button>
          </View>
        ) : (
          <View style={styles.itemRow}>
            <Title>{item.name}</Title>
            <Title>{item.amount}</Title>

            <Button onPress={() => startEditing(item)}>
              <Ionicons name="pencil" color="black" />
            </Button>
          </View>
        )}
      </Card>
    );
  };

  return (
    <View style={styles.outerContainer}>
      <FlatList
        data={UploadData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 16,
    marginTop: "20%",
  },
  flatListContainer: {
    alignItems: "center",
    paddingBottom: 16, // Prevents overlap at the bottom
  },
  card: {
    width: "90%", // Prevents
    marginVertical: 8, // Ensures spacing between cards
    padding: 16,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  input: {
    marginBottom: 8,
  },
});

export default PantryList;
