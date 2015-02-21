all: ../public/data/everything.js

.PHONY: clean
clean:
	rm -f everything.js legumes.json mixed_dishes.json

../public/data/everything.js: everything.js
	cp $< $@

legumes.json: nutrient_value_legumes_nuts_and_seeds_2008.csv
	./nutrient_value_processor.py $< $@

mixed_dishes.json: nutrient_value_mixed_dishes_2008.csv
	./nutrient_value_processor.py $< $@

everything.js: legumes.json mixed_dishes.json
	echo 'var everything = [' > $@
	cat legumes.json >> $@
	echo ',' >> $@
	cat mixed_dishes.json >> $@
	echo '];' >> $@
