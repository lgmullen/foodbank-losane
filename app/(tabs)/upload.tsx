import { UploadCamera } from "@/components/UploadPage/UploadCamera";
import { UploadPending } from "@/components/UploadPage/UploadPending";
import { UploadSuccess } from "@/components/UploadPage/uploadSuccess";
import { useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

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
      {uploadStatus == Status.PENDING && (
        <UploadPending
          setUploadStatus={setUploadStatus}
          uploadStatus={uploadStatus}
        />
      )}
      {uploadStatus == Status.CAMERA && (
        <UploadCamera
          handleQRScanned={handleQRScanned}
          setUploadStatus={setUploadStatus}
          uploadStatus={uploadStatus}
        />
      )}
      {uploadStatus == Status.SUCCESS && (
        <UploadSuccess
          upLoadData={upLoadData}
          SetUploadData={SetUploadData}
          setUploadStatus={setUploadStatus}
          uploadStatus={uploadStatus}
        />
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
});
