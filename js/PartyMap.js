let lat;
let lon;

function getUserLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            map.setCenter([lat, lon]);
            L.marker([lat, lon]).addTo(map)
                .bindPopup('Je bent hier<br>Lat: ' + lat + '<br>Lon: ' + lon)
                .openPopup();
        });
    } else {
        alert('Geolocatie wordt niet ondersteund in deze browser');
    }
}

maptilersdk.config.apiKey = 'kjGRANoU11KeAIpWUN15';
const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element to render the map
    style: maptilersdk.MapStyle.STREETS,
    center: [16.62662018, 49.2125578], // starting position [lng, lat]
    zoom: 14, // starting zoom
});