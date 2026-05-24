import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email, chaosArea } = await req.json()

  if (!email?.trim()) {
    return NextResponse.json({ error: 'email is required' }, { status: 400 })
  }

  const publicationId = process.env.BEEHIIV_PUBLICATION_ID
  const apiKey = process.env.BEEHIIV_API_KEY

  if (!publicationId || !apiKey) {
    console.error('Missing BEEHIIV_PUBLICATION_ID or BEEHIIV_API_KEY')
    return NextResponse.json({ error: 'newsletter not configured yet' }, { status: 500 })
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email: email.trim(),
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'lazygirlai-website',
          utm_medium: chaosArea ?? 'organic',
          custom_fields: name ? [{ name: 'name', value: name }] : [],
        }),
      }
    )

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('Beehiiv error:', err)
      return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
    }

    return NextResponse.json({ message: "you're on the list ♡" })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
  }
}
