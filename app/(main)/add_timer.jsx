import { Text, View, TextInput, Button } from "react-native";
import TimerItem from "../components/timer_item";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState, useCallback } from "react";

function AddTimerPage() {
  let navigation = useNavigation();
  let [title, setTitle] = useState("");
  let [type, setType] = useState(1001);

  const handleSave = useCallback(() => {
    console.log(title);
  }, [title]);

  const rightView = (
    <View className="flex-row items-center pr-2">
      <Button onPress={handleSave} title="保存"></Button>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "添加计时器",
      headerRight: () => rightView,
    });
  }, [navigation, title]);

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
                setTitle(text);
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
                  color={type === 1001 ? "blue" : "gray"}
                  className="px-4 mx-2 border"
                  title="专注"
                  onPress={() => {
                    setType(1001);
                  }}
                ></Button>
              </View>
              <View className="mx-2">
                <Button
                  color={type === 1002 ? "blue" : "gray"}
                  className="px-4 mx-2 border"
                  title="休息"
                  onPress={() => {
                    setType(1002);
                  }}
                ></Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default AddTimerPage;
