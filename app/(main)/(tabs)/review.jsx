import { View, FlatList, ScrollView, Dimensions } from "react-native";
import ReviewItem from "../../../components/ReviewItem";
import { useTomatoStore } from "../../../store/tomato";
import EmptyView from "../../components/empty_view";

function ReviewPage() {
  const tomatoStroe = useTomatoStore((state) => state);
  const { width } = Dimensions.get("window");
  const itemWidth = width / 3 - 20;

  const dataView2 = (
    <ScrollView>
      <View className="flex flex-wrap flex-row p-4 gap-4">
        {tomatoStroe.dayItems().map((item, idx) => {
          return (
            <View
              key={idx}
              style={{
                width: itemWidth,
              }}
              className="bg-yellow-100"
            >
              <ReviewItem item={item}></ReviewItem>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );

  return (
    <>
      <View className=" h-full">
        <View className="flex-grow">
          {tomatoStroe.dayItems().length === 0 ? (
            <EmptyView></EmptyView>
          ) : (
            <View>{dataView2}</View>
          )}
        </View>
      </View>
    </>
  );
}

export default ReviewPage;
