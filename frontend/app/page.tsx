"use client"

import { useEffect, useState } from "react"
import { FeedCard } from "@/components/feed-card"
import { Header } from "@/components/header"
import { RankingBanner } from "@/components/ranking-banner"
import { Pagination } from "@/components/pagination"
import { Filter, SlidersHorizontal, Sparkles, Smile, X, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { API_ENDPOINTS, apiRequest } from "@/lib/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const MAX_DAILY_HEARTS = 5

// Top 3 Ranking Data
type Top3Animal = {
  id: string
  animalId: number
  rank: number
  name: string
  imageUrl: string
  cheerTemperature: number
  maxCheerTemperature: number
}

type FeedItem = {
  id: string
  animalId: number
  processState: "보호중" | "종료(입양)"
  imageUrl: string
  animalInfo: string
  cheerTemperature: number
  maxCheerTemperature: number
  totalHeartCount: number
  adopterDiary?: string
  comments: Array<{ id: string; author: string; text: string }>
  weight?: string
  careAddr?: string
  specialMark?: string
}

type AnimalListItem = {
  animalId: number
  processState?: string
  noticeNo?: string
  noticeEdt?: string
  upKindNm?: string
  kindFullNm?: string
  age?: string
  popfile1?: string
  careNm?: string
  totalCheerCount?: number
  temperature?: number
  weight?: string
  careAddr?: string
  specialMark?: string
}

const ITEMS_PER_PAGE = 10
const REGION_OPTIONS = [
  "전체",
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
]
const SPECIES_OPTIONS = ["전체", "개", "고양이", "기타"]
const STATUS_OPTIONS = ["보호중", "종료"]
type SortOption = "noticeEndDate" | "cheerCount"
type KindMap = Record<string, string[]>

const parseKindMap = (payload: unknown): KindMap => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return {}

  const response = payload as Record<string, unknown>
  if (response.data && typeof response.data === "object" && !Array.isArray(response.data)) {
    return parseKindMap(response.data)
  }

  const result: KindMap = {}
  for (const [key, value] of Object.entries(response)) {
    if (Array.isArray(value)) {
      result[key] = value.filter(
        (item): item is string => typeof item === "string" && item.trim().length > 0
      )
    }
  }
  return result
}

const parseAnimalList = (payload: unknown): AnimalListItem[] => {
  if (!payload) return []
  if (Array.isArray(payload)) return payload as AnimalListItem[]
  if (typeof payload !== "object") return []

  const response = payload as Record<string, unknown>
  if (Array.isArray(response.content)) return response.content as AnimalListItem[]
  if (Array.isArray(response.animals)) return response.animals as AnimalListItem[]
  if (response.data && typeof response.data === "object") {
    const nested = response.data as Record<string, unknown>
    if (Array.isArray(nested.content)) return nested.content as AnimalListItem[]
    if (Array.isArray(nested.animals)) return nested.animals as AnimalListItem[]
  }
  return []
}

const mapProcessState = (value?: string): "보호중" | "종료(입양)" => {
  const normalized = (value || "").toUpperCase()
  if (normalized.includes("보호") || normalized.includes("PROTECT")) return "보호중"
  return "종료(입양)"
}

const normalizeImageUrl = (value?: string): string => {
  if (!value) return "/placeholder.svg"
  const trimmed = value.trim()
  if (!trimmed || trimmed === "null" || trimmed === "undefined") return "/placeholder.svg"
  if (trimmed.startsWith("http://openapi.animal.go.kr/")) {
    return trimmed.replace("http://openapi.animal.go.kr/", "https://openapi.animal.go.kr/")
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
    return trimmed
  }
  return "/placeholder.svg"
}

const mapTemperature = (value?: number): number => {
  if (typeof value !== "number" || Number.isNaN(value)) return 0
  if (value <= 1) return Math.max(0, Math.min(100, value * 100))
  return Math.max(0, Math.min(100, value))
}

const mapAnimalToFeedItem = (animal: AnimalListItem): FeedItem => {
  const breed = animal.kindFullNm || animal.upKindNm || "품종 미상"
  const age = animal.age || "나이 미상"
  const shelter = animal.careNm || "보호소 정보 없음"
  const animalId = Number(animal.animalId)
  return {
    id: String(animalId),
    animalId,
    processState: mapProcessState(animal.processState),
    imageUrl: normalizeImageUrl(animal.popfile1),
    animalInfo: `${breed} · ${age} · ${shelter}`,
    cheerTemperature: mapTemperature(animal.temperature),
    maxCheerTemperature: 100,
    totalHeartCount: typeof animal.totalCheerCount === "number" ? animal.totalCheerCount : 0,
    comments: [],
    weight: animal.weight,
    careAddr: animal.careAddr,
    specialMark: animal.specialMark
  }
}

