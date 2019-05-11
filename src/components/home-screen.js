import PropTypes from "prop-types";
import React, { Component } from "react";
// import { Button } from "native-base";

import { Dimensions, Image, Text, View } from "react-native";
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
import { handleOnLayout } from "../helper-functions/lifecycleextras.js";

const manlyFerry = require("../../resources/img/16-Manly-Wharf-DNSW.jpg");

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      dimensions: Dimensions.get("window"),
      fullScreenPhotoCard: false,
      orientation: "unknown"
    };
    this.handleOnLayout = handleOnLayout.bind(this);
  }
  componentDidMount() {
    const { loadVenuesNow, loadSettingsNow } = this.props;
    loadVenuesNow();
    loadSettingsNow();
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
          <Left />
          <Body style={{ flex: 6 }}>
            <Title
              style={{
                color: appColours.panelTextColor,
                fontSize: 16
              }}
            >
              Manly Happy Hour
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
            <Image
              source={manlyFerry}
              style={{ width: Dimensions.width, height: 230 }}
            />
          </View>
          <CardItem>
            <ParsedTextFormatted>
              {homeData.blurb
                ? homeData.blurb
                : "Please wait, getting latest updates..."}
            </ParsedTextFormatted>
          </CardItem>
        </Content>
        <View
          onLayout={() => {
            this.handleOnLayout(Dimensions);
          }}
        />
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  loadVenuesNow: PropTypes.func.isRequired,
  loadSettingsNow: PropTypes.func.isRequired
};

export default HomeScreen;
