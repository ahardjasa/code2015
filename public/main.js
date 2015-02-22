function FoodService() {

}

FoodService.prototype.random = function () {
	var cols = generics.cols;
	var food = generics.rows[Math.floor(Math.random() * generics.rows.length)];

	return new FoodItem(food[cols.indexOf('CATEGORY')], cols, food);
};

FoodService.prototype.menu = function (id) {
	if (treeTypes[id]) {
		var treeType = treeTypes[id];
		var categoryIndex = generics.cols.indexOf('CATEGORY');
		var fruit = generics.rows.find(function (f) {
			return f[categoryIndex] === treeType[0] && f[0] === treeType[1];
		});
		return [new FoodItem(fruit[categoryIndex], generics.cols, fruit)];
	}
	var menu = [];
	fatabase.rows.forEach(function (row) {
		if (row[0] === id) {
			menu.push(new FoodItem('asfd', fatabase.cols, row));
		}
	});
	return menu;
};

var foodService = new FoodService();

var treeTypes = {
	"apple": ['FRUIT AND FRUIT JUICES', 'Apple with skin (7cm.diam)'],
	"apricot": ['FRUIT AND FRUIT JUICES', 'Apricots, raw'],
	"berry": null,
	"cherry": null,
	"grape": ['FRUIT AND FRUIT JUICES', 'Grapes'],
	"hazelnut": null,
	"lemon": null,
	"peach": ['FRUIT AND FRUIT JUICES', 'Peach'],
	"pear": ['FRUIT AND FRUIT JUICES', 'Pear with skin'],
	"persimmon": null,
	"plum": ['FRUIT AND FRUIT JUICES', 'Plum'],
	"quince": null,
	"walnut": null
};

function RestaurantService() {

}

RestaurantService.prototype.nearby = function (lat, lng) {

	function rad(deg) {
		return deg * Math.PI / 180;
	}

	function distance(lat1d, long1d, lat2d, long2d) {
		var lat1 = rad(lat1d);
		var long1 = rad(long1d);
		var lat2 = rad(lat2d);
		var long2 = rad(long2d);
		return 6372.8 * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(long1 - long2))
	}

	var found = [];
	locations.forEach(function (loc) {
		var km = distance(loc[0], loc[1], lat, lng);
		if (km < 5) {
			found.push({
				lat: loc[0],
				lng: loc[1],
				name: loc[2], // these really need cleaning up - loc[3] is generally preferrable
				menu: loc[3],
				type: loc[4] || "restaurant",
				km: km
			});
		}
	});
	return found.sort(function (a, b) {
		return a.km - b.km;
	});
};

var restaurantService = new RestaurantService();


function MapModel() {
	this.state = 'new';
	this.markers = [];

	this.init = function () {
		var center = {lat: 49.2827, lng: -123.1207}; // defaulting to Vancouver
		this.map = new google.maps.Map(document.getElementById('map'), {
			center: center,
			zoom: 12,
			disableDefaultUI: true
		});
		var marker = new google.maps.Marker({
			position: center,
			title: 'Current Location',
			draggable: true,
			map: this.map,
			zIndex: 10
		});

		pageModel.nearbyRestaurants.subscribe(function (restaurants) {
			var i = 0;
			restaurants.forEach(function (loc) {
				var icon = (loc.menu in treeTypes) ? 'images/tree.png' : 'images/restaurant.png';
				if (i >= this.markers.length) {
					this.markers.push(new google.maps.Marker({
						icon: icon,
						position: loc,
						title: loc.name,
						map: this.map
					}));
				} else {
					this.markers[i].setPosition(loc);
					this.markers[i].setTitle(loc.name);
					this.markers[i].setIcon(icon);
				}
				i++;
			}, this);
			while (this.markers.length > i) {
				this.markers.pop().setMap(null);
			}
		}, this);

		pageModel.location(center);

		if (navigator.geolocation) {
			// TODO-NG: watch as I walk down the street
			navigator.geolocation.watchPosition(function (position) {
				var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				if (this.state === 'new') {
					this.state = 'follow';
					marker.setPosition(geolocate);
					this.map.setCenter(geolocate);
					pageModel.location({lat: geolocate.lat(), lng: geolocate.lng()})
				} else if (this.state === 'follow') {
					marker.setPosition(geolocate);
					this.map.panTo(geolocate);
					pageModel.location({lat: geolocate.lat(), lng: geolocate.lng()})
				}
			}.bind(this));
		}

		google.maps.event.addListener(marker, 'dragend', function (event) {
			this.state = 'pick';
			this.map.panTo(event.latLng);
			pageModel.location({lat: event.latLng.lat(), lng: event.latLng.lng()})
		}.bind(this));
	};

	this.panToLocation = function(event) {
		var points = new google.maps.LatLng(event.lat, event.lng);
		this.map.panTo(points);
	}
}

function FoodItem(source, columns, food) {
	this.weight = null;
	this.weightLabel = null;
	this.calories = null;
	this.caloriesLabel = null;
	this.protein = null;
	this.proteinLabel = null;
	this.carbs = null;
	this.carbsLabel = null;
	this.measureLabel = null;

	this.source = source;
	this.parseColumns(food, columns);
}

