import { useState, useEffect } from "react";
import InfoBox from "./infoBox";
import SearchBox from "./SearchBox";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [locationDenied, setLocationDenied] = useState(false);

    // Keep all existing API logic and useEffect the same

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <MapPinIcon className="w-8 h-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-800">
                            Weather Dashboard
                        </h1>
                    </div>
                    
                    {locationDenied && (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-lg">
                            Location access denied. Showing default weather for Delhi.
                        </div>
                    )}
                </div>

                {/* Search Box */}
                <SearchBox updateInfo={updateInfo} />

                {/* Loading & Error States */}
                {loading && (
                    <div className="flex justify-center my-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Weather Display */}
                {!loading && weatherInfo && (
                    <div className="space-y-6">
                        <InfoBox info={weatherInfo} />
                    </div>
                )}
            </div>
        </div>
    );
}