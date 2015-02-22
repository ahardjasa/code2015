nut2008 <- fread("C:/cygwin64/home/amelia.hardjasa/code2015/data/combined_nutrient_value_2008.csv")
setkeyv(nut2008, names(nut2008)[1])

menu1 <- data.table(foodtype = c("Hot Dogs"), mealname = c("Hotdog, beef wiener + condiments"), generic = c("Wiener (frankfurter), beef", "Roll, hamburger or hotdog, white", "Ketchup", "Mustard"))

menu2 <- data.table(foodtype = "Sandwiches", mealname = nut2008[grepl("sandwich", get("Food Name ()"), ignore.case = T) & SUBCATEGORY == "SANDWICHES", get("Food Name ()")], generic = nut2008[grepl("sandwich", get("Food Name ()"), ignore.case = T) & SUBCATEGORY == "SANDWICHES", get("Food Name ()")])

menu <- rbind(menu1, menu2)
meals <- menu[, createMeal(mealname, generic, nut2008), by = mealname]
meals <- meals[, -1, with = F]
export <- merge(menu, meals, by = "mealname", all = T)
export <- unique(export[, c("generic", "Food Name ()") := NULL], by = NULL)
write.csv(export, "C:/cygwin64/home/amelia.hardjasa/code2015/data/meals_menus.csv", row.names = F)
