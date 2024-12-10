import { View, Text, Pressable, FlatList } from "react-native";
import { useLayoutEffect, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useGlobalStore } from "../../../store/store";
import { useTimerStore } from "../../../store/timer";
import { useTomatoStore } from "../../../store/tomato";
import TimerItem from "../../components/timer_item";
import StaticsView from "../../components/statics_view";
import TimerModel from "../../../models/timer";
import EmptyView from "../../components/empty_view";

export default function HomeScreen() {
  let navigation = useNavigation();
  let globalStore = useGlobalStore();
  let router = useRouter();

  let { lastTimer, startTimer, stopTimer, startRunAllTimers } = globalStore;
  let timerList = useTimerStore((state) => state.timerList);
  let addTomato = useTomatoStore((state) => state.addTomato);
  let dimensions = useWindowDimensions();

  console.log(dimensions);

  let rightButtons = [
    {
      text: "开始",
      onPress: () => {
        // 开始当前的计时器
        startRunAllTimers(timerList);
      },
    },
    {
      text: "添加",
      onPress: () => {
        // 跳转到添加 timer 页面
        router.push("/add_timer");
      },
    },
  ];

  useEffect(() => {
    if (lastTimer !== null) {
      // 只有 tomato 类型被统计
      if (lastTimer.type === TimerModel.TYPE.TOMATO) {
        // 弹窗提示刚刚完成的任务
        Toast.show({
          type: "info",
          text1: "完成了一个番茄计时",
        });
        // 添加番茄
        addTomato(lastTimer);
      } else {
        Toast.show({
          type: "info",
          text1: "完成了一个休息计时",
        });
      }
    }
  }, [lastTimer]);

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

  const dataView = (
    <FlatList
      data={timerList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="mt-4">
          <Pressable
            onLongPress={() => {
              console.log(item);
              // 跳转到 EditTimer 页面
              router.push(`/edit_timer?id=${item.id}`, { timer: item });
            }}
          >
            <TimerItem
              handleTimerAction={(item) => {
                if (item === null) {
                  stopTimer();
                } else {
                  // 通过切换当前的 timer，开始计时器
                  // startTimer(item);
                  addTomato(item);
                }
              }}
              timer={item}
            ></TimerItem>
          </Pressable>
        </View>
      )}
    ></FlatList>
  );

  return (
    <>
      <View className=" bg-gray-200 w-full h-full">
        <View className="h-[200px]">
          <StaticsView />
        </View>
        <View className="flex-grow">
          {timerList.length !== 0 ? dataView : <EmptyView></EmptyView>}
        </View>
      </View>
    </>
  );
}
