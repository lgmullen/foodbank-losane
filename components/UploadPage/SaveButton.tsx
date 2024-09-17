import { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

export const SaveButton: FunctionComponent = ({}) => {
  return (
    <Button
      mode="contained"
      onPress={() => console.log("add item")}
      style={styles.save_button}
    >
      <Text style={styles.buttonText}>Save</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  save_button: { margin: 8, backgroundColor: "#34c0eb" },
  buttonText: { color: "white" },
});
