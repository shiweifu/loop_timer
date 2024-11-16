import { Link } from "expo-router";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <View>
        <View
          className="h-40 bg-yellow-100 flex items-center justify-center 
         text-[24px]"
        >
          <View className="flex-row items-center">
            <Text className="text-[24px] font-semibold">⏱</Text>
            <Text className="text-[24px]"> ️0m</Text>
          </View>
          <View className="flex-row items-center justify-center text-lg mt-2 ">
            <Text className="text-[24px]">🍅 ✖</Text>
            <Text className="text-[24px]  font-semibold ml-1">0</Text>
          </View>
        </View>

        <View>
          <FlatList
            data={[
              {
                id: 1,
                title: "First Item",
              },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className=" bg-white flex-row justify-between p-4 items-center">
                {/* left */}
                <View>
                  <View className=" flex-row items-center justify-center">
                    <Text className="text-[20px]">🍅</Text>
                    <Text className="text-[20px] ml-2">专注</Text>
                    <Text className="text-[16px] leading-none ml-4">25m</Text>
                  </View>

                  <View className="mt-2">
                    <Text>今日未执行</Text>
                  </View>
                </View>

                {/* right */}
                <View className=" bg-black w-8 h-8">
                  <Text>▶</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}
