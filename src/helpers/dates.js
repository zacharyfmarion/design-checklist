// @flow

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Return an array where each item is a consecutive day, starting from
 * startDate and ending with endDate
 * @param {Date} startDate - Beginning point
 * @param {Date} endDate - Ending point
 */
export function createDateRange(startDate: Date, endDate: Date): Array<Date> {
  let range = [];
  let currDate = startDate;
  let tomorrow;
  while (currDate < endDate) {
    tomorrow = new Date(currDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    range.push(tomorrow);
    currDate = tomorrow;
  }
  return range;
}

/**
 * Create a string "Year Month Day" from a Date object
 */
export function yearMonthDay(date: Date) {
  const year = date.getUTCFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getUTCDate();
  return `${year} ${month} ${day}`;
}

/**
 * Format a date in the format YYYY/MM/DD
 * @param {Date} date
 */
export function formatDate(date: Date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
}
