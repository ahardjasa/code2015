rbindlistn <-  function (l, names = ".Names", ...) 
{
  if (identical(names, FALSE)) {
    return(rbindlist(l, ...))
  }
  if (identical(names, TRUE)) {
    names <- ".Names"
  }
  output <- rbindlist(l, ...)
  nm <- names(l)
  if (is.null(nm)) {
    call <- match.call()
    listCall <- call[["l"]]
    if (listCall[[1]] == "list") {
      for (i in 2:length(listCall)) {
        if (!is.symbol(listCall[[i]])) {
          break
        }
      }
      nm <- character(length(listCall) - 1)
      for (i in 2:length(listCall)) {
        nm[[i - 1]] <- as.character(listCall[[i]])
      }
    }
  }
  if (is.null(nm)) {
    warning("The 'names' attribute of your list is NULL")
    nm <- paste0("V", 1:length(l))
  }
  if (any(nm == "")) {
    warning("Some elements in your list are unnamed")
    nm[nm == ""] <- paste0("V", 1:length(l))[nm == ""]
  }
  output[, `:=`((names), rep(nm, sapply(l, function(x) length(x[[1]]), 
                                        USE.NAMES = FALSE)))]
  return(output)
}


#'TrimTables
#'@description Gets rid of columns that have only one value (excl. blank and NA)
#'@param DT data.table to check for columns. will be assigned by ref so do not need to assign return value to anything
#'@param null.cols additional columns to be removed
#'@param type will null certain columns based on type (currently: yelp, pge, consumers)
#'@param keep.na keep columns that have one value plus NA
#'@export

TrimTables <- function(DT, null.cols=NULL, type="none", keep.na=TRUE, drop.blanks = TRUE){
  #remove custom columns
  if (length(null.cols)>0){
    DT[, eval(null.cols) := NULL]}
  
  #remove columns with single value
  if (!keep.na){
    colvalues <- DT[, sapply(.SD, 
                             function(x){unq.val <- unique(x)
                                         unq.no.na <- na.omit(unq.val)
                                         if (length(unq.no.na) <= 1){
                                           if(length(unq.no.na)==0) "NA"
                                           else unlist(unq.no.na)
                                         }
                                         else if (length(unq.val) == 2 & "" %in% unq.val & drop.blanks){
                                           unq.val[-which(unq.val == "")]
                                         }
                                         else (NA_character_)
                             })]
    drops.na <- " or NA"
  }
  else {
    colvalues <- DT[, sapply(.SD, 
                             function(x){unq.val <- unique(x)
                                         if (length(unq.val) == 1){
                                           if (is.na(unq.val)) "NA"
                                           else if (unq.val=="") " "
                                           else unlist(unq.val)}
                                         else if (length(unq.val) == 2 & "" %in% unq.val & drop.blanks){
                                           unq.val[-which(unq.val == "")]
                                         }
                                         
                                         else (NA_character_)})]
    drops.na <- ""
  }
  one.idx <- which(!(is.na(colvalues)))
  sapply(names(one.idx), function(x){
    print(paste0("removing column ", x, ", since it only has the value ", colvalues[x], drops.na, " or is blank"))
  })
  if (length(one.idx) > 0)
    DT[, eval(names(one.idx)) := NULL]
  
  compare.columns <- NULL
  return(DT)
}