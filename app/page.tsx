"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"

import WeatherForm from "@/components/weather-form"
import WeatherDisplay from "@/components/weather-display"
import FavoritesList from "@/components/favorites-list"
import type { WeatherData } from "@/lib/types"

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem("weatherFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("weatherFavorites", JSON.stringify(favorites))
  }, [favorites])

  // Update the fetchWeather function to use the mock API
  const fetchWeather = async (city: string) => {
    setLoading(true)
    setError(null)

    try {
      // Change this line to use the mock API
      const response = await fetch(`/api/mock-weather?city=${encodeURIComponent(city)}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch weather data")
      }

      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const addToFavorites = (city: string) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city])
    }
  }

  const removeFromFavorites = (city: string) => {
    setFavorites(favorites.filter((fav) => fav !== city))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Weather Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <WeatherForm onSearch={fetchWeather} loading={loading} />

            {error && (
              <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
                <p className="flex items-center">
                  <span className="mr-2">⚠️</span> {error}
                </p>
              </div>
            )}

            {weatherData && (
              <WeatherDisplay
                weatherData={weatherData}
                onAddToFavorites={addToFavorites}
                isFavorite={favorites.includes(weatherData.name)}
                onRemoveFromFavorites={removeFromFavorites}
              />
            )}

            {!weatherData && !error && !loading && (
              <div className="mt-8 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <Search className="h-16 w-16 mb-4 opacity-20" />
                <p className="text-lg">Search for a city to see the weather</p>
              </div>
            )}
          </div>

          <div>
            <FavoritesList favorites={favorites} onSelect={fetchWeather} onRemove={removeFromFavorites} />
          </div>
        </div>
      </div>
    </main>
  )
}

