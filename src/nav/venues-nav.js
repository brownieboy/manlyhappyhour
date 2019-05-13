import { createStackNavigator } from "react-navigation";

import VenuesListScreenConn from "../containers/venues-list-screen-conn.js";
import VenueScreenConn from "../containers/venue-screen-conn.js";
// import VenueScreenNav from "./venue-nav.js";

const VenuesNavigator = createStackNavigator(
  {
    VenuesList: {
      screen: VenuesListScreenConn
    },
    VenueScreen: {
      screen: VenueScreenConn
    }
  },
  {
    initialRouteName: "VenuesList",
    headerMode: "none"
  }
);

export default VenuesNavigator;
