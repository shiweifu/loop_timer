import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import TimerItem from "../../components/timer_item";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

export default function HomeScreen() {
  let navigation = useNavigation();
  let rightButtons = [
    {
      text: "🔍",
      onPress: () => {
        console.log("search");
      },
    },
    {
      text: "添加",
      onPress: () => {
        console.log("add");
      },
    },
  ];

  // 动态设置顶部按钮
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View className="flex-row items-center pr-2">
          {rightButtons.map((item, index) => (
            <View key={index}>
              <Pressable onClick={item.onPress}>
                <Text className="text-[16px] px-4">{item.text}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <View>
        <View
          className="h-[200px] bg-yellow-100 flex items-center justify-center 
         text-[24px]"
        >
          <View className="flex-row items-center">
            <Text className="text-[24px] leading-tight font-semibold">⏱</Text>
            <Text className="text-[24px] leading-tight font-semibold">
              {" "}
              ️0m
            </Text>
          </View>
          <View className="flex-row items-center justify-center text-lg mt-2 ">
            <Text className="text-[24px] leading-tight">🍅 ✖</Text>
            <Text className="text-[24px] leading-tight font-semibold ml-1">
              0
            </Text>
          </View>
        </View>

        <View>
          <FlatList
            data={[
              {
                id: 1,
                title: "专注",
                type: 1001,
              },
              {
                id: 2,
                title: "休息",
                type: 1002,
              },
              {
                id: 3,
                title: "长专注",
                type: 1001,
              },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="mt-4">
                <TimerItem item={item}></TimerItem>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}
