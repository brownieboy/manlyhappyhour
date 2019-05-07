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
// import EvilIcons from "react-native-vector-icons/EvilIcons";
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

import { getTimeText } from "../helper-functions/dateTime.js";
import { handleOnLayout } from "../helper-functions/lifecycleextras.js";
import { MapFilter } from "./map-screen.js";
import DealFilterIcons from "./dealfiltericons.js";
import appColours, { listStyles } from "../styles/appColours.js";
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
    if (dayOfWeek) {
      // If the user picks the RNPickerSelect's placeholder text, then we'll
      // have undefined passed here and the app will crash
      this.props.setDayOfWeek(dayOfWeek);
    }
    // console.log(dayOfWeek);
    // this.setState({ dayOfWeek });
  };

  render() {
    const {
      // dealsGroupedByDay,
      navigation,
      dayOfWeek,
      dealTypeFilters,
      selectFilteredDealItemsGroupedByDay,
      toggleDealTypeFilter
    } = this.props;
    const { menuOptionExpanded, orientation } = this.state;

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
            <Left style={{ flex: 5 }}>
              <Title
                style={{
                  color: appColours.panelTextColor,
                  fontSize: appColours.panelTopFontSize
                }}
              >
                Deals for{" "}
                {dayOfWeek === "all"
                  ? "All Days"
                  : getDayObjForShortDay(dayOfWeek).name}
              </Title>
            </Left>
            <Body style={{ flex: 3 }}>
              <TouchableOpacity
                onPress={this.handleTapMenu}
                style={{ flexDirection: "row" }}
              >
                <DealFilterIcons
                  iconTypes={dealTypeFilters}
                  iconStyle={{
                    color: appColours.panelTextColor,
                    marginRight: 4,
                    fontSize: 18
                  }}
                />
              </TouchableOpacity>
            </Body>
            <Right style={{ flex: 1 }}>
              <TouchableOpacity onPress={this.handleTapMenu}>
                <MaterialCommunityIcons
                  name="filter"
                  size={25}
                  style={{ color: appColours.panelTextColor }}
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
                    backgroundColor: appColours.panelBackgroundColor,
                    paddingLeft: 10
                  }}
                  itemDivider
                >
                  <Text
                    // style={{ color: panelStyles.color, fontWeight: "bold" }}
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      flex: 1,
                      color: appColours.panelTextColor
                    }}
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
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  backgroundColor:
                    index % 2 === 0
                      ? "transparent"
                      : listStyles.alternateRowColour
                }}
              >
                <Left style={{ flex: 3 }}>
                  <Text style={{ fontSize: 12 }}>
                    {`${getTimeText(item.start)}-${
                      orientation !== "landscape" ? "\n" : ""
                    }${getTimeText(item.finish)}:`}
                  </Text>
                </Left>
                <Body style={{ flex: 10 }}>
                  <Text style={{ fontSize: 13 }}>
                    {/* {orientation === "landscape" ? item.desc : item.desc} */}
                    {item.desc}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        marginRight: 10,
                        color: appColours.venueListFontColor
                      }}
                    >
                      {item.venue.name}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <DealFilterIcons
                        iconTypes={item.types}
                        iconStyle={{
                          marginRight: 4,
                          fontSize: 20
                        }}
                      />
                    </View>
                  </View>
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
  dayOfWeek: PropTypes.string.isRequired,
  setDayOfWeek: PropTypes.func.isRequired,
  toggleDealTypeFilter: PropTypes.func.isRequired
};
