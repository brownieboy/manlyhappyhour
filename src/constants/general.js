export const daysArray = [
  { name: "Saturday", shortName: "Sat", sortOrder: 0 },
  { name: "Sunday", shortName: "Sun", sortOrder: 1 },
  { name: "Monday", shortName: "Mon", sortOrder: 2 },
  { name: "Tuesday", shortName: "Tue", sortOrder: 3 },
  { name: "Wednesday", shortName: "Wed", sortOrder: 4 },
  { name: "Thursday", shortName: "Thu", sortOrder: 5 },
  { name: "Friday", shortName: "Fri", sortOrder: 6 }
];

export const daysPicker = [
  { label: "All days", value: "all" },
  { label: "Saturday", value: "Sat" },
  { label: "Sunday", value: "Sun" },
  { label: "Monday", value: "Mon" },
  { label: "Tuesday", value: "Tue" },
  { label: "Wednesday", value: "Wed" },
  { label: "Thursday", value: "Thu" },
  { label: "Friday", value: "Fri" }
];

export const getDayObjForShortDay = shortDay =>
  daysArray.filter(dayObj => dayObj.shortName === shortDay)[0];

export const getDayObjForDay = day =>
  daysArray.filter(dayObj => dayObj.name === day)[0];

// export const getFullDayForShortDay = shortDay =>
//   daysArray.filter(dayObj => dayObj.shortName === shortDay).name;
