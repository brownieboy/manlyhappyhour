import { Platform } from "react-native";

export default {
  icon: {
    activeTintColor: Platform.OS === "ios" ? "blue" : "#fff",
    inactiveTintColor: Platform.OS == "ios" ? "gray": "lightgray"
  },
  tabBar: {
    activeBackgroundColor: Platform.OS === "android" ? "#4656b0" : "#f9f9f9",
    inactiveBackgroundColor: Platform.OS === "android" ? "#4656b0" : "#f9f9f9"
  }
};
