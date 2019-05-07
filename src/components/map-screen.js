import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  Image,
  LayoutAnimation,
  NativeModules,
  Platform,
  Switch,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// import getDay from "date-fns/get_day";
// import dateFormat from "date-fns/format";
import RNPickerSelect from "react-native-picker-select";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IcoMoonIcon } from "./custom-vector-icons.js";

import {
  Badge,
  Body,
  Button,
  Container,
  // Content,
  Header,
  Icon,
  Left,
  ListItem,
  // Radio,
  Right,
  Title
} from "native-base";

import appColours, { listStyles } from "../styles/appColours.js";
import mapStyles from "../styles/map-styles.js";
import mapIcons from "../constants/map-icons.js";
import DealFilterIcons from "./dealfiltericons.js";
import { daysPicker } from "../constants/general.js";
import { getDayObjForShortDay } from "../constants/general.js";

import {
  // getDealTextObjArray,
  getDaysLabel
} from "../helper-functions/deal-line-processing.js";

import { getTimeText } from "../helper-functions/dateTime.js";
import { List } from "react-native-paper";

const { UIManager } = NativeModules;
let iconPlatformPrefix = "ios-";
if (Platform.OS === "android") {
  iconPlatformPrefix = "md-";
}

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
  plainView: {
    width: 200
  }
});

const placeholder = {
  label: "Select a day...",
  value: null,
  color: "#9EA0A4"
};

export class MapFilter extends Component {
  // handlePickerLinePress = () => {
  //   this._pickerSelect.togglePicker();
  // };
  render() {
    const {
      filterDay,
      handleDayChange,
      handleTapMenu,
      menuOptionExpanded,
      dealTypeFilters,
      toggleDealTypeFilter,
      topPos = 10
    } = this.props;

    return (
      <Fragment>
        {/* <View
          style={{
            position: "absolute",
            top: 10,
            left: "5%",
            right: "5%",
            height: 20,
            padding: 3,
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{ fontSize: 11 }}
          >{`${summaryText}: ${filterTypesSummary}`}</Text>
        </View> */}
        <View
          style={{
            position: "absolute",
            top: topPos,
            left: "5%",
            right: "5%",
            padding: menuOptionExpanded ? 3 : 0,
            height: menuOptionExpanded ? 330 : 0,
            backgroundColor: "white",
            borderWidth: menuOptionExpanded ? 1 : 0,
            borderRadius: menuOptionExpanded ? 10 : 0
          }}
        >
          {menuOptionExpanded ? (
            <View>
              <ListItem itemDivider style={{ justifyContent: "space-between" }}>
                <Text>Showing deals for day:</Text>
                <Button
                  small
                  primary
                  onPress={handleTapMenu}
                  style={{
                    alignItems: "center",
                    paddingLeft: 10,
                    paddingRight: 10
                  }}
                >
                  <Text style={{ color: "white" }}>Done</Text>
                </Button>
                {/* <TouchableOpacity onPress={handleTapMenu}>
                  <Ionicons
                    name={`${iconPlatformPrefix}close-circle`}
                    size={25}
                  />
                </TouchableOpacity> */}
              </ListItem>
              <ListItem
                icon
                // onPress={() => {
                //   this._pickerSelect.togglePicker();
                // }}
              >
                <Left>
                  <Button style={{ backgroundColor: "#FF9501" }}>
                    <FontAwesome5Icons
                      active
                      name="calendar-day"
                      style={{ color: "white" }}
                    />
                  </Button>
                </Left>
                <Body>
                  <RNPickerSelect
                    placeholder={placeholder}
                    useNativeAndroidPickerStyle={false}
                    items={daysPicker}
                    value={filterDay}
                    // ref={pickerSelect => (this._pickerSelect = pickerSelect)}
                    onValueChange={value => {
                      handleDayChange(value);
                    }}
                    style={{ borderWidth: 1, borderColor: "red", width: 70 }}
                  />
                </Body>
                <Right />
              </ListItem>
              <ListItem itemDivider>
                <Text>Where deals include:</Text>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button disabled={!dealTypeFilters.includes("food")}>
                    <MaterialCommunityIcons
                      name="silverware-fork-knife"
                      style={{ color: "white", fontSize: 15 }}
                    />
                  </Button>
                </Left>
                <Body>
                  <Text>Food</Text>
                </Body>
                <Right>
                  <Switch
                    value={dealTypeFilters.includes("food")}
                    onChange={() => {
                      toggleDealTypeFilter("food");
                    }}
                    trackColor="#50B948"
                  />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button disabled={!dealTypeFilters.includes("beer")}>
                    <IcoMoonIcon
                      name="beer-straight-glass"
                      style={{ color: "white", fontSize: 15 }}
                    />
                  </Button>
                </Left>
                <Body>
                  <Text>Beer</Text>
                </Body>
                <Right>
                  <Switch
                    value={dealTypeFilters.includes("beer")}
                    onChange={() => {
                      toggleDealTypeFilter("beer");
                    }}
                    trackColor="#50B948"
                  />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button disabled={!dealTypeFilters.includes("wine")}>
                    <Ionicons
                      name={`${iconPlatformPrefix}wine`}
                      style={{ color: "white", fontSize: 20 }}
                    />
                  </Button>
                </Left>
                <Body>
                  <Text>Wine</Text>
                </Body>
                <Right>
                  <Switch
                    value={dealTypeFilters.includes("wine")}
                    onChange={() => {
                      toggleDealTypeFilter("wine");
                    }}
                    trackColor="#50B948"
                  />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button disabled={!dealTypeFilters.includes("cocktails")}>
                    <FontAwesome5Icons
                      name="cocktail"
                      style={{ color: "white", fontSize: 15 }}
                    />
                  </Button>
                </Left>
                <Body>
                  <Text>Cocktail</Text>
                </Body>
                <Right>
                  <Switch
                    value={dealTypeFilters.includes("cocktails")}
                    onChange={() => {
                      toggleDealTypeFilter("cocktails");
                    }}
                    trackColor="#50B948"
                  />
                </Right>
              </ListItem>
            </View>
          ) : null}
        </View>
      </Fragment>
    );
  }
}

