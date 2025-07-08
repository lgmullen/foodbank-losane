import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://foodbank-1091070284572.us-central1.run.app";

export async function fetchLogin(
  email: string,
  password: string
): Promise<string | undefined> {
  console.log("running auth function", email, password);
  try {
    const res = await axios.post(`${API_URL}/login`, {
      username: email,
      password,
    });

    const { token } = res.data;

    return token;
  } catch (err: any) {
    console.error("Login error:", err?.response?.data?.message || err.message);
    return undefined;
  }
}
