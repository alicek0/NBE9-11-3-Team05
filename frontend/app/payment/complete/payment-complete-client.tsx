"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { apiRequest, API_BASE_URL } from "@/lib/api"

type PaymentStatus = "loading" | "success" | "error"

export function PaymentCompleteClient() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<PaymentStatus>("loading")
  const [message, setMessage] = useState("결제 결과를 확인하고 있습니다.")

  const paymentId = useMemo(() => {
    return searchParams.get("paymentId") || searchParams.get("payment_id")
  }, [searchParams])

  useEffect(() => {
    const errorCode = searchParams.get("code")
    const errorMessage = searchParams.get("message") || searchParams.get("pgMessage")

    if (errorCode) {
      setStatus("error")
      setMessage(errorMessage || "결제가 완료되지 않았습니다.")
      return
    }

    if (!paymentId) {
      setStatus("error")
      setMessage("결제 ID를 찾을 수 없습니다.")
      return
    }

    let ignore = false

    async function completePayment() {
      const result = await apiRequest(`${API_BASE_URL}/donations/complete`, {
        method: "POST",
        body: JSON.stringify({ paymentId }),
      })

      if (ignore) return

      if (result.error) {
        setStatus("error")
        setMessage(result.error)
        return
      }

      setStatus("success")
      setMessage("후원이 정상적으로 완료되었습니다.")
    }

    completePayment()

    return () => {
      ignore = true
    }
  }, [paymentId, searchParams])

  const isLoading = status === "loading"
  const isSuccess = status === "success"

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <section className="w-full max-w-md border border-border rounded-lg bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          ) : isSuccess ? (
            <CheckCircle2 className="h-6 w-6 text-success" />
          ) : (
            <AlertCircle className="h-6 w-6 text-destructive" />
          )}
        </div>
        <h1 className="text-xl font-bold text-foreground">
          {isLoading ? "결제 확인 중" : isSuccess ? "결제 완료" : "결제 확인 실패"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{message}</p>
        <div className="mt-7 flex gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/campaign">캠페인 보기</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href="/profile">내 후원 내역</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
