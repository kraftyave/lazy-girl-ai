'use client'
import { useState } from 'react'
import type { ChecklistTool } from '@/lib/tools-data'

export default function ChecklistToolComponent({ tool }: { tool: ChecklistTool }) {
  const [checked, setChecked] = useState<Set<number>>(new Set())

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const progress = Math.round((checked.size / tool.items.length) * 100)

  return (
    <div className="flex flex-col gap-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 bg-blush-light/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-blush rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-sans text-[10px] text-taupe/60 tabular-nums">
          {checked.size}/{tool.items.length}
        </span>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2">
        {tool.items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className="flex items-start gap-3 text-left group"
          >
            <div
              className={`flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border transition-all duration-200 flex items-center justify-center ${
                checked.has(i)
                  ? 'bg-blush border-blush'
                  : 'border-blush-light/60 group-hover:border-blush/50'
              }`}
            >
              {checked.has(i) && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                  <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className={`font-sans text-xs leading-relaxed transition-colors duration-200 ${
                checked.has(i) ? 'text-taupe/50 line-through' : 'text-charcoal/80 group-hover:text-charcoal'
              }`}
            >
              {item}
            </span>
          </button>
        ))}
      </div>

      {progress === 100 && (
        <p className="font-script text-lg text-blush mt-1">
          all done ♡
        </p>
      )}
    </div>
  )
}
