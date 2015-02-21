#!/usr/bin/env python

import csv
import json


def main():
    with open('fatabase_restaurants.txt') as fr:
        fatabase_names = [a.strip() for a in fr.readlines()]

    with open('business_licences.csv') as bl:
        reader = csv.reader(bl)

        for i, row in enumerate(reader):
            if i == 0 or not row[-4]:
                continue

            business_name = row[3].strip()
            trade_name = row[4].strip()
            lat = float(row[-4])
            lng = float(row[-3])
            using_name = None

            for name in fatabase_names:
                if name in business_name:
                    menu = name
                    using_name = business_name
                    break
                if name in trade_name:
                    menu = name
                    using_name = trade_name
                    break

            if using_name:
                print json.dumps([lat, lng, using_name, menu])
                # print json.dumps(dict(name=using_name, menu=menu, lat=lat, lng=lng), sort_keys=True)


if __name__ == '__main__':
    main()
