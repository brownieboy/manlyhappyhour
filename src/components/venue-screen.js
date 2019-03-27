/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, Text, View } from "react-native";
import FastImage from "react-native-fast-image";

import {
  CardItem,
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
          <Left style={{ flex: 2 }}>
            <HeaderBackArrow navCallback={navigation.goBack} />
          </Left>
          <Right style={{ flex: 11 }}>
            <Title>
              {`${venueDetails.name}, ${venueDetails.address.town}` ||
                "unknown"}
            </Title>
          </Right>
        </Header>

        <Content>
          <FastImage
            style={{
              width: Dimensions.get("window").width,
              height: 200
              // flex: 1
            }}
            source={{ uri: venueDetails.cardFullUrl }}
          />
          <Text>{venueDetails.name}</Text>
          <Text>{venueDetails.address.fullAddressLine}</Text>
        </Content>
      </Container>
    );
  }
}

VenueScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  venueDetails: PropTypes.object.isRequired
};

export default VenueScreen;
