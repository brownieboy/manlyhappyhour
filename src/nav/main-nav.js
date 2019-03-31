import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import IconAntDesign from "react-native-vector-icons/AntDesign";

import HomeScreen from "../components/home-screen.js";
import VenuesListNav from "../nav/venues-nav.js";
import MapScreen from "../components/map-screen.js";
import VenueTabIcon from "../components/venue-tab-icon.js";

// Styles
import tabNavStyles from "../styles/tab-navigator-styles.js";

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

const routes = {
  Home: HomeScreen,
  Venues: VenuesListNav,
  Maps: MapScreen
};

VenuesListNav.navigationOptions = {
  tabBarLabel: "Venues",
  tabBarIcon: ({ tintColor }) => <VenueTabIcon tintColor={tintColor} />
};

let TabNavigator;
if (Platform.OS === "ios") {
  TabNavigator = createBottomTabNavigator(routes, {
    // animationEnabled: true,
    initialRouteName: "Home",
    lazy: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: tabNavStyles.icon.activeTintColor,
      inactiveTintColor: tabNavStyles.icon.inactiveTintColor,
      activeBackgroundColor: tabNavStyles.tabBar.inactiveBackgroundColor,
      inactiveBackgroundColor: tabNavStyles.tabBar.activeBackgroundColor
    }
  });
} else {
  TabNavigator = createMaterialBottomTabNavigator(routes, {
    labeled: true,
    showLabel: true,
    barStyle: {
      backgroundColor: tabNavStyles.tabBar.inactiveBackgroundColor
    }
  });
}

export default createAppContainer(TabNavigator);
