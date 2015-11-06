WeatherDescription = React.createClass({
  propTypes: {
    current:      React.PropTypes.object.isRequired,
    forecastHour: React.PropTypes.object.isRequired,
    hourly:       React.PropTypes.array.isRequired,
    today:        React.PropTypes.object.isRequired
  }, 

  tempChange() {
    let current =       this.props.current,
        forecastHour =  this.props.forecastHour,
        forecast =      'remains stable';

    if (current.temp > forecastHour.temp) {
      forecast = 'dropping'
    } else if (current.temp < forecastHour.temp) {
      forecast = 'rising'
    } else {
      forecast = 'stable'
    }

    return forecast;
  },

  render() {
    let current     = this.props.current,
        sunset      = moment(this.props.today.sunset).format("h:MM A"),
        sunrise     = moment(this.props.today.sunrise).format("h:MM A"),
        sunsetText  = ' will set ',
        sunriseText = ' will rise ',
        now         = new Date,
        maxTemp     = this.props.today.tempMax,
        minTemp     = this.props.today.tempMin,
        maxHour     = moment(this.props.today.tempMaxTime).format("h:00 A"),
        minHour     = moment(this.props.today.tempMinTime).format("h:00 A"),
        summary     = this.props.forecastHour.summary, 
        tempMatches = summary.match(/(\d+)°F/);
        tempValue   = tempMatches[1];
        tempC       = Math.round(10 * (tempValue - 32) * 5 / 9)/10;

        summarySplit = summary.split(/(\d+)°F/);

        summary      = summarySplit[0] + tempC + "°C" + summarySplit[2];

        if (now > this.props.today.sunrise) {
          sunriseText = ' rose ';
        }

        if (now > this.props.today.sunset) {
          sunsetText = ' set ';
        }

    return (
      <div id="weather-description">
        <p>
          { summary } &nbsp;
          Highest temperature today of { maxTemp }&deg;C around { maxHour } and the lowest temperature of { minTemp }&deg;C around { minHour }.&nbsp;
        </p>
        <p>
          The sun { sunriseText } at { sunrise } today and { sunsetText } at { sunset }.
        </p>
      </div>
    )
  }
})
  