#!/usr/bin/env python

import sys
import csv
import json


def parse(input_file, output_file=None):
    foods = []

    with open(input_file) as ifh:
        reader = csv.reader(ifh)

        for i, row in enumerate(reader):
            if i == 1:
                name = row[0]
            elif i == 2:
                columns = row
            elif i == 3:
                for c, unit in enumerate(row):
                    if unit == '\xb5g':
                        unit = u'\u00b5g'
                    columns[c] = (columns[c], unit)
            elif row[4]:
                foods.append(row)

    if output_file:
        with open(output_file, 'w') as ofh:
            json.dump(dict(name=name, columns=columns, foods=foods), ofh)

if __name__ == '__main__':
    parse(*sys.argv[1:])
