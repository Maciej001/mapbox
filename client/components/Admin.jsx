Admin = React.createClass({
  mixins: [ ReactMeteorData ],

  getMeteorData() {

    let stationsSub =     Meteor.subscribe('stations');

    return {
      stations:         Stations.find().fetch()
    }
  },

  generateStations(e) {
    e.preventDefault();

    Meteor.call("generateStations");
    
  }, 

  render() {
    return (
      <div className="container">
        <h2>Admin</h2>

        <div className="row">
          <div className="col-xs-12 col-md-4">
            
            <div className="admin-row">
              <h4>Generate Stations</h4>
              <button id="generate-stations" 
                className="btn btn-primary" 
                onClick={ this.generateStations }>
                Generate
              </button>
            </div>

          </div>
        </div>

      </div>
    )
  }
  
});
