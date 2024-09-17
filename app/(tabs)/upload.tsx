import { UploadCamera } from "@/components/UploadPage/UploadCamera";
import { UploadSuccess } from "@/components/UploadPage/uploadSuccess";
import { useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-paper";

export enum Status {
  PENDING = "pending",
  CAMERA = "camera",
  SUCCESS = "success",
}

export interface PantryItem {
  id: string;
  name: string;
  amount: string;
}

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [uploadStatus, setUploadStatus] = useState<Status>(Status.SUCCESS);
  const [upLoadData, SetUploadData] = useState<PantryItem[]>([
    { id: "1", name: "Apples", amount: "5" },
    { id: "2", name: "Bananas", amount: "7" },
    { id: "3", name: "Carrots", amount: "10" },
  ]);

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
    SetUploadData(result.data);
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

      {uploadStatus == Status.CAMERA && (
        <UploadCamera handleQRScanned={handleQRScanned} />
      )}
      {uploadStatus == Status.SUCCESS && (
        <UploadSuccess upLoadData={upLoadData} SetUploadData={SetUploadData} />
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
