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
        console.log("MapScreen..componentDidMount(), calling extra setState()");
        this.setState({ extraData: true });
      }, 100);
    }
  }

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
        <Callout style={styles.plainView}>
          <View>
            <Text>{venue.name}</Text>
            <View>
              <Text style={{ fontSize: 11 }}>{venue.shortDesc}</Text>
            </View>
          </View>
        </Callout>
      </Marker>
    ));
  render() {
    console.log("MapScreen..render()");
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
