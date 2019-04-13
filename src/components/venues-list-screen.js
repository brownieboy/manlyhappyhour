import React, { Component } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";

import { FlatList, Text, View } from "react-native";

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
export const listStyles = {
  // alternateRowColour: Platform.OS === "android" ? "#E8E8E8" : "#F5F5F5"
  // alternateRowColour: Platform.OS === "android" ? "#e4e3f2" : "#efeff7"
  alternateRowColour: Platform.OS === "android" ? "#efeff7" : "#fafafd"
};

class VenuesScreen extends Component {
  // componentDidMount() {
  //   const { loadVenuesNow } = this.props;
  //   loadVenuesNow();
  // }
  render() {
    const { venuesList, navigation } = this.props;

    return (
      <Container>
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
              Venues
            </Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <FlatList
            data={[...venuesList]}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <ListItem
                thumbnail
                onPress={() =>
                  navigation.navigate("VenueScreen", {
                    id: item.id,
                    parentList: "VenuesList"
                  })
                }
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? "transparent"
                      : listStyles.alternateRowColour,
                  marginLeft: 0,
                  paddingLeft: 10,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingRight: 0,
                  borderBottomColor: "lightgrey",
                  borderBottomWidth: 0.2,
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flex: 3 }}>
                  <FastImage
                    source={{ uri: item.thumbFullUrl }}
                    style={{ width: 55, height: 55, borderRadius: 27.5 }}
                  />
                </View>
                <View style={{ flex: 11 }}>
                  <Text style={{ fontSize: 18 }}>{item.name}</Text>
                  <Text
                    numberOfLines={2}
                    note
                    style={{ fontSize: 14, color: "darkgrey" }}
                  >
                    {/* {item.styles.join(", ")} */}
                    {item.shortDesc}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Icon
                    name="arrow-forward"
                    style={{ fontSize: 20, color: "lightgrey" }}
                  />
                </View>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

VenuesScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  venuesList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default VenuesScreen;
