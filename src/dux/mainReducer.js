import { combineReducers } from "redux";

import venuesReducer from "./venuesReducer.js";
import dealsReducer from "./dealsReducer.js";
import settingsReducer from "./settingsReducer";
import homeReducer from "./homeReducer.js";

const mainReducer = combineReducers({
  homeState: homeReducer,
  venuesState: venuesReducer,
  dealsState: dealsReducer,
  settingsState: settingsReducer
});

export default mainReducer;
