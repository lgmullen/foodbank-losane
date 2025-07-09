import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://foodbank-1091070284572.us-central1.run.app";

export async function fetchLogin(
  email: string,
  password: string
): Promise<{ token: string; user: any } | undefined> {
  console.log("running auth function", email, password);
  try {
    const res = await axios.post(`${API_URL}/login`, {
      username: email,
      password,
    });

    const { token, user } = res.data;

    return { token, user };
  } catch (err: any) {
    console.error("Login error:", err?.response?.data?.message || err.message);
    return undefined;
  }
}

export async function fetchSignup(
  username: string,
  password: string
): Promise<boolean> {
  console.log("running signup function", username, password);
  try {
    const res = await axios.post(`${API_URL}/sign-up`, {
      username,
      password,
    });

    console.log("Signup successful:", res.data);
    return true;
  } catch (err: any) {
    console.error("Signup error:", err?.response?.data?.message || err.message);
    return false;
  }
}
