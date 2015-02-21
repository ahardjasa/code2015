#!/usr/bin/env python

import json


def main():
    with open('../fatabase_restaurants.txt') as fr:
        fatabase_names = [a.strip() for a in fr.readlines()]

    with open('restaurants.json') as jh:
        restaurants = json.load(jh)

        for location in restaurants['features']:
            business_name = location['properties']['NAME']
            lat = float(location['properties']['LATITUDE'])
            lng = float(location['properties']['LONGITUDE'])
            menu = None

            for name in fatabase_names:
                if name in business_name:
                    menu = name
                    break

            if menu:
                print json.dumps([lat, lng, business_name, menu])

if __name__ == '__main__':
    main()
