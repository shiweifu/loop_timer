import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      {/* 跳转到 demo 页 */}
      <Link href="/demo" asChild>
        <Text>Go to Demo Page</Text>
      </Link>

      <Link href="/review" asChild>
        <Text>Go to Demo Page</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
