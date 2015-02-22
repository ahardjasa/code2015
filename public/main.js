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
	healthyfamiliesbc.rows.forEach(function (row) {
		if (row[row.length - 1] === id) {
			menu.push(new FoodItem('hfbc', healthyfamiliesbc.cols, row));
		}
	});
	// ignore overlap between hfbc and fatabase
	if (menu.length) {
		return menu;
	}
	fatabase.rows.forEach(function (row) {
		if (row[0] === id) {
			menu.push(new FoodItem('fatabase', fatabase.cols, row));
		}
	});
	menus.rows.forEach(function (row) {
		if (row[1] === id) {
			menu.push(new FoodItem('menus', menus.cols, row));
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

	var desired = pageModel.desiredTypes();
	var found = [];
	locations.forEach(function (loc) {
		var type = loc[4] || 'restaurant';
		if (desired.indexOf(type) === -1) {
			return;
		}

		var km = distance(loc[0], loc[1], lat, lng);
		if (km < 5) {
			found.push({
				lat: loc[0],
				lng: loc[1],
				name: loc[2], // these really need cleaning up - loc[3] is generally preferrable
				menu: loc[3],
				type: type,
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
	this.popup = null;

	this.init = function () {
		var center = {lat: 49.2827, lng: -123.1207}; // defaulting to Vancouver
		this.map = new google.maps.Map(document.getElementById('map'), {
			center: center,
			zoom: 15,
			disableDefaultUI: true
		});
		this.currentUserMarker = new google.maps.Marker({
			position: center,
			title: 'Current Location',
			draggable: true,
			map: this.map,
			zIndex: 10
		});

		function icon(loc) {
			if (loc.type === "restaurant") {
				return 'images/restaurant.png';
			} else if (loc.type === "tree") {
				return 'images/tree.png';
			} else if (loc.type === "truck") {
				return 'images/truck.png';
			}
			return 'images/restaurant.png'; // what else is there?
		}

		// notice when the map region size changes
		pageModel.expanded.subscribe(function () {
			google.maps.event.trigger(this.map, 'resize');
			setTimeout(function () {
				google.maps.event.trigger(this.map, 'resize');
			}.bind(this), 1000);
		}, this);

		pageModel.nearbyRestaurants.subscribe(function (restaurants) {
			while (this.markers.length) {
				this.markers.pop().setMap(null);
			}
			restaurants.forEach(function (loc) {
				var marker = new google.maps.Marker({
					icon: icon(loc),
					position: loc,
					title: loc.name,
					map: this.map
				});
				loc.marker = marker;
				this.markers.push(marker);

				google.maps.event.addListener(marker, 'click', function () {
					this.popupOver(loc);
				}.bind(this));
			}, this);
		}, this);

		pageModel.location(center);

		if (navigator.geolocation) {
			// TODO-NG: watch as I walk down the street
			navigator.geolocation.watchPosition(function (position) {
				var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				if (this.state === 'new') {
					this.state = 'follow';
					this.currentUserMarker.setPosition(geolocate);
					this.map.setCenter(geolocate);
					pageModel.location({lat: geolocate.lat(), lng: geolocate.lng()})
				} else if (this.state === 'follow') {
					this.currentUserMarker.setPosition(geolocate);
					this.map.panTo(geolocate);
					pageModel.location({lat: geolocate.lat(), lng: geolocate.lng()})
				}
			}.bind(this));
		}

		google.maps.event.addListener(this.currentUserMarker, 'dragend', function (event) {
			this.state = 'pick';
			this.map.panTo(event.latLng);
			pageModel.location({lat: event.latLng.lat(), lng: event.latLng.lng()})
		}.bind(this));
	};

	this.panToLocation = function (from) {
		window.scrollTo(0, 0);
		if (from && from.marker) {
			this.map.panTo(new google.maps.LatLng(from.lat, from.lng));
			this.popupOver(from);
		}
	};

	this.popupOver = function (loc) {
		if (this.popup) {
			this.popup.close();
		}
		this.popup = new google.maps.InfoWindow({
			content: loc.name
		});
		this.popup.open(this.map, loc.marker);
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
	this.totalHealthIndex = this.GetTotalHealthIndex();
}

FoodItem.prototype.GetTotalHealthIndex = function()
{
	//get recommended values
	var indices = pageModel.preferences.myUser.healthIndeces();

	var weight = (this.weight === null) ? this.calories/6 : this.weight;
	var fibreRatio = this.fibre/weight;
	var reqFibreRatio = 0.3;
	var Gfibre = 1;

	var totalfibreRatio = fibreRatio/reqFibreRatio;
	var fibreDiff = fibreRatio - reqFibreRatio;
	var overrunFibreFactor = fibreDiff > 0 ? Gfibre * fibreDiff : 0;
	var fibreFactor = Math.min(1,totalfibreRatio) + overrunFibreFactor;

	if(this.name.indexOf("Peppercorn" ) > -1)
	{
		var i = 5;
	}
	fibreFactor = isNaN(fibreFactor) ? 0 : fibreFactor;

	var fatRatio = this.totalFat/weight;
	var reqFatRatio = 0.35;
	var minFatRatio = 0.1;
	var Gfat = -1;

	var totalfatRatio = fatRatio/reqFatRatio;
	var fatDiff = fatRatio - reqFatRatio;
	var overrunFatFactor = fatDiff > 0 ? Gfat * fatDiff : 0;


	var unhealthyFatRatio = fatRatio/minFatRatio;
	var unhealthyFatDiff = unhealthyFatRatio - minFatRatio;
	var unhealthyOverrunFat = unhealthyFatDiff > 0 ? 2*Gfat*unhealthyFatDiff : 0;

	var fatFactor = Math.min(1,totalfatRatio) + overrunFatFactor + unhealthyOverrunFat;
	fatFactor = isNaN(fatFactor) ? 0 : fatFactor;

	var carbRatio = this.carbs/weight;
	var reqCarbRatio = 0.20;
	var Gcarb = -1;

	var totalCarbRatio = carbRatio/reqCarbRatio;
	var carbDiff = carbRatio - reqCarbRatio;
	var overrunCarbFactor = carbDiff > 0 ? Gcarb * carbDiff : 0;
	var carbFactor = Math.min(1,totalCarbRatio) + overrunCarbFactor;

	carbFactor = isNaN(carbFactor) ? 0 : carbFactor;

	var proteinRatio = this.protein/weight;
	var reqProteinRatio = 0.15;
	var Gprot = 1;

	var totalProteinRatio = proteinRatio/reqProteinRatio;
	var proteinDiff = proteinRatio - reqProteinRatio;
	var overrunProteinFactor = proteinDiff > 0 ? Gprot * proteinDiff : 0;
	var proteinFactor = Math.min(1,totalProteinRatio) + overrunProteinFactor;

	proteinFactor = isNaN(proteinFactor) ? 0 : proteinFactor;





	return 10* fibreFactor + 0.5* fatFactor + 0.5 *carbFactor + 1* proteinFactor;
	//var sprotein = 2;
	//var scarbs = -2;
	//var sfibre = 4;
	//var sfat = -1;
	//var proteinScore = isNaN(this.protein) ? 0 :  sprotein * (1 - Math.min(1, this.protein / indices[2]));
	//var carbScore = isNaN(this.carbs) ? 0 : scarbs * (1 - Math.min(1, this.carbs / indices[1]));
	//var fibreScore = isNaN(this.fibre) ? 0: sfibre * (1 - Math.min(1, this.fibre / indices[4]));
	//var	fatScore = isNaN(this.fat) ? 0: sfat * (1 - Math.min(1, this.fat / indices[3]));
    //
	//console.log(this.name + ";" + this.protein + ";" + proteinScore + ";" + this.carbs + ";" + carbScore + ";" + this.fibreScore + ";" + fibreScore + ";" + this.fat + ";" + fatScore);
	//return proteinScore + carbScore + fibreScore + fatScore;
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
		if (/^[<>]\d+(\.\d+)?$/.test(amount)) {
			amount = parseFloat(amount.substr(1));
		}

		switch(columnName) {
			case "food name":
			case "menu items":
			case "meal name":
			case "mealname":
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
			case "weight":
			case "serving size":
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
			case "carbs":
			case "carbohydrate":
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
			case "fat":
			case "total fat":
				this.totalFat = amount;
				this.totalFatLabel = amountLabel;
				break;
			case "trans fats":
			case "trans fat":
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
	this.expanded = ko.observable('hunger');
	this.toggleExpanded = function (v) {
		if (this.expanded() == v) {
			this.expanded(null);
		} else {
			this.expanded(v);
		}
	};
	this.desiredTypes = ko.observableArray(['truck', 'tree', 'restaurant']);
	this.search = ko.observable();

	this.nearbyRestaurants = ko.computed(function () {
		var loc = this.location();
		return loc ? restaurantService.nearby(loc.lat, loc.lng) : [];
	}, this);

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

	this.sortOrder = ko.observable('totalHealthIndex');
	this.sortDesc = ko.observable(true);

	this.sortBy = function (field) {
		if (this.sortOrder() === field) {
			this.sortDesc(!this.sortDesc())
		} else {
			this.sortOrder(field);
			this.sortDesc(true);
		}
	};

	function buildSortFunction(prop, reverse) {
		if (prop == 'distance') {
			var sort = function (a, b) {
				return a.from.km - b.from.km;
			};
		} else {
			var sort = function (a, b) {
				if (isNaN(a[prop])) {
					if (isNaN(b[prop])) {
						return 0;
					}
					return -1;
				} else if (isNaN(b[prop])) {
					return 1;
				}
				return a[prop] - b[prop];
			};
		}
		if (reverse) {
			return function (a, b) {
				return sort(b, a);
			}
		}
		return sort;
	}

	this.foodItems = ko.computed(function () {
		var items = this.nearbyFoodItems();
		// search
		return items;
	}, this);

	this.sortedFoodItems = ko.computed(function () {
		var items = this.foodItems().sort(buildSortFunction(this.sortOrder(), this.sortDesc()));
		items.length = Math.min(items.length, 100); // *everything* can be a very long list
		return items;
	}, this);

	this.profile = new BasicProfile('1');
	this.map = new MapModel();
	this.preferences = new PreferencesViewModel();

	this.totalCalories = ko.computed(function () {
		return this.foodItems().reduce(function (total, item) {
			return total + item.calories;
		}, 0);
	}, this);
}

var pageModel = new PageModel();

$(function () {
	pageModel.map.init();
	ko.applyBindings(pageModel);
});
