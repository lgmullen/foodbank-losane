import { router } from "expo-router";
import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function SignIn() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput label="Username" style={{ width: 300 }} />
      <TextInput
        label="Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        style={{ width: 300, margin: 40 }}
      />
      <Button
        mode="contained"
        onPress={() => {
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Sign In
      </Button>
    </View>
  );
}
