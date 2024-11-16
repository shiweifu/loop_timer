import { Text, View } from "react-native";

function TimerItem({ item }) {
  let iconView = <Text className="text-[20px] leading-tight">🍅</Text>;

  if (item.type === 1002) {
    iconView = <Text className="text-[20px] leading-tight">☕</Text>;
  }
  return (
    <View className=" bg-white flex-row justify-between p-4 items-center">
      {/* left */}
      <View>
        <View className=" flex-row items-center justify-center leading-tight">
          {iconView}
          <Text className="text-[20px] ml-2  leading-tight">{item.title}</Text>
          <Text className="text-[16px] ml-4  leading-tight">25m</Text>
        </View>

        {item.type === 1001 ? (
          <View className="mt-2">
            <Text className=" text-gray-400">今日已执行</Text>
          </View>
        ) : null}
      </View>

      {/* right */}
      <View className=" w-8 h-8">
        <Text className=" text-[24px]">▶</Text>
      </View>
    </View>
  );
}

export default TimerItem;
