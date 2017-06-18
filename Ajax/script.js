//Philip Chang - Cs 290 - HW6 - Ajax
//script.js
var url = "http://api.openweathermap.org/data/2.5/weather?";
var key = "&appid=fa7d80c48643dfadde2cced1b1be6ca1";
var system = "&units=imperial";

document.getElementById("cizip").addEventListener("click", function(event){
  for (i = 0; i < document.getElementById("results").getElementsByTagName("span").length; i++) {
    document.getElementById("results").getElementsByTagName("span")[i].innerHTML = "";
  } //clears everytime the weather is caleld so it wont be some giant box
  var city = document.getElementById("city").value;
  var zipcode = document.getElementById("zipcode").value;
  if (city.length != 0){
    var submit = "q=" + city;
  }else if (zipcode.length != 0){
    var submit = "zip=" + zipcode;
  }
  var req = new XMLHttpRequest();
  req.open("GET", url + submit + system + key, true);
  req.addEventListener("load",function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      var id = document.createElement("span");
      id.innerHTML = "ID: " + response.id + "<br />";
      document.getElementById("results").appendChild(id);
      var name = document.createElement("span");
      name.innerHTML = "Name: " + response.name + "<br />";
      document.getElementById("results").appendChild(name);
      var coord = document.createElement("span");
      coord.innerHTML = "Longitude: " + response.coord.lon + " Latitude: "+ response.coord.lat + "<br />";
      document.getElementById("results").appendChild(coord);
      var temp = document.createElement("span");
      temp.innerHTML = "Temperature: " + response.main.temp + " °F" +"<br />"
      document.getElementById("results").appendChild(temp);
      var humid = document.createElement("span");
      humid.innerHTML = "Humidity: " + response.main.humidity + "%" + "<br />";
      document.getElementById("results").appendChild(humid);
      var weatherd = document.createElement("span");
      weatherd.innerHTML = "Description: " + response.weather[0].description + "<br />";
      document.getElementById("results").appendChild(weatherd);

    }
    else{
      console.log("Error in network request: " + req.statusText);
    }
  })
  req.send(null);
  event.preventDefault();
});

var url2 = "http://httpbin.org/post";
document.getElementById("urlSubmit").addEventListener("click", function(event){
    var req = new XMLHttpRequest();
    var payload = {send:null};
    payload.send = document.getElementById("send").value;
    req.open("POST", url2, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load",function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        var parse = JSON.parse(response.data);
        var stuff = document.createTextNode(parse["send"]);
        document.getElementById("results2").appendChild(stuff);
        var lines = document.createElement("br");
        document.getElementById("results2").appendChild(lines);

      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(JSON.stringify(payload));
    event.preventDefault();
  });
