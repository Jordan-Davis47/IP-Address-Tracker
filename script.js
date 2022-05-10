const secretApi = 'at_rtl3K458E24eKYMNGLaffvkr6M9e7';
const bypassCorsUrl = 'https://cors.anywhere.herokuapp.com/'
const api_url = 'https://geo.ipify.org/api/v2/' 

const currentIp = document.querySelector('#current-ip')
const currentTimezone = document.querySelector('#current-timezone')
const currentLocation = document.querySelector('#current-location')
const currentIsp = document.querySelector('#current-isp')

const enteredIp = document.querySelector('.ip-input');
const searchButton = document.querySelector('.ip-button')

const showLess = document.querySelector('.show-less');
const showMore = document.querySelector('.show-more');
const ipInfo = document.querySelector('.ip-info');

let latitude;
let longitude;

const headersOption = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}

const map = L.map('map', {zoomControl: false}).setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoiam9yZGFuZDQ3IiwiYSI6ImNrejc2bjhiaTBhM2sydnBpeWFtMzBxdzUifQ.siy8mc1j5aptzEVnpryQDg'
}).addTo(map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();


function updateMarker(Marker = [20, 42]) { 
    map.setView(Marker, 13)
    L.marker(Marker).bindPopup(`Latitude: ${latitude}, Longitude: ${longitude}`).openPopup().addTo(map)
}

function getIp(defaultIp) { 

    if (defaultIp === undefined) {
         ip_url = `https://geo.ipify.org/api/v2/country,city?apiKey=${secretApi}`
    } else { 
         ip_url = `https://geo.ipify.org/api/v2/country,city?apiKey=${secretApi}&ipAddress=${defaultIp}`
    }

    fetch(ip_url)
        .then(results => results.json())
        .then(data => { 
            currentIp.innerHTML = data.ip
            currentLocation.innerHTML = `${data.location.city},  ${data.location.country}  ${data.location.postalCode}`
            currentTimezone.innerHTML = data.location.timezone
            currentIsp.innerHTML = data.isp
            console.log(data, data.location, data.location.lat)
            latitude = data.location.lat;
            longitude = data.location.lng;

            updateMarker([data.location.lat, data.location.lng])
        })
        .catch(error => console.log(error))
}

getIp();


document.addEventListener('load', updateMarker())

searchButton.addEventListener('click', (e) => { 
    e.preventDefault();
    if (enteredIp.value != '' && enteredIp != null) { 
        getIp(enteredIp.value);
        return
    } 

    alert('Please enter a valid IP address')
})







