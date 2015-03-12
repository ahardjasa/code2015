#!/usr/bin/env python

import csv
import json


def main():
    with open('fatabase.txt') as fb:
        fatabase_names = set(json.loads(r)[0] for r in fb)
        fatabase_names.remove('Restaurant')
        fatabase_names = dict((n, n) for n in fatabase_names)
        fatabase_names["Church's Fried Chicken"] = "Church's Chicken"
        fatabase_names['COBS Bread'] = 'Cobs Bread'
        fatabase_names['Freshslice'] = 'FreshSlice'
        fatabase_names['De Dutch'] = 'DeDutch'
        fatabase_names["Denny's"] = 'Dennys'
        fatabase_names["Earl's Restaurant"] = 'Earls'
        fatabase_names['Kentucky Fried Chicken'] = 'KFC'
        fatabase_names["McDonald's"] = 'McDonalds'
        fatabase_names["Milestone's"] = 'Milestones'
        fatabase_names["Moxie's"] = 'Moxies'
        fatabase_names['Mr Sub'] = 'MrSub'
        fatabase_names["Wendy's"] = 'Wendys'


    with open('healthyfamiliesbc.csv') as hfbc:
        reader = csv.reader(hfbc)
        reader.next()
        hfbc_names = set(row[-1].strip() for row in reader)
        hfbc_names = dict((n, n) for n in hfbc_names)

    with open('supermarkets.txt') as supermarkets:
        supermarket_names = set(line.strip() for line in supermarkets)

    with open('notfood.txt') as notfood:
        notfood_names = set(line.strip() for line in notfood)

    with open('meals_menus.csv') as mf:
        reader = csv.reader(mf)
        reader.next()
        menus = set(row[1].strip() for row in reader)

    # just prefer hfbc
    # if fatabase_names & hfbc_names:
    #     raise Exception('overlapping names: ' + fatabase_names & hfbc_names)

    if set(fatabase_names.keys()) & menus:
        raise Exception('overlapping menu: ' + fatabase_names & menus)

    if set(hfbc_names.keys()) & menus:
        raise Exception('overlapping menu: ' + hfbc_names & menus)

    def find_menu(*candidates):
        for name, menu in hfbc_names.iteritems():
            for candidate in candidates:
                if name in candidate:
                    return menu, candidate, "restaurant"
        for name, menu in fatabase_names.iteritems():
            for candidate in candidates:
                if name in candidate:
                    return menu, candidate, "restaurant"
        for name in supermarket_names:
            for candidate in candidates:
                if name in candidate:
                    return name, candidate, "supermarket"

    with open('foodtrucks.csv') as ft:
        reader = csv.reader(ft)
        reader.next()

        for row in reader:
            lat = float(row[0])
            lng = float(row[1])
            business_name = row[2]
            foodtype = row[3]  # do something with this

            if foodtype == "Hot Dogs" and not business_name:
                business_name = "Hot Dog Stand"

            found = find_menu(business_name)
            if found:
                print json.dumps([lat, lng, found[1], found[0], 'truck'])
            elif foodtype in menus:
                print json.dumps([lat, lng, business_name, foodtype, 'truck'])

    with open('business_licences.csv') as bl:
        reader = csv.reader(bl)
        reader.next()

        for row in reader:
            if not row[-4]:
                continue

            business_name = row[3].strip()
            if business_name in notfood_names:
                continue
            trade_name = row[4].strip()
            if trade_name in notfood_names:
                continue
            lat = float(row[-4])
            lng = float(row[-3])

            found = find_menu(trade_name, business_name)
            if found:
                print json.dumps([lat, lng, found[1], found[0], found[2]])

    with open('surrey/restaurants.json') as jh:
        restaurants = json.load(jh)

        for location in restaurants['features']:
            business_name = location['properties']['NAME']
            lat = float(location['properties']['LATITUDE'])
            lng = float(location['properties']['LONGITUDE'])

            found = find_menu(business_name)
            if found:
                print json.dumps([lat, lng, found[1], found[0], found[2]])

if __name__ == '__main__':
    main()
