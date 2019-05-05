import { combineReducers } from "redux";

import venuesReducer from "./venuesReducer.js";
import dealsReducer from "./dealsReducer.js";
import settingsReducer from "./settingsReducer";
import homeReducer from "./homeReducer.js";
import aboutReducer from "./aboutReducer.js";

const mainReducer = combineReducers({
  homeState: homeReducer,
  venuesState: venuesReducer,
  dealsState: dealsReducer,
  settingsState: settingsReducer,
  aboutState: aboutReducer
});

export default mainReducer;
