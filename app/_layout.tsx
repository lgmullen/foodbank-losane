import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { AuthProvider } from "../auth/AuthContext";

const queryClient = new QueryClient();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <RootNavigator />
        </PaperProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  return <Slot />;
}
