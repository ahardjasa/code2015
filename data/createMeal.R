
createMeal <- function(mealname, ingredients, foodtable){
  vals <- foodtable[ingredients]
  valnames <- c("mealname", names(vals))
  if(length(ingredients) == 1 && ingredients %in% foodtable[["Food Name ()"]]){
    vals[, mealname := mealname]
    setcolorder(vals, valnames)
    return(vals)
  }
  else {
    subcat <- unique(vals$SUBCATEGORY)
    cat <- unique(vals$CATEGORY)
    vals <- as.data.table(vals[, lapply(.SD, function(x) sum(na.omit(as.numeric(x)))), .SDcols = names(vals)[-c(1:2, 39:length(names(vals)))]])
    vals[, `:=`("Food Name ()" = mealname,
                mealname = mealname,
                "Measure ()" = 1)]
    vals[, SUBCATEGORY := { if (length(subcat) == 1) subcat else "MIXED"}]
    vals[, CATEGORY := {if(length(cat) == 1) cat else ("MIXED DISHES")}]
    setcolorder(vals, valnames)
    vals <- vals[, lapply(.SD, as.character)]
    return(vals)
  }
}
