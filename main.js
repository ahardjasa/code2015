var model = {
	increment: function () {
		this.totalCalories(this.totalCalories() + 1);
	},
	totalCalories: ko.observable(9000)
};

$(function () {
	ko.applyBindings(model);
});
