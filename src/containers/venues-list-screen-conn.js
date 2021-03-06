import { connect } from "react-redux";

// Components
import VenuesListScreen from "../components/venues-list-screen.js";

// Dux stuff
import { selectVenues } from "../dux/selectors.js";

const mapDispatchToProps = dispatch => ({});
// bindActionCreators({ loadVenuesNow }, dispatch);

const mapStateToProps = state => ({
  venuesList: selectVenues(state)
});

const VenuesListScreenConn = connect(
  mapStateToProps,
  mapDispatchToProps
)(VenuesListScreen);

export default VenuesListScreenConn;
