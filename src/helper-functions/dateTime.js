import { daysArray } from "../constants/general.js";
import DeviceInfo from "react-native-device-info";

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

export const getTimeText = timeText24Hour => {
  if (DeviceInfo.is24Hour()) {
    return timeText24Hour;
  }

  let time = timeText24Hour.match(
    /^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/
  ) || [time];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "am" : "pm"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
};
