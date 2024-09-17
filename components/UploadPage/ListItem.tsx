import { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";

interface QRData {
  qrdata: any;
}

export const ListItem: FunctionComponent<QRData> = ({ qrdata }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text> {qrdata} </Text>
    </View>
  );
};
