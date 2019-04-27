export const TOGGLE_DEAL_TYPE_FILTER = "TOGGLE_DEAL_TYPE_FILTER";
export const FETCH_SETTINGS_SUCCESS = "FETCH_SETTINGS_SUCCESS";
export const LOAD_SETTINGS_NOW = "LOAD_SETTINGS_NOW";

const defaultState = {
  dealTypeFilters: ["beer", "wine", "cocktail", "food"]
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

      return { ...state };
    case FETCH_SETTINGS_SUCCESS: {
      return payload; // yep, the whole thing is replaced
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

export const loadSettingsNow = () => ({ type: LOAD_SETTINGS_NOW });

// Getters
export const getDealTypeFilters = state => state.settingsState.dealTypeFilters;
// export const getincludeFoodInFilter = state =>
//   state.uiState.includeFoodInFilter;
// export const getAppearancesView = state => state.uiState.appearancesView;
// export const getReverseDaysOrder = state => state.uiState.reverseDaysOrder;
// export const getReverseTimesOrder = state => state.uiState.reverseTimesOrder;

export default settingsReducer;