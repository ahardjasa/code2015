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

	self.GetDay = function() {};
}

