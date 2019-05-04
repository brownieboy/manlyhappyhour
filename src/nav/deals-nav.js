import { createStackNavigator } from "react-navigation";

import DealsListScreenConn from "../containers/deals-list-screen-conn.js";
import VenueScreenConn from "../containers/venue-screen-conn.js";

const DealsNavigator = createStackNavigator(
  {
    DealsList: {
      screen: DealsListScreenConn
    },
    VenueScreen: {
      screen: VenueScreenConn
    }
  },
  {
    initialRouteName: "DealsList",
    headerMode: "none"
  }
);

export default DealsNavigator;
