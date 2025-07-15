"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, Star, Clock, ArrowLeft, Filter, MapPin, Heart, ToggleLeft, ToggleRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const restaurants = [
  {
    id: 1,
    name: "매콤한집",
    image: "/placeholder.svg?height=200&width=300",
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
  },
  {
    id: 2,
    name: "달콤카페",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    reviewCount: 892,
    deliveryTime: "15-25분",
    distance: "0.5km",
    popularMenus: ["티라미수", "아메리카노", "크로플"],
    features: ["달콤", "부드러운", "향긋"],
    description: "달콤한 디저트와 커피가 맛있는 카페",
    emoji: "☕",
    category: "cafe",
    flavorTags: ["sweet", "soft", "aromatic"],
  },
  {
    id: 3,
    name: "이태리안 파스타",
    image: "/placeholder.svg?height=200&width=300",
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
  },
  {
    id: 4,
    name: "불타는치킨",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.4,
    reviewCount: 423,
    deliveryTime: "20-30분",
    distance: "0.7km",
    popularMenus: ["양념치킨", "후라이드치킨", "치킨버거"],
    features: ["얼큰", "매콤", "바삭"],
    description: "매운 양념치킨이 인기인 치킨전문점",
    emoji: "🔥",
    category: "chicken",
    flavorTags: ["hot", "spicy", "crispy"],
  },
  {
    id: 5,
    name: "얼큰한국밥",
    image: "/placeholder.svg?height=200&width=300",
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
  },
  {
    id: 6,
    name: "중화루",
    image: "/placeholder.svg?height=200&width=300",
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
  },
]

