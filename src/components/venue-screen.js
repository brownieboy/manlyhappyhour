import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import Emoji from "react-native-emoji";

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

import { parseTextFieldToDataTypesArray } from "../helper-functions/textfield-processing.js";
import ParsedTextFormatted from "./parsed-text-formatted.js";
import HeaderBackArrow from "./header-back-arrow.js";
import appColours from "../styles/appColours.js";
import {
  // getDealTextObjArray,
  // getHoursText,
  getDaysLabel
} from "../helper-functions/deal-line-processing.js";

class VenueScreen extends Component {
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

  renderTextElements = textString => {
    const textElementsArray = parseTextFieldToDataTypesArray(textString);
    if (textElementsArray.length === 0) {
      return <ParsedTextFormatted>{textString}</ParsedTextFormatted>;
    }
    let x = -1;
    
    return textElementsArray.map(elementMember => {
      x++;
      if (elementMember.type === "emoji") {
        return <Emoji name={elementMember.data} key={x} />;
      }
      return <ParsedTextFormatted key={x}>{textString}</ParsedTextFormatted>;
    });
  };

  render() {
    const { navigation, venueDetails, venueDeals = [] } = this.props;
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
              alignItems: "flex-start",
              height: 60
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column"
                // alignItems: "flex-end"
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
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
                    fontSize: 13,
                    marginLeft: 8
                  }}
                >
                  {venueDetails.address.addressLine}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: appColours.panelTextColor
                    // marginLeft: 5
                  }}
                >
                  {venueDetails.shortDesc}
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
                  fontSize: 15,
                  color: appColours.panelTextColor
                }}
              >
                {/* {getHoursText(venueDetails.hoursGroupedByDay)} */}
              </Text>
            </View>
          </CardItem>
          <CardItem padder>
            {this.renderTextElements(venueDetails.description)}
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
  venueDetails: PropTypes.object.isRequired,
  venueDeals: PropTypes.array.isRequired
};

export default VenueScreen;
