'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Moon, Zap, Check } from 'lucide-react'

// ── data ──────────────────────────────────────────────────────

const chatMessages = [
  { msg: "good morning angel ☁️ you have 3 things today. that's enough.", vibe: 'Soft Girl Era' },
  { msg: "soft chaos detected. we're fixing it.", vibe: 'Chaos Fairy' },
  { msg: "we are not having a filler episode today.", vibe: 'Main Character' },
  { msg: "drink water before opening TikTok please.", vibe: 'Wellness Reset' },
  { msg: "your inbox is sorted. you're welcome.", vibe: 'CEO Girl' },
  { msg: "tomorrow is already handled. go to sleep.", vibe: 'Healing Era' },
]

// Fixed positions — no Math.random to avoid hydration mismatch
const sparklePositions = [
  { x: 8,  y: 12, size: 10, delay: 0 },
  { x: 78, y: 6,  size: 8,  delay: 0.9 },
  { x: 91, y: 52, size: 7,  delay: 1.7 },
  { x: 4,  y: 78, size: 9,  delay: 0.4 },
  { x: 47, y: 90, size: 8,  delay: 1.3 },
  { x: 63, y: 20, size: 7,  delay: 2.1 },
  { x: 30, y: 42, size: 8,  delay: 0.7 },
  { x: 84, y: 82, size: 9,  delay: 1.6 },
]

const heroNotifications = [
  { text: 'morning brief ready ✦', bg: 'bg-blush text-white' },
  { text: 'inbox sorted. 5 handled ♡', bg: 'bg-sage/80 text-white' },
  { text: 'daily reset in 2 hours', bg: 'bg-[#EDE0F5] text-charcoal' },
]

const heroThemeBadges = ['Soft Girl Era', 'CEO Girl', 'Chaos Fairy', 'Main Character']

const previewThemes = [
  { name: 'Soft Girl Era',   bg: 'from-[#FFD7D1]/70 to-blush/30',      accent: 'text-blush',          badge: 'bg-blush/20 text-blush',           greeting: 'good morning angel ☁️' },
  { name: 'Main Character',  bg: 'from-charcoal/8 to-blush/15',         accent: 'text-charcoal',       badge: 'bg-charcoal/10 text-charcoal',     greeting: "it's giving main character." },
  { name: 'CEO Girl',        bg: 'from-sage/35 to-[#C7D1C2]/45',        accent: 'text-charcoal/80',    badge: 'bg-sage/30 text-charcoal/70',      greeting: 'objectives: cleared.' },
  { name: 'Coquette',        bg: 'from-[#FFD7D1]/80 to-[#EDE0F5]/40',   accent: 'text-blush',          badge: 'bg-blush/15 text-blush',           greeting: 'très chic, très handled ♡' },
  { name: 'Y2K Cyber',       bg: 'from-[#EDE0F5]/60 to-blush/25',       accent: 'text-charcoal',       badge: 'bg-[#EDE0F5] text-charcoal',       greeting: 'system online. ✧' },
  { name: 'Matcha Girl',     bg: 'from-sage/45 to-[#C7D1C2]/55',        accent: 'text-charcoal/80',    badge: 'bg-sage/40 text-charcoal/70',      greeting: "slow down. you're enough." },
  { name: 'Chaos Fairy',     bg: 'from-blush/25 to-[#EDE0F5]/50',       accent: 'text-blush',          badge: 'bg-blush/20 text-blush',           greeting: 'chaos managed. somehow.' },
  { name: 'Healing Era',     bg: 'from-[#FFF0E8]/80 to-sage/20',        accent: 'text-taupe',          badge: 'bg-sage/20 text-taupe',            greeting: 'you are doing so well.' },
  { name: 'Wellness Reset',  bg: 'from-sage/25 to-[#FFF0E8]/60',        accent: 'text-charcoal/70',    badge: 'bg-sage/25 text-charcoal/60',      greeting: 'breathe. then begin.' },
  { name: 'Dark Feminine',   bg: 'from-[#1E1520] to-[#2A1C22]',         accent: 'text-[#F2A7B3]',      badge: 'bg-[#F2A7B3]/20 text-[#F2A7B3]',  greeting: 'power mode: active.' },
  { name: 'Pink Pilates',    bg: 'from-blush-light/60 to-[#FFD7D1]/40', accent: 'text-blush',          badge: 'bg-blush/15 text-blush',           greeting: 'stretch. slay. repeat.' },
  { name: 'Rainy Day Mode',  bg: 'from-[#C7D1C2]/40 to-taupe/10',       accent: 'text-taupe',          badge: 'bg-[#C7D1C2]/30 text-taupe',       greeting: 'cozy and handled.' },
]

