import { daysArray } from "../constants/general.js";

// Every Day test is easy.
const isDealEveryDay = dealDays => dealDays.length === 7;

// Clunky test for weekdays, but it works.

const isDealWeekDays = dealDays =>
  dealDays.length === 5 &&
  dealDays.includes("Mon") &&
  dealDays.includes("Tue") &&
  dealDays.includes("Wed") &&
  dealDays.includes("Thu") &&
  dealDays.includes("Fri");

// DealDays is short days here, so "Mon", "Tue", "Wed" etc
const getSortOrderArrayFromDealDays = dealDays => {
  const sortOrderArray = dealDays.map(dealDay => {
    // console.log("getSortOrderArrayFromDealDays, dealDay:");
    // console.log(dealDay);
    const matchingDayObj = daysArray.find(dayObj => {
      return dayObj.shortName === dealDay;
    }); // .find() returns first match only, *not* an array.
    return matchingDayObj.sortOrder;
  });
  //   console.log("sortOrderArray:");
  //   console.log(sortOrderArray);
  return sortOrderArray;
};

// Supra rules is that Every Day should sort at top (-10), then
// Week Days (-5), and only then do we look at the actual days
export const getLowestDayNumberFromDealDays = dealDays => {
  if (isDealEveryDay(dealDays)) {
    return -10;
  }
  if (isDealWeekDays(dealDays)) {
    return -5;
  }

  // Only now do we look at the individual days
  return Math.min(...getSortOrderArrayFromDealDays(dealDays));
};
