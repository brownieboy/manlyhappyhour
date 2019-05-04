import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  LayoutAnimation,
  NativeModules,
  SectionList,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Container,
  Header,
  Icon,
  Title,
  // Content,
  ListItem,
  Left,
  Right,
  Body
  // Thumbnail
} from "native-base";

import panelStyles from "../styles/appColours";
import { getTimeText } from "../helper-functions/dateTime.js";
import { handleOnLayout } from "../helper-functions/lifecycleextras.js";
import { MapFilter } from "./map-screen.js";
import DealFilterIcons from "./dealfiltericons.js";
import appColours from "../styles/appColours.js";
import { getDayObjForShortDay } from "../constants/general.js";
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class DealsListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: Dimensions.get("window"),
      fullScreenPhotoCard: false,
      internalStateChanged: false,
      orientation: "unknown",
      dayOfWeek: "all",
      menuOptionExpanded: false
    };
    this.handleOnLayout = handleOnLayout.bind(this);
  }

  handleTapMenu = () => {
    // console.log("handleTapMenu");
    // LayoutAnimation.spring();
    LayoutAnimation.easeInEaseOut();
    this.setState({ menuOptionExpanded: !this.state.menuOptionExpanded });
  };

  handleDayChange = dayOfWeek => {
    // console.log("handleDayChange, dayOfWeek");
    // console.log(dayOfWeek);
    this.setState({ dayOfWeek });
  };

  render() {
    const {
      // dealsGroupedByDay,
      navigation,
      dealTypeFilters,
      selectFilteredDealItemsGroupedByDay,
      toggleDealTypeFilter
    } = this.props;
    const { dayOfWeek, menuOptionExpanded, orientation } = this.state;

    const dealsGroupedByDay = selectFilteredDealItemsGroupedByDay(dayOfWeek);
    // console.log("DealsListScreen, dealsGroupedByDay:");
    // console.log(dealsGroupedByDay);

    return (
      <Container>
        {orientation !== "landscape" && (
          <Header
            style={{
              backgroundColor: appColours.panelBackgroundColor,
              color: appColours.panelTextColor
            }}
          >
            <Left style={{flex: 5}}>
              <Title
                style={{
                  color: appColours.panelTextColor
                }}
              >
                Deals for{" "}
                {dayOfWeek === "all"
                  ? "All Days"
                  : getDayObjForShortDay(dayOfWeek).name}
              </Title>
            </Left>
            <Body style={{ flexDirection: "row", flex: 3 }}>
              <DealFilterIcons
                filterTypes={dealTypeFilters}
                iconStyle={{ color: "white", marginRight: 4, fontSize: 18 }}
              />
            </Body>
            <Right style={{flex: 1}}>
              <TouchableOpacity onPress={this.handleTapMenu}>
                <MaterialCommunityIcons
                  name="filter"
                  size={25}
                  style={{ color: "white" }}
                />
              </TouchableOpacity>
            </Right>
          </Header>
        )}
        <View style={{ flex: 1 }}>
          <SectionList
            sections={dealsGroupedByDay.map(dealsByDayObj => ({
              title: dealsByDayObj.key,
              data: dealsByDayObj.values
            }))}
            renderSectionHeader={({ section }) => {
              return (
                <ListItem
                  style={{
                    // backgroundColor: panelStyles.backgroundColor,
                    paddingLeft: 10
                  }}
                  itemDivider
                >
                  <Text
                    // style={{ color: panelStyles.color, fontWeight: "bold" }}
                    style={{ fontWeight: "bold" }}
                  >
                    {section.title}
                  </Text>
                </ListItem>
              );
            }}
            renderItem={({ item, index }) => (
              <ListItem
                onPress={() =>
                  navigation.navigate("VenueScreen", {
                    id: item.venueId,
                    parentList: "deals"
                  })
                }
              >
                <Left style={{ flex: 3 }}>
                  <Text style={{ fontSize: 12 }}>
                    {`${getTimeText(item.start)}${
                      orientation !== "landscape" ? "\n" : ""
                    }-${getTimeText(item.finish)}:`}
                  </Text>
                </Left>
                <Body style={{ flex: 10 }}>
                  <Text style={{ fontSize: 15 }}>{item.venue.name}</Text>
                  <Text style={{ fontSize: 13, color: "grey" }}>
                    {item.shortDesc}
                  </Text>
                </Body>
                <Right style={{ flex: 1 }}>
                  <Icon
                    name="arrow-forward"
                    style={{ fontSize: 20, color: "lightgrey" }}
                  />
                </Right>
              </ListItem>
            )}
            stickySectionHeadersEnabled={true}
          />
        </View>
        <MapFilter
          handleDayChange={this.handleDayChange}
          handleTapMenu={this.handleTapMenu}
          filterDay={dayOfWeek}
          menuOptionExpanded={menuOptionExpanded}
          dealTypeFilters={dealTypeFilters}
          toggleDealTypeFilter={toggleDealTypeFilter}
          topPos={130}
        />
        <View
          onLayout={() => {
            this.handleOnLayout(Dimensions);
          }}
        />
      </Container>
    );
  }
}

DealsListScreen.propTypes = {
  dealsGroupedByDay: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.object.isRequired,
  dealTypeFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectFilteredDealItemsGroupedByDay: PropTypes.func.isRequired,
  toggleDealTypeFilter: PropTypes.func.isRequired
};
