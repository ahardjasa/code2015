OUTPUTS=generics locations fatabase healthyfamiliesbc menus

all: $(addsuffix .js,$(addprefix ../public/data/,$(OUTPUTS)))

../public/data/fatabase.js: fatabase.txt fatabase_processor.py
	echo 'var fatabase = ' > $@
	./fatabase_processor.py >> $@
	echo ';' >> $@

../public/data/healthyfamiliesbc.js: healthyfamiliesbc.csv csv_to_json.py
	echo 'var healthyfamiliesbc = ' > $@
	./csv_to_json.py $< >> $@
	echo ';' >> $@

../public/data/menus.js: meals_menus.csv csv_to_json.py
	echo 'var menus = ' > $@
	./csv_to_json.py $< >> $@
	echo ';' >> $@

../public/data/generics.js: combined_nutrient_value_2008.csv combined_nutrient_value_processor.py
	echo 'var generics = ' > $@
	./combined_nutrient_value_processor.py >> $@
	echo ';' >> $@

../public/data/locations.js: locations_processor.py fatabase.txt healthyfamiliesbc.csv meals_menus.csv foodtrucks.csv business_licences.csv surrey/restaurants.json
	(echo 'var locations = ['; \
		sed -e 's/\r//' -e '1d;s/^/\[/' -e 's/$$/,"tree"\],/' vancouver_foodtrees.csv; \
		./locations_processor.py | sed -e 's/$$/,/'; \
	echo '];') > $@

#
# downloading data
#

nutrient_value_search.json:
	curl 'http://open.canada.ca/data/en/api/3/action/package_search?q=nutrient+value' -o $@

.PHONY: download_nutrient_value_csvs
download_nutrient_value_csvs: nutrient_value_search.json
	jq -r '.result.results[].resources[].url ' nutrient_value_search.json | grep -eng.csv | xargs wget -P nutrient_value_2008/

business_licences_csv.zip:
	wget -N ftp://webftp.vancouver.ca/OpenData/csv/business_licences_csv.zip

business_licenses.csv: business_licences_csv.zip
	unzip -D -o business_licences_csv.zip

surrey/restaurants_json.zip:
	wget -P surrey -N http://cosmos.surrey.ca/geo_ref/Images/OpenDataArchives/restaurants_json.zip

surrey/restaurants.json: surrey/restaurants_json.zip
	cd surrey && unzip -D -o restaurants_json.zip
