Meteor.startup(function(){
  MAP_ACCESS_TOKEN =  Meteor.settings.private.MAP_ACCESS_TOKEN;
  MAP_ID =            Meteor.settings.private.MAP_ID;
  TFL_APP_KEY =       Meteor.settings.private.TFL_APP_KEY;
  TFL_APP_ID =        Meteor.settings.private.TFL_APP_ID;
  FRCST_API_KEY =     Meteor.settings.private.FRCST_API_KEY;


  // Stations download - initial call
  Meteor.call( "generateStations" );

  Meteor.setInterval(() => {
    Meteor.call("generateStations");
  }, 5 * 60 * 1000)

  // Forecasts download - initial call
  let location = {
    lat: 51.517367,
    lng: -0.089028
  }
  
  // Initial call
  Meteor.call( "getForecast", location );

  Meteor.setInterval(() => {
    Meteor.call( "getForecast", location );
  }, 15 * 60 * 1000 );
    

});  