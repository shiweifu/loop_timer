import { Text, View, FlatList } from "react-native";

function ReviewPage() {
  return (
    <View>
      <View className=" min-h-screen">
        <View className="p-4">
          {/* 列出每天的计时情况 */}
          <FlatList
            numColumns={3}
            data={["", "", "", ""]}
            renderItem={({ item, idx }) => {
              return (
                <View className={"col-span-3 p-4 bg-white mt-4 mr-4"}>
                  <Text className=" font-bold">2021-09-01</Text>
                  <View>
                    <View className="mt-2">
                      <Text>🍅 ✖ 25分钟</Text>
                    </View>

                    <View className="mt-2">
                      <Text>⏱ ✖ 5分钟</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          ></FlatList>
        </View>
      </View>
    </View>
  );
}

export default ReviewPage;
