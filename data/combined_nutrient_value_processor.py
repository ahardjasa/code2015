#!/usr/bin/env python3

import codecs
import csv
import json


def clean(text):
    text = text.strip()
    try:
        return float(text)
    except Exception:
        return text


def main():
    with codecs.open('combined_nutrient_value_2008.csv', encoding='latin_1') as ifh:
        reader = csv.reader(ifh)

        for i, row in enumerate(reader):
            if i == 0:
                print('{"cols": ' + json.dumps(row) + ',\n"rows": [')
            else:
                comma = ', '
                if i == 1:
                    comma = '  '
                print(comma + json.dumps([clean(c) for c in row]))
        print(']}')

if __name__ == '__main__':
    main()
