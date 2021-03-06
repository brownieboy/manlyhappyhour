// import React, { Component } from "react";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import VenueScreen from "../components/venue-screen.js";
import { selectVenueDetails, selectVenueDeals } from "../dux/selectors.js";

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = (state, props) => ({
  venueDetails: selectVenueDetails(state, props),
  venueDeals: selectVenueDeals(state, props)
});

const VenueScreenConn = connect(
  mapStateToProps,
  mapDispatchToProps
)(VenueScreen);

export default VenueScreenConn;
