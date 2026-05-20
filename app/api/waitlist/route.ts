import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'

// Saves waitlist entries to a local JSON file
// Replace with Supabase insert when ready:
// await supabase.from('waitlist').insert({ name, email, chaos_area: chaosArea })

const dataDir = join(process.cwd(), 'data')
const filePath = join(dataDir, 'waitlist.json')

async function readWaitlist(): Promise<object[]> {
  try {
    const content = await readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch {
    return []
  }
}

export async function POST(req: NextRequest) {
  const { name, email, chaosArea } = await req.json()

  if (!email?.trim()) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    await mkdir(dataDir, { recursive: true })
    const existing = await readWaitlist()
    const already = existing.some((e: any) => e.email === email)
    if (already) {
      return NextResponse.json({ message: 'already on the list ♡' })
    }

    const entry = {
      name: name ?? '',
      email,
      chaosArea: chaosArea ?? '',
      source: 'lazy-girl-os-page',
      joinedAt: new Date().toISOString(),
    }

    await writeFile(filePath, JSON.stringify([...existing, entry], null, 2))
    return NextResponse.json({ message: 'you\'re on the list ♡' })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function GET() {
  const list = await readWaitlist()
  return NextResponse.json({ count: list.length })
}
