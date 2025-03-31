import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import CompressIcon from "@mui/icons-material/Compress";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export default function InfoBox({ info }) {
  const WEATHER_IMAGES = {
    hot: "https://images.unsplash.com/photo-1447601932606-2b63e2e64331?w=600&auto=format&fit=crop&q=60",
    cold: "https://images.unsplash.com/photo-1519944159858-806d435dc86b?w=600&auto=format&fit=crop&q=60",
    rainy: "https://images.unsplash.com/photo-1565065524861-0be4646f450b?w=600&auto=format&fit=crop&q=60",
  };

  const getWeatherType = () => {
    if (!info) return "hot";
    if (info.humidity > 80) return "rainy";
    return info.temp > 15 ? "hot" : "cold";
  };

  const weatherType = getWeatherType();
  const imageUrl = WEATHER_IMAGES[weatherType];

  const WeatherIcon = () => {
    switch (weatherType) {
      case "rainy":
        return <OpacityIcon className="w-5 h-5 text-blue-500" />;
      case "cold":
        return <CompressIcon className="w-5 h-5 text-blue-300" />;
      default:
        return <WbSunnyIcon className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all w-full max-w-md">
        {/* Weather Image */}
        <div className={`relative ${weatherType === 'hot' ? 'h-32' : 'h-40'} overflow-hidden`}>
          <img
            src={imageUrl}
            alt={info?.weather || "Weather"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h2 className="text-xl font-bold text-white">
              {info?.city || "Unknown Location"}
            </h2>
            <div className="flex items-center gap-1 text-white/90">
              <WeatherIcon />
              <span>{info?.weather || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Weather Content */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {/* Temperature */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <ThermostatIcon className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-600">
                  {info?.temp ?? "--"}°C
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Feels like {info?.feelsLike ?? "--"}°C
              </p>
            </div>

            {/* Humidity */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <OpacityIcon className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-600">
                  {info?.humidity ?? "--"}%
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Humidity</p>
            </div>

            {/* Min/Max Temp */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-600">Min</p>
                  <p className="font-bold text-blue-600">
                    {info?.tempMin ?? "--"}°C
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Max</p>
                  <p className="font-bold text-blue-600">
                    {info?.tempMax ?? "--"}°C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}