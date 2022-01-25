import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ContactStackNavigator } from "./StackNavigation";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab 1" component={MainStackNavigator} />
      <Tab.Screen name="Tab 2" component={MainStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;