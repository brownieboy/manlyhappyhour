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
  Radio,
  Right,
  Title
} from "native-base";
import appColours from "../styles/appColours.js";
import mapStyles from "../styles/map-styles.js";
import mapIcons from "../constants/map-icons.js";
import {
  getDealTextObjArray,
  getDaysLabel
} from "../helper-functions/deal-line-processing.js";

const styles = StyleSheet.create({
  plainView: {
    width: 200
  }
});

class MapFilter extends Component {
  render() {
    return (
      <View style={{ position: "absolute", top: 10 }}>
        <Text>Today</Text>
        <Radio />
      </View>
    );
  }
}

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

  getDealsTextItems = dealsArray => {
    const dealTextItems = dealsArray.map(dealObj => {
      return (
        <Text key={dealObj.id}>
          <Text style={{ fontSize: 11 }}>{getDaysLabel(dealObj.days)} </Text>
          <Text style={{ fontSize: 11 }}>
            {`${dealObj.start}-${dealObj.finish}: `}
          </Text>
          <Text style={{ fontSize: 13 }}>{dealObj.shortDesc}</Text>
        </Text>
      );
    });
    return dealTextItems;
  };

  addMarkers = venuesList =>
    venuesList.map(venue => {
      const dealsArray = this.props.selectVenueDeals(venue.id);
      // console.log("mapScreen..addMarkers, dealsArray:");
      // console.log(dealsArray)
      const dealsTextItems =
        dealsArray.length > 0 ? (
          this.getDealsTextItems(dealsArray)
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
          <MapFilter />
        </View>
        {/* </Content> */}
      </Container>
    );
  }
}

MapScreen.propTypes = {
  venuesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectVenueDeals: PropTypes.func.isRequired
};

export default MapScreen;
