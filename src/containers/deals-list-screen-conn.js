// import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import DealsListScreen from "../components/deals-list-screen.js";
// import { selectVenueDetails } from "../dux/selectors.js";
import {
  // selectFilteredVenuesByDayAndDealType,
  selectDealsGroupedByDay,
  selectDealTypeFilters,
  selectFilteredDealItemsByDayAndDealType
} from "../dux/selectors.js";
import {
  toggleDealTypeFilter
  // getDealTypeFilters
} from "../dux/settingsReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleDealTypeFilter }, dispatch);

const mapStateToProps = state => ({
  // selectFilteredDeals: filterDay => selectFilteredVenuesByDayAndDealType(state, filterDay),
  dealTypeFilters: selectDealTypeFilters(state),
  dealsGroupedByDay: selectDealsGroupedByDay(state),
  filteredDeals: selectFilteredDealItemsByDayAndDealType(state)
});

const DealsListScreenConn = connect(
  mapStateToProps,
  mapDispatchToProps
)(DealsListScreen);

export default DealsListScreenConn;
