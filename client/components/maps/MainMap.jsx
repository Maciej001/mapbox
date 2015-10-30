MainMap = React.createClass({
  componentDidMount() {
    Mapbox.load();

    Tracker.autorun(function () {
      if (Mapbox.loaded()) {
        L.mapbox.accessToken = 'pk.eyJ1IjoibWFjaWVqcGwiLCJhIjoiY2lmbnY0ZzUwMDFha3RubHl2dGsyYTVrcyJ9.TpW2NGaRUxgDhzfxJxeJpA';
        let map = L.mapbox.map('main-map', 'mapbox.streets')
                    .setView([51.593938, -0.163895], 14);
      }
    });
  },

  render() {
    return (
      <div id="main-map"></div>
    )
  }
})
  


