import React, { Fragment } from "react";
import { Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

let iconPlatformPrefix = "ios-";
if (Platform.OS === "android") {
  iconPlatformPrefix = "md-";
}

const DealFilterIcons = ({ iconTypes = [], iconStyle }) => (
  <Fragment>
    {iconTypes.includes("food") && (
      <MaterialCommunityIcons name="silverware-fork-knife" style={iconStyle} />
    )}
    {iconTypes.includes("beer") && (
      <Ionicons name={`${iconPlatformPrefix}beer`} style={iconStyle} />
    )}
    {iconTypes.includes("wine") && (
      <Ionicons name={`${iconPlatformPrefix}wine`} style={iconStyle} />
    )}
    {iconTypes.includes("cocktails") && (
      <FontAwesome5Icons
        name="cocktail"
        style={{ ...iconStyle, marginTop: -(iconStyle.fontSize / 9) }}
      />
    )}
  </Fragment>
);

export default DealFilterIcons;
