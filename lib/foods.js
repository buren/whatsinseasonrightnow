var foodsData = require('./foods-data');

function cloneFoods(foods, data) {
  var opts = foods.options;
  opts.data = data;
  return new Foods(opts);
}

function findMonth(months, monthCode) {
  return months.find(function(foodMonth) {
    return foodMonth.key === monthCode;
  });
};

function Foods(options) {
  this.options = options || {};
  this.options.locale = this.options.locale || 'en';
  this.options.data = this.options.data || foodsData;

  this.locale = this.options.locale;
  this.data = this.options.data;
}

Foods.prototype.commingSoonFoods = function(monthCode) {
  var self = this;

  var foodData = this.data.filter(function(food) {
    var month = findMonth(food.months, monthCode);
    if (!month) return;

    return month.commingSoon;
  });

  return cloneFoods(self, foodData);
}

Foods.prototype.inSeasonFoods = function(monthCode) {
  var self = this;

  var foodData = this.data.filter(function(food) {
    var month = findMonth(food.months, monthCode);
    if (!month) return;

    return month.inSeason;
  });

  return cloneFoods(self, foodData);
}

Foods.prototype.withType = function(type) {
  var self = this;

  var foodData = this.data.filter(function(food) {
    if (food.type !== type) return;

    return food;
  });

  return cloneFoods(self, foodData);
}


Foods.prototype.getFoodNames = function(locale) {
  var self = this;

  return this.data.map(function(food) {
    return food.name[locale || self.locale];
  });
}

module.exports = Foods;
