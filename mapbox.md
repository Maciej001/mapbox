#MAPBOX

## Layers

`map.addLayer(aNewLayer)`
`aNewLayer.addTo(map)`

## TileLayer

`L.mapBox.tileLayer('map.id').addTo(map)`

## LayerGroups 
```
map.eachLayer(function(l) {
  do something
});
```

```
var layerGroup = L.layerGroup().addTo(map);
L.mapbox.tileLayer('map.id1').addTo(layerGroup);
L.mapbox.tileLayer('map.id2').addTo(layerGroup);
```

## GeoJSON

```
L.geoJson({
  type: 'FeatureCollection',
  features: [{
      type: 'Feature',
      properties: {},
      geometry: {
          type: 'LineString',
          coordinates: [[0, 0], [10, 20]]
      }
  }, {
      type: 'Feature',
      properties: {},
      geometry: {
          type: 'Point',
          coordinates: [0, 0]
      }
  }]
}).addTo(map);
```

## Identifying Layers 
 
```
// assign the layer of cars to the variable carsLayer
var carsLayer = L.mapbox.tileLayer('myid.cars');
// add that layer to a map
carsLayer.addTo(map);
// remove that layer from a map
map.removeLayer(carsLayer);
```

## ready()

```
var layer = L.mapbox.tileLayer('mapbox.streets');
layer.on('ready', function() {
  // the layer has been fully loaded now, and you can
  // call .getTileJSON and investigate its properties
});
```

# Creating maps

## Create map

`L.mapbox.map('element-map-id', map-id )`

## Simple Marker

'marker-color' - #3bb2d0
'marker-size'  - small, medium, large
'marker-symbol' - one from [Maki](https://www.mapbox.com/maki/) collection

```
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([37.9, -77], 6);

L.marker([37.9, -77], {   // lat, lng
    icon: L.mapbox.marker.icon({
        'marker-size': 'large',
        'marker-symbol': 'bus',
        'marker-color': '#fa0'
    })
}).addTo(map);
```

## Meteor React Mapbox - simple markers
```
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
        L.mapbox.accessToken = ACCESS_TOKEN;
        self.map = L.mapbox.map('main-map', 'mapbox.streets')
                    .setView([51.517373, -0.088727], 16);
      } 
    });
    
  },

  addMarkers() {     
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

  render() {
    if ( this.data.stationsLoaded ) {
      this.addMarkers();
    }
    return (
      <div id="main-map"></div>
    )
  }
})
```


















