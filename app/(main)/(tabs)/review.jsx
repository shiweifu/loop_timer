import { View, FlatList } from "react-native";
import ReviewItem from "../../../components/ReviewItem";
import { useTomatoStore } from "../../../store/tomato";
import EmptyView from "../../components/empty_view";

function ReviewPage() {
  const tomatoStroe = useTomatoStore((state) => state);
  const dataView = (
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
  );

  return (
    <>
      <View className=" h-full">
        <View className="flex-grow">
          {tomatoStroe.dayItems().length === 0 ? (
            <EmptyView></EmptyView>
          ) : (
            <View className="p-4">{dataView}</View>
          )}
        </View>
      </View>
    </>
  );
}

export default ReviewPage;
