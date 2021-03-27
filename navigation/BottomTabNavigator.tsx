import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Entypo } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import SupportTab from "../screens/SupportTab";
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  SupportTabParamList
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{
        headerShown: false,
        activeTintColor: Colors[colorScheme].tint
      }}
    >
      <BottomTab.Screen
        name="Stocks"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-trending-up" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-person" color={color} />
          )
        }}
      />
      {/* <BottomTab.Screen
        name="Support"
        component={SupportTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="help" size={24} color={color} />
          )
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const TabOneStack = createStackNavigator<TabOneParamList>();
function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitle: "ChartBot Newsfeed"
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();
function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Profile" }}
      />
    </TabTwoStack.Navigator>
  );
}

// const SupportTabStack = createStackNavigator<SupportTabParamList>();
// function SupportTabNavigator() {
//   return (
//     <SupportTabStack.Navigator>
//       <SupportTabStack.Screen
//         name="SupportTab"
//         component={SupportTab}
//         options={{ headerTitle: "Support" }}
//       />
//     </SupportTabStack.Navigator>
//   );
// }
