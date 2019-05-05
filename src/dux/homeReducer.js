import { createSelector } from "reselect";
import { getCommonStateObject } from "./selectors.js";

// Action type constants
const LOAD_HOME_NOW = "LOAD_HOME_NOW"; // Imperative, hence "NOW"!
const FETCH_HOME_REQUEST = "FETCH_HOME_REQUEST";
const FETCH_HOME_SUCCESS = "FETCH_HOME_SUCCESS";
const FETCH_HOME_FAILURE = "FETCH_HOME_FAILURE";
export const CLEAR_ALL_LOCAL_DATA = "CLEAR_ALL_LOCAL_DATA";

// Reducer
const homeReducer = (
  state = { fetchStatus: "", fetchError: "", blurb: "", id: "", shortDesc: "" },
  action
) => {
  switch (action.type) {
    case FETCH_HOME_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_HOME_SUCCESS:
      return {
        ...state,
        fetchStatus: "",
        ...action.payload
      };
    case FETCH_HOME_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    default:
      return state;
  }
};

const getLocalState = state => state.homeState;

// export const homeInfoSelector = createSelector(
//   [getLocalState],
//   localState => localState.homeInfo
// );

export const homeSelector = createSelector(
  [getLocalState],
  localState => {
    const commonStateObject = getCommonStateObject(localState);
    const returnObj = { ...commonStateObject, ...localState };
    // console.log("homeSelector, returnObj");
    // console.log(returnObj);
    return returnObj;
  }
);

export const loadHomeNow = () => ({ type: LOAD_HOME_NOW });
// export const fetchHOMESucceeded = () => ({ type: FETCH_HOME_REQUEST });

export const setFetchHomeRequest = () => ({
  type: FETCH_HOME_REQUEST
});

export const setFetchHomeSucceeded = homePage => ({
  type: FETCH_HOME_SUCCESS,
  payload: homePage  // Used to be string, now an object
});

export const setFetchHomeFailed = errorMessage => ({
  type: FETCH_HOME_FAILURE,
  payload: errorMessage
});

export const clearAllLocalData = () => ({
  type: CLEAR_ALL_LOCAL_DATA
});

export const homeDuxActions = {
  setFetchHomeFailed,
  setFetchHomeRequest,
  setFetchHomeSucceeded
};

export default homeReducer;
