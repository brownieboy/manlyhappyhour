import { combineReducers } from "redux";

import venuesReducer from "./venuesReducer.js";

const mainReducer = combineReducers({
  venuesState: venuesReducer
});

export default mainReducer;
