"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Star, Bell, X, ChefHat, ToggleLeft, ToggleRight } from "lucide-react"
import Image from "next/image"

const categories = [
  {
    id: "korean",
    name: "한국음식",
    emoji: "🍲",
    description: "집밥같은 한국요리",
    image: "/placeholder.svg?height=80&width=80",
    count: 24,
  },
  {
    id: "chinese",
    name: "중식",
    emoji: "🥢",
    description: "중국요리",
    image: "/placeholder.svg?height=80&width=80",
    count: 18,
  },
  {
    id: "western",
    name: "양식",
    emoji: "🍝",
    description: "서양요리",
    image: "/placeholder.svg?height=80&width=80",
    count: 15,
  },
  {
    id: "japanese",
    name: "일식",
    emoji: "🍣",
    description: "일본요리",
    image: "/placeholder.svg?height=80&width=80",
    count: 12,
  },
  {
    id: "cafe",
    name: "카페",
    emoji: "☕",
    description: "커피·디저트",
    image: "/placeholder.svg?height=80&width=80",
    count: 21,
  },
  {
    id: "chicken",
    name: "치킨",
    emoji: "🍗",
    description: "치킨전문점",
    image: "/placeholder.svg?height=80&width=80",
    count: 16,
  },
]

const flavorFilters = [
  {
    id: "spicy",
    name: "매콤",
    emoji: "🌶️",
    description: "적당히 매콤한 맛",
    color: "bg-orange-100 text-orange-700 border-orange-200",
    selectedColor: "bg-orange-500 text-white",
  },
  {
    id: "salty",
    name: "짜다",
    emoji: "🧂",
    description: "짭짤한 감칠맛",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    selectedColor: "bg-blue-500 text-white",
  },
  {
    id: "mild",
    name: "담백",
    emoji: "🌿",
    description: "깔끔하고 순한 맛",
    color: "bg-green-100 text-green-700 border-green-200",
    selectedColor: "bg-green-500 text-white",
  },
  {
    id: "hot",
    name: "얼큰",
    emoji: "🔥",
    description: "얼큰하고 시원한",
    color: "bg-red-100 text-red-700 border-red-200",
    selectedColor: "bg-red-500 text-white",
  },
  {
    id: "sweet",
    name: "달콤",
    emoji: "🍯",
    description: "달콤한 맛",
    color: "bg-pink-100 text-pink-700 border-pink-200",
    selectedColor: "bg-pink-500 text-white",
  },
  {
    id: "exotic",
    name: "이국적",
    emoji: "🌍",
    description: "특별한 이국적 풍미",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    selectedColor: "bg-purple-500 text-white",
  },
  {
    id: "nutty",
    name: "고소",
    emoji: "🥜",
    description: "고소하고 구수한 맛",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    selectedColor: "bg-amber-500 text-white",
  },
  {
    id: "sour",
    name: "새콤",
    emoji: "🍋",
    description: "상큼하고 새콤한 맛",
    color: "bg-lime-100 text-lime-700 border-lime-200",
    selectedColor: "bg-lime-500 text-white",
  },
  {
    id: "refreshing",
    name: "시원",
    emoji: "❄️",
    description: "시원하고 청량한 맛",
    color: "bg-cyan-100 text-cyan-700 border-cyan-200",
    selectedColor: "bg-cyan-500 text-white",
  },
  {
    id: "rich",
    name: "진한",
    emoji: "🍲",
    description: "깊고 진한 맛",
    color: "bg-stone-100 text-stone-700 border-stone-200",
    selectedColor: "bg-stone-500 text-white",
  },
  {
    id: "crispy",
    name: "바삭",
    emoji: "🥨",
    description: "바삭하고 고소한 식감",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    selectedColor: "bg-yellow-500 text-white",
  },
  {
    id: "chewy",
    name: "쫄깃",
    emoji: "🍜",
    description: "쫄깃하고 탱탱한 식감",
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    selectedColor: "bg-indigo-500 text-white",
  },
  {
    id: "soft",
    name: "부드러운",
    emoji: "🥛",
    description: "부드럽고 촉촉한 식감",
    color: "bg-rose-100 text-rose-700 border-rose-200",
    selectedColor: "bg-rose-500 text-white",
  },
  {
    id: "aromatic",
    name: "향긋",
    emoji: "🌺",
    description: "향긋하고 은은한 향",
    color: "bg-violet-100 text-violet-700 border-violet-200",
    selectedColor: "bg-violet-500 text-white",
  },
  {
    id: "clean",
    name: "개운",
    emoji: "💨",
    description: "개운하고 속이 편한",
    color: "bg-teal-100 text-teal-700 border-teal-200",
    selectedColor: "bg-teal-500 text-white",
  },
  {
    id: "savory",
    name: "감칠맛",
    emoji: "🍄",
    description: "깊은 감칠맛과 풍미",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    selectedColor: "bg-emerald-500 text-white",
  },
]

