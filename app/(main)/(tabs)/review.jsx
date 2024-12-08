import { View, FlatList } from "react-native";
import ReviewItem from "../../../components/ReviewItem";
import { useTomatoStore } from "../../../store/tomato";

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
                <View
                  style={{
                    width: "33.3333%",
                    paddingLeft: 4,
                    paddingRight: 4,
                  }}
                >
                  <ReviewItem item={item}></ReviewItem>
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
