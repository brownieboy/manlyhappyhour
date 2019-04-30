import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
// import Emoji from "react-native-emoji";
import nodeEmoji from "node-emoji";

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

// import { parseTextFieldToDataTypesArray } from "../helper-functions/textfield-processing.js";
import ParsedTextFormatted from "./parsed-text-formatted.js";
import HeaderBackArrow from "./header-back-arrow.js";
import appColours from "../styles/appColours.js";
import {
  // getDealTextObjArray,
  // getHoursText,
  getDaysLabel
} from "../helper-functions/deal-line-processing.js";
import { handleOnLayout } from "../helper-functions/lifecycleextras.js";

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

  getDealsTextItems = dealsArray => {
    const dealTextItems = dealsArray.map(dealObj => {
      return (
        <Text key={dealObj.id}>
          <Text style={{ fontSize: 11 }}>{getDaysLabel(dealObj.days)} </Text>
          <Text style={{ fontSize: 11 }}>
            {`${dealObj.start}-${dealObj.finish}: `}
          </Text>
          <Text style={{ fontSize: 13 }}>{dealObj.desc}</Text>
        </Text>
      );
    });
    return dealTextItems;
  };

  render() {
    const { navigation, venueDetails, venueDeals = [] } = this.props;
    const { fullScreenPhotoCard, isFavourite, orientation } = this.state;

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
        )}

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
                  {venueDetails.name}
                </Text>
                <Text
                  style={{
                    color: appColours.panelTextColor,
                    fontSize: 13
                    // flex:3
                  }}
                >
                  {venueDetails.address.addressLine}
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: appColours.panelTextColor
                  }}
                >
                  {venueDetails.shortDesc}
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
              {venueDetails.description}
            </ParsedTextFormatted>
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
