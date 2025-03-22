import { NextResponse } from "next/server"

const API_KEY = process.env.OPENWEATHER_API_KEY

// Add this line at the top of your route handler for debugging
console.log("Using API key:", process.env.OPENWEATHER_API_KEY)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ message: "City parameter is required" }, { status: 400 })
  }

  if (!API_KEY) {
    return NextResponse.json({ message: "API key not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)

    if (!response.ok) {
      const errorData = await response.json()

      if (response.status === 404) {
        return NextResponse.json(
          { message: "City not found. Please check the spelling and try again." },
          { status: 404 },
        )
      }

      return NextResponse.json(
        { message: errorData.message || "Failed to fetch weather data" },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json({ message: "Failed to fetch weather data" }, { status: 500 })
  }
}

