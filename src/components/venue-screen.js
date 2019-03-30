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
    Object.keys(hoursGroupedByDay).forEach(daysItemKey => {
      // console.log(daysItemKey); // key
      currentDayItem = hoursGroupedByDay[daysItemKey];
      hoursTextStringArray = [
        ...hoursTextStringArray,
        `${daysItemKey}: ${currentDayItem[0].open}${
          typeof currentDayItem[0].close !== "undefined"
            ? `-${currentDayItem[0].close}`
            : ""
        }`
      ];
    });
    return hoursTextStringArray.join(", ");
  };

  getDealsTextItems = dealsGroupedByDay => {
    let dealsObjArray = [];
    let currentDealsArray;
    let currentDealObjArray;
    // console.log("getDealsText");
    // console.log(dealsGroupedByDay);
    let dateTimeLabel;
    let closeTimeString;
    Object.keys(dealsGroupedByDay).forEach(daysItemKey => {
      // console.log(daysItemKey); // key
      currentDealsArray = dealsGroupedByDay[daysItemKey];
      currentDealObjArray = currentDealsArray.map(currentDealObjArray => {
        closeTimeString =
          typeof currentDealObjArray.close !== "undefined"
            ? `-${currentDealObjArray.close}`
            : "";
        dateTimeLabel = `${daysItemKey} ${
          currentDealObjArray.open
        }${closeTimeString}`;
        return {
          dateTimeLabel,
          dealDescription: currentDealObjArray.dealDescription
        };
      });
      dealsObjArray = [...dealsObjArray, ...currentDealObjArray];
    });
    let x = -1;
    const dealTextItems = dealsObjArray.map(dealObj => {
      x++;
      return (
        <Text key={x}>
          <Text style={{ fontSize: 11 }}>{dealObj.dateTimeLabel}: </Text>
          {dealObj.dealDescription}
        </Text>
      );
    });

    return dealTextItems;
  };

  /*
      const dealTextItems = dealsObjArray.map(dealObj => {
      x++;
      return (
        <Fragment>
          <Text style={{ fontSize: 11 }}>{dealObj.dateTimeLabel}</Text>
          <Text>{dealObj.dealDescription}</Text>
        </Fragment>
      );
    });
*/

  render() {
    const { navigation, venueDetails } = this.props;
    const { id, parentList } = navigation.state.params;
    const imageWidth = Dimensions.get("window").width;
    const imageHeight = imageWidth / 1.6;
    console.log("venueDetails:");
    console.log(venueDetails);
    const dealsTextItems =
      typeof venueDetails.dealsGroupedByDay !== "undefined" ? (
        this.getDealsTextItems(venueDetails.dealsGroupedByDay)
      ) : (
        <Text>No deals currently listed</Text>
      );
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
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end"
                }}
              >
                <Text
                  style={{
                    color: appColours.panelTextColor,
                    fontSize: 18,
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end"
              }}
            >
              {/* <Text style={{ fontSize: 11, color: appColours.panelTextColor }}>
                Hours:
              </Text> */}
              <Text
                style={{
                  fontSize: 13,
                  color: appColours.panelTextColor
                }}
              >
                {this.getHoursText(venueDetails.hoursGroupedByDay)}
              </Text>
            </View>
          </CardItem>
          <CardItem padder>
            <Text>{venueDetails.description}</Text>
          </CardItem>
          <CardItem padder>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Deals:</Text>
              {dealsTextItems}
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
