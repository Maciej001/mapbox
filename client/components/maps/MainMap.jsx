MainMap = React.createClass({

  mixins: [ ReactMeteorData ],

  getMeteorData() {

    let stationsSub   = Meteor.subscribe('stations');

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
      let iconClass = 'bike-icon ',
          bikes = Number(station.bikes), 
          empty = Number(station.empty), 
          docks = Number(station.bikes) + Number(station.empty);

      let cssIcon = L.divIcon({
        className: iconClass,
        iconSize: [50,50],
        html: 
        '<div class="full-bikes">' +
          '<span class="full-bikes-bikes">' + bikes + '</span>' + 
          '<span class="full-bikes-docks">' + docks + '</span>' + 
        '</div>'
      });

      let marker = L.marker([station.lat, station.lng], {icon: cssIcon}),
          chartWidth = 120,
          emptyWidth = Math.round( chartWidth * ( empty / docks ));
  
      if (emptyWidth < 20 && emptyWidth !== 0) {
        emptyWidth = 20; 
      }

      let busyWidth  = chartWidth - emptyWidth;
 
      if (busyWidth < 30 && busyWidth !== 0){
        busyWidth = 30;
        emptyWidth = chartWidth - busyWidth;
      } 

      let bikesLeft = 'No bikes left';

      if ( bikes > 1)   { bikesLeft = bikes + ' bikes'}; 
      if ( bikes === 1) { bikesLeft = bikes + ' bike'};


      // If no bikes lef, don't add empty number to tolltip chart.
      let emptyBikesHTML = "";

      if (empty > 0) {
        emptyBikesHTML = 
          '<div class="bikes-empty" style="width:' + emptyWidth +'px">' + 
            '<span>' + empty + '</span>' +
          '</div>';
      }
      

      marker.bindPopup(
        '<div class="bikes-tooltips">' + 
          '<p>' + bikesLeft + '</p>' + 
          '<div class="bikes-tooltips-chart" style="width:' + chartWidth + 'px">' + 
            '<div class="bikes-busy" style="width:' + busyWidth + 'px">' + 
              '<i class="fa fa-bicycle"></i>' + 
            '</div>' +
            emptyBikesHTML + 
          '</div>' + 
        '</div>',
        { offset: new L.Point(0, -15)}
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
  


