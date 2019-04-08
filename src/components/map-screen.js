import React, { Component } from "react";
import PropTypes from "prop-types";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import {
  Body,
  Container,
  Content,
  Header,
  Left,
  Right,
  Title
} from "native-base";
import appColours from "../styles/appColours.js";
import mapStyles from "../styles/map-styles.js";
import mapIcons from "../constants/map-icons.js";
import { getDealTextObjArray } from "../helper-functions/deal-line-processing.js";

const styles = StyleSheet.create({
  plainView: {
    width: 200
  }
});

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extraData: false
    };
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      setTimeout(() => {
        // console.log("MapScreen..componentDidMount(), calling extra setState()");
        this.setState({ extraData: true });
      }, 100);
    }
  }

  getDealsTextItems = dealsGroupedByDay => {
    const dealsObjArray = getDealTextObjArray(dealsGroupedByDay);
    let x = -1;
    const dealTextItems = dealsObjArray.map(dealObj => {
      x++;
      // console.log("dealObj");
      // console.log(dealObj);
      return (
        <Text key={x}>
          <Text style={{ fontSize: 11 }}>{dealObj.dateTimeLabel}: </Text>
          <Text style={{ fontSize: 13 }}>{dealObj.dealShortDescription}</Text>
        </Text>
      );
    });
    return dealTextItems;
  };

  addMarkers = venuesList =>
    venuesList.map(venue => {
      console.log("venue.dealsGroupedByDay");
      console.log(venue.dealsGroupedByDay)
      const dealsTextItems =
        typeof venue.dealsGroupedByDay !== "undefined" ? (
          this.getDealsTextItems(venue.dealsGroupedByDay)
        ) : (
          <Text>No deals currently listed</Text>
        );
      return (
        <Marker
          key={venue.id}
          coordinate={{
            latitude: venue.address.lat,
            longitude: venue.address.long
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            style={{
              width: 32,
              height: 32,
              resizeMode: "contain"
              // zIndex: 3
            }}
            source={mapIcons[venue.address.mapIcon]}
          />
          <View
            style={{
              backgroundColor: "white",
              paddingTop: 1,
              paddingBottom: 1,
              paddingLeft: 3,
              paddingRight: 3,
              borderRadius: 4
            }}
          >
            <Text style={{ fontSize: 11 }}>{venue.name}</Text>
          </View>
          <Callout style={styles.plainView}>
            <View>
              <Text style={{ fontWeight: "bold" }}>{venue.name}</Text>
            </View>
            <View>{dealsTextItems}</View>
          </Callout>
        </Marker>
      );
    });
  render() {
    // console.log("MapScreen..render()");
    const { venuesList } = this.props;
    return (
      <Container>
        <Header
          style={{
            backgroundColor: appColours.panelBackgroundColor
          }}
        >
          <Left />
          <Body style={{ flex: 11 }}>
            <Title
              style={{
                color: appColours.panelTextColor
              }}
            >
              Map Search
            </Title>
          </Body>
          <Right />
        </Header>
        {/* <Content> */}
        <View style={{ flex: 1 }}>
          <MapView
            initialRegion={{
              latitude: -33.797474,
              longitude: 151.286902,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015
            }}
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            // customMapStyle={Platform.OS === "ios" ? mapStyles : null}
            customMapStyle={mapStyles}
            tracksViewChanges={false}
          >
            {this.addMarkers(venuesList)}
          </MapView>
        </View>
        {/* </Content> */}
      </Container>
    );
  }
}

MapScreen.propTypes = {
  venuesList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MapScreen;
