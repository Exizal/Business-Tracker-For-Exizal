import { NextRequest, NextResponse } from 'next/server'

const TOMORROW_API_KEY = 'EYdnndmOJ7l6us3HDLZhaQZrgfR1Nvrx';
const TOMORROW_BASE_URL = 'https://api.tomorrow.io/v4/weather/forecast';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!city && (!lat || !lon)) {
    return NextResponse.json({ error: 'City or coordinates required' }, { status: 400 })
  }

  try {
    let locationParam = '';
    if (city) {
      // Geocode city to lat/lon using Tomorrow.io's built-in geocoding
      locationParam = encodeURIComponent(city);
    } else {
      locationParam = `${lat},${lon}`;
    }
    const url = `${TOMORROW_BASE_URL}?location=${locationParam}&apikey=${TOMORROW_API_KEY}&units=metric`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`Tomorrow.io API error: ${response.status}`);
    }

    const data = await response.json();
    // Extract current and forecast data
    const current = data.timelines?.minutely?.[0]?.values || data.timelines?.hourly?.[0]?.values;
    const locationName = data.location?.name || city || `${lat},${lon}`;
    // Build forecast (next 5 days, using daily timeline if available)
    const forecastArr = (data.timelines?.daily || []).slice(0, 5).map((day: any, idx: number) => ({
      day: idx === 0 ? 'Today' : new Date(day.time).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(day.values.temperatureAvg),
      condition: (day.values.weatherCode || '').toString(),
      humidity: Math.round(day.values.humidityAvg)
    }));
    // Map Tomorrow.io weather codes to text (simplified)
    const weatherCodeMap: Record<string, string> = {
      '1000': 'clear',
      '1100': 'mostlyclear',
      '1101': 'partlycloudy',
      '1102': 'mostlycloudy',
      '1001': 'cloudy',
      '2000': 'fog',
      '2100': 'lightrain',
      '4000': 'drizzle',
      '4001': 'rain',
      '4200': 'lightrain',
      '4201': 'heavyrain',
      '5000': 'snow',
      '5001': 'flurries',
      '5100': 'lightsnow',
      '5101': 'heavysnow',
      '6000': 'freezingdrizzle',
      '6001': 'freezingrain',
      '6200': 'lightfreezingrain',
      '6201': 'heavyfreezingrain',
      '7000': 'icepellets',
      '7101': 'heavyicepellets',
      '7102': 'lighticepellets',
      '8000': 'thunderstorm',
    };
    const condition = weatherCodeMap[(current?.weatherCode || '').toString()] || 'clear';
    const weatherData = {
      location: locationName,
      temperature: Math.round(current?.temperature ?? forecastArr[0]?.temp ?? 0),
      condition,
      humidity: Math.round(current?.humidity ?? forecastArr[0]?.humidity ?? 0),
      windSpeed: Math.round(current?.windSpeed ?? 0),
      feelsLike: Math.round(current?.temperatureApparent ?? current?.temperature ?? forecastArr[0]?.temp ?? 0),
      pressure: Math.round(current?.pressureSurfaceLevel ?? 0),
      visibility: Math.round(current?.visibility ?? 0),
      forecast: forecastArr.map((day: any) => ({
        ...day,
        condition: weatherCodeMap[day.condition] || 'clear',
      })),
    };
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Tomorrow.io API error:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 })
  }
} 