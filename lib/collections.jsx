Stations = new Mongo.Collection('stations');
Stations.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});
Stations.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Forecasts = new Mongo.Collection('forecasts');
Forecasts.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});
Forecasts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});


