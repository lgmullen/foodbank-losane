import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* These will be called from item database */}

      <Text> Home page</Text>
    </View>
  );
}
