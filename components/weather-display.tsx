"use client"

import { Heart, MapPin, Droplets, Wind, Thermometer, Calendar } from "lucide-react"
import type { WeatherData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface WeatherDisplayProps {
  weatherData: WeatherData
  onAddToFavorites: (city: string) => void
  onRemoveFromFavorites: (city: string) => void
  isFavorite: boolean
}

export default function WeatherDisplay({
  weatherData,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavorite,
}: WeatherDisplayProps) {
  const { name, main, weather, wind, sys } = weatherData

  // Format date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Get weather icon
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`

  // Convert temperature from Kelvin to Celsius and Fahrenheit
  const tempC = Math.round(main.temp - 273.15)
  const tempF = Math.round(((main.temp - 273.15) * 9) / 5 + 32)

  // Convert wind speed from m/s to km/h
  const windSpeed = Math.round(wind.speed * 3.6)

  return (
    <div className="mt-6 animate-fadeIn">
      <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-800">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold flex items-center">
                {name}, {sys.country}
                <MapPin className="ml-2 h-5 w-5" />
              </h2>
              <p className="text-blue-100 flex items-center mt-1">
                <Calendar className="mr-1 h-4 w-4" />
                {currentDate}
              </p>
            </div>
            <Button
              variant={isFavorite ? "destructive" : "secondary"}
              size="sm"
              onClick={() => (isFavorite ? onRemoveFromFavorites(name) : onAddToFavorites(name))}
              className="rounded-full"
            >
              <Heart className={`h-4 w-4 mr-1 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Remove" : "Favorite"}
            </Button>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <img src={iconUrl || "/placeholder.svg"} alt={weather[0].description} className="w-32 h-32 mx-auto" />
                <h3 className="text-xl font-medium capitalize mt-2">{weather[0].description}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Thermometer className="h-6 w-6 mr-3 text-orange-500" />
                <div>
                  <p className="text-3xl font-bold">
                    {tempC}°C / {tempF}°F
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Feels like: {Math.round(main.feels_like - 273.15)}°C
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Droplets className="h-6 w-6 mr-3 text-blue-500" />
                <div>
                  <p className="text-lg font-medium">Humidity: {main.humidity}%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pressure: {main.pressure} hPa</p>
                </div>
              </div>

              <div className="flex items-center">
                <Wind className="h-6 w-6 mr-3 text-teal-500" />
                <div>
                  <p className="text-lg font-medium">Wind: {windSpeed} km/h</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Direction: {wind.deg}°</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

