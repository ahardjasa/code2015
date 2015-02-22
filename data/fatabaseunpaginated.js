var fs = require('fs');
var casper = require('casper').create({
	verbose: true,
	logLevel: 'info',
	pageSettings: {
		loadImages: false
	}
});
var i = 0;
var links = [];

function getRestaurantLinks(){
	var links = document.querySelectorAll('div[id="fatabase-listings"] a')
return [].map.call(links, function(link) {
	return link.getAttribute('href');
	});
}

function loopThroughRestaurantLinks() {
	if (i < links.length) {
		this.echo('[LINK #' + i + '] ' + links[i]);
		getFoodData.call(this, links[i]);
		i++;
		this.run(loopThroughRestaurantLinks);
	}
	else {
		this.echo("Done");
		this.exit();
	}
}

function getFoodData(link){
	this.start(link, function(){
		var food_table = this.evaluate(function() {
			var nodes = document.querySelectorAll('table[id^="cbTable"] tbody tr');
			return [].map.call(nodes, function(node) { // Alternatively: return Array.prototype.map.call(...
				var cells = node.childNodes;
				return [].map.call(cells, function(cell){
					return cell.textContent;
				});
			});
		});
		var filterfn = function (x) {
			return x.length == 9;
		};
		var filtered_food_table = food_table.filter(filterfn);

		var food_data = filtered_food_table.map(function(array) {
			return JSON.stringify(array)

		});

		//require('utils').dump(food_data);
		fs.write("fatabase.txt", food_data, 'a');

	})
}


casper.start('http://www.vancouversun.com/life/food/fatabase/index.html', function() {
links = this.evaluate(getRestaurantLinks);
	for (var i = 0; i < links.length; i++) {
		links[i] = "http://www.vancouversun.com/life/food/fatabase/" + links[i];
	}
	require('utils').dump(links);
		});

casper.run(loopThroughRestaurantLinks);
