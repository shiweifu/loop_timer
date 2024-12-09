import { View, Text } from "react-native";

function EmptyView() {
  return (
    <View className="h-full flex-row bg-white items-center justify-center">
      <Text className=" text-lg text-center">暂时没有内容</Text>
    </View>
  );
}

export default EmptyView;
