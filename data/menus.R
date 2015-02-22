require(data.table)
source("C:/cygwin64/home/amelia.hardjasa/code2015/data/createMeal.R")

nut2008 <- fread("C:/cygwin64/home/amelia.hardjasa/code2015/data/combined_nutrient_value_2008.csv")
setkeyv(nut2008, names(nut2008)[1])

menu <- rbind(data.table(foodtype = c("Hot Dogs"), 
                         mealname = c("Hotdog, beef wiener + condiments"), 
                         generic = c("Wiener (frankfurter), beef", "Roll, hamburger or hotdog, white", "Ketchup", "Mustard")),
              data.table(foodtype = "Sandwiches", 
                         mealname = nut2008[grepl("sandwich", get("Food Name ()"), ignore.case = T) & SUBCATEGORY == "SANDWICHES", get("Food Name ()")], 
                         generic = nut2008[grepl("sandwich", get("Food Name ()"), ignore.case = T) & SUBCATEGORY == "SANDWICHES", get("Food Name ()")]),
              data.table(foodtype = c("Grilled Cheese Sandwiches"),
                         mealname = c(rep("Grilled cheese, basic", 3), rep("Grilled cheese, fancy", 4)),
                         generic = c("Bread, white, commercial", "Bread, white, commercial", "Cheddar", "Gruyere", "Bread, rye", "Bread, rye", "Bacon, pork, broiled, pan-fried or roasted")))


meals <- menu[, createMeal(mealname, generic, nut2008), by = mealname]
meals <- meals[, -1, with = F]
export <- merge(menu, meals, by = "mealname", all = T)
export <- unique(export[, c("generic", "Food Name ()") := NULL], by = NULL)
write.csv(export, "C:/cygwin64/home/amelia.hardjasa/code2015/data/meals_menus.csv", row.names = F)
