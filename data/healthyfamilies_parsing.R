require(data.table)
require(gtools)
nut2008 <- fread("C:/cygwin64/home/amelia.hardjasa/code2015/data/combined_nutrient_value_2008.csv")

#arturo's
arturo <- fread("C:/home/code2015datasets//arturoparsed.csv")

#subway
subway_raw <- readLines("C:/home/code2015datasets/subwaypdf.txt")
subway_split <- sapply(subway_raw, function(x) strsplit(x, " (?=\\d+([^-]|$)|<)", perl = T))
subway_other <- which(sapply(subway_split, length) != 17)
subway <- subway_split[which(sapply(subway_split, length) == 17)]
subdt <- Reduce(function(x, y)cbind(as.data.table(x), as.data.table(y)), subway)
subdt <- as.data.table(t(subdt))
setnames(subdt, c("MENU ITEMS", "Serving Size (g)", "Calories (kcal)", "Calories From Fat", "Total Fat (g)", "Saturated Fat (g)", "Trans Fat (g)", "Cholesterol (mg)", "Sodium (mg)", "Carbohydrate (g)", "Dietary Fibre (g)", "Sugars (g)", "Protein (g)", "Vitamin A (%DV)", "Vitamin C (%DV)", "Calcium (%DV)", "Iron (%DV)"))
appendtext <- gsub("sandwiches", "Sandwich", gsub(" +$", "", gsub("(values|\\(amount|with \\d grams).*$", "", names(subway_other), ignore.case = T)), ignore.case = T)

subdt[, append := unlist(mapply(function(x, y) rep(x, y), appendtext, running(c(subway_other, (length(subway_split)+1)), fun=function(v){v[2] - v[1] - 1}, width = 2, simplify = F), SIMPLIFY = F))]
subdt[, eval("MENU ITEMS") := paste(gsub("\\*+", "", get("MENU ITEMS")), append, sep = ", ")]
subdt[, c("append", "Calories From Fat") := NULL]
subdt[, Restaurant := "Subway"]

#starbucks
starbucks <- fread("C:/home/code2015datasets/starbucks.csv")
starbucks[, c("Calories from Fat", "Caffeine (mg)") := NULL]
starbucks[, Restaurant := "Starbucks"]
sizetable <- data.table(StarbucksName = c("Short", "Tall", "Grande", "VentiHot", "VentiCold", "Trenta"), ServingSize = c(236, 354, 473, 591, 709, 916))
starbucks[, eval("MENU ITEMS") := gsub(paste0(c(sizetable$StarbucksName, "Venti"), collapse = "|"), "", get("MENU ITEMS"))]
starbucks[, eval("MENU ITEMS") := gsub(", , ", ", ", get("MENU ITEMS"))]
sapply(grep("%", names(starbucks), value = T), function(x) starbucks[, eval(x) := gsub("%", "", get(x))])
setkey(sizetable, StarbucksName)
starbucks[, eval("Serving Size (g)") := ifelse(get("Serving Size (g)") %in% sizetable$StarbucksName, sizetable[get("Serving Size (g)"), ServingSize], get("Serving Size (g)"))]
starbucks <- starbucks[get("MENU ITEMS") != ""]

supermarche <-nut2008[!(CATEGORY %in% c("MIXED DISHES", "FAST FOODS", "FATS AND OILS")) & !(SUBCATEGORY %in% c("COFFEE, TEA AND SUBSTITUTES", "ALCOHOLIC", "HOMEMADE", "FLOURS AND BRANS")) & (!grepl("Omelet|homemade|fast food|Water", get("Food Name ()")))]
#supermarche[sample(c(1:894), 25), c("Food Name ()", "CATEGORY", "SUBCATEGORY"), with = F] #sanity checking



healthyfamilies <- rbind(arturo, subdt, starbucks, use.names = T)
write.csv(healthyfamilies, "C:/cygwin64/home/amelia.hardjasa/code2015/data/healthyfamiliesbc.csv", row.names = F)
