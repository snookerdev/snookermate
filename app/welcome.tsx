import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";

export default function Welcome() {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Animated.Text
        style={{
          fontSize: 48,
          fontWeight: "bold",
          color: "#2563eb",
          marginBottom: 16,
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      >
        Welcome to SnookerMate!
      </Animated.Text>
      <Animated.Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          color: "#1e293b",
          marginBottom: 32,
          opacity: opacityAnim,
        }}
      >
        Your personal snooker companion
      </Animated.Text>
      <Animated.View style={{ opacity: opacityAnim }}>
        <Text style={{ fontSize: 20, fontWeight: "500", color: "#64748b" }}>
          Now you can go back and login !!!
        </Text>
      </Animated.View>
    </View>
  );
}