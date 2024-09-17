import { PantryItem } from "@/app/(tabs)/upload";
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

  const renderItem = (item: any) => {
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
            <IconButton icon="pencil" onPress={() => startEditing(item)} />
          </View>
        )}
      </Card>
    );
  };

  return (
    <FlatList
      data={UploadData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderItem(item)}
      contentContainerStyle={styles.container}
      style={styles.flatlist}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 0,
    flex: 1,
  },
  card: {
    marginBottom: 16,
    padding: 32,
    flex: 1,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    marginBottom: 8,
  },
  flatlist: {
    display: "flex",
    flex: 1,
    width: "100%",
  },
});

export default PantryList;
