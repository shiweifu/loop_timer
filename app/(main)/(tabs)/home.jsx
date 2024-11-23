import { View, Text, Pressable, FlatList } from "react-native";
import TimerItem from "../../components/timer_item";
import { useLayoutEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import TimerModel from "../../models/timer";
import { useBearStore } from "../../../store/store";

const INIT_DATA = [
  new TimerModel({
    id: 1,
    title: "工作",
    duration: 25 * 60,
    order: 0,
    type: TimerModel.TYPE.TOMATO,
  }),
  new TimerModel({
    id: 2,
    title: "休息",
    duration: 5 * 60,
    order: 1,
    type: TimerModel.TYPE.REST,
  }),
];

export default function HomeScreen() {
  let navigation = useNavigation();
  let currentTimer = useBearStore((state) => state.currentTimer);
  let setCurrentTimer = useBearStore((state) => state.setCurrentTimer);
  let setRemainTimerLabel = useBearStore((state) => state.setRemainTimerLabel);
  const [remainingTime, setRemainingTime] = useState(0);
  let rightButtons = [
    {
      text: "🔍",
      onPress: () => {},
    },
    {
      text: "添加",
      onPress: () => {
        // 跳转到添加 timer 页面
        router.push("/add_timer");
      },
    },
  ];

  // 动态设置顶部按钮
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View className="flex-row items-center pr-2">
          {rightButtons.map((item, index) => (
            <View key={index}>
              <Pressable onPress={item.onPress}>
                <Text className="text-[16px] px-4">{item.text}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <View>
        <View
          className="h-[200px] bg-yellow-100 flex items-center justify-center 
         text-[24px]"
        >
          <View className="flex-row items-center">
            <Text className="text-[24px] leading-tight font-semibold">⏱</Text>
            <Text className="text-[24px] leading-tight font-semibold">
              {" "}
              ️0m
            </Text>
          </View>
          <View className="flex-row items-center justify-center text-lg mt-2 ">
            <Text className="text-[24px] leading-tight">🍅 ✖</Text>
            <Text className="text-[24px] leading-tight font-semibold ml-1">
              0
            </Text>
          </View>
        </View>

        <View>
          <FlatList
            data={[...INIT_DATA]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="mt-4">
                <TimerItem
                  handleTimerAction={(item) => {
                    console.log(item);
                    setCurrentTimer(item);
                    setRemainingTime(item.duration);
                    const _timer = setInterval(() => {
                      console.log("here");
                      let remainMinutes = Math.floor(remainingTime / 60);
                      let remainSeconds = remainingTime % 60;
                      setRemainTimerLabel(
                        `${remainMinutes
                          .toString()
                          .padStart(2, "0")}:${remainSeconds
                          .toString()
                          .padStart(2, "0")}`
                      );

                      if (remainingTime <= 0) {
                        console.log("结束");
                        clearInterval(_timer);
                        return;
                      }
                      setRemainingTime((prev) => prev - 1);
                    }, 1000);
                  }}
                  timer={item}
                ></TimerItem>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}
