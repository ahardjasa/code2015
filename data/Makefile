all: ../public/data/everything.js ../public/data/locations.js

.PHONY: clean
clean:
	rm -f everything.js nutrient_value_2008/*

../public/data/everything.js: everything.js
	cp $< $@

everything.js: $(patsubst %.csv,%.json,$(wildcard nutrient_value_2008/*.csv))
	echo 'var everything = [' > $@
	for f in nutrient_value_2008/*.json; do cat $$f >> $@; echo ',' >> $@ ; done
	echo '];' >> $@

nutrient_value_search.json:
	curl 'http://open.canada.ca/data/en/api/3/action/package_search?q=nutrient+value' -o $@

.PHONY: download_nutrient_value_csvs
download_nutrient_value_csvs: nutrient_value_search.json
	jq -r '.result.results[].resources[].url ' nutrient_value_search.json | grep -eng.csv | xargs wget -P nutrient_value_2008/

../public/data/locations.js: locations.js
	cp $< $@

locations.js: vancouver_foodtrees.csv
	(echo 'var locations = ['; sed -e '1d;s/^/\[/' -e 's/$$/\],/' vancouver_foodtrees.csv; echo '];') > $@
