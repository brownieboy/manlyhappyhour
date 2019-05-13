import { createStackNavigator } from "react-navigation";

import VenueScreenConn from "../containers/venue-screen-conn.js";

const VenueNavigator = createStackNavigator(
  {
    VenueScreen: {
      screen: VenueScreenConn
    },
    VenueScreenLower: {
      screen: VenueScreenConn
    }
  },
  {
    initialRouteName: "VenueScreen",
    headerMode: "none"
  }
);

export default VenueNavigator;
