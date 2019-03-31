/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import MapView from "react-native-maps";

import { Text, View } from "react-native";
class MapScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>App Map Screen</Text>
        <MapView
          initialRegion={{
            latitude: -33.797474,
            longitude: 151.286902,
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421
            latitudeDelta: 0.015,
            longitudeDelta: 0.015
          }}
          width={300}
          height={300}
        />
      </View>
    );
  }
}

export default MapScreen;
