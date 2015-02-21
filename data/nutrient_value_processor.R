require(data.table)
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
allnut2008 <- rbindlistn(nut2008, names = T, fill = T)
allnut2008 <- allnut2008[get("Food Name ()") != ""]

subcat.idces <- allnut2008[, which((is.na(get("Protein (g)"))|get("Protein (g)") == "") & (is.na(get("Weight (g)"))|get("Weight (g)") == ""))]
# allnut2008 <- unique(allnut2008, by = names(allnut2008)[which(names(allnut2008)!=".Names")])
# allnut2008[get("Food Name ()") == ""]


allnut2008[, SUBCATEGORY := (unlist(mapply(function(x, y) rep(x, y), allnut2008[subcat.idces, get("Food Name ()")], running(c(subcat.idces, (nrow(allnut2008)+1)), fun=function(v){v[2] - v[1]}, width = 2, simplify = F), SIMPLIFY = FALSE)))]
