import { Text, View, TextInput, Button } from "react-native";
import TimerItem from "../components/timer_item";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";

function AddTimerPage() {
  let navigation = useNavigation();
  let [title, setTitle] = useState("");
  let [type, setType] = useState(1001);

  const _handleSave = () => {
    // 保存
    console.log(title);
    console.log("handle_save");
  };

  useLayoutEffect(() => {
    // 设置导航条标题
    navigation.setOptions({
      title: "添加计时器",
      headerRight: () => (
        <View className="flex-row items-center pr-2">
          <Button onPress={_handleSave} title="保存"></Button>
        </View>
      ),
    });
  }, []);

  return (
    <View>
      <View className="p-4 min-h-screen bg-white">
        <View>
          <Text>标题</Text>
          <View className="border rounded-md mt-4">
            <TextInput
              value={title}
              onChangeText={(text) => {
                console.log(text);
              }}
            ></TextInput>
          </View>
        </View>

        <View className="mt-4">
          <Text>计时器类型</Text>
          <View className=" ">
            <View className="mt-2 flex flex-row justify-center">
              <Text className="p-4 mx-2 bg-yellow-100">专注</Text>
              <Text className="p-4 mx-2 bg-yellow-300">休息</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default AddTimerPage;
