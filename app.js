var weather = require("./weather.js");
var city = process.argv.slice(2);

city.forEach(weather.get);
