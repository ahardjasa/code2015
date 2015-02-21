/**
 * Created by Ivan on 2015-02-20.
 */

function User(first, last)
{
	var self = this;
	self.firstName = first;
	self.lastName = last;
	self.age = ko.observable("Enter age:");
	self.activityLevel = ko.observable();

	self.foodItems = [];

	self.addFoodItem = function(day, foodItem) {
		self.foodItems.push({Day:day, Food:foodItem});
	}
}
function UserPreferences()
{
	var self = this;
	self.mealSize = ko.observable(5);
	self.distance = ko.observable(5);
	self.isFruitTrees = ko.observable("true");
	self.isFoodTrucks = ko.observable("foodTrucks");
	self.isSupermarkets = ko.observable("superMarkets");
	self.isFarmersMarkets = ko.observable("farmersMarkets");
	self.cooking = ko.observable(false);
	self.dailyCalories = ko.observable(9000);
	self.dailyIron = ko.observable(900);
	self.dailyMagnesium = ko.observable(90);
}

function PreferencesViewModel()
{
	var self = this;
	self.isVisible = ko.observable(false);
	self.myPreferences = new UserPreferences();
	self.myUser = new User("Jim", "Bob");
	self.GetGreeting = function()
		{return "Hello " + self.myUser.firstName + " " + self.myUser.lastName;};

	self.ActivityOptions = ["Very Active", "Slightly Active", "Sedentary" ];

	self.Toggle = function(){
		self.isVisible(!self.isVisible());
	};

	self.DrawGraph = function()
	{
		$(function() {

			var d1 = [];
			for (var i = 0; i < 14; i += 0.5) {
				d1.push([i, Math.sin(i)]);
			}

			var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];

			// A null signifies separate line segments

			var d3 = [[0, 12], [7, 12], null, [7, 2.5], [12, 2.5]];

			$.plot("#placeholder", [ d1, d2, d3 ]);

			// Add the Flot version string to the footer

			$("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
		});



	};
}

