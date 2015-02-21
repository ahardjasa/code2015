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

	return locations.filter(function (loc) {
		var km = distance(loc[0], loc[1], lat, lng);
		return km < 5;
	}).map(function (loc) {
		return {
			lat: loc[0],
			lng: loc[1],
			name: loc[3],
			menu: loc[3]
		}
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
				var icon = (loc.menu in treeTypes) ? 'images/tree-60-32.png' : 'images/restaurant-4-32.png';
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
}

function FoodItem(source, columns, food) {
	this.weight = null;
	this.calories = null;
	this.protein = null;
	this.carbs = null;

	this.source = source;
	this.columns = columns;
	this.iconPath = function() {
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
	this.parseColumns(food);
}

FoodItem.prototype.parseColumns = function (food) {
	var i;
	for (i = 0; i < this.columns.length; i++) {
		var columnAttr = this.columns[i];
		var columnItems = /([^(]+)(\((.*)\))?/.exec(columnAttr);
		var columnName = columnItems[1].trim().toLowerCase();
		var columnUnit = "";
		if (columnItems[3] != null) {
			columnUnit = columnItems[3].trim().toLowerCase();
		}
		var foodAttribute = getAttributeLabel(food[i], columnUnit);

		//debugger;
		switch(columnName) {
			case ("food name"):
				this.name = foodAttribute;
				break;
			case ("meal name"):
				this.name = foodAttribute;
				break;
			case ("weight"):
				this.weight = foodAttribute;
				break;
			case ("energy"):
				if (columnUnit === "kcal") {
					this.calories = foodAttribute;
				}
				break;
			case ("calories"):
				this.calories = foodAttribute;
				break;
			case ("protein"):
				this.protein = foodAttribute;
				break;
			case ("carbs"):
				this.carbs = foodAttribute;
				break;
			case ("carbohydrate"):
				this.carbs = foodAttribute;
				break;
			case ("total sugar"):
				this.sugar = foodAttribute;
				break;
			case ("sugars"):
				this.sugar = foodAttribute;
				break;
			case ("fat"):
				this.totalFat = foodAttribute;
				break;
			case ("total fat"):
				this.totalFat = foodAttribute;
				break;
			case ("trans fats"):
				this.transFat = foodAttribute;
				break;
			case ("trans fat"):
				this.transFat = foodAttribute;
				break;
			case ("saturated fat"):
				this.saturatedFat = foodAttribute;
				break;
			case ("cholesterol"):
				this.cholesterol = foodAttribute;
				break;
			case ("monounsaturated fat"):
				this.monoFat = foodAttribute;
				break;
			case ("polyunsaturated fat"):
				this.polyFat = foodAttribute;
				break;
			case ("sodium"):
				this.sodium = foodAttribute;
				break;
			case ("magnesium"):
				this.magnesium = foodAttribute;
				break;
			case ("calcium"):
				this.calcium = foodAttribute;
				break;
			case ("iron"):
				this.iron = foodAttribute;
				break;
			case ("total dietary fibre"):
				this.fibre = foodAttribute;
				break;
			default:
				break;
		}
	}
};

function getAttributeLabel(amount, unit) {
	if (amount === "tr") {
		return "(trace)";
	} else {
		if (unit === "kcal") {
			return amount;
		}
		return amount + unit;
	}
}

function BasicProfile(portion) {
	var self = this;
	self.portion = ko.observable(portion);
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
		this.nearbyRestaurants().forEach(function (restaurant) {
			foodService.menu(restaurant.menu).forEach(function (food) {
				// if not already contains?
				items.push(food);
			})
		});
		return items;
	}, this);
	this.foodItems = ko.computed(function () {
		var all = this.addedFoodItems().concat(this.nearbyFoodItems());
		all.length = 20;
		return all;
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
	this.addedFoodItems.push(foodService.random());
};

var pageModel = new PageModel();

$(function () {
	pageModel.map.init();
	ko.applyBindings(pageModel);
});
