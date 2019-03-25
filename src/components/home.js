/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Button } from "native-base";

import { Text, View } from "react-native";
class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>App Home Screen</Text>
        {/* <Button onPress={() => this.props.navigation.navigate("Venues")}>
          <Text>Go to Venues</Text>
        </Button> */}
      </View>
    );
  }
}

export default HomeScreen;
