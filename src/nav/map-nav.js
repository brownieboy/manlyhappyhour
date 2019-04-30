import { createStackNavigator } from "react-navigation";

import MapScreenConn from "../containers/map-screen-conn.js";
import VenueScreenConn from "../containers/venue-screen-conn.js";

const MapNavigator = createStackNavigator(
  {
    MapScreen: {
      screen: MapScreenConn
    },
    VenueScreen: {
      screen: VenueScreenConn
    }
  },
  {
    initialRouteName: "MapScreen",
    headerMode: "none"
  }
);

export default MapNavigator;
