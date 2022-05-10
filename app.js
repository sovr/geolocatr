const express = require('express')
const app = express()
const path = require('path');
const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;
const config = require('./config.json')

const geolite_client = new WebServiceClient(
  config.maxMind_accountID,
  config.maxMind_licenseKey,
  {host: 'geolite.info'}
);
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/ip', (req, res) => {
  res.json({"error": "No IP address provided."})
})

app.get('/ip/:ip', (req, res) => {
  //let's validate input on server side too
  let ip = req.params.ip;
  let reg = /^(?:(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(\.(?!$)|$)){4}$/;
  if(ip == "" || !ip.match(reg)) {
    res.json({"error": "Not a valid IPv4 address."})
    return;
  }
  geolite_client.city(ip).then(response => {
    let latitude = response.location.latitude
    let longitude = response.location.longitude
    res.json({"latitude": latitude, "longitude": longitude})
  }).catch((err) => {
    res.json({"code": err.code, "error": err.error})
  })
})

app.listen(config.port, () => {
  console.log(`geolocatr is listening on port ${config.port}.`)
})
