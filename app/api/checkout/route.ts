import { NextRequest, NextResponse } from 'next/server'

const DODO_BASE =
  process.env.DODO_MODE === 'live'
    ? 'https://live.dodopayments.com'
    : 'https://test.dodopayments.com'

export async function POST(req: NextRequest) {
  const { productId, email, name } = await req.json()

  if (!productId || !email) {
    return NextResponse.json({ error: 'productId and email are required' }, { status: 400 })
  }

  const apiKey = process.env.DODO_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Payment service not configured' }, { status: 500 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''

  const res = await fetch(`${DODO_BASE}/checkouts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: { email, name: name ?? '' },
      return_url: `${siteUrl}/shop/thank-you`,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Dodo checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 502 })
  }

  const data = await res.json()
  return NextResponse.json({ checkoutUrl: data.checkout_url ?? data.url })
}
