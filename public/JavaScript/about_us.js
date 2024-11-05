$(document).ready(function () {

function weatherapi(lat, lng) {
    var weatherapiurl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`

    $.ajax({url:weatherapiurl,
        method: "GET",
    success: function (data) {
        var parser = new DOMParser()
        temp_unit = data["current_units"]["temperature_2m"]
        wind_unit = data["current_units"]["wind_speed_10m"]
        temp = data["current"]["temperature_2m"]
        wind = data["current"]["wind_speed_10m"]
        var html = `<span  id="temp"><b>The Tempture is: ${temp} ${temp_unit} and the wind speed is: ${wind} ${wind_unit}`
        if (temp > 25) html = html + "</br>The Tempture is too hot keep you pet hydrated</b></span>"
        if (temp <= 25 && temp >= 18) html = html + "</br>The Tempture is great for long walks</b></span>"
        if (temp < 18) html = html + "</br>The Tempture is too cold keep your pet warm</b></span>"
        var doc = parser.parseFromString(html, 'text/html')
        document.getElementById("res").innerHTML = doc.body.outerHTML
},
error: function (xhr, status, error) {
    console.error('Error fetching weather data:', error);
}})
}

function mapsapi() {
    var dburl = "http://localhost/API/suppliers/locations"
    // position we will use later
    var lat = 31.97126336775306;
    var lon = 34.770927751827784;

    // initialize map
    map = L.map('mapDiv').setView([lat, lon], 13);

    // set map tiles source
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);
    // add marker to the map
    marker = L.marker([lat, lon]).addTo(map);

    // add popup to the marker
    marker.bindPopup("<b>Furry Tail Tales<b>,IL").openPopup();
    $.ajax({url:dburl, 
        method: "GET",
        withCredentials: true,
        success: function (data) {
        data.forEach(element => {
            element["locations"].forEach(location => {
                marker = L.marker([location.lat, location.lng]).addTo(map);
                // add popup to the marker
                marker.bindPopup(`<b>${element.companyName}<b>,IL`);
            })
        });
    },
            error: function (xhr, status, error) {
                console.error('Error fetching locations data:', error);
}})
    map.on('click', function (e) {
        weatherapi(e.latlng.lat, e.latlng.lng)
    })
} 
mapsapi()
weatherapi(31.97126336775306,34.770927751827784)
});
