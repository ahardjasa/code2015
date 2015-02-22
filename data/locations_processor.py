#!/usr/bin/env python

import csv
import json


def main():
    with open('fatabase_restaurants.txt') as fr:
        fatabase_names = set(a.strip() for a in fr.readlines())

    with open('healthyfamiliesbc.csv') as hfbc:
        reader = csv.reader(hfbc)
        reader.next()
        hfbc_names = set(row[-1].strip() for row in reader)

    def find_menu(*candidates):
        for name in fatabase_names:
            for candidate in candidates:
                if name in candidate:
                    return name, candidate

        for name in hfbc_names:
            for candidate in candidates:
                if name in candidate:
                    return name, candidate

    with open('foodtrucks.csv') as ft:
        reader = csv.reader(ft)
        reader.next()

        for row in reader:
            lat = float(row[0])
            lng = float(row[1])
            business_name = row[2]
            foodtype = row[3]  # do something with this

            found = find_menu(business_name)
            if found:
                print json.dumps([lat, lng, found[1], found[0], foodtype, 'truck'])

    with open('business_licences.csv') as bl:
        reader = csv.reader(bl)
        reader.next()

        for row in reader:
            if not row[-4]:
                continue

            business_name = row[3].strip()
            trade_name = row[4].strip()
            lat = float(row[-4])
            lng = float(row[-3])

            found = find_menu(trade_name, business_name)
            if found:
                print json.dumps([lat, lng, found[1], found[0]])

    with open('surrey/restaurants.json') as jh:
        restaurants = json.load(jh)

        for location in restaurants['features']:
            business_name = location['properties']['NAME']
            lat = float(location['properties']['LATITUDE'])
            lng = float(location['properties']['LONGITUDE'])

            found = find_menu(business_name)
            if found:
                print json.dumps([lat, lng, found[1], found[0]])

if __name__ == '__main__':
    main()
