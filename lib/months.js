var data = {
  0: 'jan',
  1: 'feb',
  2: 'mar',
  3: 'apr',
  4: 'may',
  5: 'jun',
  6: 'jul',
  7: 'aug',
  8: 'sep',
  9: 'oct',
  10: 'nov',
  11: 'dec'
};

var monthNames = {
  jan: { en: 'January' },
  feb: { en: 'February' },
  mar: { en: 'March' },
  apr: { en: 'April' },
  may: { en: 'May' },
  jun: { en: 'June' },
  jul: { en: 'July' },
  aug: { en: 'August' },
  sep: { en: 'September' },
  oct: { en: 'October' },
  nov: { en: 'November' },
  dec: { en: 'December' }
}

function getMonthCode(monthNumber) {
  return data[monthNumber];
}

function currentMonthCode() {
  return getMonthCode(new Date().getMonth());
}

function getMonthName(monthCode) {
  return monthNames[monthCode];
}

var Months = {
  currentMonthCode: currentMonthCode,
  getMonthCode: getMonthCode,
  getMonthName: getMonthName,
  data: data
};

module.exports = Months;
