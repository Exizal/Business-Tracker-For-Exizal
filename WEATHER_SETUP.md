# Weather Widget Setup

## Getting Real-Time Weather Data

To enable real-time weather data in the weather widget, follow these steps:

### 1. Get a Free API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard

### 2. Set Up Environment Variables
Create a `.env.local` file in your project root and add:

```
OPENWEATHER_API_KEY=your_actual_api_key_here
```

### 3. Features
- **Real-time weather data** from OpenWeatherMap API
- **Geolocation support** - automatically detects user's location
- **City search** - search for any city worldwide
- **5-day forecast** with expandable view
- **Celsius temperature** display
- **Error handling** with retry functionality
- **Loading states** with proper feedback

### 4. API Endpoints Used
- Current weather: `/api/weather?city=London` or `/api/weather?lat=40&lon=-74`
- 5-day forecast: Automatically included with current weather

### 5. Weather Conditions Supported
- Clear, Clouds, Rain, Snow, Thunderstorm
- Drizzle, Mist, Smoke, Haze, Dust, Fog
- Sand, Ash, Squall, Tornado

The weather widget will work immediately with mock data, but will show real-time data once you add your API key. 