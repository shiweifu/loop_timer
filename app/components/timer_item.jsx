import { useBearStore } from "../store/store";

function TimerItem({ timer, handleTimerAction = (e) => e }) {
  let iconView = <Text className="text-[20px] leading-tight">🍅</Text>;

  let remainLabelStr = () => {
    // 剩余时间 MM:SS 格式显示
    const currentTimer = useBearStore((state) => state.currentTimer);
    if (timer === currentTimer) {
      return useBearStore((state) => state.remainTimerLabel);
    }
    return timer.totalTimeStr;
  };

  if (timer.type === 1002) {
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
            {remainLabelStr()}
          </Text>
        </View>

        {timer.type === 1001 ? (
          <View className="mt-2">
            <Text className=" text-gray-400">今日已执行</Text>
          </View>
        ) : null}
      </View>

      {/* right */}
      <Pressable
        onPress={() => {
          handleTimerAction(item);
        }}
      >
        <View className=" w-8 h-8">
          <Text className=" text-[24px]">▶</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default TimerItem;
