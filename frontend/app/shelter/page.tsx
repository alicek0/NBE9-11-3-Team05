"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Landmark, MapPin, Phone, Search, ChevronRight } from "lucide-react"
import { getShelters, type Shelter, type ShelterListRes } from "@/lib/api"
import { Pagination } from "@/components/pagination"

export default function ShelterListPage() {
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchShelters = async () => {
      setIsLoading(true)
      const { data, error } = await getShelters(currentPage - 1, 12)
      
      if (error) {
        setError(error)
      } else if (data) {
        setShelters(data.shelters || [])
        setTotalPages(data.totalPages || 1)
        setTotalCount(data.totalCount || 0)
      }
      setIsLoading(false)
    }

    fetchShelters()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">전체 보호소</h1>
            <p className="text-muted-foreground text-lg">우리의 관심이 필요한 아이들이 머무는 곳입니다.</p>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold self-start">
            <Search className="w-4 h-4" />
            <span>총 {totalCount}개의 보호소가 있습니다</span>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse border-0 bg-card shadow-sm h-48" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-secondary/20 rounded-3xl border-2 border-dashed border-border">
            <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Landmark className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">보호소 목록을 불러오지 못했습니다</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>다시 시도</Button>
          </div>
        ) : shelters.length === 0 ? (
          <div className="text-center py-20 bg-secondary/10 rounded-3xl border-2 border-dashed border-border">
            <h3 className="text-xl font-semibold mb-2 text-muted-foreground">등록된 보호소가 없습니다</h3>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shelters.map((shelter) => (
                <Link key={shelter.shelterId} href={`/shelter/${shelter.shelterId}`} className="group block">
                  <Card className="h-full border-0 bg-card shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Landmark className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                            {shelter.careNm}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{shelter.orgNm}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4 text-primary/70 shrink-0" />
                          <span className="line-clamp-1">{shelter.careTel || "번호 정보 없음"}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary/70 shrink-0 mt-0.5" />
                          <span className="line-clamp-2 leading-relaxed">{shelter.careAddr || "주소 정보 없음"}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <div className="flex items-center text-sm font-semibold text-primary">
                          상세 보기 <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="py-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              <p className="text-center text-sm text-muted-foreground mt-4">
                {currentPage} / {totalPages} 페이지
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
