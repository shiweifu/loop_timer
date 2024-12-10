import { View, FlatList, ScrollView } from "react-native";
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

  const dataView2 = (
    <ScrollView
      style={{
        container: {
          flex: 1,
        },
        content: {
          padding: 20,
        },
      }}
      className="flex-row flex-wrap bg-slate-500"
    >
      {tomatoStroe.dayItems().map((item, idx) => {
        return (
          <View
            key={idx}
            style={{
              backgroundColor: "yellow",
              paddingLeft: 4,
              paddingRight: 4,
            }}
          >
            <ReviewItem item={item}></ReviewItem>
          </View>
        );
      })}
    </ScrollView>
  );

  return (
    <>
      <View className=" h-full">
        <View className="flex-grow">
          {tomatoStroe.dayItems().length === 0 ? (
            <EmptyView></EmptyView>
          ) : (
            <View className="p-4">{dataView2}</View>
          )}
        </View>
      </View>
    </>
  );
}

export default ReviewPage;
