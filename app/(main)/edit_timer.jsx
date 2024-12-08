import { Text, View, TextInput, Button } from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useLayoutEffect, useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { useTimerStore } from "../../store/timer";
import TimerModel from "../../models/timer";

function EditTimerPage() {
  let navigation = useNavigation();
  let [title, setTitle] = useState("");
  let [type, setType] = useState(1001);
  let [duration, setDuration] = useState("25");
  let [timer, setTimer] = useState(null);

  let store = useTimerStore();

  const { removeTimer, editTimer, getTimer } = store;

  // let editTimer = useTimerStore((state) => state.editTimer);
  // let getTimer = useTimerStore((state) => state.getTimer);
  const params = useLocalSearchParams();

  console.log(params);
  useEffect(() => {
    if (params !== null && params.id) {
      let timer = getTimer(params.id);
      setTimer(timer);
      setTitle(timer.title);
      setType(timer.type);
      setDuration(`${timer.duration / 60}`);
    }
  }, []);

  const handleSave = () => {
    Toast.show({
      type: "info",
      text1: "计时器已修改",
    });

    let newTimer = new TimerModel({
      ...timer,
      title: title,
      type: type,
      duration: parseInt(duration * 60),
    });

    editTimer(newTimer);
    // 返回上一页
    navigation.pop();
  };

  const rightView = (
    <View className="flex-row items-center pr-2">
      <Button onPress={handleSave} title="保存"></Button>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "编辑计时器",
      headerRight: () => rightView,
    });
  }, [navigation, title, type, duration]);

  return (
    <View>
      <View className="h-full p-4 bg-white justify-between">
        <View>
          <View>
            <Text>标题</Text>
            <View className="border rounded-md mt-4">
              <TextInput
                placeholder="请输入标题"
                value={title}
                onChangeText={(text) => {
                  console.log(text);
                  setTitle(text);
                }}
              ></TextInput>
            </View>
          </View>

          <View className="mt-4">
            <Text>时长（m）</Text>
            <View className="border rounded-md mt-4">
              <TextInput
                value={duration}
                placeholder="请输入分钟数"
                onChangeText={(text) => {
                  setDuration(text);
                }}
              ></TextInput>
            </View>
          </View>

          <View className="mt-4">
            <Text>计时器类型</Text>
            <View className=" ">
              <View className="mt-2 flex flex-row justify-center">
                <View className="mx-2">
                  <Button
                    color={type === TimerModel.TYPE.TOMATO ? "blue" : "gray"}
                    className="px-4 mx-2 border"
                    title="专注"
                    onPress={() => {
                      setType(TimerModel.TYPE.TOMATO);
                    }}
                  ></Button>
                </View>
                <View className="mx-2">
                  <Button
                    color={type === TimerModel.TYPE.REST ? "blue" : "gray"}
                    className="px-4 mx-2 border"
                    title="休息"
                    onPress={() => {
                      setType(TimerModel.TYPE.REST);
                    }}
                  ></Button>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Button
            onPress={() => {
              removeTimer(timer);
              Toast.show({
                type: "info",
                text1: "计时器已删除",
              });
              setTimeout(() => {
                navigation.pop();
              }, 2000);
            }}
            color={"red"}
            title="删除"
          ></Button>
        </View>
      </View>
    </View>
  );
}

export default EditTimerPage;
