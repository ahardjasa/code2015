function FoodItem(source, name, calories) {
	this.source = source;
	this.name = name;
	this.calories = calories;
}

function PageModel() {
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
	this.foodItems.push(new FoodItem("asdf", "cheese", 1000));
};

var model = new PageModel();

$(function () {
	ko.applyBindings(model);
});
