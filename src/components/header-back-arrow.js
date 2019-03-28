import React from "react";
import PropTypes from "prop-types";
import { Platform, Text } from "react-native";
import { Button, Icon } from "native-base";

import appColours from "../styles/appColours.js";

const backButtonTextStyle = {
  fontSize: 13,
  marginLeft: 5,
  color: appColours.panelTextColour
};
// if (Platform.OS === "android") {
//   backButtonTextStyle.color = "white";
//   backButtonTextStyle.fontSize = 12;
// }

const HeaderBackArrow = ({
  navCallback,
  backText = "",
  androidText,
  iosText
}) => {
  let localText = backText;
  if (Platform.OS === "android") {
    if (androidText) {
      localText = androidText;
    }
  } else {
    if (iosText) {
      localText = iosText;
    }
  }
  return (
    <Button transparent onPress={() => navCallback()}>
      <Icon name="arrow-back" style={{ color: appColours.panelTextColor }} />
      <Text style={backButtonTextStyle}>{localText}</Text>
    </Button>
  );
};

HeaderBackArrow.propTypes = {
  navCallback: PropTypes.func.isRequired,
  backText: PropTypes.string,
  androidText: PropTypes.string,
  iosText: PropTypes.string
};

export default HeaderBackArrow;
