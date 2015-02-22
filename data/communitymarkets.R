apikey <- "AIzaSyBhOXohk-15hoZoehZO0MjjKZYoSMgRZXk"
url <- "https://maps.googleapis.com/maps/api/geocode/json?address="
markets <- fread("C:/home/code2015datasets/CommunityFoodMarketsandFarmersMarkets-1.csv")
markets <- markets[!(is.na(StreetNumber))]

addresses <- markets$MergedAddress
addresses <- gsub("\\W*,\\W*", ",", addresses)
addresses <- gsub(" +|,", "\\+", addresses)

latlongs <- sapply(addresses, function(x) {
  requesturl <- paste0(url, x, "&key=", apikey)
  (fromJSON(getURL(requesturl))$results[[1]]$geometry$location)
})

