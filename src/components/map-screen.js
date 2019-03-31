/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import MapView from "react-native-maps";
import { View } from "react-native";
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

class MapScreen extends Component {
  render() {
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
          />
        </View>
        {/* </Content> */}
      </Container>
    );
  }
}

export default MapScreen;
