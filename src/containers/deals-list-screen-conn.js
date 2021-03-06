// import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import DealsListScreen from "../components/deals-list-screen.js";
// import { selectVenueDetails } from "../dux/selectors.js";
import {
  // selectFilteredVenuesByDayAndDealType,
  selectDealsGroupedByDay,
  selectDealTypeFilters,
  selectFilteredDealItemsGroupedByDay,
  getSortDealItemsTowards
} from "../dux/selectors.js";

import {
  toggleDealTypeFilter,
  setDayOfWeek,
  getDayOfWeek,
  toggleDealItemsTowards
  // getDealTypeFilters
} from "../dux/settingsReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { toggleDealTypeFilter, setDayOfWeek, toggleDealItemsTowards },
    dispatch
  );

const mapStateToProps = state => ({
  // selectFilteredDeals: filterDay => selectFilteredVenuesByDayAndDealType(state, filterDay),
  dealTypeFilters: selectDealTypeFilters(state),
  dealsGroupedByDay: selectDealsGroupedByDay(state),
  // selectFilteredDealItemsGroupedByDay: filterDay => selectFilteredDealItemsGroupedByDay(state, filterDay),
  dealsGroupedByDay: selectFilteredDealItemsGroupedByDay(state), // No longer filter by day on this screen
  dayOfWeek: getDayOfWeek(state),
  dealItemsTowards: getSortDealItemsTowards(state)
});

const DealsListScreenConn = connect(
  mapStateToProps,
  mapDispatchToProps
)(DealsListScreen);

export default DealsListScreenConn;
