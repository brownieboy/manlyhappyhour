// Action type constants
const FETCH_DEALS_REQUEST = "FETCH_DEALS_REQUEST";
const FETCH_DEALS_SUCCESS = "FETCH_DEALS_SUCCESS";
const FETCH_DEALS_FAILURE = "FETCH_DEALS_FAILURE";

// Reducer
const dealsReducer = (
  state = { fetchStatus: "", fetchError: "", dealsList: [] },
  action
) => {
  switch (action.type) {
    case FETCH_DEALS_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_DEALS_SUCCESS:
      //   console.log("dealsReducer FETCH_DEALS_SUCCESS");
      return {
        ...state,
        fetchStatus: "",
        dealsList: action.payload
      };
    case FETCH_DEALS_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    default:
      return state;
  }
};

// getters, don't use reselect, so are run every time.  Beware of performance.


// Actions

export const setFetchDealsRequest = () => ({
  type: FETCH_DEALS_REQUEST
});
export const setFetchDealsSucceeded = dealsList => ({
  type: FETCH_DEALS_SUCCESS,
  payload: dealsList
});
export const setFetchDealsFailed = errorMessage => ({
  type: FETCH_DEALS_FAILURE,
  payload: errorMessage
});

export default dealsReducer;
