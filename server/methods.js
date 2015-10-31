Meteor.methods({
  generateStations() {

    let url = 'https://api.tfl.gov.uk/BikePoint?app_id=' + TFL_APP_ID + '&app_key=' + TFL_APP_KEY;

    // url = 'https://api.tfl.gov.uk/BikePoint/BikePoints_1?app_id=bdd4f3b3&app_key=38840a1d909f7d3216e5d2cefebc0607'

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
  }
})