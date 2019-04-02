import React, { Component } from "react";
import PropTypes from "prop-types";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Platform, View } from "react-native";
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


class MapScreen extends Component {
  addMarkers = venuesList =>
    venuesList.map(venue => (
      <Marker
        key={venue.id}
        coordinate={{
          latitude: venue.address.lat,
          longitude: venue.address.long
        }}
        title={venue.name}
        description={venue.shortDesc}
        image={mapIcons[venue.address.mapIcon]}
      />
    ));
  render() {
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
            // width={300}
            // height={300}
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            // customMapStyle={Platform.OS === "ios" ? mapStyles : null}
            customMapStyle={mapStyles}
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
