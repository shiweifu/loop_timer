import { View, Text } from "react-native";

function ReviewItem({ item }) {
  return (
    <View className={"p-4 bg-white mt-4"}>
      <Text className=" font-bold">{item.title}</Text>
      <View>
        <View className="mt-2">
          <Text>🍅 ✖ {item.tomato}分钟</Text>
        </View>

        <View className="mt-2">
          <Text>⏱ ✖ {item.rest}分钟</Text>
        </View>
      </View>
    </View>
  );
}

export default ReviewItem;
