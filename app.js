// import express
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

// create an express app
const app = express();
//make the appp use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// what we get when visiting the home page
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = { Insert_API_Key };
  const unit = req.body.unitList;

  if (unit == "Celsius") {
    var unitKey = "metric";
  } else if (unit == "Fahrenheit") {
    var unitKey = "imperial";
  } else {
    var unitKey = "";
  }
  URL =
    " https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unitKey;
  https.get(URL, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const tempdescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      res.write(
        "<h1>The temperature today in " +
          query +
          " is " +
          temp +
          " degrees celsius</h1>"
      );
      res.write("Today is:" + tempdescription);
      res.write(
        "<img src = http://openweathermap.org/img/wn/" + icon + "@2x.png>"
      );
      res.send();
    });
  });
});
// port serving the app
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
