/**
 * Lazy Girl AI — Lottie Animation Generator
 * Brand palette: blush #F2A7B3, blush-light #FFD7D1, sage #C7D1C2, cream #FFF6F0
 * All animations: 4-pointed ✦ stars, flat fills, no strokes, soft motion
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../public/animations')
mkdirSync(outDir, { recursive: true })

// Brand colors in Lottie's 0–1 float RGB format
const BLUSH       = [0.949, 0.655, 0.702, 1]  // #F2A7B3
const BLUSH_LIGHT = [1.000, 0.843, 0.820, 1]  // #FFD7D1
const SAGE        = [0.780, 0.820, 0.761, 1]  // #C7D1C2

const FPS = 30

function ease(x = 0.5, y = 1) {
  return { x: [x], y: [y] }
}

function easeVec(x = 0.5, y = 1) {
  return { x: [x, x, x], y: [y, y, y] }
}

/** 4-pointed ✦ sparkle shape */
function starShape(outerR, innerR = outerR * 0.22) {
  return {
    ty: 'sr', d: 1, sy: 1,
    pt: { a: 0, k: 4 },
    p:  { a: 0, k: [0, 0] },
    r:  { a: 0, k: 45 },      // 45° → ✦ orientation
    ir: { a: 0, k: innerR },
    is: { a: 0, k: 0 },
    or: { a: 0, k: outerR },
    os: { a: 0, k: 0 },
  }
}

function fill(color) {
  return { ty: 'fl', o: { a: 0, k: 100 }, c: { a: 0, k: color } }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. SPARKLE AMBIENT  (400×400, 120fr loop, 8 stars)
//    Each star plays a 60-frame fade-in/float/fade-out cycle.
//    `st` offset staggers them so the field feels continuous.
// ─────────────────────────────────────────────────────────────────────────────

function ambientStar(index, x, y, size, color, stOffset) {
  const dur = 60
  return {
    ddd: 0, ind: index, ty: 4,
    nm: `star-${index}`,
    sr: 1,
    ks: {
      o: {
        a: 1, k: [
          { i: ease(0.5, 1), o: ease(0.5, 0), t: 0,       s: [0]  },
          { i: ease(0.5, 1), o: ease(0.5, 0), t: 12,      s: [88] },
          { i: ease(0.5, 1), o: ease(0.5, 0), t: dur - 14, s: [70] },
          {                                    t: dur - 1,  s: [0]  },
        ],
      },
      r: {
        a: 1, k: [
          { i: ease(0.5, 1), o: ease(0.5, 0), t: 0,   s: [0]  },
          {                                    t: dur,  s: [45] },
        ],
      },
      p: {
        a: 1, k: [
          { i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 }, t: 0,   s: [x, y,      0] },
          {                                               t: dur, s: [x, y - 22, 0] },
        ],
      },
      a: { a: 0, k: [0, 0, 0] },
      s: {
        a: 1, k: [
          { i: easeVec(0.5, 1), o: easeVec(0.5, 0), t: 0,       s: [0,   0,   100] },
          { i: easeVec(0.5, 1), o: easeVec(0.5, 0), t: 12,      s: [100, 100, 100] },
          {                                           t: dur - 1, s: [65,  65,  100] },
        ],
      },
    },
    ao: 0,
    shapes: [starShape(size), fill(color)],
    ip: 0,
    op: dur,
    st: stOffset,
    bm: 0,
  }
}

const sparkleAmbient = {
  v: '5.7.4', fr: FPS, ip: 0, op: 120,
  w: 400, h: 400,
  nm: 'Lazy Girl — Sparkle Ambient',
  ddd: 0, assets: [],
  layers: [
    ambientStar(1,  68,  95, 13, BLUSH,       0),
    ambientStar(2, 318,  58, 10, BLUSH_LIGHT, 20),
    ambientStar(3, 175, 185, 15, SAGE,        10),
    ambientStar(4, 355, 265, 11, BLUSH,       40),
    ambientStar(5,  45, 320, 10, BLUSH_LIGHT, 60),
    ambientStar(6, 265, 345, 14, SAGE,        80),
    ambientStar(7, 140,  52,  9, BLUSH,       30),
    ambientStar(8, 382, 130, 10, BLUSH_LIGHT, 50),
  ],
}

writeFileSync(join(outDir, 'sparkle-ambient.json'), JSON.stringify(sparkleAmbient))
console.log('✓  sparkle-ambient.json')

// ─────────────────────────────────────────────────────────────────────────────
// 2. COPY BURST  (100×100, 38fr one-shot)
//    6 stars radiate from center at 60° intervals, scale up then fade.
//    Played programmatically on each copy action.
// ─────────────────────────────────────────────────────────────────────────────

