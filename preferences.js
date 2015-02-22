/**
 * Created by Ivan on 2015-02-20.
 */

function User(first, last)
{
	var self = this;
	self.firstName = first;
	self.lastName = last;
	self.age = ko.observable("Enter age:");
	self.gender = "F";
	self.activityLevel = ko.observable();
	self.hungerLevel = ko.observable(0);
	self.healthIndeces = ko.computed(function(){
		if(self.age() === null) return maleNeeds.rows[10];
		switch(self.gender)
		{
			case("F"):
				if(self.age() < 9) { return femaleNeeds.rows[0];}
				if(self.age() >= 70) { return femaleNeeds.rows[femaleNeeds.rows.length - 1];}
				for(var row in femaleNeeds.rows)
				{
					if(self.age() === row[0] ) { return row;}
				}
				return femaleNeeds.rows[10];
			case("M"):
				if(self.age() < 9) { return maleNeeds.rows[0];}
				if(self.age() >= 70) { return maleNeeds.rows[maleNeeds.rows.length - 1];}
				for(var row in maleNeeds.rows)
				{
					if(self.age() === row[0] ) { return row;}
				}
				return maleNeeds.rows[10];
			case("O"):
				return femaleNeeds.rows[10];
		}
	});

	self.setHunger = function(id)
	{
		$("#hungergames").find(".btn-primary").removeClass("btn-primary");
		$("#" + id).addClass("btn-primary");
		var num = id.replace("hunger", "");
		self.hungerLevel(parseInt(num));
	}
	self.foodItems = [];

	self.addFoodItem = function(day, foodItem) {
		var strippedDate = new Date(day.getFullYear(), day.getMonth(), day.getDay(), 0, 0, 0, 0);
		var food = self.foodItems.find(
			function(element, index, array) {
				return element["Day"].getFullYear() === strippedDate.getFullYear() && element["Day"].getMonth() === strippedDate.getMonth()
					&& element["Day"].getDay() === strippedDate.getDay(); } );
		if( food === undefined)
			{self.foodItems.push({Day:strippedDate, Food:foodItem});}
		else
		{ food.Food += foodItem;}
	};

	self.getGraphData = function(minDay, maxDay, column)
	{
		var data = [];
		for(var i = 0; i < self.foodItems.length; i++)
		{
			if( self.foodItems[i]["Day"] > minDay && self.foodItems[i]["Day"] < maxDay)
			{
				data.push([self.foodItems[i]["Day"].getTime(), self.foodItems[i]["Food"][column]]);
			}
		}
		return data;
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

	self.AddSampleFood = function()
	{
		self.addFoodItem(new Date(), pageModel.foodItems()[0]);
		self.addFoodItem(new Date(2014, 1, 1), pageModel.foodItems()[1]);
		self.addFoodItem(new Date(2013, 2, 4), pageModel.foodItems()[2]);
		self.addFoodItem(new Date(2012, 3, 5), pageModel.foodItems()[3]);
		self.addFoodItem(new Date(2011, 4, 6), pageModel.foodItems()[4]);
		self.addFoodItem(new Date(2010, 2, 1), pageModel.foodItems()[5]);
		self.addFoodItem(new Date(2004,  3, 2), pageModel.foodItems()[6]);
		self.addFoodItem(new Date(2004,  5, 6), pageModel.foodItems()[7]);

	}

}
function UserPreferences()
{
	var self = this;
	self.mealSize = ko.observable(5);
	self.distance = ko.observable(5);
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

			self.myUser.AddSampleFood();
			// insert checkboxes
			var displayTypes = $("#prefHistoryChoices");

			displayTypes.find("input").click(plotAccordingToChoices);

			function plotAccordingToChoices() {

				var data = [];

				if(self.myPreferences.isShowHistCalories)
				{ data.push({label:"Calories"
					, data: self.myUser.getGraphData(new Date(1990, 2, 0), new Date(), "calories")}) ;}

				if(self.myPreferences.isShowHistFat)
				{ data.push({label:"Fat", data: [[3,4]]}) ;}

				if(self.myPreferences.isShowHistProtein)
				{ data.push({label:"Protein", data: [[5,6]]}) ;}

				if(self.myPreferences.isShowHistCarbs)
				{ data.push({label:"Carbs", data: [[7,8]]}) ;}

				if(data.length > 0) {

					//yaxis = {
					//	show: false};
                    //
					xaxis=  {
						mode: "time"
						,min: new Date(1990, 2, 0).getTime()
						,max: new Date().getTime()
					    , timeformat: "%b-%Y"
					, timezone: "browser"};
                    //
					//grid = { show: false};

					series = {
						bars: {
							show: true
						}};

					var options = {
						xaxis: xaxis, series: series
					};

						$.plot("#prefHistoryPlot", data, options);

				}



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