/*
class CalloutWrapper extends Component {
  render() {
    const { venue, dealsTextItems, navigate } = this.props;
    if (Platform.OS === "android") {
      return (
        <Callout
          onPress={() => {
            navigate("VenueScreen", {
              id: venue.id,
              parentList: "map"
            });
          }}
          style={styles.plainView}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontWeight: "bold", flex: 1 }}>{venue.name}</Text>
            <Icon name="arrow-forward" style={{ fontSize: 18 }} />
          </View>
          <View>{dealsTextItems}</View>
        </Callout>
      );
    }
    // iOS
    return (
      <Callout style={styles.plainView}>
        <TouchableOpacity
          onPress={() => {
            navigate("VenueScreen", {
              id: venue.id,
              parentList: "map"
            });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontWeight: "bold", flex: 1 }}>{venue.name}</Text>
            <Icon name="arrow-forward" style={{ fontSize: 18 }} />
          </View>
          <View>{dealsTextItems}</View>
        </TouchableOpacity>
      </Callout>
    );
  }
}
*/

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extraData: false,
      menuOptionExpanded: false
      // dayOfWeek: dateFormat(new Date(), "ddd")
    };
  }

  handleDayChange = dayOfWeek => {
    // console.log("handleDayChange, dayOfWeek");
    // console.log(dayOfWeek);
    // this.setState({ dayOfWeek });
    if (dayOfWeek) {
      // If the user picks the RNPickerSelect's placeholder text, then we'll
      // have undefined passed here and the app will crash
      this.props.setDayOfWeek(dayOfWeek);
    }
  };

  handleTapMenu = () => {
    // console.log("handleTapMenu");
    // LayoutAnimation.spring();
    LayoutAnimation.easeInEaseOut();
    this.setState({ menuOptionExpanded: !this.state.menuOptionExpanded });
  };

  componentDidMount() {
    if (Platform.OS === "android") {
      setTimeout(() => {
        // console.log("MapScreen..componentDidMount(), calling extra setState()");
        // check we still need this
        LayoutAnimation.easeInEaseOut();
        this.setState({ extraData: true });
      }, 50);
    }
  }

  getDealsTextItems = dealsArray => {
    let x = -1;
    const dealTextItems = dealsArray.map(dealObj => {
      x++;
      return (
        <View
          key={dealObj.id}
          style={{
            margin: 0,
            flexDirection: "column",
            paddingTop: 3,
            paddingBottom: 3,
            borderBottomWidth: 1,
            borderColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
              x % 2 === 0 ? "transparent" : listStyles.alternateRowColour
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 11 }}>
              {dealObj.days ? getDaysLabel(dealObj.days) : "Day?"}{" "}
            </Text>
            {dealObj.start && dealObj.finish && (
              <Text style={{ fontSize: 11 }}>
                {`${getTimeText(dealObj.start)}-${getTimeText(
                  dealObj.finish
                )}: `}
              </Text>
            )}
          </View>
          <Text style={{ fontSize: 12 }}>{dealObj.desc}</Text>
        </View>
      );
    });
    return dealTextItems;
  };
  // listStyles.alternateRowColour

  addMarkers = () => {
    const {
      selectFilteredDeals,
      // selectVenueDeals,
      dayOfWeek,
      selectFilteredVenueDeals,
      venuesList
    } = this.props;
    const filterDay = dayOfWeek;
    // let filteredVenuesList = venuesList;
    // console.log("addMarkers, filterDay:");
    // console.log(filterDay);
    // const filteredVenuesList = selectFilteredDeals(filterDay);
    // console.log("addMarkers, filteredVenuesList:");
    // console.log(filteredVenuesList);

    // return filteredVenuesList.map(venue => {
    return venuesList.map(venue => {
      // const dealsArray = selectVenueDeals(venue.id);
      const dealsArray = selectFilteredVenueDeals(venue.id);
      // console.log("dealsArray then dealsArray2:");
      // console.log(dealsArray);
      // console.log(dealsArray2);
      const dealsTextItems =
        dealsArray.length > 0 ? (
          this.getDealsTextItems(dealsArray)
        ) : (
          <Text>No deals listed for current filters</Text>
        );
      if (venue.address && venue.address.lat && venue.address.long) {
        return (
          <Marker
            key={venue.id}
            coordinate={{
              latitude: venue.address.lat,
              longitude: venue.address.long
            }}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                borderRadius: 50,
                // paddingTop: 8,
                // paddingBottom: 8,
                // paddingLeft: 5,
                // paddingRight: 5,
                padding: 6,
                backgroundColor:
                  dealsArray.length > 0 ? "#FFFFCC" : "lightgray",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 500
              }}
            >
              {dealsArray.length > 0 && (
                <Badge
                  primary
                  style={{
                    position: "absolute",
                    width: 18,
                    height: 18,
                    top: -3,
                    left: -3,
                    zIndex: 1000
                  }}
                >
                  <Text style={{ fontSize: 11, color: "white" }}>
                    {dealsArray.length}
                  </Text>
                </Badge>
              )}
              <Image
                style={{
                  width: 32,
                  height: 32,
                  resizeMode: "contain"
                  // zIndex: 3
                }}
                source={
                  mapIcons[
                    dealsArray.length > 0
                      ? venue.address.mapIcon
                      : `${venue.address.mapIcon}Mono`
                  ]
                }
              />
            </View>
            <View
              style={{
                backgroundColor: "white",
                paddingTop: 1,
                paddingBottom: 1,
                paddingLeft: 3,
                paddingRight: 3,
                borderRadius: 4,
                marginTop: -6
              }}
            >
              {/* <Text style={{ fontSize: 11 }}>{`${venue.name}${
              filteredDealsArray.length > 0 ? " (X)" : ""
            }`}</Text> */}
              <Text style={{ fontSize: 11 }}>{venue.name}</Text>
            </View>
            <Callout
              onPress={() => {
                this.props.navigation.navigate("VenueScreen", {
                  id: venue.id,
                  parentList: "map"
                });
              }}
              style={styles.plainView}
            >
              {/* <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("VenueScreen", {
                    id: venue.id,
                    parentList: "map"
                  });
                }}
              > */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  {venue.name}
                </Text>
                <Icon name="arrow-forward" style={{ fontSize: 18 }} />
              </View>
              {/* </TouchableOpacity> */}
              <View>{dealsTextItems}</View>
            </Callout>
          </Marker>
        );
      } else {
        return null;
      }
    });
  };

  render() {
    // console.log("MapScreen..render(), props");
    // console.log(this.props);
    const {
      venuesList,
      dealTypeFilters,
      toggleDealTypeFilter,
      dayOfWeek
      // selectFilteredDeals
    } = this.props;
    const { menuOptionExpanded } = this.state;
    // console.log("MapScreen..render(), state");
    // console.log(this.state);
    // const summaryText =
    //   dayOfWeek === "all"
    //     ? "Showing deals for all days"
    //     : `Showing deals for ${dayOfWeek}`;

    let filterTypesSummary = "all types";
    if (dealTypeFilters.length < 4) {
      // filterTypesSummary = dealTypeFilters.join(", ");
      filterTypesSummary = [
        dealTypeFilters.slice(0, -1).join(", "),
        dealTypeFilters.slice(-1)[0]
      ].join(dealTypeFilters.length < 2 ? "" : " and ");
    }

    return (
      <Container>
        <Header
          style={{
            backgroundColor: appColours.panelBackgroundColor
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
        <View style={{ flex: 1 }}>
          <MapView
            initialRegion={{
              latitude: -33.797474,
              longitude: 151.286902,
              // latitudeDelta: 0.015,
              // longitudeDelta: 0.015,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008
            }}
            style={{ flex: 1 }}
            // provider={PROVIDER_GOOGLE}
            // customMapStyle={Platform.OS === "ios" ? mapStyles : null}
            customMapStyle={mapStyles}
            tracksViewChanges={false}
            // mapType="mutedStandard"
            showsUserLocation={true}
          >
            {this.addMarkers(venuesList, dayOfWeek)}
          </MapView>
          <MapFilter
            handleDayChange={this.handleDayChange}
            filterDay={dayOfWeek}
            handleTapMenu={this.handleTapMenu}
            menuOptionExpanded={menuOptionExpanded}
            dealTypeFilters={dealTypeFilters}
            toggleDealTypeFilter={toggleDealTypeFilter}
            // selectedFilter={selectedFilter}
          />
          {/* {!menuOptionExpanded && (
            <View
              style={{
                position: "absolute",
                top: 10,
                left: "5%",
                right: "5%",
                height: 20,
                padding: 3,
                backgroundColor: "white",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{ fontSize: 11 }}
              >{`${summaryText}: ${filterTypesSummary}`}</Text>
            </View>
          )} */}
        </View>
      </Container>
    );
  }
}

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  venuesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectVenueDeals: PropTypes.func.isRequired,
  selectFilteredVenueDeals: PropTypes.func.isRequired,
  dealTypeFilters: PropTypes.array.isRequired,
  toggleDealTypeFilter: PropTypes.func.isRequired,
  dayOfWeek: PropTypes.string.isRequired,
  setDayOfWeek: PropTypes.func.isRequired
};

MapFilter.propTypes = {
  filterDay: PropTypes.string.isRequired,
  handleDayChange: PropTypes.func.isRequired,
  handleTapMenu: PropTypes.func.isRequired,
  menuOptionExpanded: PropTypes.bool.isRequired,
  dealTypeFilters: PropTypes.array.isRequired,
  toggleDealTypeFilter: PropTypes.func.isRequired,
  topPos: PropTypes.number
};

export default MapScreen;