const allThemes = [
  { name: 'Soft Girl Era',   color: 'from-[#FFD7D1]/60 to-blush/30',       text: 'text-blush' },
  { name: 'Main Character',  color: 'from-charcoal/8 to-blush/15',          text: 'text-charcoal' },
  { name: 'CEO Girl',        color: 'from-sage/30 to-[#C7D1C2]/40',         text: 'text-charcoal/80' },
  { name: 'Coquette',        color: 'from-[#FFD7D1]/80 to-[#EDE0F5]/40',    text: 'text-blush' },
  { name: 'Y2K Cyber',       color: 'from-[#EDE0F5]/50 to-blush/20',        text: 'text-charcoal' },
  { name: 'Matcha Girl',     color: 'from-sage/40 to-[#C7D1C2]/50',         text: 'text-charcoal/80' },
  { name: 'Chaos Fairy',     color: 'from-blush/20 to-[#EDE0F5]/50',        text: 'text-blush' },
  { name: 'Healing Era',     color: 'from-[#FFF0E8]/80 to-sage/20',         text: 'text-taupe' },
  { name: 'Wellness Reset',  color: 'from-sage/25 to-[#FFF0E8]/60',         text: 'text-charcoal/70' },
  { name: 'Dark Feminine',   color: 'from-[#1E1520] to-[#2A1C22]',          text: 'text-[#F2A7B3]' },
  { name: 'Pink Pilates',    color: 'from-blush-light/60 to-[#FFD7D1]/40',  text: 'text-blush' },
  { name: 'Rainy Day Mode',  color: 'from-[#C7D1C2]/40 to-taupe/10',        text: 'text-taupe' },
]

// ── decorative sparkles ────────────────────────────────────────

function SparkleField() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparklePositions.map((s, i) => (
        <motion.span
          key={i}
          className="absolute select-none text-blush/30 font-sans"
          style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.3, 0.5], rotate: [0, 90, 0] }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  )
}

// ── hero dashboard mockup ──────────────────────────────────────

