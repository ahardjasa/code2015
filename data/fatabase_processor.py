#!/usr/bin/env python

import json


def clean(text):
    text = text.strip()
    try:
        return float(text)
    except Exception:
        return text


def main():
    with open('fatabase.txt') as ifh:
        printed_cols = False

        for i, raw_row in enumerate(ifh):
            row = json.loads(raw_row)
            if row[0] == 'Restaurant':
                if not printed_cols:
                    printed_cols = True
                    print('{"cols": ' + json.dumps(row) + ',\n"rows": [')
            else:
                comma = ', '
                if i == 1:
                    comma = '  '
                print(comma + json.dumps([clean(c) for c in row]))
        print(']}')

if __name__ == '__main__':
    main()
