require(data.table)
require(gtools)
nut2008 <- fread("C:/cygwin64/home/amelia.hardjasa/code2015/data/combined_nutrient_value_2008.csv")
cols <- c("MENU ITEMS", "Serving Size (g)", "Calories (kcal)", "Calories From Fat", "Total Fat (g)", "Saturated Fat (g)", "Trans Fat (g)", "Cholesterol (mg)", "Sodium (mg)", "Carbohydrate (g)", "Dietary Fibre (g)", "Sugars (g)", "Protein (g)", "Vitamin A (%DV)", "Vitamin C (%DV)", "Calcium (%DV)", "Iron (%DV)")

supermarche <- nut2008[!(CATEGORY %in% c("MIXED DISHES", "FAST FOODS", "FATS AND OILS")) & !(SUBCATEGORY %in% c("COFFEE, TEA AND SUBSTITUTES", "ALCOHOLIC", "HOMEMADE", "FLOURS AND BRANS")) & (!grepl("Omelet|homemade|fast food|Water", get("Food Name ()")))]
#supermarche[sample(c(1:894), 25), c("Food Name ()", "CATEGORY", "SUBCATEGORY"), with = F] #sanity checking
write.csv(supermarche, "C:/cygwin64/home/amelia.hardjasa/code2015/data/supermarkets.csv", row.names = F)
#supermarche[, Supermark]
