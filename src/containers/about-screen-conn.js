// import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import AboutScreen from "../components/about-screen.js";

// Dux stuff
import { aboutSelector } from "../dux/aboutReducer.js";

const mapDispatchToProps = dispatch => ({});
// bindActionCreators({ loadVenuesNow }, dispatch);

const mapStateToProps = state => ({
  aboutData: aboutSelector(state)
});

const AboutScreenConn = connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutScreen);

export default AboutScreenConn;
