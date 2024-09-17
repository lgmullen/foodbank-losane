import { PantryItem, Status } from "@/app/(tabs)/upload";
import { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "react-native-paper";

interface UploadSuccessProps {
  setUploadStatus: React.Dispatch<React.SetStateAction<Status>>;
  uploadStatus: Status;
}

export const UploadPending: FunctionComponent<UploadSuccessProps> = ({
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
