import { View, FlatList } from "react-native";
import ReviewItem2 from "../../../components/ReviewItem";
import { useTomatoStore } from "../../../store/timer";

function ReviewPage() {
  const tomatoStroe = useTomatoStore((state) => state);

  return (
    <View>
      <View className=" min-h-screen">
        <View className="p-4">
          {/* 列出每天的计时情况 */}
          <FlatList
            numColumns={3}
            data={tomatoStroe.dayItems()}
            renderItem={({ item, idx }) => {
              return (
                <View className={(idx + 1) % 3 == 0 ? "" : "w-1/3"}>
                  <ReviewItem2 item={item}></ReviewItem2>
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
