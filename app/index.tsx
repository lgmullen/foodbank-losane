import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, List } from "react-native-paper";
const items = ["apple", "banana", "cucumber"];

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState<Boolean>(false);
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
        <Button onPress={requestPermission}>grant permission</Button>
      </View>
    );
  }

  const handleQRScanned = (result: any) => {
    setIsCameraOpen(false);
    setQrData(result.data);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* These will be called from item database */}

      <List.Accordion title="items">
        {items.map((item) => (
          <List.Item title={item} />
        ))}
      </List.Accordion>

      <Button
        icon="camera"
        mode="contained"
        onPress={() => setIsCameraOpen((isOpen) => !isOpen)}
      >
        Press me
      </Button>

      <Text> QR data: {qrdata}</Text>

      {isCameraOpen && (
        <View style={styles.container}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={(result) => {
              handleQRScanned(result);
            }}
          >
            <View style={styles.buttonContainer}></View>
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
