function FoodItem(source, name, calories) {
	this.source = source;
	this.name = name;
	this.calories = calories;
}

function Profile(portion) {
	var self = this;
	self.portion = ko.observable(1);
}

function PageModel() {
	this.profile = new Profile(1);
	this.foodItems = ko.observableArray([
		new FoodItem("subway", "12\" meatball", 100)
	]);
	this.totalCalories = ko.computed(function () {
		return this.foodItems().reduce(function (total, item) {
			return total + item.calories;
		}, 0);
	}, this);
}

PageModel.prototype.addRandomFood = function () {
	// FIXME: uneven weighting
	var file = everything[Math.floor(Math.random() * everything.length)];
	var food = file.foods[Math.floor(Math.random() * file.foods.length)];

	// FIXME: use columns
	this.foodItems.push(new FoodItem(file.name, food[0], food[3]));
};

var model = new PageModel();

$(function () {
	ko.applyBindings(model);
});
