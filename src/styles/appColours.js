import { Platform } from "react-native";

const appColours = {
  // panelBackgroundColor: Platform.OS === "android" ? "#2c3c8e" : "#2c3c8e",
  panelBackgroundColor: "#2c3c8e",
  panelTextColor: "white",
  panelTopFontSize: 14,
  venueListFontColor: "#003366"
};

export const listStyles = {
  // alternateRowColour: Platform.OS === "android" ? "#E8E8E8" : "#F5F5F5"
  // alternateRowColour: Platform.OS === "android" ? "#e4e3f2" : "#efeff7"
  alternateRowColour: Platform.OS === "android" ? "#efeff7" : "#fafafd"
};

export default appColours;
