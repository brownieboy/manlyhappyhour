// Selectors don't like being called from each other's files. They will give
// a circular dependency error, the message for which gives no clue that's
// actually the problem.

import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import * as d3 from "d3-collection";

// import dateFnsParse from "date-fns/parse";

import { stringSortIgnoreArticle } from "../helper-functions/sorting.js";
// import { daysArray } from "../constants/general.js";
import { getLowestDayNumberFromDealDays } from "../helper-functions/dateTime.js";
import { getDayObjForShortDay, getDayObjForDay } from "../constants/general.js";

const getVenues = state => state.venuesState.venuesList; // not actually a selector
const getId = (state, props) => props.navigation.state.params.id;
const getDeals = (state, filterDay) => state.dealsState.dealsList;
const getDealTypeFilters = state => state.settingsState.dealTypeFilters;

const getVenueId = (state, venueId) => venueId;
// const getFilterDay = (state, venueId, filterDay) => filterDay;
const getFilterDay = (state, filterDay) => filterDay;
const getDayOfWeek = state => state.settingsState.dayOfWeek;

const calculateDealTimeSortByFirstStart = (dealA, dealB) => {
  // We'll assume that day sorting has been done before we've
  // reached this point or will be don in the day grouping phase.
  // All we're doing here is returning a number to indicate the
  // sort priority of the two items.

  // First we sort by the earliest start time.
  const startTimeA = new Date(`01 Jan 1970 ${dealA.start}`).getTime();
  const startTimeB = new Date(`01 Jan 1970 ${dealB.start}`).getTime();
  if (startTimeA === startTimeB) {
    // console.log("Start times match, looking to end times");
    // If start times match, then latest finish time comes last
    const finishTimeA = new Date(`01 Jan 1970 ${dealA.finish}`).getTime();
    const finishTimeB = new Date(`01 Jan 1970 ${dealB.finish}`).getTime();
    return finishTimeA - finishTimeB;
  }
  return startTimeA - startTimeB;
};

const calculateDealTimeSortByLastFinish = (dealA, dealB) => {
  // We'll assume that day sorting has been done before we've
  // reached this point or will be don in the day grouping phase.
  // All we're doing here is returning a number to indicate the
  // sort priority of the two items.

  // First we sort by the latest finish time.
  const finishTimeA = new Date(`01 Jan 1970 ${dealA.finish}`).getTime();
  const finishTimeB = new Date(`01 Jan 1970 ${dealB.finish}`).getTime();

  if (finishTimeA === finishTimeB) {
    // console.log("Start times match, looking to end times");
    // If finish times match, then earliest start time comes first
    const startTimeA = new Date(`01 Jan 1970 ${dealA.start}`).getTime();
    const startTimeB = new Date(`01 Jan 1970 ${dealB.start}`).getTime();
    return startTimeA - startTimeB;
  }
  return finishTimeA - finishTimeB;
};

export const selectDealTypeFilters = createSelector(
  [getDealTypeFilters],
  dealTypeFilters => dealTypeFilters
);

export const selectVenues = createSelector(
  [getVenues],
  venuesList => stringSortIgnoreArticle(venuesList, "name")
  //   venuesList => venuesList
);

const selectDealsSortedByDayAndTime = createSelector(
  [getDeals],
  dealsList => {
    const dealsListSorted = [...dealsList].sort((dealA, dealB) => {
      const lowDayNumberA = getLowestDayNumberFromDealDays(dealA.days);
      const lowDayNumberB = getLowestDayNumberFromDealDays(dealB.days);

      if (lowDayNumberA === lowDayNumberB) {
        // If the days match, then we need to look at the two deal's start times.
        // Make it a proper date, although we're only comapring the time part
        // const startTimeA = new Date(`01 Jan 1970 ${dealA.start}`);
        // const startTimeB = new Date(`01 Jan 1970 ${dealB.start}`);
        // if (startTimeA === startTimeB) {
        //   // If days and start times match, then look at the end time
        //   const finishTimeA = new Date(`01 Jan 1970 ${dealA.finish}`);
        //   const finishTimeB = new Date(`01 Jan 1970 ${dealB.finish}`);
        //   // In this case, we return the deal that's finishing later, not earlier!
        //   return finishTimeB - finishTimeA;
        // }
        // return startTimeA - startTimeB;
        return calculateDealTimeSortByFirstStart(dealA, dealB);
      }
      return lowDayNumberA - lowDayNumberB;
    });
    return dealsListSorted;
  }
);

