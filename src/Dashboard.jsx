import { useState, useEffect } from "react";
import InfoBox from "./infoBox";
import SearchBox from "./SearchBox";
import WeatherChart from "./WeatherCharts";
import StateWeatherChart from "./StateWeatherChart";

const presetLocations = [
  { label: "My Location", value: "local" },
  { label: "New York", value: "New York" },
  { label: "London", value: "London" },
  { label: "Tokyo", value: "Tokyo" },
];

export default function Dashboard() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("local");
  const [loading, setLoading] = useState(false);

  
  
    const API_KEY = "03c0cb8317a21679c25691cf297f04a7";
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  
    const updateInfo = async (city) => {
      if (!city || typeof city !== "string") return;
      setLoading(true);
      try {
        const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        console.log("Fetching city:", url);
  
        const response = await fetch(url);
        const jsonResponse = await response.json();
  
        if (jsonResponse.cod !== 200) {
          throw new Error(jsonResponse.message || "City not found. Try again.");
        }
  
        setWeatherInfo({
          city: jsonResponse.name,
          temp: jsonResponse.main.temp,
          tempMin: jsonResponse.main.temp_min,
          tempMax: jsonResponse.main.temp_max,
          humidity: jsonResponse.main.humidity,
          feelsLike: jsonResponse.main.feels_like,
          weather: jsonResponse.weather[0].description,
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        setWeatherInfo(null);
      }
      setLoading(false);
    };
  
    const fetchWeatherByLocation = async (latitude, longitude) => {
      setLoading(true);
      try {
        const url = `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        console.log("Fetching location weather:", url);
  
        const response = await fetch(url);
        const jsonResponse = await response.json();
  
        if (jsonResponse.cod !== 200) {
          throw new Error(jsonResponse.message || "Unable to fetch location weather.");
        }
  
        setWeatherInfo({
          city: jsonResponse.name,
          temp: jsonResponse.main.temp,
          tempMin: jsonResponse.main.temp_min,
          tempMax: jsonResponse.main.temp_max,
          humidity: jsonResponse.main.humidity,
          feelsLike: jsonResponse.main.feels_like,
          weather: jsonResponse.weather[0].description,
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        setWeatherInfo(null);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      if (filter === "local") {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByLocation(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            setError("Unable to retrieve your location");
          }
        );
      } else {
        updateInfo(filter);
      }
    }, [filter]);
  

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            
          </div>
  
          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <SearchBox updateInfo={updateInfo} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              >
                {presetLocations.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center my-6">
              <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
  
          {/* Error State */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6">
              {error}
            </div>
          )}
  
          {/* Weather Display */}
          {weatherInfo && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Weather Info Card */}
                <div className="flex justify-center">
                  <InfoBox info={weatherInfo} />
                </div>
  
                {/* Temperature Chart */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <h2 className="text-lg font-semibold mb-3 text-gray-800">
                    Temperature Trends
                  </h2>
                  <div className="h-64">
                    <WeatherChart />
                  </div>
                </div>
              </div>
  
              {/* State Comparison Chart */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">
                  Regional Comparison
                </h2>
                <div className="h-64">
                  <StateWeatherChart />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }