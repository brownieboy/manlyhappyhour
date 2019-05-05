import React from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

// import { Icon } from "native-base";

import { IcoMoonIcon } from "./custom-vector-icons.js";

// let iconPlatformPrefix = "ios-";
// if (Platform.OS === "android") {
//   iconPlatformPrefix = "md-";

// tintColor passed in is an object
export const AboutTabIcon = React.memo(({ tintColor }) => (
  <Ionicons
    name={Platform.OS === "android" ? "md-information-circle" : "ios-information-circle"}
    size={Platform.OS === "android" ? 26 : 26}
    style={{ color: tintColor }}
  />
));

AboutTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export const DealsTabIcon = React.memo(({ tintColor }) => (
  <FontAwesome5Icons
    name="dollar-sign"
    size={Platform.OS === "android" ? 26 : 26}
    style={{ color: tintColor }}
  />
));

DealsTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export const MapTabIcon = React.memo(({ tintColor }) => (
  <MaterialCommunityIcons
    name={Platform.OS === "android" ? "google-maps" : "map-marker-multiple"}
    size={Platform.OS === "android" ? 26 : 30}
    style={{ color: tintColor }}
  />
));

MapTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

// export const VenueTabIcon = React.memo(({ tintColor }) => (
//   <Icon
//     name="wine"
//     size={Platform.OS === "android" ? 26 : 30}
//     style={{ color: tintColor }}
//   />
// ));

export const VenueTabIcon = React.memo(({ tintColor }) => (
  <IcoMoonIcon
    name="couple-drinking-in-a-bar-svgrepo-com"
    size={33}
    style={{ color: tintColor }}
  />
));

VenueTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export const HomeTabIcon = React.memo(({ tintColor }) => (
  <IconAntDesign
    name="home"
    style={{ color: tintColor }}
    size={Platform.OS === "ios" ? 28 : 25}
  />
));

HomeTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
