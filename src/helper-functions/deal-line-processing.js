const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const getDealTextObj = (dealsArray, daysItemKey, usesShortDesc = false) => {
  let dateTimeLabel;
  let closeTimeString;
  const currentDayDealObj = dealsArray.map(currentDealLineObj => {
    closeTimeString =
      typeof currentDealLineObj.close !== "undefined"
        ? `-${currentDealLineObj.close}`
        : "";
    dateTimeLabel = `${daysItemKey} ${
      currentDealLineObj.open
    }${closeTimeString}`;
    return {
      dateTimeLabel,
      dealDescription:
        usesShortDesc && currentDealLineObj.dealShortDescription
          ? currentDealLineObj.dealShortDescription
          : currentDealLineObj.dealDescription
    };
  });
  return currentDayDealObj;
};

export const getDealTextObjArray = (
  dealsGroupedByDay,
  usesShortDesc = false
) => {
  let dealsObjArray = [];
  let currentDealsArray;
  let currentDaysDealObjArray;
  Object.keys(dealsGroupedByDay).forEach(daysItemKey => {
    currentDealsArray = dealsGroupedByDay[daysItemKey];
    currentDaysDealObjArray = getDealTextObj(
      currentDealsArray,
      daysItemKey,
      usesShortDesc
    );
    dealsObjArray = [...dealsObjArray, ...currentDaysDealObjArray];
    console.log("currentDaysDealObjArray outer:");
    console.log(currentDaysDealObjArray);
  });
  return dealsObjArray;
};

export const getHoursText = hoursGroupedByDay => {
  let hoursTextStringArray = [];
  let currentDayItem;
  Object.keys(hoursGroupedByDay).forEach(daysItemKey => {
    // console.log(daysItemKey); // key
    currentDayItem = hoursGroupedByDay[daysItemKey];
    hoursTextStringArray = [
      ...hoursTextStringArray,
      `${daysItemKey}: ${currentDayItem[0].open}${
        typeof currentDayItem[0].close !== "undefined"
          ? `-${currentDayItem[0].close}`
          : ""
      }`
    ];
  });
  return hoursTextStringArray.join(", ");
};

export const getDaysLabel = daysArray => {
  if (daysArray.length === 7) {
    return "Every Day";
  }
  if (daysArray.length === 5) {
    let checker = (arr, target) => target.every(v => arr.includes(v));
    if (checker(daysArray, weekDays)) {
      return "Week Days";
    }

  }

  return daysArray.join("/");
};