interface SurveyProfile {
  species: string
  size: string
  region: string
  housing: string
  activity: string
  experience: string
}

const getRecommendationReason = (item: FeedItem, survey: SurveyProfile) => {
  const isDog = item.animalInfo.includes("개") || item.animalInfo.includes("믹스견") || item.animalInfo.includes("푸들")
  const isCat = item.animalInfo.includes("고양이") || item.animalInfo.includes("숏헤어")
  
  let weight = 5.0
  if (item.weight) {
    const weightMatch = item.weight.match(/([\d.]+)/)
    if (weightMatch) {
      weight = parseFloat(weightMatch[1])
    }
  } else {
    const weightMatch = item.animalInfo.match(/([\d.]+)\s*\(Kg\)/i)
    if (weightMatch) {
      weight = parseFloat(weightMatch[1])
    }
  }

  const reasons: string[] = []

  // Region match reason
  if (survey.region !== "전국 어디든") {
    let regionPart = ""
    if (survey.region === "서울/경기/인천") regionPart = "수도권"
    else if (survey.region === "강원/충청") regionPart = "충청/강원"
    else if (survey.region === "경상/부산/대구") regionPart = "영남"
    else if (survey.region === "전라/제주") regionPart = "호남/제주"

    reasons.push(`📍 ${regionPart} 권역 보호시설에 머물고 있어 직접 만나러 가기 수월해요.`)
  } else {
    reasons.push(`📍 전국 공공 보호소의 따뜻한 관심이 절실한 아이예요.`)
  }

  // Environment and weight reason
  if (survey.housing.includes("아파트") && weight < 7.0) {
    reasons.push(`🏠 아파트/빌라 등 실내 주거지에서 키우기 안성맞춤인 가벼운 품종(${weight}kg)예요.`)
  } else if (weight >= 10.0) {
    reasons.push(`🌳 마당이 있거나 넓은 주택에서 힘차게 뛰놀 수 있는 활기차고 듬직한 체구(${weight}kg)예요.`)
  } else {
    reasons.push(`✨ ${weight}kg의 실내외 적응력이 우수하고 온화한 표준 체격이에요.`)
  }

  // Walk and activity level matching
  if (survey.activity.includes("매일")) {
    if (isDog) {
      reasons.push(`🏃 매일 힘차게 산책하며 에너지를 발산하기 좋아하는 활기 넘치는 댕댕이예요.`)
    } else {
      reasons.push(`🧶 매일 깃털 낚시 장난감으로 교감하고 사냥 놀이를 채워주기 좋은 고양이예요.`)
    }
  } else {
    if (isCat) {
      reasons.push(`💤 독립심과 차분함이 있어, 집사의 바쁜 직장 생활에도 외로움을 덜 느끼는 고양이예요.`)
    } else {
      reasons.push(`🐾 성격이 정적이고 차분하여 실내 교감 및 휴식에 안성맞춤인 순둥이 댕댕이예요.`)
    }
  }

  // Experience level matching using specialMark 특징
  const friendlyKeywords = ["온순", "얌전", "친화", "순함", "애교", "잘따름", "좋아", "활발", "착함", "사회성"]
  const specialMarkLower = (item.specialMark || "").toLowerCase()
  const isExplicitlyFriendly = friendlyKeywords.some(word => specialMarkLower.includes(word))
  const isAdministrativeMemo = ["리더기", "마이크로칩", "등록칩", "이동 제한", "검출", "구조", "발견", "추정"].some(word => specialMarkLower.includes(word))

  if (survey.experience.includes("처음")) {
    if (item.specialMark && isExplicitlyFriendly && !isAdministrativeMemo) {
      reasons.push(`🔰 실제 공고상에 "${item.specialMark}"라고 기록될 만큼 친화력이 뛰어나서 초보 보호자님께 안성맞춤이에요!`)
    } else {
      reasons.push(`🔰 실내 적응과 양육이 수월한 표준적인 활동 성향을 가지고 있어 초보 보호자님도 안심하고 함께 시작할 수 있어요.`)
    }
  } else {
    if (item.specialMark && !isAdministrativeMemo) {
      reasons.push(`🤝 실제 공고 특징인 "${item.specialMark}" 성향을 너른 애정으로 포용하고 이끌어주실 숙련된 보호자님의 깊은 교감이 기대되는 아이예요.`)
    } else {
      reasons.push(`🤝 이미 반려동물 동거 경험이 있으신 보호자님의 든든한 사랑과 케어로 더욱 아름다운 인연을 만들어갈 수 있는 친구예요.`)
    }
  }

  const idx = Math.abs(Number(item.animalId || 0)) % reasons.length
  return reasons[idx] || "✨ 당신의 라이프스타일과 완벽하게 조화를 이루며 따뜻한 사랑을 선물할 소중한 가족 후보예요."
}

