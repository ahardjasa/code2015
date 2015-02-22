nut2008 <- fread("C:/cygwin64/home/amelia.hardjasa/code2015/data/combined_nutrient_value_2008.csv")
setkeyv(nut2008, names(nut2008)[1])

menu1 <- data.table(foodtype = c("Hot Dogs"), meal = c("Hotdog, beef wiener + condiments"), generic = c("Wiener (frankfurter), beef", "Roll, hamburger or hotdog, white", "Ketchup", "Mustard"))

menu2 <- data.table(foodtype = "Sandwiches", meal = nut2008[grepl("sandwich", get("Food Name ()"), ignore.case = T) & SUBCATEGORY == "SANDWICHES", get("Food Name ()")], generic = nut2008[grepl("sandwich", get("Food Name ()"), ignore.case = T) & SUBCATEGORY == "SANDWICHES", get("Food Name ()")])

menu <- rbind(menu1, menu2)
meals <- testmenu[, createMeal(meal, generic, nut2008), by = meal]

exportmenu <- unique(menu[, list(foodtype, mealname = meal)], by = NULL)
exportmeals <- meals[, c("meal", "Food Name ()") := NULL]

write.csv(exportmenu, "C:/cygwin64/home/amelia.hardjasa/code2015/data/menus.csv", row.names = F)
write.csv(exportmeals, "C:/cygwin64/home/amelia.hardjasa/code2015/data/meals.csv", row.names = F)
