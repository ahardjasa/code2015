foodtruck <- fread("C:/home/code2015datasets//new_food_vendor_locations.csv")
simple <-foodtruck[status == "open", list(lat, lon, business_name, description)]
simplemap <- data.table(term = c("taco", "sandwich", "crepe", "juice.*smoothie|smoothie.*juice"), name = c("Tacos", "Sandwiches", "Crepes", "Juice and Smoothies"))

simple[, foodtype := gsub("^ +| $", "", gsub("Cuisine|Foods?", "", description))]
for (i in 1:nrow(simplemap)){
  simple[, foodtype := ifelse(grepl(simplemap[i, term], foodtype, ignore.case = T), simplemap[i, name], foodtype)]
}
simple[business_name %in% c("Mum's Grilled Cheese Truck", "Taser Sandwiches"), foodtype := "Grilled Cheese Sandwiches"]
simple[, description := NULL]
write.csv(simple, "C:/cygwin64/home/amelia.hardjasa/code2015/data/foodtrucks.csv", row.names = F)
