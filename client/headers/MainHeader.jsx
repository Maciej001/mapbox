MainHeader = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let forecastsSub = Meteor.subscribe('forecasts');

    // Build a query to get next 'hourly' forecast 
    let now = new Date();
    let hour = new Date();
    hour.setHours(hour.getHours() + 1);
    let query = {
      type: 'hourly',
      time: { $gte: now, $lte: hour }
    }

    return {
      forecastsLoaded: forecastsSub.ready(),
      current:      Forecasts.findOne({ type: 'current' }),
      forecastHour: Forecasts.findOne({}, { sort: { time: 1 } }),
      hourly:       Forecasts.find({ type: 'hourly' }, {limit: 6}).fetch(),
      today:        Forecasts.findOne({ type: 'daily'}, { sort: { time: 1 }, limit: 1 })
    }
  },

  getInitialState() {
    return {
      forecastPanel: false
    }
  },

  showForecast(){ 
    this.setState({ forecastPanel: !this.state.forecastPanel });
  },

  render() {
    let forecastPanelClass = 'glyphicon glyphicon-arrow-down';

    this.state.forecastPanel ? 
      forecastPanelClass = 'glyphicon glyphicon-arrow-up'
    :
      forecastPanelClass = 'glyphicon glyphicon-arrow-down'; 

    return (
      <div>
        <nav id="main-header">
          <div id="brand-name" className="col-xs-2">
            <h4>BB</h4>
          </div>

          { this.data.forecastsLoaded ?
            <div id="weather-info" className="col-xs-8">
              <div id="weather-info-center">
                <i className={ this.data.current.icon }></i>
                <h3>{ this.data.current.temp }&deg;C</h3>
                <h4>{ moment(new Date).format("dddd, Do MMMM YYYY") }</h4>
              </div>
            </div>
          :
            "?"
          }
          <div id="forecast" className="col-xs-2">
            <span className={ forecastPanelClass } onClick={ this.showForecast }></span>
          </div>
        </nav>

        { this.data.forecastsLoaded && this.state.forecastPanel ?
            <Forecast 
              current =       { this.data.current } 
              forecastHour =  { this.data.forecastHour }
              hourly =        { this.data.hourly }
              today =         { this.data.today }
            />
            : "" 
        }

      </div>
    ) // return
  }
    
});












