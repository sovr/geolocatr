'use strict';

const e = React.createElement;

class GeoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      errMsg: '',
      geoData: ['','']
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    //validate the input
    let ip = this.state.value;
    let reg = /^(?:(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(\.(?!$)|$)){4}$/;
    if(ip == "" || !ip.match(reg)) {
      this.setState({errMsg: "Not a valid IPv4 address.", geoData: ['','']});
      return;
    }
    //
    //api endpoint req
    fetch("./ip/" + ip).then(response => {
      return response.json()
    }).then(data => {
      console.log(data)
      if(data.error) {
        this.setState({errMsg: data.error, geoData: ['','']});
      } else {
        this.setState({errMsg: '', geoData: [data.latitude, data.longitude]});
      }
    }).catch( err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div class="main__inner">
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Enter an IPv4 address.</p>
            <input class="main__input" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input class="main__submit" type="submit" value="Submit" />
        </form>
        <p class="error">{this.state.errMsg}</p>
        <p>Latitude: {this.state.geoData[0]}</p>
        Longitude: {this.state.geoData[1]}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(<GeoForm />);
