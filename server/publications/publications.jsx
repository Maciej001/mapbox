Meteor.publish('stations', () => { return Stations.find() });

Meteor.publish('forecasts', () => { return Forecasts.find() });

Meteor.publish('currentWeather', () => { 
  return Forecasts.find({ type: "current" }); 
});

Meteor.publish('forecastHour', () => {
  let now = new Date();
  let hour = new Date();

  hour.setHours(hour.getHours() + 1);

  let query = {
    type: 'hourly',
    time: { $gte: now, $lte: hour }
  }

  return  Forecasts.find( query );

});