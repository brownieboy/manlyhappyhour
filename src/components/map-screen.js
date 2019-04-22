import React, { Component } from "react";
import PropTypes from "prop-types";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
// import getDay from "date-fns/get_day";
import dateFormat from "date-fns/format";
import RNPickerSelect from "react-native-picker-select";

import {
  Body,
  Container,
  // Content,
  Header,
  Left,
  Radio,
  Right,
  Title
} from "native-base";
import appColours from "../styles/appColours.js";
import mapStyles from "../styles/map-styles.js";
import mapIcons from "../constants/map-icons.js";
import { daysPicker } from "../constants/general.js";
import {
  // getDealTextObjArray,
  getDaysLabel
} from "../helper-functions/deal-line-processing.js";

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

class MapFilter extends Component {
  render() {
    const { filterDay, handleDayChange, handleTapMenu, menuOptionExpanded } = this.props;
    // console.log("MapFilter..props");
    // console.log(this.props);
    return (
      // <View
      //   style={{
      //     position: "absolute",
      //     top: 10,
      //     left: "20%",
      //     width: "70%",
      //     backgroundColor: "white",
      //     flexDirection: "row",
      //     padding: 5,
      //     borderRadius: 5,
      //     justifyContent: "center",
      //     alignItems: "center"
      //   }}
      // >
      <View
        onPress={handleTapMenu}
        style={{
          position: "absolute",
          top: 10,
          left: "20%",
          width: "70%",
          height: menuOptionExpanded ? 400 : 50,
          backgroundColor: "white"
        }}
      >
        <RNPickerSelect
          placeholder={placeholder}
          useNativeAndroidPickerStyle={true}
          items={daysPicker}
          value={filterDay}
          onValueChange={value => {
            handleDayChange(value);
          }}
        />
      </View>
    );
  }
}

/*
      <Text>set useNativeAndroidPickerStyle to false</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={sports}
          onValueChange={value => {
            this.setState({
              favSport1: value,
            });
          }}
          style={pickerSelectStyles}
          value={this.state.favSport1}
          useNativeAndroidPickerStyle={false}
          ref={el => {
            this.inputRefs.favSport1 = el;
          }}
        />
*/

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extraData: false,
      dayOfWeek: "all",
      menuOptionExpanded: false
      // dayOfWeek: dateFormat(new Date(), "ddd")
    };
  }

  handleDayChange = dayOfWeek => {
    // console.log("handleDayChange, dayOfWeek");
    // console.log(dayOfWeek);
    this.setState({ dayOfWeek });
  };

  handleTapMenu = () => {
    this.setState({ menuOptionExpanded: !this.state.menuOptionExpanded });
  };

  componentDidMount() {
    if (Platform.OS === "android") {
      setTimeout(() => {
        // console.log("MapScreen..componentDidMount(), calling extra setState()");
        this.setState({ extraData: true });
      }, 100);
    }
  }

  getDealsTextItems = dealsArray => {
    const dealTextItems = dealsArray.map(dealObj => {
      return (
        <Text key={dealObj.id}>
          <Text style={{ fontSize: 11 }}>{getDaysLabel(dealObj.days)} </Text>
          <Text style={{ fontSize: 11 }}>
            {`${dealObj.start}-${dealObj.finish}: `}
          </Text>
          <Text style={{ fontSize: 13 }}>{dealObj.shortDesc}</Text>
        </Text>
      );
    });
    return dealTextItems;
  };

  addMarkers = (venuesList, filterDay) => {
    console.log("addMarkers, filterDay:");
    console.log(filterDay);
    let filteredVenuesList = venuesList;

    if (filterDay !== "all") {
      filteredVenuesList = venuesList.filter(venue => {
        const dealsArray = this.props.selectVenueDeals(venue.id);
        const filteredDealsArray = dealsArray.filter(dealMember =>
          dealMember.days.includes(filterDay)
        );
        return filteredDealsArray.length > 0;
      });
    }

    return filteredVenuesList.map(venue => {
      const dealsArray = this.props.selectVenueDeals(venue.id);
      const dealsTextItems =
        dealsArray.length > 0 ? (
          this.getDealsTextItems(dealsArray)
        ) : (
          <Text>No deals currently listed</Text>
        );
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
          <Image
            style={{
              width: 32,
              height: 32,
              resizeMode: "contain"
              // zIndex: 3
            }}
            source={mapIcons[venue.address.mapIcon]}
          />
          <View
            style={{
              backgroundColor: "white",
              paddingTop: 1,
              paddingBottom: 1,
              paddingLeft: 3,
              paddingRight: 3,
              borderRadius: 4
            }}
          >
            {/* <Text style={{ fontSize: 11 }}>{`${venue.name}${
              filteredDealsArray.length > 0 ? " (X)" : ""
            }`}</Text> */}
            <Text style={{ fontSize: 11 }}>{venue.name}</Text>
          </View>
          <Callout style={styles.plainView}>
            <View>
              <Text style={{ fontWeight: "bold" }}>{venue.name}</Text>
            </View>
            <View>{dealsTextItems}</View>
          </Callout>
        </Marker>
      );
    });
  };

  render() {
    // console.log("MapScreen..render()");
    const { venuesList } = this.props;
    const { dayOfWeek, filterDay, menuOptionExpanded } = this.state;
    // console.log("MapScreen..render(), state");
    // console.log(this.state);
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
        <View style={{ flex: 1 }}>
          <MapView
            initialRegion={{
              latitude: -33.797474,
              longitude: 151.286902,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015
            }}
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            // customMapStyle={Platform.OS === "ios" ? mapStyles : null}
            customMapStyle={mapStyles}
            tracksViewChanges={false}
          >
            {this.addMarkers(venuesList, dayOfWeek)}
          </MapView>
          <MapFilter
            handleDayChange={this.handleDayChange}
            filterDay={filterDay}
            handleTapMenu={this.handleTapMenu}
            menuOptionExpanded={menuOptionExpanded}
            // selectedFilter={selectedFilter}
          />
        </View>
      </Container>
    );
  }
}

MapScreen.propTypes = {
  venuesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectVenueDeals: PropTypes.func.isRequired
};

export default MapScreen;
