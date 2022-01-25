import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Joke = () => {
  return (
    <View style={styles.center}>
      <Text> joke delivery here </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Joke;