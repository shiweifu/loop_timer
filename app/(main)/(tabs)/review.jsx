import { View, FlatList } from "react-native";
import ReviewItem from "../../../components/ReviewItem";

function ReviewPage() {
  return (
    <View>
      <View className=" min-h-screen">
        <View className="p-4">
          {/* 列出每天的计时情况 */}
          <FlatList
            numColumns={3}
            data={[
              {
                id: 1,
                title: "20210901",
                tomato: 300,
                rest: 5,
              },
            ]}
            renderItem={({ item, idx }) => {
              return (
                <View className={(idx + 1) % 3 == 0 ? "" : "w-1/3"}>
                  <ReviewItem item={item}></ReviewItem>;
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
