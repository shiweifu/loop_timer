function ReviewList() {
  return (
    <View>
      <FlatList
        data={[]}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>2021-09-01</Text>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
}

export default ReviewList;
