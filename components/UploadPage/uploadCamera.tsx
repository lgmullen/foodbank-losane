import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import UploadList from "../UploadList";
import { PantryItem } from "@/app/(tabs)/upload";
import { CameraView } from "expo-camera";

interface CameraViewProps {
  handleQRScanned: (result: any) => void;
}

export const UploadCamera: FunctionComponent<CameraViewProps> = ({
  handleQRScanned,
}) => {
  return (
    <View style={(styles.container, StyleSheet.absoluteFillObject)}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={(result) => {
          handleQRScanned(result);
        }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }} />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }} />
          <View
            style={{
              width: 240,
              height: 240,
              borderColor: "white",
              borderWidth: 2,
              borderStyle: "dashed",
            }}
          />
          <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }} />
        </View>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }} />
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  camera: {
    flex: 1,
  },
});
