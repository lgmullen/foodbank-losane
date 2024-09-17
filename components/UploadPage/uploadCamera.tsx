import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import UploadList from "../UploadList";
import { PantryItem, Status } from "@/app/(tabs)/upload";
import { CameraView } from "expo-camera";
import { Button, Icon } from "react-native-paper";

interface CameraViewProps {
  handleQRScanned: (result: any) => void;
  setUploadStatus: React.Dispatch<React.SetStateAction<Status>>;
  uploadStatus: Status;
}

export const UploadCamera: FunctionComponent<CameraViewProps> = ({
  handleQRScanned,
  setUploadStatus,
  uploadStatus,
}) => {
  return (
    <>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() =>
          setUploadStatus((currentStatus) => {
            if (currentStatus == Status.CAMERA) return Status.PENDING;
            if (currentStatus == Status.PENDING) return Status.CAMERA;
            if (currentStatus == Status.SUCCESS) return Status.CAMERA;
            return currentStatus;
          })
        }
      >
        <Icon
          source={uploadStatus == "pending" ? "camera" : "close"}
          size={24}
        />
      </Button>

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
    </>
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
  button: {
    position: "absolute",
    top: 24,
    right: 24,
    zIndex: 1,
  },
});
