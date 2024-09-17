import { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "react-native-paper";

export const AddButton: FunctionComponent = ({}) => {
  return (
    <Button
      mode="contained"
      onPress={() => console.log("add item")}
      style={styles.add_button}
    >
      <Icon source={"plus"} size={24} color="white" />
    </Button>
  );
};

const styles = StyleSheet.create({
  add_button: { marginHorizontal: 16, marginTop: 0, backgroundColor: "green" },
});
