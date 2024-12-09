import { View, Text, Pressable, FlatList } from "react-native";
import TimerItem from "../../components/timer_item";
import StaticsView from "../../components/statics_view";
import { useLayoutEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { useGlobalStore } from "../../../store/store";
import { useTimerStore, useTomatoStore } from "../../../store/timer";
import Constants from "expo-constants";
import { useWindowDimensions } from "react-native";

export default function HomeScreen() {
  let navigation = useNavigation();
  let startTimer = useGlobalStore((state) => state.startTimer);
  let finishTimer = useGlobalStore((state) => state.finishTimer);
  let timerList = useTimerStore((state) => state.timerList);
  let addTomato = useTomatoStore((state) => state.addTomato);
  let [screenHeight, setScreenHeight] = useState(0);
  let dimensions = useWindowDimensions();

  let rightButtons = [
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

  const { statusBarHeight } = Constants;
  const tabBarHeight = 50;
  const topViewHeight = 200;
  const viewHeight =
    dimensions.height - statusBarHeight - tabBarHeight - topViewHeight;

  return (
    <View>
      <View className="">
        <StaticsView></StaticsView>

        <View
          style={{
            // 组件高度为屏幕高度减去 底部 tabBar 高度
            height: viewHeight,
            // overflowY: "scroll",
            // height: 200,
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
                    console.log(item);
                    // 通过切换当前的 timer，开始计时器
                    // startTimer(item);

                    // finishTimer();

                    // 添加番茄
                    addTomato(item);
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
