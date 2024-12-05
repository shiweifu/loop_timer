import { View, Text, Pressable, FlatList } from "react-native";
import { useLayoutEffect, useEffect } from "react";
import Constants from "expo-constants";
import { useWindowDimensions } from "react-native";
import { router, useNavigation } from "expo-router";
import Toast from "react-native-toast-message";
import { useGlobalStore } from "../../../store/store";
import { useTimerStore, useTomatoStore } from "../../../store/timer";
import TimerItem from "../../components/timer_item";
import StaticsView from "../../components/statics_view";
import TomatoModel from "../../../models/tomato";
import TimerModel from "../../../models/timer";

export default function HomeScreen() {
  let navigation = useNavigation();
  let startTimer = useGlobalStore((state) => state.startTimer);
  let timerList = useTimerStore((state) => state.timerList);
  let addTomato = useTomatoStore((state) => state.addTomato);
  let lastTimer = useGlobalStore((state) => state.lastTimer);
  let running = useGlobalStore((state) => state.running);
  let dimensions = useWindowDimensions();

  let rightButtons = [
    {
      text: "开始",
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

  useEffect(() => {
    console.log("-----lasttimer changed-----");
    console.log(lastTimer);
    if (lastTimer !== null) {
      // 弹窗提示刚刚完成的任务
      Toast.show({
        type: "info",
        text1: "计时器已创建",
      });

      // 只有 tomato 类型被统计
      if (lastTimer.type === TimerModel.TYPE.TOMATO) {
        // 添加番茄
        addTomato(lastTimer);
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

  const { statusBarHeight } = Constants;
  const tabBarHeight = 50;
  const topViewHeight = 200;
  const viewHeight =
    dimensions.height - statusBarHeight - tabBarHeight - topViewHeight;

  return (
    <View>
      <View className="">
        <StaticsView />
        <View
          style={{
            // 组件高度为屏幕高度减去 底部 tabBar 高度
            height: viewHeight,
          }}
          className="bg-gray-300"
        >
          <FlatList
            data={[...timerList]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="mt-4">
                <TimerItem
                  handleTimerAction={(item) => {
                    // 通过切换当前的 timer，开始计时器
                    startTimer(item);
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
