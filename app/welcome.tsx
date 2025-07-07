import React from "react";
import { Text, View } from "react-native";

export default function Welcome() {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: "#2563eb",
          marginBottom: 16,
        }}
      >
        Welcome to SnookerMate!
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          color: "#1e293b",
          marginBottom: 32,
        }}
      >
        Your personal snooker companion
      </Text>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "500", color: "#64748b" }}>
          Now you can go back and login !!!
        </Text>
      </View>
    </View>
  );
}