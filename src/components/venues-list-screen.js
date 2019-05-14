import React, { Component } from "react";
// import { Platform } from "react-native";
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

import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";

import appColours, { listStyles } from "../styles/appColours.js";

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
                color: appColours.panelTextColor,
                fontSize: appColours.panelTopFontSize
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
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingRight: 0,
                  borderBottomColor: "lightgrey",
                  borderBottomWidth: 0.2,
                  justifyContent: "space-between"
                }}
              >
                {item.thumbFullUrl && (
                  <View style={{ flex: 3 }}>
                    <FastImage
                      source={{ uri: item.thumbFullUrl }}
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                  </View>
                )}
                <View style={{ flex: 11 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      flexGrow: 1,
                      // borderColor: "red",
                      // borderWidth: 1,
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: appColours.venueListFontColor
                      }}
                    >
                      {item.name ? item.name : "Venue name"}
                    </Text>
                    {item.restricted && item.restricted.includes("membership") && (
                      <FontAwesome5Icons
                        name="user-lock"
                        style={{
                          color: appColours.venueListFontColor,
                          marginLeft: 5
                        }}
                      />
                    )}
                  </View>
                  <Text
                    // numberOfLines={2}
                    // note
                    style={{ fontSize: 13, color: "#696969" }}
                  >
                    {/* {item.styles.join(", ")} */}
                    {item.shortDesc
                      ? item.shortDesc
                      : "Venue short description"}
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
