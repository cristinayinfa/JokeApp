import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Tab1 from "../screens/Tab1";
import JokeScreen from "../screens/Joke";
import Tab2 from "../screens/Tab2";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerShown: false
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Tab 1" component={Tab1} />
      <Stack.Screen name="Tab 2" component={Tab2} />
    </Stack.Navigator>
  );
}

const JokeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="JokeDelivery" component={JokeScreen} />
    </Stack.Navigator>
  );
}


export { MainStackNavigator, JokeStackNavigator };