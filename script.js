document
  .getElementById("weatherForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const apiKey = "62ef5d2aaf9118bd7bbc595ad9688a76"; // Your new API key
    const city = document.getElementById("cityInput").value.trim();
    const unit = document.getElementById("unitSelect").value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

    console.log("API URL:", apiUrl); // Log the URL to check if it's correct

    fetch(apiUrl)
      .then((response) => {
        console.log("Response status:", response.status); // Log the response status
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Invalid API key");
          } else {
            throw new Error("City not found");
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data); // Log the data
        const cityName = document.getElementById("cityName");
        const temperature = document.getElementById("temperature");
        const weatherDescription =
          document.getElementById("weatherDescription");
        const unitDisplay = document.getElementById("unit");

        cityName.textContent = data.name;
        temperature.textContent = data.main.temp;
        weatherDescription.textContent = data.weather[0].description;

        unitDisplay.textContent = unit === "metric" ? "C" : "F";

        document.getElementById("weatherInfo").classList.remove("hidden");
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error fetching weather:", error);
      });
  });
