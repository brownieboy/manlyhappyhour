import { combineReducers } from "redux";

import venuesReducer from "./venuesReducer.js";
import dealsReducer from "./dealsReducer.js";

const mainReducer = combineReducers({
  venuesState: venuesReducer,
  dealsState: dealsReducer
});

export default mainReducer;
