import { combineReducers } from "redux";

import venuesReducer from "./venuesReducer.js";
import dealsReducer from "./dealsReducer.js";
import settingsReducer from "./settingsReducer";

const mainReducer = combineReducers({
  venuesState: venuesReducer,
  dealsState: dealsReducer,
  settingsState: settingsReducer
});

export default mainReducer;
