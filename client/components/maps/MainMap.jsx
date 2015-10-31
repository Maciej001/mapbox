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

  addMap() {     
    let self = this;
    Tracker.autorun(() => {
      if ( Mapbox.loaded() ) {
        _.each(this.data.stations, (station) => {

          L.marker([station.lat, station.lng], {
            icon: L.mapbox.marker.icon({
              'marker-size': 'medium',
              'marker-symbol': 'bicycle',
              'marker-color': '#ac1a3b'
            })
          }).addTo(self.map);
        });
      }
    });
  },

  geoJsonMarkers() {
    let self = this;
    let stations = this.data.stations;

    let markers = []

    let myLayer = L.mapbox.featureLayer().addTo(self.map);

    stations.forEach((station) => {
      let marker = {
        type: "Feature",
        geometry: {
          type: "Point",
          "coordinates": [station.lat, station.lng]
        },
        properties: {
          icon: {
            className: "my-icon icon-dc",
            html: "&#9733",
            iconSize: null
          }
        }
      }

      markers.push(marker);
    });

    myLayer.on('layeradd', (e) => {
      let marker = e.layer, 
          feature = marker.feature;
      marker.setIcon(L.divIcon(feature.properties.icon));
    });

    myLayer.setGeoJSON(markers);


  }, 

  render() {
    if ( this.data.stationsLoaded ) {
      this.addMap();
    }
    return (
      <div id="main-map"></div>
    )
  }
})
  


