import { fetchLogin } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  //  get token from async storage
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) setSession(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async ({ username, password }) => {
    const token = await fetchLogin(username, password);
    if (token) {
      setSession(token);
      await AsyncStorage.setItem("token", token);
    }
  };

  const logout = async () => {
    setSession(null);
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ session, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
