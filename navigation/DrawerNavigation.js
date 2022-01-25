import React , { useState, useEffect, useRef } from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { ContactStackNavigator } from "./StackNavigation";

import TabNavigator from "./TabNavigation";
import Tab2 from "../screens/Tab2";
import Joke from "../screens/Joke";
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Text, View, Button, Platform, StyleSheet, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const JokeAPI = "https://v2.jokeapi.dev/joke/Any";

const DrawerNavigator = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [setup, setSetup] = useState([]);
  const [delivery, setDelivery] = useState([]);

  // Use for navigation after tapping on the notificaiton
  const navigate = useNavigation();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response.notification.request.content.data.delivery);
      //stack page showing delivery or punchline of the joke
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []); 

  async function getJokeAsync() {
    try {
      let response = await fetch(JokeAPI);
      let json = await response.json();
      setSetup(json.setup);
      setDelivery(json.setDelivery);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

async function schedulePushNotification() {
  fetch(JokeAPI)
      .then((response) => response.json()) // get joke and convert to json
      .then((json) => {
        setSetup(json.setup);
        setDelivery(json.delivery);
      })
      .catch((error) => alert(error)) 
      .finally(() => setLoading(false)); 
      
  // create notificaiton with joke from API
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Show Me a Joke",
      body: setup,
      data: { delivery: delivery},
    },
    trigger: { seconds: 1 },
  });

}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// Custom drawer with onpress function for "show me a joke"
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="new joke" onPress={async () => {
          await schedulePushNotification();
        }} />
    </DrawerContentScrollView>
  );
}

  return (
    <Drawer.Navigator  drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="JokeApp" component={TabNavigator} /> 
    </Drawer.Navigator>
  );
}



export default DrawerNavigator;