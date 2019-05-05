import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import HomeScreen from "../components/home-screen.js";

// Dux stuff
import {
  loadVenuesNow
  // selectVenuesAlphabeticalWithFavourites
} from "../dux/venuesReducer.js";
// import { selectVenues } from "../dux/selectors.js";
// import { loadSettingsNow } from "../dux/settingsReducer.js";
import { homeSelector } from "../dux/homeReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadVenuesNow }, dispatch);

const mapStateToProps = state => ({
  homeData: homeSelector(state)
});

const HomeScreenConn = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

export default HomeScreenConn;
