'use client'

import React, { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, MapPin, ChevronDown, ChevronUp, Search, Loader2, Navigation } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-effect'

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  feelsLike: number
  pressure: number
  visibility: number
  forecast: Array<{
    day: string
    temp: number
    condition: string
    humidity: number
  }>
}

const weatherIcons: Record<string, React.ReactNode> = {
  'clear': <Sun className="w-6 h-6 text-yellow-400" />,
  'sunny': <Sun className="w-6 h-6 text-yellow-400" />,
  'clouds': <Cloud className="w-6 h-6 text-gray-300" />,
  'cloudy': <Cloud className="w-6 h-6 text-gray-300" />,
  'overcast': <Cloud className="w-6 h-6 text-gray-400" />,
  'rain': <CloudRain className="w-6 h-6 text-blue-300" />,
  'lightrain': <CloudRain className="w-6 h-6 text-blue-300" />,
  'moderaterain': <CloudRain className="w-6 h-6 text-blue-300" />,
  'heavyrain': <CloudRain className="w-6 h-6 text-blue-400" />,
  'snow': <CloudSnow className="w-6 h-6 text-blue-200" />,
  'lightsnow': <CloudSnow className="w-6 h-6 text-blue-200" />,
  'thunderstorm': <CloudRain className="w-6 h-6 text-purple-300" />,
  'drizzle': <CloudRain className="w-6 h-6 text-blue-300" />,
  'shower': <CloudRain className="w-6 h-6 text-blue-300" />,
  'mist': <Cloud className="w-6 h-6 text-gray-400" />,
  'fog': <Cloud className="w-6 h-6 text-gray-400" />,
  'haze': <Cloud className="w-6 h-6 text-gray-400" />,
  'partlycloudy': <Cloud className="w-6 h-6 text-gray-300" />
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchCity, setSearchCity] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  // Initialize with a default city
  useEffect(() => {
    fetchWeatherData('Istanbul')
  }, [])

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error('Geolocation error:', error)
          // Fallback to a default city
          fetchWeatherData('Istanbul')
        }
      )
    } else {
      // Fallback to a default city
      fetchWeatherData('Istanbul')
    }
  }

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch weather data')
      }
      
      const weatherData = await response.json()
      setWeather(weatherData)
    } catch (error) {
      console.error('Weather fetch error:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch weather data')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchWeatherData = async (city: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'City not found')
      }
      
      const weatherData = await response.json()
      setWeather(weatherData)
    } catch (error) {
      console.error('Weather fetch error:', error)
      setError(error instanceof Error ? error.message : 'City not found or network error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchCity.trim()) {
      fetchWeatherData(searchCity.trim())
      setShowSearch(false)
      setSearchCity('')
    }
  }

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase()
    
    // Try exact match first
    if (weatherIcons[conditionLower]) {
      return weatherIcons[conditionLower]
    }
    
    // Try partial matches for wttr.in data
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return weatherIcons['clear']
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return weatherIcons['clouds']
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
      return weatherIcons['rain']
    } else if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
      return weatherIcons['snow']
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return weatherIcons['fog']
    } else {
      return weatherIcons['clear'] // Default fallback
    }
  }

  if (isLoading) {
    return (
      <GlassCard className="weather-card glass-effect animate-glass-float">
        <div className="weather-header">
          <div className="weather-title">LIVE WEATHER</div>
        </div>
        <div className="weather-loading">
          <Loader2 className="w-6 h-6 animate-spin text-white/60" />
          <span>Loading weather...</span>
        </div>
      </GlassCard>
    )
  }

  if (error || !weather) {
    return (
      <GlassCard className="weather-card glass-effect animate-glass-float">
        <div className="weather-header">
          <div className="weather-title">LIVE WEATHER</div>
          <div className="weather-controls">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="weather-search-button"
            >
              <Search size={14} />
            </button>
          </div>
        </div>
        {showSearch && (
          <div className="weather-search-section">
            <form onSubmit={handleSearch} className="weather-search-form">
              <input
                type="text"
                placeholder="Enter city name..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="weather-search-input"
              />
              <button type="submit" className="weather-search-submit">
                Search
              </button>
            </form>
            <div className="popular-cities">
              <span className="popular-label">Popular:</span>
              <div className="city-buttons">
                {['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Dubai'].map((city) => (
                  <button
                    key={city}
                    className="city-button"
                    onClick={() => fetchWeatherData(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="weather-error">
          <span>{error || 'City not found or network error'}</span>
          <button className="weather-retry-button" onClick={getCurrentLocation}>
            Retry
          </button>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="weather-card glass-effect animate-glass-float">
      <div className="weather-header">
        <div className="weather-title">LIVE WEATHER</div>
        <div className="weather-controls">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="weather-search-button"
            title="Search city"
          >
            <Search size={14} />
          </button>
          <button
            onClick={getCurrentLocation}
            className="weather-location-button"
            title="Use current location"
          >
            <Navigation size={14} />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="weather-toggle"
            title={isExpanded ? "Collapse forecast" : "Expand forecast"}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {showSearch && (
        <form onSubmit={handleSearch} className="weather-search-form">
          <input
            type="text"
            placeholder="Enter city name..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="weather-search-input"
          />
          <button type="submit" className="weather-search-submit">
            Search
          </button>
        </form>
      )}

      <div className="weather-main">
        <div className="weather-location">
          <MapPin size={14} />
          <span>{weather.location}</span>
        </div>
        
        <div className="weather-current">
          <div className="weather-icon">
            {getWeatherIcon(weather.condition)}
          </div>
          <div className="weather-temp">
            <span className="temp-value">{weather.temperature}°</span>
            <span className="temp-unit">C</span>
          </div>
        </div>

        <div className="weather-details">
          <div className="weather-detail">
            <Thermometer size={12} />
            <span>Feels {weather.feelsLike}°</span>
          </div>
          <div className="weather-detail">
            <span>{weather.humidity}%</span>
          </div>
          <div className="weather-detail">
            <Wind size={12} />
            <span>{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="weather-forecast">
          <div className="forecast-title">5-Day Forecast</div>
          <div className="forecast-list">
            {weather.forecast.map((day, index) => (
              <div key={index} className="forecast-item">
                <span className="forecast-day">{day.day}</span>
                <div className="forecast-icon">
                  {getWeatherIcon(day.condition)}
                </div>
                <span className="forecast-temp">{day.temp}°C</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  )
} 