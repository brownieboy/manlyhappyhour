import React from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// tintColor passed in is an object
const VenueTabIcon = React.memo(({ tintColor }) => (
  <FontAwesome5
    name="beer"
    size={Platform.OS === "android" ? 26 : 30}
    style={{ color: tintColor }}
  />
));

VenueTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export default VenueTabIcon;
