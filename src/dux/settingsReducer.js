export const TOGGLE_DEAL_TYPE_FILTER = "TOGGLE_DEAL_TYPE_FILTER";
export const FETCH_SETTINGS_SUCCESS = "FETCH_SETTINGS_SUCCESS";
export const LOAD_SETTINGS_NOW = "LOAD_SETTINGS_NOW";
export const SET_DAY_OF_WEEK = "SET_DAY_OF_WEEK";
export const TOGGLE_SORT_DEALITEMS_TOWARDS = "TOGGLE_SORT_DEALITEMS_TOWARDS";

const defaultState = {
  dealTypeFilters: ["beer", "wine", "cocktails", "food"],
  sortDealItemsTowards: "startTime",
  dayOfWeek: "all"
};

const settingsReducer = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case TOGGLE_DEAL_TYPE_FILTER:
      const dealType = payload;
      // Include deal type if it's not in the array
      if (!state.dealTypeFilters.includes(dealType)) {
        return {
          ...state,
          dealTypeFilters: [...state.dealTypeFilters, dealType]
        };
      }
      // Exclude deal type if it is in the array
      else {
        return {
          ...state,
          dealTypeFilters: state.dealTypeFilters.filter(
            dType => dType !== dealType
          )
        };
      }

    case FETCH_SETTINGS_SUCCESS: {
      const newState = { ...state, ...payload };
      // console.log("newState:");
      // console.log(newState);
      return newState;
    }
    case SET_DAY_OF_WEEK: {
      return { ...state, dayOfWeek: payload };
    }
    case TOGGLE_SORT_DEALITEMS_TOWARDS: {
      return {
        ...state,
        sortDealItemsTowards:
          state.sortDealItemsTowards === "finishTime"
            ? "startTime"
            : "finishTime"
      };
    }
    default:
      return state;
  }
};

export const toggleDealTypeFilter = dealType => ({
  type: TOGGLE_DEAL_TYPE_FILTER,
  payload: dealType
});

export const setFetchSettingsSucceeded = settingsState => ({
  type: FETCH_SETTINGS_SUCCESS,
  payload: settingsState || defaultState
});

export const setDayOfWeek = dayOfWeek => ({
  type: SET_DAY_OF_WEEK,
  payload: dayOfWeek
});

export const toggleDealItemsTowards = () => ({
  type: TOGGLE_SORT_DEALITEMS_TOWARDS,
  payload: ""
});

export const loadSettingsNow = () => ({ type: LOAD_SETTINGS_NOW });

// Getters
export const getDealTypeFilters = state => state.settingsState.dealTypeFilters;
export const getDayOfWeek = state => state.settingsState.dayOfWeek;
// export const sortDealItemsTowards = state =>
// state.settingsState.sortDealItemsTowards;  // moved to selectors.js

export const getPersistedSettings = state => {
  // We persist everything except dayOfWeekd
  const { dayOfWeek, ...persistantState } = state.settingsState;
  return persistantState;
};
// export const getincludeFoodInFilter = state =>
//   state.uiState.includeFoodInFilter;
// export const getAppearancesView = state => state.uiState.appearancesView;
// export const getReverseDaysOrder = state => state.uiState.reverseDaysOrder;
// export const getReverseTimesOrder = state => state.uiState.reverseTimesOrder;

export default settingsReducer;
