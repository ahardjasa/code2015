function MapModel() {
	this.init = function () {
		var center = {lat: -34.397, lng: 150.644}; // pick a better default
		this.map = new google.maps.Map(document.getElementById('map'), {
			center: center,
			zoom: 12,
			disableDefaultUI: true
		});
		var marker = new google.maps.Marker({
			position: center,
			title: "!",
			draggable: true
		});
		marker.setMap(this.map);

		var first = true;
		if (navigator.geolocation) {
			// TODO-NG: watch as I walk down the street
			navigator.geolocation.watchPosition(function (position) {
				console.log(position);
				var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				if (first) {
					this.map.setCenter(geolocate);
					first = false;
				} else {
					this.map.panTo(geolocate);
				}
				marker.setPosition(geolocate);
			}.bind(this));
		}
	};
}

function FoodItem(source, name, calories) {
	this.source = source;
	this.name = name;
	this.calories = calories;
}

function BasicProfile(portion) {
	var self = this;
	self.portion = ko.observable(portion);
}

function PageModel() {
	this.profile = new BasicProfile(1);
	this.map = new MapModel();
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
	// FIXME: uneven weighting
	var file = everything[Math.floor(Math.random() * everything.length)];
	var food = file.foods[Math.floor(Math.random() * file.foods.length)];

	// FIXME: use columns
	this.foodItems.push(new FoodItem(file.name, food[0], food[3]));
};

var model = new PageModel();

$(function () {
	model.map.init();
	ko.applyBindings(model);
});
