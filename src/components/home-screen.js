import PropTypes from "prop-types";
import React, { Component } from "react";
// import { Button } from "native-base";

import { Text, View } from "react-native";
import {
  Body,
  Button,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  ListItem,
  // Radio,
  Right,
  Title
} from "native-base";

import appColours from "../styles/appColours.js";
import ParsedTextFormatted from "./parsed-text-formatted.js";

class HomeScreen extends Component {
  componentDidMount() {
    const { loadVenuesNow } = this.props;
    loadVenuesNow();
    // loadSettingsNow();
  }
  render() {
    const { homeData } = this.props;
    // console.log("homeData:");
    // console.log(homeData);
    return (
      <Container>
        <Header
          style={{
            backgroundColor: appColours.panelBackgroundColor
          }}
        >
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 6 }}>
            <Title
              style={{
                color: appColours.panelTextColor,
                fontSize: appColours.panelTopFontSize
              }}
            >
              Home Screen
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content>
          <CardItem>
            <ParsedTextFormatted>
              {homeData.blurb ? homeData.blurb : "Home description"}
            </ParsedTextFormatted>
          </CardItem>
        </Content>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  loadVenuesNow: PropTypes.func.isRequired
  // loadSettingsNow: PropTypes.func.isRequired
};

export default HomeScreen;
