// Action type constants
export const LOAD_VENUES_NOW = "LOAD_VENUES_NOW"; // Imperative, hence "NOW"!
const FETCH_VENUES_REQUEST = "FETCH_VENUES_REQUEST";
const FETCH_VENUES_SUCCESS = "FETCH_VENUES_SUCCESS";
const FETCH_VENUES_FAILURE = "FETCH_VENUES_FAILURE";

// Reducer
const venuesReducer = (
  state = { fetchStatus: "", fetchError: "", venuesList: [] },
  action
) => {
  switch (action.type) {
    case FETCH_VENUES_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_VENUES_SUCCESS:
      //   console.log("venuesReducer FETCH_VENUES_SUCCESS");
      return {
        ...state,
        fetchStatus: "",
        venuesList: action.payload
      };
    case FETCH_VENUES_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    default:
      return state;
  }
};

// getters, don't use reselect, so are run every time.  Beware of performance.


// Actions
export const loadVenuesNow = () => ({ type: LOAD_VENUES_NOW });
// export const fetchVenuesSucceeded = () => ({ type: FETCH_VENUES_REQUEST });

export const setFetchVenuesRequest = () => ({
  type: FETCH_VENUES_REQUEST
});
export const setFetchVenuesSucceeded = venuesList => ({
  type: FETCH_VENUES_SUCCESS,
  payload: venuesList
});
export const setFetchVenuesFailed = errorMessage => ({
  type: FETCH_VENUES_FAILURE,
  payload: errorMessage
});

export default venuesReducer;
