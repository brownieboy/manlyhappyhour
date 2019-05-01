import React, { Component } from "react";
import { Text } from "react-native";

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
  render() {
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
              Deals
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>Deals List</Text>
        </Content>
      </Container>
    );
  }
}
