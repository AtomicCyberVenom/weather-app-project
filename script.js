const apiKey = "b5e6321f70f9410eb8531738251004";
const apiUrl = "http://api.weatherapi.com/v1/current.json";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton"); // Fixed typo
const locationElement = document.getElementById("location");
const tempElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener('click', function() {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?key=${apiKey}&q=${location}&aqi=yes`; // Correct parameters
    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.location.name;
            tempElement.textContent = `${Math.round(data.current.temp_c)}°C`;
            descriptionElement.textContent = data.current.condition.text;
        })
        .catch(error => {
            console.error("Error encountered:", error); // Fixed typo
        });
}
