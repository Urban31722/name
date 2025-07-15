"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, ArrowLeft, Filter, MapPin, Star, Clock, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const categories = [
  { id: "korean", name: "한식", emoji: "🍲" },
  { id: "chinese", name: "중식", emoji: "🥢" },
  { id: "western", name: "양식", emoji: "🍝" },
  { id: "japanese", name: "일식", emoji: "🍣" },
  { id: "cafe", name: "카페", emoji: "☕" },
  { id: "chicken", name: "치킨", emoji: "🍗" },
]

const flavorFilters = [
  { id: "spicy", name: "매콤", emoji: "🌶️", color: "bg-orange-100 text-orange-700" },
  { id: "salty", name: "짜다", emoji: "🧂", color: "bg-blue-100 text-blue-700" },
  { id: "mild", name: "담백", emoji: "🌿", color: "bg-green-100 text-green-700" },
  { id: "hot", name: "얼큰", emoji: "🔥", color: "bg-red-100 text-red-700" },
  { id: "sweet", name: "달콤", emoji: "🍯", color: "bg-pink-100 text-pink-700" },
  { id: "exotic", name: "이국적", emoji: "🌍", color: "bg-purple-100 text-purple-700" },
  { id: "nutty", name: "고소", emoji: "🥜", color: "bg-amber-100 text-amber-700" },
  { id: "sour", name: "새콤", emoji: "🍋", color: "bg-lime-100 text-lime-700" },
]

const restaurants = [
  {
    id: 1,
    name: "매콤한집",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.5,
    reviewCount: 1247,
    deliveryTime: "25-35분",
    distance: "0.8km",
    popularMenus: ["떡볶이", "순대", "김밥"],
    features: ["매콤", "짜다"],
    description: "매콤한 떡볶이로 유명한 분식집",
    emoji: "🌶️",
    category: "korean",
    flavorTags: ["spicy", "salty"],
    position: { x: 45, y: 35 }, // 지도상 위치 (%)
    address: "강남구 역삼동 123-45",
  },
  {
    id: 2,
    name: "달콤카페",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.3,
    reviewCount: 892,
    deliveryTime: "15-25분",
    distance: "0.5km",
    popularMenus: ["티라미수", "아메리카노", "크로플"],
    features: ["달콤", "부드러운"],
    description: "달콤한 디저트와 커피가 맛있는 카페",
    emoji: "☕",
    category: "cafe",
    flavorTags: ["sweet", "soft"],
    position: { x: 60, y: 25 },
    address: "강남구 신사동 567-89",
  },
  {
    id: 3,
    name: "이태리안 파스타",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.7,
    reviewCount: 634,
    deliveryTime: "30-40분",
    distance: "1.2km",
    popularMenus: ["크림파스타", "토마토파스타", "피자"],
    features: ["이국적", "담백"],
    description: "정통 이탈리아 요리를 맛볼 수 있는 곳",
    emoji: "🍝",
    category: "western",
    flavorTags: ["exotic", "mild"],
    position: { x: 30, y: 50 },
    address: "강남구 청담동 234-56",
  },
  {
    id: 4,
    name: "불타는치킨",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.4,
    reviewCount: 423,
    deliveryTime: "20-30분",
    distance: "0.7km",
    popularMenus: ["양념치킨", "후라이드치킨", "치킨버거"],
    features: ["얼큰", "매콤"],
    description: "매운 양념치킨이 인기인 치킨전문점",
    emoji: "🔥",
    category: "chicken",
    flavorTags: ["hot", "spicy"],
    position: { x: 70, y: 60 },
    address: "강남구 논현동 345-67",
  },
  {
    id: 5,
    name: "얼큰한국밥",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.2,
    reviewCount: 567,
    deliveryTime: "35-45분",
    distance: "1.5km",
    popularMenus: ["김치찌개", "된장찌개", "순두부찌개"],
    features: ["얼큰", "짜다"],
    description: "얼큰한 찌개가 맛있는 한식집",
    emoji: "🍲",
    category: "korean",
    flavorTags: ["hot", "salty"],
    position: { x: 25, y: 70 },
    address: "강남구 삼성동 456-78",
  },
  {
    id: 6,
    name: "중화루",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.6,
    reviewCount: 789,
    deliveryTime: "25-35분",
    distance: "0.9km",
    popularMenus: ["짜장면", "짬뽕", "탕수육"],
    features: ["짜다", "얼큰"],
    description: "정통 중국 요리 전문점",
    emoji: "🥢",
    category: "chinese",
    flavorTags: ["salty", "hot"],
    position: { x: 55, y: 45 },
    address: "강남구 대치동 678-90",
  },
]

