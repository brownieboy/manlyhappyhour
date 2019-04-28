import { daysArray } from "../constants/general.js";

// DealDays is short days here, so "Mon", "Tue", "Wed" etc
const getSortOrderArrayFromDealDays = dealDays => {
  const sortOrderArray = dealDays.map(dealDay => {
    // console.log("getSortOrderArrayFromDealDays, dealDay:");
    // console.log(dealDay);
    const matchingDayObj = daysArray.find(
      dayObj => {
          return dayObj.shortName === dealDay}
    ); // .find() returns an array, so first match only
    return matchingDayObj.sortOrder;
  });
//   console.log("sortOrderArray:");
//   console.log(sortOrderArray);
  return sortOrderArray;
};

export const getLowestDayNumberFromDealDays = dealDays =>
  Math.min(...getSortOrderArrayFromDealDays(dealDays));
