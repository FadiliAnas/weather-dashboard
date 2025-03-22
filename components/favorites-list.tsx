"use client"

import { Heart, X, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FavoritesListProps {
  favorites: string[]
  onSelect: (city: string) => void
  onRemove: (city: string) => void
}

export default function FavoritesList({ favorites, onSelect, onRemove }: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500" />
            Favorite Cities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Add cities to your favorites for quick access.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Heart className="h-5 w-5 mr-2 text-red-500" />
          Favorite Cities
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
          {favorites.map((city) => (
            <li key={city} className="relative group">
              <button
                onClick={() => onSelect(city)}
                className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
              >
                <span className="font-medium">{city}</span>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(city)
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                aria-label={`Remove ${city} from favorites`}
              >
                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