const allFeatures = [
  { name: "매콤", emoji: "🌶️", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { name: "짜다", emoji: "🧂", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { name: "달콤", emoji: "🍯", color: "bg-pink-100 text-pink-700 border-pink-200" },
  { name: "이국적", emoji: "🌍", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { name: "얼큰", emoji: "🔥", color: "bg-red-100 text-red-700 border-red-200" },
  { name: "담백", emoji: "🌿", color: "bg-green-100 text-green-700 border-green-200" },
  { name: "고소", emoji: "🥜", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { name: "새콤", emoji: "🍋", color: "bg-lime-100 text-lime-700 border-lime-200" },
  { name: "시원", emoji: "❄️", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  { name: "진한", emoji: "🍲", color: "bg-stone-100 text-stone-700 border-stone-200" },
  { name: "바삭", emoji: "🥨", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { name: "쫄깃", emoji: "🍜", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { name: "부드러운", emoji: "🥛", color: "bg-rose-100 text-rose-700 border-rose-200" },
  { name: "향긋", emoji: "🌺", color: "bg-violet-100 text-violet-700 border-violet-200" },
  { name: "개운", emoji: "💨", color: "bg-teal-100 text-teal-700 border-teal-200" },
  { name: "감칠맛", emoji: "🍄", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
]

const categoryNames: { [key: string]: string } = {
  korean: "한식",
  chinese: "중식",
  western: "양식",
  japanese: "일식",
  cafe: "카페",
  chicken: "치킨",
}

const flavorNames: { [key: string]: string } = {
  spicy: "매콤",
  salty: "짜다",
  mild: "담백",
  hot: "얼큰",
  sweet: "달콤",
  exotic: "이국적",
  nutty: "고소",
  sour: "새콤",
  refreshing: "시원",
  rich: "진한",
  crispy: "바삭",
  chewy: "쫄깃",
  soft: "부드러운",
  aromatic: "향긋",
  clean: "개운",
  savory: "감칠맛",
}

export default function RestaurantsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [filterMode, setFilterMode] = useState<"AND" | "OR">("OR") // AND/OR 연산 모드

  useEffect(() => {
    const categories = searchParams.get("categories")?.split(",") || []
    const flavors = searchParams.get("flavors")?.split(",") || []
    const search = searchParams.get("search") || ""
    const filterModeParam = (searchParams.get("filterMode") as "AND" | "OR") || "OR"

    console.log("URL 파라미터:", { categories, flavors, search, filterModeParam })

    if (search) setSearchTerm(search)
    setFilterMode(filterModeParam)

    const initialFeatures: string[] = []
    flavors.forEach((flavor) => {
      if (flavorNames[flavor]) {
        initialFeatures.push(flavorNames[flavor])
      }
    })
    setSelectedFeatures(initialFeatures)

    console.log("설정된 상태:", { filterMode: filterModeParam, selectedFeatures: initialFeatures })
  }, [searchParams.toString()])

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const categories = searchParams.get("categories")?.split(",") || []
    const flavors = searchParams.get("flavors")?.split(",") || []

    // Category filter
    if (categories.length > 0 && !categories.includes(restaurant.category)) {
      return false
    }

    // Flavor filter
    if (flavors.length > 0 && !flavors.some((flavor) => restaurant.flavorTags.includes(flavor))) {
      return false
    }

    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.popularMenus.some((menu) => menu.toLowerCase().includes(searchTerm.toLowerCase())) ||
      restaurant.features.some((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase()))

    // Selected features filter with AND/OR logic
    let matchesFeatures = true
    if (selectedFeatures.length > 0) {
      if (filterMode === "AND") {
        // AND 연산: 선택한 모든 특징이 있어야 함
        matchesFeatures = selectedFeatures.every((feature) => restaurant.features.includes(feature))
        console.log(`${restaurant.name} AND 체크:`, {
          selectedFeatures,
          restaurantFeatures: restaurant.features,
          result: matchesFeatures,
        })
      } else {
        // OR 연산: 선택한 특징 중 하나라도 있으면 됨
        matchesFeatures = selectedFeatures.some((feature) => restaurant.features.includes(feature))
        console.log(`${restaurant.name} OR 체크:`, {
          selectedFeatures,
          restaurantFeatures: restaurant.features,
          result: matchesFeatures,
        })
      }
    }

    return matchesSearch && matchesFeatures
  })

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  const getFeatureData = (featureName: string) => {
    return (
      allFeatures.find((f) => f.name === featureName) || {
        name: featureName,
        emoji: "🍽️",
        color: "bg-gray-100 text-gray-700 border-gray-200",
      }
    )
  }

  const getPageTitle = () => {
    const categories = searchParams.get("categories")?.split(",") || []
    const flavors = searchParams.get("flavors")?.split(",") || []
    const search = searchParams.get("search") || ""

    const selectedCategoryNames = categories.map((cat) => categoryNames[cat]).filter(Boolean)
    const selectedFlavorNames = flavors.map((flavor) => flavorNames[flavor]).filter(Boolean)

    if (search) return `'${search}' 검색결과`
    if (selectedCategoryNames.length > 0 && selectedFlavorNames.length > 0) {
      return `${selectedFlavorNames.join(", ")} ${selectedCategoryNames.join(", ")} 맛집`
    } else if (selectedCategoryNames.length > 0) {
      return `${selectedCategoryNames.join(", ")} 맛집`
    } else if (selectedFlavorNames.length > 0) {
      return `${selectedFlavorNames.join(", ")} 맛집`
    }
    return "전체 맛집"
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={handleBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-sm text-gray-600">{filteredRestaurants.length}개 맛집 발견</p>
            </div>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="맛집, 메뉴 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border-gray-200 rounded-xl bg-gray-50 focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">맛집 {filteredRestaurants.length}개</div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />맛 특징 필터
              {selectedFeatures.length > 0 && (
                <Badge className="bg-blue-600 text-white text-xs ml-1">{selectedFeatures.length}</Badge>
              )}
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              {/* AND/OR Toggle */}
              {selectedFeatures.length > 1 && (
                <div className="mb-4 p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">필터 조건</h4>
                      <p className="text-xs text-gray-500">
                        {filterMode === "AND"
                          ? "선택한 모든 특징이 있는 맛집만 표시"
                          : "선택한 특징 중 하나라도 있는 맛집 표시"}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFilterMode(filterMode === "AND" ? "OR" : "AND")}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        filterMode === "AND"
                          ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {filterMode === "AND" ? (
                        <>
                          <ToggleRight className="h-4 w-4" />
                          <span className="font-semibold">AND</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="h-4 w-4" />
                          <span className="font-semibold">OR</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                {allFeatures.map((feature) => {
                  const isSelected = selectedFeatures.includes(feature.name)
                  return (
                    <Badge
                      key={feature.name}
                      variant={isSelected ? "default" : "secondary"}
                      className={`cursor-pointer text-center py-2 ${
                        isSelected ? "bg-blue-600 text-white" : feature.color
                      }`}
                      onClick={() => toggleFeature(feature.name)}
                    >
                      {feature.emoji} {feature.name}
                    </Badge>
                  )
                })}
              </div>

              {/* Selected Features Summary */}
              {selectedFeatures.length > 0 && (
                <div className="mt-4 p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-700">선택된 특징</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFeatures([])}
                      className="text-gray-600 text-xs"
                    >
                      모두 제거
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedFeatures.map((feature, index) => (
                      <span key={feature} className="text-xs text-gray-600">
                        {feature}
                        {index < selectedFeatures.length - 1 && (
                          <span
                            className={`mx-1 font-semibold ${
                              filterMode === "AND" ? "text-purple-600" : "text-green-600"
                            }`}
                          >
                            {filterMode}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* Restaurant List */}
        <div className="space-y-4">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3 text-3xl bg-white/90 backdrop-blur-sm rounded-xl w-12 h-12 flex items-center justify-center shadow-lg">
                    {restaurant.emoji}
                  </div>
                  <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{restaurant.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{restaurant.description}</p>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">{restaurant.rating}</span>
                          <span className="text-sm text-gray-500">({restaurant.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {restaurant.features.map((feature) => {
                        const featureData = getFeatureData(feature)
                        const isSelectedFeature = selectedFeatures.includes(feature)
                        return (
                          <Badge
                            key={feature}
                            className={`text-xs ${
                              isSelectedFeature ? "bg-blue-600 text-white border-blue-600" : featureData.color
                            }`}
                          >
                            {featureData.emoji} {feature}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  {/* Popular Menus */}
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">인기메뉴</div>
                    <div className="text-sm text-gray-800">{restaurant.popularMenus.join(", ")}</div>
                  </div>

                  {/* Info */}
                  <div className="flex items-center justify-between text-sm border-t pt-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="h-4 w-4" />
                        {restaurant.deliveryTime}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {restaurant.distance}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">검색 결과가 없어요</h3>
            <p className="text-gray-500 mb-4">
              {selectedFeatures.length > 0 && filterMode === "AND"
                ? "선택한 모든 특징을 가진 맛집이 없어요. OR 모드를 시도해보세요!"
                : "다른 검색어나 조건을 시도해보세요"}
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedFeatures([])
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              다시 검색하기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
