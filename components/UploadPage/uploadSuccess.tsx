import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import UploadList from "../UploadList";
import { PantryItem } from "@/app/(tabs)/upload";

interface UploadSuccessProps {
  upLoadData: PantryItem[];
  SetUploadData: React.Dispatch<React.SetStateAction<PantryItem[]>>;
}

export const UploadSuccess: FunctionComponent<UploadSuccessProps> = ({
  upLoadData,
  SetUploadData,
}) => {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <UploadList UploadData={upLoadData} SetUploadData={SetUploadData} />
    </View>
  );
};
