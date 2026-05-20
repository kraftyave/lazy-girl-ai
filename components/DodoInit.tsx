'use client'
import Script from 'next/script'

export default function DodoInit() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/dodopayments-checkout@latest/dist/index.js"
      strategy="lazyOnload"
      onLoad={() => {
        if (window.DodoPaymentsCheckout) {
          window.DodoPaymentsCheckout.DodoPayments.Initialize({
            mode: process.env.NEXT_PUBLIC_DODO_MODE ?? 'test',
            displayType: 'overlay',
          })
        }
      }}
    />
  )
}
