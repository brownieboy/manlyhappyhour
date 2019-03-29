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
import appColours from "../styles/appColours.js";

class VenueScreen extends Component {
  getHoursText = hoursGroupedByDay => {
    let hoursTextStringArray = [];
    let currentDayItem;
    Object.keys(hoursGroupedByDay).forEach(daysItem => {
      // console.log(daysItem); // key
      currentDayItem = hoursGroupedByDay[daysItem];
      hoursTextStringArray = [
        ...hoursTextStringArray,
        `${daysItem}: ${currentDayItem[0].open}${
          typeof currentDayItem[0].close !== "undefined"
            ? `- ${currentDayItem[0].close}`
            : ""
        }`
      ];
    });
    return hoursTextStringArray.join(", ");
  };

  render() {
    const { navigation, venueDetails } = this.props;
    const { id, parentList } = navigation.state.params;
    const imageWidth = Dimensions.get("window").width;
    const imageHeight = imageWidth / 1.6;
    return (
      <Container>
        <Header
          style={{
            backgroundColor: appColours.panelBackgroundColor
          }}
        >
          <Left style={{ flex: 2 }}>
            <HeaderBackArrow navCallback={navigation.goBack} />
          </Left>
          <Right style={{ flex: 11 }}>
            <Title
              style={{
                color: appColours.panelTextColor
              }}
            >
              {`${venueDetails.name}, ${venueDetails.address.town}` ||
                "unknown"}
            </Title>
          </Right>
        </Header>

        <Content>
          <FastImage
            style={{
              width: imageWidth,
              height: imageHeight
              // flex: 1
            }}
            source={{ uri: venueDetails.cardFullUrl }}
          />
          <CardItem
            style={{
              backgroundColor: appColours.panelBackgroundColor,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >
            <View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{
                    color: appColours.panelTextColor,
                    fontSize: 17,
                    fontWeight: "bold"
                  }}
                >
                  {venueDetails.name}
                </Text>
                <Text
                  style={{
                    color: appColours.panelTextColor,
                    marginLeft: 5
                  }}
                >
                  {venueDetails.address.addressLine}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: appColours.panelTextColor
                }}
              >
                {`Hours: ${this.getHoursText(venueDetails.hoursGroupedByDay)}`}
              </Text>
            </View>
          </CardItem>
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
