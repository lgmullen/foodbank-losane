import { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

export const CancelButton: FunctionComponent = ({}) => {
  return (
    <Button
      mode="contained"
      onPress={() => console.log("add item")}
      style={styles.cancelButton}
    >
      <Text style={styles.buttonText}>Cancel</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  cancelButton: { margin: 8, backgroundColor: "#eb3434" },
  buttonText: { color: "white" },
});
