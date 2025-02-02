import { View, Text } from "react-native";

function ReviewItem({ item }) {
  return (
    <View className={"p-4 bg-white"}>
      <Text className=" font-bold">{item.dateTitle}</Text>
      <View>
        <View className="mt-2">
          <Text>🍅 ✖ {item.tomatoMinutes}分钟</Text>
        </View>

        <View className="mt-2">
          <Text>⏱ ✖ {item.restMinutes}分钟</Text>
        </View>
      </View>
    </View>
  );
}

export default ReviewItem;
