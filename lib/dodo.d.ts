interface DodoPaymentsSDK {
  DodoPayments: {
    Initialize: (opts: {
      mode: string
      displayType?: string
      onEvent?: (event: { event_type: string; data?: Record<string, unknown> }) => void
    }) => void
    Checkout: {
      open: (opts: { checkoutUrl: string }) => void
    }
  }
}

declare global {
  interface Window {
    DodoPaymentsCheckout?: DodoPaymentsSDK
  }
}

export {}
