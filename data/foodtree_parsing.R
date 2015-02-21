require(data.table)

####fruit trees####
foodtrees <- fread("C://home/code2015datasets/CommunityGardensandFoodTrees.csv")
setnames(foodtrees, names(foodtrees)[17], "email")

trim <- foodtrees[FoodTreeVarieties != "", list(Name, Latitude, Longitude, NumberOfPlots, NumberOfFoodTrees, FoodTreeVarieties, Jurisdiction, Restricted = grepl("^For.*only$", email))] #OtherFoodAssets is empty
trim[, TreeType:= sapply(trim$FoodTreeVarieties, strsplit, c(",|;|\\)"))]
trim[sapply(TreeType, length) == 0, TreeType:= list(NA_character_)]
melted <- rbindlist(mapply(function(x, y) {trim[rep(x, y)]}, 1:nrow(trim), pmax(1, sapply(trim$TreeType, length)), SIMPLIFY = FALSE))
melted[, TreeType:= unlist(unique(trim, by = "Name")$TreeType)]
melted[grepl("\\d", TreeType), NumTreeType := as.numeric(gsub("(.*)(\\d)(.*)", "\\2", TreeType))]
fruitlist <- "pear|plum|apple|cherry|quince|raspberry|walnut|peach|persimmon|grape|hazelnut|lemon|blueberry|berry|apricot"
melted[grepl(fruitlist, tolower(TreeType)), CleanTreeType := gsub(paste0(".*(", fruitlist, ").*"), "\\1", tolower(TreeType))]
mini <- melted[!(is.na(CleanTreeType)) &!Restricted]
export <- mini[, list(Latitude, Longitude, Name, TreeType = CleanTreeType)]
export <- unique(export, by = NULL)
write.csv(export, "C://home/code2015datasets/vancouver_foodtrees.csv", row.names = F)

# 
# install.packages("foreign")
# require(foreign)
# foodcnf <- as.data.table(read.dbf("C:/home/code2015datasets/cnf/FOOD_NM.DBF", as.is = TRUE))
# 
# 