FoodItem.prototype.iconPath = function () {
	var folder = "images/icons/";
	switch (this.source.trim()) {
		case "BAKED GOODS":
			return folder + "baked.png";
		case "BEVERAGES":
			return folder + "drink.png";
		case "BREADS, CEREALS AND OTHER GRAIN PRODUCTS":
			return folder + "bread.png";
		case "DAIRY FOODS AND OTHER RELATED PRODUCTS":
			return folder + "dairy.png";
		case "EGGS AND EGG DISHES":
			return folder + "egg.png";
		case "FAST FOODS":
			return folder + "hero.png";
		case "FATS AND OILS":
			return folder + "cheese.png";
		case "FISH AND SHELLFISH":
			return folder + "fish.png";
		case "FRUIT AND FRUIT JUICES":
			return folder + "fruit.png";
		case "LEGUMES, NUTS AND SEEDS":
			return folder + "nuts.png";
		case "MEAT AND POULTRY":
			return folder + "meat.png";
		case "MISCELLANEOUS FOODS":
			return folder + "sauce.png";
		case "MIXED DISHES":
			return folder + "mixeddishes.png";
		case "SNACKS":
			return folder + "snacks.png";
		case "SOUPS":
			return folder + "soup.png";
		case "SWEETS AND SUGARS":
			return folder + "candy.png";
		case "VEGETABLES AND VEGETABLE PRODUCTS":
			return folder + "vegetables.png";
		default:
			return folder + "132.png";
	}
};

