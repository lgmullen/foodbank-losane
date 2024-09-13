import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-paper";

export enum Status {
  PENDING = "pending",
  CAMERA = "camera",
  SUCCESS = "success",
}

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [uploadStatus, setUploadStatus] = useState<Status>(Status.CAMERA);
  const [qrdata, setQrData] = useState("");

  if (!permission) {
    // Camera permissions are still loading.
    return <Text> Permissions are loading</Text>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>
          <Text>grant permission</Text>
        </Button>
      </View>
    );
  }

  const handleQRScanned = (result: any) => {
    setUploadStatus(Status.SUCCESS);
    setQrData(result.data);
    console.log("qr scanned");
    console.log(result.data);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        style={styles.button}
        mode="contained"
        onPress={() =>
          setUploadStatus((currentStatus) => {
            if (currentStatus == Status.CAMERA) return Status.PENDING;
            if (currentStatus == Status.PENDING) return Status.CAMERA;
            return currentStatus;
          })
        }
      >
        <Icon
          source={uploadStatus == "pending" ? "camera" : "close"}
          size={24}
        />
      </Button>
      {/* <Text> QR data: {qrdata}</Text> */}

      {uploadStatus == Status.CAMERA && (
        <View style={(styles.container, StyleSheet.absoluteFillObject)}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={(result) => {
              handleQRScanned(result);
            }}
          >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }} />
            <View style={{ display: "flex", flexDirection: "row" }}>
              {/* 3 things */}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
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