const selectDealItems = createSelector(
  [getDeals, getVenues],
  (dealsList, venuesList) => {
    const dealItemsListItemsArray = [];
    // We need to split deals (muli-day) into dealItems (only
    // one day).
    for (let deal of dealsList) {
      for (let dealDay of deal.days) {
        dealItemsListItemsArray.push({
          day: getDayObjForShortDay(dealDay).name,
          ...deal,
          venue: venuesList.filter(venue => venue.id === deal.venueId)[0]
        });
      }
    }
    // console.log("selectDealItems, dealItemsListItemsArray");
    // console.log(dealItemsListItemsArray);
    return dealItemsListItemsArray;
  }
);

const selectDealItemsSortedByStartTime = createSelector(
  [selectDealItems],
  dealItemsList =>
    [...dealItemsList].sort(
      (dealItemA, dealItemB) => {
        // const daySortOrderA = getDayObjForDay(dealItemA.day);
        // const daySortOrderB = getDayObjForDay(dealItemB.day);

        // if (daySortOrderA === daySortOrderB) {
        return calculateDealTimeSortByLastFinish(dealItemA, dealItemB);  
        // return calculateDealTimeSortByFirstStart(dealItemA, dealItemB);
      }
      //   return daySortOrderA - daySortOrderB;
      // }
    )
);

export const selectFilteredDealItemsByType = createCachedSelector(
  [selectDealItemsSortedByStartTime, getFilterDay, selectDealTypeFilters],
  (dealItemsList, filterDay, dealTypeFilters) => {
    // console.log("selectFilteredVenuesByDay:");
    // console.log(venuesList);
    // console.log(dealsList);
    // console.log("filterDay:");
    // console.log(filterDay);
    // console.log(dealTypeFilters);

    const filteredDealsArray = dealItemsList.filter(dealItem => {
      // console.log("dMember:");
      // console.log(dMember);
      return dealTypeFilters.some(
        dealType => dealItem.types && dealItem.types.includes(dealType)
      );
    });
    return filteredDealsArray;
  }
)(state => {
  // console.log("selectFilteredDealItemsByDayAndDealType resolution:");
  // console.log(state);
  // const dealFilters = selectDealTypeFilters(state);
  // console.log(filterDay);
  // console.log(dealTypeFilters);

  const cacheKey = `${selectDealTypeFilters(state).join("~")}`;
  // console.log("selectFilteredDealItemsByDayAndDealType: cacheKey: " + cacheKey);
  return cacheKey;
});

/*
export const selectFilteredDealItemsByDayAndDealType = createCachedSelector(
  [selectDealItemsSortedByStartTime, getFilterDay, selectDealTypeFilters],
  (dealItemsList, filterDay, dealTypeFilters) => {
    // console.log("selectFilteredVenuesByDay:");
    // console.log(venuesList);
    // console.log(dealsList);
    // console.log("filterDay:");
    // console.log(filterDay);
    // console.log(dealTypeFilters);

    const filteredDealsArray = dealItemsList.filter(dealItem => {
      // console.log("dMember:");
      // console.log(dMember);
      return (
        (filterDay === "all" ||
          dealItem.day === getDayObjForShortDay(filterDay).name) &&
        dealTypeFilters.some(
          dealType => dealItem.types && dealItem.types.includes(dealType)
        )
      );
    });
    return filteredDealsArray;
  }
)((state, filterDay) => {
  // console.log("selectFilteredDealItemsByDayAndDealType resolution:");
  // console.log(state);
  // const dealFilters = selectDealTypeFilters(state);
  // console.log(filterDay);
  // console.log(dealTypeFilters);

  const cacheKey = `${filterDay}~${selectDealTypeFilters(state).join("~")}`;
  // console.log("selectFilteredDealItemsByDayAndDealType: cacheKey: " + cacheKey);
  return cacheKey;
});
*/

