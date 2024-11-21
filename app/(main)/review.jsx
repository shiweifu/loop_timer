import { Text, View, FlatList } from "react-native";

function ReviewPage() {
  return (
    <View>
      {/* 列出每天的计时情况 */}
      <FlatList
        data={[]}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>2021-09-01</Text>
              <View>
                <Text>🍅 ✖ 25分钟</Text>
                <Text>⏱✖5分钟</Text>
              </View>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
}

export default ReviewPage;
