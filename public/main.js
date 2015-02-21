function FoodService() {

}

FoodService.prototype.random = function () {
	// FIXME: uneven weighting
	var file = everything[Math.floor(Math.random() * everything.length)];
	var food = file.foods[Math.floor(Math.random() * file.foods.length)];

	// FIXME: use columns
	return new FoodItem(file.name, food);
};

FoodService.prototype.menu = function (id) {
	if (treeTypes[id]) {
		var fruits = everything.find(function (nv) {
			return nv.name === treeTypes[id][0];
		});
		var fruit = fruits.foods.find(function (f) {
			return f[0] === treeTypes[id][1];
		});
		return [new FoodItem(fruits.name, fruit)];
	}
	return [];
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
			map: this.map
		});

		pageModel.nearbyRestaurants.subscribe(function (restaurants) {
			var i = 0;
			restaurants.forEach(function (loc) {
				if (i >= this.markers.length) {
					this.markers.push(new google.maps.Marker({
						icon: 'images/tree-60-32.png',
						position: loc,
						title: loc.name,
						map: this.map
					}));
				} else {
					this.markers[i].setPosition(loc);
					this.markers[i].setTitle(loc.name);
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

function FoodItem(source, food) {
	this.source = source;
	this.name = food[0];
	this.weight = food[2];
	this.calories = food[3];
	this.protein = getValue(food[5], "g");
	this.carbs = getValue(food[6], "g");
	this.sugar = getValue(food[7], "g");
	this.fiber = getValue(food[8], "g");
	this.totalFat = getValue(food[9], "g");
	this.satFat = getValue(food[10], "g");
	this.cholesterol = getValue(food[11], "g");
	this.calcium = getValue(food[12], "g");
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
				return "";
		};
	}
}

function getValue(amount, unit) {
	if (amount === "tr") {
		return "Trace amounts of ";
	} else {
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
		return this.addedFoodItems().concat(this.nearbyFoodItems());
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
