import { fetchLogin } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  get token from async storage
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");
      if (token) {
        setSession(token);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async ({ username, password }) => {
    const result = await fetchLogin(username, password);
    if (result) {
      setSession(result.token);
      setUser(result.user);
      await AsyncStorage.setItem("token", result.token);
      await AsyncStorage.setItem("user", JSON.stringify(result.user));
    }
  };

  const logout = async () => {
    setSession(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ session, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
