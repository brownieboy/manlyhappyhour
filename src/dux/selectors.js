// Selectors don't like being called from each other's files. They will give
// a circular dependency error, the message for which gives no clue that's
// actually the problem.

import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";

import { stringSortIgnoreArticle } from "../helper-functions/sorting.js";

const getVenues = state => state.venuesState.venuesList; // not actually a selector
const getId = (state, props) => props.navigation.state.params.id;
const getDeals = (state, filterDay) => state.dealsState.dealsList;
const getDealTypeFilters = state => state.settingsState.dealTypeFilters;

const getVenueId = (state, venueId) => venueId;
// const getFilterDay = (state, venueId, filterDay) => filterDay;
const getFilterDay = (state, filterDay) => filterDay;

export const selectVenues = createSelector(
  [getVenues],
  venuesList => stringSortIgnoreArticle(venuesList, "name")
  //   venuesList => venuesList
);

export const selectDetailTypeFilters = createSelector(
  [getDealTypeFilters],
  dealTypeFilters => dealTypeFilters
);

export const selectVenueDetails = createCachedSelector(
  [selectVenues, getId],
  (venuesList, id) => venuesList.filter(venueMember => venueMember.id === id)[0] // Only one venue, so first element
)((state, props) => getId(state, props));

// Not sure if this one is actually adding anything.
export const selectDeals = createSelector(
  [getDeals],
  dealsList => dealsList
);

export const selectVenueDeals = createCachedSelector(
  [selectDeals, getId],
  (dealsList, id) => dealsList.filter(dealMember => dealMember.venueId === id) // Mutliple deals, so return them all
)((state, props) => getId(state, props));

export const selectVenueDealsForVenueId = createCachedSelector(
  [selectDeals, getVenueId],
  (dealsList, venueId) =>
    dealsList.filter(dealMember => dealMember.venueId === venueId) // Mutliple deals, so return them all
)((state, venueId) => getVenueId(state, venueId));

// export const selectFilteredDealsByDay = createCachedSelector(
//   [selectVenueDealsForVenueId, getVenueId, getFilterDay],
//   (dealsList, venueId, filterDay) =>
//     dealsList.filter(dealMember => dealMember.days.includes(filterDay))
// )((state, venueId, filterDay) => getFilterDay(state, venueId, filterDay));

// export const selectFilteredVenuesByDay = createCachedSelector(
//   [selectVenues, selectDeals, getFilterDay],
//   (venuesList, dealsList, filterDay) => {
//     console.log("selectFilteredVenuesByDay:");
//     console.log(venuesList);
//     console.log(dealsList);
//     console.log("filterDay:");
//     console.log(filterDay);

//     return venuesList.filter(venueMember => {
//       const dealsForVenue = dealsList.filter(
//         dealMember => dealMember.venueId === venueMember.id
//       );
//       const filteredDealsArray = dealsForVenue.filter(
//         dMember => filterDay === "all" || dMember.days.includes(filterDay)
//       );

//       return filteredDealsArray.length > 0;
//     });
//   }
// )((state, filterDay) => {
//   // console.log("selectFilteredDealsByDay resolution:");
//   // console.log(state);
//   // console.log(filterDay);
//   return filterDay;
// });
//const found = arr1.some(r=> arr2.includes(r))

export const selectFilteredVenuesByDayAndDealType = createCachedSelector(
  [selectVenues, selectDeals, getFilterDay, selectDetailTypeFilters],
  (venuesList, dealsList, filterDay, dealTypeFilters) => {
    // console.log("selectFilteredVenuesByDay:");
    // console.log(venuesList);
    // console.log(dealsList);
    // console.log("filterDay:");
    // console.log(filterDay);
    // console.log(dealTypeFilters);

    return venuesList.filter(venueMember => {
      const dealsForVenue = dealsList.filter(
        dealMember => dealMember.venueId === venueMember.id
      );
      const filteredDealsArray = dealsForVenue.filter(dMember => {
        // console.log("dMember:");
        // console.log(dMember);
        return (
          (filterDay === "all" || dMember.days.includes(filterDay)) &&
          dealTypeFilters.some(
            dealType => dMember.types && dMember.types.includes(dealType)
          )
        );
      });

      return filteredDealsArray.length > 0;
    });
  }
)((state, filterDay) => {
  // console.log("selectFilteredDealsByDay resolution:");
  // console.log(state);
  // console.log(filterDay);
  return filterDay;
});

/*
    if (filterDay !== "all") {
      filteredVenuesList = venuesList.filter(venue => {
        const dealsArray = this.props.selectVenueDeals(venue.id);
        const filteredDealsArray = dealsArray.filter(dealMember =>
          dealMember.days.includes(filterDay)
        );
        return filteredDealsArray.length > 0;
      });
    }

*/
