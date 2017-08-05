var typeNameMap = {
  fruit: {
    en: 'Fruit',
    sv: 'Frukt',
  },
  vegetables: {
    en: 'Vegetables',
    sv: 'Grönsaker',
  },
  meat_and_game: {
    en: 'Meat and game',
    sv: 'Kött och vilt',
  },
  fish_and_seafood: {
    en: 'Fish and seafood',
    sv: 'Fisk och skaldjur',
  },
};

var Months = require('./months');

function buildMonth(monthCode, monthCell) {
  return {
    name: Months.getMonthName(monthCode),
    key: monthCode,
    commingSoon: monthCell === 'Coming in',
    inSeason: monthCell === 'At its best',
  };
}

function buildMonths(food, offset) {
  return [
    buildMonth('jan', food[offset]),
    buildMonth('feb', food[offset + 1]),
    buildMonth('mar', food[offset + 2]),
    buildMonth('apr', food[offset + 3]),
    buildMonth('may', food[offset + 4]),
    buildMonth('jun', food[offset + 5]),
    buildMonth('jul', food[offset + 6]),
    buildMonth('aug', food[offset + 8]),
    buildMonth('sep', food[offset + 9]),
    buildMonth('oct', food[offset + 10]),
    buildMonth('nov', food[offset + 11]),
    buildMonth('dec', food[offset + 12])
  ];
}

function hyphen(string) {
  return string.replace(/ /g, '-');
}

function underscore(string) {
  return string.replace(/ /g, '_');
}

var rawData = require('../data/all.js');
var data = rawData.map(function(food) {
  var type = food[0];
  var enName = food[1];
  var svName = food[2];

  var offset = 3;

  return {
    type: type,
    typeName: typeNameMap[type],
    name: { en: enName, sv: svName },
    urls: {
      // TODO: Properly format links with spaces and special chars in them
      //       probably needs to be handles differently in different sources

      bbc: 'https://bbcgoodfood.com/glossary/' + hyphen(food[1].toLowerCase()),
      wikipedia: 'https://en.wikipedia.org/wiki/' + underscore(food[1]),
    },
    months: buildMonths(food, offset),
  };
})

module.exports = data;
