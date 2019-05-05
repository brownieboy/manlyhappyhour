import { createSelector } from "reselect";

import { getCommonStateObject } from "./selectors.js";

// Action type constants
const LOAD_ABOUT_NOW = "LOAD_ABOUT_NOW"; // Imperative, hence "NOW"!
const FETCH_ABOUT_REQUEST = "FETCH_ABOUT_REQUEST";
const FETCH_ABOUT_SUCCESS = "FETCH_ABOUT_SUCCESS";
const FETCH_ABOUT_FAILURE = "FETCH_ABOUT_FAILURE";

// helstonburyFBID = "382432781776899",
// helstonburyMerchandiseFBID = "1555153094504856",

const defaultState = {
  fetchStatus: "",
  fetchError: "",
  saveError: {},
  aboutInfo: {
    blurb: "",
    helpBlurb: ""
  }
};

// Reducer
const aboutReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_ABOUT_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_ABOUT_SUCCESS:
      return {
        ...state,
        fetchStatus: "",
        aboutInfo: action.payload
      };
    case FETCH_ABOUT_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    default:
      return state;
  }``
};

const getLocalState = state => state.aboutState;

export const aboutSelector = createSelector(
  [getLocalState],
  localState => {
    const commonStateObject = getCommonStateObject(localState);
    const returnObj = { ...commonStateObject, ...localState.aboutInfo };
    // console.log("aboutSelector, returnObj");
    // console.log(returnObj);
    return returnObj;
  }
);


export const loadAboutNow = () => ({ type: LOAD_ABOUT_NOW });
// export const fetchABOUT_Succeeded = () => ({ type: FETCH_ABOUT_REQUEST });

const setFetchAboutRequest = () => ({
  type: FETCH_ABOUT_REQUEST
});
export const setFetchAboutSucceeded = about => ({
  type: FETCH_ABOUT_SUCCESS,
  payload: about
});
const setFetchAboutFailed = errorMessage => ({
  type: FETCH_ABOUT_FAILURE,
  payload: errorMessage
});

export const aboutDuxActions = {
  setFetchAboutFailed,
  setFetchAboutRequest,
  setFetchAboutSucceeded
};

export default aboutReducer;