function burstStar(index, angleDeg, color) {
  const rad = (angleDeg * Math.PI) / 180
  const r   = 32  // burst travel distance
  const cx  = 50, cy = 50
  const ex  = cx + Math.cos(rad) * r
  const ey  = cy + Math.sin(rad) * r
  const delay = Math.floor(index * 2.5)  // 0–12 frame stagger

  return {
    ddd: 0, ind: index, ty: 4,
    nm: `burst-${index}`,
    sr: 1,
    ks: {
      o: {
        a: 1, k: [
          { i: ease(0.5, 1), o: ease(0.5, 0), t: delay,      s: [100] },
          { i: ease(0.5, 1), o: ease(0.5, 0), t: delay + 18, s: [80]  },
          {                                    t: delay + 30,  s: [0]   },
        ],
      },
      r: {
        a: 1, k: [
          { i: ease(0.5, 1), o: ease(0.5, 0), t: delay,      s: [0]  },
          {                                    t: delay + 30,  s: [90] },
        ],
      },
      p: {
        a: 1, k: [
          { i: { x: 0.23, y: 1 }, o: { x: 0.5, y: 0 }, t: delay,      s: [cx, cy, 0] },
          {                                               t: delay + 30, s: [ex, ey, 0] },
        ],
      },
      a: { a: 0, k: [0, 0, 0] },
      s: {
        a: 1, k: [
          { i: easeVec(0.5, 1), o: easeVec(0.5, 0), t: delay,      s: [0,   0,   100] },
          { i: easeVec(0.5, 1), o: easeVec(0.5, 0), t: delay + 8,  s: [100, 100, 100] },
          {                                           t: delay + 30, s: [30,  30,  100] },
        ],
      },
    },
    ao: 0,
    shapes: [starShape(7, 1.5), fill(color)],
    ip: 0, op: 38, st: 0, bm: 0,
  }
}

const copyBurst = {
  v: '5.7.4', fr: FPS, ip: 0, op: 38,
  w: 100, h: 100,
  nm: 'Lazy Girl — Copy Burst',
  ddd: 0, assets: [],
  layers: [
    burstStar(1,   0, BLUSH),
    burstStar(2,  60, SAGE),
    burstStar(3, 120, BLUSH_LIGHT),
    burstStar(4, 180, BLUSH),
    burstStar(5, 240, SAGE),
    burstStar(6, 300, BLUSH_LIGHT),
  ],
}

writeFileSync(join(outDir, 'copy-burst.json'), JSON.stringify(copyBurst))
console.log('✓  copy-burst.json')

// ─────────────────────────────────────────────────────────────────────────────
// 3. CTA FLOAT  (600×200, 180fr loop, 5 hearts → simplified ✦ stars)
//    Slower, larger stars drifting upward for the CTA background.
// ─────────────────────────────────────────────────────────────────────────────

function ctaStar(index, x, y, size, color, stOffset) {
  const dur = 90
  return {
    ddd: 0, ind: index, ty: 4,
    nm: `cta-${index}`,
    sr: 1,
    ks: {
      o: {
        a: 1, k: [
          { i: ease(0.5, 1), o: ease(0.5, 0), t: 0,       s: [0]  },
          { i: ease(0.5, 1), o: ease(0.5, 0), t: 18,      s: [55] },
          { i: ease(0.5, 1), o: ease(0.5, 0), t: dur - 20, s: [45] },
          {                                    t: dur - 1,  s: [0]  },
        ],
      },
      r: {
        a: 1, k: [
          { i: ease(0.5, 1), o: ease(0.5, 0), t: 0,   s: [0]  },
          {                                    t: dur,  s: [30] },
        ],
      },
      p: {
        a: 1, k: [
          { i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 }, t: 0,   s: [x, y,      0] },
          {                                               t: dur, s: [x, y - 35, 0] },
        ],
      },
      a: { a: 0, k: [0, 0, 0] },
      s: {
        a: 1, k: [
          { i: easeVec(0.5, 1), o: easeVec(0.5, 0), t: 0,       s: [0,   0,   100] },
          { i: easeVec(0.5, 1), o: easeVec(0.5, 0), t: 18,      s: [100, 100, 100] },
          {                                           t: dur - 1, s: [80,  80,  100] },
        ],
      },
    },
    ao: 0,
    shapes: [starShape(size), fill(color)],
    ip: 0,
    op: dur,
    st: stOffset,
    bm: 0,
  }
}

const ctaFloat = {
  v: '5.7.4', fr: FPS, ip: 0, op: 180,
  w: 600, h: 200,
  nm: 'Lazy Girl — CTA Float',
  ddd: 0, assets: [],
  layers: [
    ctaStar(1,  80, 160, 18, BLUSH,        0),
    ctaStar(2, 200, 140, 14, BLUSH_LIGHT, 30),
    ctaStar(3, 360, 170, 20, SAGE,        60),
    ctaStar(4, 480, 150, 15, BLUSH,       90),
    ctaStar(5, 540, 120, 12, BLUSH_LIGHT, 15),
  ],
}

writeFileSync(join(outDir, 'cta-float.json'), JSON.stringify(ctaFloat))
console.log('✓  cta-float.json')

console.log('\n✦  All Lottie animations generated for Lazy Girl AI')