function DashboardMockup() {
  const [notifIndex, setNotifIndex] = useState(0)
  const [showNotif, setShowNotif] = useState(false)
  const [themeIndex, setThemeIndex] = useState(0)

  useEffect(() => {
    const showTimer = setTimeout(() => setShowNotif(true), 2200)

    const notifInterval = setInterval(() => {
      setShowNotif(false)
      const t = setTimeout(() => {
        setNotifIndex(i => (i + 1) % heroNotifications.length)
        setShowNotif(true)
      }, 700)
      return () => clearTimeout(t)
    }, 4000)

    const themeInterval = setInterval(() => {
      setThemeIndex(i => (i + 1) % heroThemeBadges.length)
    }, 2800)

    return () => {
      clearTimeout(showTimer)
      clearInterval(notifInterval)
      clearInterval(themeInterval)
    }
  }, [])

  const notif = heroNotifications[notifIndex]

  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      {/* Notification sticker — corner badge */}
      <AnimatePresence mode="wait">
        {showNotif && (
          <motion.div
            key={notifIndex}
            initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 2, y: [0, -5, 0] }}
            exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 } }}
            className={`absolute -top-4 -right-5 z-10 ${notif.bg} font-sans text-[11px] font-medium px-4 py-2 rounded-2xl shadow-soft whitespace-nowrap`}
          >
            {notif.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 border border-blush-light/30 shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <p className="font-script text-xl text-blush">good morning angel ☁️</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={themeIndex}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-blush/20 to-[#EDE0F5]/40 rounded-full px-3 py-1 border border-blush/20"
            >
              <p className="font-sans text-[9px] text-blush font-medium">{heroThemeBadges[themeIndex]}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Assistant message */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-gradient-to-br from-blush-light/40 to-[#FFD7D1]/30 rounded-2xl px-4 py-3 mb-4 border border-blush/15"
        >
          <p className="font-sans text-xs text-charcoal/80 leading-relaxed italic">
            &ldquo;you have 3 things today. the rest can wait. let&apos;s make it a soft one.&rdquo;
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <motion.div
              className="w-1 h-1 rounded-full bg-blush"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <p className="font-sans text-[9px] text-blush/70">Nova — your AI bestie ✦</p>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="h-1.5 bg-blush-light/30 rounded-full mb-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '76%' }}
            transition={{ duration: 1.3, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="h-full bg-gradient-to-r from-blush to-[#e8899a] rounded-full"
          />
        </div>

        {/* Widget grid — staggered entrance */}
        <div className="grid grid-cols-2 gap-2.5 mb-2.5">
          {[
            { label: 'morning brief', stat: '3 priorities', sub: 'day built ✓', color: 'from-blush-light/50 to-[#FFD7D1]/30' },
            { label: 'emotional check-in', stat: 'feeling okay', sub: 'noted ♡', color: 'from-sage/20 to-[#C7D1C2]/30', subColor: 'text-blush font-medium' },
            { label: 'automations', stat: 'inbox cleared', sub: '5 handled ✦', color: 'from-[#FFF0E8]/80 to-blush-light/20' },
            { label: 'daily reset', stat: '9:00pm', sub: 'scheduled ✓', color: 'from-[#EDE0F5]/40 to-sage/15' },
          ].map((w, i) => (
            <motion.div
              key={w.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
              className={`bg-gradient-to-br ${w.color} rounded-2xl p-3.5`}
            >
              <p className="font-sans text-[9px] uppercase tracking-wider text-taupe/70 mb-1">{w.label}</p>
              <p className="font-sans text-sm font-medium text-charcoal">{w.stat}</p>
              <p className={`font-sans text-[10px] mt-0.5 ${w.subColor ?? 'text-taupe'}`}>{w.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Input pill */}
        <div className="bg-charcoal/4 rounded-2xl px-4 py-3 flex items-center justify-between">
          <p className="font-sans text-xs text-taupe">talk to Nova…</p>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-6 rounded-full bg-blush flex items-center justify-center"
          >
            <span className="text-white text-xs">✦</span>
          </motion.div>
        </div>
      </motion.div>

    </div>
  )
}

// ── animated chat (what she sounds like) ──────────────────────

function AnimatedChat() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showMsg, setShowMsg] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMsg(false)
      setIsTyping(true)
      const t = setTimeout(() => {
        setIsTyping(false)
        setMsgIndex(i => (i + 1) % chatMessages.length)
        setShowMsg(true)
      }, 1800)
      return () => clearTimeout(t)
    }, 4800)
    return () => clearInterval(interval)
  }, [])

  const current = chatMessages[msgIndex]

  return (
    <div className="max-w-sm mx-auto lg:mx-0 w-full">
      <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-5 border border-blush-light/30 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-blush-light/20">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blush to-[#e8899a] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(242,167,179,0.35)]">
            <span className="text-white text-sm">✦</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-sans text-sm font-medium text-charcoal">Nova</p>
            <div className="flex items-center gap-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="font-sans text-[10px] text-taupe">your AI bestie · online</p>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={msgIndex}
              initial={{ opacity: 0, y: -4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="font-sans text-[9px] text-blush bg-blush/10 border border-blush/20 px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              {current.vibe}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Message area */}
        <div className="min-h-[72px] flex items-end mb-4">
          <AnimatePresence mode="wait">
            {isTyping ? (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                className="bg-gradient-to-br from-blush-light/50 to-[#FFD7D1]/30 rounded-2xl rounded-tl-sm px-4 py-3"
              >
                <div className="flex gap-1.5 items-center h-4">
                  {[0, 0.15, 0.3].map((d, j) => (
                    <motion.div
                      key={j}
                      className="w-1.5 h-1.5 rounded-full bg-blush"
                      animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.65, repeat: Infinity, delay: d, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : showMsg ? (
              <motion.div
                key={`msg-${msgIndex}`}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
                className="bg-gradient-to-br from-blush-light/50 to-[#FFD7D1]/30 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]"
              >
                <p className="font-serif text-sm text-charcoal italic leading-relaxed">
                  &ldquo;{current.msg}&rdquo;
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Input mock */}
        <div className="bg-charcoal/4 rounded-2xl px-4 py-3 flex items-center justify-between">
          <p className="font-sans text-xs text-taupe/50">reply to Nova…</p>
          <div className="w-5 h-5 rounded-full bg-blush/20 flex items-center justify-center">
            <span className="text-blush text-[10px]">✦</span>
          </div>
        </div>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {chatMessages.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full bg-blush"
            animate={{ width: i === msgIndex ? 16 : 5, height: 5, opacity: i === msgIndex ? 1 : 0.25 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}

// ── animated morning brief widget ─────────────────────────────

function MorningBriefWidget() {
  const [checked, setChecked] = useState<number[]>([])

  useEffect(() => {
    const run = () => {
      setChecked([])
      ;[0, 1, 2].forEach(i => {
        setTimeout(() => setChecked(c => c.includes(i) ? c : [...c, i]), 900 + i * 650)
      })
    }
    run()
    const interval = setInterval(run, 5500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white/40 rounded-2xl p-3 mb-4">
      {['send morning brief', 'set 3 priorities', 'emotional check-in'].map((task, i) => (
        <div key={task} className="flex items-center gap-2 py-1">
          <motion.div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
              checked.includes(i) ? 'border-blush bg-blush' : 'border-blush/30'
            }`}
            animate={{ scale: checked.includes(i) ? [1, 1.25, 1] : 1 }}
            transition={{ duration: 0.25 }}
          >
            {checked.includes(i) && <Check className="w-2 h-2 text-white" strokeWidth={3} />}
          </motion.div>
          <p className={`font-sans text-[11px] transition-all duration-300 ${
            checked.includes(i) ? 'text-taupe/40 line-through' : 'text-charcoal/80'
          }`}>{task}</p>
        </div>
      ))}
    </div>
  )
}

// ── animated automation widget ─────────────────────────────────

function AutomationWidget() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(i => (i + 1) % 4)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  const automations = ['clean inbox', 'prep my week', 'creator sprint', 'launch checklist']

  return (
    <div className="bg-white/40 rounded-2xl p-3 mb-4">
      {automations.map((task, i) => (
        <div key={task} className="flex items-center gap-2 py-0.5">
          <AnimatePresence mode="wait">
            {i === activeIndex ? (
              <motion.div
                key="zap"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.3, opacity: 0 }}
                className="w-3.5 h-3.5 flex-shrink-0"
              >
                <Zap className="w-3.5 h-3.5 text-blush" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="dot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`w-3.5 h-3.5 flex items-center justify-center flex-shrink-0`}
              >
                <div className={`w-1 h-1 rounded-full ${i < activeIndex ? 'bg-sage' : 'bg-taupe/20'}`} />
              </motion.div>
            )}
          </AnimatePresence>
          <p className={`font-sans text-[11px] transition-all duration-200 ${
            i === activeIndex ? 'text-blush font-medium' : i < activeIndex ? 'text-taupe/40' : 'text-charcoal/70'
          }`}>{task}</p>
        </div>
      ))}
    </div>
  )
}

// ── theme preview switcher ─────────────────────────────────────

function ThemePreview() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setActive(i => (i + 1) % previewThemes.length), 2800)
    return () => clearInterval(interval)
  }, [])

  const theme = previewThemes[active]

  return (
    <div className="w-full">
      {/* Selector pills */}
      <div className="flex flex-wrap gap-2 mb-5 justify-center">
        {previewThemes.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setActive(i)}
            className={`font-sans text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-full transition-all duration-300 ${
              i === active
                ? 'bg-blush text-white shadow-[0_4px_12px_rgba(242,167,179,0.35)]'
                : 'bg-white/60 text-taupe border border-blush-light/30 hover:bg-blush-light/30'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Live preview card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          className={`bg-gradient-to-br ${theme.bg} rounded-[2rem] p-6 border border-white/60 shadow-[0_12px_40px_rgba(0,0,0,0.06)]`}
        >
          <div className="flex items-center justify-between mb-4">
            <p className={`font-script text-lg ${theme.accent}`}>{theme.greeting}</p>
            <span className={`font-sans text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full ${theme.badge}`}>{theme.name}</span>
          </div>
          <div className="h-1 bg-white/30 rounded-full mb-4 overflow-hidden">
            <motion.div
              key={`bar-${active}`}
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="h-full bg-white/55 rounded-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['morning brief', 'companion', 'automations', 'daily reset'].map((w) => (
              <div key={w} className="bg-white/20 rounded-xl p-2.5">
                <p className="font-sans text-[9px] uppercase tracking-wider text-white/60 mb-1.5">{w}</p>
                <div className="h-1 bg-white/40 rounded-full w-4/5 mb-1" />
                <div className="h-1 bg-white/20 rounded-full w-3/5" />
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── companion live chat ────────────────────────────────────────

function CompanionChat() {
  const companionQuotes = [
    { msg: "you only have 3 things today. protect that.", sender: 'Nova' },
    { msg: "this week is already planned. you're welcome.", sender: 'Nova' },
    { msg: "rest is not laziness. it's strategy.", sender: 'Nova' },
    { msg: "the chaos is sorted. go do the thing.", sender: 'Nova' },
  ]
  const [visible, setVisible] = useState(1)

  useEffect(() => {
    if (visible >= companionQuotes.length) return
    const t = setTimeout(() => setVisible(v => v + 1), 1400)
    return () => clearTimeout(t)
  }, [visible, companionQuotes.length])

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-5 border border-blush-light/30 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2.5 mb-4 pb-3.5 border-b border-blush-light/20">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blush to-[#e8899a] flex items-center justify-center">
          <span className="text-white text-xs">✦</span>
        </div>
        <div>
          <p className="font-sans text-xs font-medium text-charcoal">Nova</p>
          <div className="flex items-center gap-1">
            <motion.div className="w-1 h-1 rounded-full bg-sage" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <p className="font-sans text-[9px] text-taupe">Main Character mode</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {companionQuotes.slice(0, visible).map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="bg-gradient-to-br from-blush-light/40 to-[#FFD7D1]/25 rounded-2xl rounded-tl-sm px-4 py-3"
          >
            <p className="font-serif text-xs text-charcoal italic leading-relaxed">&ldquo;{q.msg}&rdquo;</p>
          </motion.div>
        ))}
        {visible < companionQuotes.length && (
          <div className="bg-blush-light/30 rounded-2xl rounded-tl-sm px-4 py-3 w-fit">
            <div className="flex gap-1 items-center h-3.5">
              {[0, 0.15, 0.3].map((d, j) => (
                <motion.div key={j} className="w-1.5 h-1.5 rounded-full bg-blush" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── waitlist form ──────────────────────────────────────────────

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [era, setEra] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, chaosArea: era }),
      })
      const data = await res.json()
      if (res.ok) {
        setState('success')
        setMsg(data.message)
      } else {
        setState('error')
        setMsg(data.error ?? 'something went wrong')
      }
    } catch {
      setState('error')
      setMsg('something went wrong. try again.')
    }
  }

  if (state === 'success') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
        <p className="font-script text-3xl text-blush mb-2">you&apos;re in ♡</p>
        <p className="font-sans text-sm text-taupe">your AI bestie is getting ready for you.</p>
        <p className="font-sans text-xs text-taupe/60 mt-2">we&apos;ll let you know the moment LazyGirlOS is live.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="your name (optional)"
          className="w-full px-4 py-3.5 text-sm font-sans text-charcoal bg-white/80 border border-blush-light/40 rounded-2xl focus:outline-none focus:border-blush/50 placeholder:text-taupe/40 transition-colors duration-150" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your email ✦" required
          className="w-full px-4 py-3.5 text-sm font-sans text-charcoal bg-white/80 border border-blush-light/40 rounded-2xl focus:outline-none focus:border-blush/50 placeholder:text-taupe/40 transition-colors duration-150" />
      </div>
      <select value={era} onChange={e => setEra(e.target.value)}
        className="w-full px-4 py-3.5 text-sm font-sans text-charcoal bg-white/80 border border-blush-light/40 rounded-2xl focus:outline-none focus:border-blush/50 transition-colors duration-150 appearance-none">
        <option value="">choose your era ✦ (optional)</option>
        <option value="soft-girl">Soft Girl Era</option>
        <option value="main-character">Main Character</option>
        <option value="ceo-girl">CEO Girl</option>
        <option value="wellness-reset">Wellness Reset</option>
        <option value="chaos-fairy">Chaos Fairy</option>
      </select>
      {state === 'error' && <p className="font-sans text-xs text-red-400 px-1">{msg}</p>}
      <button type="submit" disabled={state === 'loading'}
        className="w-full py-4 bg-blush text-white font-sans font-medium text-sm rounded-full hover:bg-[#e8899a] disabled:opacity-60 active:scale-[0.98] transition-all duration-150 shadow-[0_6px_24px_rgba(242,167,179,0.4)]">
        {state === 'loading' ? 'joining…' : 'enter LazyGirlOS ✦'}
      </button>
      <p className="font-sans text-[10px] text-taupe/50 text-center">no spam. just early access + launch news.</p>
    </form>
  )
}

// ── page ───────────────────────────────────────────────────────

export default function LazyGirlOSClient() {
  return (
    <main className="min-h-screen bg-cream overflow-x-hidden">

      {/* Hero */}
      <section className="pt-28 pb-24 px-6 bg-gradient-to-br from-[#FFD7D1]/30 via-cream to-blush-light/20 relative overflow-hidden">
        <SparkleField />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-blush/8 blur-3xl" />
          <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-sage/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#EDE0F5]/20 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-blush/10 border border-blush/20 rounded-full px-4 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-blush animate-pulse" />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-blush font-medium">coming soon · join the waitlist</span>
              </motion.div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[1.02] mb-4">LazyGirlOS</h1>
              <p className="font-script text-2xl md:text-3xl text-blush mb-6">Romanticize Your Life, Automate the Admin ♡</p>
              <p className="font-sans text-taupe text-base leading-relaxed mb-3 max-w-lg">
                A cinematic AI life operating system. Your ambient AI companion, curated automations, emotional support, and a dashboard that looks like your digital bedroom.
              </p>
              <p className="font-sans text-sm text-taupe/70 italic mb-10">No API key. No setup. Just open it and feel better.</p>

              <div className="max-w-md"><WaitlistForm /></div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }} className="block mt-10 lg:mt-0 pt-0 lg:pt-12">
              <DashboardMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The vibe */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium mb-4">The Vibe</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4 leading-[1.05]">
              Clueless x Her x Tumblr<br />
              <span className="font-script text-blush">x iPhone Widgets x 2000s Internet ♡</span>
            </h2>
            <p className="font-sans text-taupe text-base leading-relaxed max-w-2xl mx-auto mb-4">
              Not a productivity app. Not a boring SaaS dashboard. LazyGirlOS is a customizable digital sanctuary that makes your life feel like a main character moment.
            </p>
            <p className="font-sans text-sm text-taupe/70 italic max-w-lg mx-auto">
              A luxury concierge, a rich-girl command center, and an emotionally intelligent AI best friend. All in one OS.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What she sounds like — animated chat */}
      <section className="py-8 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium mb-2">What She Sounds Like</p>
            <h2 className="font-serif text-3xl text-charcoal">Not a Robot. Your Bestie.</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <AnimatedChat />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col gap-3">
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-taupe font-medium">Her Personality Adapts to Your Era</p>
              {[
                { era: 'Soft Girl Era',  tone: 'Warm, slow, emotionally gentle. She meets you where you are.' },
                { era: 'CEO Girl',       tone: 'Sharp, focused, no fluff. Straight to what matters.' },
                { era: 'Chaos Fairy',    tone: 'Playful, chaotic-good. She laughs with you, then fixes it.' },
                { era: 'Main Character', tone: 'Cinematic, emotionally intelligent. Every day feels like a scene.' },
                { era: 'Wellness Reset', tone: 'Calm, grounded, nurturing. For when you need to breathe first.' },
              ].map((p, i) => (
                <motion.div key={p.era} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white/60 rounded-2xl px-4 py-3 border border-blush-light/25">
                  <p className="font-sans text-xs font-semibold text-charcoal mb-0.5">{p.era}</p>
                  <p className="font-sans text-xs text-taupe leading-snug">{p.tone}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Four pillars — with mini mockups */}
      <section className="py-20 px-6 bg-gradient-to-b from-cream to-blush-light/15">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} className="text-center mb-12">
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium mb-3">What It Does</p>
            <h2 className="font-serif text-4xl text-charcoal">Four Pillars. Your Whole Life.</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Morning OS */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="bg-gradient-to-br from-[#FFD7D1]/60 to-blush/20 rounded-4xl p-8 border border-white/50 flex flex-col">
              <MorningBriefWidget />
              <p className="font-sans text-[9px] uppercase tracking-[0.22em] text-blush/70 font-semibold mb-2">01 — wake up handled.</p>
              <h3 className="font-serif text-2xl text-charcoal mb-3">Morning OS</h3>
              <p className="font-sans text-sm text-taupe leading-relaxed">Weather, schedule, emotional check-in, priorities, and a message from your AI bestie. All before you open TikTok.</p>
            </motion.div>

            {/* AI Companion */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.09 }}
              className="bg-gradient-to-br from-[#EDE0F5]/50 to-blush-light/30 rounded-4xl p-8 border border-white/50 flex flex-col">
              {/* Mini chat preview */}
              <div className="bg-white/40 rounded-2xl p-3 mb-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blush to-[#e8899a] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[8px]">✦</span>
                  </div>
                  <p className="font-sans text-[9px] font-medium text-charcoal">Nova</p>
                  <motion.div className="w-1 h-1 rounded-full bg-sage ml-auto" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                </div>
                <div className="bg-blush-light/40 rounded-xl rounded-tl-sm px-3 py-2 mb-1.5">
                  <p className="font-serif text-[10px] text-charcoal italic">&ldquo;good morning. 3 things today. that&apos;s enough.&rdquo;</p>
                </div>
                <div className="bg-blush-light/25 rounded-xl rounded-tl-sm px-3 py-2">
                  <p className="font-serif text-[10px] text-charcoal/60 italic">&ldquo;and yes, she remembers everything ♡&rdquo;</p>
                </div>
              </div>
              <p className="font-sans text-[9px] uppercase tracking-[0.22em] text-blush/70 font-semibold mb-2">02 — she remembers everything.</p>
              <h3 className="font-serif text-2xl text-charcoal mb-3">AI Companion</h3>
              <p className="font-sans text-sm text-taupe leading-relaxed">A persistent AI with memory, personality, and emotional awareness. Name her. Customize her. She&apos;s yours.</p>
            </motion.div>

            {/* Daily Reset */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="bg-gradient-to-br from-sage/25 to-[#C7D1C2]/30 rounded-4xl p-8 border border-white/50 flex flex-col">
              {/* Moon animation */}
              <div className="bg-white/40 rounded-2xl p-3 mb-5">
                <div className="flex items-center gap-3 mb-2.5">
                  <motion.div animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C7D1C2]/80 to-sage/60 flex items-center justify-center flex-shrink-0">
                    <Moon className="w-4 h-4 text-white/80" strokeWidth={1.5} />
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-sans text-[9px] text-taupe/60 uppercase tracking-wider">daily reset</p>
                    <p className="font-sans text-xs text-charcoal font-medium">tonight at 9pm</p>
                  </div>
                  {[0, 0.4, 0.8].map((d, i) => (
                    <motion.span key={i} className="text-sage/60 text-xs" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: d }}>✦</motion.span>
                  ))}
                </div>
                {['emotional debrief', "tomorrow's setup", 'wind-down ritual'].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-0.5">
                    <div className="w-1 h-1 rounded-full bg-sage/40 flex-shrink-0" />
                    <p className="font-sans text-[10px] text-taupe/60">{item}</p>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[9px] uppercase tracking-[0.22em] text-sage/80 font-semibold mb-2">03 — close the day with clarity.</p>
              <h3 className="font-serif text-2xl text-charcoal mb-3">Daily Reset</h3>
              <p className="font-sans text-sm text-taupe leading-relaxed">Emotional debrief, tomorrow&apos;s setup, and a wind-down that actually works. Go to sleep handled.</p>
            </motion.div>

            {/* Curated Automations */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.27 }}
              className="bg-gradient-to-br from-[#FFF0E8]/80 to-blush-light/20 rounded-4xl p-8 border border-white/50 flex flex-col">
              <AutomationWidget />
              <p className="font-sans text-[9px] uppercase tracking-[0.22em] text-taupe font-semibold mb-2">04 — magic, not workflows.</p>
              <h3 className="font-serif text-2xl text-charcoal mb-3">Curated Automations</h3>
              <p className="font-sans text-sm text-taupe leading-relaxed">One-click automations that feel like spells. Clean inbox. Prep my week. Creator sprint. No node builders.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Themes — with live preview */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium mb-3">12 Themes</p>
            <h2 className="font-serif text-4xl text-charcoal mb-4">Decorate Your Digital Life.</h2>
            <p className="font-sans text-sm text-taupe max-w-sm mx-auto leading-relaxed">
              Each theme changes colors, typography, animations, assistant tone, and the emotional feel of the entire OS.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Theme grid */}
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {allThemes.map((theme, i) => (
                  <motion.div key={theme.name} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }}
                    className={`bg-gradient-to-br ${theme.color} rounded-2xl px-3 py-3 border border-white/50 text-center`}>
                    <p className={`font-sans text-[10px] font-medium ${theme.text}`}>{theme.name}</p>
                  </motion.div>
                ))}
              </div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="font-sans text-xs text-taupe/60 text-center mt-4 italic">
                Switch themes anytime. The OS follows your mood.
              </motion.p>
            </motion.div>

            {/* Live preview */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}>
              <ThemePreview />
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Companion — with live chat */}
      <section className="py-16 px-6 bg-gradient-to-br from-blush-light/20 to-cream">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium mb-3">Your AI Bestie</p>
              <h2 className="font-serif text-4xl text-charcoal mb-4 leading-snug">
                Name Her. Customize Her.<br />
                <span className="font-script text-blush">She&apos;s Yours ♡</span>
              </h2>
              <p className="font-sans text-sm text-taupe leading-relaxed mb-6 max-w-sm">
                Choose her name: Luna, Nova, Ivy, Coco, Venus, Elle. Pick her personality. She remembers your routines, your goals, and how you were feeling last Tuesday.
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Soft Girl',     desc: 'warm, slow, emotionally gentle' },
                  { label: 'CEO Girl',      desc: 'sharp, focused, no time to waste' },
                  { label: 'Chaos Fairy',   desc: 'playful, chaotic-good, on your side' },
                  { label: 'Main Character', desc: 'cinematic, emotionally intelligent, iconic' },
                ].map((p, i) => (
                  <motion.div key={p.label} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="flex items-center gap-3 bg-white/60 rounded-2xl px-4 py-3 border border-blush-light/25">
                    <span className="text-blush text-xs flex-shrink-0">✦</span>
                    <div>
                      <span className="font-sans text-sm font-medium text-charcoal">{p.label}</span>
                      <span className="font-sans text-xs text-taupe ml-2">{p.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}>
              <CompanionChat />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Easy Mode + Advanced Mode */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium mb-3">Two Modes</p>
            <h2 className="font-serif text-4xl text-charcoal">Start Simple. Go Deeper When You&apos;re Ready.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-4xl bg-gradient-to-br from-blush-light/40 to-[#FFD7D1]/20 border border-blush/20 p-7">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-blush" />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-blush font-medium">Easy Mode</span>
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-3">Instant Magic ♡</h3>
              <p className="font-sans text-sm text-taupe leading-relaxed mb-5">
                LazyGirlOS works the moment you sign up. No API key. No terminal. No technical knowledge. Just open it and feel better.
              </p>
              <ul className="flex flex-col gap-2">
                {['Morning Briefs, Daily', 'AI Companion with Memory', 'Curated Automations', 'All 12 Themes', 'Works Immediately'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-blush text-xs flex-shrink-0">✦</span>
                    <span className="font-sans text-xs text-charcoal/80">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-4xl bg-gradient-to-br from-charcoal/8 to-blush/8 border border-charcoal/12 p-7 relative overflow-hidden">
              <div className="absolute top-5 right-5">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-taupe/50 bg-white/50 border border-blush-light/30 px-2.5 py-1 rounded-full">hidden in settings</span>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-charcoal/50" />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/60 font-medium">Advanced Mode ✨</span>
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-3">Go Deeper.</h3>
              <p className="font-sans text-sm text-taupe leading-relaxed mb-5">
                For founders, creators, and power users who want to unlock the full stack. Connect your own AI providers, run browser automations, build long-term memory across your life.
              </p>
              <ul className="flex flex-col gap-2 mb-5">
                {['Unlimited Usage', 'Claude, OpenAI, Gemini — Your Choice', 'Browser Automations', 'Long-Term Memory Engine', 'Advanced Workflows'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-charcoal/40 text-xs flex-shrink-0">✦</span>
                    <span className="font-sans text-xs text-charcoal/70">{f}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-[10px] text-taupe/50 italic leading-relaxed border-t border-charcoal/8 pt-4">
                &ldquo;This mode gives your assistant deeper system access.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Built for girls who */}
      <section className="py-16 px-6 bg-gradient-to-br from-blush-light/15 to-cream">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10">
            <h2 className="font-serif text-4xl text-charcoal">Built for Girls Who…</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'romanticize being organised but never quite get there',
              'have the vision. just not the system.',
              'want an AI that actually knows them — not a blank chatbot every time',
              'are doing everything manually and quietly exhausted by it',
              'need emotional support and a priorities list in the same place',
              'want their digital space to feel like theirs, not a SaaS template',
              "know what they want to do. just can't seem to start.",
              'are in their main character era and need the tools to live it',
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-3 bg-white/60 rounded-2xl px-5 py-4 border border-blush-light/25">
                <span className="text-blush mt-0.5 flex-shrink-0">✦</span>
                <p className="font-sans text-sm text-charcoal/80">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#FFD7D1]/30 via-cream to-[#EDE0F5]/20 text-center relative overflow-hidden">
        <SparkleField />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-blush/8 blur-3xl" />
        </div>
        <div className="max-w-xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-blush font-medium mb-4">Your Era Starts Here</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-3 leading-[1.05]">
              Romanticize Your Life.<br />Automate the Admin.
            </h2>
            <p className="font-script text-2xl text-blush mb-8">you just show up ♡</p>
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-8 px-6 text-center border-t border-blush-light/20">
        <p className="font-sans text-xs text-taupe/60 mb-3">while you wait — get the free newsletter from Elaine or try the free tools</p>
        <div className="flex gap-3 justify-center">
          <Link href="/join" className="font-sans text-xs text-blush hover:underline">newsletter →</Link>
          <span className="text-taupe/30">·</span>
          <Link href="/tools" className="font-sans text-xs text-taupe hover:text-charcoal transition-colors">free tools</Link>
          <span className="text-taupe/30">·</span>
          <Link href="/shop" className="font-sans text-xs text-taupe hover:text-charcoal transition-colors">shop</Link>
        </div>
      </section>
    </main>
  )
}
