import { Stack } from "expo-router";
import { Text, View } from "react-native";

function DemoPage() {
  return (
    <>
      <Stack.Screen></Stack.Screen>

      <View className="w-full h-full ">
        <View className="bg-red-100 w-full h-[200px]"></View>

        <View className=" bg-yellow-100 justify-center items-center flex-grow">
          <Text className="text-center">hello world</Text>
        </View>
      </View>
    </>
  );
}

export default DemoPage;
