import { View, Text, Pressable } from "react-native";
import { useBearStore } from "../../store/store";
import TimerModel from "../../models/timer";

function TimerItem({ timer, handleTimerAction = (e) => e }) {
  let iconView = <Text className="text-[20px] leading-tight">🍅</Text>;
  const globalCurrentTimer = useBearStore((state) => state.globalCurrentTimer);
  const globalRemainTimerLabel = useBearStore(
    (state) => state.globalRemainTimerLabel
  );

  let remainLabelStr = () => {
    // 剩余时间 MM:SS 格式显示
    if (globalCurrentTimer === null) {
      return "";
    }
    if (timer.id !== globalCurrentTimer.id) {
      return "";
    }
    return globalRemainTimerLabel;
  };

  if (timer.type === TimerModel.TYPE.REST) {
    iconView = <Text className="text-[20px] leading-tight">☕</Text>;
  }
  return (
    <View className=" bg-white flex-row justify-between p-4 items-center">
      {/* left */}
      <View>
        <View className=" flex-row items-center justify-center leading-tight">
          {iconView}
          <Text className="text-[20px] ml-2  leading-tight">{timer.title}</Text>
          <Text className="text-[16px] ml-4  leading-tight">
            {timer.minutes}m
          </Text>
        </View>

        {timer.type === TimerModel.TYPE.TOMATO ? (
          <View className="mt-2">
            <Text className=" text-gray-400">今日已执行</Text>
          </View>
        ) : null}
      </View>

      {/* right */}
      <View className="flex-row items-center">
        <View className=" ">
          <Text className=" text-gray-400">{remainLabelStr()}</Text>
        </View>
        <View className=" w-8 h-8 ml-2 ">
          <Pressable
            onPress={() => {
              handleTimerAction(timer);
            }}
          >
            <Text className=" leading-tight  text-[24px]">▶</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default TimerItem;
