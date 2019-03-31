import React from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// tintColor passed in is an object
const VenueTabIcon = React.memo(({ tintColor }) => (
  <MaterialCommunityIcons
    name="google-maps"
    size={Platform.OS === "android" ? 26 : 30}
    style={{ color: tintColor }}
  />
));

VenueTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export default VenueTabIcon;
