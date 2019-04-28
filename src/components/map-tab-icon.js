import React from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// tintColor passed in is an object
const MapTabIcon = React.memo(({ tintColor }) => (
  <MaterialCommunityIcons
    name={Platform.OS === "android" ? "google-maps" : "map-marker-multiple"}
    size={Platform.OS === "android" ? 26 : 30}
    style={{ color: tintColor }}
  />
));

MapTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export default MapTabIcon;
