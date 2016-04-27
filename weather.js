var http = require("http"); // these APIs aren't available until we require them, so have to require the https module.

// print out message
function printMessage(name, description, maxTemp, humidity) {
    var message = "The weather forecast in " + name + " is predicting " + description +
        " with a maximum temperature of " + maxTemp + " degrees and humidity of " + humidity + "%.";
    console.log(message);
}

// print out error messages
function printError(error) {
    console.error(error.message);
}

// request and response
function get(name) {
    // 1 Connect to the API url (api.openweathermap.org/data/2.5/weather?q={city name}
    var request = http.get("http://api.openweathermap.org/data/2.5/weather?q={" + name + "}&units=metric&APPID=61e07a219b81dc4678c0693d225e5adf",
        function(response) {
            var body = "";
            // 2 Read the data from the response
            response.on('data', function(chunk) {
                body += chunk;
            });

            response.on('end', function() {            
                if (response.statusCode === 200) {
                    try {
                        // 3 Parse the data
                        var weatherData = JSON.parse(body);                      
                        // 4 Print data out
                        printMessage(weatherData.name, weatherData.weather[0].description, weatherData.main.temp_max, weatherData.main.humidity);
                    } catch (error) {
                        // parse error
                        printError(error);
                    }
                } else {
                    printError({ message: "There was an error getting the weather for " + name + ". (" + http.STATUS_CODES[response.statusCode] + ")" });
                }
            });
            // connecion error
            request.on('error', printError);
        });
}
// export function called get.
module.exports.get = get;
