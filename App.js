/**
 * @format
 * @flow
 */

import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import IconAntDesign from "react-native-vector-icons/AntDesign";


import HomeScreen from "./src/components/home.js";
import VenuesScreen from "./src/components/venues.js";
import VenueTabIcon from "./src/components/venue-tab-icon.js"

// const AppNavigator = createBottomTabNavigator(
//   {
//     Home: HomeScreen,
//     Venues: VenuesScreen
//   },
//   { initialRouteName: "Home" }
// );

HomeScreen.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ tintColor }) => (
    <IconAntDesign
      name="home"
      style={{ color: tintColor }}
      size={Platform.OS === "ios" ? 28 : 25}
    />
  )
};

VenuesScreen.navigationOptions = {
  tabBarLabel: "Venues",
  tabBarIcon: ({ tintColor }) => <VenueTabIcon tintColor={tintColor} />
};

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Venues: VenuesScreen
});

export default createAppContainer(TabNavigator);
