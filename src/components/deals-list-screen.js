import React, { Component } from "react";
import PropTypes from "prop-types";

import { Dimensions, SectionList, Text, View } from "react-native";
import panelStyles from "../styles/appColours";
import { getTimeText } from "../helper-functions/dateTime.js";
import { handleOnLayout } from "../helper-functions/lifecycleextras.js";

import {
  Container,
  Header,
  Icon,
  Title,
  Content,
  ListItem,
  Left,
  Right,
  Body
  // Thumbnail
} from "native-base";

import appColours from "../styles/appColours.js";

export default class DealsListScreen extends Component {
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
  render() {
    const { dealsGroupedByDay, navigation } = this.props;
    const { orientation } = this.state;
    // console.log("DealsListScreen, dealsGroupedByDay:");
    // console.log(dealsGroupedByDay);

    return (
      <Container>
        {orientation !== "landscape" && (
          <Header
            style={{
              backgroundColor: appColours.panelBackgroundColor,
              color: appColours.panelTextColor
            }}
          >
            <Left />
            <Body>
              <Title
                style={{
                  color: appColours.panelTextColor
                }}
              >
                Deals
              </Title>
            </Body>
            <Right />
          </Header>
        )}
        <View style={{ flex: 1 }}>
          <SectionList
            sections={dealsGroupedByDay.map(dealsByDayObj => ({
              title: dealsByDayObj.key,
              data: dealsByDayObj.values
            }))}
            renderSectionHeader={({ section }) => {
              return (
                <ListItem
                  style={{
                    // backgroundColor: panelStyles.backgroundColor,
                    paddingLeft: 10
                  }}
                  itemDivider
                >
                  <Text
                    // style={{ color: panelStyles.color, fontWeight: "bold" }}
                    style={{ fontWeight: "bold" }}
                  >
                    {section.title}
                  </Text>
                </ListItem>
              );
            }}
            renderItem={({ item, index }) => (
              <ListItem
                onPress={() =>
                  navigation.navigate("VenueScreen", {
                    id: item.venueId,
                    parentList: "deals"
                  })
                }
              >
                <Left style={{ flex: 4 }}>
                  <Text style={{ fontSize: 11 }}>
                    {`${getTimeText(item.start)}${
                      orientation !== "landscape" ? "\n" : ""
                    }-${getTimeText(item.finish)}:`}
                  </Text>
                </Left>
                <Body style={{ flex: 12 }}>
                  <Text style={{ fontSize: 11, marginLeft: 3 }}>
                    {item.desc}
                  </Text>
                </Body>
                <Body style={{ flex: 3 }}>
                  <Text style={{ fontSize: 11 }}>{item.venue.name}</Text>
                </Body>
                <Right style={{ flex: 1 }}>
                  <Icon
                    name="arrow-forward"
                    style={{ fontSize: 20, color: "lightgrey" }}
                  />
                </Right>
              </ListItem>
            )}
            stickySectionHeadersEnabled={true}
          />
        </View>
        <View
          onLayout={() => {
            this.handleOnLayout(Dimensions);
          }}
        />
      </Container>
    );
  }
}

DealsListScreen.propTypes = {
  dealsGroupedByDay: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.object.isRequired
};