export default function SocialFeedPage() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [dailyHeartsRemaining, setDailyHeartsRemaining] = useState(MAX_DAILY_HEARTS)
  const [animals, setAnimals] = useState<FeedItem[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalAnimalCount, setTotalAnimalCount] = useState(0)
  const [selectedRegion, setSelectedRegion] = useState("전체")
  const [selectedSpecies, setSelectedSpecies] = useState("전체")
  const [selectedKind, setSelectedKind] = useState("전체")
  const [selectedStatus, setSelectedStatus] = useState("보호중")
  const [kindMap, setKindMap] = useState<KindMap>({})
  const [sortOption, setSortOption] = useState<SortOption>("noticeEndDate")
  const [top3Animals, setTop3Animals] = useState<Top3Animal[]>([])

  const [activeTab, setActiveTab] = useState<"all" | "recommended">("all")
  const [showSurveyModal, setShowSurveyModal] = useState(false)
  const [surveyProfile, setSurveyProfile] = useState<SurveyProfile | null>(null)
  const [recommendedAnimals, setRecommendedAnimals] = useState<FeedItem[]>([])
  const [isFetchingRecommendations, setIsFetchingRecommendations] = useState(false)

  const fetchTop3Animals = async () => {
    const { data } = await apiRequest<unknown>(
      `${API_ENDPOINTS.animals}?sort=totalCheerCount,DESC&size=3`
    )
    const list = parseAnimalList(data)
    const mapped = list.map((animal, index) => ({
      id: `top${index + 1}`,
      animalId: Number(animal.animalId),
      rank: index + 1,
      name: animal.kindFullNm || animal.upKindNm || "품종 미상",
      imageUrl: normalizeImageUrl(animal.popfile1),
      cheerTemperature: mapTemperature(animal.temperature),
      maxCheerTemperature: 100,
    }))
    setTop3Animals(mapped)
  }


  const extractRemainingToday = (
    payload: { [key: string]: any } | string | number | null
  ): number | null => {
    if (typeof payload === "number") return payload
    if (typeof payload === "string") {
      const parsed = Number(payload)
      return Number.isFinite(parsed) ? parsed : null
    }
    if (!payload || typeof payload !== "object") return null
    if (typeof payload.remainingToday === "number") return payload.remainingToday
    if (typeof payload.remainingToday === "string") {
      const parsed = Number(payload.remainingToday)
      if (Number.isFinite(parsed)) return parsed
    }
    if (typeof payload.remaining === "number") return payload.remaining
    if (typeof payload.remaining === "string") {
      const parsed = Number(payload.remaining)
      if (Number.isFinite(parsed)) return parsed
    }
    if (typeof payload.remainingCheers === "number") return payload.remainingCheers
    if (typeof payload.remainingCheers === "string") {
      const parsed = Number(payload.remainingCheers)
      if (Number.isFinite(parsed)) return parsed
    }
    if (payload.data && typeof payload.data === "object") {
      return extractRemainingToday(payload.data as { [key: string]: any })
    }
    if (payload.result && typeof payload.result === "object") {
      return extractRemainingToday(payload.result as { [key: string]: any })
    }
    return null
  }

  const fetchDailyHeartsRemaining = async () => {
    if (!user) {
      setDailyHeartsRemaining(MAX_DAILY_HEARTS)
      return
    }

    const { data } = await apiRequest<{ [key: string]: any }>(API_ENDPOINTS.cheersToday)
    const remainingToday = extractRemainingToday(data)
    if (remainingToday === null) {
      return
    }

    setDailyHeartsRemaining(Math.max(0, Math.min(MAX_DAILY_HEARTS, remainingToday)))
  }

  const handleCheerSuccess = (info?: { remainingToday?: number }) => {
    if (info?.remainingToday !== undefined) {
      setDailyHeartsRemaining(Math.max(0, Math.min(MAX_DAILY_HEARTS, info.remainingToday)))
    } else {
      setDailyHeartsRemaining(prev => Math.max(0, prev - 1))
      fetchDailyHeartsRemaining()
    }
  }

  const fetchAnimals = async (page: number) => {
    const stateGroup = selectedStatus === "종료" ? 1 : 0
    const queryParams = new URLSearchParams({
      page: String(Math.max(page - 1, 0)),
      stateGroup: String(stateGroup),
    })

    if (selectedRegion !== "전체") {
      queryParams.set("region", selectedRegion)
    }

    if (selectedSpecies !== "전체") {
      queryParams.set("kind", selectedSpecies)
    }

    if (selectedKind !== "전체") {
      queryParams.set("kindFullNm", selectedKind)
    }

    if (sortOption === "cheerCount") {
      queryParams.set("sort", "totalCheerCount,DESC")
    }

    const query = queryParams.toString()
    const { data, error } = await apiRequest<unknown>(`${API_ENDPOINTS.animals}?${query}`)
    if (error) {
      setAnimals([])
      setTotalAnimalCount(0)
      setTotalPages(1)
      return
    }

    const parsedAnimals = parseAnimalList(data)
    setAnimals(parsedAnimals.map(mapAnimalToFeedItem))

    if (data && typeof data === "object") {
      const response = data as Record<string, unknown>
      const pages =
        typeof response.totalPages === "number"
          ? response.totalPages
          : response.data && typeof response.data === "object" && typeof (response.data as Record<string, unknown>).totalPages === "number"
            ? ((response.data as Record<string, unknown>).totalPages as number)
            : 1
      const total =
        typeof response.totalElements === "number"
          ? response.totalElements
          : typeof response.totalAnimalCount === "number"
            ? response.totalAnimalCount
            : response.data && typeof response.data === "object" && typeof (response.data as Record<string, unknown>).totalElements === "number"
              ? ((response.data as Record<string, unknown>).totalElements as number)
              : parsedAnimals.length
      setTotalPages(Math.max(1, pages))
      setTotalAnimalCount(total)
      return
    }

    setTotalPages(1)
    setTotalAnimalCount(parsedAnimals.length)
  }

  const fetchRecommendations = async (profile: SurveyProfile) => {
    setIsFetchingRecommendations(true)

    // Build the query parameters for the new backend recommendations endpoint
    const queryParams = new URLSearchParams({
      species: profile.species,
      size: profile.size,
      region: profile.region,
      housing: profile.housing,
      activity: profile.activity,
      experience: profile.experience,
      page: "0",
      size: "6" // return top 6 matching recommendations
    })

    const { data, error } = await apiRequest<unknown>(`${API_ENDPOINTS.recommendations}?${queryParams.toString()}`)
    if (error || !data) {
      setRecommendedAnimals([])
      setIsFetchingRecommendations(false)
      return
    }

    // Parse recommendation list and preserve recommendationReason from backend
    const parsed = parseAnimalList(data).map(item => {
      const feedItem = mapAnimalToFeedItem(item)
      return {
        ...feedItem,
        recommendationReason: (item as any).recommendationReason || ""
      }
    })

    setRecommendedAnimals(parsed)
    setIsFetchingRecommendations(false)
  }

  // Restore survey profile from localStorage on mount
  useEffect(() => {
    try {
      const savedPref = localStorage.getItem("petmeeting_user_pref")
      if (savedPref) {
        setSurveyProfile(JSON.parse(savedPref))
      }
    } catch (e) {
      console.error("Failed to load user preferences:", e)
    }
  }, [])

  // Refetch recommendations when profile changes
  useEffect(() => {
    if (surveyProfile) {
      fetchRecommendations(surveyProfile)
    }
  }, [surveyProfile])

  const [isRestored, setIsRestored] = useState(false)

  // 1. Restore state from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("animal_feed_state")
      if (saved) {
        const state = JSON.parse(saved)
        if (typeof state.currentPage === "number") setCurrentPage(state.currentPage)
        if (state.selectedRegion) setSelectedRegion(state.selectedRegion)
        if (state.selectedSpecies) setSelectedSpecies(state.selectedSpecies)
        if (state.selectedKind) setSelectedKind(state.selectedKind)
        if (state.selectedStatus) setSelectedStatus(state.selectedStatus)
        if (state.sortOption) setSortOption(state.sortOption)
      }
    } catch (e) {
      console.error("Failed to restore animal feed state:", e)
    } finally {
      setIsRestored(true)
    }
  }, [])

  // 2. Save state to sessionStorage on any changes
  useEffect(() => {
    if (!isRestored) return

    try {
      const state = {
        currentPage,
        selectedRegion,
        selectedSpecies,
        selectedKind,
        selectedStatus,
        sortOption
      }
      sessionStorage.setItem("animal_feed_state", JSON.stringify(state))
    } catch (e) {
      console.error("Failed to save animal feed state:", e)
    }
  }, [currentPage, selectedRegion, selectedSpecies, selectedKind, selectedStatus, sortOption, isRestored])

  useEffect(() => {
    fetchDailyHeartsRemaining()
  }, [user])

  useEffect(() => {
    if (!isRestored) return
    fetchAnimals(currentPage)
  }, [currentPage, selectedRegion, selectedSpecies, selectedKind, selectedStatus, sortOption, isRestored])

  useEffect(() => {
    let cancelled = false

    const fetchKindMap = async () => {
      const { data, error } = await apiRequest<unknown>(API_ENDPOINTS.animalKinds)
      if (cancelled || error) return
      setKindMap(parseKindMap(data))
    }

    fetchKindMap()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    fetchTop3Animals()
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 600, behavior: "smooth" })
  }

  const isSpeciesSelected = selectedSpecies !== "전체"
  const isKindSelectDisabled = !isSpeciesSelected
  const availableKindOptions = isSpeciesSelected ? (kindMap[selectedSpecies] ?? []) : []

  const handleSpeciesChange = (species: string) => {
    setSelectedSpecies(species)
    setSelectedKind("전체")
    setCurrentPage(1)
  }

  const isClosedStatus = selectedStatus === "종료"
  const sectionTitle = isClosedStatus ? "보호 종료 동물" : "전체 보호동물"
  const sectionSubtitle = isClosedStatus
    ? `따뜻한 관심으로 기억해야 할 총 ${totalAnimalCount}마리의 친구들이에요`
    : `총 ${totalAnimalCount}마리의 친구들이 가족을 기다리고 있어요`

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header dailyHeartsRemaining={dailyHeartsRemaining} maxDailyHearts={MAX_DAILY_HEARTS} />

      {/* Top 3 Ranking Banner */}
      <RankingBanner animals={top3Animals} />

      {/* Feed Section */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        
        {/* Section Tabs */}
        <div className="flex border-b border-border mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-5 py-3 text-sm font-bold border-b-2 transition-all duration-200",
              activeTab === "all"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            전체 보호동물 🐾
          </button>
          <button
            onClick={() => setActiveTab("recommended")}
            className={cn(
              "px-5 py-3 text-sm font-bold border-b-2 transition-all duration-200 flex items-center gap-1.5",
              activeTab === "recommended"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            ✨ 나를 위한 맞춤 추천
          </button>
        </div>

        {activeTab === "all" ? (
          /* Normal Section Header and Filters */
          <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-foreground">
                  {sectionTitle}
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {sectionSubtitle}
                </p>
              </div>
              <div className="w-full sm:w-auto sm:ml-auto flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
                  <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 w-full sm:w-auto">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground shrink-0">지역</span>
                      <Select value={selectedRegion} onValueChange={(value) => {
                        setSelectedRegion(value)
                        setCurrentPage(1)
                      }}>
                        <SelectTrigger className="h-9 rounded-lg border-border bg-background px-2">
                          <SelectValue placeholder="지역" />
                        </SelectTrigger>
                        <SelectContent>
                          {REGION_OPTIONS.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground shrink-0">종</span>
                      <Select value={selectedSpecies} onValueChange={handleSpeciesChange}>
                        <SelectTrigger className="h-9 rounded-lg border-border bg-background px-2">
                          <SelectValue placeholder="축종" />
                        </SelectTrigger>
                        <SelectContent>
                          {SPECIES_OPTIONS.map((species) => (
                            <SelectItem key={species} value={species}>
                              {species}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground shrink-0">품종</span>
                      <div className="min-w-0 max-w-[190px] w-[190px]">
                        <Select
                          value={selectedKind}
                          onValueChange={(value) => {
                            setSelectedKind(value)
                            setCurrentPage(1)
                          }}
                          disabled={isKindSelectDisabled}
                        >
                          <SelectTrigger className="h-9 w-full min-w-0 max-w-[190px] overflow-hidden rounded-lg border-border bg-background px-2 [&_[data-slot=select-value]]:block [&_[data-slot=select-value]]:truncate">
                            <SelectValue placeholder="품종" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto">
                            <SelectItem value="전체">전체</SelectItem>
                            {availableKindOptions.map((kind) => (
                              <SelectItem key={kind} value={kind}>
                                {kind}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground shrink-0">보호상태</span>
                      <Select value={selectedStatus} onValueChange={(value) => {
                        setSelectedStatus(value)
                        setCurrentPage(1)
                      }}>
                        <SelectTrigger className="h-9 rounded-lg border-border bg-background px-2">
                          <SelectValue placeholder="상태" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-2 py-2 sm:w-[220px]">
                  <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="w-full min-w-0">
                    <Select
                      value={sortOption}
                      onValueChange={(value) => {
                        setSortOption(value as SortOption)
                        setCurrentPage(1)
                      }}
                    >
                      <SelectTrigger className="h-9 rounded-lg border-border bg-background px-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="noticeEndDate">공고 종료일순</SelectItem>
                        <SelectItem value="cheerCount">응원 수 기준</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Feed Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {animals.map((item) => (
                <FeedCard
                  key={item.id}
                  id={item.id}
                  animalId={item.animalId}
                  processState={item.processState}
                  imageUrl={item.imageUrl}
                  animalInfo={item.animalInfo}
                  cheerTemperature={item.cheerTemperature}
                  maxCheerTemperature={item.maxCheerTemperature}
                  totalHeartCount={item.totalHeartCount}
                  adopterDiary={item.adopterDiary}
                  comments={item.comments}
                  dailyHeartsRemaining={dailyHeartsRemaining}
                  onCheerSuccess={handleCheerSuccess}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="py-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              <p className="text-center text-sm text-muted-foreground mt-4">
                {currentPage} / {totalPages} 페이지
              </p>
            </div>
          </>
        ) : (
          /* Recommended Feed Section */
          <>
            {surveyProfile && (
              <div className="bg-gradient-to-r from-primary/10 via-orange-500/5 to-pink-500/5 border border-primary/20 rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
                <div className="space-y-1">
                  <h4 className="text-sm md:text-md font-bold text-foreground flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary shrink-0" />
                    {surveyProfile.region} 지역의 {surveyProfile.housing.split(" (")[0]}에 딱 맞는 추천 리스트
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {surveyProfile.species === "전체" ? "강아지와 고양이 중" : `${surveyProfile.species} 중에서`} {surveyProfile.size !== "상관없음" ? `${surveyProfile.size.split(" (")[0]} 크기의 ` : ""}{surveyProfile.housing.includes("아파트") ? "아파트 거주 환경에 어울리는 순하고 소형급 아이들 위주로 " : ""}매칭한 결과입니다.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSurveyModal(true)}
                  className="rounded-xl border-primary/30 hover:bg-primary/10 text-primary font-bold text-xs gap-1.5 shrink-0"
                >
                  설문 다시 참여하기
                </Button>
              </div>
            )}

            {!surveyProfile ? (
              <div className="border border-border shadow-xl bg-gradient-to-br from-primary/5 via-background to-orange-500/5 rounded-3xl p-8 text-center space-y-6 max-w-2xl mx-auto my-12">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Sparkles className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-foreground">
                  어떤 동물이 나에게 가장 어울릴까요?
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                  주거 환경, 산책 시간, 반려 경험 등을 고려하여<br />
                  당신과 완벽하게 조화를 이루며 따뜻한 사랑을 선물할 아이들을 추천합니다.
                </p>
                <Button
                  onClick={() => setShowSurveyModal(true)}
                  size="lg"
                  className="rounded-2xl gap-2 font-bold px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105"
                >
                  나에게 맞는 동물 찾기 <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ) : isFetchingRecommendations ? (
              <div className="text-center py-20 space-y-4">
                <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                <p className="text-sm text-muted-foreground">당신의 라이프스타일에 어울리는 소중한 가족을 찾는 중...</p>
              </div>
            ) : recommendedAnimals.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-sm text-muted-foreground">추천 매칭 결과를 찾지 못했습니다. 설문을 다시 시도해 주세요.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedAnimals.map((item) => (
                  <div key={item.id} className="flex flex-col space-y-3 animate-fade-in">
                    <FeedCard
                      id={item.id}
                      animalId={item.animalId}
                      processState={item.processState}
                      imageUrl={item.imageUrl}
                      animalInfo={item.animalInfo}
                      cheerTemperature={item.cheerTemperature}
                      maxCheerTemperature={item.maxCheerTemperature}
                      totalHeartCount={item.totalHeartCount}
                      adopterDiary={item.adopterDiary}
                      comments={item.comments}
                      dailyHeartsRemaining={dailyHeartsRemaining}
                      onCheerSuccess={handleCheerSuccess}
                    />
                    <div className="mx-2 px-3 py-2.5 bg-card/60 backdrop-blur-sm rounded-2xl text-xs text-muted-foreground flex items-start gap-1.5 border border-border shadow-sm">
                      <Smile className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{(item as any).recommendationReason || getRecommendationReason(item, surveyProfile)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              2026 유기동물 응원 피드. 모든 생명은 소중합니다.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">이용약관</a>
              <a href="#" className="hover:text-foreground transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-foreground transition-colors">문의하기</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Step-based Survey Modal */}
      {showSurveyModal && (
        <SurveyModal
          onClose={() => setShowSurveyModal(false)}
          onComplete={(profile) => {
            setSurveyProfile(profile)
            localStorage.setItem("petmeeting_user_pref", JSON.stringify(profile))
            setShowSurveyModal(false)
          }}
        />
      )}
    </div>
  )
}

interface SurveyModalProps {
  onClose: () => void
  onComplete: (profile: SurveyProfile) => void
}

function SurveyModal({ onClose, onComplete }: SurveyModalProps) {
  const [step, setStep] = useState(1)
  const [species, setSpecies] = useState("")
  const [size, setSize] = useState("")
  const [region, setRegion] = useState("")
  const [housing, setHousing] = useState("")
  const [activity, setActivity] = useState("")
  const [experience, setExperience] = useState("")

  const handleNext = () => {
    if (step < 6) {
      setStep(prev => prev + 1)
    } else {
      onComplete({
        species,
        size,
        region,
        housing,
        activity,
        experience
      })
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1)
    }
  }

  // Options
  const speciesOptions = [
    { value: "개", label: "🐶 강아지", desc: "활발하고 친근한 친구" },
    { value: "고양이", label: "🐱 고양이", desc: "차분하고 매력적인 친구" },
    { value: "전체", label: "🐾 모두 좋아요", desc: "어떤 아이든 상관없어요" }
  ]

  const sizeOptions = [
    { value: "소형 (품에 쏙 들어오는 크기)", label: "소형견/소형묘", desc: "품에 쏙 들어오는 크기 (7kg 미만)" },
    { value: "중형 (어디서나 당당한 크기)", label: "중형견/중형묘", desc: "어디서나 듬직한 크기 (7~15kg)" },
    { value: "대형 (든든하고 듬직한 크기)", label: "대형견/대형묘", desc: "든든하고 듬직한 크기 (15kg 이상)" },
    { value: "상관없음", label: "상관없음", desc: "모든 크기가 좋습니다" }
  ]

  const regionOptions = [
    { value: "서울/경기/인천", label: "📍 서울/경기/인천", desc: "수도권 권역" },
    { value: "강원/충청", label: "📍 강원/충청", desc: "강원 및 충청 권역" },
    { value: "경상/부산/대구", label: "📍 경상/부산/대구", desc: "영남 및 경상 권역" },
    { value: "전라/제주", label: "📍 전라/제주", desc: "호남 및 전라/제주 권역" },
    { value: "전국 어디든", label: "🌎 전국 어디든", desc: "먼 거리도 직접 찾아갑니다" }
  ]

  const housingOptions = [
    { value: "아파트/원룸 (실내 생활 위주)", label: "🏢 아파트 / 빌라 / 원룸", desc: "실내 및 공동 주거 생활 위주" },
    { value: "단독주택/마당 (활동 범위가 넓은 환경)", label: "🏡 단독주택 / 마당", desc: "넓은 야외 활동이 가능한 주거지" }
  ]

  const activityOptions = [
    { value: "매일 산책 가능 (활동적인 편)", label: "🏃 매일 산책/놀이 가능", desc: "아이와 매우 활동적인 교감이 가능해요" },
    { value: "주말/가끔 가능 (차분하고 정적인 편)", label: "🛋️ 주말 혹은 가끔 산책 가능", desc: "차분하고 비교적 조용한 교감을 원해요" }
  ]

  const experienceOptions = [
    { value: "처음 키워보는 초보 집사", label: "🔰 처음 키워봅니다 (초보 보호자)", desc: "반려동물을 처음 맞이하는 서툰 첫걸음" },
    { value: "키워본 적 있는 숙련된 집사", label: "🤝 키워본 경험이 있습니다 (베테랑)", desc: "이전에 반려동물을 오랫동안 키워본 경험" }
  ]

  const isNextDisabled = () => {
    if (step === 1 && !species) return true
    if (step === 2 && !size) return true
    if (step === 3 && !region) return true
    if (step === 4 && !housing) return true
    if (step === 5 && !activity) return true
    if (step === 6 && !experience) return true
    return false
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-card rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col transition-all duration-300 transform scale-100">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-primary">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase">유기동물 맞춤 추천 설문</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-secondary h-1.5">
          <div 
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 flex-1 min-h-[320px] flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Step 1: Species */}
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-black text-foreground">
                  가장 관심 있는 동물 종류는 무엇인가요? 🐾
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {speciesOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSpecies(opt.value)}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group",
                        species === opt.value
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border hover:border-primary/50 hover:bg-secondary/50 text-muted-foreground"
                      )}
                    >
                      <div>
                        <p className="font-bold text-foreground text-sm">{opt.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                      {species === opt.value && <Check className="w-5 h-5 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Size */}
            {step === 2 && (
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-black text-foreground">
                  선호하시는 반려동물의 크기/체구가 있나요? ⚖️
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {sizeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSize(opt.value)}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group",
                        size === opt.value
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border hover:border-primary/50 hover:bg-secondary/50 text-muted-foreground"
                      )}
                    >
                      <div>
                        <p className="font-bold text-foreground text-sm">{opt.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                      {size === opt.value && <Check className="w-5 h-5 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Region */}
            {step === 3 && (
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-black text-foreground">
                  아이를 만나러 갈 수 있는 선호 지역은 어디인가요? 📍
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {regionOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setRegion(opt.value)}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group",
                        region === opt.value
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border hover:border-primary/50 hover:bg-secondary/50 text-muted-foreground"
                      )}
                    >
                      <div>
                        <p className="font-bold text-foreground text-sm">{opt.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                      {region === opt.value && <Check className="w-5 h-5 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Housing */}
            {step === 4 && (
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-black text-foreground">
                  현재 거주하고 계시는 환경은 어떤가요? 🏡
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {housingOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setHousing(opt.value)}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group",
                        housing === opt.value
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border hover:border-primary/50 hover:bg-secondary/50 text-muted-foreground"
                      )}
                    >
                      <div>
                        <p className="font-bold text-foreground text-sm">{opt.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                      {housing === opt.value && <Check className="w-5 h-5 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Activity */}
            {step === 5 && (
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-black text-foreground">
                  아이와 얼마나 함께 많은 시간을 보낼 수 있나요? 🏃
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {activityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setActivity(opt.value)}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group",
                        activity === opt.value
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border hover:border-primary/50 hover:bg-secondary/50 text-muted-foreground"
                      )}
                    >
                      <div>
                        <p className="font-bold text-foreground text-sm">{opt.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                      {activity === opt.value && <Check className="w-5 h-5 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Experience */}
            {step === 6 && (
              <div className="space-y-4">
                <h4 className="text-lg md:text-xl font-black text-foreground">
                  반려동물을 길러보신 경험이 있으신가요? 🤝
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {experienceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setExperience(opt.value)}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group",
                        experience === opt.value
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border hover:border-primary/50 hover:bg-secondary/50 text-muted-foreground"
                      )}
                    >
                      <div>
                        <p className="font-bold text-foreground text-sm">{opt.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                      {experience === opt.value && <Check className="w-5 h-5 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Modal Actions */}
          <div className="flex gap-3 pt-6 mt-6 border-t border-border">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 rounded-2xl py-6 font-bold"
              >
                이전으로
              </Button>
            )}
            <Button
              disabled={isNextDisabled()}
              onClick={handleNext}
              className="flex-1 rounded-2xl py-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
            >
              {step === 6 ? "완료하고 추천받기 ✨" : "다음 단계로"}
            </Button>
          </div>

        </div>

      </div>
    </div>
  )
}
