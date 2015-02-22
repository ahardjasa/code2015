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
		var strippedDate = new Date(day.year, day.month, day.day, 0, 0, 0);
		var food = self.foodItems.find(
			function(element, index, array) {
				return element.year === strippedDate.year && element.month === strippedDate.month
					&& element.day === strippedDate.day; } );
		if( food === undefined)
			{self.foodItems.push({Day:strippedDate, Food:foodItem});}
		else
		{ food.Food += foodItem;}
	};

	self.getDataByFoodParamAndDate = function(paramName, day)
	{
		var strippedDate = new Date(day.year, day.month, day.day, 0, 0, 0);
		var foodItemsForDay = self.foodItems[strippedDate];
		if(foodItemsForDay !== undefined)
		{
			return foodItemsForDay[paramName];
		}

	};

	self.SampleUser = function()
	{

	}

}
function UserPreferences()
{
	var self = this;
	self.mealSize = ko.observable(5);
	self.distance = ko.observable(5);
	self.desiredTypes = ko.observableArray(['truck', 'tree', 'restaurant']);
	self.cooking = ko.observable(false);
	self.dailyCalories = ko.observable(9000);
	self.dailyIron = ko.observable(900);
	self.dailyMagnesium = ko.observable(90);

	self.isShowHistCalories = ko.observable("true");
	self.isShowHistCarbs = ko.observable("true");
	self.isShowHistProtein = ko.observable("true");
	self.isShowHistFat = ko.observable("true");
}

function PreferencesViewModel()
{
	var self = this;
	self.myPreferences = new UserPreferences();
	self.myUser = new User("Jim", "Bob");
	self.GetGreeting = function()
		{return "Hello " + self.myUser.firstName + " " + self.myUser.lastName;};

	self.ActivityOptions = ["Very Active", "Slightly Active", "Sedentary" ];

	self.DrawGraph = function()
	{
		$(function() {

			// insert checkboxes
			var displayTypes = $("#prefHistoryChoices");

			displayTypes.find("input").click(plotAccordingToChoices);

			function plotAccordingToChoices() {

				var data = [];

				if(self.myPreferences.isShowHistCalories)
				{ data.push({label:"Calories", data: [[1,2]]}) ;}

				if(self.myPreferences.isShowHistFat)
				{ data.push({label:"Fat", data: [[3,4]]}) ;}

				if(self.myPreferences.isShowHistProtein)
				{ data.push({label:"Protein", data: [[5,6]]}) ;}

				if(self.myPreferences.isShowHistCarbs)
				{ data.push({label:"Carbs", data: [[7,8]]}) ;}

				if(data.length > 0)
				{$.plot("#prefHistoryPlot", data);}



			}

			plotAccordingToChoices();

		});
	};

	self.DrawDayGraph = function()
	{
		$(function() {

			var d1 = [];
			for (var i = 0; i < 14; i += 0.5) {
				d1.push([i, Math.sin(i)]);
			}

			var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];

			// A null signifies separate line segments

			var d3 = [[0, 12], [7, 12], null, [7, 2.5], [12, 2.5]];


			yaxis = {
				show: false};

			xaxis=  {
				show: false};

			grid = { show: false};

			series = {
				bars: {
					show: true
				}};

			var options = {
				yaxis: yaxis, xaxis: xaxis, grid: grid, series: series
			};

				$.plot("#prefDayPlot", [d1, d2, d3], options);
		});
	};
}

