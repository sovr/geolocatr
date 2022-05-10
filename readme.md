# Geolocatr
By Sarah Ovresat.

A web app that echoes out latitude and longitude information, given an IPv4 address.

## How to set up and run
1. Clone this repo into a directory.
2. Duplicate the `config.json.example` file and rename it to `config.json`
3. In config.json, set `maxMind_accountID` and `maxMind_licenseKey`.
4. Run `docker-compose` build for an initial image.
5. Once that's done, run `docker-compose up`. You will be able to access the app at `localhost:3000`
6. Woo hoo! Now feed it IPv4 addresses. :)
