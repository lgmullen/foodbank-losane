import { useAuth } from "@/auth/AuthContext";
import { router } from "expo-router";
import { useState, useRef } from "react";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef<any>(null);

  const { login } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#121212" }}>
      <Text style={{ fontSize: 28, marginBottom: 30, textAlign: "center", color: "#fff", fontWeight: "bold" }}>
        Sign In
      </Text>
      <TextInput
        value={username}
        placeholder="Enter username"
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          borderColor: "#333",
          padding: 15,
          marginBottom: 15,
          borderRadius: 8,
          backgroundColor: "#2a2a2a",
        }}
        textColor="#fff"
        placeholderTextColor="#888"
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      <TextInput
        ref={passwordInputRef}
        value={password}
        placeholder="Enter password"
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#333",
          padding: 15,
          marginBottom: 25,
          borderRadius: 8,
          backgroundColor: "#2a2a2a",
        }}
        textColor="#fff"
        placeholderTextColor="#888"
        returnKeyType="done"
        onSubmitEditing={async () => {
          await login({ username, password });
          router.replace("/");
        }}
      />
      <Button
        onPress={async () => {
          await login({ username, password });
          router.replace("/");
        }}
        title="Sign In"
        color="#1DB954"
      />
      
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text style={{ color: "#fff", marginBottom: 10 }}>
          Don't have an account?
        </Text>
        <Button
          onPress={() => router.replace("/sign-up")}
          title="Sign Up"
          color="#1DB954"
        />
      </View>
    </View>
  );
}
