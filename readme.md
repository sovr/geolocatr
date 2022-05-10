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

## Testing
For now, you can test the app manually by typing in input to the input field and submitting it.
There is also an API endpoint that can be tested.

**Front End Tests**
Run the web app.
1. Type in any string to the input field, and submit.
 - Pass: "Not a valid IPv4 address is" is displayed.
2. Leave the field empty, and submit.
  - Pass: "Not a valid IPv4 address is" is displayed.
3. Enter in a valid IPv4 address, and submit.
  - Pass: Latitude and longitude are displayed.
4. Enter an address without periods.
  - Pass: "Not a valid IPv4 address is" is displayed.
5. Enter an address with extra numbers.
  - Pass: "Not a valid IPv4 address is" is displayed.
6. Make the api keys in config.json empty strings, and restart the app.
  - Pass: "An account ID and license key are required to use this service." is displayed.

**Server Tests**
Run the web app.
1. Go to http://localhost:yourporthere/ip/
  - Pass: `{"error":"No IP address provided."}` is displayed.
2. Go to http://localhost:yourporthere/ip/123121
  - Pass: `{"error":"Not a valid IPv4 address."}` is displayed.
3. Go to http://localhost:3000/ip/104.28.22.115
  - Pass: `{"latitude":-82.6763,"longitude":8.7891}` is displayed.
4. Make the api keys in config.json empty strings, and restart the app.
  - Pass: `{"code":"ACCOUNT_ID_REQUIRED","error":"An account ID and license key are required to use this service."}` is displayed.
