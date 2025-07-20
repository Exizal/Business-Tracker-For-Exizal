import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!city && (!lat || !lon)) {
    return NextResponse.json({ error: 'City or coordinates required' }, { status: 400 })
  }

  try {
    let url: string

    if (city) {
      // Use wttr.in API - free, no API key required, real-time data
      url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`
    } else {
      url = `https://wttr.in/${lat},${lon}?format=j1`
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    })
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()

    // Transform wttr.in data to match our interface
    const current = data.current_condition[0]
    const location = data.nearest_area[0]
    
    const weatherData = {
      location: location.areaName[0].value,
      temperature: parseInt(current.temp_C),
      condition: current.weatherDesc[0].value.toLowerCase().replace(/\s+/g, ''),
      humidity: parseInt(current.humidity),
      windSpeed: parseInt(current.windspeedKmph),
      feelsLike: parseInt(current.FeelsLikeC),
      pressure: parseInt(current.pressure),
      visibility: parseInt(current.visibility),
      forecast: data.weather.slice(0, 5).map((day: any, index: number) => ({
        day: index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: parseInt(day.hourly[4].tempC), // Use noon temperature
        condition: day.hourly[4].weatherDesc[0].value.toLowerCase().replace(/\s+/g, ''),
        humidity: parseInt(day.hourly[4].humidity)
      }))
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 })
  }
} 