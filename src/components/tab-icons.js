import React from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconAntDesign from "react-native-vector-icons/AntDesign";

import { Icon } from "native-base";

// tintColor passed in is an object
export const DealsTabIcon = React.memo(({ tintColor }) => (
  <FontAwesome5Icons
    name="search-dollar"
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

export const VenueTabIcon = React.memo(({ tintColor }) => (
  <Icon
    name="wine"
    size={Platform.OS === "android" ? 26 : 30}
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