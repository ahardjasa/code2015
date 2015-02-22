require(data.table)
require(gtools)
source("C:/home/rbindlistn_mod.R")
datadir <- "C:/cygwin64/home/amelia.hardjasa/code2015/data/"
nut2008dir <- paste0(datadir, "nutrient_value_2008/")
headerloc <- sapply(lapply(paste0(nut2008dir,list.files(nut2008dir)), readLines, n = 3), function(x) grep("Nutrient Value of Some Common Foods", x))

nut2008 <- mapply(function(x, y){fread(x, skip = y+1)}, paste0(nut2008dir,list.files(nut2008dir)), headerloc, SIMPLIFY = FALSE)
nut2008 <- lapply(nut2008, TrimTables, drop.blanks = FALSE)
for(dt in nut2008){
  setnames(dt, gsub(" +", " ", gsub("^ +| +$", "", names(dt))))  
  setnames(dt, gsub("\\b([a-z])([a-z]+)", "\\U\\1\\L\\2", names(dt), perl=TRUE))
}
unittable <- as.data.table(t(rbindlist(sapply(nut2008,`[`, 1), fill = T)[, sapply(.SD, function(x) unique(na.omit(x)))]), keep.rownames = T)[, list(nutrient = rn, unit = gsub("ï¿½g", "µg", gsub(" ", "", V2)))]
setkey(unittable, nutrient)
for(dt in nut2008){
  setnames(dt, paste0(names(dt), " (", unittable[unique(names(dt)), unit], ")")) #this is realllly bad
}
nutcats <- mapply(function(x, y) scan(x, what = "character", skip = y, sep = ",", nlines = 1)[1], paste0(nut2008dir,list.files(nut2008dir)), headerloc)
names(nut2008) <- nutcats
allnut2008 <- rbindlistn(nut2008, names = "CATEGORY", fill = T)
allnut2008 <- allnut2008[get("Food Name ()") != ""]
subcat.idces <- allnut2008[,which(get("Measure ()") == "")]
allnut2008[, SUBCATEGORY := (unlist(mapply(function(x, y) rep(x, y), allnut2008[subcat.idces, get("Food Name ()")], running(c(subcat.idces, (nrow(allnut2008)+1)), fun=function(v){v[2] - v[1]}, width = 2, simplify = F), SIMPLIFY = FALSE)))]
allnut2008 <- allnut2008[-subcat.idces]
allnut2008 <- allnut2008[, lapply(.SD, function(x) ifelse(is.na(x), "", x))]
allnut2008[SUBCATEGORY == "POPCORN", eval("Food Name ()") := paste("Popcorn", tolower(get("Food Name ()")), sep = ", ")]

write.csv(allnut2008, "C:/cygwin64/home/amelia.hardjasa/code2015/data/combined_nutrient_value_2008.csv", row.names = F)