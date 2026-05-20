import { describe, it, expect } from 'vitest'
import { moodCards, scenarios, prompts, categories } from '@/lib/data'

describe('moodCards', () => {
  it('has exactly 4 mood cards', () => {
    expect(moodCards).toHaveLength(4)
  })

  it('each card has required fields', () => {
    for (const card of moodCards) {
      expect(card.id).toBeTruthy()
      expect(card.emoji).toBeTruthy()
      expect(card.title).toBeTruthy()
      expect(card.imageSrc).toMatch(/^\/images\//)
      expect(card.gradient).toBeTruthy()
      expect(card.modalPrompts.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('each modal prompt has title and prompt text', () => {
    for (const card of moodCards) {
      for (const mp of card.modalPrompts) {
        expect(mp.title).toBeTruthy()
        expect(mp.prompt.length).toBeGreaterThan(50)
      }
    }
  })
})

describe('scenarios', () => {
  it('has at least 4 scenarios', () => {
    expect(scenarios.length).toBeGreaterThanOrEqual(4)
  })

  it('each scenario has required fields', () => {
    for (const s of scenarios) {
      expect(s.id).toBeTruthy()
      expect(s.title).toBeTruthy()
      expect(s.caption).toBeTruthy()
      expect(s.imageSrc).toMatch(/^\/images\//)
      expect(s.gradient).toBeTruthy()
    }
  })
})

describe('prompts', () => {
  it('has at least 10 prompts', () => {
    expect(prompts.length).toBeGreaterThanOrEqual(10)
  })

  it('each prompt has required fields', () => {
    for (const p of prompts) {
      expect(p.id).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(p.prompt.length).toBeGreaterThan(100)
      expect(p.category).toBeTruthy()
    }
  })

  it('all prompt categories exist in the categories list', () => {
    for (const p of prompts) {
      expect(categories).toContain(p.category)
    }
  })

  it('prompt ids are unique', () => {
    const ids = prompts.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('categories', () => {
  it('includes "all" as first entry', () => {
    expect(categories[0]).toBe('all')
  })

  it('has at least 5 categories', () => {
    expect(categories.length).toBeGreaterThanOrEqual(5)
  })
})
