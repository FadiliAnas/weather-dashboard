import { NextResponse } from "next/server"

export async function GET() {
  const API_KEY = process.env.OPENWEATHER_API_KEY

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`)

    const status = response.status
    const data = await response.json()

    return NextResponse.json({
      status,
      working: status === 200,
      data: status === 200 ? data : null,
      error: status !== 200 ? data : null,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to test API key" }, { status: 500 })
  }
}

