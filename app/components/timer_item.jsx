import { View, Text, Pressable } from "react-native";
import { useGlobalStore } from "../../store/store";
import TimerModel from "../../models/timer";
import { useTomatoStore } from "../../store/timer";
import { useEffect, useState } from "react";

function TimerItem({ timer, handleTimerAction = (e) => e }) {
  let iconView = <Text className="text-[20px] leading-tight">🍅</Text>;
  const currentTimer = useGlobalStore((state) => state.currentTimer);
  const remainTimerLabel = useGlobalStore((state) => state.remainTimerLabel);
  const timerRunning = useGlobalStore((state) => state.running);

  let tomatoStroe = useTomatoStore((state) => state);
  let [extStr, setExtStr] = useState("今日未执行");

  useEffect(() => {
    let tomatos = tomatoStroe.todayTomatos();
    let found = tomatos.some((tomato) => {
      let found = tomato.timerId === timer.id;
      return found;
    });

    if (found) {
      setExtStr("今日已执行");
    }
  }, [tomatoStroe.tomatoList]);

  let isCurrentTimer = () => {
    if (currentTimer === null) {
      return false;
    }
    return timer.id === currentTimer.id;
  };

  let remainLabelStr = () => {
    // 剩余时间 MM:SS 格式显示
    if (isCurrentTimer()) {
      return remainTimerLabel;
    }
    return "";
  };

  if (timer.type === TimerModel.TYPE.REST) {
    iconView = <Text className="text-[20px] leading-tight">☕</Text>;
  }

  let actionView = (
    <Pressable
      onPress={() => {
        handleTimerAction(timer);
      }}
    >
      <Text className=" leading-tight  text-[24px]">▶</Text>
    </Pressable>
  );

  if (isCurrentTimer() && timerRunning) {
    actionView = (
      <Pressable
        onPress={() => {
          handleTimerAction(timer);
        }}
      >
        <Text className=" leading-tight  text-[24px]">⏸</Text>
      </Pressable>
    );
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
            <Text className=" text-gray-400">{extStr}</Text>
          </View>
        ) : null}
      </View>

      {/* right */}
      <View className="flex-row items-center">
        <View className=" ">
          <Text className=" text-gray-400">{remainLabelStr()}</Text>
        </View>
        <View className=" w-8 h-8 ml-2 ">{actionView}</View>
      </View>
    </View>
  );
}

export default TimerItem;
