import {Platform} from "react-native";

const appColours = {
  panelBackgroundColor: Platform.OS === "android" ? "#00BFFF" : "#acdbfd",
  panelTextColor: "white",
  panelTopFontSize: 14
};

export const listStyles = {
  // alternateRowColour: Platform.OS === "android" ? "#E8E8E8" : "#F5F5F5"
  // alternateRowColour: Platform.OS === "android" ? "#e4e3f2" : "#efeff7"
  alternateRowColour: Platform.OS === "android" ? "#efeff7" : "#fafafd"
};

export default appColours;
