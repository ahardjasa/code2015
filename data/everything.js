var everything = [
{"columns": [["Food name", ""], ["Measure", ""], ["Weight ", "g"], ["Energy", "kcal"], ["Energy", "kJ"], ["Protein", "g"], ["Carbohydrate", "g"], ["Total Sugar", "g"], ["Total Daietary Fibre", "g"], ["Total Fat", "g"], ["Saturated Fat", "g"], ["Monounsaturated Fat", "g"], ["Polyunsaturated Fat", "g"], ["Calcium", "mg"], ["Iron", "mg"], ["Sodium", "mg"], ["Potassium", "mg"], ["Magnesium", "mg"], ["Phosphorus", "mg"], ["Folate ", "DFE"], ["Vitamin B12", "\u00b5g"], ["Vitamin E", "mg"], ["", ""], ["", ""]], "foods": [["Meatless breaded chicken nuggets", 2.0, 72.0, 168.0, 705.0, 15.0, 6.0, 0.0, 3.1, 9.0, 0.8, 2.3, 3.3, 30.0, 2.8, 288.0, 216.0, 9.0, 176.0, 40.0, 3.68, 1.4, "", ""], ["Meatless ground beef", "75g", 75.0, 148.0, 618.0, 16.0, 6.0, 1.0, 3.5, 7.0, 1.1, 1.6, 3.5, 22.0, 1.6, 413.0, 135.0, 14.0, 258.0, 59.0, 1.8, 1.3, "", ""], ["Soy patty", 1.0, 70.0, 136.0, 568.0, 15.0, 5.0, 1.0, 3.2, 6.0, 0.8, 1.2, 2.5, 20.0, 1.5, 385.0, 126.0, 13.0, 241.0, 55.0, 1.68, 1.2, "", ""], ["Tofu, regular, firm and extra firm", "150g", 150.0, 189.0, 791.0, 21.0, 3.0, 1.0, 0.0, 11.0, 1.3, 1.8, 2.7, 234.0, 2.4, 26.0, 222.0, 56.0, 182.0, 29.0, 0.0, "tr", "", ""], ["Tofu, silken, soft", "150g", 150.0, 83.0, 345.0, 7.0, 4.0, 2.0, 0.2, 4.0, 0.5, 0.8, 2.3, 47.0, 1.2, 8.0, 270.0, 44.0, 93.0, "", 0.0, "tr", "", ""], ["Vegetable patty", 1.0, 90.0, 138.0, 576.0, 18.0, 7.0, "", 5.7, 4.0, 1.0, 2.1, 0.3, 102.0, 3.9, 411.0, 432.0, 70.0, 225.0, 22.0, 0.0, "", "", ""], ["Vegetarian luncheon meat", "4 slices", 56.0, 106.0, 442.0, 10.0, 2.0, 1.0, 0.0, 6.0, 0.7, 1.2, 2.5, 23.0, 1.0, 398.0, 112.0, 13.0, 248.0, 56.0, 2.24, 1.7, "", ""], ["Wiener, meatless", 1.0, 70.0, 163.0, 682.0, 14.0, 5.0, 0.0, 2.7, 10.0, 1.4, 2.7, 5.5, 23.0, 1.0, 330.0, 69.0, 13.0, 241.0, 55.0, 1.65, 1.3, "", ""], ["Beans, baked, homemade", "175mL", 187.0, 283.0, 1181.0, 10.0, 40.0, "", 10.3, 10.0, 3.6, 4.0, 1.4, 114.0, 3.7, 790.0, 670.0, 80.0, 204.0, 90.0, 0.0, "", "", ""], ["Beans, baked, plain or vegetarian, canned", "175mL", 188.0, 177.0, 738.0, 9.0, 40.0, 17.0, 7.7, 1.0, 0.2, 0.2, 0.2, 64.0, 2.2, 633.0, 408.0, 49.0, 135.0, 23.0, 0.0, 0.3, "", ""], ["Beans, baked, with pork, canned", "175mL", 187.0, 198.0, 829.0, 10.0, 37.0, "", 10.4, 3.0, 1.1, 1.3, 0.4, 99.0, 3.2, 775.0, 578.0, 64.0, 202.0, 67.0, 0.0, "", "", ""], ["Beans, black, canned, not drained", "175mL", 178.0, 162.0, 676.0, 11.0, 29.0, "", 12.2, 1.0, 0.1, "tr", 0.2, 62.0, 3.4, 682.0, 547.0, 62.0, 192.0, 108.0, 0.0, 1.3, "", ""], ["Beans, kidney, dark red, canned, not drained", "175mL", 189.0, 161.0, 672.0, 10.0, 30.0, "tr", 12.1, 1.0, 0.1, 0.1, 0.4, 45.0, 2.4, 646.0, 487.0, 53.0, 178.0, 97.0, 0.0, 1.1, "", ""], ["Beans, navy, canned, not drained", "175mL", 194.0, 219.0, 917.0, 15.0, 40.0, 1.0, 9.9, 1.0, 0.2, 0.1, 0.4, 91.0, 3.6, 868.0, 558.0, 91.0, 260.0, 120.0, 0.0, 1.5, "", ""], ["Beans, pinto, canned, not drained", "175mL", 178.0, 153.0, 639.0, 9.0, 27.0, "tr", 8.2, 1.0, 0.3, 0.3, 0.5, 76.0, 2.6, 522.0, 431.0, 48.0, 163.0, 107.0, 0.0, 1.1, "", ""], ["Beans, refried, canned", "175mL", 186.0, 175.0, 733.0, 10.0, 29.0, "tr", 9.9, 2.0, 0.9, 1.0, 0.3, 65.0, 3.1, 557.0, 498.0, 62.0, 160.0, 21.0, 0.0, "", "", ""], ["Beans, white, canned, not drained", "175mL", 194.0, 227.0, 948.0, 14.0, 43.0, "", 9.3, 1.0, 0.1, "tr", 0.2, 141.0, 5.8, 315.0, 880.0, 99.0, 176.0, 126.0, 0.0, 1.6, "", ""], ["Black-eyed peas, canned, not drained", "175mL", 178.0, 137.0, 572.0, 8.0, 24.0, "", 5.9, 1.0, 0.3, 0.1, 0.4, 36.0, 1.7, 531.0, 305.0, 50.0, 124.0, 91.0, 0.0, 0.5, "", ""], ["Chickpeas (garbanzo beans), canned, not drained", "175mL", 178.0, 211.0, 884.0, 9.0, 40.0, "", 7.8, 2.0, 0.2, 0.5, 0.9, 57.0, 2.4, 531.0, 305.0, 51.0, 160.0, 119.0, 0.0, 0.3, "", ""], ["Falafel, homemade", "1 ball", 17.0, 57.0, 237.0, 2.0, 5.0, "", 1.3, 3.0, 0.4, 1.7, 0.7, 9.0, 0.6, 50.0, 99.0, 14.0, 33.0, 18.0, 0.0, "", "", ""], ["Hummus, commercial", "60mL", 57.0, 94.0, 394.0, 4.0, 8.0, "", 3.4, 5.0, 0.8, 2.3, 2.1, 22.0, 1.4, 215.0, 129.0, 40.0, 100.0, 47.0, 0.0, "", "", ""], ["Lentils, boiled, salted", "175mL", 146.0, 170.0, 710.0, 13.0, 29.0, 3.0, 6.2, 1.0, 0.1, 0.1, 0.3, 28.0, 4.9, 349.0, 540.0, 53.0, 264.0, 265.0, 0.0, "", "", ""], ["Lentils, pink, boiled", "175mL", 179.0, 190.0, 793.0, 14.0, 32.0, "", 5.9, 1.0, 0.2, 0.3, 0.6, 22.0, 4.1, 4.0, 317.0, 39.0, 161.0, 112.0, 0.0, "", "", ""], ["Peas, split, boiled", "175mL", 145.0, 171.0, 715.0, 12.0, 31.0, 4.0, 4.2, 1.0, 0.1, 0.1, 0.2, 20.0, 1.9, 3.0, 525.0, 52.0, 144.0, 94.0, 0.0, "", "", ""], ["Soybeans, boiled", "175mL", 127.0, 220.0, 920.0, 21.0, 13.0, 4.0, 8.0, 11.0, 1.7, 2.5, 6.4, 130.0, 6.5, 1.0, 655.0, 109.0, 312.0, 69.0, 0.0, "", "", ""], ["Peanut butter, chunk type, fat, sugar and salt added", "30mL", 32.0, 191.0, 799.0, 8.0, 7.0, 3.0, 2.6, 16.0, 2.6, 8.0, 4.8, 15.0, 0.6, 158.0, 242.0, 52.0, 103.0, 30.0, 0.0, 2.0, "", ""], ["Peanut butter, natural", "30mL", 31.0, 184.0, 770.0, 7.0, 7.0, 1.0, 2.5, 16.0, 2.2, 7.8, 4.9, 17.0, 0.7, 2.0, 207.0, 55.0, 113.0, 46.0, 0.0, 2.2, "", ""], ["Peanut butter, smooth type, fat, sugar and salt added", "30mL", 32.0, 191.0, 798.0, 8.0, 6.0, 3.0, 1.8, 16.0, 3.3, 7.7, 4.5, 14.0, 0.6, 149.0, 210.0, 50.0, 116.0, 24.0, 0.0, 2.9, "", ""], ["Peanut butter, smooth type, light", "30mL", 36.0, 190.0, 794.0, 9.0, 13.0, 3.0, 1.9, 12.0, 2.7, 5.9, 3.7, 13.0, 0.7, 197.0, 244.0, 62.0, 135.0, 22.0, 0.0, 2.4, "", ""], ["Peanuts, all types, shelled, oil-roasted, salted", "60mL", 37.0, 219.0, 915.0, 10.0, 6.0, 2.0, 2.7, 19.0, 3.2, 9.5, 5.6, 22.0, 0.6, 117.0, 265.0, 64.0, 145.0, 44.0, 0.0, 2.5, "", ""], ["Peanuts, all types, shelled, roasted", "60mL", 37.0, 217.0, 906.0, 9.0, 8.0, 2.0, 3.0, 18.0, 2.6, 9.1, 5.8, 20.0, 0.8, 2.0, 244.0, 65.0, 133.0, 54.0, 0.0, 2.6, "", ""], ["Almonds, dried", "60mL", 36.0, 208.0, 870.0, 8.0, 7.0, 2.0, 4.2, 18.0, 1.4, 11.6, 4.4, 89.0, 1.5, "tr", 262.0, 99.0, 171.0, 10.0, 0.0, 9.3, "", ""], ["Almonds, oil roasted", "60mL", 40.0, 242.0, 1010.0, 8.0, 7.0, 2.0, 4.2, 22.0, 1.7, 13.9, 5.4, 116.0, 1.5, "tr", 278.0, 109.0, 186.0, 11.0, 0.0, 10.3, "", ""], ["Almonds, roasted, salted", "60mL", 35.0, 209.0, 874.0, 8.0, 7.0, 2.0, 4.1, 18.0, 1.4, 11.8, 4.4, 93.0, 1.6, 119.0, 261.0, 100.0, 171.0, 12.0, 0.0, 9.1, "", ""], ["Brazil nuts, dried", "60mL", 36.0, 233.0, 974.0, 5.0, 4.0, 1.0, 2.7, 24.0, 5.4, 8.7, 7.3, 57.0, 0.9, 1.0, 234.0, 133.0, 257.0, 8.0, 0.0, 2.0, "", ""], ["Cashews, roasted, salted", "60mL", 35.0, 199.0, 834.0, 5.0, 11.0, 2.0, 1.0, 16.0, 3.2, 9.5, 2.7, 16.0, 2.1, 222.0, 196.0, 90.0, 170.0, 24.0, 0.0, 0.3, "", ""], ["Hazelnuts or filberts, dried", "60mL", 34.0, 215.0, 899.0, 5.0, 6.0, 1.0, 3.3, 21.0, 1.5, 15.6, 2.7, 39.0, 1.6, 0.0, 233.0, 56.0, 99.0, 39.0, 0.0, 5.2, "", ""], ["Mixed nuts, oil roasted, salted", "60mL", 36.0, 222.0, 929.0, 6.0, 8.0, 2.0, 3.2, 20.0, 3.1, 11.4, 4.8, 39.0, 1.2, 151.0, 209.0, 85.0, 167.0, 30.0, 0.0, 2.6, "", ""], ["Mixed nuts, roasted", "60mL", 35.0, 206.0, 863.0, 6.0, 9.0, "", 3.1, 18.0, 2.4, 10.9, 3.7, 24.0, 1.3, 4.0, 207.0, 78.0, 151.0, 17.0, 0.0, "", "", ""], ["Mixed nuts, roasted, salted", "60mL", 35.0, 206.0, 863.0, 6.0, 9.0, 2.0, 3.1, 18.0, 2.4, 10.9, 3.7, 24.0, 1.3, 232.0, 207.0, 78.0, 151.0, 17.0, 0.0, 3.8, "", ""], ["Nuts, macadamia, roasted, salted", "60mL", 34.0, 243.0, 1017.0, 3.0, 4.0, 1.0, 2.7, 26.0, 4.1, 20.1, 0.5, 24.0, 0.9, 90.0, 123.0, 40.0, 67.0, 3.0, 0.0, 0.2, "", ""], ["Pecans, dried", "60mL", 25.0, 173.0, 726.0, 2.0, 3.0, 1.0, 2.4, 18.0, 1.6, 10.2, 5.4, 18.0, 0.6, 0.0, 103.0, 30.0, 70.0, 6.0, 0.0, 0.4, "", ""], ["Pine nuts, pignolia, dried", "60mL", 34.0, 230.0, 963.0, 5.0, 4.0, 1.0, 1.3, 23.0, 1.7, 6.4, 11.7, 5.0, 1.9, 1.0, 204.0, 86.0, 197.0, 12.0, 0.0, 3.2, "", ""], ["Pistachios, shelled, roasted, salted", "60mL", 31.0, 177.0, 741.0, 7.0, 8.0, 2.0, 3.2, 14.0, 1.7, 7.6, 4.3, 34.0, 1.3, 126.0, 325.0, 37.0, 151.0, 16.0, 0.0, 0.6, "", ""], ["Walnuts, dried", "60mL", 25.0, 166.0, 694.0, 4.0, 3.0, 1.0, 1.7, 17.0, 1.6, 2.3, 12.0, 25.0, 0.7, 1.0, 112.0, 40.0, 88.0, 25.0, 0.0, 0.2, "", ""], ["Almond butter", "30mL", 32.0, 205.0, 858.0, 5.0, 7.0, "", 1.2, 19.0, 1.8, 12.4, 4.0, 88.0, 1.2, 4.0, 246.0, 98.0, 170.0, 21.0, 0.0, "", "", ""], ["Cashew butter", "30mL", 32.0, 190.0, 796.0, 6.0, 9.0, "", 0.6, 16.0, 3.2, 9.4, 2.7, 14.0, 1.6, 5.0, 177.0, 84.0, 148.0, 22.0, 0.0, 0.5, "", ""], ["Sesame butter, tahini", "30mL", 30.0, 181.0, 757.0, 5.0, 6.0, "tr", 2.8, 16.0, 2.3, 6.2, 7.2, 130.0, 2.7, 35.0, 126.0, 29.0, 223.0, 30.0, 0.0, 0.1, "", ""], ["Flaxseeds, whole and ground", "15mL", 11.0, 56.0, 235.0, 2.0, 3.0, "tr", 3.0, 4.0, 0.4, 0.8, 3.2, 36.0, 0.5, 3.0, 89.0, 39.0, 53.0, 30.0, 0.0, "tr", "", ""], ["Pumpkin and squash seeds, kernels, dried", "60mL", 35.0, 189.0, 792.0, 9.0, 6.0, "tr", 1.4, 16.0, 3.0, 5.0, 7.3, 15.0, 5.2, 6.0, 282.0, 187.0, 411.0, 20.0, 0.0, "", "", ""], ["Sunflower seed kernels, roasted, salted", "60mL", 32.0, 189.0, 790.0, 6.0, 8.0, 1.0, 2.9, 16.0, 1.7, 3.1, 10.7, 23.0, 1.2, 133.0, 276.0, 42.0, 375.0, 77.0, 0.0, 8.5, "", ""]], "name": "LEGUMES, NUTS AND SEEDS"},
{"columns": [["Food name", ""], ["Measure", ""], ["Weight ", "g"], ["Energy", "kcal"], ["Energy", "kJ"], ["Protei", "g"], ["Carbohydrate", "g"], ["Total Sugar", "g"], ["Total Dietary Fibre", "g"], ["Total Fat", "g"], ["Saturated Fat", "g"], ["Cholesterol", "mg"], ["Calcium", "mg"], ["Iron", "mg"], ["Sodium", "mg"], ["Potassium", "mg"], ["Magnesium", "mg"], ["Phosphorus", "mg"], ["Vitamin A", "RAE"], [" Folate", "DFE"], ["Vitamin C", "mg"], ["Vitamin B12", "\u00b5g"], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]], "foods": [["Burrito with beans and cheese", 1.0, 93.0, 189.0, 790.0, 8.0, 27.0, "", 3.8, 6.0, 3.4, 14.0, 107.0, 1.1, 583.0, 248.0, 40.0, 90.0, 49.0, 52.0, 1.0, 0.45, "", "", "", "", "", "", "", "", ""], ["Burrito with beef, cheese and chilli", 1.0, 152.0, 316.0, 1322.0, 20.0, 32.0, "", 2.2, 12.0, 5.2, 85.0, 111.0, 3.9, 1046.0, 333.0, 35.0, 158.0, 99.0, 99.0, 2.0, 1.03, "", "", "", "", "", "", "", "", ""], ["Nachos with cheese", "15-20 nachos", 113.0, 346.0, 1446.0, 9.0, 36.0, "", 4.1, 19.0, 7.8, 18.0, 272.0, 1.3, 816.0, 172.0, 55.0, 276.0, "", "", 1.0, 0.82, "", "", "", "", "", "", "", "", ""], ["Quesadilla with meat", 1.0, 184.0, 627.0, 2622.0, 31.0, 40.0, "tr", 2.5, 38.0, 17.3, 95.0, 442.0, 3.9, 1265.0, 319.0, 44.0, 457.0, 167.0, 104.0, 6.0, 1.03, "", "", "", "", "", "", "", "", ""], ["Taco salad", "250mL", 129.0, 193.0, 807.0, 12.0, 13.0, 2.0, 2.0, 11.0, 4.1, 35.0, 92.0, 1.3, 452.0, 275.0, 29.0, 138.0, 40.0, 18.0, 4.0, 0.58, "", "", "", "", "", "", "", "", ""], ["Taco with beef, cheese, salsa + vegetables", 1.0, 78.0, 168.0, 704.0, 9.0, 12.0, "", "", 9.0, 5.2, 26.0, 101.0, 1.1, 366.0, 216.0, 32.0, 93.0, "", 45.0, 1.0, 0.48, "", "", "", "", "", "", "", "", ""], ["Club sandwich", 1.0, 246.0, 558.0, 2335.0, 32.0, 47.0, 5.0, 2.8, 26.0, 5.8, 76.0, 152.0, 4.5, 1152.0, 480.0, 47.0, 347.0, 43.0, 163.0, 6.0, 0.48, "", "", "", "", "", "", "", "", ""], ["Hot chicken sandwich", 1.0, 284.0, 388.0, 1621.0, 40.0, 31.0, 2.0, 1.7, 10.0, 3.0, 89.0, 109.0, 4.7, 1344.0, 519.0, 43.0, 327.0, 0.0, 96.0, 0.0, 0.54, "", "", "", "", "", "", "", "", ""], ["Sandwich, egg salad", 1.0, 157.0, 479.0, 2003.0, 14.0, 27.0, 3.0, 1.2, 35.0, 6.6, 335.0, 119.0, 2.9, 693.0, 155.0, 19.0, 187.0, 153.0, 121.0, 0.0, 0.92, "", "", "", "", "", "", "", "", ""], ["Sandwich, ham", 1.0, 121.0, 260.0, 1089.0, 13.0, 28.0, 2.0, 2.1, 10.0, 2.6, 32.0, 92.0, 2.5, 1132.0, 229.0, 25.0, 139.0, 49.0, 93.0, 3.0, 0.24, "", "", "", "", "", "", "", "", ""], ["Sandwich, roast beef, plain", 1.0, 139.0, 346.0, 1447.0, 22.0, 33.0, "", 2.5, 14.0, 3.6, 51.0, 54.0, 4.2, 792.0, 316.0, 31.0, 239.0, 11.0, 69.0, 2.0, 1.22, "", "", "", "", "", "", "", "", ""], ["Sandwich, salmon salad", 1.0, 162.0, 340.0, 1422.0, 16.0, 33.0, 5.0, 1.7, 16.0, 2.9, 27.0, 222.0, 2.5, 818.0, 271.0, 31.0, 257.0, 27.0, 105.0, 1.0, 2.45, "", "", "", "", "", "", "", "", ""], ["Sandwich, tuna salad", 1.0, 162.0, 371.0, 1552.0, 20.0, 33.0, 5.0, 1.7, 18.0, 2.9, 15.0, 93.0, 2.9, 745.0, 220.0, 32.0, 233.0, 30.0, 97.0, 1.0, 1.25, "", "", "", "", "", "", "", "", ""], ["Caesar salad", "250mL", 228.0, 335.0, 1401.0, 9.0, 12.0, 3.0, 3.7, 29.0, 3.7, 54.0, 141.0, 2.4, 644.0, 496.0, 33.0, 146.0, 498.0, 245.0, 42.0, 0.42, "", "", "", "", "", "", "", "", " "], ["Caesar salad with chicken", "500mL", 327.0, 491.0, 2055.0, 41.0, 12.0, 3.0, 3.7, 31.0, 4.3, 137.0, 147.0, 2.9, 718.0, 890.0, 61.0, 146.0, 504.0, 249.0, 42.0, 0.76, "", "", "", "", "", "", "", "", ""], ["Garden Salad", "250mL", 77.0, 47.0, 198.0, 1.0, 4.0, 3.0, 0.9, 4.0, 0.6, 0.0, 13.0, 0.3, 216.0, 135.0, 6.0, 16.0, 48.0, 15.0, 4.0, 0.0, "", "", "", "", "", "", "", "", ""], ["Greek Salad", "250mL", 111.0, 139.0, 580.0, 4.0, 4.0, 2.0, 1.1, 13.0, 3.9, 19.0, 121.0, 0.6, 315.0, 130.0, 12.0, 85.0, 43.0, 20.0, 11.0, 0.36, "", "", "", "", "", "", "", "", ""], ["Pasta salad with vegetables", "250mL", 187.0, 245.0, 1001.0, 5.0, 33.0, 5.0, 2.2, 10.0, 1.6, 0.0, 27.0, 1.8, 1273.0, 173.0, 25.0, 69.0, 98.0, 129.0, 10.0, 0.0, "", "", "", "", "", "", "", "", ""], ["Lasagna with meat (7.5cm x 9cm)", "1 piece", 232.0, 364.0, 1523.0, 22.0, 37.0, 6.0, 2.4, 14.0, 7.4, 50.0, 251.0, 3.2, 623.0, 428.0, 46.0, 280.0, 83.0, 99.0, 11.0, 0.65, "", "", "", "", "", "", "", "", ""], ["Lasagna, vegetarian (7.5cm x 9cm)", "1 piece", 256.0, 355.0, 1485.0, 19.0, 46.0, 7.0, 2.9, 11.0, 6.6, 38.0, 304.0, 3.2, 737.0, 423.0, 49.0, 290.0, 102.0, 119.0, 13.0, 0.21, "", "", "", "", "", "", "", "", ""], ["Macaroni and cheese (Kraft DinnerTM)", "250mL", 202.0, 395.0, 1653.0, 11.0, 49.0, 6.0, 2.0, 17.0, 4.1, 9.0, 158.0, 2.2, 784.0, 162.0, 36.0, 194.0, 165.0, 191.0, "tr", 0.22, "", "", "", "", "", "", "", "", ""], ["Macaroni casserole with beef and tomato soup", "250mL", 263.0, 319.0, 1334.0, 23.0, 32.0, 6.0, 1.9, 10.0, 4.0, 52.0, 31.0, 3.5, 376.0, 399.0, 40.0, 186.0, 14.0, 112.0, 2.0, 1.3, "", "", "", "", "", "", "", "", ""], ["Spaghetti with cream sauce", "250mL", 211.0, 250.0, 1047.0, 9.0, 47.0, 4.0, 1.9, 2.0, 0.9, 5.0, 81.0, 2.2, 111.0, 140.0, 34.0, 140.0, 33.0, 192.0, "tr", 0.22, "", "", "", "", "", "", "", "", ""], ["Spaghetti with meat sauce", "250mL", 262.0, 401.0, 1678.0, 19.0, 50.0, 9.0, 4.9, 14.0, 4.5, 56.0, 101.0, 4.7, 1008.0, 761.0, 60.0, 216.0, 68.0, 162.0, 13.0, 0.89, "", "", "", "", "", "", "", "", ""], ["Beef pot pie, commercial, individual", "1 serving", 227.0, 638.0, 2667.0, 18.0, 57.0, "", 2.0, 38.0, 11.4, 41.0, 45.0, 2.3, 1203.0, 293.0, "", 109.0, 279.0, 88.0, 0.0, "", "", "", "", "", "", "", "", "", ""], ["Beef stew", "250mL", 259.0, 168.0, 701.0, 18.0, 14.0, 3.0, 1.8, 4.0, 1.6, 39.0, 29.0, 2.2, 604.0, 496.0, 33.0, 183.0, 132.0, 26.0, 9.0, 1.52, "", "", "", "", "", "", "", "", ""], ["Butter chicken", "250mL", 258.0, 368.0, 1538.0, 28.0, 13.0, 4.0, 1.5, 23.0, 9.9, 116.0, 125.0, 2.4, 740.0, 669.0, 54.0, 307.0, 147.0, 15.0, 11.0, 0.44, "", "", "", "", "", "", "", "", ""], ["Chicken fajita", "1 fajita", 223.0, 350.0, 1462.0, 19.0, 50.0, 3.0, 4.1, 8.0, 2.1, 33.0, 52.0, 3.4, 540.0, 405.0, 41.0, 183.0, 28.0, 153.0, 26.0, 0.09, "", "", "", "", "", "", "", "", ""], ["Chicken pot pie, commercial, individual", "1 serving", 227.0, 494.0, 2065.0, 21.0, 37.0, 3.0, 3.1, 29.0, 9.5, 62.0, 59.0, 3.0, 347.0, 349.0, 34.0, 195.0, 222.0, 102.0, 9.0, 0.2, "", "", "", "", "", "", "", "", ""], ["Pad Tha\u00ef", "250ml", 171.0, 220.0, 920.0, 15.0, 26.0, 4.0, 1.5, 6.0, 0.9, 68.0, 26.0, 0.9, 344.0, 258.0, 30.0, 56.0, 36.0, 24.0, 5.0, 0.23, "", "", "", "", "", "", "", "", ""], ["Poutine", "250mL", 165.0, 380.0, 1587.0, 13.0, 25.0, 1.0, 1.9, 26.0, 9.9, 40.0, 282.0, 1.4, 755.0, 387.0, 26.0, 261.0, 97.0, 16.0, 7.0, 0.38, "", "", "", "", "", "", "", "", ""], ["Samosa, vegetarian", 2.0, 100.0, 306.0, 1280.0, 5.0, 32.0, 1.0, 2.1, 18.0, 5.6, 8.0, 33.0, 1.8, 795.0, 178.0, 17.0, 70.0, 36.0, 68.0, 3.0, 0.06, "", "", "", "", "", "", "", "", ""], ["Shepherd's pie", "250mL", 257.0, 389.0, 1628.0, 17.0, 40.0, 5.0, 3.1, 17.0, 5.0, 41.0, 52.0, 1.9, 584.0, 766.0, 54.0, 213.0, 94.0, 42.0, 14.0, 1.23, "", "", "", "", "", "", "", "", ""], ["Stir fry with beef", "250mL", 229.0, 290.0, 1213.0, 22.0, 20.0, 11.0, 2.2, 14.0, 2.3, 46.0, 45.0, 2.7, 888.0, 534.0, 37.0, 211.0, 30.0, 43.0, 69.0, 1.77, "", "", "", "", "", "", "", "", ""], ["Stir fry with chicken", "250mL", 171.0, 255.0, 1067.0, 18.0, 8.0, 2.0, 1.5, 17.0, 4.0, 63.0, 27.0, 1.3, 552.0, 387.0, 25.0, 165.0, 109.0, 16.0, 22.0, 0.19, "", "", "", "", "", "", "", "", ""], ["Stir fry with tofu", "250mL", 171.0, 183.0, 767.0, 14.0, 10.0, 3.0, 1.4, 10.0, 1.1, "tr", 142.0, 1.8, 493.0, 326.0, 36.0, 141.0, 72.0, 22.0, 20.0, 0.02, "", "", "", "", "", "", "", "", ""], ["Sushi with fish", 4.0, 104.0, 164.0, 684.0, 5.0, 35.0, 7.0, 0.8, "tr", 0.1, 3.0, 20.0, 0.5, 666.0, 142.0, 21.0, 66.0, 52.0, 15.0, 2.0, 0.11, "", "", "", "", "", "", "", "", ""], ["Sushi with vegetables, no fish", 4.0, 104.0, 122.0, 510.0, 2.0, 27.0, 5.0, 0.5, "tr", 0.1, 0.0, 13.0, 0.2, 100.0, 60.0, 13.0, 38.0, 16.0, 7.0, 2.0, "tr", "", "", "", "", "", "", "", "", ""], ["Sweet and sour meatballs", 6.0, 258.0, 472.0, 2322.0, 26.0, 33.0, 19.0, 0.7, 26.0, 10.6, 95.0, 76.0, 3.3, 931.0, 409.0, 37.0, 243.0, 33.0, 34.0, 1.0, 2.6, "", "", "", "", "", "", "", "", ""], ["Tourtiere, homemade (20cm diam)", "  1/6 ", 113.0, 307.0, 1283.0, 15.0, 23.0, 1.0, 1.2, 17.0, 6.4, 47.0, 28.0, 1.9, 352.0, 273.0, 22.0, 157.0, 1.0, 59.0, 1.0, 0.3, "", "", "", "", "", "", "", "", ""]], "name": "MIXED DISHES"}];
