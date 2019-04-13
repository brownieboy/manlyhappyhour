// import React, { Component } from "react";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import MapScreen from "../components/map-screen.js";
// import { selectVenueDetails } from "../dux/selectors.js";
import { selectVenues, selectVenueDealsForVenueId } from "../dux/selectors.js";

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  // venueDetails: selectVenueDetails(state, props)
  venuesList: selectVenues(state),
  selectVenueDeals: id => selectVenueDealsForVenueId(state, id)
});

const MapScreenConn = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);

export default MapScreenConn;
