var Foods = require('./lib/foods');
var Months = require('./lib/months');
var I18n = require('./lib/i18n');

var express = require('express');
var app = express();

app.set('view engine', 'pug')

DEFAULT_LOCALE = 'en';

function getLocale(request) {
  var query = request.query['locale'] || request.query['lang'];

  if (query === 'sv') return 'sv';
  if (query === 'en') return 'en';

  return null;
}

function stringContains(string, subString) {
  return string.indexOf(subString) !== -1;
}

function findFoodType(string) {
  string = (string || '').replace(/-/g, '').replace(/_/g, '');

  if (stringContains(string, 'fruit')) return 'fruit';
  if (stringContains(string, 'vegetables')) return 'vegetables';
  if (stringContains(string, 'meat') || stringContains(string, 'game')) return 'meat_and_game';
  if (stringContains(string, 'fish') || stringContains(string, 'seafood')) return 'fish_and_seafood';

  return null;
}

function getPage(locale, originalUrl) {
  var i18n = I18n[locale];

  var foods = new Foods({ locale: locale });
  var foodType = findFoodType(originalUrl);
  if (foodType) {
    foods = foods.withType(foodType);
  }

  var currentMonth = Months.currentMonthCode();

  var commingSoonFoods = foods.commingSoonFoods(currentMonth);
  var inSeasonFoods = foods.inSeasonFoods(currentMonth);

  var foodTypeName = i18n.foodTypes[foodType];
  var headTitle = i18n.title;
  if (foodTypeName) {
    headTitle = foodTypeName + ' | ' + headTitle;
  }

  var viewData = {
    locale: locale,
    head_title: headTitle,
    title: i18n.title,
    inSeasonFoods: inSeasonFoods,
    commingSoonFoods: commingSoonFoods,
    foodType: foodTypeName,
    i18n: i18n,
  };

  return {
    viewData: viewData,
    canonicalUrl: '/' + foodType,
  }
}

app.get('/*', function(request, response){
  var locale = getLocale(request) || DEFAULT_LOCALE;
  var page = getPage(locale, request.originalUrl)

  response.render('index', page.viewData);
});

console.log('Listening on http://localhost:3000/');
app.listen(3000);
