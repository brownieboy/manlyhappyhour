// Selectors don't like being called from each other's files. They will give
// a circular dependency error, the message for which gives no clue that's
// actually the problem.

import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";

import { stringSortIgnoreArticle } from "../helper-functions/sorting.js";

const getVenues = state => state.venuesState.venuesList; // not actually a selector
const getId = (state, props) => props.navigation.state.params.id;

export const selectVenues = createSelector(
  [getVenues],
  venuesList => stringSortIgnoreArticle(venuesList, "name")
  //   venuesList => venuesList
);

export const selectVenueDetails = createCachedSelector(
  [selectVenues, getId],
  (venuesList, id) => venuesList.filter(venueMember => venueMember.id === id)[0]
)((state, props) => getId(state, props));
