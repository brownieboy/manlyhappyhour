/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Text, View } from "react-native";

import {
  Container,
  Icon,
  Header,
  Title,
  Content,
  ListItem,
  Left,
  Right,
  Body
  // Thumbnail
} from "native-base";
// import { Button } from "native-base";
import HeaderBackArrow from "./header-back-arrow.js";

class VenueScreen extends Component {
  render() {
    const { navigation, venueDetails } = this.props;
    const { id, parentList } = navigation.state.params;
    return (
      <Container>
        <Header>
          <Left>
            <HeaderBackArrow navCallback={navigation.goBack} />
          </Left>
          <Body>
            <Title>{venueDetails.name || "unknown"}</Title>
          </Body>
        </Header>
      </Container>
    );
  }
}

VenueScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  venueDetails: PropTypes.object.isRequired
};

export default VenueScreen;
