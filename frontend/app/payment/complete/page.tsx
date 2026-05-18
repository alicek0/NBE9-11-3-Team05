import { Suspense } from "react"
import { PaymentCompleteClient } from "./payment-complete-client"

export default function PaymentCompletePage() {
  return (
    <Suspense fallback={null}>
      <PaymentCompleteClient />
    </Suspense>
  )
}