FoodItem.prototype.parseColumns = function (food, columns) {
	var i;
	for (i = 0; i < columns.length; i++) {
		var columnAttributes = columns[i];
		var columnItems = /([^(]+)(\((.*)\))?/.exec(columnAttributes);
		var columnName = columnItems[1].trim().toLowerCase();
		var columnUnit = "";
		if (columnItems[3] != null) {
			columnUnit = columnItems[3].trim().toLowerCase();
		}
		var amount = food[i];
		var amountLabel = getAttributeLabel(amount, columnUnit);

		switch(columnName) {
			case ("food name"):
				this.name = amount;
				this.nameLabel = amountLabel;
				break;
			case ("measure"):
				this.measure = amount;
				if (amount == 1) {
					amountLabel = null;
				}
				this.measureLabel = amountLabel;
				break;
			case ("meal name"):
				this.name = amount;
				this.nameLabel = amountLabel;
				break;
			case ("weight"):
				this.weight = amount;
				this.weightLabel = amountLabel;
				break;
			case ("energy"):
				if (columnUnit === "kcal") {
					this.calories = amount;
					this.caloriesLabel = amountLabel;
				}
				break;
			case ("calories"):
				this.calories = amount;
				this.caloriesLabel = amountLabel;
				break;
			case ("protein"):
				this.protein = amount;
				this.proteinLabel = amountLabel;
				break;
			case ("carbs"):
				this.carbs = amount;
				this.carbsLabel = amountLabel;
				break;
			case ("carbohydrate"):
				this.carbs = amount;
				this.carbsLabel = amountLabel;
				break;
			case ("total sugar"):
				this.sugar = amount;
				this.sugarLabel = amountLabel;
				break;
			case ("sugars"):
				this.sugar = amount;
				this.sugarLabel = amountLabel;
				break;
			case ("fat"):
				this.totalFat = amount;
				this.totalFatLabel = amountLabel;
				break;
			case ("total fat"):
				this.totalFat = amount;
				this.totalFatLabel = amountLabel;
				break;
			case ("trans fats"):
				this.transFat = amount;
				this.transFatLabel = amountLabel;
				break;
			case ("trans fat"):
				this.transFat = amount;
				this.transFatLabel = amountLabel;
				break;
			case ("saturated fat"):
				this.saturatedFat = amount;
				this.saturatedFatLabel = amountLabel;
				break;
			case ("cholesterol"):
				this.cholesterol = amount;
				this.cholesterolLabel = amountLabel;
				break;
			case ("monounsaturated fat"):
				this.monoFat = amount;
				this.monoFatLabel = amountLabel;
				break;
			case ("polyunsaturated fat"):
				this.polyFat = amount;
				this.polyFatLabel = amountLabel;
				break;
			case ("sodium"):
				this.sodium = amount;
				this.sodiumLabel = amountLabel;
				break;
			case ("magnesium"):
				this.magnesium = amount;
				this.magnesiumLabel = amountLabel;
				break;
			case ("calcium"):
				this.calcium = amount;
				this.calciumLabel = amountLabel;
				break;
			case ("iron"):
				this.iron = amount;
				this.ironLabel = amountLabel;
				break;
			case ("sodium"):
				this.iron = amount;
				this.ironLabel = amountLabel;
				break;
			case ("total dietary fibre"):
				this.fibre = amount;
				this.fibreLabel = amountLabel;
				break;
			default:
				break;
		}
	}
};

function getAttributeLabel(amount, unit) {
	if (amount === "tr") {
		return "(trace)";
	} else if (!unit || unit === "kcal") {
		return amount;
	}
	return amount + unit;
}

function BasicProfile(portion) {
	var self = this;
	self.portion = ko.observable(portion);
}

function trimDigits(num, sigAmount) {
	return num == null ? null : num.toFixed(sigAmount);
}

function PageModel() {
	this.location = ko.observable();

	this.nearbyRestaurants = ko.computed(function () {
		var loc = this.location();
		return loc ? restaurantService.nearby(loc.lat, loc.lng) : [];
	}, this);

	this.addedFoodItems = ko.observableArray();
	this.nearbyFoodItems = ko.computed(function () {
		var items = [];
		var seen = {};
		this.nearbyRestaurants().forEach(function (restaurant) {
			if (!seen[restaurant.menu]) {
				seen[restaurant.menu] = true;
				foodService.menu(restaurant.menu).forEach(function (food) {
					// this isn't quite right
					// a generic food can be in multiple menus, and we'd get duplicates
					food.from = restaurant;
					items.push(food);
				});
			}
		});
		return items;
	}, this);

	this.sortOrder = ko.observable("CaloriesAsc");

	this.sortCal = function() {
		if(this.sortOrder() === "CaloriesAsc") {this.sortOrder("CaloriesDes");}
		else {this.sortOrder("CaloriesAsc");}
	};

	this.sortCarb = function() {
		if(this.sortOrder() === "CarbsAsc") {this.sortOrder("CarbsDes");}
		else {this.sortOrder("CarbsAsc");}
	};

	this.sortProt = function() {
		if(this.sortOrder() === "ProteinAsc") {this.sortOrder("ProteinDes");}
		else {this.sortOrder("ProteinAsc");}
	};

	this.sortFat = function() {
		if(this.sortOrder() === "FatAsc") {this.sortOrder("FatDes");}
		else {this.sortOrder("FatAsc");}
	};

	this.sortDistance = function() {
		if(this.sortOrder() === "DistanceAsc") {this.sortOrder("DistanceDes");}
		else {this.sortOrder("DistanceAsc");}
	};

	var self = this;

	this.SortMagic = function(a, b)
	{
		switch(self.sortOrder()) {
			case ("CaloriesAsc"):
				if(isNaN(a.calories)) return -1;
				if(isNaN(b.calories)) return 1;
				return a.calories - b.calories;
				break;
			case ("CaloriesDes"):
				if(isNaN(a.calories)) return 1;
				if(isNaN(b.calories)) return -1;
				return b.calories - a.calories;
			case ("CarbsAsc"):
				if(isNaN(a.carbs)) return -1;
				if(isNaN(b.carbs)) return 1;
				return a.carbs - b.carbs;
			case ("CarbsDes"):
				if(isNaN(a.carbs)) return 1;
				if(isNaN(b.carbs)) return -1;
				return b.carbs - a.carbs;
			case ("FatAsc"):
				if(isNaN(a.totalFat)) return -1;
				if(isNaN(b.totalFat)) return 1;
				return a.totalFat - b.totalFat;
			case ("FatDes"):
				if(isNaN(a.totalFat)) return 1;
				if(isNaN(b.totalFat)) return -1;
				return b.totalFat - a.totalFat;
			case ("ProteinAsc"):
				if(isNaN(a.protein)) return -1;
				if(isNaN(b.protein)) return 1;
				return a.protein - b.protein;
			case ("ProteinDes"):
				if(isNaN(a.protein)) return 1;
				if(isNaN(b.protein)) return -1;
				return b.protein - a.protein;
			case ("DistanceAsc"):
				return a.from.km - b.from.km;
			case ("DistanceDes"):
				return b.from.km - a.from.km;
			case ("Smart"):
			default:
				return a.calories - b.calories;
		}
	};

	this.FilterMagic = function(element)
	{
		if(element.from.type === "restaurant" && !self.preferences.myPreferences.isRestaurants()) return false;
		else if(element.from.type === "tree" && !self.preferences.myPreferences.isFruitTrees()) return false;
		return true;

	};

	this.foodItems = ko.computed(function () {
		var items = this.addedFoodItems().concat(this.nearbyFoodItems()).filter(this.FilterMagic).sort(this.SortMagic);
		items.length = Math.min(items.length, 100); // *everything* can be a very long list
		return items;
	}, this);




	this.profile = new BasicProfile(1);
	this.map = new MapModel(this.foodService, this.nearbyFoodItems);
	this.preferences = new PreferencesViewModel();

	this.totalCalories = ko.computed(function () {
		return this.foodItems().reduce(function (total, item) {
			return total + item.calories;
		}, 0);
	}, this);
}

PageModel.prototype.addRandomFood = function () {
	var food = foodService.random();
	food.from = { name: "wherever fine foods can be found" };
	this.addedFoodItems.push(food);
};

var pageModel = new PageModel();

$(function () {
	pageModel.map.init();
	ko.applyBindings(pageModel);
});
