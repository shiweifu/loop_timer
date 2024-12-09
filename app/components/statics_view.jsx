import { Text, View } from "react-native";
import { useTomatoStore } from "../../store/tomato";

function StaticsView() {
  let tomatoStroe = useTomatoStore((state) => state);
  let todayTomatosCount = tomatoStroe.todayTomatosCount();
  let todayTomatosDuration = tomatoStroe.todayTomatosDuration();

  return (
    <View
      className="h-full bg-yellow-100 flex items-center justify-center 
         text-[24px]"
    >
      <View className="flex-row items-center">
        <Text className="text-[24px] leading-tight font-semibold">⏱</Text>
        <Text className="text-[24px] leading-tight font-semibold">
          {" "}
          {todayTomatosDuration}m
        </Text>
      </View>
      <View className="flex-row items-center justify-center text-lg mt-2 ">
        <Text className="text-[24px] leading-tight">🍅 ✖</Text>
        <Text className="text-[24px] leading-tight font-semibold ml-1">
          {todayTomatosCount}
        </Text>
      </View>
    </View>
  );
}

export default StaticsView;
