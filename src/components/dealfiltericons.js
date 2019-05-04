import React, { Fragment } from "react";
import { Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

let iconPlatformPrefix = "ios-";
if (Platform.OS === "android") {
  iconPlatformPrefix = "md-";
}

const DealFilterIcons = ({ filterTypes, iconStyle }) => (
  <Fragment>
    {filterTypes.includes("food") && (
      <MaterialCommunityIcons name="silverware-fork-knife" style={iconStyle} />
    )}
    {filterTypes.includes("beer") && (
      <Ionicons name={`${iconPlatformPrefix}beer`} style={iconStyle} />
    )}
    {filterTypes.includes("wine") && (
      <Ionicons name={`${iconPlatformPrefix}wine`} style={iconStyle} />
    )}
    {filterTypes.includes("cocktails") && (
      <FontAwesome5Icons name="cocktail" style={{marginTop: -5, ...iconStyle}}/>
    )}
  </Fragment>
);

export default DealFilterIcons;
