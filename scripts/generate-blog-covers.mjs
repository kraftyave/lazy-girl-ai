/**
 * Generate blog cover images with readable on-screen text via HTML/CSS.
 * Run: node scripts/generate-blog-covers.mjs
 */
import puppeteer from 'puppeteer'
import { mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '../public/images/blog')

const COVERS = [
  {
    file: 'gemini-lazy-girl-verdict-2026.png',
    label: 'Gmail + Gemini',
    lines: ['Thread summary', '3 emails need a reply', 'Move Tuesday meeting?'],
    accent: '#EDE0F5',
  },
  {
    file: 'chatgpt-voice-mode-when-to-use.png',
    label: 'Voice mode',
    lines: ['Brain dump ready', 'Sort my week', 'One thing at a time'],
    accent: '#FFD7D1',
  },
  {
    file: 'ai-mental-load-honest-answer.png',
    label: 'Weekly reset',
    lines: ['Reply today', 'Can wait', 'Let go'],
    accent: '#C7D1C2',
  },
  {
    file: 'passive-aggressive-email-prompt.png',
    label: 'Draft reply',
    lines: ['Thanks for the note.', 'Happy to clarify Friday.', 'Best,'],
    accent: '#FFD7D1',
  },
  {
    file: 'budget-bank-statement-ai-prompt.png',
    label: 'Spending',
    lines: ['Food · $412', 'Subs · $89', 'One fix: cancel 3'],
    accent: '#FFF0E8',
  },
  {
    file: 'meal-planning-prompt-sunday.png',
    label: 'This week',
    lines: ['Mon · tacos', 'Wed · soup', 'Fri · pasta'],
    accent: '#C7D1C2',
  },
  {
    file: 'therapy-prep-ai-prompt.png',
    label: 'Therapy prep',
    lines: ['Talk about:', 'Avoiding:', 'Ask:'],
    accent: '#C7D1C2',
  },
  {
    file: 'boundary-message-prompt.png',
    label: 'Messages',
    lines: ['I need tonight off.', 'Love you. Boundaries.', 'Sent ✓'],
    accent: '#FFD7D1',
  },
  {
    file: 'performance-review-prompt.png',
    label: 'Self-review',
    lines: ['Led Q2 launch', 'Cut costs 12%', 'Ready for more'],
    accent: '#C7D1C2',
  },
  {
    file: 'linkedin-bio-prompt.png',
    label: 'About',
    lines: ['I help teams ship', 'clearer, faster work.', 'Open to collabs →'],
    accent: '#C7D1C2',
  },
  {
    file: 'decision-spiral-2am-prompt.png',
    label: 'Decision',
    lines: ['Option A · stay', 'Option B · move', 'Pick: B'],
    accent: '#EDE0F5',
  },
  {
    file: 'hard-family-conversation-ai.png',
    label: 'Notes',
    lines: ['Say: I need space', 'If they push back:', 'Stay calm. Repeat.'],
    accent: '#FFD7D1',
  },
  {
    file: 'salary-negotiation-script-prompt.png',
    label: 'Offer call',
    lines: ['Grateful for the offer.', 'Based on market,', 'I was hoping for $95k.'],
    accent: '#C7D1C2',
  },
  {
    file: 'declutter-prompt-ai.png',
    label: '90 min plan',
    lines: ['1. Surfaces', '2. Donate bag', '3. Done enough ✓'],
    accent: '#C7D1C2',
  },
  {
    file: 'ai-reading-list-prompt.png',
    label: 'Read next',
    lines: ['The God of the Woods', 'Cleopatra and Frankenstein', 'Intermezzo'],
    accent: '#FFF0E8',
  },
  {
    file: 'lazygirlos-waitlist-what-were-building.png',
    label: 'LazyGirlOS',
    lines: ['good morning angel ☁️', 'Inbox · handled', 'Week · planned'],
    accent: '#EDE0F5',
  },
  {
    file: 'gmail-ai-automations-simple.png',
    label: 'Inbox',
    lines: ['Reply today · 2', 'This week · 5', 'Archive · 12'],
    accent: '#FFD7D1',
  },
  {
    file: 'overrated-ai-tools-2026.png',
    label: 'Subscriptions',
    lines: ['Keep: Claude', 'Cancel: 3 apps', 'Save: $47/mo'],
    accent: '#FFD7D1',
  },
]

