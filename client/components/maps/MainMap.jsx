MainMap = React.createClass({

  mixins: [ ReactMeteorData ],

  getMeteorData() {

    let stationsSub = Meteor.subscribe('stations');

    return {
      stations:         Stations.find().fetch(),
      stationsLoaded:   stationsSub.ready()
    }
  },

  componentDidMount() {
    let self = this;
    Mapbox.load();

    Tracker.autorun(function () {
      if (Mapbox.loaded()) {
        
        L.mapbox.accessToken = 'pk.eyJ1IjoibWFjaWVqcGwiLCJhIjoiY2lmbnY0ZzUwMDFha3RubHl2dGsyYTVrcyJ9.TpW2NGaRUxgDhzfxJxeJpA';
        self.map = L.mapbox.map('main-map', 'mapbox.streets')
                    .setView([51.517373, -0.088727], 16);

      } // Mapbox loaded
    }); // Tracker.autorun
    
  },

  addMarkers() {
    let self = this,
        geoJsonMarkers = [],
        markers = [];

    // Create markers
    _.each(this.data.stations, (station) => {
      let iconClass = 'bike-icon ';

      let cssIcon = L.divIcon({
        className: iconClass,
        iconSize: [50,50],
        html: 
        '<div class="full-bikes">' +
          '<span class="full-bikes-bikes">' + station.bikes + '</span>' + 
          '<span class="full-bikes-docks">' + station.docks + '</span>' + 
        '</div>'
      });

      let marker = L.marker([station.lat, station.lng], {icon: cssIcon});
      
      let chartWidth = 120;

      let emptyWidth = Math.round(chartWidth * (station.empty/station.docks));
  
      if (emptyWidth < 20 && emptyWidth !== 0) {
        emptyWidth = 20;
      }

      let busyWidth  = chartWidth - emptyWidth;
 
      if (busyWidth < 30 && busyWidth !== 0){
        busyWidth = 30;
        emptyWidth = chartWidth - busyWidth;
      } 

      let bikesLeft = 'Sorry, no bikes left';

      if ( station.bikes > 0 ) { bikesLeft =  'Bikes: ' + station.bikes }; 

      marker.bindPopup(
        '<div class="bikes-tooltips">' + 
          '<p>' + bikesLeft + '</p>' + 
          '<div class="bikes-tooltips-chart" style="width:' + chartWidth + 'px">' + 
            '<div class="bikes-busy" style="width:' + busyWidth + 'px">' + 
              '<i class="fa fa-bicycle"></i>' + 
            '</div>' +
            '<div class="bikes-empty" style="width:' + emptyWidth +'px">' + 
              '<span>' + station.empty + '</span>' +
            '</div>' + 
          '</div>' + 
        '</div>' 
      );

      markers.push(marker);

    });

    let stationsGroup = L.featureGroup(markers).addTo(self.map);

  }, 

  render() {
    if ( this.data.stationsLoaded ) {
      this.addMarkers();
    }
    return (
      <div id="main-map"></div>
    )
  }
})
  


