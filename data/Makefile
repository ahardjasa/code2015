all: ../public/data/generics.js ../public/data/locations.js ../public/data/fatabase.js

../public/data/fatabase.js: fatabase.txt fatabase_processor.py
	echo 'var fatabase = ' > $@
	./fatabase_processor.py >> $@
	echo ';' >> $@

../public/data/generics.js: combined_nutrient_value_2008.csv combined_nutrient_value_processor.py
	echo 'var generics = ' > $@
	./combined_nutrient_value_processor.py >> $@
	echo ';' >> $@

nutrient_value_search.json:
	curl 'http://open.canada.ca/data/en/api/3/action/package_search?q=nutrient+value' -o $@

.PHONY: download_nutrient_value_csvs
download_nutrient_value_csvs: nutrient_value_search.json
	jq -r '.result.results[].resources[].url ' nutrient_value_search.json | grep -eng.csv | xargs wget -P nutrient_value_2008/

../public/data/locations.js: vancouver_foodtrees.csv vancouver_fatabase_restaurants.json surrey/fatabase_restaurants.json
	(echo 'var locations = ['; \
		sed -e 's/\r//' -e '1d;s/^/\[/' -e 's/$$/\],/' vancouver_foodtrees.csv; \
		cat vancouver_fatabase_restaurants.json; \
		cat surrey/fatabase_restaurants.json; \
	echo '];') > $@

business_licences_csv.zip:
	wget -N ftp://webftp.vancouver.ca/OpenData/csv/business_licences_csv.zip

business_licenses.csv: business_licences_csv.zip
	unzip -D -o business_licences_csv.zip

#fatabase_restaurants.txt: fatabase.csv
#	awk -F, '{print $$3}' $< | grep -v 'Meal Name' | sort -u > $@

vancouver_fatabase_restaurants.json: business_licence_processor.py fatabase_restaurants.txt business_licenses.csv
	./business_licence_processor.py | sed -e 's/$$/,/' > $@

surrey/restaurants_json.zip:
	wget -P surrey -N http://cosmos.surrey.ca/geo_ref/Images/OpenDataArchives/restaurants_json.zip

surrey/restaurants.json: surrey/restaurants_json.zip
	cd surrey && unzip -D -o restaurants_json.zip

surrey/fatabase_restaurants.json: surrey/restaurants.json surrey/business_licence_processor.py
	(cd surrey && ./business_licence_processor.py) | sed -e 's/$$/,/' > $@
