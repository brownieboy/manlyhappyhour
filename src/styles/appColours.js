import {Platform} from "react-native";

const appColours = {
  panelBackgroundColor: Platform.OS === "android" ? "#00BFFF" : "#acdbfd",
  panelTextColor: "white",
  panelTopFontSize: 14
};
export default appColours;
