function FToC( tempF ) {
  return Math.round( 10 * ( tempF - 32) * 5 / 9 ) / 10;
};

function rainIntensity( precInt ) {
  let rain = ''
  if ( precInt === 0 ) {
    rain = 'no rain'
  } else if ( precInt > 0 && precInt <= 0.002 ) {
    rain = 'very light rain'
  } else if ( precInt > 0.002 && precInt <= 0.017 ) {
    rain = 'light rain'
  } else if ( precInt > 0.017 && precInt <= 0.1 ) {
    rain = 'moderate rain'
  } else if ( precInt > 0.1 && precInt <= 0.4 ) {
    rain = 'heavy rain'
  } else if ( precInt > 0.4 ) {
    rain = 'very heavy rain'
  }

}

function weatherIcon( icon ) {
  let newIcon = 'wi ';

  switch(icon) {
    case ( "clear-day" ):
      newIcon += "wi-day-sunny";
      break;
    case ( "clear-night" ):
      newIcon += "wi-night-clear";
      break;
    case ( "rain" ):
      newIcon += "wi-day-rain";
      break;
    case( "snow" ):
      newIcon += "wi-day-snow";
      break;
    case( "sleet" ):
      newIcon += "wi-day-sleet";
      break;
    case( "wind" ): 
      newIcon += "wi-day-windy";
      break;
    case( "fog" ):
      newIcon += "wi-day-fog";
      break;
    case( "cloudy" ):
      newIcon += "wi-cloudy";
      break;
    case( "partly-cloudy-day" ):
      newIcon += "wi-day-cloudy";
      break;
    case( "partly-cloudy-night" ):
      newIcon += "wi-night-alt-cloudy";
      break;
    default:
      newIcon += "wi-day-sunny";
      break;
  }

  return newIcon;

}

Meteor.methods({
  generateStations() {

    let url = 'https://api.tfl.gov.uk/BikePoint?app_id=' + TFL_APP_ID + '&app_key=' + TFL_APP_KEY;

    Stations.remove({});
    let i = 1;
    HTTP.get(url, (err, results) => {

      if (err) {
        console.log("HTTP req error: " + err);
      } else {
        
        results.data.forEach( (station) => {

          let document = {};

          document.name = station.commonName;
          document.code = station.id;
          document.lat  = station.lat;
          document.lng  = station.lon;

          _.each(station.additionalProperties, (prop) => {
            switch( prop.key ) {
              case "TerminalName":
                document.terminalNumber = prop.value;
                break;
              case "Installed":
                document.installed = prop.value;
                break;
              case "Locked":
                document.locked = prop.value;
                break;
              case "Temporary":
                document.temporary = prop.value;
                break;
              case "NbBikes":
                document.bikes = prop.value;
                break;
              case "NbEmptyDocks":
                document.empty = prop.value;
                break;
              case "NbDocks":
                document.docks = prop.value;
                break;
            }
          });

          Stations.insert(document);

        });
      }
    }); // HTTP request 
  },

  getForecast( location ) {
    check(location, {
      lat: Number,
      lng: Number
    });

    let url = "https://api.forecast.io/forecast/" + FRCST_API_KEY + "/" + location.lat + "," + location.lng;

    // Remove old Forecasts 
    Forecasts.remove({});

    HTTP.get(url, ( err, results ) => {
      if (err) {
        console.log( "Error getting weather forecast.");
        return false;
      }

      // Current weather
      let document = {
        type:               'current',
        time:               new Date( results.data.currently.time * 1000 ),
        summary:            results.data.currently.summary,
        icon:               weatherIcon( results.data.currently.icon ),
        precipIntensity:    results.data.currently.precipIntensity,
        precipProbability:  results.data.currently.precipProbability,
        temp:               FToC( results.data.currently.temperature ),
        humidity:           results.data.currently.humidity,
        windSpeed:          results.data.currently.windSpeed,
        windDirection:      results.data.currently.windBearing,
        cloudCover:         results.data.currently.cloudCover,
        pressure:           results.data.currently.pressure
      }

      Forecasts.insert( document );

      // Forecast Minutely
      document = {};

      if ( !!results.data.minutely.data ) {
        _.each( results.data.minutely.data, ( minute ) => {
          document = {
            type:               'minutely',
            summary:            results.data.minutely.summary,
            icon:               weatherIcon( results.data.minutely.icon ),
            time:               new Date(minute.time * 1000),
            precipIntensity:    minute.precipIntensity,
            precipProbability:  minute.precipProbability
          }

          Forecasts.insert( document );
        });
      } else {
        console.log("Forecast Minutely data missing");
      }



      // Forecast Hourly
      document = {};

      if ( !!results.data.hourly.data ) {
        _.each( results.data.hourly.data, ( hour ) => {
          document = {
            type:               'hourly',
            summary:            results.data.hourly.summary,
            icon:               weatherIcon( results.data.hourly.icon ),
            time:               new Date( hour.time * 1000 ),
            precipIntensity:    hour.precipIntensity,
            precipProbability:  hour.precipProbability,
            temp:               FToC( hour.temperature ),
            humidity:           hour.humidity,
            windSpeed:          hour.windSpeed,
            windDirection:      hour.windBearing,
            cloudCover:         hour.cloudCover,
            pressure:           hour.pressure
          }

          Forecasts.insert( document );
        });
      } else {
        console.log("Forecast Hourly data missing");
      }



      // Forecast Daily 
      document = {};

      if ( !!results.data.daily.data ) {
        _.each( results.data.daily.data, ( day ) => {
          document = {
            type:               'daily',
            summary:            results.data.daily.summary,
            icon:               weatherIcon( results.data.daily.icon ),
            time:               new Date( day.time * 1000 ),
            sunrise:            new Date( day.sunriseTime * 1000 ),
            sunset:             new Date( day.sunsetTime * 1000 ),
            moonPhase:          day.moonPhase,
            precipIntensity:    day.precipIntensity,
            precipProbability:  day.precipProbability,
            tempMin:            FToC( day.temperatureMin ),
            tempMinTime:        new Date( day.temperatureMinTime * 1000 ),
            tempMax:            FToC( day.temperatureMax ),
            tempMaxTime:        new Date( day.temperatureMaxTime * 1000 ),
            humidity:           day.humidity,
            windSpeed:          day.windSpeed,
            windDirection:      day.windBearing,
            cloudCover:         day.cloudCover,
            pressure:           day.pressure
          }

          Forecasts.insert( document );
        });
      } else {
        console.log("Forecast Daily data missing");
      }
    });
  }
})