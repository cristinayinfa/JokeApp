import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const Tab1 = ({ navigation }) => {
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

export default Tab1;