function coverHtml({ label, lines, accent }) {
  const lineHtml = lines
    .map((line, i) => `<div class="line ${i === 0 ? 'strong' : ''}">${line}</div>`)
    .join('')

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px; height: 675px; overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #FFF6F0 0%, ${accent} 45%, #F2A7B3 100%);
      position: relative;
    }
    .grain {
      position: absolute; inset: 0; opacity: 0.06;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
    .orb1, .orb2 {
      position: absolute; border-radius: 50%; filter: blur(60px);
    }
    .orb1 { width: 320px; height: 320px; background: #F2A7B3; top: -80px; right: 120px; opacity: 0.35; }
    .orb2 { width: 280px; height: 280px; background: #C7D1C2; bottom: -60px; left: 80px; opacity: 0.4; }
    .desk {
      position: absolute; bottom: 0; left: 0; right: 0; height: 180px;
      background: linear-gradient(to top, rgba(139,122,107,0.12), transparent);
    }
    .props {
      position: absolute; bottom: 48px; left: 88px;
      display: flex; gap: 24px; align-items: flex-end;
    }
    .mug {
      width: 72px; height: 88px; border-radius: 0 0 18px 18px;
      background: linear-gradient(180deg, #fff 0%, #f5ebe3 100%);
      border: 2px solid rgba(139,122,107,0.15);
      box-shadow: 0 12px 32px rgba(139,122,107,0.15);
    }
    .mug::before {
      content: ''; position: absolute; width: 22px; height: 36px;
      border: 3px solid rgba(139,122,107,0.2); border-left: none;
      border-radius: 0 12px 12px 0; margin-left: 68px; margin-top: 28px;
    }
    .notebook {
      width: 120px; height: 96px; background: #fff;
      border-radius: 6px; box-shadow: 0 12px 32px rgba(139,122,107,0.12);
      padding: 14px 16px; color: #8B7A6B; font-size: 11px; line-height: 1.5;
    }
    .phone-wrap {
      position: absolute; right: 100px; bottom: 56px;
      transform: rotate(-4deg);
    }
    .phone {
      width: 280px; height: 560px; border-radius: 36px;
      background: #1a1a1a; padding: 12px;
      box-shadow: 0 32px 80px rgba(60,40,40,0.28), 0 0 0 1px rgba(255,255,255,0.08) inset;
    }
    .screen {
      width: 100%; height: 100%; border-radius: 28px;
      background: linear-gradient(180deg, #FFF9F5 0%, #FFF0E8 100%);
      padding: 36px 28px; display: flex; flex-direction: column; gap: 8px;
    }
    .status {
      display: flex; justify-content: space-between; font-size: 13px;
      color: #8B7A6B; font-weight: 500; margin-bottom: 20px;
    }
    .app-label {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 28px; color: #3d3530; margin-bottom: 24px;
      letter-spacing: -0.02em;
    }
    .line {
      font-size: 17px; line-height: 1.45; color: #5c524c;
      padding: 12px 14px; background: rgba(255,255,255,0.7);
      border-radius: 12px; border: 1px solid rgba(242,167,179,0.2);
    }
    .line.strong { font-weight: 600; color: #3d3530; }
    .brand {
      position: absolute; top: 48px; left: 72px;
      font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
      color: rgba(139,122,107,0.7); font-weight: 500;
    }
    .tagline {
      position: absolute; top: 72px; left: 72px; max-width: 420px;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 42px; line-height: 1.1; color: #3d3530;
      letter-spacing: -0.02em;
    }
  </style>
</head>
<body>
  <div class="grain"></div>
  <div class="orb1"></div>
  <div class="orb2"></div>
  <div class="brand">lazy girl ai ✦</div>
  <div class="tagline">${label}</div>
  <div class="desk"></div>
  <div class="props">
    <div class="mug" style="position:relative"></div>
    <div class="notebook">notes<br/>☁️ handled</div>
  </div>
  <div class="phone-wrap">
    <div class="phone">
      <div class="screen">
        <div class="status"><span>9:41</span><span>☁️</span></div>
        <div class="app-label">${label}</div>
        ${lineHtml}
      </div>
    </div>
  </div>
</body>
</html>`
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 675, deviceScaleFactor: 2 })

  for (const cover of COVERS) {
    const html = coverHtml(cover)
    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 10000 })
    await page.evaluate(() => document.fonts?.ready)
    const outPath = path.join(OUT_DIR, cover.file)
    await page.screenshot({ path: outPath, type: 'png' })
    console.log('✓', cover.file)
  }

  await browser.close()
  console.log(`\nDone — ${COVERS.length} covers saved to public/images/blog/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})