export default function MapPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const categories = searchParams.get("categories")?.split(",") || []
    const flavors = searchParams.get("flavors")?.split(",") || []
    const search = searchParams.get("search") || ""

    setSelectedCategories(categories)
    setSelectedFlavors(flavors)
    setSearchTerm(search)
  }, [searchParams])

  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(restaurant.category)) {
      return false
    }

    // Flavor filter
    if (selectedFlavors.length > 0 && !selectedFlavors.some((flavor) => restaurant.flavorTags.includes(flavor))) {
      return false
    }

    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.popularMenus.some((menu) => menu.toLowerCase().includes(searchTerm.toLowerCase())) ||
      restaurant.features.some((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesSearch
  })

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleFlavor = (flavorId: string) => {
    setSelectedFlavors((prev) => (prev.includes(flavorId) ? prev.filter((id) => id !== flavorId) : [...prev, flavorId]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedFlavors([])
    setSearchTerm("")
  }

  const totalFilters = selectedCategories.length + selectedFlavors.length

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={handleBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />내 주변 맛집
              </h1>
              <p className="text-sm text-gray-600">{filteredRestaurants.length}개 맛집 발견</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="맛집, 메뉴 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border-gray-200 rounded-xl bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              필터 {totalFilters > 0 && `(${totalFilters})`}
            </Button>
            {totalFilters > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-600">
                <X className="h-4 w-4 mr-1" />
                초기화
              </Button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="space-y-4 mb-4 p-4 bg-gray-50 rounded-xl">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">음식 종류</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category.id}
                      variant={selectedCategories.includes(category.id) ? "default" : "secondary"}
                      className={`cursor-pointer ${
                        selectedCategories.includes(category.id) ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                      }`}
                      onClick={() => toggleCategory(category.id)}
                    >
                      {category.emoji} {category.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Flavors */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">맛 특징</h3>
                <div className="flex flex-wrap gap-2">
                  {flavorFilters.map((flavor) => (
                    <Badge
                      key={flavor.id}
                      variant={selectedFlavors.includes(flavor.id) ? "default" : "secondary"}
                      className={`cursor-pointer ${
                        selectedFlavors.includes(flavor.id) ? "bg-blue-600 text-white" : flavor.color
                      }`}
                      onClick={() => toggleFlavor(flavor.id)}
                    >
                      {flavor.emoji} {flavor.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1 relative bg-green-50">
        <div className="max-w-md mx-auto h-80 relative bg-gradient-to-br from-green-100 to-blue-100 border-2 border-dashed border-green-300 rounded-xl m-4">
          {/* Map Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">강남구 역삼동 일대</p>
              <p className="text-xs">지도 영역</p>
            </div>
          </div>

          {/* Restaurant Markers */}
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                selectedRestaurant === restaurant.id ? "scale-125 z-10" : "hover:scale-110"
              }`}
              style={{
                left: `${restaurant.position.x}%`,
                top: `${restaurant.position.y}%`,
              }}
              onClick={() => setSelectedRestaurant(selectedRestaurant === restaurant.id ? null : restaurant.id)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg border-2 ${
                  selectedRestaurant === restaurant.id
                    ? "bg-blue-600 border-white scale-125"
                    : "bg-white border-gray-300 hover:border-blue-400"
                }`}
              >
                {restaurant.emoji}
              </div>
              {selectedRestaurant === restaurant.id && (
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 min-w-48 border">
                  <div className="text-sm font-semibold text-gray-900 mb-1">{restaurant.name}</div>
                  <div className="text-xs text-gray-600 mb-2">{restaurant.address}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {restaurant.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      {restaurant.deliveryTime}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Current Location */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">주변 맛집 목록</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredRestaurants.map((restaurant) => (
              <Card
                key={restaurant.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedRestaurant === restaurant.id ? "ring-2 ring-blue-500 shadow-md" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedRestaurant(selectedRestaurant === restaurant.id ? null : restaurant.id)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Image
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      width={60}
                      height={60}
                      className="rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                        <div className="text-2xl">{restaurant.emoji}</div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{restaurant.description}</p>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {restaurant.deliveryTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {restaurant.distance}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {restaurant.features.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} className="text-xs bg-gray-100 text-gray-700">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🔍</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">검색 결과가 없어요</h3>
              <p className="text-gray-500 text-sm">다른 조건으로 검색해보세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
