import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Feather } from "@expo/vector-icons";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "首页",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={20} color={color}></Feather>
          ),
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          headerShown: true,
          title: "回顾",
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={20} color={color}></Feather>
          ),
        }}
      />

      <Tabs.Screen
        name="demo"
        options={{
          headerShown: true,
          title: "演示",
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={20} color={color}></Feather>
          ),
        }}
      />
    </Tabs>
  );
}
