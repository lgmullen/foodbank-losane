import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import UploadList from "../UploadList";
import { PantryItem, Status } from "@/app/(tabs)/upload";
import { Button, Icon } from "react-native-paper";
import { AddButton } from "./AddButton";
import { SaveButton } from "./SaveButton";
import { CancelButton } from "./CancelButton";

interface UploadSuccessProps {
  upLoadData: PantryItem[];
  SetUploadData: React.Dispatch<React.SetStateAction<PantryItem[]>>;
  setUploadStatus: React.Dispatch<React.SetStateAction<Status>>;
  uploadStatus: Status;
}

export const UploadSuccess: FunctionComponent<UploadSuccessProps> = ({
  upLoadData,
  SetUploadData,
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
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
          }}
        >
          <UploadList UploadData={upLoadData} SetUploadData={SetUploadData} />
          <AddButton />
          <View style={styles.button_container}>
            <SaveButton />
            <CancelButton />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: { marginLeft: "auto", margin: 8 },
  button_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
