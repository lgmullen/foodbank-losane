import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { router } from "expo-router";

export const NavBar: FunctionComponent = () => {
  // Get the url info and highlight the one that our current url corresponds to
  return (
    <View style={styles.container}>
      <Button icon="food-variant" onPress={() => router.replace("/")}>
        Pantry
      </Button>
      <Button icon="barcode" onPress={() => router.replace("/upload")}>
        Upload Item
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    elevation: 1,
    width: "100%",
    height: 96,
    position: "absolute",
    bottom: 0,
    borderTopColor: "grey",
    borderTopWidth: 2,
    shadowRadius: 2,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "grey",
  },
});