const popularRestaurants = [
  { name: "매콤한집", category: "한식", rating: 4.5, emoji: "🌶️", features: ["매콤", "짜다"] },
  { name: "이태리안 파스타", category: "양식", rating: 4.7, emoji: "🍝", features: ["이국적", "담백"] },
  { name: "달콤카페", category: "카페", rating: 4.3, emoji: "☕", features: ["달콤", "담백"] },
]

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"category" | "flavor">("category")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMode, setFilterMode] = useState<"AND" | "OR">("OR") // AND/OR 연산 모드 추가

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleFlavor = (flavorId: string) => {
    setSelectedFlavors((prev) => (prev.includes(flavorId) ? prev.filter((id) => id !== flavorId) : [...prev, flavorId]))
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","))
    }
    if (selectedFlavors.length > 0) {
      params.set("flavors", selectedFlavors.join(","))
    }
    if (searchTerm) {
      params.set("search", searchTerm)
    }
    // 맛 특징이 1개 이상 선택되었을 때 filterMode 전달 (조건 완화)
    if (selectedFlavors.length > 0) {
      params.set("filterMode", filterMode)
    }
    router.push(`/restaurants?${params.toString()}`)
  }

  const clearSelections = () => {
    setSelectedCategories([])
    setSelectedFlavors([])
  }

  const totalSelections = selectedCategories.length + selectedFlavors.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          {/* Location & Title */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-lg font-bold text-gray-900">맛집 탐험대</div>
                <div className="text-xs text-gray-500">당신의 취향에 맞는 맛집을 찾아보세요</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="음식점, 메뉴, 특징을 검색하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border-gray-200 rounded-xl bg-gray-50 focus:bg-white transition-colors"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pb-8">
        {/* Selection Summary */}
        {totalSelections > 0 && (
          <div className="my-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-gray-900">선택된 조건</span>
                <Badge className="bg-blue-600 text-white text-xs">{totalSelections}개</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelections}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {selectedFlavors.length > 1 && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-blue-700 mb-1">맛 특징 조건</h4>
                    <p className="text-xs text-blue-600">
                      {filterMode === "AND"
                        ? "선택한 모든 맛 특징이 있는 맛집만 찾기"
                        : "선택한 맛 특징 중 하나라도 있는 맛집 찾기"}
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

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map((id) => {
                const category = categories.find((c) => c.id === id)
                return category ? (
                  <Badge
                    key={id}
                    className="bg-blue-100 text-blue-800 border border-blue-200 cursor-pointer hover:bg-blue-200 transition-colors flex items-center gap-1"
                    onClick={() => toggleCategory(id)}
                  >
                    {category.emoji} {category.name}
                    <X className="h-3 w-3 hover:text-blue-900" />
                  </Badge>
                ) : null
              })}
              {selectedFlavors.map((id) => {
                const flavor = flavorFilters.find((f) => f.id === id)
                return flavor ? (
                  <Badge
                    key={id}
                    className="bg-orange-100 text-orange-800 border border-orange-200 cursor-pointer hover:bg-orange-200 transition-colors flex items-center gap-1"
                    onClick={() => toggleFlavor(id)}
                  >
                    {flavor.emoji} {flavor.name}
                    <X className="h-3 w-3 hover:text-orange-900" />
                  </Badge>
                ) : null
              })}
            </div>

            <Button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold"
            >
              <Search className="mr-2 h-4 w-4" />
              선택한 조건으로 맛집 찾기
            </Button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl p-2 mb-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab("category")}
              className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === "category"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              🍽️ 음식 종류
            </button>
            <button
              onClick={() => setActiveTab("flavor")}
              className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === "flavor"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              ✨ 맛 특징
            </button>
          </div>
        </div>

        {/* Map Quick Access */}
        <div className="mb-6">
          <Button
            onClick={() => router.push("/map")}
            className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg"
          >
            <MapPin className="mr-2 h-5 w-5" />📍 내 주변 맛집 지도로 찾기
          </Button>
        </div>

        {/* Category Cards */}
        {activeTab === "category" && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">어떤 음식이 드시고 싶나요?</h2>
              <p className="text-gray-600">여러 개를 선택해서 더 정확한 추천을 받아보세요</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.id)
                return (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected ? "ring-2 ring-blue-500 shadow-md" : "hover:shadow-lg"
                    }`}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-2xl flex items-center justify-center">
                          <Image
                            src={category.image || "/placeholder.svg"}
                            alt={category.name}
                            width={40}
                            height={40}
                            className="rounded-xl"
                          />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                        <div className="text-xs text-gray-500">{category.count}개 매장</div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Flavor Cards */}
        {activeTab === "flavor" && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">어떤 맛이 땡기시나요?</h2>
              <p className="text-gray-600">원하는 맛을 여러 개 선택해보세요</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {flavorFilters.map((flavor) => {
                const isSelected = selectedFlavors.includes(flavor.id)
                return (
                  <Card
                    key={flavor.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected ? "ring-2 ring-blue-500 shadow-md" : "hover:shadow-lg"
                    }`}
                    onClick={() => toggleFlavor(flavor.id)}
                  >
                    <CardContent className="p-3">
                      <div className="text-center">
                        <div
                          className={`w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center text-lg ${
                            isSelected ? flavor.selectedColor : flavor.color
                          }`}
                        >
                          {flavor.emoji}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1 text-sm">{flavor.name}</h3>
                        <p className="text-xs text-gray-600 leading-tight">{flavor.description}</p>
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Popular Restaurants */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              지금 인기 맛집
            </h3>
            <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
              더보기
            </Button>
          </div>
          <div className="space-y-3">
            {popularRestaurants.map((restaurant, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="text-2xl">{restaurant.emoji}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{restaurant.name}</div>
                    <div className="text-sm text-gray-600">{restaurant.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200 mb-1">
                    ⭐ {restaurant.rating}
                  </Badge>
                  <div className="flex gap-1">
                    {restaurant.features.slice(0, 2).map((feature, idx) => (
                      <Badge key={idx} className="text-xs bg-gray-200 text-gray-700">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Search Button */}
        <div className="mt-6">
          <Button
            onClick={() => router.push("/restaurants")}
            variant="outline"
            className="w-full py-4 text-lg font-semibold border-2 border-dashed border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
          >
            <Search className="mr-2 h-5 w-5" />
            전체 맛집 둘러보기
          </Button>
        </div>
      </div>
    </div>
  )
}
