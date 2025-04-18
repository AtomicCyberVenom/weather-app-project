const apiKey = "b5e6321f70f9410eb8531738251004";
const apiUrl = "https://api.weatherapi.com/v1/current.json";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const tempElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener('click', function() {
    const location = locationInput.value;
    if (location) {
        getWeatherData(location);
    }
});

locationInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const location = locationInput.value;
        if (location) {
            getWeatherData(location);
        }
    }
});

async function getWeatherData(location) {
    try {
        const response = await fetch(`${apiUrl}?key=${apiKey}&q=${location}&aqi=no`);

        if (!response.ok) {
            throw new Error('City not found or API error');
        }

        const data = await response.json();
        displayWeatherData(data);
    } catch(error) {
        console.error("Oops. Error has occurred", error.message);
        document.getElementById("weather-info").innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayWeatherData(data) {
    locationElement.textContent = `${data.location.name}, ${data.location.country}`;
    tempElement.textContent = `Temperature: ${data.current.temp_c}°C / ${data.current.temp_f}°F`;
    descriptionElement.textContent = `Condition: ${data.current.condition.text}`;
}
