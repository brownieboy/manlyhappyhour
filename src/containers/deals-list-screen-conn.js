// import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import DealsListScreen from "../components/deals-list-screen.js";
// import { selectVenueDetails } from "../dux/selectors.js";
import {
  selectVenues,
  selectVenueDealsForVenueId,
  selectFilteredVenuesByDayAndDealType,
  selectDealTypeFilters
} from "../dux/selectors.js";
import {
  toggleDealTypeFilter
  // getDealTypeFilters
} from "../dux/settingsReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleDealTypeFilter }, dispatch);

const mapStateToProps = state => ({
  // venueDetails: selectVenueDetails(state, props)
  venuesList: selectVenues(state),
  selectVenueDeals: id => selectVenueDealsForVenueId(state, id),
  selectFilteredDeals: filterDay => selectFilteredVenuesByDayAndDealType(state, filterDay),
  dealTypeFilters: selectDealTypeFilters(state)
});

const DealsListScreenConn = connect(
  mapStateToProps,
  mapDispatchToProps
)(DealsListScreen);

export default DealsListScreenConn;
