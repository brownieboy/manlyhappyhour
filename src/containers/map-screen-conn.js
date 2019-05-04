// import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import MapScreen from "../components/map-screen.js";
// import { selectVenueDetails } from "../dux/selectors.js";
import {
  selectVenues,
  selectVenueDealsForVenueId,
  selectFilteredVenuesByDayAndDealType,
  selectDealTypeFilters
} from "../dux/selectors.js";
import {
  toggleDealTypeFilter, setDayOfWeek, getDayOfWeek
  // getDealTypeFilters
} from "../dux/settingsReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleDealTypeFilter, setDayOfWeek }, dispatch);

const mapStateToProps = state => ({
  // venueDetails: selectVenueDetails(state, props)
  venuesList: selectVenues(state),
  selectVenueDeals: id => selectVenueDealsForVenueId(state, id),
  selectFilteredDeals: filterDay => selectFilteredVenuesByDayAndDealType(state, filterDay),
  dealTypeFilters: selectDealTypeFilters(state),
  dayOfWeek: getDayOfWeek(state)
});

const MapScreenConn = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);

export default MapScreenConn;
