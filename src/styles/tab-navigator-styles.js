import { Platform } from "react-native";

import appColours from "./appColours.js";

const tabNavigatorStyles = {
  icon: {
    //   activeTintColor: Platform.OS === "ios" ? "blue" : "#fff",
    //   inactiveTintColor: Platform.OS == "ios" ? "gray" : "lightgray"
    activeTintColor: "white",
    inactiveTineColor: "lightgray"
  },
  tabBar: {
    // activeBackgroundColor: Platform.OS === "android" ? "#4656b0" : "#f9f9f9",
    // inactiveBackgroundColor: Platform.OS === "android" ? "#4656b0" : "#f9f9f9"
    activeBackgroundColor: appColours.panelBackgroundColor,
    inactiveBackgroundColor: appColours.panelBackgroundColor
  }
};

export default tabNavigatorStyles;
