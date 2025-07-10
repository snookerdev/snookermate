import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Sign Up', headerShown : false }} />
        <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}
