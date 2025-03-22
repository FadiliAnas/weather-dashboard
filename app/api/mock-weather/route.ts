import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ message: "City parameter is required" }, { status: 400 })
  }

  // Generate mock data based on the city name
  const mockData = generateMockWeatherData(city)

  return NextResponse.json(mockData)
}

function generateMockWeatherData(city: string) {
  // Use the city name to generate consistent mock data
  const cityHash = [...city].reduce((acc, char) => acc + char.charCodeAt(0), 0)

  const temp = 273.15 + (cityHash % 30) // Between 0°C and 30°C
  const humidity = 30 + (cityHash % 60) // Between 30% and 90%
  const windSpeed = 1 + (cityHash % 10) // Between 1 and 10 m/s

  const weatherConditions = [
    { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
    { id: 801, main: "Clouds", description: "few clouds", icon: "02d" },
    { id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" },
    { id: 500, main: "Rain", description: "light rain", icon: "10d" },
    { id: 600, main: "Snow", description: "light snow", icon: "13d" },
  ]

  const weatherIndex = cityHash % weatherConditions.length

  return {
    name: city,
    main: {
      temp: temp,
      feels_like: temp - 2,
      temp_min: temp - 3,
      temp_max: temp + 3,
      pressure: 1000 + (cityHash % 30),
      humidity: humidity,
    },
    weather: [weatherConditions[weatherIndex]],
    wind: {
      speed: windSpeed,
      deg: cityHash % 360,
    },
    sys: {
      country: "XX",
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 3600,
    },
    coord: {
      lon: (cityHash % 360) - 180,
      lat: (cityHash % 180) - 90,
    },
  }
}

