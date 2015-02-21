all: ../public/data/everything.js

.PHONY: clean
clean:
	rm everything.js legumes.json

../public/data/everything.js: everything.js
	cp $< $@

legumes.json: nutrient_value_legumes_nuts_and_seeds_2008.csv
	./nutrient_value_processor.py $< $@

everything.js: legumes.json
	echo 'var everything = [' > $@
	cat legumes.json >> $@
	echo '];' >> $@
