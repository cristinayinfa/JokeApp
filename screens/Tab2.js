import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Tab2 = () => {
  return (
    <View style={styles.center}>
      <Text> text </Text>
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

export default Tab2;