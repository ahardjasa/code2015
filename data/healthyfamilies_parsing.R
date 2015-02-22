arturo <- fread("C:/home/code2015datasets//arturoparsed.csv")



subway_raw <- readLines("C:/home/code2015datasets/subwaypdf.txt")
subway_split <- sapply(subway_raw, function(x) strsplit(x, " (?=\\d+([^-]|$)|<)", perl = T))
subway_other <- which(sapply(subway_split, length) != 17)
subway <- subway_split[which(sapply(subway_split, length) == 17)]
subdt <- Reduce(function(x, y)cbind(as.data.table(x), as.data.table(y)), subway)
subdt <- as.data.table(t(subdt))
setnames(subdt, c("MENU ITEMS", "Serving Size (g)", "Calories (kcal)", "Cal. From Fat", "Total Fat (g)", "Saturated Fat (g)", "Trans Fat (g)", "Cholesterol (mg)", "Sodium (mg)", "Carbohydrate (g)", "Dietary Fibre (g)", "Sugars (g)", "Protein (g)", "Vitamin A (%DV)", "Vitamin C (%DV)", "Calcium (%DV)", "Iron (%DV)"))
appendtext <- gsub("sandwiches", "Sandwich", gsub(" +$", "", gsub("(values|\\(amount|with \\d grams).*$", "", names(subway_other), ignore.case = T)), ignore.case = T)

subdt[, append := unlist(mapply(function(x, y) rep(x, y), appendtext, running(c(subway_other, (length(subway_split)+1)), fun=function(v){v[2] - v[1] - 1}, width = 2, simplify = F), SIMPLIFY = F))]
subdt[, eval("MENU ITEMS") := paste(gsub("\\*+", "", get("MENU ITEMS")), append, sep = ", ")]
subdt[, c("append", "Cal. From Fat") := NULL]
subdt[, Restaurant := "Subway"]

healthyliving <- rbind(arturo, subdt, use.names = T)
write.csv(healthyliving, "C:/cygwin64/home/amelia.hardjasa/code2015/data/healthyfamiliesbc.csv", row.names = F)
