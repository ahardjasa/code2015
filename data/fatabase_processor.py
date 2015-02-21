#!/usr/bin/env python

import csv
import json


def clean(text):
    text = text.strip()
    try:
        return float(text)
    except Exception:
        return text


def main():
    with open('fatabase.csv') as ifh:
        reader = csv.reader(ifh)

        printed_cols = False

        for i, row in enumerate(reader):
            if row[1] == 'Restaurant':
                if not printed_cols:
                    printed_cols = True
                    print('{"cols": ' + json.dumps(row[1:]) + ',\n"rows": [')
            else:
                comma = ', '
                if i == 1:
                    comma = '  '
                print(comma + json.dumps([clean(c) for c in row[2:]]))
        print(']}')

if __name__ == '__main__':
    main()