export const selectFilteredDealItemsGroupedByDay = createSelector(
  [selectFilteredDealItemsByType],
  dealsItemsList =>
    d3
      .nest()
      .key(dealItem => dealItem.day)
      .sortKeys(
        (a, b) => getDayObjForDay(a).sortOrder - getDayObjForDay(b).sortOrder
      )
      .entries(dealsItemsList)
);

export const selectDealsGroupedByDay = createSelector(
  [selectDealItemsSortedByStartTime],
  dealsItemsList =>
    d3
      .nest()
      .key(dealItem => dealItem.day)
      .sortKeys(
        (a, b) => getDayObjForDay(a).sortOrder - getDayObjForDay(b).sortOrder
      )
      .entries(dealsItemsList)
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
  [selectDealsSortedByDayAndTime, getId],
  (dealsList, id) => dealsList.filter(dealMember => dealMember.venueId === id) // Mutliple deals, so return them all
)((state, props) => getId(state, props));

// Here
export const selectFilteredDealsByDayAndDealType = createCachedSelector(
  [selectDealsSortedByDayAndTime, getDayOfWeek, selectDealTypeFilters],
  (dealsList, filterDay, dealTypeFilters) => {
    // console.log("selectFilteredDealsByDayAndDealType:");
    // console.log(dealsList);
    // console.log("filterDay:");
    // console.log(filterDay);
    // console.log(dealTypeFilters);

    const filteredDealsArray = dealsList.filter(deal => {
      // console.log("dMember:");
      // console.log(dMember);
      return (
        (filterDay === "all" || deal.days.includes(filterDay)) &&
        dealTypeFilters.some(
          dealType => deal.types && deal.types.includes(dealType)
        )
      );
    });
    console.log("filteredDealsArray:");
    console.log(filteredDealsArray);

    return filteredDealsArray;
  }
)((state, filterDay) => {
  console.log("selectFilteredDealsByDayAndDealType resolution:");
  // console.log(state);
  // const dealFilters = selectDealTypeFilters(state);
  // console.log(filterDay);
  // console.log(dealTypeFilters);

  const cacheKey = `${filterDay}~${selectDealTypeFilters(state).join("~")}`;
  // console.log("cacheKey: " + cacheKey);
  return cacheKey;
});

// and here
export const selectFilteredVenueDealsForVenueId = createCachedSelector(
  [selectFilteredDealsByDayAndDealType, getVenueId],
  (dealsList, id) => {
    // console.log("selectFilteredVenueDealsForVenueId:");
    // console.log(dealsList);
    // console.log("Venue id: " + id);
    return dealsList.filter(dealMember => dealMember.venueId === id); // Mutliple deals, so return them all
  }
)((state, venueId) => {
  // console.log("selectFilteredVenueDealsForVenueId resolution:");
  // console.log(state);
  // const dealFilters = selectDealTypeFilters(state);
  // console.log(filterDay);
  // console.log(dealTypeFilters);

  const cacheKey = `${venueId}~${selectDealTypeFilters(state).join("~")}`;
  // console.log("selectFilteredDealItemsByDayAndDealType: cacheKey: " + cacheKey);
  return cacheKey;
});

// No
export const selectVenueDealsForVenueId = createCachedSelector(
  [selectDealsSortedByDayAndTime, getVenueId],
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
  [
    selectVenues,
    selectDealsSortedByDayAndTime,
    getFilterDay,
    selectDealTypeFilters
  ],
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
  // console.log("selectFilteredVenuesByDayAndDealType resolution:");
  // console.log(state);
  // const dealFilters = selectDealTypeFilters(state);
  // console.log(filterDay);
  // console.log(dealFilters);
  const cacheKey = `${filterDay}~${selectDealTypeFilters(state).join("~")}`;
  // console.log(cacheKey);
  return cacheKey;
});

export const getCommonStateObject = localState => ({
  fetchStatus: localState.fetchStatus,
  fetchError: localState.fetchError
});
