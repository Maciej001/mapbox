Forecast = React.createClass({
  propTypes: {
    current:      React.PropTypes.object.isRequired,
    forecastHour: React.PropTypes.object.isRequired,
    hourly:       React.PropTypes.array.isRequired,
    today:        React.PropTypes.object.isRequired,
  },

  render() {

    return (
      <div id="forecastPanel">
        <div className="container">
          <WeatherDescription 
            current =       { this.props.current } 
            forecastHour =  { this.props.forecastHour }
            hourly =        { this.props.hourly }
            today =         { this.props.today } 
          />
        </div>
      </div>
      
    )
  }
});


  