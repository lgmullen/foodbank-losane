import { fetchSignup } from "@/api/auth";
import { useAuth } from "@/auth/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, View, Alert } from "react-native";
import { TextInput } from "react-native-paper";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSignUp = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await fetchSignup(username, password);
      
      if (success) {
        // Automatically sign in after successful signup
        await login({ username, password });
        router.replace("/");
      } else {
        Alert.alert("Error", "Failed to create account. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#121212" }}>
      <Text style={{ fontSize: 28, marginBottom: 30, textAlign: "center", color: "#fff", fontWeight: "bold" }}>
        Create Account
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
          color: "#fff",
        }}
        placeholderTextColor="#888"
      />
      
      <TextInput
        value={password}
        placeholder="Enter password"
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#333",
          padding: 15,
          marginBottom: 15,
          borderRadius: 8,
          backgroundColor: "#2a2a2a",
          color: "#fff",
        }}
        placeholderTextColor="#888"
      />
      
      <TextInput
        value={confirmPassword}
        placeholder="Confirm password"
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#333",
          padding: 15,
          marginBottom: 25,
          borderRadius: 8,
          backgroundColor: "#2a2a2a",
          color: "#fff",
        }}
        placeholderTextColor="#888"
      />
      
      <Button
        onPress={handleSignUp}
        title={isLoading ? "Creating Account..." : "Sign Up"}
        disabled={isLoading}
        color="#1DB954"
      />
      
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text style={{ color: "#ccc", marginBottom: 10 }}>
          Already have an account?
        </Text>
        <Button
          onPress={() => router.replace("/sign-in")}
          title="Sign In"
          color="#1DB954"
        />
      </View>
    </View>
  );
} 