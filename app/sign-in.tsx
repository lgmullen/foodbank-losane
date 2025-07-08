import { useAuth } from "@/auth/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Login</Text>
      <TextInput
        value={username}
        placeholder="Enter username"
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 6,
        }}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 6,
        }}
      />
      <Button
        onPress={async () => {
          await login({ username, password });
          router.replace("/");
        }}
        title="button"
      />
    </View>
  );
}
