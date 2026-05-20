'use client'
import { useState } from 'react'
import type { CalculatorTool } from '@/lib/tools-data'

export default function TimeSavedCalculator({ tool }: { tool: CalculatorTool }) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const totalHours = tool.items
    .filter((item) => selected.has(item.id))
    .reduce((sum, item) => sum + item.hours, 0)

  const totalPerYear = Math.round(totalHours * 52)
  const daysSaved = Math.round(totalPerYear / 8)

  return (
    <div className="flex flex-col gap-4">
      <p className="font-sans text-xs text-taupe leading-relaxed">
        check everything AI could realistically take over in your week:
      </p>

      <div className="flex flex-col gap-2">
        {tool.items.map((item) => {
          const isOn = selected.has(item.id)
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl border text-left transition-all duration-200 ${
                isOn
                  ? 'bg-blush/10 border-blush/30'
                  : 'bg-white/50 border-blush-light/30 hover:border-blush-light/60'
              }`}
            >
              <span className={`font-sans text-xs ${isOn ? 'text-charcoal' : 'text-taupe'}`}>
                {item.label}
              </span>
              <span className={`font-sans text-[10px] font-medium ml-3 flex-shrink-0 ${isOn ? 'text-blush' : 'text-taupe/50'}`}>
                ~{item.hours}h/wk
              </span>
            </button>
          )
        })}
      </div>

      {selected.size > 0 && (
        <div className="bg-white/70 rounded-3xl p-5 border border-blush-light/30">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-taupe font-medium mb-3">
            your numbers
          </p>
          <div className="flex gap-6">
            <div>
              <p className="font-serif text-3xl text-blush">{totalHours}h</p>
              <p className="font-sans text-[10px] text-taupe mt-0.5">per week</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-charcoal">{totalPerYear}h</p>
              <p className="font-sans text-[10px] text-taupe mt-0.5">per year</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-charcoal">{daysSaved}</p>
              <p className="font-sans text-[10px] text-taupe mt-0.5">full days saved</p>
            </div>
          </div>
          <p className="font-sans text-xs text-taupe/70 mt-4 leading-relaxed">
            that&apos;s <span className="text-charcoal font-medium">{daysSaved} full days</span> back every year.
            what would you do with that time?
          </p>
        </div>
      )}
    </div>
  )
}
