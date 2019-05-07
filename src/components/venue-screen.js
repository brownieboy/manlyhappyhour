import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
// import Emoji from "react-native-emoji";
import nodeEmoji from "node-emoji";

import {
  CardItem,
  Container,
  // Icon,
  Header,
  Title,
  Content,
  // ListItem,
  Left,
  Right,
  Body
  // Thumbnail
} from "native-base";

// import { parseTextFieldToDataTypesArray } from "../helper-functions/textfield-processing.js";
import ParsedTextFormatted from "./parsed-text-formatted.js";
import HeaderBackArrow from "./header-back-arrow.js";
import appColours, { listStyles } from "../styles/appColours.js";
import {
  // getDealTextObjArray,
  // getHoursText,
  getDaysLabel
} from "../helper-functions/deal-line-processing.js";
import { handleOnLayout } from "../helper-functions/lifecycleextras.js";
import { getTimeText } from "../helper-functions/dateTime.js";

class VenueScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: Dimensions.get("window"),
      fullScreenPhotoCard: false,
      internalStateChanged: false,
      orientation: "unknown"
    };
    this.handleOnLayout = handleOnLayout.bind(this);
  }

  // getDealsTextItems = dealsArray => {
  //   const dealTextItems = dealsArray.map(dealObj => {
  //     return (
  //       <Text key={dealObj.id}>
  //         <Text style={{ fontSize: 11 }}>
  //           {getDaysLabel(dealObj.days ? dealObj.days : [])}{" "}
  //         </Text>
  //         {dealObj.start && dealObj.finish && (
  //           <Text style={{ fontSize: 11 }}>
  //             {`${getTimeText(dealObj.start)}-${getTimeText(dealObj.finish)}: `}
  //           </Text>
  //         )}
  //         <Text style={{ fontSize: 13 }}>
  //           {dealObj.desc ? dealObj.desc : "Deal description"}
  //         </Text>
  //       </Text>
  //     );
  //   });
  //   return dealTextItems;
  // };

  getDealsTextItems = dealsArray => {
    let x = 0;
    const dealTextItems = dealsArray.map(dealObj => {
      x++;
      return (
        <View
          key={dealObj.id}
          style={{
            margin: 0,
            flexDirection: "column",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 5,
            paddingRight: 5,
            borderBottomWidth: 1,
            borderColor: "lightgrey",
            // justifyContent: "center",
            // alignItems: "center",
            backgroundColor:
              x % 2 === 0 ? "transparent" : listStyles.alternateRowColour
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 12 }}>
              {dealObj.days ? getDaysLabel(dealObj.days) : "Day?"}{" "}
            </Text>
            {dealObj.start && dealObj.finish && (
              <Text style={{ fontSize: 12 }}>
                {`${getTimeText(dealObj.start)}-${getTimeText(
                  dealObj.finish
                )}: `}
              </Text>
            )}
          </View>
          <Text style={{ fontSize: 14 }}>{dealObj.desc}</Text>
        </View>
      );
    });
    return dealTextItems;
  };

  render() {
    const { navigation, venueDetails, venueDeals = [] } = this.props;
    const { orientation } = this.state;
    // console.log("venue-screen render, props");
    // console.log(this.props);

    const { id, parentList } = navigation.state.params;
    const imageWidth = Dimensions.get("window").width;
    const imageHeight = imageWidth / 1.6;
    // console.log("venueDetails:");
    // console.log(venueDetails);
    const dealsTextItems =
      venueDeals.length > 0 ? (
        this.getDealsTextItems(venueDeals)
      ) : (
        <Text>No deals currently listed</Text>
      );

    let backToText = "Venues";
    if (parentList === "map") {
      backToText = "Map";
    } else if (parentList === "deals") {
      backToText = "Deals";
    }

    // console.log("venueDeals");
    // console.log(venueDeals);
    return (
      <Container>
        {orientation !== "landscape" && (
          <Header
            style={{
              backgroundColor: appColours.panelBackgroundColor
            }}
          >
            <Left style={{ flex: 4 }}>
              <HeaderBackArrow navCallback={navigation.goBack}>
                <Text
                  style={{
                    fontSize: appColours.panelTopFontSize,
                    color: appColours.panelTextColor,
                    marginLeft: 4
                  }}
                >
                  Back to {backToText}
                </Text>
              </HeaderBackArrow>
            </Left>
            <Right style={{ flex: 9 }}>
              <Title
                style={{
                  color: appColours.panelTextColor
                }}
              >
                {`${venueDetails.name ? venueDetails.name : "Venue name"}, ${
                  venueDetails.address && venueDetails.address.town
                    ? venueDetails.address.town
                    : "Suburb"
                }`}
              </Title>
            </Right>
          </Header>
        )}

        <Content>
          {venueDetails.cardFullUrl && (
            <FastImage
              style={{
                width: imageWidth,
                height: imageHeight
                // flex: 1
              }}
              source={{ uri: venueDetails.cardFullUrl }}
            />
          )}
          <CardItem
            style={{
              backgroundColor: appColours.panelBackgroundColor,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flex: 1,
              height: 60
            }}
          >
            <Body style={{ flexGrow: 7 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <Text
                  style={{
                    color: appColours.panelTextColor,
                    fontSize: 18,
                    fontWeight: "bold",
                    flex: 1
                  }}
                >
                  {venueDetails.name ? venueDetails.name : "Venue name"}
                </Text>
                <Text
                  style={{
                    color: appColours.panelTextColor,
                    fontSize: 13
                    // flex:3
                  }}
                >
                  {venueDetails.address && venueDetails.address.addressLine
                    ? venueDetails.address.addressLine
                    : "Venue address"}
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: appColours.panelTextColor
                  }}
                >
                  {venueDetails.shortDesc
                    ? venueDetails.shortDesc
                    : "Venue short descritpion"}
                </Text>
              </View>
            </Body>
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
                  fontSize: 15,
                  color: appColours.panelTextColor
                }}
              >
                {/* {getHoursText(venueDetails.hoursGroupedByDay)} */}
              </Text>
            </View>
          </CardItem>
          <CardItem padder>
            <ParsedTextFormatted>
              {venueDetails.description
                ? venueDetails.description
                : "Venue description"}
            </ParsedTextFormatted>
          </CardItem>
          <CardItem style={{ flexDirection: "column" }} padder>
            <Text style={{ fontWeight: "bold", alignSelf: "flex-start" }}>Deals:</Text>
            <View style={{alignSelf: "stretch"}}>{dealsTextItems}</View>
          </CardItem>
          <View
            onLayout={() => {
              this.handleOnLayout(Dimensions);
            }}
          />
        </Content>
      </Container>
    );
  }
}

VenueScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  venueDetails: PropTypes.object.isRequired,
  venueDeals: PropTypes.array.isRequired
};

export default VenueScreen;
