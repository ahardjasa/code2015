#!/usr/bin/env python3

import codecs
import sys
import csv
import json


def clean(text):
    try:
        return float(text)
    except Exception:
        return text


def parse(input_file, output_file=None):
    name = None
    columns = None
    units = None
    foods = []

    with codecs.open(input_file, encoding='latin_1') as ifh:
        reader = csv.reader(ifh)

        for i, row in enumerate(reader):
            if row[0].startswith('Nutrient Value of Some Common Foods'):
                continue
            elif not name:
                name = row[0]
            elif not columns:
                assert(row[1] == 'Measure')
                columns = row
            elif not units and row[2] == 'g':
                units = row
            elif row[4]:
                foods.append([clean(c) for c in row])

    if not units:
        cols_with_unit = [(c, None) for c in columns]
    else:
        cols_with_unit = [(columns[c], unit) for c, unit in enumerate(units)]

    if output_file:
        with open(output_file, 'w') as ofh:

            json.dump(dict(name=name, columns=cols_with_unit, foods=foods), ofh, sort_keys=True)

if __name__ == '__main__':
    parse(*sys.argv[1:])
