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
    foods = []

    with codecs.open(input_file, encoding='latin_1') as ifh:
        reader = csv.reader(ifh)

        for i, row in enumerate(reader):
            if i == 2:
                name = row[0]
            elif i == 3:
                columns = row
            elif i == 4:
                for c, unit in enumerate(row):
                    columns[c] = (columns[c], unit)
            elif row[4]:
                foods.append([clean(c) for c in row])

    if output_file:
        with open(output_file, 'w') as ofh:
            json.dump(dict(name=name, columns=columns, foods=foods), ofh)

if __name__ == '__main__':
    parse(*sys.argv[1:])
