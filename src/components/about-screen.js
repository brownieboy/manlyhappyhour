import PropTypes from "prop-types";
import React, { Component } from "react";
// import { Button } from "native-base";

import { Dimensions, Image, Platform, Text, View } from "react-native";
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
  Title,
  Tabs,
  Tab,
  TabHeading
} from "native-base";
import DeviceInfo from "react-native-device-info";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";

import appColours from "../styles/appColours.js";
import ParsedTextFormatted from "./parsed-text-formatted.js";
import { handleOnLayout } from "../helper-functions/lifecycleextras.js";
import { renderTextImageElements } from "../helper-functions/render-text-elements.js";

let segmentIconColourSelected = "white";
let segmentIconColourNotSelected = "#A8A8A8"; // Shades lighter than grey
if (Platform.OS === "ios") {
  segmentIconColourSelected = "white";
  segmentIconColourNotSelected = "#A8A8A8";
}

const itCrowd = require("../../resources/img/it-crowd.gif");
const mikeFerry = require("../../resources/img/mike_ferry_pines.jpg");

class AboutScreen extends Component {
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

  getTextContent = (richText, richTextParsedArray) => {
    // Keep this as local method for now, since it may vary between components
    if (
      typeof richTextParsedArray !== "undefined" &&
      richTextParsedArray.length > 0
    ) {
      return (
        <Content>
          {renderTextImageElements(richTextParsedArray, { padderText: true })}
        </Content>
      );
    }
    return (
      <Content padder>
        <ParsedTextFormatted>{richText}</ParsedTextFormatted>
      </Content>
    );
  };

  // componentDidMount() {
  //   const { loadVenuesNow } = this.props;
  //   loadVenuesNow();
  //   // loadSettingsNow();
  // }
  render() {
    const { aboutData } = this.props;
    const { currentTab, orientation } = this.state;
    // console.log("aboutData:");
    // console.log(aboutData);
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
              Info
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Tabs onChangeTab={({ i }) => this.setState({ currentTab: i })}>
          <Tab
            heading={
              <TabHeading
                style={{ backgroundColor: appColours.panelBackgroundColor }}
              >
                <Ionicons
                  name={
                    Platform.OS === "android"
                      ? "md-help-circle"
                      : "ios-help-circle"
                  }
                  style={{
                    marginRight: 7,
                    color:
                      currentTab === 0
                        ? segmentIconColourSelected
                        : segmentIconColourNotSelected
                  }}
                  size={25}
                />
                <Text
                  style={{
                    color:
                      currentTab === 0
                        ? segmentIconColourSelected
                        : segmentIconColourNotSelected
                  }}
                >
                  Using the App
                </Text>
              </TabHeading>
            }
          >
            <Content>
              <View>
                <Image
                  source={itCrowd}
                  style={{ width: Dimensions.width, height: 230 }}
                />
              </View>
              {/* <Content padder>
                <ParsedTextFormatted>{aboutData.helpBlurb}</ParsedTextFormatted>
              </Content> */}
              {this.getTextContent(
                aboutData.helpBlurb,
                aboutData.helpBlurbArray || []
              )}
            </Content>
          </Tab>
          <Tab
            heading={
              <TabHeading
                style={{ backgroundColor: appColours.panelBackgroundColor }}
              >
                <IconFontAwesome5
                  name="code"
                  style={{
                    marginRight: 7,
                    color:
                      currentTab === 1
                        ? segmentIconColourSelected
                        : segmentIconColourNotSelected
                  }}
                  size={20}
                />
                <Text
                  style={{
                    color:
                      currentTab === 1
                        ? segmentIconColourSelected
                        : segmentIconColourNotSelected
                  }}
                >
                  About The App
                </Text>
              </TabHeading>
            }
          >
            <Content>
              <View>
                <Image
                  source={mikeFerry}
                  style={{ width: Dimensions.width, height: 230 }}
                />
              </View>
              {/* <Content padder>
                <ParsedTextFormatted>{aboutData.blurb}</ParsedTextFormatted>
              </Content> */}
              {this.getTextContent(
                aboutData.blurb,
                aboutData.blurbArray || []
              )}
              <View style={{ marginTop: 50, marginBottom: 50, marginLeft: 15 }}>
                <Text style={{ fontSize: 11 }}>
                  {DeviceInfo.getApplicationName()} version{" "}
                  {DeviceInfo.getVersion()}, build {DeviceInfo.getBuildNumber()}{" "}
                  is running in {process.env.NODE_ENV} mode.
                </Text>
              </View>
            </Content>
          </Tab>
        </Tabs>
        <View
          onLayout={() => {
            this.handleOnLayout(Dimensions);
          }}
        />
      </Container>
    );
  }
}

AboutScreen.propTypes = {
  aboutData: PropTypes.object.isRequired
  // loadSettingsNow: PropTypes.func.isRequired
};

export default AboutScreen;
